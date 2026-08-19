import { Section, SectionHeader } from '../SectionHeader';

export function Buttons() {
  return (
    <Section label="Buttons">
      <SectionHeader eyebrow="03 · CONTROLS" title="Buttons: ink actions, colored meaning">
        One ink primary per view. Hover lifts −1px, press scales 0.97, focus rings with the accent. Gradient is allowed exactly once — the hero CTA.
      </SectionHeader>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button className="i-lift-shadow i-press-97 i-focus-ring" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms' }}>Primary · ink</button>
          <button className="i-lift-shadow i-press-97" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms' }}>Accent</button>
          <button className="i-lift i-press-97" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms' }}>Secondary</button>
          <button className="i-soft i-press-97" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background 220ms' }}>Ghost</button>
          <button className="i-lift" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Soft</button>
          <button className="i-danger-soft" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--danger)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background 220ms' }}>Delete</button>
          <button
            className="i-lift2-shadow i-press-97"
            style={{
              height: 44, padding: '0 24px', borderRadius: 6, border: 'none',
              background: 'linear-gradient(135deg, oklch(from var(--accent) l c calc(h - 28)), oklch(from var(--accent) l c calc(h + 28)))',
              color: 'var(--on-accent)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
 transition: 'transform 220ms, box-shadow 220ms', position: 'relative', overflow: 'hidden',
            }}
          >Gradient · hero only</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button className="i-soft" style={{ height: 32, padding: '0 16px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>sm 32</button>
          <button className="i-soft" style={{ height: 40, padding: '0 20px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>md 40</button>
          <button className="i-soft" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>lg 44</button>
          <button className="i-soft" style={{ height: 52, padding: '0 28px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>xl 52 · hero</button>
          <span style={{ width: 1, height: 32, background: 'var(--border)' }} />
          <button disabled style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 15, fontWeight: 600, opacity: 0.45, cursor: 'not-allowed' }}>Disabled</button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 15, fontWeight: 600, cursor: 'progress' }}>
            <span style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid var(--on-ink)', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
            <span style={{ opacity: 0.55 }}>Saving…</span>
          </button>
          <span style={{ width: 1, height: 32, background: 'var(--border)' }} />
          <button aria-label="Add" className="i-lift i-press-94" style={{ width: 44, height: 44, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 220ms' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
          <button aria-label="Search" className="i-lift i-press-94" style={{ width: 44, height: 44, borderRadius: 6, border: 'none', background: 'var(--accent-soft)', color: 'var(--accent)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 220ms' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          </button>
        </div>
      </div>
    </Section>
  );
}
