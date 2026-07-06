import { useEffect, useRef, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Kinetics physics vocabulary — kinetics.colorion.co (design.md §19)
   Pointer-driven controls. The four canon curves:
──────────────────────────────────────────────────────────────────────── */
export const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';   // overshoot — toggles, pops, counters
export const GLIDE = 'cubic-bezier(0.16, 1.00, 0.30, 1)';    // fast-out settle — expansions, reorder
export const DRAW = 'cubic-bezier(0.65, 0.00, 0.35, 1)';     // symmetric — underlines, pill glides
export const DROP_IN = 'cubic-bezier(0.18, 1.25, 0.40, 1)';  // entrance overshoot — toasts, banners

function useTimeout() {
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);
  return t;
}

/* ── MagneticButton — magnet(0.3): translate toward pointer by 30% of the
      offset-from-center; 150ms ease-out tracking, 500ms spring return. */
export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({ children, strength = 0.3, onClick }: MagneticButtonProps) {
  const [d, setD] = useState({ x: 0, y: 0 });
  return (
    <span
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setD({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
      }}
      onMouseLeave={() => setD({ x: 0, y: 0 })}
      style={{ display: 'inline-grid', placeItems: 'center', padding: 26 }}
    >
      <button
        onClick={onClick}
        className="i-press-94"
        style={{
          height: 46, padding: '0 26px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)',
          fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
          transform: `translate(${d.x}px,${d.y}px)`,
          transition: (d.x || d.y) ? 'transform 150ms ease-out' : `transform 500ms ${SPRING}`,
        }}
      >{children}</button>
    </span>
  );
}

/* ── HoldToConfirm — hold(900ms): SVG ring drains full→0 linearly on
      pointerdown; early release snaps back in 250ms; completion flashes
      success. THE honest destructive control. */
export interface HoldToConfirmProps {
  duration?: number;
  onConfirm?: () => void;
  label?: string;
  size?: number;
}

export function HoldToConfirm({ duration = 900, onConfirm, label = 'HOLD', size = 72 }: HoldToConfirmProps) {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const t1 = useTimeout(); const t2 = useTimeout();
  const r = size / 2 - 6;
  const C = 2 * Math.PI * r;

  const start = () => {
    setHolding(true); setDone(false);
    clearTimeout(t1.current);
    t1.current = setTimeout(() => {
      setHolding(false); setDone(true); onConfirm?.();
      t2.current = setTimeout(() => setDone(false), 1600);
    }, duration);
  };
  const cancel = () => { clearTimeout(t1.current); setHolding(false); };

  return (
    <button
      aria-label="Hold to confirm" onPointerDown={start} onPointerUp={cancel} onPointerLeave={cancel}
      className="i-press-96"
      style={{ position: 'relative', width: size, height: size, borderRadius: '50%', border: 'none', background: 'var(--surface-2)', cursor: 'pointer', display: 'grid', placeItems: 'center', flex: 'none', touchAction: 'none' }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={4} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={done ? 'var(--success)' : 'var(--accent)'} strokeWidth={4} strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={(holding || done) ? 0 : C}
          style={{ transition: holding ? `stroke-dashoffset ${duration}ms linear` : 'stroke-dashoffset 250ms ease-out, stroke 300ms' }}
        />
      </svg>
      {done
        ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
        : <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-2)' }}>{label}</span>}
    </button>
  );
}

/* ── SlideToUnlock — snap · 85% latch: thumb tracks 1:1 (transition none
      while dragging); release ≥85% latches + success recolor, else spring
      return; label fades with distance. */
export interface SlideToUnlockProps {
  label?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  width?: number;
}

export function SlideToUnlock({ label = 'اسحب للتأكيد ←', confirmLabel = 'تم التأكيد ✓', onConfirm, width = 264 }: SlideToUnlockProps) {
  const MAX = width - 60;
  const [x, setX] = useState(0);
  const [ok, setOk] = useState(false);
  const [drag, setDrag] = useState(false);
  const start = useRef(0);
  const t = useTimeout();

  return (
    <div style={{ position: 'relative', width, height: 56, borderRadius: 999, background: 'var(--surface-2)', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: 0, bottom: 0, insetInlineStart: 0, width: x + 56, borderRadius: 999, background: ok ? 'var(--success-soft)' : 'var(--accent-soft)', transition: drag ? 'none' : `width 450ms ${SPRING}` }} />
      <span style={{ opacity: Math.max(1 - x / 120, 0), transition: drag ? 'none' : 'opacity 300ms', position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 13.5, fontWeight: 600, color: 'var(--text-3)', pointerEvents: 'none' }}>{label}</span>
      {ok && <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 13.5, fontWeight: 700, color: 'var(--success)', pointerEvents: 'none' }}>{confirmLabel}</span>}
      <button
        aria-label="Slide to confirm"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); start.current = e.clientX - x; setDrag(true); }}
        onPointerMove={(e) => { if (!drag) return; setX(Math.min(Math.max(e.clientX - start.current, 0), MAX)); }}
        onPointerUp={() => {
          const done = x >= MAX * 0.85;
          setDrag(false); setX(done ? MAX : 0); setOk(done);
          if (done) { onConfirm?.(); clearTimeout(t.current); t.current = setTimeout(() => { setX(0); setOk(false); }, 2000); }
        }}
        style={{
          position: 'absolute', top: 4, insetInlineStart: 4 + x, width: 48, height: 48, borderRadius: 999, border: 'none',
          background: ok ? 'var(--success)' : 'var(--ink)', color: ok ? '#fff' : 'var(--on-ink)',
          display: 'grid', placeItems: 'center', cursor: 'grab', touchAction: 'none', boxShadow: 'var(--shadow-2)',
          transition: drag ? 'background 300ms' : `inset-inline-start 450ms ${SPRING}, background 300ms`,
        }}
      >
        {ok
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>}
      </button>
    </div>
  );
}

/* ── ElasticCounter — spring(280,18): on change scale(1.25) + −5px lift +
      accent flash, settling 400ms; tabular-nums so digits don't shift. */
export function ElasticCounter({ defaultValue = 12, onChange }: { defaultValue?: number; onChange?: (v: number) => void }) {
  const [v, setV] = useState(defaultValue);
  const [bump, setBump] = useState(false);
  const t = useTimeout();
  const inc = () => {
    clearTimeout(t.current);
    const n = v + 1; setV(n); onChange?.(n); setBump(true);
    t.current = setTimeout(() => setBump(false), 400);
  };
  return (
    <button onClick={inc} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>
      <span style={{
        display: 'inline-block', minWidth: '2ch', textAlign: 'center', fontSize: 34, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em',
        color: bump ? 'var(--accent)' : 'var(--text)', transform: bump ? 'scale(1.25) translateY(-5px)' : 'none',
        transition: `transform 400ms ${SPRING}, color 250ms`,
      }}>{v}</span>
      <span style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: 17, fontWeight: 700 }}>+</span>
    </button>
  );
}

/* ── PinInput — spring(360,22): on digit, accent border + scale(1.14) pop +
      auto-focus next; Backspace on empty goes back. */
export interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
}

export function PinInput({ length = 4, onComplete }: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const [pop, setPop] = useState(-1);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const t = useTimeout();

  return (
    <div style={{ display: 'flex', gap: 10 }} dir="ltr">
      {pin.map((v, i) => (
        <input
          key={i} maxLength={1} inputMode="numeric" value={v} ref={(el) => { refs.current[i] = el; }}
          className="i-input"
          onInput={(e) => {
            const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1);
            const next = pin.slice(); next[i] = val;
            setPin(next);
            setPop(val ? i : -1);
            if (val) {
              clearTimeout(t.current);
              t.current = setTimeout(() => setPop(-1), 350);
              refs.current[i + 1]?.focus();
              if (next.every(Boolean)) onComplete?.(next.join(''));
            }
          }}
          onKeyDown={(e) => { if (e.key === 'Backspace' && !pin[i] && i > 0) refs.current[i - 1]?.focus(); }}
          style={{
            width: 46, height: 54, textAlign: 'center', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)',
            borderRadius: 13, background: 'var(--surface-2)', border: v ? '1.5px solid var(--accent)' : '1.5px solid var(--border-strong)',
            transform: pop === i ? 'scale(1.14)' : 'scale(1)', transition: `transform 350ms ${SPRING}, border-color 200ms`, outline: 'none',
          }}
        />
      ))}
    </div>
  );
}

/* ── KeycapButton — press(90ms): a solid bottom box-shadow is the key's
      side wall; :active bottoms out (translateY 5px, shadow→1px). */
export function KeycapButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const up = '0 6px 0 0 var(--border-strong), 0 10px 16px -4px oklch(from var(--shadow-color) l c h / 0.3)';
  const down = '0 1px 0 0 var(--border-strong), 0 2px 6px -2px oklch(from var(--shadow-color) l c h / 0.3)';
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        minWidth: 58, height: 56, padding: '0 16px', borderRadius: 12, border: 'none', background: 'var(--surface-2)', color: 'var(--text)',
        fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, cursor: 'pointer',
        transform: pressed ? 'translateY(5px)' : 'none', boxShadow: pressed ? down : up,
        transition: 'transform 90ms ease-out, box-shadow 90ms ease-out',
      }}
    >{children}</button>
  );
}

/* ── PushButton — press(60ms): keycap principle with a colored edge
      (a darker shade of the fill). */
export function PushButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const edge = 'oklch(from var(--accent) calc(l - 0.16) c h)';
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        height: 48, padding: '0 24px', borderRadius: 14, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)',
        fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700, cursor: 'pointer',
        transform: pressed ? 'translateY(5px)' : 'none',
        boxShadow: pressed ? `0 1px 0 0 ${edge}` : `0 6px 0 0 ${edge}`,
        transition: 'transform 60ms ease-out, box-shadow 60ms ease-out',
      }}
    >{children}</button>
  );
}

/* ── SquishButton — asymmetric: down scale(0.88) in 80ms ease-out, up
      500ms spring. Quick-down bouncy-up is what feels physical. */
export function SquishButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        height: 46, padding: '0 26px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)',
        fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
        transform: pressed ? 'scale(0.88)' : 'scale(1)',
        transition: pressed ? 'transform 80ms ease-out' : `transform 500ms ${SPRING}`,
      }}
    >{children}</button>
  );
}

/* ── RubberBandSlider — rubber(0.32): past the ends only 32% of the
      overshoot registers; release springs home to the clamped value. */
export interface RubberBandSliderProps {
  defaultValue?: number; // 0–100
  onChange?: (value: number) => void;
  width?: number;
}

export function RubberBandSlider({ defaultValue = 60, onChange, width = 240 }: RubberBandSliderProps) {
  const [v, setV] = useState(defaultValue);          // rendered (may overshoot <0 / >100)
  const [drag, setDrag] = useState(false);
  const geo = useRef({ startX: 0, startV: defaultValue });
  const trackW = width - 24;

  const clamp = (n: number) => Math.max(0, Math.min(n, 100));
  const rubber = (raw: number) => { const c = clamp(raw); return c + (raw - c) * 0.32; };

  return (
    <div style={{ width, padding: '10px 0', touchAction: 'none' }}>
      <div
        style={{ position: 'relative', height: 6, borderRadius: 999, background: 'var(--surface-2)', cursor: 'pointer' }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          geo.current = { startX: e.clientX, startV: clamp(v) };
          setDrag(true);
        }}
        onPointerMove={(e) => {
          if (!drag) return;
          const raw = geo.current.startV + ((e.clientX - geo.current.startX) / trackW) * 100;
          setV(rubber(raw));
        }}
        onPointerUp={() => { setDrag(false); const c = clamp(v); setV(c); onChange?.(Math.round(c)); }}
      >
        <div style={{ position: 'absolute', top: 0, bottom: 0, insetInlineStart: 0, width: `${clamp(v)}%`, borderRadius: 999, background: 'var(--accent)', transition: drag ? 'none' : `width 450ms ${SPRING}` }} />
        <span style={{
          position: 'absolute', top: '50%', insetInlineStart: `calc(${(v / 100) * 100}% )`, transform: 'translate(-50%, -50%)',
          width: 22, height: 22, borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--accent)', boxShadow: 'var(--shadow-2)',
          transition: drag ? 'none' : `inset-inline-start 450ms ${SPRING}`, cursor: 'grab',
        }} />
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(clamp(v))}%</div>
    </div>
  );
}

/* ── DragToDismissCard — friction: translate + rotate(x×0.05deg) + opacity
      fade with distance; past 100px it flings away, else springs back. */
export interface DragToDismissCardProps {
  children: React.ReactNode;
  onDismiss?: () => void;
  /** Re-show after dismiss (ms) — demo affordance. 0 disables. */
  respawnMs?: number;
}

export function DragToDismissCard({ children, onDismiss, respawnMs = 1200 }: DragToDismissCardProps) {
  const [x, setX] = useState(0);
  const [drag, setDrag] = useState(false);
  const [gone, setGone] = useState(false);
  const start = useRef(0);
  const t = useTimeout();

  return (
    <div
      onPointerDown={(e) => { if (gone) return; e.currentTarget.setPointerCapture(e.pointerId); start.current = e.clientX - x; setDrag(true); }}
      onPointerMove={(e) => { if (!drag || gone) return; setX(e.clientX - start.current); }}
      onPointerUp={() => {
        setDrag(false);
        if (Math.abs(x) > 100) {
          setX(x > 0 ? 480 : -480); setGone(true); onDismiss?.();
          if (respawnMs) { clearTimeout(t.current); t.current = setTimeout(() => { setGone(false); setX(0); }, respawnMs); }
        } else setX(0);
      }}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '14px 18px',
        boxShadow: drag ? 'var(--shadow-3)' : 'var(--shadow-1)', cursor: 'grab', touchAction: 'none', userSelect: 'none',
        transform: `translateX(${x}px) rotate(${x * 0.05}deg)`,
        opacity: gone ? 0 : Math.max(1 - Math.abs(x) / 340, 0.25),
        transition: drag ? 'box-shadow 200ms' : `transform 450ms ${gone ? 'ease-in' : SPRING}, opacity 300ms`,
      }}
    >{children}</div>
  );
}

/* ── NumberScrubber — 1px = 1 unit: drag horizontally to change the value;
      ew-resize cursor and accent scale while scrubbing. */
export interface NumberScrubberProps {
  defaultValue?: number;
  min?: number;
  max?: number;
  suffix?: string;
  onChange?: (v: number) => void;
}

export function NumberScrubber({ defaultValue = 24, min = 0, max = 200, suffix = 'px', onChange }: NumberScrubberProps) {
  const [v, setV] = useState(defaultValue);
  const [scrub, setScrub] = useState(false);
  const geo = useRef({ startX: 0, startV: defaultValue });
  return (
    <span
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); geo.current = { startX: e.clientX, startV: v }; setScrub(true); }}
      onPointerMove={(e) => {
        if (!scrub) return;
        const n = Math.max(min, Math.min(geo.current.startV + Math.round(e.clientX - geo.current.startX), max));
        setV(n); onChange?.(n);
      }}
      onPointerUp={() => setScrub(false)}
      style={{
        display: 'inline-flex', alignItems: 'baseline', gap: 3, padding: '8px 14px', borderRadius: 12,
        background: scrub ? 'var(--accent-soft)' : 'var(--surface-2)', border: '1px solid var(--border-strong)',
        cursor: 'ew-resize', touchAction: 'none', userSelect: 'none',
        transform: scrub ? 'scale(1.06)' : 'scale(1)', transition: `transform 250ms ${SPRING}, background 200ms`,
      }}
    >
      <span style={{ fontSize: 19, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: scrub ? 'var(--accent)' : 'var(--text)', transition: 'color 200ms' }}>{v}</span>
      <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{suffix}</span>
    </span>
  );
}

/* ── SpeedDialFab — stagger spring: actions fan out to fixed offsets,
      scale 0.4→1 with 20/70/120ms delays; the + rotates to ×. */
export interface SpeedDialAction {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function SpeedDialFab({ actions }: { actions: SpeedDialAction[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', width: 56, height: 56 }}>
      {actions.map((a, i) => (
        <button
          key={a.label}
          aria-label={a.label}
          onClick={() => { a.onClick?.(); setOpen(false); }}
          style={{
            position: 'absolute', bottom: 0, insetInlineStart: 4, width: 46, height: 46, borderRadius: 999, border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--accent)', cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-2)',
            transform: open ? `translateY(-${(i + 1) * 56}px) scale(1)` : 'translateY(0) scale(0.4)',
            opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
            transition: `transform 420ms ${SPRING} ${open ? [20, 70, 120][i] ?? i * 50 : 0}ms, opacity 250ms ${open ? [20, 70, 120][i] ?? i * 50 : 0}ms`,
          }}
        >{a.icon}</button>
      ))}
      <button
        aria-label={open ? 'Close actions' : 'Open actions'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="i-press-94"
        style={{
          position: 'relative', zIndex: 1, width: 56, height: 56, borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)',
          cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-3)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: open ? 'rotate(45deg)' : 'none', transition: `transform 350ms ${SPRING}` }}><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}

/* ── ReorderableList — midpoint swap: the dragged row tracks 1:1 with a
      shadow and no transition; neighbors glide into place when the drag
      crosses their midpoint. */
export function ReorderableList({ items: initial }: { items: string[] }) {
  const ROW = 52; // 44px row + 8px gap
  const [items, setItems] = useState(initial);
  const [drag, setDrag] = useState<{ index: number; y: number } | null>(null);
  const startY = useRef(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((label, i) => {
        const isDragged = drag?.index === i;
        return (
          <div
            key={label}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); startY.current = e.clientY; setDrag({ index: i, y: 0 }); }}
            onPointerMove={(e) => {
              if (!drag || drag.index !== i) return;
              const y = e.clientY - startY.current;
              const shift = Math.round(y / ROW);
              const target = Math.max(0, Math.min(i + shift, items.length - 1));
              if (target !== i) {
                const next = items.slice();
                next.splice(i, 1);
                next.splice(target, 0, label);
                setItems(next);
                startY.current = e.clientY - (y - shift * ROW);
                setDrag({ index: target, y: y - shift * ROW });
              } else {
                setDrag({ index: i, y });
              }
            }}
            onPointerUp={() => setDrag(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, height: 44, padding: '0 14px', borderRadius: 12,
              background: 'var(--surface)', border: '1px solid var(--border)',
              boxShadow: isDragged ? 'var(--shadow-3)' : 'var(--shadow-1)',
              transform: isDragged ? `translateY(${drag.y}px) scale(1.02)` : 'none',
              zIndex: isDragged ? 2 : 1, position: 'relative',
              cursor: 'grab', touchAction: 'none', userSelect: 'none', fontSize: 13.5, fontWeight: 600,
              transition: isDragged ? 'box-shadow 150ms' : `transform 300ms ${GLIDE}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"><path d="M5 9h14M5 15h14" /></svg>
            {label}
          </div>
        );
      })}
    </div>
  );
}
