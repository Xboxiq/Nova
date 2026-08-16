import { Section, SectionHeader } from '../SectionHeader';

export function Motion() {
  return (
    <Section label="Motion" padding="88px 32px 96px">
      <SectionHeader eyebrow="27 · MOTION" title="Motion — physics, not fireworks">
        Four durations, three curves. Only transform, opacity, filter and shadow ever animate. Exits run at 60% of entrances.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-2)' }}>--dur-1</span><span style={{ fontWeight: 600 }}>140ms · micro</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-2)' }}>--dur-2</span><span style={{ fontWeight: 600 }}>220ms · controls</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-2)' }}>--dur-3</span><span style={{ fontWeight: 600 }}>340ms · cards</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-2)' }}>--dur-4</span><span style={{ fontWeight: 600 }}>560ms · overlays</span></div>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <div style={{ color: 'var(--text-2)', fontSize: 12, lineHeight: '19px' }}>ease-out · 0.22, 1, 0.36, 1<br />spring · 0.34, 1.45, 0.64, 1<br />ease-in (exit) · 0.55, 0, 1, 0.45</div>
        </div>

        <div className="i-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', transition: 'transform 340ms cubic-bezier(0.22,1,0.36,1), box-shadow 340ms' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Hover lift</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', textAlign: 'center' }}>−3px · shadow 1→2<br />340ms ease-out</div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <button className="i-press-94" style={{ height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', transition: 'transform 140ms cubic-bezier(0.22,1,0.36,1)' }}>Press &amp; hold me</button>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', textAlign: 'center' }}>Press scale 0.97<br />140ms — feels pushable</div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--accent)', boxShadow: 'var(--shadow-2)', animation: 'floaty 5s ease-in-out infinite' }} />
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Ambient float</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', textAlign: 'center' }}>≤6px · ≥5s · one per hero<br />the only allowed loop</div>
        </div>
      </div>

      <div style={{ marginTop: 56, borderRadius: 30, background: 'var(--ink)', color: 'var(--on-ink)', padding: '56px 40px', textAlign: 'center', boxShadow: 'var(--shadow-3)' }}>
        <div style={{ fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>Everything above lives in design.md</div>
        <div style={{ fontSize: 15.5, opacity: 0.65, margin: '12px auto 24px', maxWidth: '52ch', lineHeight: '24px' }}>Tokens, recipes, decision trees, RTL rules, the anti-slop constitution — one file any agent can build from.</div>
        <button className="i-cta i-press-97" style={{ height: 48, padding: '0 26px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Open design.md</button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', color: 'var(--text-3)', fontSize: 13 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'conic-gradient(from 210deg, var(--accent), var(--accent-soft), var(--accent))' }} />Madar مدار · v1.0
        </span>
        <span>5 themes · 3 glass levels · RTL + LTR · motion-rich</span>
      </div>
    </Section>
  );
}
