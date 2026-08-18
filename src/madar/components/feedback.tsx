import { useState } from 'react';
import { GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Data & feedback — Jahez pattern library (AI loaders, flux loader, sync
   panel, pulse radar, metric ring, range bar, status strip, logs table).
──────────────────────────────────────────────────────────────────────── */

/* ── AiLoader — the five loading treatments; pick ONE app-wide. */
export function AiLoader({ kind = 'dots' }: { kind?: 'dots' | 'line' | 'spinner' | 'pulse' }) {
  if (kind === 'dots') {
    return (
      <span style={{ display: 'inline-flex', gap: 4 }} role="status" aria-label="Loading">
        {[0, 0.15, 0.3].map((d) => <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: `thinkDots 1.1s ease-in-out ${d}s infinite` }} />)}
      </span>
    );
  }
  if (kind === 'line') {
    return (
      <span role="status" aria-label="Loading" style={{ display: 'inline-block', width: 120, height: 4, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden' }}>
        <span style={{ display: 'block', height: '100%', width: '40%', borderRadius: 6, background: 'var(--accent)', animation: 'marqueeX 1.2s cubic-bezier(0.45,0,0.55,1) infinite alternate', transformOrigin: 'left' }} />
      </span>
    );
  }
  if (kind === 'spinner') {
    return <span role="status" aria-label="Loading" style={{ width: 22, height: 22, borderRadius: '50%', border: '2.5px solid var(--accent-soft)', borderTopColor: 'var(--accent)', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />;
  }
  return (
    <span role="status" aria-label="Loading" style={{ position: 'relative', width: 26, height: 26, display: 'inline-grid', placeItems: 'center' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--accent)', animation: 'beacon 1.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />
    </span>
  );
}

/* ── FluxLoader — progress with a sliding gradient that moves even when
      paused, phase markers in the track, labels that light as crossed. */
export function FluxLoader({ progress, phases }: { progress: number; phases: string[] }) {
  const pct = Math.max(0, Math.min(progress, 1)) * 100;
  const per = 100 / phases.length;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ position: 'relative', height: 10, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, var(--accent), oklch(from var(--accent) calc(l + 0.1) c h), var(--accent))', backgroundSize: '200% 100%', animation: 'fluxSlide 1.8s linear infinite', transition: 'width 560ms cubic-bezier(0.22,1,0.36,1)' }} />
        {phases.slice(1).map((_, i) => <span key={i} style={{ position: 'absolute', top: 2, bottom: 2, insetInlineStart: `${(i + 1) * per}%`, width: 2, borderRadius: 2, background: 'var(--surface)' }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)', marginTop: 8 }}>
        {phases.map((p, i) => <span key={p} style={{ color: pct >= (i + 0.5) * per ? 'var(--accent)' : undefined, fontWeight: pct >= (i + 0.5) * per ? 600 : 400, transition: 'color 300ms' }}>{p}</span>)}
      </div>
    </div>
  );
}

/* ── SyncProgressPanel — glass upload panel: file row + progress + cancel,
      cloud badge floating over the edge. */
export function SyncProgressPanel({ fileName, fileMeta, progress, onCancel }: { fileName: string; fileMeta: string; progress: number; onCancel?: () => void }) {
  const pct = Math.round(Math.max(0, Math.min(progress, 1)) * 100);
  return (
    <div style={{ position: 'relative', borderRadius: 6, padding: '18px 18px 16px', background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'inset 0 1px 0 var(--glass-hl)', }}>
      <span style={{ position: 'absolute', top: -14, insetInlineEnd: 18, width: 30, height: 30, borderRadius: 6, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 19a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 8.5a4 4 0 0 1 .5 8M12 12v6M9.5 14.5L12 12l2.5 2.5" /></svg>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ width: 38, height: 38, borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6V3z" /><path d="M14 3v5h5" /></svg>
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</span>
          <span style={{ display: 'block', fontSize: 11.5, color: 'var(--text-3)' }}>{fileMeta}</span>
        </span>
        <button aria-label="Cancel" onClick={onCancel} className="i-soft-text" style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'grid', placeItems: 'center', flex: 'none' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 6, background: 'var(--surface-2)' }}>
          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 6, background: 'var(--accent)', transition: 'width 400ms cubic-bezier(0.22,1,0.36,1)' }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--accent)' }}>{pct}%</span>
      </div>
    </div>
  );
}

/* ── PulseRadar — concentric rings expanding behind a center icon with
      staggered delays. Live scanning states. */
export function PulseRadar({ children, size = 90 }: { children: React.ReactNode; size?: number }) {
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-grid', placeItems: 'center' }}>
      {[0, 0.6, 1.2].map((d) => (
        <span key={d} style={{ position: 'absolute', inset: size * 0.22, borderRadius: '50%', border: '1.5px solid var(--accent)', animation: `beacon 2s cubic-bezier(0.22,1,0.36,1) ${d}s infinite` }} />
      ))}
      <span style={{ width: size * 0.42, height: size * 0.42, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', zIndex: 1 }}>{children}</span>
    </span>
  );
}

/* ── MetricRing — full SVG ring with value+unit centered, label below. */
export function MetricRing({ value, max = 100, unit, label, size = 110 }: { value: number; max?: number; unit?: string; label?: string; size?: number }) {
  const r = size / 2 - 8;
  const C = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(value / max, 1));
  return (
    <span style={{ position: 'relative', width: size, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center' }}>
        <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={8} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={8} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - frac)} style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)' }} />
        </svg>
        <span style={{ textAlign: 'center' }}>
          <span style={{ fontSize: size * 0.2, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{value}</span>
          {unit && <span style={{ fontSize: size * 0.1, color: 'var(--text-3)', fontWeight: 600 }}> {unit}</span>}
        </span>
      </span>
      {label && <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.05em' }}>{label}</span>}
    </span>
  );
}

/* ── RangeBar — dot، filled bar، dot: a time range per row (Attio Deals). */
export function RangeBar({ start, end, startLabel, endLabel }: { start: number; end: number; startLabel?: string; endLabel?: string }) {
  const s = Math.max(0, Math.min(start, 1)) * 100;
  const e = Math.max(0, Math.min(end, 1)) * 100;
  return (
    <div>
      <div style={{ position: 'relative', height: 6, borderRadius: 6, background: 'var(--surface-2)' }}>
        <span style={{ position: 'absolute', top: 0, bottom: 0, insetInlineStart: `${s}%`, width: `${e - s}%`, borderRadius: 6, background: 'var(--accent)' }} />
        <span style={{ position: 'absolute', top: -3, insetInlineStart: `${s}%`, width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', border: '2.5px solid var(--surface)', transform: 'translateX(-50%)', }} />
        <span style={{ position: 'absolute', top: -3, insetInlineStart: `${e}%`, width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', border: '2.5px solid var(--surface)', transform: 'translateX(-50%)', }} />
      </div>
      {(startLabel || endLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-3)', marginTop: 8, fontVariantNumeric: 'tabular-nums' }}>
          <span>{startLabel}</span><span>{endLabel}</span>
        </div>
      )}
    </div>
  );
}

/* ── StatusStrip — thin dark strip: pulsing dot + message + dismiss. */
export function StatusStrip({ message, onDismiss }: { message: React.ReactNode; onDismiss?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 6, background: 'oklch(0.2 0.03 274)', color: 'oklch(0.95 0.005 270)', fontSize: 13, fontWeight: 500 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.75 0.15 158)', animation: 'pulseDot 1.8s ease-in-out infinite', flex: 'none' }} />
      {message}
      {onDismiss && (
        <button aria-label="Dismiss" onClick={onDismiss} style={{ marginInlineStart: 'auto', width: 22, height: 22, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: 'inherit', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}

/* ── LogsTable — rows expand for a detail panel; status chips per code. */
export interface LogRow { time: string; method: string; path: string; code: number; detail?: React.ReactNode; }

export function LogsTable({ rows }: { rows: LogRow[] }) {
  const [open, setOpen] = useState(-1);
  const tone = (code: number) => (code < 300 ? 'success' : code < 500 ? 'warning' : 'danger');
  return (
    <div style={{ borderRadius: 6, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)' }}>
      {rows.map((r, i) => (
        <div key={i} style={{ borderTop: i ? '1px solid var(--border)' : 'none' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="i-surface2" style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 14px', border: 'none', background: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', cursor: 'pointer', transition: 'background 140ms', textAlign: 'start' }}>
            <span style={{ color: 'var(--text-3)' }}>{r.time}</span>
            <span style={{ fontWeight: 700, color: 'var(--text-2)' }}>{r.method}</span>
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} dir="ltr">{r.path}</span>
            <span style={{ padding: '2px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: `var(--${tone(r.code)}-soft)`, color: `var(--${tone(r.code)})` }}>{r.code}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 250ms' }}><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <div style={{ display: 'grid', gridTemplateRows: open === i ? '1fr' : '0fr', transition: `grid-template-rows 340ms ${GLIDE}` }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ padding: '4px 14px 14px', fontSize: 12.5, color: 'var(--text-2)', fontFamily: 'var(--font-mono)', background: 'var(--bg-deep)' }} dir="ltr">{r.detail ?? 'No additional detail recorded.'}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
