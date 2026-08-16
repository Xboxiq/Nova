import { useState } from 'react';
import { SPRING, GLIDE } from './physics';
import { OdometerNumber } from './motion';

/* ────────────────────────────────────────────────────────────────────────
   Signature rituals & hero-grade cards — Icons & Cards Lab + Jahez
   pattern library (design.md §16, §17.3). One ritual family per page;
   idle state must look complete without the ritual.
──────────────────────────────────────────────────────────────────────── */

/* ── SelfDrawingIcon — the 5th icon ritual (§16.1): strokes carry
      dasharray = path length; hover draws the glyph in 600–900ms.
      Onboarding highlights, empty states, "how it works" steps. */
export interface SelfDrawingIconProps {
  /** Paths of a 24×24 stroke icon. */
  paths: string[];
  size?: number;
  pathLength?: number;
  durationMs?: number;
}

export function SelfDrawingIcon({ paths, size = 26, pathLength = 60, durationMs = 750 }: SelfDrawingIconProps) {
  const [hov, setHov] = useState(false);
  return (
    <span onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: 'inline-flex', padding: 12, borderRadius: 14, background: 'var(--accent-soft)', cursor: 'pointer' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* idle ghost so the resting tile reads complete (§16.3 rule 2) */}
        {paths.map((d, i) => <path key={`g${i}`} d={d} style={{ opacity: hov ? 0 : 0.3, transition: 'opacity 200ms' }} />)}
        {paths.map((d, i) => (
          <path
            key={i} d={d} pathLength={pathLength}
            strokeDasharray={pathLength}
            strokeDashoffset={hov ? 0 : pathLength}
            style={{ transition: `stroke-dashoffset ${durationMs}ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms` }}
          />
        ))}
      </svg>
    </span>
  );
}

/* ── IconOrbitRing — integrations ring (§17.2): icons distributed by
      angle; the ring rotates while each icon counter-rotates to stay
      upright. */
export function IconOrbitRing({ icons, size = 150, period = 22 }: { icons: React.ReactNode[]; size?: number; period?: number }) {
  const r = size / 2 - 20;
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center', flex: 'none' }}>
      <span style={{ position: 'absolute', inset: 14, borderRadius: '50%', border: '1px dashed var(--border-strong)' }} />
      <span style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-2)', zIndex: 1 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /></svg>
      </span>
      <span style={{ position: 'absolute', inset: 0, animation: `spin ${period}s linear infinite` }}>
        {icons.map((icon, i) => {
          const a = (i / icons.length) * 360;
          return (
            <span key={i} style={{ position: 'absolute', top: '50%', left: '50%', transform: `rotate(${a}deg) translateY(${-r}px)` }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, marginTop: -16, marginLeft: -16, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-1)', color: 'var(--text-2)', transform: `rotate(${-a}deg)`, animation: `spinReverse ${period}s linear infinite` }}>
                {icon}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

/* ── AnimatedStateIcon — inline result feedback (§17.2): success draws its
      check, error shakes ±4px, loading orbits. Pick by `state`. */
export function AnimatedStateIcon({ state }: { state: 'loading' | 'success' | 'error' }) {
  if (state === 'loading') {
    return <span aria-label="Loading" style={{ width: 22, height: 22, borderRadius: '50%', border: '2.5px solid var(--accent-soft)', borderTopColor: 'var(--accent)', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />;
  }
  if (state === 'success') {
    return (
      <span aria-label="Success" style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--success-soft)', display: 'inline-grid', placeItems: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" strokeDasharray={240} style={{ animation: 'drawLine 500ms cubic-bezier(0.22,1,0.36,1) forwards' }} /></svg>
      </span>
    );
  }
  return (
    <span aria-label="Error" style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--danger-soft)', display: 'inline-grid', placeItems: 'center', animation: 'shakeX 450ms ease-in-out' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </span>
  );
}

/* ── BlueprintCard — engineering grid fades in on hover over a technical
      card (§17.3). Specs, developer features. */
export function BlueprintCard({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: 'relative', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'var(--shadow-1)', overflow: 'hidden', cursor: 'pointer' }}>
      <span aria-hidden style={{
        position: 'absolute', inset: 0, opacity: hov ? 1 : 0, transition: 'opacity 400ms',
        background: 'repeating-linear-gradient(0deg, color-mix(in srgb, var(--info) 10%, transparent) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, color-mix(in srgb, var(--info) 10%, transparent) 0 1px, transparent 1px 20px)',
      }} />
      <div style={{ position: 'relative', padding: 20 }}>{children}</div>
    </div>
  );
}

/* ── ApertureCard — iris/spotlight radial mask opens over the card on
      hover (§17.3). Reveal moments. */
export function ApertureCard({ cover, children }: { cover: React.ReactNode; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', minHeight: 150 }}>
      <div style={{ padding: 20 }}>{children}</div>
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'var(--ink)', color: 'var(--on-ink)',
        clipPath: hov ? 'circle(0% at 50% 50%)' : 'circle(75% at 50% 50%)',
        transition: `clip-path 650ms ${GLIDE}`,
      }}>{cover}</div>
    </div>
  );
}

/* ── BreakerCard — a switch inside the card energizes it: color floods on
      (§17.3). Activation and enable states. */
export function BreakerCard({ title, description, defaultOn = false }: { title: React.ReactNode; description: React.ReactNode; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{
      borderRadius: 18, padding: 20, border: on ? '1px solid var(--accent)' : '1px solid var(--border)',
      background: on ? 'color-mix(in srgb, var(--accent) 10%, var(--surface))' : 'var(--surface)',
      boxShadow: on ? '0 8px 28px color-mix(in srgb, var(--accent) 22%, transparent)' : 'var(--shadow-1)',
      transition: 'background 450ms, border-color 450ms, box-shadow 450ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: on ? 'var(--text)' : 'var(--text-2)', transition: 'color 300ms' }}>{title}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 3 }}>{description}</div>
        </div>
        <button role="switch" aria-checked={on} onClick={() => setOn((v) => !v)} style={{ position: 'relative', width: 48, height: 28, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer', flex: 'none', background: on ? 'var(--accent)' : 'var(--border-strong)', transition: 'background 300ms' }}>
          <span style={{ position: 'absolute', top: 2.5, insetInlineStart: on ? 22.5 : 2.5, width: 23, height: 23, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: `inset-inline-start 380ms ${SPRING}` }} />
        </button>
      </div>
    </div>
  );
}

/* ── MeterDial — SVG gauge sweeps + digits count up (§17.3). Scores,
      capacity. */
export function MeterDial({ value, max = 100, label, size = 120 }: { value: number; max?: number; label?: string; size?: number }) {
  const frac = Math.max(0, Math.min(value / max, 1));
  const r = size / 2 - 10;
  const C = Math.PI * r; // half circle
  return (
    <span style={{ position: 'relative', width: size, height: size / 2 + 26, display: 'inline-block' }}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        <path d={`M 10 ${size / 2 + 5} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2 + 5}`} fill="none" stroke="var(--surface-2)" strokeWidth="10" strokeLinecap="round" />
        <path
          d={`M 10 ${size / 2 + 5} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2 + 5}`} fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - frac)}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <span style={{ position: 'absolute', insetInline: 0, bottom: 0, textAlign: 'center' }}>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}><OdometerNumber value={value} /></span>
        {label && <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.06em' }}>{label}</span>}
      </span>
    </span>
  );
}

/* ── TiltedStack3D — stacked cards fan upward with perspective + rotateX
      on hover (§17.3). Wallets, document piles. */
export function TiltedStack3D({ layers }: { layers: [React.ReactNode, React.ReactNode, React.ReactNode] }) {
  const [hov, setHov] = useState(false);
  const card = (i: number): React.CSSProperties => ({
    position: 'absolute', insetInline: 0, top: 0, borderRadius: 16, padding: '14px 18px', height: 74,
    background: i === 0 ? 'var(--surface)' : i === 1 ? 'var(--surface-2)' : 'var(--bg-deep)',
    border: '1px solid var(--border)', boxShadow: hov ? 'var(--shadow-3)' : 'var(--shadow-1)',
    transform: hov
      ? `translateY(${i * -46}px) rotateX(14deg) scale(${1 - i * 0.03})`
      : `translateY(${i * -10}px) rotateX(0deg) scale(${1 - i * 0.04})`,
    zIndex: 3 - i, transformOrigin: 'bottom center',
    transition: `transform 500ms ${SPRING}, box-shadow 400ms`,
  });
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: 'relative', height: 190, perspective: 800, cursor: 'pointer' }}>
      <div style={{ position: 'absolute', insetInline: 0, bottom: 0, height: 74 }}>
        {[2, 1, 0].map((i) => <div key={i} style={card(i)}>{layers[i]}</div>)}
      </div>
    </div>
  );
}

/* ── FolderCard — 3-layer CSS folder: back panel, tab, front sheet lifting
      on hover (§17.3). Drive and docs UIs. */
export function FolderCard({ name, meta, chip }: { name: React.ReactNode; meta: React.ReactNode; chip?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: 'relative', width: 190, cursor: 'pointer' }}>
      <div style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: 74, height: 26, borderRadius: '10px 10px 0 0', background: 'color-mix(in srgb, var(--accent) 28%, var(--surface-2))', border: '1px solid var(--border)', borderBottom: 'none' }} />
      <div style={{ position: 'relative', marginTop: 12, height: 96, borderRadius: '4px 14px 14px 14px', background: 'color-mix(in srgb, var(--accent) 18%, var(--surface-2))', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', insetInline: 8, bottom: 0, height: 66, borderRadius: '10px 10px 0 0',
          background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: 'none', boxShadow: 'var(--shadow-1)', padding: '10px 12px',
          transform: hov ? 'translateY(-8px)' : 'none', transition: `transform 380ms ${SPRING}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>{name}</span>
            {chip && <span style={{ fontSize: 9, fontWeight: 800, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: 5, background: 'var(--accent-soft)', color: 'var(--accent)' }}>{chip}</span>}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 3 }}>{meta}</div>
        </div>
      </div>
    </div>
  );
}
