import { useRef, useState } from 'react';
import { SPRING, GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Heroes, ambient surfaces & flow patterns — Jahez pattern library
   (design.md §17.4, §17.5, §17.6, §17.7)
──────────────────────────────────────────────────────────────────────── */

/* ── AuroraMeshHero — layered radial gradients drifting via
      background-position + blurred floating orbs (§17.4). Landing hero
      without video. Counts as the page's gradient budget. */
export function AuroraMeshHero({ children, minHeight = 260 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 6, overflow: 'hidden', minHeight,
      border: '1px solid var(--border)',
      background: [
        'radial-gradient(60% 80% at 20% 10%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)',
        'radial-gradient(50% 70% at 85% 90%, color-mix(in srgb, var(--info) 18%, transparent), transparent 60%)',
        'radial-gradient(40% 55% at 60% 40%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 65%)',
      ].join(', ') + ', var(--surface)',
      backgroundSize: '160% 160%, 150% 150%, 170% 170%, auto',
      animation: 'meshDrift 16s ease-in-out infinite',
    }}>
      <div style={{ position: 'relative', padding: 28 }}>{children}</div>
    </div>
  );
}

/* ── CursorSpotlight — radial gradient recenters on mousemove over a faint
      dot grid (§17.4). Tech product pages. */
export function CursorSpotlight({ children, minHeight = 200 }: { children: React.ReactNode; minHeight?: number }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      style={{
        position: 'relative', borderRadius: 6, overflow: 'hidden', minHeight, border: '1px solid var(--border)',
        background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%), radial-gradient(var(--border) 1px, transparent 1px) 0 0 / 22px 22px, var(--bg-deep)`,
      }}
    >
      <div style={{ position: 'relative', padding: 24 }}>{children}</div>
    </div>
  );
}

/* ── GenerateButton — the AI action (§17.1): a rotating conic ring behind
      a dark pill; the inner button masks the center. Long-running
      generative or processing actions. */
export function GenerateButton({ children = 'Generate', onClick }: { children?: React.ReactNode; onClick?: () => void }) {
  return (
    <span style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', borderRadius: 6, padding: 2, overflow: 'hidden', isolation: 'isolate' }}>
      <span aria-hidden style={{
        position: 'absolute', inset: -22, zIndex: -1,
        background: 'conic-gradient(from 0deg, var(--accent), transparent 30%, color-mix(in srgb, var(--accent) 60%, var(--info)) 50%, transparent 75%, var(--accent) 100%)',
        animation: 'spin 3s linear infinite',
      }} />
      <button onClick={onClick} className="i-press-97" style={{ position: 'relative', height: 44, padding: '0 24px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" /></svg>
        {children}
      </button>
    </span>
  );
}

/* ── GlowInput — "smart search" field (§17.1): a blurred animated gradient
      halo behind the input border. */
export function GlowInput({ placeholder = 'Ask anything…' }: { placeholder?: string }) {
  const [focus, setFocus] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <span aria-hidden style={{
        position: 'absolute', inset: -3, borderRadius: 6, filter: 'blur(10px)', opacity: focus ? 0.8 : 0.35, transition: 'opacity 300ms',
        background: 'linear-gradient(100deg, var(--accent), color-mix(in srgb, var(--accent) 50%, var(--info)), var(--accent))',
        backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite',
      }} />
      <input
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{ position: 'relative', width: '100%', boxSizing: 'border-box', height: 46, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', padding: '0 16px', fontFamily: 'inherit', fontSize: 15, outline: 'none' }}
      />
    </span>
  );
}

/* ── AgentTimeline — vertical expandable steps with per-step state
      (§17.7). Onboarding progress, task pipelines. */
export interface TimelineStep {
  title: React.ReactNode;
  detail?: React.ReactNode;
  state: 'done' | 'active' | 'error' | 'pending';
}

const STEP_COLOR: Record<TimelineStep['state'], string> = {
  done: 'var(--success)', active: 'var(--accent)', error: 'var(--danger)', pending: 'var(--border-strong)',
};

export function AgentTimeline({ steps }: { steps: TimelineStep[] }) {
  const [open, setOpen] = useState(() => steps.findIndex((s) => s.state === 'active'));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((s, i) => {
        const isOpen = open === i && s.detail;
        return (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', flex: 'none', display: 'grid', placeItems: 'center', background: s.state === 'pending' ? 'var(--surface-2)' : `color-mix(in srgb, ${STEP_COLOR[s.state]} 16%, transparent)`, border: `1.5px solid ${STEP_COLOR[s.state]}` }}>
                {s.state === 'done' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
                {s.state === 'active' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'pulseDot 1.6s ease-in-out infinite' }} />}
                {s.state === 'error' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="3.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>}
              </span>
              {i < steps.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 14, borderRadius: 2, background: s.state === 'done' ? 'var(--success)' : 'var(--border)' }} />}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? 14 : 0, flex: 1 }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ display: 'block', border: 'none', background: 'none', padding: 0, cursor: s.detail ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, color: s.state === 'pending' ? 'var(--text-3)' : 'var(--text)', textAlign: 'start' }}>{s.title}</button>
              <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0, transition: `grid-template-rows 380ms ${GLIDE}, opacity 260ms` }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: '19px', paddingTop: 4 }}>{s.detail}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── SwipeableListRow — horizontal offset tracking reveals an action layer
      under the row (§17.6). Mobile lists. RTL-aware: pass `rtl` so the
      reveal direction follows the reading direction. */
export function SwipeableListRow({ children, actionLabel = 'Archive', onAction, rtl = false }: { children: React.ReactNode; actionLabel?: string; onAction?: () => void; rtl?: boolean }) {
  const OPEN = 92;
  const dirSign = rtl ? 1 : -1; // swipe toward the end edge
  const [x, setX] = useState(0);
  const [drag, setDrag] = useState(false);
  const start = useRef(0);

  return (
    <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <button
        onClick={() => { onAction?.(); setX(0); }}
        style={{ position: 'absolute', insetBlock: 0, insetInlineEnd: 0, width: OPEN, border: 'none', background: 'var(--warning)', color: '#fff', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}
      >{actionLabel}</button>
      <div
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); start.current = e.clientX - x; setDrag(true); }}
        onPointerMove={(e) => {
          if (!drag) return;
          const raw = e.clientX - start.current;
          const limited = dirSign < 0 ? Math.max(Math.min(raw, 0), -OPEN) : Math.min(Math.max(raw, 0), OPEN);
          setX(limited);
        }}
        onPointerUp={() => { setDrag(false); setX(Math.abs(x) > OPEN * 0.5 ? OPEN * dirSign : 0); }}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
          background: 'var(--surface)', cursor: 'grab', touchAction: 'pan-y', userSelect: 'none',
          transform: `translateX(${x}px)`, transition: drag ? 'none' : `transform 420ms ${SPRING}`,
        }}
      >{children}</div>
    </div>
  );
}

/* ── MagnifyingDock — macOS dock (§17.5): icon scale is a function of
      distance from the hovered index (0 / ±1 / ±2). */
export function MagnifyingDock({ icons, labels }: { icons: React.ReactNode[]; labels: string[] }) {
  const [hov, setHov] = useState(-1);
  const scaleFor = (i: number) => {
    if (hov < 0) return 1;
    const d = Math.abs(i - hov);
    return d === 0 ? 1.32 : d === 1 ? 1.14 : d === 2 ? 1.05 : 1;
  };
  const liftFor = (i: number) => {
    if (hov < 0) return 0;
    const d = Math.abs(i - hov);
    return d === 0 ? -10 : d === 1 ? -5 : d === 2 ? -2 : 0;
  };
  return (
    <div onMouseLeave={() => setHov(-1)} style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 8, padding: 10, borderRadius: 6, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'inset 0 1px 0 var(--glass-hl)', }}>
      {icons.map((icon, i) => (
        <button
          key={i}
          aria-label={labels[i]}
          onMouseEnter={() => setHov(i)}
          style={{
            width: 44, height: 44, borderRadius: 6, border: 'none', background: 'var(--surface)', color: 'var(--text-2)',
            cursor: 'pointer', display: 'grid', placeItems: 'center',            transform: `scale(${scaleFor(i)}) translateY(${liftFor(i)}px)`, transformOrigin: 'bottom center',
            transition: `transform 240ms ${SPRING}`,
          }}
        >{icon}</button>
      ))}
    </div>
  );
}
