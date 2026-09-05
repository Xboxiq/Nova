import { useState } from 'react';

const glide = 'cubic-bezier(0.16,1,0.3,1)';

/* ────────────────────────────────────────────────────────────────────────
   Sparkline — larsen66/animated-sparkline + jatin-yadav05/mini-chart
   (design.md §18.3). The polyline draws itself once on mount over 1.6s
   (stroke-dasharray), with a solid end-dot. Never loops.
──────────────────────────────────────────────────────────────────────── */
export interface SparklineProps {
  /** Data points, any positive range — normalized to the box. */
  points: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  /** Stroke color; defaults to the theme accent. */
  color?: string;
}

export function Sparkline({ points, width = 130, height = 44, strokeWidth = 2.5, color = 'var(--accent)' }: SparklineProps) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const pad = 6;
  const coords = points.map((p, i) => [
    pad + (i / (points.length - 1)) * (width - pad * 2),
    pad + (1 - (p - min) / span) * (height - pad * 2),
  ]);
  const last = coords[coords.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={coords.map(([x, y]) => `${x},${y}`).join(' ')}
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={240} style={{ animation: 'drawLine 1.6s cubic-bezier(0.22,1,0.36,1) forwards' }}
      />
      <circle cx={last[0]} cy={last[1]} r={3.5} fill={color} />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   MiniBarChart — the bar sibling of mini-chart. Bars grow from the
   baseline once on mount, staggered 120ms (§19.1 segment loader); hover
   reveals the value; the peak bar carries the accent.

   With `target`, the chart stops being a ranking and becomes a comparison:
   VISUAL-LAW.md §14 asks that a reading be measured against a reference that
   is *drawn on the same scale*, so the line is a real construction line —
   dashed and neutral, because the benchmark is structure — and the bars that
   reach it are the ones that take the tone.
──────────────────────────────────────────────────────────────────────── */
export interface MiniBarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  /** A declared reference the bars are read against. `tone` colours the bars
      that reach it — not the line, which stays neutral. */
  target?: { value: number; label?: string; tone?: string };
  /** A declared usual RANGE the bars are read against, hatched because it is data (§11).
      `tone` colours the bars that rise above it. */
  band?: { min: number; max: number; label?: string; tone?: string };
  /** The chart is one tab stop; the arrows walk the bars and reveal each value, so what the
      mouse gets on hover the keyboard gets by arrow. This names the stop. */
  name?: string;
  /** Space between columns; fourteen nights want less than six months. */
  gap?: number;
  /** Where the reading lives (VISUAL-LAW.md §18). `mass` fills the bar, which
      makes the whole block the claim. `edge` puts the value on a hairline at the
      bar's top and hatches the body beneath it, so the body reads as the space
      the value stands in rather than as the value. */
  reading?: 'mass' | 'edge';
}

export function MiniBarChart({ data, height = 96, target, band, name, reading = 'mass', gap = 8 }: MiniBarChartProps) {
  const [hov, setHov] = useState(-1);
  const max = Math.max(...data.map((b) => b.value), target?.value ?? 0, band?.max ?? 0);
  /* Every row of the column has a fixed height and does not shrink, so the
     plot area is exact and the reference line can be placed by arithmetic
     rather than by eye — the gate measures it against a bar to prove it.
     Left to flex defaults the rows overflow and shrink, and the bars quietly
     leave the scale the line is drawn on. */
  const VAL = 13; const LAB = 14; const GAP = 6;
  const barMax = height - VAL - LAB - GAP * 2;
  const LABEL = LAB + GAP;
  const tone = band?.tone ?? target?.tone ?? 'var(--accent)';
  const loud = (v: number) => (band ? v > band.max : target ? v >= target.value : v === max);
  const lineY = target ? LABEL + (target.value / max) * barMax : 0;
  const bandY = band ? { bottom: LABEL + (band.min / max) * barMax, height: ((band.max - band.min) / max) * barMax } : null;

  return (
    <div
      style={{ position: 'relative', height }}
      tabIndex={0}
      role="group"
      aria-label={name ?? 'رسمٌ شريطيّ، الأسهم تكشف القيم'}
      data-barchart=""
      onFocus={() => setHov((h) => (h < 0 ? 0 : h))}
      onBlur={() => setHov(-1)}
      onKeyDown={(e) => {
        const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
        const d = e.key === (rtl ? 'ArrowLeft' : 'ArrowRight') ? 1 : e.key === (rtl ? 'ArrowRight' : 'ArrowLeft') ? -1 : e.key === 'Home' ? -data.length : e.key === 'End' ? data.length : 0;
        if (!d) return;
        e.preventDefault();
        setHov((h) => Math.max(0, Math.min(data.length - 1, (h < 0 ? 0 : h) + d)));
      }}
    >
      {bandY && (
        <>
          <span
            data-band="" aria-hidden="true" className="madar-hatch"
            style={{ position: 'absolute', insetInline: 0, bottom: bandY.bottom, height: bandY.height, ['--madar-hatch-color' as string]: 'var(--border-strong)', borderBlock: '1px solid var(--border-strong)', pointerEvents: 'none' }}
          />
          <span style={{
            position: 'absolute', insetInlineEnd: 0, top: 0, padding: '1px 8px',
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)',
            fontSize: 10.5, fontWeight: 600, color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            {band!.label ?? `${band!.min}–${band!.max}`}
          </span>
        </>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap, height: '100%' }}>
        {data.map((b, i) => (
          <div key={b.label} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end', cursor: 'default' }}>
            <span style={{ fontSize: 11, height: VAL, lineHeight: `${VAL}px`, flex: 'none', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: loud(b.value) ? tone : 'var(--accent)', opacity: hov === i ? 1 : 0, transition: 'opacity 180ms' }}>{b.value}</span>
            <div
              data-bar={b.label}
              data-reading={reading}
              className={reading === 'edge' ? 'madar-hatch' : undefined}
              style={{
                width: '100%', maxWidth: 30, height: (b.value / max) * barMax, flex: 'none', borderRadius: '6px 6px 3px 3px',
                // backgroundColor, never the shorthand: it would erase the hatch
                backgroundColor: reading === 'edge'
                  ? 'transparent'
                  : (loud(b.value) ? tone : hov === i ? 'var(--accent)' : 'var(--accent-soft)'),
                ...(reading === 'edge'
                  ? {
                    /* the reveal is the VALUE above the bar; the bar keeps its own encoding, so a
                       night the keyboard is reading never borrows the verdict's colour (§27) */
                    ['--madar-hatch-color' as string]: loud(b.value) ? tone : hov === i ? 'var(--accent)' : 'var(--border)',
                    // the cap is the reading; the hatch below is the room it stands in
                    borderTop: `2px solid ${loud(b.value) ? tone : 'var(--accent)'}`,
                  }
                  : null),
                transformOrigin: 'bottom', animation: `growBar 600ms ${glide} both`, animationDelay: `${i * 120}ms`,
                transition: 'background-color 200ms, border-color 200ms',
              }}
            />
            <span style={{ fontSize: 10.5, fontWeight: 600, height: LAB, lineHeight: `${LAB}px`, flex: 'none', color: loud(b.value) ? 'var(--text)' : 'var(--text-3)' }}>{b.label}</span>
          </div>
        ))}
      </div>

      {target && (
        <>
          <span
            data-target-line="" aria-hidden="true"
            style={{ position: 'absolute', insetInline: 0, bottom: lineY, borderTop: '1px dashed var(--border-strong)', pointerEvents: 'none' }}
          />
          <span style={{
            position: 'absolute', insetInlineEnd: 0, bottom: lineY + 4, padding: '1px 8px',
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)',
            fontSize: 10.5, fontWeight: 600, color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            {target.label ?? target.value}
          </span>
        </>
      )}
    </div>
  );
}
