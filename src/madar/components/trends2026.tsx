import { useState } from 'react';
import { SPRING, GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Modern 2026 vocabulary — distilled from the X trends research
   (glassmorphism / liquid glass / progressive blur / reactive shadows /
   generative & anticipatory AI UI / glanceable AR). See TRENDS.md for the
   source tweets each pattern maps to. All tokenized + RTL-safe.
──────────────────────────────────────────────────────────────────────── */

/* ── ProgressiveBlur — Apple-style ramped blur (not uniform): stacked
      layers, each with more backdrop-blur and a gradient mask so the blur
      fades in toward one edge. Place over the top/bottom of scrolling
      content. (trends §1: progressive blur) */
export interface ProgressiveBlurProps {
  side?: 'bottom' | 'top';
  height?: number;
  /** number of ramp layers (more = smoother) */
  layers?: number;
  maxBlur?: number;
}

export function ProgressiveBlur({ side = 'bottom', height = 96, layers = 5, maxBlur = 16 }: ProgressiveBlurProps) {
  return (
    <div aria-hidden style={{ position: 'absolute', insetInline: 0, [side]: 0, height, pointerEvents: 'none', zIndex: 3 }}>
      {Array.from({ length: layers }, (_, i) => {
        const t = (i + 1) / layers;
        const blur = (maxBlur / layers) * (i + 1);
        // each layer is masked so it only applies over its band
        const from = side === 'bottom' ? `${(1 - t) * 100}%` : `${t * 100}%`;
        const mask = side === 'bottom'
          ? `linear-gradient(to top, #000 ${from}, transparent ${from})`
          : `linear-gradient(to bottom, #000 ${from}, transparent ${from})`;
        return (
          <div key={i} style={{ position: 'absolute', inset: 0, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: mask, WebkitMaskImage: mask }} />
        );
      })}
    </div>
  );
}

/* ── LiquidGlassCard — reactive glass (trends §1, ex.4): pointer-tracked
      specular glare + reactive shadow that shifts opposite the cursor
      (light-source model) + subtle tilt. Real backdrop-blur; needs content
      behind it to read. */
export function LiquidGlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [p, setP] = useState({ x: 0.5, y: 0.5 });
  const [hov, setHov] = useState(false);
  const dx = (p.x - 0.5), dy = (p.y - 0.5);
  return (
    <div
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }); }}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => { setHov(false); setP({ x: 0.5, y: 0.5 }); }}
      style={{
        position: 'relative', borderRadius: 22, overflow: 'hidden', padding: 20, color: '#fff',
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(22px) saturate(180%)', WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: `${-dx * 30}px ${16 - dy * 20}px 50px -18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)`,
        transform: hov ? `perspective(900px) rotateX(${-dy * 6}deg) rotateY(${dx * 8}deg)` : 'none',
        transformStyle: 'preserve-3d',
        transition: hov ? 'box-shadow 120ms linear' : `transform 500ms ${SPRING}, box-shadow 400ms`,
        ...style,
      }}
    >
      {/* moving specular glare */}
      <span aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: hov ? 1 : 0, transition: 'opacity 300ms', background: `radial-gradient(220px circle at ${p.x * 100}% ${p.y * 100}%, rgba(255,255,255,0.35), transparent 60%)` }} />
      <span aria-hidden style={{ position: 'absolute', insetInline: 0, top: 0, height: '55%', background: 'linear-gradient(180deg, rgba(255,255,255,0.16), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

/* ── GlassSegmented — layered frosted-glass segmented control with a
      sliding glass pill. Meant to sit over color/photo. (trends §1, ex.2) */
export function GlassSegmented({ options, defaultIndex = 0, onChange }: { options: string[]; defaultIndex?: number; onChange?: (i: number) => void }) {
  const [sel, setSel] = useState(defaultIndex);
  const w = 100 / options.length;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', padding: 4, borderRadius: 999, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px) saturate(160%)', WebkitBackdropFilter: 'blur(16px) saturate(160%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)' }}>
      <span style={{ position: 'absolute', top: 4, bottom: 4, insetInlineStart: `calc(${sel * w}% + 4px)`, width: `calc(${w}% - 8px)`, borderRadius: 999, background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.25)', transition: `inset-inline-start 420ms ${GLIDE}` }} />
      {options.map((o, i) => (
        <button key={o} onClick={() => { setSel(i); onChange?.(i); }} style={{ position: 'relative', zIndex: 1, minWidth: 88, height: 34, padding: '0 16px', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: i === sel ? '#0b0b12' : 'rgba(255,255,255,0.85)', transition: 'color 300ms' }}>{o}</button>
      ))}
    </div>
  );
}

/* ── AnticipatoryDashboard — the AI dashboard logic from trends §2, ex.1:
      not raw data, but "Where you are · What's missing · What to do next ·
      Why it matters". Anticipatory design. */
export interface AnticipatoryZone {
  label: string;
  value: React.ReactNode;
  detail?: React.ReactNode;
  tone?: string;
}
export interface AnticipatoryDashboardProps {
  status: AnticipatoryZone;      // where you are
  gap: AnticipatoryZone;         // what's missing
  next: { label: string; action: string; onAction?: () => void };
  why: React.ReactNode;
}

export function AnticipatoryDashboard({ status, gap, next, why }: AnticipatoryDashboardProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {/* where you are */}
      <div style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'var(--surface)', padding: 16, boxShadow: 'var(--shadow-1)' }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-3)' }}>أين أنت الآن</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', margin: '6px 0 2px', fontVariantNumeric: 'tabular-nums' }}>{status.value}</div>
        {status.detail && <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{status.detail}</div>}
      </div>
      {/* what's missing */}
      <div style={{ borderRadius: 16, border: `1px solid var(--${gap.tone ?? 'warning'})`, background: `var(--${gap.tone ?? 'warning'}-soft)`, padding: 16 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: `var(--${gap.tone ?? 'warning'})` }}>ما الناقص</div>
        <div style={{ fontSize: 15, fontWeight: 700, margin: '6px 0 2px' }}>{gap.value}</div>
        {gap.detail && <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{gap.detail}</div>}
      </div>
      {/* what to do next — spans full width, the primary action */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 14, borderRadius: 16, padding: 16, background: 'var(--ink)', color: 'var(--on-ink)' }}>
        <span style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.6 }}>الخطوة التالية</span>
          <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600 }}>{next.label}</span>
        </span>
        <button onClick={next.onAction} className="i-press-97" style={{ height: 36, padding: '0 16px', borderRadius: 999, border: 'none', background: 'var(--on-ink)', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 'none' }}>{next.action}</button>
      </div>
      {/* why it matters */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-start', gap: 10, padding: '2px 4px' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}><circle cx="12" cy="12" r="9" /><path d="M12 16v-5M12 8v.5" /></svg>
        <span style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: '18px' }}><b style={{ color: 'var(--text)' }}>لماذا يهم:</b> {why}</span>
      </div>
    </div>
  );
}

/* ── PromptCanvas — prompt-first / generative UI (trends §2, ex.2-3): a
      conversational canvas with a big input, suggested generative chips,
      and a generated result surface. */
export interface PromptCanvasProps {
  placeholder?: string;
  suggestions?: string[];
  onGenerate?: (prompt: string) => void;
}

export function PromptCanvas({ placeholder = 'صف ما تريد بناءه…', suggestions = ['داشبورد مبيعات', 'صفحة تسعير', 'نموذج تسجيل'], onGenerate }: PromptCanvasProps) {
  const [text, setText] = useState('');
  const [generated, setGenerated] = useState<string | null>(null);
  const run = (t: string) => { if (!t.trim()) return; setGenerated(t); onGenerate?.(t); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ position: 'relative' }}>
        <span aria-hidden style={{ position: 'absolute', inset: -2, borderRadius: 18, background: 'linear-gradient(100deg, var(--accent), color-mix(in srgb, var(--accent) 50%, var(--info)), var(--accent))', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite', opacity: 0.5, filter: 'blur(6px)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 16, border: '1px solid var(--border-strong)', background: 'var(--surface)', padding: '10px 10px 10px 16px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') run(text); }} placeholder={placeholder} style={{ flex: 1, minWidth: 0, border: 'none', background: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 14.5, color: 'var(--text)' }} />
          <button onClick={() => run(text)} className="i-press-96" style={{ height: 38, padding: '0 16px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 'none' }}>توليد</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {suggestions.map((s) => (
          <button key={s} onClick={() => { setText(s); run(s); }} className="i-lift" style={{ padding: '6px 13px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-2)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>{s}</button>
        ))}
      </div>
      {generated && (
        <div style={{ borderRadius: 16, border: '1px dashed var(--border-strong)', background: 'var(--bg-deep)', padding: 16, display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeUp 340ms cubic-bezier(0.22,1,0.36,1)' }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>وُلّد تخطيط <b style={{ color: 'var(--text)' }}>«{generated}»</b> · جاهز للتحرير.</span>
        </div>
      )}
    </div>
  );
}

/* ── GlanceableTile — AR-glasses "Glimmer" glanceable element (trends §3):
      ultra-minimal, luminous, one metric + one line, no chrome. */
export function GlanceableTile({ icon, metric, label, accent = 'var(--accent)' }: { icon: React.ReactNode; metric: React.ReactNode; label: React.ReactNode; accent?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 18px 12px 14px', borderRadius: 18, background: 'rgba(10,12,20,0.55)', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', boxShadow: `0 0 30px -6px ${accent}` }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', color: accent, background: 'rgba(255,255,255,0.08)', filter: `drop-shadow(0 0 6px ${accent})`, flex: 'none' }}>{icon}</span>
      <span>
        <span style={{ display: 'block', fontSize: 20, fontWeight: 700, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{metric}</span>
        <span style={{ display: 'block', fontSize: 11.5, color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      </span>
    </div>
  );
}
