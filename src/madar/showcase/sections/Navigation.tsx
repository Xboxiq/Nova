import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { useTheme } from '../../theme/ThemeContext';

function NavIcon({ path, rect }: { path?: string; rect?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {rect ? (<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>) : <path d={path} />}
    </svg>
  );
}

function SidebarItem({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={active ? undefined : 'i-surface2-text'} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 9, height: 34, padding: '0 10px', borderRadius: 10, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? undefined : 'var(--text-2)', cursor: 'pointer', background: active ? 'var(--surface)' : undefined, boxShadow: active ? 'var(--shadow-1)' : undefined, transition: 'background 140ms' }}>
      {active && <span style={{ position: 'absolute', insetInlineStart: -10, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--accent)' }} />}
      {children}
    </div>
  );
}

function DockButton({ label, accent, children }: { label: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <button aria-label={label} className="i-dock-icon" style={{ width: 46, height: 46, borderRadius: 14, border: 'none', background: accent ? 'var(--accent)' : 'var(--surface)', color: accent ? 'var(--on-accent)' : 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 220ms cubic-bezier(0.34,1.45,0.64,1)', boxShadow: 'var(--shadow-1)', position: 'relative' }}>{children}</button>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent ? 'var(--accent)' : 'transparent' }} />
    </div>
  );
}

export function Navigation() {
  const { rtl } = useTheme();
  const [tab, setTab] = useState(0);
  const m = rtl ? -1 : 1;
  const tabs = ['Overview', 'Activity', 'Settings'];
  const tabCopy = [
    'A quiet summary of the object — status, owner, and the one number that matters.',
    'A reverse-chronological feed. Each entry: avatar, verb, timestamp — nothing else.',
    'Hairline-divided groups, controls end-aligned, max 640px column.',
  ];

  return (
    <Section label="Navigation">
      <SectionHeader eyebrow="06 · WAYFINDING" title="Navigation — sidebar, tabs, dock">
        Admin shells get a sidebar with an inline-start accent bar; consumer shells get the floating dock. Hover the dock — icons magnify with a spring.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* mini admin shell */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, boxShadow: 'var(--shadow-1)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '212px 1fr', minHeight: 380 }}>
          <div style={{ background: 'var(--bg-deep)', borderInlineEnd: '1px solid var(--border)', padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px 14px' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'conic-gradient(from 210deg, var(--accent), var(--accent-soft), var(--accent))' }} />
              <span style={{ fontWeight: 700, fontSize: 13.5 }}>Madar Admin</span>
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-3)', padding: '6px 10px' }}>WORKSPACE</div>
            <SidebarItem active><NavIcon path="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" />Dashboard</SidebarItem>
            <SidebarItem><NavIcon rect />Services</SidebarItem>
            <SidebarItem>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg>
              Customers<span style={{ marginInlineStart: 'auto', fontSize: 10.5, fontWeight: 700, background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 999, padding: '2px 7px' }}>12</span>
            </SidebarItem>
            <SidebarItem><NavIcon path="M4 19V9M10 19V5M16 19v-8M21 19H3" />Reports</SidebarItem>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-3)', padding: '12px 10px 6px' }}>SYSTEM</div>
            <SidebarItem><NavIcon path="M4 7h16M4 12h16M4 17h16" />Settings</SidebarItem>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 52, padding: '0 18px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Workspace</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Dashboard</span>
              <span style={{ marginInlineStart: 'auto', display: 'flex', alignItems: 'center', gap: 8, height: 32, borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface-2)', padding: '0 12px', color: 'var(--text-3)', fontSize: 12.5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>⌘K
              </span>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>MS</span>
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>Today</span>
                <button className="i-lift" style={{ height: 32, padding: '0 14px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>+ New service</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>BOOKINGS</div>
                  <div style={{ fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>37</div>
                </div>
                <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>REVENUE</div>
                  <div style={{ fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>4,890</div>
                </div>
              </div>
              <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 14, background: 'repeating-linear-gradient(45deg, var(--surface-2) 0 8px, transparent 8px 16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 90 }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px' }}>[ chart · single accent hue ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* tabs / pagination / dock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Underline tabs — shared line slides</div>
            <div style={{ position: 'relative', display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <span style={{ position: 'absolute', bottom: -1, insetInlineStart: 0, width: 110, height: 2, borderRadius: 2, background: 'var(--accent)', transform: `translateX(${tab * 110 * m}px)`, transition: 'transform 340ms cubic-bezier(0.22,1,0.36,1)' }} />
              {tabs.map((label, i) => (
                <button key={label} onClick={() => setTab(i)} className={i === tab ? undefined : 'i-text'} style={{ width: 110, height: 40, border: 'none', background: 'none', fontSize: 13.5, fontWeight: 600, color: i === tab ? 'var(--text)' : 'var(--text-2)', cursor: 'pointer' }}>{label}</button>
              ))}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', padding: '16px 4px 4px' }}>{tabCopy[tab]}</div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Pagination</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button aria-label="Previous" className="i-soft" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>1</button>
              {['2', '3'].map((n) => <button key={n} className="i-soft-text" style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'none', color: 'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{n}</button>)}
              <span style={{ color: 'var(--text-3)', fontSize: 13, padding: '0 4px' }}>…</span>
              <button className="i-soft-text" style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'none', color: 'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>12</button>
              <button aria-label="Next" className="i-soft" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>

          <div style={{ borderRadius: 22, border: '1px solid var(--border)', padding: '28px 20px', background: 'repeating-linear-gradient(45deg, var(--accent-soft) 0 10px, transparent 10px 20px), var(--bg-deep)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>The dock — hover me</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: 10, borderRadius: 26, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'var(--shadow-3), inset 0 1px 0 var(--glass-hl)' }}>
              <DockButton label="Home" accent><NavIcon path="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /></DockButton>
              <DockButton label="Browse"><NavIcon rect /></DockButton>
              <DockButton label="Search"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg></DockButton>
              <DockButton label="Notifications">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></svg>
                <span style={{ position: 'absolute', top: 8, insetInlineEnd: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', border: '2px solid var(--surface)' }} />
              </DockButton>
              <DockButton label="Profile"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg></DockButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
