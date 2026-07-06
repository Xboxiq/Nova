import { useState } from 'react';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';

/* ────────────────────────────────────────────────────────────────────────
   DynamicIsland — starc007/be-ui-dynamic-island (design.md §16.2, §18.3)
   A dark pill that morphs into a card with a spring (480ms): max-width
   and border-radius animate together, the body reveals through a
   grid-template-rows 0fr→1fr expansion. For live activities: order
   tracking, uploads, timers.
──────────────────────────────────────────────────────────────────────── */
export interface DynamicIslandProps {
  /** Always-visible pill row. */
  title: React.ReactNode;
  /** End-aligned meta on the pill (e.g. a countdown). */
  meta?: React.ReactNode;
  /** Revealed content when expanded. */
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  collapsedWidth?: number;
  expandedWidth?: number;
  /** Status dot color. Defaults to live-green. */
  dotColor?: string;
}

export function DynamicIsland({
  title, meta, children, open, defaultOpen = false, onToggle,
  collapsedWidth = 210, expandedWidth = 300, dotColor = 'oklch(0.75 0.15 158)',
}: DynamicIslandProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isOpen = open ?? internal;
  return (
    <div
      onClick={() => { const n = !isOpen; if (open === undefined) setInternal(n); onToggle?.(n); }}
      role="button"
      aria-expanded={isOpen}
      style={{
        margin: '0 auto', cursor: 'pointer', overflow: 'hidden', background: 'oklch(0.17 0.02 274)', color: 'oklch(0.97 0.005 270)',
        borderRadius: isOpen ? 24 : 999, maxWidth: isOpen ? expandedWidth : collapsedWidth, boxShadow: 'var(--shadow-3)',
        transition: `max-width 480ms ${spring}, border-radius 480ms ${spring}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, boxShadow: `0 0 8px ${dotColor}`, flex: 'none' }} />
        <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</span>
        {meta && <span style={{ marginInlineStart: 'auto', fontSize: 12, opacity: 0.6, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{meta}</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0, transition: `grid-template-rows 480ms ${spring}, opacity 320ms` }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '2px 16px 14px' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   EstimatedArrival — hedevelope/estimated-arrival (design.md §18.2)
   ETA number + vehicle tile + phased route bar with a pulsing position
   dot. Phases are worded — never color alone.
──────────────────────────────────────────────────────────────────────── */
export interface EstimatedArrivalProps {
  minutes: number;
  /** Route completion 0–1. */
  progress: number;
  /** Phase labels, start → end. The phase at the current position gets the accent. */
  phases?: string[];
  /** Index of the completed phase (colored --success). */
  completedPhase?: number;
  icon?: React.ReactNode;
}

export function EstimatedArrival({ minutes, progress, phases = ['Picked up', 'On the way', 'Delivered'], completedPhase = 0, icon }: EstimatedArrivalProps) {
  const pct = Math.max(0, Math.min(progress, 1)) * 100;
  const activePhase = Math.min(Math.floor((pct / 100) * phases.length), phases.length - 1);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>ESTIMATED ARRIVAL</div>
          <div style={{ fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', marginTop: 2 }}>
            {minutes}<span style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 500 }}> min</span>
          </div>
        </div>
        <span style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}>
          {icon ?? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16V6a1 1 0 0 1 1-1h9v11M13 8h4l3 4v4h-2.5M3 16h1.5M9.5 16h4" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>}
        </span>
      </div>
      <div style={{ position: 'relative', height: 5, borderRadius: 999, background: 'var(--surface-2)', margin: '6px 0 10px' }}>
        <div style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: 999, background: 'var(--accent)', transition: 'width 560ms cubic-bezier(0.22,1,0.36,1)' }} />
        <span style={{ position: 'absolute', top: -4.5, insetInlineStart: `${pct}%`, width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', border: '3px solid var(--surface)', boxShadow: '0 0 0 3px var(--accent-soft)', animation: 'pulseDot 1.6s ease-in-out infinite', transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-3)' }}>
        {phases.map((p, i) => (
          <span key={p} style={{ color: i <= completedPhase ? 'var(--success)' : i === activePhase ? 'var(--accent)' : undefined, fontWeight: i <= activePhase ? 600 : 400 }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   AgentDock — dqnamo/agent-dock (design.md §18.3)
   Dark panel of agent rows: gradient identity tile + name + state.
   Thinking = 3 staggered pulsing dots (a legal perpetual loop — they ARE
   the status); done = green dot + word; idle = dimmed.
──────────────────────────────────────────────────────────────────────── */
export interface Agent {
  name: string;
  initial: string;
  /** CSS gradient for the identity tile. */
  gradient: string;
  state: 'thinking' | 'idle' | 'done';
}

export function AgentDock({ agents, title = 'AGENT DOCK' }: { agents: Agent[]; title?: string }) {
  return (
    <div style={{ borderRadius: 22, padding: 18, background: 'oklch(0.2 0.03 274)', color: 'oklch(0.94 0.008 270)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', opacity: 0.55, marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {agents.map((a) => (
          <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 13, background: a.state === 'thinking' ? 'rgba(255,255,255,0.07)' : undefined, cursor: a.state === 'thinking' ? undefined : 'pointer', transition: 'background 180ms' }}>
            <span style={{ width: 26, height: 26, borderRadius: 9, background: a.gradient, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 800, color: '#fff' }}>{a.initial}</span>
            <span style={{ fontSize: 13, fontWeight: 600, flex: 1, opacity: a.state === 'thinking' ? 1 : 0.85 }}>{a.name}</span>
            {a.state === 'thinking' && (
              <span style={{ display: 'inline-flex', gap: 3 }}>
                {[0, 0.2, 0.4].map((d) => <span key={d} style={{ width: 4, height: 4, borderRadius: '50%', background: 'oklch(0.8 0.12 172)', animation: `thinkDots 1.2s ease-in-out ${d}s infinite` }} />)}
              </span>
            )}
            {a.state === 'idle' && <span style={{ fontSize: 11, opacity: 0.5 }}>idle</span>}
            {a.state === 'done' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'oklch(0.8 0.12 158)' }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />done</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   LocationTag — jatin-yadav05/location-tag (design.md §18.3)
   Pill: pin icon + place name + pulsing live dot. The dot must mean
   something — live/geo features only.
──────────────────────────────────────────────────────────────────────── */
export function LocationTag({ label, live = true }: { label: string; live?: boolean }) {
  return (
    <span className="i-lift-shadow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px 8px 12px', borderRadius: 999, background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms, box-shadow 220ms' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
      {label}
      {live && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', animation: 'pulseDot 1.8s ease-in-out infinite' }} />}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   LogoTraceLoader — dqnamo/logo-trace-loader (design.md §18.3)
   The brand mark draws itself (stroke-dasharray trace: draw → hold →
   undraw, ~2.4s loop). Branded waiting for app boot — replaces spinners.
──────────────────────────────────────────────────────────────────────── */
export interface LogoTraceLoaderProps {
  /** SVG path in a 64×64 viewBox. Defaults to the Madar mark. */
  path?: string;
  size?: number;
  strokeWidth?: number;
}

export function LogoTraceLoader({ path = 'M32 6 A26 26 0 1 1 31.9 6 M20 40 L26 26 L32 36 L38 24 L44 40', size = 56, strokeWidth = 3 }: LogoTraceLoaderProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="status" aria-label="Loading">
      <path d={path} stroke="var(--accent)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={300} style={{ animation: 'tracePath 2.4s cubic-bezier(0.45,0,0.55,1) infinite' }} />
    </svg>
  );
}
