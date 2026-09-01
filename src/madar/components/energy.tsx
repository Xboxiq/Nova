import { useEffect, useRef, useState } from 'react';
import { Sparkline } from './charts';
import { CATEGORICAL } from './dataviz';

/* ────────────────────────────────────────────────────────────────────────
   Energy — reading a meter, and reading yourself against your own normal.

   Built to design-system/VISUAL-LAW.md rather than to a mood board:

   §2  the light is directly overhead, so nothing inverts when the object
       mirrors for RTL. The register is recessed, not side-lit.
   §3  three shadows with three jobs: the body has contact and cast, the
       register has occlusion at its own rim.
   §9  the bodies are neutral material. Colour belongs to the tier and the
       verdict, never to the housing.
   §11 the unfilled part of any measure is drawn, not left blank.
   §13 the tier colours are an encoding: the same tier carries the same
       colour in every component here, so a reader who learns the ladder can
       read the band and the strip without a second legend.

   Two existing pieces were checked and deliberately not reused, because they
   do a different job rather than a similar one: `MeterDial` in rituals.tsx is
   a half-circle gauge for a score against a maximum, and `OdometerNumber` in
   motion.tsx counts up once when it scrolls into view. A utility register has
   no maximum and never resets — it tracks a value that keeps changing, so its
   drums turn on every change rather than animating once on reveal.
   `Sparkline` from charts.tsx *is* reused, in the strip.
──────────────────────────────────────────────────────────────────────── */

export type TariffTier = 1 | 2 | 3 | 4;

/* The encoding. Four tiers, four fixed colours, one meaning each — this is the
   distinction VISUAL-LAW.md §13 draws between a language and a decoration. */
const TIER: Record<TariffTier, { color: string; soft: string; ar: string }> = {
  1: { color: 'var(--success)', soft: 'var(--success-soft)', ar: 'الشريحة الأولى' },
  2: { color: 'var(--info)', soft: 'var(--info-soft)', ar: 'الشريحة الثانية' },
  3: { color: 'var(--warning)', soft: 'var(--warning-soft)', ar: 'الشريحة الثالثة' },
  4: { color: 'var(--danger)', soft: 'var(--danger-soft)', ar: 'الشريحة الرابعة' },
};

const ar = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/* ── Drum — one digit of the register, on a wheel that turns to reach it.

   Ten digits stacked and shifted, so the motion is a transform rather than a
   re-render of text: it composites, and it reads as a mechanism turning
   instead of a number being replaced. */
function Drum({ digit, fraction = false }: { digit: number; fraction?: boolean }) {
  return (
    <span
      style={{
        display: 'block', width: 17, height: 26, overflow: 'hidden',
        background: fraction ? 'var(--accent)' : 'var(--ink)',
        color: fraction ? 'var(--on-accent)' : 'var(--on-ink)',
        borderRadius: 2,
      }}
    >
      <span
        style={{
          display: 'block',
          transform: `translateY(${-digit * 26}px)`,
          transition: `transform var(--dur-4) var(--ease-out)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span
            key={d}
            style={{
              display: 'grid', placeItems: 'center', width: 17, height: 26,
              fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export interface MeterFaceProps {
  /** kWh on the register. Changing it turns the drums. */
  reading?: number;
  /** Which tariff tier the account is currently in. */
  tier?: TariffTier;
  /** Printed on the housing, the way a real meter carries its model. */
  model?: string;
}

/* ── MeterFace — the instrument as an object.

   Read head-on, because that is how a meter is read. The volume comes from a
   recessed register with its own rim shadow rather than from a 3D scene: an
   instrument does not need to be turned to be believed, it needs its window to
   sit *below* its face. */
export function MeterFace({ reading = 76542.8, tier = 2, model = 'NV-370 · 1PH 2W' }: MeterFaceProps) {
  const whole = Math.floor(reading);
  const digits = String(whole).padStart(5, '0').slice(-5).split('').map(Number);
  const fraction = Math.floor((reading - whole) * 10);

  return (
    <div
      style={{
        position: 'relative', width: '100%', maxWidth: 268,
        padding: 'var(--sp-4)',
        display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)',
        background: 'var(--surface-2)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--r-lg)',
        // contact then cast: weight, then height. Both fall straight down.
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-3)' }}>
          <bdi dir="ltr">kW·h</bdi>
        </span>
        {/* the tier seal — the same colour this tier carries everywhere else */}
        <span
          title={TIER[tier].ar}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 9px', borderRadius: 'var(--r-full)',
            background: TIER[tier].soft, color: 'var(--text-2)',
            fontSize: 11, fontWeight: 600,
          }}
        >
          <i style={{ width: 7, height: 7, borderRadius: '50%', background: TIER[tier].color }} />
          {TIER[tier].ar}
        </span>
      </div>

      {/* The register sits below the face. The inset rim is the occlusion the
          law asks for at a joint — it is what makes the window a window. */}
      <div
        dir="ltr"
        role="img"
        aria-label={`القراءة ${ar(reading, 1)} كيلوواط ساعة`}
        style={{
          display: 'flex', gap: 3, padding: '9px 10px',
          justifyContent: 'center',
          background: 'var(--ink)', borderRadius: 'var(--r-xs)',
          boxShadow: 'inset 0 2px 4px -1px var(--shadow-color), inset 0 0 0 1px var(--border-strong)',
        }}
      >
        {digits.map((d, i) => <Drum key={i} digit={d} />)}
        <Drum digit={fraction} fraction />
      </div>

      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--text-3)', textAlign: 'center' }}>
        <bdi dir="ltr">{model}</bdi>
      </span>
    </div>
  );
}

export interface ConsumptionBandProps {
  value?: number;
  usualMin?: number;
  usualMax?: number;
  max?: number;
  unit?: string;
}

/* ── ConsumptionBand — a reading against its own normal.

   A number alone is not information: 412 kWh means nothing until you know that
   this household usually lands between 260 and 380. The usual range is hatched
   because it is data (§11), and the verdict lights the card's edge only when
   the reading leaves it (§12). */
export function ConsumptionBand({
  value = 412, usualMin = 260, usualMax = 380, max = 520, unit = 'ك.و.س',
}: ConsumptionBandProps) {
  const pct = (n: number) => Math.min(100, Math.max(0, (n / max) * 100));
  const above = value > usualMax;
  const below = value < usualMin;
  const outside = above || below;
  const tone = above ? 'var(--danger)' : below ? 'var(--info)' : 'var(--success)';

  return (
    <div
      className={outside ? 'madar-leak' : undefined}
      style={{
        ...(outside ? { ['--madar-leak-color' as string]: tone } : null),
        position: 'relative', width: '100%', maxWidth: 340,
        display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
          <bdi dir="ltr">{ar(value)}</bdi>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-3)', marginInlineStart: 6 }}>{unit}</span>
        </b>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: tone }}>
          {above ? 'أعلى من معتادك' : below ? 'أقل من معتادك' : 'ضمن معتادك'}
        </span>
      </div>

      <div style={{ position: 'relative', height: 30 }}>
        <div
          style={{
            position: 'absolute', insetInline: 0, top: 11, height: 8,
            borderRadius: 'var(--r-full)', background: 'var(--surface-2)',
            border: '1px solid var(--border)', overflow: 'hidden',
          }}
        >
          {/* the usual range: hatched, because "where you normally sit" is
              information and a blank stretch of track says nothing */}
          <span
            className="madar-hatch"
            style={{
              position: 'absolute', insetBlock: 0,
              insetInlineStart: `${pct(usualMin)}%`,
              width: `${pct(usualMax) - pct(usualMin)}%`,
            }}
          />
        </div>

        {/* the reading itself, standing on the track */}
        <span
          style={{
            position: 'absolute', insetInlineStart: `calc(${pct(value)}% - 2px)`, top: 4,
            width: 4, height: 22, borderRadius: 2, background: tone,
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-3)' }}>
        <span>معتادك <bdi dir="ltr">{ar(usualMin)}–{ar(usualMax)}</bdi></span>
        <span><bdi dir="ltr">{ar(max)}</bdi> الحدّ</span>
      </div>
    </div>
  );
}

export interface UsageMetric {
  label: string;
  value: string;
  /** Signed change against the previous period, in percent. */
  delta?: number;
  trend?: number[];
}

/* ── UsageStrip — metrics separated by a rule, not boxed in cards.

   Five cards in a row is five containers claiming five groupings that do not
   exist. These readings belong to one period and one meter, so they share one
   surface and a hairline tells them apart. */
export function UsageStrip({ metrics }: { metrics?: UsageMetric[] }) {
  const rows: UsageMetric[] = metrics ?? [
    { label: 'استهلاك الشهر', value: '412 ك.و.س', delta: 8.4 },
    { label: 'الذروة اليومية', value: '3.1 ك.و', delta: -2.2 },
    { label: 'التكلفة التقديرية', value: '73.6 ر.س', delta: 11.9 },
    { label: 'آخر سبعة أيام', value: '', trend: [12, 18, 14, 22, 19, 27, 24] },
  ];

  return (
    <div
      style={{
        display: 'flex', flexWrap: 'wrap', width: '100%',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
      }}
    >
      {rows.map((m, i) => (
        <div
          key={m.label}
          style={{
            flex: '1 1 150px', minWidth: 0, padding: 'var(--sp-4) var(--sp-5)',
            // the divider is the whole layout: one hairline, no second box
            borderInlineStart: i === 0 ? 'none' : '1px solid var(--border)',
          }}
        >
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBlockEnd: 6 }}>{m.label}</div>
          {m.trend ? (
            <Sparkline points={m.trend} width={104} height={30} color="var(--accent)" />
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
                {m.value}
              </b>
              {m.delta !== undefined && (
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 600,
                    // more electricity is not good news, so a rise reads as warning
                    color: m.delta > 0 ? 'var(--danger)' : 'var(--success)',
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d={m.delta > 0 ? 'M6 10V2M2.5 5.5L6 2l3.5 3.5' : 'M6 2v8M2.5 6.5L6 10l3.5-3.5'}
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  <bdi dir="ltr">{Math.abs(m.delta).toFixed(1)}%</bdi>
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export interface TariffLadderProps {
  /** Consumption so far this cycle, in kWh. */
  used?: number;
  /** Upper bound of each tier, ascending. */
  steps?: number[];
}

/* ── TariffLadder — where the next kilowatt-hour starts costing more.

   The colours are the encoding from §13: tier three is amber here, in the
   meter's seal, and anywhere else a tier is named. Learn it once. */
export function TariffLadder({ used = 412, steps = [200, 400, 600, 900] }: TariffLadderProps) {
  const total = steps[steps.length - 1];
  const tierOf = (n: number) => (Math.min(steps.findIndex((s) => n <= s) + 1, 4) || 4) as TariffTier;
  const current = tierOf(used);
  const nextEdge = steps.find((s) => s > used);

  return (
    <div
      style={{
        width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{TIER[current].ar}</b>
        {nextEdge && (
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
            <bdi dir="ltr">{ar(nextEdge - used)}</bdi> ك.و.س حتى التالية
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 3, height: 12 }}>
        {steps.map((edge, i) => {
          const from = i === 0 ? 0 : steps[i - 1];
          const tier = (i + 1) as TariffTier;
          const fill = Math.min(1, Math.max(0, (used - from) / (edge - from)));
          return (
            <span
              key={edge}
              className="madar-hatch"
              title={`${TIER[tier].ar} — حتى ${ar(edge)}`}
              style={{
                position: 'relative', flex: `${edge - from} 1 0`,
                borderRadius: 'var(--r-full)', overflow: 'hidden',
                border: `1px solid ${tier === current ? TIER[tier].color : 'var(--border)'}`,
              }}
            >
              <span
                className="madar-fill"
                style={{
                  position: 'absolute', inset: 0, background: TIER[tier].color,
                  transform: `scaleX(${fill})`,
                  transition: `transform var(--dur-3) var(--ease-out)`,
                }}
              />
            </span>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)' }}>
        <span><bdi dir="ltr">0</bdi></span>
        <span><bdi dir="ltr">{ar(total)}</bdi> ك.و.س</span>
      </div>
    </div>
  );
}

/* ── A meter that is actually running, for the showcase and for tests: the
   register turns because consumption happened, not because a timer fired. */
export function useLiveReading(start = 76542.8, kwhPerTick = 0.1, ms = 1600) {
  const [reading, setReading] = useState(start);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    timer.current = window.setInterval(() => setReading((r) => Math.round((r + kwhPerTick) * 10) / 10), ms);
    return () => window.clearInterval(timer.current);
  }, [kwhPerTick, ms]);
  return reading;
}

/* ══════════════════════════════════════════════════════════════════════════
   Added after the fifth batch of visual feed — analysis and verdicts in
   design-system/VISUAL-ANALYSIS-05.md, law in VISUAL-LAW.md §14–§15.
══════════════════════════════════════════════════════════════════════════ */

export interface AllocationBarProps {
  /** kWh allocated for the cycle. */
  budget?: number;
  /** kWh already metered. */
  used?: number;
  /** kWh the current daily rate will still add before the cycle closes. */
  projected?: number;
  unit?: string;
}

/* ── AllocationBar — one bar, three parts, each part named.

   §15: hatching means "not a realised measurement". So the metered part is
   solid and the projection is hatched in the same hue — same quantity, one
   of them measured and one of them not — and what is left of the allocation
   is hatched in the neutral, because a remainder is data too (§11).

   The allocation edge is drawn as a reference line (§14) rather than assumed
   to be the end of the bar: when the projection runs past it the bar has to
   keep going, and a budget bar that silently rescales to hide an overshoot is
   the one thing this component exists to prevent. */
export function AllocationBar({
  budget = 500, used = 412, projected = 61, unit = 'ك.و.س',
}: AllocationBarProps) {
  const scale = Math.max(budget, used + projected);
  const free = Math.max(0, budget - used - projected);
  const over = used + projected > budget;
  const pct = (n: number) => `${(n / scale) * 100}%`;

  const parts = [
    { key: 'used', label: 'المستهلك', value: used, solid: true, color: 'var(--accent)' },
    {
      key: 'projected', label: 'المتوقّع حتى نهاية الدورة', value: projected,
      solid: false, color: over ? 'var(--danger)' : 'var(--accent)',
    },
    { key: 'free', label: 'المتبقّي من المخصّص', value: free, solid: false, color: 'var(--border)' },
  ].filter((p) => p.value > 0);

  /* backgroundColor, never the `background` shorthand: the shorthand resets
     background-image, and inline styles outrank the class, so it would erase
     the very hatch the segment is being given. */
  const swatch = (p: (typeof parts)[number]) => ({
    backgroundColor: p.solid ? p.color : 'var(--surface-2)',
    ...(p.solid ? null : { ['--madar-hatch-color' as string]: p.color }),
  });

  return (
    <div
      style={{
        width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>مخصّص الدورة</b>
        <span style={{ fontSize: 12, fontWeight: 600, color: over ? 'var(--danger)' : 'var(--text-3)' }}>
          {over
            ? <>متوقّع تجاوزه بـ<bdi dir="ltr"> {ar(used + projected - budget)} </bdi>{unit}</>
            : <><bdi dir="ltr">{ar(budget)}</bdi> {unit}</>}
        </span>
      </div>

      <div style={{ position: 'relative', paddingBlockStart: 16 }}>
        <div
          data-allocation=""
          style={{
            position: 'relative', display: 'flex', height: 14, gap: 2,
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-full)', overflow: 'hidden',
          }}
        >
          {parts.map((p) => (
            <span
              key={p.key}
              data-part={p.key}
              className={p.solid ? undefined : 'madar-hatch'}
              title={`${p.label} — ${ar(p.value)} ${unit}`}
              style={{ width: pct(p.value), ...swatch(p) }}
            />
          ))}
        </div>

        {/* the allocation itself, drawn on the same scale as the bar */}
        {over && (
          <>
            <span
              data-budget-edge="" aria-hidden="true"
              style={{
                position: 'absolute', insetInlineStart: pct(budget), top: 12, bottom: -4,
                borderInlineStart: '1px dashed var(--border-strong)',
              }}
            />
            {/* the chip hangs on the allocated side of its own line, so it
                stays inside the card at any overshoot and mirrors with dir */}
            <span
              data-budget-chip=""
              style={{
                position: 'absolute', insetInlineEnd: `calc(100% - ${pct(budget)})`, top: 0,
                padding: '0 7px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-full)', fontSize: 10.5, fontWeight: 600, color: 'var(--text-2)',
                whiteSpace: 'nowrap',
              }}
            >
              المخصّص
            </span>
          </>
        )}
      </div>

      {/* the legend repeats each part's own treatment, so the reading never
          rests on colour alone and the two hatches stay tellable apart */}
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 7 }}>
        {parts.map((p) => (
          <li key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12 }}>
            <span
              data-swatch={p.key}
              className={p.solid ? undefined : 'madar-hatch'}
              aria-hidden="true"
              style={{
                width: 16, height: 11, borderRadius: 3, flex: 'none',
                border: '1px solid var(--border)', ...swatch(p),
              }}
            />
            <span style={{ flex: 1, color: 'var(--text-2)' }}>{p.label}</span>
            <b style={{ fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
              <bdi dir="ltr">{ar(p.value)}</bdi>
            </b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface LoadRow {
  label: string;
  kwh: number;
  /** The leftover bucket. It is the absence of a category, not one of them, so
      it takes the neutral: a hue here would spend one of the taxonomy's
      colours on "everything else", and the red end of the categorical scale
      would collide with the verdict red used elsewhere on the same screen. */
  other?: boolean;
}

/* ── LoadComb — a quantity made of countable units, drawn countable.

   §15. A 96px bar says "more than that one". Nineteen ticks at ten kilowatt-
   hours each say "one hundred and ninety", and the eye can check it. The last
   tick of a row is short when the unit is not whole, because the remainder is
   part of the reading rather than a rounding the drawing hides.

   The category colours are `CATEGORICAL` from dataviz.tsx — the palette that
   was already validated for contrast and colour-blindness. A second palette
   invented here would be a second language for the same job. */
export function LoadComb({ rows, unit = 10, cap = 'ك.و.س' }: { rows?: LoadRow[]; unit?: number; cap?: string }) {
  const loads: LoadRow[] = rows ?? [
    { label: 'التكييف', kwh: 186 },
    { label: 'سخّان الماء', kwh: 84 },
    { label: 'الأجهزة', kwh: 62 },
    { label: 'الإضاءة', kwh: 46 },
    { label: 'أخرى', kwh: 34, other: true },
  ];
  const total = loads.reduce((s, r) => s + r.kwh, 0);

  return (
    <div
      style={{
        width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>أين ذهبت الكهرباء</b>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
          <bdi dir="ltr">{ar(total)}</bdi> {cap}
        </span>
      </div>

      <div style={{ display: 'grid', gap: 'var(--sp-3)' }}>
        {loads.map((r, i) => {
          const units = r.kwh / unit;
          const whole = Math.floor(units);
          const rest = units - whole;
          const color = r.other ? 'var(--border-strong)' : CATEGORICAL[i % CATEGORICAL.length];
          return (
            <div key={r.label} style={{ display: 'grid', gap: 5 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{r.label}</span>
                <b style={{ fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
                  <bdi dir="ltr">{ar(r.kwh)}</bdi>
                </b>
              </div>
              <div
                data-comb={r.label}
                role="img"
                aria-label={`${r.label} ${ar(r.kwh)} ${cap}`}
                style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 20 }}
              >
                {Array.from({ length: whole + (rest > 0 ? 1 : 0) }, (_, t) => {
                  const partial = t === whole;
                  return (
                    <span
                      key={t}
                      style={{
                        width: 3, borderRadius: 1.5, flex: 'none',
                        // a partial unit is drawn partial: the reading is not rounded to fit
                        height: partial ? Math.max(6, Math.round(20 * rest)) : 20,
                        background: color, opacity: partial ? 0.55 : 1,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ margin: 0, fontSize: 11, color: 'var(--text-3)' }}>
        كل شرطة <bdi dir="ltr">{ar(unit)}</bdi> {cap} — والشرطة القصيرة جزء من وحدة
      </p>
    </div>
  );
}

export interface BillDocumentProps {
  /** Register reading that opened the cycle. */
  previous?: number;
  /** Register reading that closed it. */
  current?: number;
  /** Upper bound of each tier, ascending. */
  steps?: number[];
  /** Price per kWh inside each tier, same order as `steps`. */
  rates?: number[];
  cycle?: string;
  due?: string;
  paid?: boolean;
  account?: string;
  currency?: string;
}

/* ── BillDocument — the cycle as the object the customer actually receives.

   A bill is a document, so it is drawn as one: paper with an edge, a second
   sheet behind it carrying the thickness (§1), light straight overhead so it
   survives mirroring (§2), and contact plus cast shadow falling down (§3).

   The perforation is the detail, and it lives at the joint (§5). Its meaning is
   an affordance — *this part detaches* — so it renders only when there is a stub
   to tear off, which is what keeps it a statement rather than an ornament (§8).
   A settled bill has nothing to detach: the sheet is whole and carries a mark.
   The notches are structure, not a measure — unlike the comb above, their count
   is not a reading and does not pretend to be.

   Colour is the tier encoding and the amount's state, nothing else. The paper is
   neutral material (§9). */
export function BillDocument({
  previous = 76130.4,
  current = 76542.8,
  steps = [200, 400, 600, 900],
  rates = [0.18, 0.24, 0.3, 0.38],
  cycle = '1 يوليو – 31 يوليو',
  due = '15 أغسطس',
  paid = false,
  account = 'NV-4419-2207',
  currency = 'ر.س',
}: BillDocumentProps) {
  const used = Math.max(0, Math.round((current - previous) * 10) / 10);

  /* The tiers apply to the cycle's running total, so the split is this cycle's
     consumption measured against the step edges — not a flat rate dressed up. */
  const lines = steps
    .map((edge, i) => {
      const from = i === 0 ? 0 : steps[i - 1];
      const kwh = Math.max(0, Math.min(used, edge) - from);
      return { tier: (i + 1) as TariffTier, from, edge, kwh, rate: rates[i], cost: kwh * rates[i] };
    })
    .filter((l) => l.kwh > 0);
  const total = lines.reduce((s, l) => s + l.cost, 0);

  const Row = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)', fontSize: strong ? 13 : 12.5 }}>
      <span style={{ color: strong ? 'var(--text)' : 'var(--text-2)', fontWeight: strong ? 600 : 400 }}>{label}</span>
      <b style={{ fontWeight: strong ? 700 : 600, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
        <bdi dir="ltr">{value}</bdi>
      </b>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      {/* the sheet underneath: this is the thickness, and its angle is placed
          rather than computed — an even offset reads as a duplicate layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, transform: 'translateY(6px) rotate(-0.8deg)',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',        }}
      />

      <article
        data-bill={paid ? 'settled' : 'due'}
        style={{
          position: 'relative',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          // contact then cast, both straight down
        }}
      >
        <div style={{ padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>فاتورة الكهرباء</div>
              {/* Arabic prose that opens with a numeral. In an LTR container the
                  leading digit drags to the end, so the run needs its own
                  direction — bdi with auto detection, which finds the first
                  strong character rather than trusting the container. */}
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBlockStart: 3 }}>
                <bdi>{cycle}</bdi>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>
              <bdi dir="ltr">{account}</bdi>
            </span>
          </div>

          {/* the consumption is a subtraction, and a bill shows its working */}
          <div style={{ display: 'grid', gap: 6, paddingBlock: 'var(--sp-3)', borderBlock: '1px solid var(--border)' }}>
            <Row label="القراءة السابقة" value={ar(previous, 1)} />
            <Row label="القراءة الحالية" value={ar(current, 1)} />
            <Row label="الاستهلاك — ك.و.س" value={ar(used, 1)} strong />
          </div>

          <div style={{ display: 'grid', gap: 7 }}>
            {lines.map((l) => (
              <div key={l.tier} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12 }}>
                <i
                  title={TIER[l.tier].ar}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: TIER[l.tier].color, flex: 'none' }}
                />
                <span style={{ color: 'var(--text-2)' }}>{TIER[l.tier].ar}</span>
                <span style={{ flex: 1, fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
                  <bdi dir="ltr">{ar(l.kwh, 1)} × {l.rate.toFixed(2)}</bdi>
                </span>
                <b style={{ fontWeight: 600, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
                  <bdi dir="ltr">{ar(l.cost, 2)}</bdi>
                </b>
              </div>
            ))}
          </div>
        </div>

        {/* The joint. It is here because something detaches here — a settled bill
            has no stub, so it has no perforation either. */}
        {!paid && (
          <>
            <div
              data-perforation=""
              aria-hidden="true"
              style={{
                position: 'relative', display: 'flex', justifyContent: 'space-between',
                paddingInline: 10, borderBlockStart: '1px solid var(--border)',
              }}
            >
              {Array.from({ length: 26 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    width: 5, height: 5, marginBlockStart: -3, borderRadius: '50%',
                    background: 'var(--surface-2)',
                    boxShadow: 'inset 0 1px 1.5px var(--shadow-color)',
                  }}
                />
              ))}
            </div>

            <div
              data-stub=""
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)',
                padding: 'var(--sp-4) var(--sp-5) var(--sp-5)',
              }}
            >
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>المستحقّ</div>
                <b style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>
                  <bdi dir="ltr">{ar(total, 2)}</bdi>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-3)', marginInlineStart: 5 }}>{currency}</span>
                </b>
              </div>
              <span
                style={{
                  padding: '4px 10px', borderRadius: 'var(--r-full)', fontSize: 11.5, fontWeight: 600,
                  color: 'var(--text)', border: `1px solid var(--warning)`,
                }}
              >
                يُسدَّد قبل {due}
              </span>
            </div>
          </>
        )}

        {paid && (
          <div
            data-settled=""
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)',
              padding: 'var(--sp-4) var(--sp-5) var(--sp-5)', borderBlockStart: '1px solid var(--border)',
            }}
          >
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>سُدِّدت</div>
              <b style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums' }}>
                <bdi dir="ltr">{ar(total, 2)}</bdi>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-3)', marginInlineStart: 5 }}>{currency}</span>
              </b>
            </div>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                borderRadius: 'var(--r-full)', fontSize: 11.5, fontWeight: 600,
                color: 'var(--text)', border: '1px solid var(--success)',
              }}
            >
              {/* anti-slop-ui #25: no checkmark to say "yes". The word says it,
                  and the outline colour is the state. */}
              مُسدَّدة
            </span>
          </div>
        )}
      </article>
    </div>
  );
}
