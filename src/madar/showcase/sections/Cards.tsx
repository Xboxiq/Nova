import { Section, SectionHeader } from '../SectionHeader';
import { SpecShelf } from '../SpecRow';
import { useTheme } from '../../theme/ThemeContext';

function Avatar({ initials, bg }: { initials: string; bg: string }) {
  return <span style={{ width: 40, height: 40, borderRadius: '50%', background: bg, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flex: 'none' }}>{initials}</span>;
}

function StatusBadge({ token, label }: { token: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 6, background: `var(--${token}-soft)`, color: `var(--${token})`, fontSize: 12, fontWeight: 600 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: `var(--${token})` }} />{label}
    </span>
  );
}

function ListRow({ initials, bg, name, meta, status, statusLabel }: { initials: string; bg: string; name: string; meta: string; status: string; statusLabel: string }) {
  return (
    <div className="i-surface2" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', cursor: 'pointer', transition: 'background 140ms' }}>
      <Avatar initials={initials} bg={bg} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600 }}>{name}</span>
        <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-3)' }}>{meta}</span>
      </span>
      <StatusBadge token={status} label={statusLabel} />
    </div>
  );
}

export function Cards() {
  const { glass } = useTheme();
  const glassNum = glass === 'g1' ? '1' : glass === 'g3' ? '3' : '2';

  return (
    <Section label="Cards">
      <SectionHeader eyebrow="05 · SURFACES" title="The card family">
        Resting cards are almost flat; they lift when they mean something. Hover any clickable card: −3px, shadow 1→2, chevron nudges.
      </SectionHeader>
      <SpecShelf>
        {/* service card */}
        <div className="i-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 22, cursor: 'pointer', transition: 'transform 340ms cubic-bezier(0.22,1,0.36,1), box-shadow 340ms, border-color 340ms' }}>
          <div style={{ width: 44, height: 44, borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></svg>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>Subscription bundles</div>
          <div style={{ fontSize: 14, lineHeight: '21px', color: 'var(--text-2)' }}>Recurring plans with pause, swap and gifting built in from day one.</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>from 49 SAR<span style={{ color: 'var(--text-3)', fontWeight: 500 }}> /mo</span></span>
            <span className="i-chevron" style={{ color: 'var(--accent)', display: 'inline-flex', transition: 'transform 220ms' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </span>
          </div>
        </div>

        {/* stat cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20, }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>MONTHLY REVENUE</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
              <div>
                <span style={{ fontSize: 30, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>84,120</span>
                <span style={{ fontSize: 13, color: 'var(--text-3)' }}> SAR</span>
                <div style={{ marginTop: 6 }}><StatusBadge token="success" label="↑ 12.4%" /></div>
              </div>
              <svg width="90" height="36" viewBox="0 0 90 36" fill="none"><polyline points="2,28 16,22 30,25 44,14 58,18 72,8 88,12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20, }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>ACTIVE STUDENTS</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
              <div>
                <span style={{ fontSize: 30, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>1,248</span>
                <div style={{ marginTop: 6 }}><StatusBadge token="danger" label="↓ 2.1%" /></div>
              </div>
              <svg width="90" height="36" viewBox="0 0 90 36" fill="none"><polyline points="2,10 16,14 30,12 44,20 58,17 72,24 88,22" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>

        {/* pricing highlighted */}
        <div style={{ background: 'var(--ink)', color: 'var(--on-ink)', borderRadius: 6, padding: 26, position: 'relative' }}>
          <span style={{ position: 'absolute', top: -12, insetInlineEnd: 22, background: 'var(--accent)', color: 'var(--on-accent)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em', padding: '4px 12px', borderRadius: 6, }}>POPULAR</span>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', opacity: 0.6 }}>GROWTH</div>
          <div style={{ margin: '10px 0 4px' }}>
            <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>199</span>
            <span style={{ fontSize: 14, opacity: 0.6 }}> SAR /mo</span>
          </div>
          <div style={{ height: 1, background: 'currentColor', opacity: 0.14, margin: '16px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            {['Unlimited services', 'Admin roles & audit log', 'Arabic + English storefront', 'Priority support'].map((f) => (
              <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>{f}
              </span>
            ))}
          </div>
          <button className="i-lift i-press-97" style={{ width: '100%', height: 44, marginTop: 20, borderRadius: 6, border: 'none', background: 'var(--on-ink)', color: 'var(--ink)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Choose Growth</button>
        </div>

        {/* list rows */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
          <ListRow initials="نم" bg="var(--accent-soft)" name="نورة المطيري" meta="Math · Grade 6 · 14 lessons" status="success" statusLabel="Active" />
          <div style={{ height: 1, background: 'var(--border)', margin: '0 18px' }} />
          <ListRow initials="OK" bg="var(--info-soft)" name="Omar Khalid" meta="Physics · Grade 9 · 6 lessons" status="warning" statusLabel="Pending" />
          <div style={{ height: 1, background: 'var(--border)', margin: '0 18px' }} />
          <ListRow initials="LA" bg="var(--warning-soft)" name="Lina Aziz" meta="Chemistry · Grade 11 · 22 lessons" status="success" statusLabel="Active" />
        </div>

        {/* glass card over placeholder imagery */}
        <div style={{ borderRadius: 6, overflow: 'hidden', position: 'relative', minHeight: 240, border: '1px solid var(--border)', background: 'repeating-linear-gradient(45deg, var(--accent-soft) 0 10px, transparent 10px 20px), linear-gradient(150deg, var(--accent-soft), var(--bg-deep))' }}>
          <div style={{ position: 'absolute', top: 14, insetInlineStart: 14, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px' }}>[ product / cover image ]</div>
          <div style={{ position: 'absolute', insetInline: 16, bottom: 16, borderRadius: 6, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'inset 0 1px 0 var(--glass-hl)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 6, background: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6l8 6-8 6V6z" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Glass card — G{glassNum}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>Blur only means something over content.</div>
            </div>
          </div>
        </div>

        {/* empty state */}
        <div style={{ border: '1.5px dashed var(--border-strong)', borderRadius: 6, padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--text-2)', maxWidth: '26ch' }}>No bookings yet. Your first one will appear here.</div>
          <button className="i-soft" style={{ height: 36, padding: '0 18px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Create a booking</button>
        </div>
      </SpecShelf>
    </Section>
  );
}
