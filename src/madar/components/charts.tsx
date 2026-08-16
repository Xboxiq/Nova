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
──────────────────────────────────────────────────────────────────────── */
export interface MiniBarChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export function MiniBarChart({ data, height = 96 }: MiniBarChartProps) {
  const [hov, setHov] = useState(-1);
  const max = Math.max(...data.map((b) => b.value));
  const barMax = height - 24;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height }}>
      {data.map((b, i) => (
        <div key={b.label} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end', cursor: 'default' }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--accent)', opacity: hov === i ? 1 : 0, transition: 'opacity 180ms' }}>{b.value}</span>
          <div style={{
            width: '100%', maxWidth: 30, height: (b.value / max) * barMax, borderRadius: '7px 7px 3px 3px',
            background: b.value === max || hov === i ? 'var(--accent)' : 'var(--accent-soft)',
            transformOrigin: 'bottom', animation: `growBar 600ms ${glide} both`, animationDelay: `${i * 120}ms`,
            transition: 'background 200ms',
          }} />
          <span style={{ fontSize: 10.5, fontWeight: 600, color: b.value === max ? 'var(--text)' : 'var(--text-3)' }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
