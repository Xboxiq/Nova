import { Section } from '../SectionHeader';

/* ────────────────────────────────────────────────────────────────────────
   Hero — Ethereal Glass showpiece (high-end-visual-design skill).
   Vivid aurora backdrop so glass actually reads · Double-Bezel nested
   cards · Button-in-Button CTA · Z-axis cascade of floating glass panels ·
   heavy fade-up reveal on a custom cubic-bezier. Recolors with the accent.
──────────────────────────────────────────────────────────────────────── */

const EASE = 'cubic-bezier(0.32,0.72,0,1)';
const reveal = (delay: number): React.CSSProperties => ({ animation: `heroReveal 900ms ${EASE} ${delay}ms both` });

// grain overlay — fixed, pointer-events none per the perf guardrail
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/** Double-Bezel glass panel: aluminium outer tray + glass inner core with a
    top specular highlight, floating over the aurora. */
function GlassPanel({ children, style, tilt = 0, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; tilt?: number; delay?: number }) {
  return (
    <div style={{ ...reveal(delay), transform: `rotate(${tilt}deg)` }}>
      <div style={{
        padding: 6, borderRadius: 6,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
 ...style,
      }}>
        <div style={{
          position: 'relative', borderRadius: 6, overflow: 'hidden',
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.2)',
          padding: 18,
        }}>
          <span aria-hidden style={{ position: 'absolute', insetInline: 0, top: 0, height: '55%', background: 'linear-gradient(180deg, rgba(255,255,255,0.14), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', color: '#fff' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <Section label="Hero pattern" maxWidth={1240} padding="0 16px">
      <div style={{
        position: 'relative', marginTop: 12, borderRadius: 6, overflow: 'hidden', minHeight: 660, isolation: 'isolate',
        background: 'radial-gradient(120% 90% at 50% -10%, oklch(0.32 0.09 274), oklch(0.16 0.05 274) 60%, oklch(0.11 0.04 274))',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* aurora orbs — recolor with the accent, drift slowly */}
        <span aria-hidden style={{ position: 'absolute', top: '-18%', insetInlineStart: '8%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, oklch(from var(--accent) 0.7 0.2 h / 0.9), transparent 65%)', filter: 'blur(60px)', animation: 'auroraDrift 18s ease-in-out infinite', zIndex: 0 }} />
        <span aria-hidden style={{ position: 'absolute', bottom: '-22%', insetInlineEnd: '4%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, oklch(from var(--accent) 0.62 0.19 calc(h + 40) / 0.85), transparent 62%)', filter: 'blur(70px)', animation: 'auroraDrift 22s ease-in-out 2s infinite', zIndex: 0 }} />
        <span aria-hidden style={{ position: 'absolute', top: '30%', insetInlineStart: '52%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, oklch(0.6 0.17 245 / 0.6), transparent 65%)', filter: 'blur(64px)', animation: 'auroraDrift 26s ease-in-out 1s infinite', zIndex: 0 }} />
        {/* faint dot grid + grain */}
        <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 26px 26px', zIndex: 0 }} />
        <span aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.28, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '18px 22px 40px' }}>
          {/* Fluid Island glass navbar — Double-Bezel */}
          <div style={{ ...reveal(0), display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: 5, borderRadius: 6, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px 7px 16px', borderRadius: 6, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginInlineEnd: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'conic-gradient(from 210deg, var(--accent), oklch(from var(--accent) l c calc(h + 60)), var(--accent))', }} />
                  <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Madar</span>
                </div>
                <nav style={{ display: 'flex', gap: 2 }}>
                  {['Home', 'Features', 'Pricing', 'Docs'].map((l, i) => (
                    <a key={l} href="#" className="hero-navlink" style={{ textDecoration: 'none', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.62)', fontSize: 13, fontWeight: i === 0 ? 600 : 500, padding: '7px 13px', borderRadius: 6, background: i === 0 ? 'rgba(255,255,255,0.14)' : 'transparent', transition: `background 300ms ${EASE}, color 300ms` }}>{l}</a>
                  ))}
                </nav>
                {/* secondary intent, distinct from the hero's primary CTA (§14 no-duplicate-intent) */}
                <button style={{ marginInlineStart: 12, height: 38, padding: '0 18px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', transition: `background 300ms ${EASE}` }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>Sign in</button>
              </div>
            </div>
          </div>

          {/* headline stack */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '68px 20px 8px', maxWidth: 900, margin: '0 auto' }}>
            <span style={{ ...reveal(120), display: 'inline-flex', alignItems: 'center', gap: 9, padding: '6px 16px', borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', }} />
              One system · five moods · two directions
            </span>
            <h1 style={{ ...reveal(220), fontSize: 'clamp(42px, 6vw, 74px)', lineHeight: 1.04, fontWeight: 600, letterSpacing: '-0.035em', margin: '26px 0 0', color: '#fff', textWrap: 'balance' as const }}>
              Calm design for<br />every platform you build
            </h1>
            <p style={{ ...reveal(320), fontSize: 18, lineHeight: '28px', color: 'rgba(255,255,255,0.66)', maxWidth: '54ch', margin: '20px 0 0', textWrap: 'pretty' as const }}>
              A bilingual, multi-theme design language. Apple physics, Notion calm, Vercel precision, engineered into 130+ live components.
            </p>
            <div style={{ ...reveal(420), display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="hero-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 52, padding: '0 8px 0 26px', borderRadius: 6, border: 'none', background: '#fff', color: '#0b0b12', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: `transform 500ms ${EASE}` }}>
                Start building
                <span className="hero-cta-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', transition: `transform 500ms ${EASE}` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              </button>
              <button style={{ height: 52, padding: '0 24px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: `background 300ms ${EASE}` }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>Read design.md</button>
            </div>
          </div>

          {/* Z-axis cascade of floating glass panels */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginTop: 46 }}>
            {/* revenue */}
            <GlassPanel tilt={-3} delay={560} style={{ width: 268 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>MONTHLY REVENUE</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginTop: 8 }}>
                <div>
                  <span style={{ fontSize: 30, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>84,120</span>
                  <div style={{ marginTop: 6 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 6, background: 'rgba(120,230,180,0.18)', color: 'oklch(0.85 0.16 158)', fontSize: 12, fontWeight: 700 }}>↑ 12.4%</span></div>
                </div>
                <svg width="92" height="38" viewBox="0 0 92 38" fill="none"><polyline points="2,30 16,24 30,27 44,14 58,18 72,7 90,11" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="90" cy="11" r="3" fill="var(--accent)" /></svg>
              </div>
            </GlassPanel>

            {/* focus ring — floats highest */}
            <GlassPanel tilt={0} delay={640} style={{ width: 236, marginTop: -18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>FOCUS TIMER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <svg width="60" height="60" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="44" transform="rotate(-90 32 32)" style={{ filter: 'drop-shadow(0 0 6px oklch(from var(--accent) l c h / 0.8))' }} />
                </svg>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>31:47</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)' }}>of 60 min</div>
                </div>
              </div>
            </GlassPanel>

            {/* live activity */}
            <GlassPanel tilt={3} delay={720} style={{ width: 268 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.8 0.16 158)', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>طلبك في الطريق</span>
                <span style={{ marginInlineStart: 'auto', fontSize: 12, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>12 min</span>
              </div>
              <div style={{ height: 5, borderRadius: 6, background: 'rgba(255,255,255,0.14)', overflow: 'hidden' }}><div style={{ width: '62%', height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, var(--accent), oklch(from var(--accent) l c calc(h + 50)))' }} /></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.6, marginTop: 8 }}><span>المطعم</span><span>السائق</span><span>منزلك</span></div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </Section>
  );
}
