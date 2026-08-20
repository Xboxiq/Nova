import type { ReactNode } from 'react';
import { AiOrb, MeshSurface } from './mesh';

/* ────────────────────────────────────────────────────────────────────────
   The board family — the primitives the two dashboard references are made of.

   Three of the fourteen images were one nursing board (cropped twice, then shown
   whole) and one was a sales board. A board is a *composition*, so what belongs
   in a library is not the board — it is the pieces, and the pieces are what the
   crops were actually showing off.

   The one structural thing a screenshot hides, and the reason the first attempt
   at the sales board looked wrong: **the assistant card spans two rows.** That
   is why the dark plate above it is short. Read as a flat grid it looks like a
   card with dead space in it; read as two columns of unequal row counts it is
   the layout the reference actually has.

   Checked and not reused: `DataTable` covers a plain table, but `OppsTable`'s
   risk column is a counted bar rather than a value, which is §15-a; `Heatmap`
   covers a dot field, but the metric rings here read one figure against its
   own total, not a field.
──────────────────────────────────────────────────────────────────────── */

/* This family is a light-ground design, so its cards state their own ink instead
   of inheriting the pack's. Inheriting is how the night pack ended up painting
   near-white text on a white card — twenty-six nodes at a contrast of 1.1, which
   is invisible rather than merely poor. A design that owns its background owns
   its foreground. */
const LIGHT_INK = '#101312';

const n = (v: number, digits = 0) =>
  v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/* ═══════════════════════════════════════════════════════════════════════════
   DarkPlate — a black card with a green pool lit inside it
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PlateStat { label: string; value: string; unit?: string; icon?: ReactNode }

export function DarkPlate({
  title = 'Smart Sales Distribution',
  note = 'AI-enhanced sales metrics showing growth in leads, revenue, and overall performance.',
  stats = DEFAULT_STATS,
}: { title?: string; note?: string; stats?: PlateStat[] }) {
  return (
    <MeshSurface
      variant="plate"
      grain="none"
      bevel="deep"
      radius="var(--r-panel)"
      style={{ padding: 15 }}
    >
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ margin: '3px 0 0', fontSize: 10.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>{note}</p>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 9, marginTop: 13 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            data-plate-stat={s.label}
            style={{
              borderRadius: 11, padding: 10,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, color: 'rgba(255,255,255,0.82)' }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>{s.icon}</span>
              {s.label}
            </div>
            <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 9 }}>
              <bdi dir="ltr">{s.value}</bdi>
              {s.unit && <small style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}> {s.unit}</small>}
            </div>
          </div>
        ))}
      </div>
    </MeshSurface>
  );
}

const stroke = { fill: 'none', stroke: 'var(--lime)', strokeWidth: 1.8, strokeLinecap: 'round' } as const;
const DEFAULT_STATS: PlateStat[] = [
  { label: 'Total Income', value: '56,000.00', unit: '$', icon: <svg width="12" height="12" viewBox="0 0 24 24" {...stroke}><path d="M12 4l8 4-8 4-8-4z" /><path d="M4 12l8 4 8-4M4 16l8 4 8-4" /></svg> },
  { label: 'ROI', value: '+312', unit: '%', icon: <svg width="12" height="12" viewBox="0 0 24 24" {...stroke}><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 15l3-4 2 2 3-4" /></svg> },
  { label: 'Daily Active Users', value: '12,846', icon: <svg width="12" height="12" viewBox="0 0 24 24" {...stroke}><circle cx="9" cy="9" r="3" /><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" /></svg> },
];

/* ═══════════════════════════════════════════════════════════════════════════
   AssistantCard — the orb, and the card that is tall because it spans two rows
   ═══════════════════════════════════════════════════════════════════════════ */

export function AssistantCard({ name = 'Bostie AI', prompt = 'How can I assist you today?' }: { name?: string; prompt?: string }) {
  return (
    <div
      data-assistant=""
      style={{
        borderRadius: 'var(--r-panel)', padding: 14, color: '#fff', textAlign: 'center',
        display: 'flex', flexDirection: 'column', height: '100%',
        background: 'linear-gradient(160deg, #1d201e 0%, #0d100e 100%)',
        boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.12), inset 0 -1.5px 0 var(--bevel-dark-deep)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, fontWeight: 500 }}>
        <button type="button" aria-label="Smaller" style={orbBtn}>−</button>
        {name}
        <button type="button" aria-label="Larger" style={orbBtn}>+</button>
      </div>

      <div style={{ display: 'grid', placeItems: 'center', marginTop: 10 }}><AiOrb /></div>

      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.82)', marginTop: 12 }}>{prompt}</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
        {[
          { label: 'Pro Analysis', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><path d="M12 3a9 9 0 1 0 9 9h-9z" /></svg> },
          { label: 'Report', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M9 8h6M9 12h6M9 16h4" /></svg> },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            style={{
              border: 0, borderRadius: 11, padding: '10px 8px', fontSize: 10.5, cursor: 'pointer',
              fontFamily: 'inherit', color: '#fff',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}
          >
            {b.icon}{b.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 7, marginTop: 'auto', paddingTop: 10, alignItems: 'center' }}>
        <span
          style={{
            flex: 1, height: 34, borderRadius: 17, display: 'flex', alignItems: 'center',
            padding: '0 6px 0 14px', fontSize: 11, color: 'rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          Ask anything...
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#2c2f2d', display: 'grid', placeItems: 'center', marginInlineStart: 'auto' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--lime)" aria-hidden="true"><path d="M3 20l18-8L3 4l4 8z" /></svg>
          </span>
        </span>
        <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
        </span>
      </div>
    </div>
  );
}

const orbBtn = {
  width: 24, height: 24, border: 0, borderRadius: '50%', background: '#262927',
  color: '#fff', fontSize: 15, lineHeight: 1, cursor: 'pointer', display: 'grid', placeItems: 'center',
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   SplitDonut — one revenue figure split three ways, with the hatch meaning
   "counted but not realised" (§15-b)
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Slice { label: string; value: number; kind: 'solid' | 'hatch' | 'accent' }

export function SplitDonut({
  total = '$728.000',
  caption = 'Total Revenue',
  slices = [
    { label: 'Leads', value: 344, kind: 'solid' },
    { label: 'Revenue', value: 256, kind: 'hatch' },
    { label: 'AI Uplift', value: 128, kind: 'accent' },
  ],
}: { total?: string; caption?: string; slices?: Slice[] }) {
  const sum = slices.reduce((t, s) => t + s.value, 0);
  const C = 2 * Math.PI * 44;
  let acc = 0;
  const arcs = slices.map((s) => {
    const frac = s.value / sum;
    const arc = { ...s, dash: C * frac, offset: -C * acc };
    acc += frac;
    return arc;
  });

  return (
    <div data-donut={sum} style={{ color: LIGHT_INK, display: 'flex', alignItems: 'center', gap: 14 }}>
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
        <defs>
          <pattern id="madar-donut-hatch" width="7" height="7" patternTransform="rotate(120)" patternUnits="userSpaceOnUse">
            <rect width="7" height="7" fill="#fff" />
            <path d="M0 0v7" stroke="var(--lime-hatch)" strokeWidth="4" />
          </pattern>
        </defs>
        {arcs.map((a) => (
          <circle
            key={a.label}
            cx="64" cy="64" r="44"
            stroke={a.kind === 'hatch' ? 'url(#madar-donut-hatch)' : a.kind === 'accent' ? 'var(--lime-hatch)' : '#5b4bea'}
            strokeWidth="21"
            strokeDasharray={`${a.dash} ${C}`}
            strokeDashoffset={a.offset}
            transform="rotate(-90 64 64)"
            strokeLinecap="butt"
          />
        ))}
        <text x="64" y="62" textAnchor="middle" fontSize="15" fontWeight="600" fill="#101312">{total}</text>
        <text x="64" y="76" textAnchor="middle" fontSize="9" fill="#a7a7ad">{caption}</text>
      </svg>
      <div style={{ fontSize: 10.5, color: '#4d4f52', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {slices.map((s) => (
          <span key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <i
              style={{
                width: 9, height: 9, borderRadius: 3, display: 'inline-block',
                background: s.kind === 'hatch'
                  ? 'repeating-linear-gradient(120deg, var(--lime-hatch) 0 3px, #fff 3px 6px)'
                  : s.kind === 'accent' ? 'var(--lime-hatch)' : '#5b4bea',
              }}
            />
            <b style={{ fontWeight: 600 }}><bdi dir="ltr">{n(s.value)}</bdi></b> {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OppsTable — the risk column is counted, not scored
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Opp { name: string; region: string; score: number; risk: number; leads: number; value: string; tone: 'lime' | 'iris' }

export function OppsTable({ rows = OPPS }: { rows?: Opp[] }) {
  const cols = '1.5fr 0.9fr 1.1fr 1fr 1fr 1.1fr';
  return (
    <div data-opps={rows.length} style={{ color: LIGHT_INK, borderRadius: 'var(--r-panel)', background: '#fff', padding: 13, boxShadow: 'inset 0 0 0 1px #f0eef6' }}>
      <div style={{ display: 'grid', gridTemplateColumns: cols, fontSize: 10, color: '#a7a7ad', padding: '6px 8px' }}>
        <span>Name</span><span>Region</span><span>AI Success Score</span><span>Risks Level</span><span>Lead Increase</span><span>Account Value</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', fontSize: 11, padding: 8, borderRadius: 11, boxShadow: 'inset 0 0 0 1px #f2f0f7', marginTop: 7 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}>
            <i
              style={{
                width: 22, height: 22, borderRadius: '50%',
                background: r.tone === 'lime'
                  ? 'radial-gradient(60% 60% at 34% 28%, #4fd08a, #0a2e1c)'
                  : 'radial-gradient(60% 60% at 34% 28%, #8b7bff, #231a58)',
              }}
            />
            {r.name}
          </span>
          <span>{r.region}</span>
          <span><bdi dir="ltr">{r.score}%</bdi></span>
          {/* seven ticks, and the filled ones are the reading — a counted level,
              not a bar that could be any width */}
          <span role="img" aria-label={`risk ${r.risk} of 7`} style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: 7 }, (_, i) => (
              <i
                key={i}
                style={{
                  width: 5, height: 15, borderRadius: 2,
                  background: i < r.risk ? (r.tone === 'lime' ? 'var(--lime-hatch)' : '#5b4bea') : '#dcdae8',
                }}
              />
            ))}
          </span>
          <span><bdi dir="ltr">+{n(r.leads)}</bdi></span>
          <span><bdi dir="ltr">{r.value}</bdi></span>
        </div>
      ))}
    </div>
  );
}

const OPPS: Opp[] = [
  { name: 'Quinta Starter', region: 'USA', score: 88, risk: 7, leads: 8000, value: '+$48,569,09', tone: 'lime' },
  { name: 'Vertex Mode', region: 'Spain', score: 74, risk: 4, leads: 3400, value: '+$21,140,00', tone: 'iris' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CareOverview — a progress bar with pinned markers, and four counted rings
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CareMetric { label: string; value: number; of?: number; icon: 'person' | 'heart' | 'discharge' }

export function CareOverview({
  progress = 75,
  pins = [45, 75],
  metrics = CARE,
}: { progress?: number; pins?: number[]; metrics?: CareMetric[] }) {
  return (
    <div data-care={progress} style={{ color: LIGHT_INK, background: '#fbfbfb', borderRadius: 14, padding: 14, boxShadow: 'inset 0 1px 0 #fff, var(--depth-hairline)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.015em' }}>Patient Care Overview</h4>
        <span style={{ height: 26, padding: '0 10px', borderRadius: 13, background: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', gap: 6, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)' }}>
          This Week
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#131a12" strokeWidth="2.6" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11.5, color: '#6b736d' }}>Total progress</div>
        <div style={{ position: 'relative' }}>
          {pins.map((p, i) => (
            <span key={p} aria-hidden="true" style={{ position: 'absolute', top: -26, insetInlineStart: `${p}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: 'var(--depth-pin)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#131a12" strokeWidth="1.8">
                  {i === 0
                    ? <><circle cx="10" cy="8" r="3" /><path d="M4 20c0-3.3 2.7-5 6-5s6 1.7 6 5" /><path d="M18 6v4M16 8h4" /></>
                    : <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9z" />}
                </svg>
              </span>
              <span style={{ display: 'block', width: 1.4, height: 13, background: '#131a12', margin: '0 auto' }} />
            </span>
          ))}
          {/* the reached part is solid; beyond it is hatched, because a plan is
              not a measurement (§15-b) */}
          <div style={{ position: 'relative', height: 13, borderRadius: 7, marginTop: 24, background: '#ececec', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', inset: 0, insetInlineEnd: `${100 - progress}%`, background: 'linear-gradient(90deg, #8fb06c 0%, #7ba055 46%, #5e7f3d 100%)' }} />
            <span style={{ position: 'absolute', inset: 0, insetInlineStart: `${progress}%`, background: 'repeating-linear-gradient(115deg, #e2e2e2 0 4px, #f2f2f2 4px 8px)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#9aa09b', marginTop: 6 }}>
          <span>0%</span><span>45%</span><span>75%</span><span>100%</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9, marginTop: 14 }}>
        {metrics.map((m) => {
          const frac = m.of ? m.value / m.of : 1;
          const C = 2 * Math.PI * 17;
          return (
            <div key={m.label} data-metric={m.label} style={{ background: '#f2f2f2', borderRadius: 12, padding: '12px 6px', textAlign: 'center', boxShadow: 'inset 0 1px 0 #fff' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" style={{ margin: '0 auto 8px', display: 'block' }}>
                <circle cx="20" cy="20" r="17" fill="none" stroke="#e2e2e2" strokeWidth="2.4" />
                <circle cx="20" cy="20" r="17" fill="none" stroke="#7ba055" strokeWidth="2.4" strokeDasharray={`${C * frac} ${C}`} transform="rotate(-90 20 20)" strokeLinecap="round" />
                <g transform="translate(12 12)" stroke="#131a12" strokeWidth="1.7" fill="none">
                  {m.icon === 'heart'
                    ? <path d="M8 14s-5-3-5-6.4A2.9 2.9 0 0 1 8 5.4 2.9 2.9 0 0 1 13 7.6C13 11 8 14 8 14z" />
                    : <><circle cx="7" cy="5.6" r="2.1" /><path d="M2.8 14c0-2.3 1.9-3.5 4.2-3.5s4.2 1.2 4.2 3.5" />{m.icon === 'person' ? <path d="M12.6 4.2v2.8M11.2 5.6h2.8" /> : <path d="M14 4.2l-2.8 2.8M11.2 4.2l2.8 2.8" />}</>}
                </g>
              </svg>
              <div style={{ fontSize: 11.5, fontWeight: 500, lineHeight: 1.3 }}>{m.label}</div>
              <div style={{ fontSize: 13, marginTop: 8 }}>
                <bdi dir="ltr">{n(m.value)}</bdi>
                {m.of && <small style={{ color: '#a4aaa5' }}> / <bdi dir="ltr">{n(m.of)}</bdi></small>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CARE: CareMetric[] = [
  { label: 'Total Patients', value: 128, icon: 'person' },
  { label: 'Stable Patients', value: 86, of: 128, icon: 'person' },
  { label: 'Critical Patients', value: 12, of: 128, icon: 'heart' },
  { label: 'Discharges Patients', value: 24, of: 128, icon: 'discharge' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FlowDonut — capacity against target, and the overflow badge
   ═══════════════════════════════════════════════════════════════════════════ */

export function FlowDonut({ total = 900, incoming = 400 }: { total?: number; incoming?: number }) {
  const C = 2 * Math.PI * 44;
  return (
    <div data-flow={total} style={{ color: LIGHT_INK, background: 'linear-gradient(168deg, #e7efdf, #dae8cd)', borderRadius: 14, padding: 14, boxShadow: 'inset 0 1px 0 #fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.015em' }}>Patient Flow</h4>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#6b736d" aria-hidden="true"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', marginTop: 6 }}>
        <svg width="164" height="126" viewBox="0 0 164 126" fill="none">
          <circle cx="82" cy="66" r="44" stroke="#f0f4ea" strokeWidth="15" />
          <circle cx="82" cy="66" r="44" stroke="#d9b6dd" strokeWidth="15" strokeDasharray={`${C * 0.22} ${C}`} transform="rotate(-108 82 66)" strokeLinecap="round" />
          <circle cx="82" cy="66" r="44" stroke="#e8d47a" strokeWidth="15" strokeDasharray={`${C * 0.26} ${C}`} strokeDashoffset={-C * 0.22} transform="rotate(-108 82 66)" strokeLinecap="round" />
          <circle cx="82" cy="66" r="44" stroke="#7ba055" strokeWidth="15" strokeDasharray={`${C * 0.4} ${C}`} strokeDashoffset={-C * 0.48} transform="rotate(-108 82 66)" strokeLinecap="round" />
          <text x="82" y="66" textAnchor="middle" fontSize="20" fontWeight="600" fill="#131a12">{n(total)}</text>
          <text x="82" y="80" textAnchor="middle" fontSize="9" fill="#6b736d">100% Capacity</text>
          <g transform="translate(120 28)">
            <rect width="36" height="18" rx="9" fill="#22331b" />
            <text x="18" y="12.6" textAnchor="middle" fontSize="9.5" fill="#fff">{n(incoming)}</text>
          </g>
        </svg>
        <span style={{ display: 'flex', gap: 12, fontSize: 10.5, color: '#6b736d', marginTop: 2 }}>
          <span><i style={legendDot('#7ba055')} />Current Status</span>
          <span><i style={legendDot('#e8d47a')} />Target Health</span>
        </span>
      </div>
    </div>
  );
}

const legendDot = (bg: string) => ({ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginInlineEnd: 5, background: bg }) as const;

/* ═══════════════════════════════════════════════════════════════════════════
   StaffList — a roster where the status is a state, not a colour swatch
   ═══════════════════════════════════════════════════════════════════════════ */

export type Duty = 'duty' | 'available' | 'leave';
export interface Staff { name: string; role: string; duty: Duty; tint: string }

const DUTY: Record<Duty, { label: string; bg: string; ink: string; dot: string }> = {
  duty: { label: 'On Duty', bg: '#e3f0fb', ink: '#2c6ea8', dot: '#3b8ed0' },
  available: { label: 'Available', bg: '#e8f3e2', ink: '#4c7a34', dot: '#6ca545' },
  leave: { label: 'On Leave', bg: '#fbe6e4', ink: '#b04236', dot: '#d9463a' },
};

export function StaffList({ staff = STAFF }: { staff?: Staff[] }) {
  return (
    <div data-staff={staff.length} style={{ color: LIGHT_INK, background: '#fbfbfb', borderRadius: 14, padding: 14, boxShadow: 'inset 0 1px 0 #fff, var(--depth-hairline)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.015em' }}>Doctor</h4>
        <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#131a12" strokeWidth="2.2" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>
        </span>
      </div>
      <div style={{ marginTop: 6 }}>
        {staff.map((s, i) => {
          const d = DUTY[s.duty];
          return (
            <div key={s.name} data-duty={s.duty} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderBottom: i === staff.length - 1 ? 0 : '1px solid #f0f0f0' }}>
              <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: '50%', flex: 'none', background: s.tint, display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(0,0,0,0.28)"><circle cx="12" cy="9" r="3.4" /><path d="M5 21c0-3.9 3.2-6 7-6s7 2.1 7 6z" /></svg>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <b style={{ display: 'block', fontSize: 12, fontWeight: 500 }}>{s.name}</b>
                <span style={{ fontSize: 10.5, color: '#8d948e' }}>{s.role}</span>
              </span>
              <span style={{ height: 22, padding: '0 9px', borderRadius: 11, fontSize: 10.5, display: 'flex', alignItems: 'center', gap: 5, background: d.bg, color: d.ink }}>
                <i style={{ width: 5, height: 5, borderRadius: '50%', background: d.dot }} />{d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const STAFF: Staff[] = [
  { name: 'Dr. Olivia Bennett', role: 'Cardiologist', duty: 'duty', tint: '#c8dced' },
  { name: 'Dr. Marcus Lee', role: 'Neurologist', duty: 'available', tint: '#cfe0cd' },
  { name: 'Dr. Samuel Ortiz', role: 'Orthopedic Surgeon', duty: 'duty', tint: '#d9d9d4' },
  { name: 'Dr. Milang Carter', role: 'Pediatrician', duty: 'leave', tint: '#ecd8cf' },
  { name: 'Dr. Marco Singh', role: 'Dermatologist', duty: 'available', tint: '#d2ccdd' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PaletteSlide — the brand slide, and the sphere that is not a dot
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Swatch { hex: string; from: string; mid: string; to: string }

export function PaletteSlide({
  face = 'Neue Montreal',
  weights = ['Regular', 'Medium'],
  swatches = SWATCHES,
}: { face?: string; weights?: string[]; swatches?: Swatch[] }) {
  return (
    <MeshSurface variant="olive" grain="light" radius="var(--r-panel)" style={{ padding: '54px 40px 60px', textAlign: 'center' }}>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)' }}>Typography</div>
      <div
        style={{
          fontSize: 62, fontWeight: 300, letterSpacing: '-0.045em', lineHeight: 1, marginTop: 10,
          background: 'linear-gradient(178deg, #ffffff 0%, #f2f2ee 42%, #c9c9c2 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}
      >
        {face}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'rgba(255,255,255,0.72)', marginTop: 14, padding: '0 6%' }}>
        {weights.map((w) => <span key={w}>{w}</span>)}
      </div>

      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', marginTop: 44 }}>Colour Palette</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 18 }}>
        {swatches.map((s) => (
          <span
            key={s.hex}
            data-swatch={s.hex}
            style={{
              height: 62, padding: '0 22px 0 9px', borderRadius: 31,
              display: 'flex', alignItems: 'center', gap: 16, fontSize: 17,
              border: '1px solid rgba(255,255,255,0.22)',
              background: 'rgba(255,255,255,0.05)',
              boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.24), inset 0 -1.5px 0 rgba(0,0,0,0.2)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <i
              style={{
                width: 44, height: 44, borderRadius: '50%', flex: 'none',
                background: `radial-gradient(66% 66% at 33% 26%, ${s.from} 0%, ${s.mid} 46%, ${s.to} 84%)`,
                boxShadow: 'inset 0 -3px 5px rgba(255,255,255,0.28), var(--depth-sphere)',
              }}
            />
            <bdi dir="ltr">{s.hex}</bdi>
          </span>
        ))}
      </div>
    </MeshSurface>
  );
}

const SWATCHES: Swatch[] = [
  { hex: '#BAF91A', from: '#e6ff7a', mid: '#baf91a', to: '#93c810' },
  { hex: '#E2FF99', from: '#ffffff', mid: '#e2ff99', to: '#c2e072' },
  { hex: '#876DFF', from: '#c4b6ff', mid: '#876dff', to: '#6650d9' },
  { hex: '#101312', from: '#4a4f4c', mid: '#1c201e', to: '#101312' },
  { hex: '#FFFFFF', from: '#ffffff', mid: '#ffffff', to: '#dcdcd6' },
];
