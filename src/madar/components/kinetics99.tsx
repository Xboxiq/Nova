import { useEffect, useRef, useState } from 'react';
import { SPRING, GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Kinetics 99 — completion set. The patterns from the ckissi/kinetics
   catalog (kinetics.colorion.co) that the earlier pass did not cover, so
   the library reaches the full 99. All tokenized, theme-aware, RTL-safe.
   Ambient/status loops are intentional and honour prefers-reduced-motion
   via the global rule in tokens.css.
──────────────────────────────────────────────────────────────────────── */

/* ── Ripple Feedback — Material-style ripple from the click point. */
export function RippleButton({ label = 'اضغط' }: { label?: string }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  return (
    <button
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const id = idRef.current++;
        setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
        setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), 600);
      }}
      style={{ position: 'relative', overflow: 'hidden', height: 46, padding: '0 26px', borderRadius: 12, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}
    >
      {ripples.map((rp) => (
        <span key={rp.id} style={{ position: 'absolute', insetInlineStart: rp.x, top: rp.y, width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', transform: 'translate(-50%,-50%)', animation: 'burst 600ms ease-out forwards', pointerEvents: 'none' }} />
      ))}
      {label}
    </button>
  );
}

/* ── Cursor Trail — dots that chase the pointer with spring lag inside a box. */
export function CursorTrail({ dots = 6, label = 'حرّك المؤشر هنا' }: { dots?: number; label?: string }) {
  const box = useRef<HTMLDivElement | null>(null);
  const pts = useRef(Array.from({ length: dots }, () => ({ x: 0, y: 0 })));
  const target = useRef({ x: 0, y: 0 });
  const spans = useRef<(HTMLSpanElement | null)[]>([]);
  const raf = useRef<number | undefined>(undefined);
  useEffect(() => {
    const tick = () => {
      let { x, y } = target.current;
      pts.current.forEach((p, i) => {
        p.x += (x - p.x) * 0.35; p.y += (y - p.y) * 0.35; x = p.x; y = p.y;
        const el = spans.current[i];
        if (el) { el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%)`; }
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
  }, []);
  return (
    <div ref={box} onPointerMove={(e) => { const r = box.current!.getBoundingClientRect(); target.current = { x: e.clientX - r.left, y: e.clientY - r.top }; }}
      style={{ position: 'relative', height: 150, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-deep)', overflow: 'hidden', display: 'grid', placeItems: 'center', cursor: 'crosshair' }}>
      <span style={{ fontSize: 12.5, color: 'var(--text-3)', pointerEvents: 'none' }}>{label}</span>
      {Array.from({ length: dots }, (_, i) => (
        <span key={i} ref={(el) => { spans.current[i] = el; }} style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: 16 - i * 1.6, height: 16 - i * 1.6, borderRadius: '50%', background: 'var(--accent)', opacity: 1 - i / (dots + 1), pointerEvents: 'none' }} />
      ))}
    </div>
  );
}

/* ── Password Meter — strength bar + label spring as you type. */
export function PasswordMeter({ placeholder = 'كلمة المرور' }: { placeholder?: string }) {
  const [v, setV] = useState('');
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].reduce((s, re) => s + (re.test(v) ? 1 : 0), 0);
  const labels = ['ضعيفة', 'مقبولة', 'جيدة', 'قوية'];
  const tones = ['var(--danger)', 'var(--warning)', 'var(--accent)', 'var(--success)'];
  const filled = v ? score : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
      <input type="password" value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} className="i-input"
        style={{ height: 44, borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', padding: '0 14px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
      <div style={{ display: 'flex', gap: 5 }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < filled ? tones[filled - 1] : 'var(--surface-2)', transition: `background 260ms ${GLIDE}, transform 260ms ${SPRING}`, transform: i < filled ? 'scaleY(1)' : 'scaleY(0.7)' }} />
        ))}
      </div>
      {v && <span style={{ fontSize: 12, fontWeight: 600, color: tones[filled - 1] }}>{labels[filled - 1]}</span>}
    </div>
  );
}

/* ── Rotary Knob — drag up/down (or around) to turn; value follows spring. */
export function RotaryKnob({ defaultValue = 40, label = 'المستوى' }: { defaultValue?: number; label?: string }) {
  const [val, setVal] = useState(defaultValue);
  const drag = useRef<{ y: number; v: number } | null>(null);
  const angle = -135 + (val / 100) * 270;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      <div
        onPointerDown={(e) => { drag.current = { y: e.clientY, v: val }; (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (!drag.current) return; const dv = (drag.current.y - e.clientY) * 0.6; setVal(Math.max(0, Math.min(100, Math.round(drag.current.v + dv)))); }}
        onPointerUp={() => { drag.current = null; }}
        style={{ position: 'relative', width: 84, height: 84, borderRadius: '50%', background: 'radial-gradient(circle at 50% 35%, var(--surface), var(--surface-2))', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-2), inset 0 -3px 6px rgba(0,0,0,0.12)', cursor: 'ns-resize', transition: `transform 400ms ${SPRING}` }}
      >
        <span style={{ position: 'absolute', top: 8, insetInlineStart: '50%', width: 4, height: 22, borderRadius: 3, background: 'var(--accent)', transformOrigin: '50% 34px', transform: `translateX(-50%) rotate(${angle}deg)`, transition: `transform 220ms ${SPRING}` }} />
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{label} · <b style={{ color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{val}</b></div>
    </div>
  );
}

/* ── Countdown Ring — a ring that drains over `seconds`, then restarts. */
export function CountdownRing({ seconds = 10, size = 76 }: { seconds?: number; size?: number }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => (l <= 1 ? seconds : l - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);
  const r = size / 2 - 6, C = 2 * Math.PI * r, frac = left / seconds;
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-grid', placeItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={5} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - frac)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
      </svg>
      <span style={{ position: 'absolute', fontSize: 20, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{left}</span>
    </span>
  );
}

/* ── Skeleton to Content — shimmering skeleton that resolves to content. */
export function SkeletonToContent() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setLoaded((l) => !l), 2200);
    return () => clearInterval(t);
  }, []);
  const Bar = ({ w }: { w: string }) => (
    <span style={{ position: 'relative', overflow: 'hidden', display: 'block', height: 12, width: w, borderRadius: 6, background: 'var(--surface-2)' }}>
      <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, oklch(from var(--accent) 0.7 0.1 h / 0.25), transparent)', animation: 'k99-shimmer-sweep 1.3s linear infinite' }} />
    </span>
  );
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: 260, padding: 14, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
      {loaded
        ? <><span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontWeight: 700, animation: 'fadeUp 400ms ease-out' }}>م</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, animation: 'fadeUp 460ms ease-out' }}><b style={{ fontSize: 14 }}>مدار مصمّم</b><span style={{ fontSize: 12, color: 'var(--text-3)' }}>مكتبة مكوّنات</span></div></>
        : <><span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface-2)', flex: 'none', position: 'relative', overflow: 'hidden' }}><span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, oklch(from var(--accent) 0.7 0.1 h / 0.25), transparent)', animation: 'k99-shimmer-sweep 1.3s linear infinite' }} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Bar w="120px" /><Bar w="80px" /></div></>}
    </div>
  );
}

/* ── Battery Charge — a charging battery that fills on a loop. */
export function BatteryCharge({ width = 96 }: { width?: number }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ position: 'relative', width, height: 44, borderRadius: 8, border: '2px solid var(--border-strong)', padding: 4, display: 'block' }}>
        <span style={{ display: 'block', height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, var(--accent), var(--success))', animation: 'k99-battery 3.2s ease-in-out infinite' }} />
      </span>
      <span style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--border-strong)' }} />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--warning)" style={{ marginInlineStart: 4 }}><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
    </div>
  );
}

/* ── Signal Bars — rising bars that pulse like a connection meter. */
export function SignalBars({ bars = 4 }: { bars?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 4, height: 34 }}>
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} style={{ width: 7, height: `${30 + i * 22}%`, borderRadius: 3, background: 'var(--accent)', animation: `k99-signal 1.4s ${GLIDE} ${i * 0.16}s infinite` }} />
      ))}
    </span>
  );
}

/* ── Bookmark Toggle — fill + spring pop on toggle. */
export function BookmarkToggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn((v) => !v)} aria-pressed={on} aria-label="حفظ"
      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 8, lineHeight: 0, transition: `transform 420ms ${SPRING}`, transform: on ? 'scale(1.15)' : 'scale(1)' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill={on ? 'var(--accent)' : 'none'} stroke={on ? 'var(--accent)' : 'var(--text-3)'} strokeWidth="1.8" strokeLinejoin="round" style={{ transition: 'fill 240ms, stroke 240ms' }}>
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
      </svg>
    </button>
  );
}

/* ── Wave Loader — dots riding a sine, phase-offset. */
export function WaveLoader({ dots = 5 }: { dots?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 7, alignItems: 'center', height: 24 }}>
      {Array.from({ length: dots }, (_, i) => (
        <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', animation: `k99-wave 1s ${GLIDE} ${i * 0.1}s infinite` }} />
      ))}
    </span>
  );
}

/* ── Equalizer Bars — audio-style bars scaling on a loop. */
export function EqualizerBars({ bars = 5 }: { bars?: number }) {
  const delays = [0, 0.3, 0.15, 0.45, 0.22, 0.38, 0.1];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 40 }}>
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} style={{ width: 6, height: '100%', borderRadius: 3, background: 'linear-gradient(var(--accent), oklch(from var(--accent) 0.7 0.18 calc(h + 40)))', transformOrigin: 'bottom', animation: `k99-equalize 0.9s ease-in-out ${delays[i % delays.length]}s infinite` }} />
      ))}
    </span>
  );
}

/* ── Newton's Cradle — end balls swing, transferring momentum. */
export function NewtonsCradle() {
  const balls = 5;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 0, height: 70 }}>
      {Array.from({ length: balls }, (_, i) => {
        const anim = i === 0 ? 'k99-cradle-l 1.4s ease-in-out infinite' : i === balls - 1 ? 'k99-cradle-r 1.4s ease-in-out infinite' : 'none';
        return (
          <span key={i} style={{ width: 16, transformOrigin: 'top center', animation: anim }}>
            <span style={{ display: 'block', width: 1, height: 44, background: 'var(--border-strong)', margin: '0 auto' }} />
            <span style={{ display: 'block', width: 16, height: 16, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, oklch(from var(--accent) 0.8 0.1 h), var(--accent))' }} />
          </span>
        );
      })}
    </div>
  );
}

/* ── Bouncing Ball — gravity bounce with squash-and-stretch on impact. */
export function BouncingBall() {
  return (
    <div style={{ height: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 40, height: 90 }}>
        <span style={{ position: 'absolute', insetInlineStart: '50%', bottom: 0, transform: 'translateX(-50%)', width: 34, height: 34, marginInlineStart: -17, animation: 'k99-ball 1.1s infinite' }}>
          <span style={{ display: 'block', width: 34, height: 34, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, oklch(from var(--accent) 0.82 0.12 h), var(--accent))', animation: 'k99-squash 1.1s infinite' }} />
        </span>
        <span style={{ position: 'absolute', insetInlineStart: '50%', bottom: -3, transform: 'translateX(-50%)', width: 30, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.18)', filter: 'blur(1px)' }} />
      </div>
    </div>
  );
}

/* ── Neon Glow Pulse — text (or chip) breathing with a neon glow. */
export function NeonGlowPulse({ children = 'MADAR' }: { children?: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 12, border: '1.5px solid var(--accent)', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.14em', fontFamily: 'var(--font-mono)', animation: 'k99-neon 2s ease-in-out infinite' }}>{children}</span>
  );
}

/* ── Gradient Border Morph — a conic gradient border that rotates. */
export function GradientBorderMorph({ children = 'محتوى مميّز', size = 200 }: { children?: React.ReactNode; size?: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', width: size, height: 96, borderRadius: 16, overflow: 'hidden', isolation: 'isolate' }}>
      <span aria-hidden style={{ position: 'absolute', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, var(--accent), oklch(from var(--accent) 0.7 0.2 calc(h + 90)), oklch(from var(--accent) 0.7 0.2 calc(h + 200)), var(--accent))', animation: 'k99-border 4s linear infinite', zIndex: -2 }} />
      <span style={{ position: 'absolute', inset: 2, borderRadius: 14, background: 'var(--surface)', zIndex: -1 }} />
      <span style={{ fontSize: 14, fontWeight: 600 }}>{children}</span>
    </span>
  );
}

/* ── Glitch Text — RGB-split glitch on hover. */
export function GlitchText({ children = 'GLITCH' }: { children?: string }) {
  const [on, setOn] = useState(false);
  const base: React.CSSProperties = { position: 'absolute', insetInlineStart: 0, top: 0 };
  return (
    <span onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      style={{ position: 'relative', display: 'inline-block', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 30, letterSpacing: '0.04em', color: 'var(--text)', cursor: 'default' }}>
      {children}
      {on && <>
        <span aria-hidden style={{ ...base, color: 'oklch(0.7 0.2 20)', animation: 'k99-glitch-a 0.5s steps(2) infinite' }}>{children}</span>
        <span aria-hidden style={{ ...base, color: 'oklch(0.7 0.2 200)', animation: 'k99-glitch-b 0.5s steps(2) infinite' }}>{children}</span>
      </>}
    </span>
  );
}

/* ── Text Split Reveal — per-letter rise + fade, replays on hover. */
export function TextSplitReveal({ children = 'مدار', replayOnHover = true }: { children?: string; replayOnHover?: boolean }) {
  const [key, setKey] = useState(0);
  const chars = Array.from(children);
  return (
    <span key={key} onMouseEnter={() => replayOnHover && setKey((k) => k + 1)}
      style={{ display: 'inline-flex', fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em', cursor: 'default' }}>
      {chars.map((c, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre', animation: `heroReveal 560ms ${GLIDE} ${i * 0.05}s both` }}>{c}</span>
      ))}
    </span>
  );
}

/* ── Text Wave — letters ride a continuous wave. */
export function TextWave({ children = 'مدار · MADAR' }: { children?: string }) {
  const chars = Array.from(children);
  return (
    <span style={{ display: 'inline-flex', fontSize: 24, fontWeight: 700 }}>
      {chars.map((c, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre', animation: `k99-textwave 1.4s ease-in-out ${i * 0.06}s infinite` }}>{c}</span>
      ))}
    </span>
  );
}

/* ── Flip Card — 3D front/back flip on hover. */
export function FlipCard({ front, back, height = 150 }: { front?: React.ReactNode; back?: React.ReactNode; height?: number }) {
  const [flip, setFlip] = useState(false);
  const face: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 16, display: 'grid', placeItems: 'center', padding: 16, textAlign: 'center' };
  return (
    <div onMouseEnter={() => setFlip(true)} onMouseLeave={() => setFlip(false)} onClick={() => setFlip((f) => !f)}
      style={{ width: 200, height, perspective: 900, cursor: 'pointer' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: `transform 620ms ${GLIDE}`, transform: flip ? 'rotateY(180deg)' : 'none' }}>
        <div style={{ ...face, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-1)' }}>{front ?? <b style={{ fontSize: 15 }}>الوجه الأمامي</b>}</div>
        <div style={{ ...face, transform: 'rotateY(180deg)', background: 'var(--ink)', color: 'var(--on-ink)' }}>{back ?? <span style={{ fontSize: 13.5, lineHeight: '20px' }}>الوجه الخلفي · مرّر لتقلب</span>}</div>
      </div>
    </div>
  );
}

/* ── Cube Rotate 3D — a rotating cube (4 faces) on hover / loop. */
export function CubeRotate3D({ size = 96, faces = ['مدار', 'Madar', 'مكتبة', 'Library'] }: { size?: number; faces?: string[] }) {
  const [spin, setSpin] = useState(false);
  const half = size / 2;
  const tf = [0, 90, 180, 270];
  return (
    <div onMouseEnter={() => setSpin(true)} onMouseLeave={() => setSpin(false)} style={{ width: size, height: size, perspective: 600, margin: '10px auto' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: `transform 900ms ${GLIDE}`, transform: `translateZ(-${half}px) rotateY(${spin ? -90 : 0}deg)` }}>
        {faces.slice(0, 4).map((f, i) => (
          <span key={i} style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', borderRadius: 12, background: i % 2 ? 'var(--ink)' : 'var(--accent)', color: i % 2 ? 'var(--on-ink)' : 'var(--on-accent)', fontWeight: 700, fontSize: 15, transform: `rotateY(${tf[i]}deg) translateZ(${half}px)` }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Clip Wipe — content wiped in via clip-path on hover (RTL-aware origin). */
export function ClipWipe({ children = 'يُكشف بمسح' }: { children?: React.ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <div onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      style={{ position: 'relative', width: 220, height: 80, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'var(--surface)', color: 'var(--text-3)', fontSize: 13.5 }}>مرّر للكشف</div>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'var(--accent)', color: 'var(--on-accent)', fontWeight: 700, fontSize: 15, clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', transition: `clip-path 480ms ${GLIDE}` }}>{children}</div>
    </div>
  );
}

/* ── Folding Doors — two panels swing open to reveal content. */
export function FoldingDoors({ children = 'مُكتشَف', width = 220, height = 96 }: { children?: React.ReactNode; width?: number; height?: number }) {
  const [open, setOpen] = useState(false);
  const door: React.CSSProperties = { position: 'absolute', top: 0, width: '50%', height: '100%', background: 'var(--ink)', transition: `transform 620ms ${GLIDE}`, backfaceVisibility: 'hidden' };
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', width, height, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', perspective: 800, cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 700, fontSize: 15 }}>{children}</div>
      <div style={{ ...door, insetInlineStart: 0, transformOrigin: 'left center', transform: open ? 'rotateY(-105deg)' : 'none' }} />
      <div style={{ ...door, insetInlineEnd: 0, transformOrigin: 'right center', transform: open ? 'rotateY(105deg)' : 'none' }} />
    </div>
  );
}

/* ── Before / After — draggable divider comparing two states. */
export function BeforeAfter({ width = 260, height = 150 }: { width?: number; height?: number }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement | null>(null);
  const move = (clientX: number) => { const r = box.current!.getBoundingClientRect(); setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))); };
  return (
    <div ref={box} style={{ position: 'relative', width, height, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', userSelect: 'none', touchAction: 'none' }}
      onPointerDown={(e) => { move(e.clientX); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
      onPointerMove={(e) => { if (e.buttons) move(e.clientX); }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--surface-2), var(--surface))', display: 'grid', placeItems: 'center', color: 'var(--text-3)', fontWeight: 600, fontSize: 13 }}>قبل</div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--accent), oklch(from var(--accent) 0.6 0.2 calc(h + 60)))', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>بعد</div>
      <span style={{ position: 'absolute', top: 0, bottom: 0, insetInlineStart: `${pos}%`, width: 2, background: '#fff', boxShadow: '0 0 6px rgba(0,0,0,0.4)', transform: 'translateX(-50%)' }}>
        <span style={{ position: 'absolute', top: '50%', insetInlineStart: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-2)', display: 'grid', placeItems: 'center', cursor: 'ew-resize', color: '#333' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
        </span>
      </span>
    </div>
  );
}

/* ── Page Peel — a corner curls up on hover to hint "more". */
export function PagePeel({ children = 'بطاقة', hint = 'اقلب', size = 150 }: { children?: React.ReactNode; hint?: string; size?: number }) {
  const [on, setOn] = useState(false);
  return (
    <div onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      style={{ position: 'relative', width: size, height: size, borderRadius: 16, overflow: 'hidden', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-1)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
      <span style={{ fontSize: 15, fontWeight: 600 }}>{children}</span>
      <span style={{ position: 'absolute', insetInlineEnd: 0, bottom: 0, display: 'grid', placeItems: 'center', color: 'var(--accent)', fontSize: 10, fontWeight: 700, width: on ? 52 : 24, height: on ? 52 : 24, background: 'linear-gradient(135deg, transparent 50%, var(--accent-soft) 50%)', transition: `all 320ms ${GLIDE}` }}>
        <span style={{ transform: 'rotate(-45deg) translate(6px,6px)', opacity: on ? 1 : 0, transition: 'opacity 200ms' }}>{hint}</span>
      </span>
    </div>
  );
}
