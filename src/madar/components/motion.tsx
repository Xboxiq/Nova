import { useEffect, useRef, useState } from 'react';
import { SPRING, GLIDE, DRAW } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Kinetics motion vocabulary — time-driven patterns (design.md §19.1–19.2)
──────────────────────────────────────────────────────────────────────── */

/* ── SlidingGradientButton — gradientbuttons.colorion.co canon (§19.2):
      3-stop gradient (A, B, A) at 200% size; hover slides the position so
      the light travels across. A/B derive from the theme accent. */
export function SlidingGradientButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="i-press-97"
      style={{
        height: 48, padding: '0 30px', borderRadius: 6, border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
        backgroundImage: 'linear-gradient(to right, oklch(from var(--accent) calc(l - 0.14) c calc(h - 20)) 0%, oklch(from var(--accent) calc(l + 0.06) c calc(h + 20)) 51%, oklch(from var(--accent) calc(l - 0.14) c calc(h - 20)) 100%)',
        backgroundSize: '200% auto', backgroundPosition: hov ? 'right center' : 'left center',
 transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'background-position 500ms ease, transform 220ms',
      }}
    >{children}</button>
  );
}

/* ── ScrambleText — scramble(35ms): unsettled characters swap for random
      glyphs, locking left-to-right (frame − i×1.4 > threshold). Monospace
      prevents jitter. */
export interface ScrambleTextProps {
  text: string;
  /** Change this key (or call the returned trigger) to re-run. */
  trigger?: number;
  style?: React.CSSProperties;
}

const SCRAMBLE_CHARS = '!<>-_/[]{}=+*^?#';

export function ScrambleText({ text, trigger = 0, style }: ScrambleTextProps) {
  const [out, setOut] = useState(text);
  const iv = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (trigger === 0) return;
    clearInterval(iv.current);
    let frame = 0;
    iv.current = setInterval(() => {
      frame++;
      setOut(text.split('').map((c, i) => (c === ' ' ? ' ' : (frame - i * 1.4 > 14 ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))).join(''));
      if (frame > 14 + text.length * 1.4) { clearInterval(iv.current); setOut(text); }
    }, 35);
    return () => clearInterval(iv.current);
  }, [trigger, text]);

  return <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, letterSpacing: '0.02em', ...style }} dir="ltr">{out}</span>;
}

/* ── UnderlineLink — draw(400ms): a 2px bar scaleX 0→1 from the logical
      start edge with the symmetric draw curve. */
export function UnderlineLink({ children, href = '#' }: { children: React.ReactNode; href?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', display: 'inline-block', fontSize: 16, fontWeight: 600, color: 'var(--text)', textDecoration: 'none', cursor: 'pointer' }}
    >
      {children}
      <span style={{ position: 'absolute', insetInlineStart: 0, bottom: -4, width: '100%', height: 2, borderRadius: 2, background: 'var(--accent)', transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'var(--underline-origin, left)', transition: `transform 400ms ${DRAW}` }} />
    </a>
  );
}

/* ── IconMorphSwap — blur morph: outgoing icon blurs, shrinks and rotates
      away while the incoming one settles in; 300ms crossfade. */
export function IconMorphSwap({ iconA, iconB, 'aria-label': ariaLabel = 'Toggle' }: { iconA: React.ReactNode; iconB: React.ReactNode; 'aria-label'?: string }) {
  const [b, setB] = useState(false);
  const face = (active: boolean): React.CSSProperties => ({
    position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
    opacity: active ? 1 : 0,
    transform: active ? 'none' : 'scale(0.7) rotate(-20deg)',
    filter: active ? 'none' : 'blur(6px)',
    transition: 'opacity 300ms, transform 300ms, filter 300ms',
  });
  return (
    <button aria-label={ariaLabel} onClick={() => setB((v) => !v)} className="i-press-94" style={{ position: 'relative', width: 52, height: 52, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--accent)', cursor: 'pointer' }}>
      <span style={face(!b)}>{iconA}</span>
      <span style={face(b)}>{iconB}</span>
    </button>
  );
}

/* ── OdometerNumber — count-up with ease-out cubic (1−(1−p)³) over 1.4s,
      starting when scrolled into view. Tabular-nums. Runs once. */
export function OdometerNumber({ value, duration = 1400, style }: { value: number; duration?: number; style?: React.CSSProperties }) {
  const [n, setN] = useState(0);
  const el = useRef<HTMLSpanElement | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || ran.current) return;
      ran.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={el} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>{n.toLocaleString()}</span>;
}

/* ── Typewriter — 55ms/char typing, 30ms deleting, 1.1s hold; the caret
      blinks with steps(1). */
export function Typewriter({ phrases, style }: { phrases: string[]; style?: React.CSSProperties }) {
  const [text, setText] = useState('');
  useEffect(() => {
    let phrase = 0, len = 0, deleting = false, alive = true;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (!alive) return;
      const full = phrases[phrase];
      len += deleting ? -1 : 1;
      setText(full.slice(0, len));
      let delay = deleting ? 30 : 55;
      if (!deleting && len === full.length) { deleting = true; delay = 1100; }
      else if (deleting && len === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 300; }
      t = setTimeout(step, delay);
    };
    t = setTimeout(step, 300);
    return () => { alive = false; clearTimeout(t); };
  }, [phrases]);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 600, ...style }} dir="ltr">
      {text}
      <span style={{ display: 'inline-block', width: 2, height: '1.1em', verticalAlign: 'text-bottom', background: 'var(--accent)', marginInlineStart: 2, animation: 'caretBlink 1s steps(1) infinite' }} />
    </span>
  );
}

/* ── EkgPath — heartbeat dot: a glowing dot travels the SVG path via
      offset-path (offset-distance 0→100%). Live-signal indicator. */
export function EkgPath({ width = 180, height = 48 }: { width?: number; height?: number }) {
  const d = 'M2 30 L46 30 L58 12 L74 44 L88 22 L96 30 L176 30';
  return (
    <span style={{ position: 'relative', display: 'inline-block', width, height }}>
      <svg width={width} height={height} viewBox={`0 0 180 48`} fill="none">
        <path d={d} stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{
        position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderRadius: '50%',
        background: 'var(--accent)',        offsetPath: `path('${d}')`, animation: 'ekgTravel 2.6s linear infinite',
      }} />
    </span>
  );
}

/* ── SegmentLoader — determinate phases: bars scaleX(0→1) from the start
      edge in sequence, 120ms stagger. */
export function SegmentLoader({ segments = 4, done = 4 }: { segments?: number; done?: number }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} style={{ flex: 1, height: 6, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden' }}>
          {i < done && (
            <span style={{ display: 'block', height: '100%', borderRadius: 6, background: 'var(--accent)', transformOrigin: 'var(--underline-origin, left)', animation: `growBarX 500ms ${GLIDE} both`, animationDelay: `${i * 120}ms` }} />
          )}
        </span>
      ))}
    </div>
  );
}

/* ── UndoSnackbar — drain 3s: slides up with a spring, and a progress bar
      scaleX 1→0 linearly — the visible undo window. */
export interface UndoSnackbarProps {
  visible: boolean;
  message?: string;
  undoLabel?: string;
  durationMs?: number;
  onUndo?: () => void;
  onExpire?: () => void;
}

export function UndoSnackbar({ visible, message = 'Item deleted', undoLabel = 'Undo', durationMs = 3000, onUndo, onExpire }: UndoSnackbarProps) {
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    clearTimeout(t.current);
    if (visible && onExpire) t.current = setTimeout(onExpire, durationMs);
    return () => clearTimeout(t.current);
  }, [visible, durationMs, onExpire]);

  return (
    <div style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 6, overflow: 'hidden',
      background: 'oklch(0.2 0.03 274)', color: 'oklch(0.95 0.005 270)',      transform: visible ? 'translateY(0)' : 'translateY(20px)', opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
      transition: `transform 480ms ${SPRING}, opacity 300ms`,
    }}>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{message}</span>
      <button onClick={onUndo} style={{ height: 30, padding: '0 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.14)', color: 'var(--accent)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>{undoLabel}</button>
      {visible && (
        <span key={String(visible)} style={{ position: 'absolute', bottom: 0, insetInline: 0, height: 3, background: 'var(--accent)', transformOrigin: 'var(--underline-origin, left)', animation: `drainX ${durationMs}ms linear forwards` }} />
      )}
    </div>
  );
}

/* ── Stagger — entrance choreography: children fade + rise 14px with the
      glide curve, 90ms apart, once, when scrolled into view. */
export function Stagger({ children, gap = 12, stepMs = 90 }: { children: React.ReactNode[]; gap?: number; stepMs?: number }) {
  const [on, setOn] = useState(false);
  const el = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={el} style={{ display: 'flex', flexDirection: 'column', gap }}>
      {children.map((c, i) => (
        <div key={i} style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(14px)', transition: `opacity 500ms ${GLIDE} ${i * stepMs}ms, transform 500ms ${GLIDE} ${i * stepMs}ms` }}>{c}</div>
      ))}
    </div>
  );
}
