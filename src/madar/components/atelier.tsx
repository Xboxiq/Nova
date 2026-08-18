import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Atelier — the premium tier. Applies the high-end-visual-design skill:
   Double-Bezel (machined nested enclosures), Island CTA with magnetic
   button-in-button physics, pointer-tracked specular haptics, heavy
   IntersectionObserver scroll-reveals, and editorial-luxury Didone figures.
   Everything is token-driven, so it recolors across all five themes and
   mirrors under RTL. Motion touches only transform / opacity / filter.
──────────────────────────────────────────────────────────────────────── */

const EASE = 'cubic-bezier(0.32,0.72,0,1)'; // heavy, physical

/* ── AtelierEyebrow — the microscopic pill that precedes a display heading. */
export function AtelierEyebrow({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 6, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-2)', background: 'color-mix(in srgb, var(--text) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--text) 9%, transparent)' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
      {children}
    </span>
  );
}

/* ── BezelCard — the "glass plate in a machined tray" (Doppelrand). An outer
      shell holds an inner core with concentric radii + an inset top highlight.
      radius = outer; the inner radius is computed for true concentricity. */
export interface BezelCardProps { children?: ReactNode; radius?: number; inset?: number; style?: CSSProperties; innerStyle?: CSSProperties; className?: string; }
export function BezelCard({ children, radius = 28, inset = 6, style, innerStyle, className }: BezelCardProps) {
  return (
    <div className={className} style={{ borderRadius: radius, padding: inset, background: 'color-mix(in srgb, var(--text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--text) 8%, transparent)', ...style }}>
      <div style={{ borderRadius: radius - inset, background: 'var(--surface)', boxShadow: 'inset 0 1px 0 color-mix(in srgb, white 55%, transparent), inset 0 0 0 1px color-mix(in srgb, var(--text) 5%, transparent)', overflow: 'hidden', height: '100%', ...innerStyle }}>
        {children}
      </div>
    </div>
  );
}

/* ── MagneticCTA — island pill with a button-in-button trailing icon. The
      whole pill drifts toward the cursor (magnetic); the nested icon circle
      translates diagonally + scales; press compresses the pill. */
export interface MagneticCTAProps { label?: string; onClick?: () => void; tone?: 'accent' | 'ink'; icon?: ReactNode; }
export function MagneticCTA({ label = 'ابدأ الآن', onClick, tone = 'ink', icon }: MagneticCTAProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const bg = tone === 'accent' ? 'var(--accent)' : 'var(--ink)';
  const fg = tone === 'accent' ? 'var(--on-accent)' : 'var(--on-ink)';
  return (
    <button
      ref={ref} onClick={onClick}
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2); const dy = e.clientY - (r.top + r.height / 2); setT({ x: dx * 0.18, y: dy * 0.22 }); }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => { setHover(false); setT({ x: 0, y: 0 }); }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 14, height: 54, paddingInline: '26px 8px', borderRadius: 6, border: 'none', background: bg, color: fg, fontFamily: 'inherit', fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em', cursor: 'pointer', transform: `translate(${t.x}px, ${t.y}px) scale(${hover ? 1 : 1})`, transition: `transform 500ms ${EASE}`, willChange: 'transform' }}
      onPointerDown={(e) => { e.currentTarget.style.transform = `translate(${t.x}px, ${t.y}px) scale(0.97)`; }}
      onPointerUp={(e) => { e.currentTarget.style.transform = `translate(${t.x}px, ${t.y}px) scale(1)`; }}
    >
      {label}
      <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'color-mix(in srgb, var(--on-ink) 14%, transparent)', display: 'grid', placeItems: 'center', transform: hover ? 'translate(calc(var(--dir-sign,1) * 3px), -2px) scale(1.06)' : 'none', transition: `transform 500ms ${EASE}` }}>
        {icon ?? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M7 17L17 7M9 7h8v8" /></svg>}
      </span>
    </button>
  );
}

/* ── RevealOnView — heavy fade-up + de-blur as the element enters the
      viewport (IntersectionObserver, never a scroll listener). Honors
      reduced-motion by rendering resolved immediately. */
export function RevealOnView({ children, delay = 0, y = 26, as: Tag = 'div', style }: { children: ReactNode; delay?: number; y?: number; as?: 'div' | 'span' | 'section'; style?: CSSProperties }) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setSeen(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} style={{ ...style, transform: seen ? 'none' : `translateY(${y}px)`, opacity: seen ? 1 : 0, filter: seen ? 'blur(0)' : 'blur(10px)', transition: `transform 820ms ${EASE} ${delay}ms, opacity 820ms ${EASE} ${delay}ms, filter 820ms ${EASE} ${delay}ms`, willChange: 'transform, opacity, filter' }}>
      {children}
    </Tag>
  );
}

/* ── SpecularCard — a bezel whose surface catches a pointer-tracked specular
      highlight and tilts a few degrees, with a reactive shadow. Haptic depth. */
export function SpecularCard({ children, radius = 26, maxTilt = 7, style }: { children?: ReactNode; radius?: number; maxTilt?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [s, setS] = useState({ rx: 0, ry: 0, mx: 50, my: 0, on: false });
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setS({ rx: (0.5 - py) * maxTilt * 2, ry: (px - 0.5) * maxTilt * 2, mx: px * 100, my: py * 100, on: true });
  };
  return (
    <div
      ref={ref} onPointerMove={onMove} onPointerLeave={() => setS((v) => ({ ...v, rx: 0, ry: 0, on: false }))}
      style={{ position: 'relative', borderRadius: radius, padding: 6, background: 'color-mix(in srgb, var(--text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--text) 8%, transparent)', transformStyle: 'preserve-3d', perspective: 900, transform: `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`, transition: `transform 320ms ${EASE}, box-shadow 320ms ${EASE}`, boxShadow: s.on ? `${-s.ry * 1.4}px ${s.rx * 1.4 + 16}px 40px color-mix(in srgb, var(--accent) 14%, transparent), var(--shadow-2)` : 'var(--shadow-1)', ...style }}
    >
      <div style={{ position: 'relative', borderRadius: radius - 6, background: 'var(--surface)', overflow: 'hidden', height: '100%', boxShadow: 'inset 0 1px 0 color-mix(in srgb, white 55%, transparent)' }}>
        {children}
        {/* specular sheen following the pointer */}
        <span aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: s.on ? 1 : 0, transition: 'opacity 320ms', background: `radial-gradient(340px circle at ${s.mx}% ${s.my}%, color-mix(in srgb, white 30%, transparent), transparent 60%)`, mixBlendMode: 'overlay' }} />
      </div>
    </div>
  );
}

/* ── EditorialFigure — an oversized high-contrast Didone numeral with an
      eyebrow and a hairline. The editorial-luxury signature. */
export function EditorialFigure({ value, eyebrow, label, sub }: { value: string; eyebrow?: string; label?: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {eyebrow && <AtelierEyebrow>{eyebrow}</AtelierEyebrow>}
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(56px, 8vw, 104px)', lineHeight: 0.92, letterSpacing: '-0.02em', fontVariantNumeric: 'lining-nums tabular-nums', color: 'var(--text)' }}>{value}</div>
      <span aria-hidden style={{ height: 1, width: 64, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
      {label && <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{label}</div>}
      {sub && <div style={{ fontSize: 13.5, color: 'var(--text-3)', maxWidth: '30ch', lineHeight: '20px' }}>{sub}</div>}
    </div>
  );
}

/* ── DisplaySerif — a convenience wrapper for luxe Latin display headings. */
export function DisplaySerif({ children, size = 'clamp(38px, 6vw, 82px)', style }: { children: ReactNode; size?: string; style?: CSSProperties }) {
  return <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.02em', ...style }}>{children}</span>;
}
