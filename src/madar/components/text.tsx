/* ────────────────────────────────────────────────────────────────────────
   Expressive text — design.md §18.3
──────────────────────────────────────────────────────────────────────── */

/** DiaText — edwinvakayil/dia-text. Wrap key words of a paragraph in
    <Ignite> spans: gradient-clipped text that brightens on hover.
    One paragraph per page, marketing only. */
export function DiaText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontSize: 21, lineHeight: '34px', fontWeight: 500, margin: 0, maxWidth: '30ch', ...style }}>{children}</p>
  );
}

export function Ignite({ children, shift = 0 }: { children: React.ReactNode; /** hue swing direction: −1, 0, or 1 */ shift?: number }) {
  const grad = shift >= 0
    ? 'linear-gradient(100deg, oklch(from var(--accent) calc(l - 0.1) c calc(h - 25)), var(--accent))'
    : 'linear-gradient(100deg, var(--accent), oklch(from var(--accent) calc(l - 0.08) c calc(h + 30)))';
  return (
    <span className="i-ignite" style={{ background: grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', fontWeight: 700, cursor: 'default', transition: 'filter 220ms' }}>
      {children}
    </span>
  );
}

/** GradientShimmerText — mona_biasia/gradient-shimmer. A single line whose
    light sweeps across via an animated background-position. One line max. */
export function GradientShimmerText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: 22, fontWeight: 600,
      background: 'linear-gradient(90deg, var(--text-3) 35%, var(--text) 50%, var(--text-3) 65%)',
      backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
      color: 'transparent', WebkitTextFillColor: 'transparent', animation: 'shimmer 2.6s linear infinite',
      ...style,
    }}>{children}</div>
  );
}

/** GradientHeadline — static accent-gradient display text (§17.4). */
export function GradientHeadline({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15,
      background: 'linear-gradient(100deg, oklch(from var(--accent) calc(l - 0.12) c calc(h - 25)), var(--accent) 50%, oklch(from var(--accent) calc(l - 0.05) c calc(h + 25)))',
      WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
      ...style,
    }}>{children}</div>
  );
}

/** SkillsShowcase — jatin-yadav05/skills-showcase. Wrapping chip cloud with
    an optional "+N more" count badge. Profiles and portfolios. */
export function SkillsShowcase({ skills, more }: { skills: string[]; more?: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {skills.map((s) => (
        <span key={s} className="i-lift" style={{ padding: '7px 14px', borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 13, fontWeight: 600, cursor: 'default', transition: 'transform 220ms' }}>{s}</span>
      ))}
      {more != null && more > 0 && (
        <span style={{ padding: '7px 14px', borderRadius: 6, border: '1px dashed var(--border-strong)', color: 'var(--text-3)', fontSize: 13, fontWeight: 600 }}>+{more} more</span>
      )}
    </div>
  );
}

/** IridescentFoilCard — dqnamo/iridescent-foil. 7-stop pastel holographic
    gradient + white radial sheen; hover slides the background 900ms.
    Collectibles, memberships, gift cards — ONE per screen. */
export function IridescentFoilCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="i-foil" style={{
      position: 'relative', borderRadius: 6, padding: 24, border: '1px solid var(--border)', overflow: 'hidden',
      background: 'linear-gradient(115deg, #F6E7F0 0%, #E7EDF9 18%, #E4F4EE 36%, #F8F1E2 54%, #EEE6F8 72%, #E5F0F7 90%, #F6E7F0 100%)',
      backgroundSize: '280% 280%', cursor: 'pointer', transition: 'background-position 900ms ease',
      ...style,
    }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(at 70% 20%, rgba(255,255,255,0.75), transparent 55%)' }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
