import { useEffect, useRef, useState } from 'react';
import { Sparkline } from './charts';

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
        boxShadow: '0 2px 3px -1px var(--shadow-color), 0 12px 22px -10px var(--shadow-color)',
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
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-1)',
      }}
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
            boxShadow: '0 1px 2px var(--shadow-color)',
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
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-1)', overflow: 'hidden',
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
        border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-1)',
      }}
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
