import { useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Data visualization — built to the dataviz skill procedure:
   form → color-by-job → validated palette → mark specs → hover → a11y.

   CATEGORICAL is a fixed, colorblind-safe order (never the theme accent,
   never cycled), validated with scripts/validate_palette.js:
     light surface #fcfcfb → ALL PASS · Night surface #20223a → PASS
   Every categorical series ALSO gets a legend + direct label, which is the
   relief the one contrast WARN requires.
──────────────────────────────────────────────────────────────────────── */
export const CATEGORICAL = ['#2E6FE0', '#C77A12', '#12967A', '#6D3FE0', '#D8443C'] as const;

const T = 'cubic-bezier(0.22,1,0.36,1)';

/* ── DonutChart — magnitude-of-a-whole by identity (categorical). Legend
      always present; slices carry a 2px surface gap; center holds the
      total; per-slice hover. A 6th+ category must fold into "Other". */
export interface DonutDatum { label: string; value: number; }
export interface DonutChartProps {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}

export function DonutChart({ data, size = 168, thickness = 22, centerLabel }: DonutChartProps) {
  const [hov, setHov] = useState(-1);
  const items = data.slice(0, 5);
  const total = items.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const gap = 2 / C; // 2px surface gap as a fraction
  let offset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={thickness} />
          {items.map((d, i) => {
            const frac = d.value / total;
            const dash = Math.max(frac - gap, 0.0001) * C;
            const el = (
              <circle
                key={d.label} cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={CATEGORICAL[i]} strokeWidth={hov === i ? thickness + 4 : thickness}
                strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-offset * C} strokeLinecap="butt"
                onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}
                style={{ transition: `stroke-width 200ms ${T}`, cursor: 'pointer' }}
              />
            );
            offset += frac;
            return el;
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
              {hov >= 0 ? `${Math.round((items[hov].value / total) * 100)}%` : total.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{hov >= 0 ? items[hov].label : centerLabel}</div>
          </div>
        </div>
      </div>
      {/* legend — identity never color-alone */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 130 }}>
        {items.map((d, i) => (
          <div key={d.label} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, cursor: 'pointer', opacity: hov < 0 || hov === i ? 1 : 0.5, transition: 'opacity 200ms' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: CATEGORICAL[i], flex: 'none' }} />
            <span style={{ flex: 1, color: 'var(--text-2)' }}>{d.label}</span>
            <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Gauge — a single headline magnitude on a fixed scale (sequential:
      one accent hue). Sweep animates; the number is the label. */
export function Gauge({ value, max = 100, label, size = 160 }: { value: number; max?: number; label?: string; size?: number }) {
  const frac = Math.max(0, Math.min(value / max, 1));
  const r = size / 2 - 12;
  const arc = Math.PI * r; // 180°
  return (
    <div style={{ position: 'relative', width: size, height: size / 2 + 30, textAlign: 'center' }}>
      <svg width={size} height={size / 2 + 8} viewBox={`0 0 ${size} ${size / 2 + 8}`}>
        <path d={`M 12 ${size / 2} A ${r} ${r} 0 0 1 ${size - 12} ${size / 2}`} fill="none" stroke="var(--surface-2)" strokeWidth="12" strokeLinecap="round" />
        <path d={`M 12 ${size / 2} A ${r} ${r} 0 0 1 ${size - 12} ${size / 2}`} fill="none" stroke="var(--accent)" strokeWidth="12" strokeLinecap="round" strokeDasharray={arc} strokeDashoffset={arc * (1 - frac)} style={{ transition: `stroke-dashoffset 1.1s ${T}` }} />
      </svg>
      <div style={{ position: 'absolute', insetInline: 0, bottom: 4 }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}<span style={{ fontSize: 14, color: 'var(--text-3)' }}>/{max}</span></div>
        {label && <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.05em', marginTop: 2 }}>{label}</div>}
      </div>
    </div>
  );
}

/* ── Heatmap — contribution grid (sequential: one hue, light→dark by
      magnitude). Per-cell hover. weeks × 7 days. */
export function Heatmap({ weeks = 20, seed = 7, label }: { weeks?: number; seed?: number; label?: string }) {
  const [hov, setHov] = useState<[number, number] | null>(null);
  // deterministic pseudo-values 0..4
  const val = (w: number, d: number) => ((w * 7 + d) * 2654435761 % 97 + seed * 13) % 5;
  const levelBg = (v: number) => v === 0 ? 'var(--surface-2)' : `color-mix(in srgb, var(--accent) ${18 + v * 20}%, var(--surface))`;
  return (
    <div>
      {label && <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>{label}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: 3 }}>
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} style={{ display: 'grid', gridTemplateRows: 'repeat(7,1fr)', gap: 3 }}>
            {Array.from({ length: 7 }, (_, d) => {
              const v = val(w, d);
              const on = hov && hov[0] === w && hov[1] === d;
              return <span key={d} onMouseEnter={() => setHov([w, d])} onMouseLeave={() => setHov(null)} style={{ aspectRatio: '1', borderRadius: 3, background: levelBg(v), outline: on ? '1.5px solid var(--accent)' : 'none', cursor: 'pointer', transition: 'background 160ms' }} />;
            })}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, justifyContent: 'flex-end', fontSize: 10.5, color: 'var(--text-3)' }}>
        أقل
        {[0, 1, 2, 3, 4].map((v) => <span key={v} style={{ width: 11, height: 11, borderRadius: 3, background: v === 0 ? 'var(--surface-2)' : `color-mix(in srgb, var(--accent) ${18 + v * 20}%, var(--surface))` }} />)}
        أكثر
      </div>
    </div>
  );
}

/* ── StarRating — status/score. Interactive; keyboard-free simple version. */
export function StarRating({ value, max = 5, onChange, size = 22, readOnly }: { value: number; max?: number; onChange?: (v: number) => void; size?: number; readOnly?: boolean }) {
  const [hover, setHover] = useState(-1);
  const shown = hover >= 0 ? hover + 1 : value;
  return (
    <span style={{ display: 'inline-flex', gap: 3 }} role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < shown;
        return (
          <button
            key={i} type="button" aria-label={`${i + 1}`} disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(i)} onMouseLeave={() => setHover(-1)}
            onClick={() => onChange?.(i + 1)}
            style={{ border: 'none', background: 'none', padding: 0, cursor: readOnly ? 'default' : 'pointer', lineHeight: 0, transition: `transform 200ms ${T}`, transform: hover === i ? 'scale(1.2)' : 'scale(1)' }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'var(--warning)' : 'none'} stroke={filled ? 'var(--warning)' : 'var(--border-strong)'} strokeWidth="1.6" strokeLinejoin="round"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.4 6.1 21l1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
          </button>
        );
      })}
    </span>
  );
}

/* ── ProgressCircle — a single fraction as a ring (sequential accent). */
export function ProgressCircle({ value, size = 64, thickness = 6, showLabel = true }: { value: number; size?: number; thickness?: number; showLabel?: boolean }) {
  const frac = Math.max(0, Math.min(value / 100, 1));
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-grid', placeItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={thickness} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={thickness} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - frac)} style={{ transition: `stroke-dashoffset 900ms ${T}` }} />
      </svg>
      {showLabel && <span style={{ position: 'absolute', fontSize: size * 0.26, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{Math.round(frac * 100)}</span>}
    </span>
  );
}
