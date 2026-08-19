import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { useTheme } from '../../theme/ThemeContext';
import { MemojiAvatar, AvatarStack, Sparkline } from '../../components';

/* ────────────────────────────────────────────────────────────────────────
   A composed page, not a component grid — "بناء صفحات ادمن اكسسز متكاملة".
   Sidebar shell · header · role cards · interactive permission matrix ·
   members table with live role editing · audit rail. Dense, artful use of
   space; every surface uses Madar tokens and flips under RTL.
──────────────────────────────────────────────────────────────────────── */

const NAV = [
  { label: 'اللوحة', path: 'M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z' },
  { label: 'الفريق', path: 'M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5', extra: 'M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' },
  { label: 'الصلاحيات', path: 'M12 3l8 4v5c0 4-3.4 7.5-8 9-4.6-1.5-8-5-8-9V7l8-4z', active: true },
  { label: 'السجل', path: 'M4 19V9M10 19V5M16 19v-8M21 19H3' },
  { label: 'الإعدادات', path: 'M4 7h16M4 12h16M4 17h16' },
];

const ROLES = [
  { key: 'owner', name: 'المالك', en: 'Owner', tone: 'accent', members: 1, desc: 'تحكم كامل، بما فيه الفوترة والحذف' },
  { key: 'admin', name: 'مدير', en: 'Admin', tone: 'info', members: 3, desc: 'إدارة الفريق والصلاحيات والمحتوى' },
  { key: 'editor', name: 'محرّر', en: 'Editor', tone: 'success', members: 8, desc: 'إنشاء وتحرير المحتوى دون الإعدادات' },
  { key: 'viewer', name: 'مشاهد', en: 'Viewer', tone: 'warning', members: 12, desc: 'قراءة فقط عبر مساحة العمل' },
] as const;

const CAPABILITIES = [
  'عرض المحتوى', 'تحرير المحتوى', 'نشر وأرشفة', 'إدارة الأعضاء', 'الوصول للفوترة', 'حذف المشروع',
];
// default matrix: roles(4) × caps(6)
const DEFAULT_MATRIX = [
  [true, true, true, true, true, true],   // owner
  [true, true, true, true, false, false], // admin
  [true, true, true, false, false, false],// editor
  [true, false, false, false, false, false],// viewer
];

const MEMBERS = [
  { name: 'نورة المطيري', email: 'noura@madar.sa', role: 0, status: 'active', last: 'الآن' },
  { name: 'Omar Khalid', email: 'omar@madar.sa', role: 1, status: 'active', last: 'قبل 4 د' },
  { name: 'ريم القحطاني', email: 'reem@madar.sa', role: 1, status: 'active', last: 'قبل ساعة' },
  { name: 'Adam Darwish', email: 'adam@bridge.io', role: 2, status: 'pending', last: 'لم يدخل بعد' },
  { name: 'لينا عزيز', email: 'lina@madar.sa', role: 2, status: 'active', last: 'أمس' },
  { name: 'Yousef Hamdan', email: 'yousef@madar.sa', role: 3, status: 'suspended', last: 'قبل 3 أيام' },
];

const AUDIT = [
  { who: 'نورة المطيري', what: 'رفعت Omar إلى مدير', time: 'قبل 4 د', tone: 'accent' },
  { who: 'النظام', what: 'انتهت جلسة Yousef تلقائياً', time: 'قبل 22 د', tone: 'warning' },
  { who: 'ريم القحطاني', what: 'دعت adam@bridge.io', time: 'قبل ساعة', tone: 'info' },
  { who: 'Omar Khalid', what: 'عطّل حذف المشروع للمحرّرين', time: 'قبل 3 س', tone: 'danger' },
  { who: 'نورة المطيري', what: 'فعّلت المصادقة الثنائية', time: 'أمس', tone: 'success' },
];

function NavIcon({ d, extra }: { d: string; extra?: string }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} />{extra && <path d={extra} />}</svg>;
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, [string, string]> = { active: ['success', 'نشط'], pending: ['warning', 'معلّق'], suspended: ['danger', 'موقوف'] };
  const [tone, label] = map[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 6, background: `var(--${tone}-soft)`, color: `var(--${tone})`, fontSize: 12, fontWeight: 600 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: `var(--${tone})` }} />{label}
    </span>
  );
}

export function AdminAccess() {
  useTheme(); // subscribe so the section re-renders on theme/dir change
  const [nav, setNav] = useState(2);
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);
  const [roleFilter, setRoleFilter] = useState(-1);
  const [members, setMembers] = useState(MEMBERS);
  const [openRole, setOpenRole] = useState(-1);

  const toggleCell = (r: number, c: number) => {
    if (r === 0) return; // owner is locked-all
    setMatrix((prev) => prev.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row)));
  };

  const shown = roleFilter < 0 ? members : members.filter((mem) => mem.role === roleFilter);
  const grantedCount = matrix.flat().filter(Boolean).length;

  return (
    <Section label="Admin access">
      <SectionHeader eyebrow="21 · ADMIN ACCESS" title="A full page, composed from the library">
        Not another component grid. This is the complete <b>access &amp; permissions</b> screen the brief asked for (صفحات ادمن اكسسز متكاملة) — sidebar shell, role cards, a live permission matrix, an editable members table, and an audit rail. Everything is interactive and mirrors under RTL.
      </SectionHeader>

      <div style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '210px 1fr', minHeight: 620 }}>
        {/* ── sidebar ── */}
        <aside style={{ background: 'var(--bg-deep)', borderInlineEnd: '1px solid var(--border)', padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 10px 16px' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'conic-gradient(from 210deg, var(--accent), var(--accent-soft), var(--accent))', }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>مدار أدمن</span>
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-3)', padding: '4px 10px 6px' }}>مساحة العمل</div>
          {NAV.map((n, i) => (
            <button key={n.label} onClick={() => setNav(i)} className={i === nav ? undefined : 'i-surface2-text'} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, height: 36, padding: '0 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: i === nav ? 600 : 500, color: i === nav ? 'var(--text)' : 'var(--text-2)', background: i === nav ? 'var(--surface)' : 'transparent', boxShadow: i === nav ? 'var(--shadow-1)' : 'none', textAlign: 'start', transition: 'background 140ms' }}>
              {i === nav && <span style={{ position: 'absolute', insetInlineStart: -12, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--accent)' }} />}
              <NavIcon d={n.path} extra={n.extra} />{n.label}
            </button>
          ))}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 9, padding: '10px', borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <MemojiAvatar name="نورة المطيري" size={30} />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>نورة المطيري</span>
              <span style={{ display: 'block', fontSize: 10.5, color: 'var(--text-3)' }}>المالك</span>
            </span>
          </div>
        </aside>

        {/* ── main ── */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* topbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 56, padding: '0 20px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>مساحة العمل</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>الوصول والصلاحيات</span>
            <span style={{ marginInlineStart: 'auto', display: 'flex', alignItems: 'center', gap: 8, height: 34, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', padding: '0 14px', color: 'var(--text-3)', fontSize: 12.5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              بحث في الأعضاء…
            </span>
            <button className="i-lift i-press-97" style={{ height: 34, padding: '0 16px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>دعوة عضو
            </button>
          </div>

          {/* body: content + audit rail */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 0, flex: 1, minWidth: 0 }}>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
              {/* role cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                {ROLES.map((role, i) => (
                  <button key={role.key} onClick={() => setRoleFilter(roleFilter === i ? -1 : i)} className="i-lift-shadow" style={{ textAlign: 'start', padding: 14, borderRadius: 6, cursor: 'pointer', border: roleFilter === i ? `1.5px solid var(--${role.tone})` : '1px solid var(--border)', background: roleFilter === i ? `var(--${role.tone}-soft)` : 'var(--surface)', transition: 'transform 220ms, box-shadow 220ms, border-color 200ms, background 200ms' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ width: 30, height: 30, borderRadius: 6, background: `var(--${role.tone}-soft)`, color: `var(--${role.tone})`, display: 'grid', placeItems: 'center' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4v5c0 4-3.4 7.5-8 9-4.6-1.5-8-5-8-9V7l8-4z" /></svg>
                      </span>
                      <span style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{role.members}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10 }}>{role.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, lineHeight: '15px' }}>{role.desc}</div>
                  </button>
                ))}
              </div>

              {/* permission matrix */}
              <div style={{ borderRadius: 6, border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', background: 'var(--bg-deep)', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>مصفوفة الصلاحيات</span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>{grantedCount} صلاحية ممنوحة</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 520 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'start', padding: '10px 16px', fontWeight: 600, color: 'var(--text-3)', fontSize: 11 }}>الصلاحية</th>
                        {ROLES.map((r) => <th key={r.key} style={{ padding: '10px 8px', fontWeight: 700, color: `var(--${r.tone})`, fontSize: 11.5 }}>{r.name}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {CAPABILITIES.map((cap, ci) => (
                        <tr key={cap} style={{ borderTop: '1px solid var(--border)' }}>
                          <td style={{ padding: '9px 16px', fontWeight: 500 }}>{cap}</td>
                          {ROLES.map((r, ri) => {
                            const on = matrix[ri][ci];
                            const locked = ri === 0;
                            return (
                              <td key={r.key} style={{ padding: '9px 8px', textAlign: 'center' }}>
                                <button
                                  onClick={() => toggleCell(ri, ci)} disabled={locked} aria-pressed={on}
                                  aria-label={`${cap} · ${r.name}`}
                                  style={{ width: 30, height: 20, borderRadius: 6, border: 'none', padding: 0, position: 'relative', cursor: locked ? 'not-allowed' : 'pointer', background: on ? `var(--${r.tone})` : 'var(--surface-2)', opacity: locked ? 0.7 : 1, transition: 'background 220ms' }}
                                >
                                  <span style={{ position: 'absolute', top: 2, insetInlineStart: on ? 12 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'inset-inline-start 260ms cubic-bezier(0.34,1.45,0.64,1)' }} />
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* members table */}
              <div style={{ borderRadius: 6, border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', background: 'var(--bg-deep)', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>الأعضاء {roleFilter >= 0 && <span style={{ color: 'var(--text-3)', fontWeight: 500 }}>· {ROLES[roleFilter].name}</span>}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <AvatarStack names={members.slice(0, 4).map((mem) => mem.name)} more={members.length - 4} size={24} />
                  </span>
                </div>
                {shown.map((mem, i) => {
                  const globalIdx = members.indexOf(mem);
                  return (
                    <div key={mem.email} className="i-surface2" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 0.9fr 0.7fr 40px', gap: 12, alignItems: 'center', padding: '0 16px', height: 56, borderTop: i ? '1px solid var(--border)' : 'none', transition: 'background 140ms' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <MemojiAvatar name={mem.name} size={34} />
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mem.name}</span>
                          <span style={{ display: 'block', fontSize: 11.5, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} dir="ltr">{mem.email}</span>
                        </span>
                      </span>
                      {/* inline role editor */}
                      <span style={{ position: 'relative' }}>
                        <button onClick={() => setOpenRole(openRole === globalIdx ? -1 : globalIdx)} className="i-soft" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${ROLES[mem.role].tone})` }} />
                          {ROLES[mem.role].name}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                        {openRole === globalIdx && (
                          <div style={{ position: 'absolute', top: 'calc(100% + 6px)', insetInlineStart: 0, zIndex: 20, minWidth: 150, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: 5, animation: 'modalIn 260ms cubic-bezier(0.22,1,0.36,1)' }}>
                            {ROLES.map((r, ri) => (
                              <div key={r.key} onClick={() => { setMembers((prev) => prev.map((p, pi) => (pi === globalIdx ? { ...p, role: ri } : p))); setOpenRole(-1); }} className={ri === mem.role ? undefined : 'i-surface2'} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 6, fontSize: 12.5, fontWeight: ri === mem.role ? 700 : 500, background: ri === mem.role ? 'var(--accent-soft)' : undefined, cursor: 'pointer' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${r.tone})` }} />{r.name}
                                {ri === mem.role && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginInlineStart: 'auto' }}><path d="M5 13l4 4L19 7" /></svg>}
                              </div>
                            ))}
                          </div>
                        )}
                      </span>
                      <StatusPill status={mem.status} />
                      <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{mem.last}</span>
                      <button aria-label="خيارات" className="i-soft-text" style={{ width: 30, height: 30, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* audit rail */}
            <aside style={{ borderInlineStart: '1px solid var(--border)', background: 'var(--bg-deep)', padding: 18, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: 12 }}>نشاط الأمان (7 أيام)</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>142</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>حدث مسجّل</div>
                  </div>
                  <Sparkline points={[8, 14, 10, 22, 18, 30, 24]} width={96} height={38} />
                </div>
              </div>
              <div style={{ height: 1, background: 'var(--border)' }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-3)' }}>سجل التدقيق</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {AUDIT.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', flex: 'none', marginTop: 4, background: `var(--${a.tone})`, boxShadow: `0 0 0 3px var(--${a.tone}-soft)` }} />
                      {i < AUDIT.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 18, background: 'var(--border)', borderRadius: 2 }} />}
                    </div>
                    <div style={{ paddingBottom: 14, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, lineHeight: '17px' }}><b>{a.who}</b> {a.what}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 2 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="i-soft" style={{ height: 34, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>عرض السجل الكامل</button>
            </aside>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 14, textAlign: 'center' }}>
        صفحة واحدة مركّبة من مكونات المكتبة — بدّل الثيم أو فعّل RTL من الأعلى، وجرّب مصفوفة الصلاحيات ومحرّر الأدوار وبطاقات التصفية.
      </p>
    </Section>
  );
}
