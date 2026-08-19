import { useMemo, useRef, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Schedule — the day as an axis, and the windows that price it.

   Built under the constraints the owner ruled in from `anti-slop-ui`: no drop
   shadow, radius capped at 6px, solid surfaces. That removes the two easiest
   ways to make a thing read as a thing, so everything here gets its form from
   the three the amended VISUAL-LAW §1 leaves standing:

     · a hairline that says where the object ends,
     · an inset at a joint — the current hour sits *in* the strip, not on it,
     · overlap — the reference line and the selection cross the hours.

   And it is bound to the law it inherits:
   §11/§15  the hours are counted, and the unit is declared. What has not
            happened yet is hatched, because a future hour is not a reading.
   §13      three periods, three fixed colours, and the costly ones are the only
            coloured ones — an off-peak hour is neutral because nothing is
            being reported about it.
   §14      "now" is drawn on the same axis as the data, dashed and neutral,
            carrying its own value.
   §16      the clock's numerals are bare readings, so they are forced LTR;
            the labels are prose and are left to the container.

   Four existing pieces were checked and deliberately not reused, because each
   does a different job rather than a similar one: `RangeBar` (feedback.tsx) is a
   single span between two labelled ends with no axis beneath it; `RangeSlider`
   (essentials.tsx) picks two numbers on a continuous scale, not discrete hours
   with meaning attached; `TimeField` (content.tsx) reads one clock time; and
   `Heatmap` (dataviz.tsx) shades a grid by magnitude, where these windows carry
   a taxonomy instead. `Gauge`, `MeterDial` and `ProgressCircle` are all
   single-value arcs, which is why the clock below is not one of them.
──────────────────────────────────────────────────────────────────────── */

export type Period = 'off' | 'shoulder' | 'peak';

/* The encoding. Only the periods that cost something carry a hue: an off-peak
   hour is neutral because there is nothing to report about it (§9, §13). */
const PERIOD: Record<Period, { color: string; soft: string; ar: string }> = {
  off: { color: 'var(--border-strong)', soft: 'var(--surface-2)', ar: 'خارج الذروة' },
  shoulder: { color: 'var(--warning)', soft: 'var(--warning-soft)', ar: 'كتف الذروة' },
  peak: { color: 'var(--danger)', soft: 'var(--danger-soft)', ar: 'الذروة' },
};

/** Default time-of-use plan: quiet night, shoulders either side, afternoon peak. */
export const DEFAULT_PLAN: Period[] = [
  ...Array<Period>(6).fill('off'),        // 00–05
  ...Array<Period>(3).fill('shoulder'),   // 06–08
  ...Array<Period>(4).fill('off'),        // 09–12
  ...Array<Period>(5).fill('peak'),       // 13–17
  ...Array<Period>(4).fill('shoulder'),   // 18–21
  ...Array<Period>(2).fill('off'),        // 22–23
];

const hh = (h: number) => `${String(Math.floor(h) % 24).padStart(2, '0')}:00`;

export interface DayStripProps {
  /** One period per hour, 24 long. */
  plan?: Period[];
  /** The current hour as a fraction, so the reference line lands between hours. */
  now?: number;
  /** Inclusive start and exclusive end of a chosen window, in hours. */
  selection?: [number, number] | null;
  onPick?: (hour: number) => void;
  /** Printed under the strip: without it the count is texture, not a unit. */
  unitNote?: string;
}

/* ── DayStrip — twenty-four hours, counted, and priced.

   A day drawn as one long bar answers "how much"; twenty-four cells answer
   "when", and the reader can point at an hour. The strip is the axis every
   other component here shares. */
export function DayStrip({
  plan = DEFAULT_PLAN,
  now = 14.4,
  selection = null,
  onPick,
  unitNote = 'كل خانة ساعة واحدة — والمخطَّط منها لم يحدث بعد',
}: DayStripProps) {
  const hours = plan.slice(0, 24);
  const inSelection = (h: number) => Boolean(selection && h >= selection[0] && h < selection[1]);

  /* One tab stop for the whole axis, and the arrows walk it. Twenty-four stops in
     a row is reachable but hostile: the strip is one control with many cells, so
     it behaves like one — a roving tabindex, the way a toolbar does. The arrows
     follow the writing direction, because on a mirrored axis "next hour" is to the
     left and the key that means "next" has to agree. */
  const [focus, setFocus] = useState(Math.floor(now) % 24);
  const track = useRef<HTMLDivElement>(null);
  const step = (delta: number) => {
    const next = Math.min(23, Math.max(0, focus + delta));
    setFocus(next);
    track.current?.querySelector<HTMLButtonElement>(`[data-hour="${next}"]`)?.focus();
  };
  const onKey = (event: React.KeyboardEvent) => {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    const moves: Record<string, number> = { [forward]: 1, [back]: -1, Home: -24, End: 24 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    step(moves[event.key]);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
      <div
        role="group"
        aria-label={`اليوم على أربع وعشرين ساعة، والوقت الآن ${hh(now)}`}
        style={{ position: 'relative', paddingBlockStart: 18 }}
      >
        <div
          data-day-strip=""
          ref={track}
          onKeyDown={onKey}
          style={{
            position: 'relative', display: 'flex', height: 40,
            background: 'var(--surface-2)',
            border: '1px solid var(--border)', borderRadius: 'var(--r-xs)',
            overflow: 'hidden',
          }}
        >
          {hours.map((period, h) => {
            const future = h >= now;
            const current = h === Math.floor(now);
            const picked = inSelection(h);
            return (
              <button
                key={h}
                type="button"
                data-hour={h}
                data-period={period}
                aria-label={`${hh(h)} — ${PERIOD[period].ar}`}
                aria-pressed={picked}
                tabIndex={h === focus ? 0 : -1}
                onFocus={() => setFocus(h)}
                onClick={onPick ? () => onPick(h) : undefined}
                className={future ? 'madar-hatch' : undefined}
                style={{
                  flex: 1, minWidth: 0, padding: 0, border: 'none',
                  // the divider is the whole grid: one hairline per joint
                  borderInlineStart: h === 0 ? 'none' : '1px solid var(--border)',
                  // backgroundColor, never the shorthand: `background` resets
                  // background-image, and that is what erases the hatch this
                  // class was given. Made this mistake once before in
                  // AllocationBar; gated now rather than remembered.
                  backgroundColor: future ? 'transparent' : PERIOD[period].soft,
                  ...(future ? { ['--madar-hatch-color' as string]: PERIOD[period].color } : null),
                  // the current hour sits *in* the strip: an inset at the joint is
                  // the only depth left after the shadows went (§1, amended)
                  boxShadow: current ? 'inset 0 0 0 1px var(--border-strong)' : undefined,
                  cursor: onPick ? 'pointer' : 'default',
                  transition: 'background var(--dur-2) var(--ease-out)',
                }}
              >
                {picked && (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'block', height: '100%',
                      background: PERIOD[period].color, opacity: 0.85,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* now, on the hours' own scale — a construction line, not a series */}
        <span
          data-now-line=""
          aria-hidden="true"
          style={{
            position: 'absolute', top: 14, bottom: -4,
            insetInlineStart: `${(now / 24) * 100}%`,
            borderInlineStart: '1px dashed var(--border-strong)',
          }}
        />
        <span
          data-now-chip=""
          style={{
            position: 'absolute', top: 0, insetInlineEnd: `calc(100% - ${(now / 24) * 100}%)`,
            padding: '0 7px', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 'var(--r-full)',
            fontSize: 10.5, fontWeight: 600, color: 'var(--text-2)',
            fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
          }}
        >
          <bdi dir="ltr">{hh(now)}</bdi>
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
        {[0, 6, 12, 18, 24].map((h) => <span key={h}><bdi dir="ltr">{hh(h)}</bdi></span>)}
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
        {(Object.keys(PERIOD) as Period[]).map((p) => (
          <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--text-2)' }}>
            <span
              data-legend={p}
              aria-hidden="true"
              style={{
                width: 16, height: 10, borderRadius: 2, flex: 'none',
                background: PERIOD[p].soft, border: `1px solid ${PERIOD[p].color}`,
              }}
            />
            {PERIOD[p].ar}
          </li>
        ))}
      </ul>

      <p style={{ margin: 0, fontSize: 11, color: 'var(--text-3)' }}>{unitNote}</p>
    </div>
  );
}

export interface WindowPickerProps {
  plan?: Period[];
  now?: number;
  /** Cost per kWh inside each period, so a choice can be priced. */
  rates?: Record<Period, number>;
  load?: number;
  currency?: string;
}

/* ── WindowPicker — choosing when, and being told what it costs.

   It renders the strip rather than a second copy of the geometry: one axis, two
   behaviours. Clicking sets the start, clicking again closes the window, and the
   readout prices it hour by hour through the plan — so the answer to "run it at
   night?" is a number and not a feeling. */
export function WindowPicker({
  plan = DEFAULT_PLAN,
  now = 14.4,
  rates = { off: 0.18, shoulder: 0.26, peak: 0.38 },
  load = 2.4,
  currency = 'ر.س',
}: WindowPickerProps) {
  const [range, setRange] = useState<[number, number] | null>([13, 17]);
  const [anchor, setAnchor] = useState<number | null>(null);

  const pick = (h: number) => {
    if (anchor === null) { setAnchor(h); setRange([h, h + 1]); return; }
    const [a, b] = anchor <= h ? [anchor, h + 1] : [h, anchor + 1];
    setRange([a, b]);
    setAnchor(null);
  };

  const priced = useMemo(() => {
    if (!range) return null;
    const spans = plan.slice(range[0], range[1]);
    const cost = spans.reduce((s, p) => s + rates[p] * load, 0);
    const worst = spans.includes('peak') ? 'peak' : spans.includes('shoulder') ? 'shoulder' : 'off';
    return { hours: spans.length, cost, worst: worst as Period };
  }, [range, plan, rates, load]);

  const cheapest = useMemo(() => {
    /* The cheapest window of the same length, so the price has something to be
       measured against rather than standing alone (§14 in prose form). */
    if (!range) return null;
    const width = range[1] - range[0];
    let best = { at: 0, cost: Infinity };
    for (let start = 0; start + width <= 24; start += 1) {
      const cost = plan.slice(start, start + width).reduce((s, p) => s + rates[p] * load, 0);
      if (cost < best.cost) best = { at: start, cost };
    }
    return best;
  }, [range, plan, rates, load]);

  return (
    <div
      style={{
        width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>متى تشغّله</b>
        {range && (
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
            <bdi dir="ltr">{hh(range[0])} – {hh(range[1])}</bdi>
          </span>
        )}
      </div>

      <DayStrip plan={plan} now={now} selection={range} onPick={pick} unitNote="اضغط ساعة البداية ثم ساعة النهاية" />

      {priced && cheapest && (
        <div style={{ display: 'grid', gap: 7, paddingBlockStart: 'var(--sp-3)', borderBlockStart: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)', fontSize: 12.5 }}>
            <span style={{ color: 'var(--text-2)' }}>
              {priced.hours === 1 ? 'ساعة واحدة' : <><bdi dir="ltr">{priced.hours}</bdi> ساعات</>} في {PERIOD[priced.worst].ar}
            </span>
            <b
              data-window-cost=""
              style={{ fontWeight: 700, color: PERIOD[priced.worst].color, fontVariantNumeric: 'tabular-nums' }}
            >
              <bdi dir="ltr">{priced.cost.toFixed(2)}</bdi> {currency}
            </b>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)', fontSize: 11.5, color: 'var(--text-3)' }}>
            <span>أرخص نافذة بالطول نفسه تبدأ <bdi dir="ltr">{hh(cheapest.at)}</bdi></span>
            <span data-window-best="" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <bdi dir="ltr">{cheapest.cost.toFixed(2)}</bdi> {currency}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export interface TariffClockProps {
  plan?: Period[];
  now?: number;
  size?: number;
}

/* ── TariffClock — the same day, closed into a circle.

   A day is a cycle, and a strip cuts it at midnight. On a dial the peak sits
   opposite the quiet hours and the shape of a plan is legible at a glance. Drawn
   with strokes rather than fills, so it survives a system with no shadows: the
   ring's thickness is the object, and the hand crossing it is the overlap.

   The hours still not lived are stroked through a hatch pattern rather than
   painted, which is the same statement §15 makes on the strip. */
export function TariffClock({ plan = DEFAULT_PLAN, now = 14.4, size = 200 }: TariffClockProps) {
  const r = size / 2 - 16;
  const c = size / 2;
  const point = (hour: number, radius = r) => {
    const a = ((hour / 24) * 360 - 90) * (Math.PI / 180);
    return [c + radius * Math.cos(a), c + radius * Math.sin(a)];
  };
  const arc = (from: number, to: number) => {
    const [x1, y1] = point(from);
    const [x2, y2] = point(to);
    const large = to - from > 12 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  /* Consecutive hours of one period become one arc: twenty-four separate strokes
     would draw the axis, not the plan. */
  const bands = useMemo(() => {
    const out: { from: number; to: number; period: Period }[] = [];
    plan.slice(0, 24).forEach((period, h) => {
      const last = out[out.length - 1];
      if (last && last.period === period) last.to = h + 1;
      else out.push({ from: h, to: h + 1, period });
    });
    return out;
  }, [plan]);

  const [hx, hy] = point(now, r + 6);
  const [ix, iy] = point(now, r - 10);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`خطّة اليوم على مدار الساعة، والوقت الآن ${hh(now)}`}>
        <defs>
          {/* hard stops, one token colour: structure, not a wash */}
          <pattern id="madar-clock-hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--border-strong)" strokeWidth="1" />
          </pattern>
        </defs>

        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--border)" strokeWidth="14" />

        {bands.map((b) => (
          <path
            key={`${b.from}-${b.period}`}
            data-band={b.period}
            d={arc(b.from, b.to)}
            fill="none"
            stroke={b.from >= now ? 'url(#madar-clock-hatch)' : PERIOD[b.period].color}
            strokeWidth="14"
            strokeLinecap="butt"
            opacity={b.period === 'off' && b.from < now ? 0.55 : 1}
          />
        ))}

        {/* every sixth hour gets a tick, so the ring can be read as a clock */}
        {[0, 6, 12, 18].map((h) => {
          const [x1, y1] = point(h, r - 9);
          const [x2, y2] = point(h, r + 9);
          return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--surface)" strokeWidth="2" />;
        })}

        <line data-hand="" x1={ix} y1={iy} x2={hx} y2={hy} stroke="var(--text)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>
            <bdi dir="ltr">{hh(now)}</bdi>
          </div>
          <div style={{ fontSize: 11, color: PERIOD[plan[Math.floor(now) % 24]].color, fontWeight: 600 }}>
            {PERIOD[plan[Math.floor(now) % 24]].ar}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Added after the sixth batch of visual feed — analysis and verdicts in
   design-system/VISUAL-ANALYSIS-06.md, law in VISUAL-LAW.md §17–§18.
══════════════════════════════════════════════════════════════════════════ */

export type Level = 'high' | 'low';

export interface Run {
  /** Hour the run started, as a fraction of the day. */
  from: number;
  /** Hour it stopped. */
  to: number;
  level: Level;
  /** True when the run began before this window opened. */
  clipped?: boolean;
}

const LEVEL: Record<Level, { color: string; ar: string; top: number; height: number }> = {
  // the vertical offset *is* the encoding: high sits high, low sits low (§17)
  high: { color: 'var(--accent)', ar: 'حمل كامل', top: 6, height: 20 },
  low: { color: 'var(--info)', ar: 'حمل منخفض', top: 30, height: 14 },
};

/** A run this short is not a duty cycle, it is a symptom. */
const SHORT = 0.34;
/** Three or more of them in a row is the fault worth naming. */
const CLUSTER = 3;

export interface DutyCycleProps {
  runs?: Run[];
  /** Hours spanned by the window, so widths are read against a known scale. */
  span?: [number, number];
  label?: string;
}

/* ── DutyCycle — how a machine actually ran.

   §17: the length of a mark is a duration and its vertical offset is a state.
   Bars answer "how much in each hour"; this answers "how it ran" — one long
   block is a machine that settled, and a picket fence of short ones is a machine
   that could not.

   So the fault is a *shape*, not a threshold: three or more runs shorter than
   twenty minutes back to back are drawn as the cluster of hairlines they are, and
   named. That is the same claim §8 makes — a detail earns its place by carrying a
   state — except here the state is legible before the label is read.

   A run that began before the window opened is cut square on its leading edge
   instead of rounded. An edge that says "this continues past me" is information;
   fading it out would be atmosphere. */
export function DutyCycle({
  runs,
  span = [20, 6],
  label = 'المكيّف — الليلة الماضية',
}: DutyCycleProps) {
  const cycles: Run[] = runs ?? [
    { from: 20, to: 21.4, level: 'high', clipped: true },
    { from: 21.6, to: 22.1, level: 'low' },
    { from: 22.3, to: 23.9, level: 'high' },
    { from: 24.1, to: 24.35, level: 'high' },
    { from: 24.45, to: 24.7, level: 'high' },
    { from: 24.8, to: 25.05, level: 'high' },
    { from: 25.2, to: 26.6, level: 'low' },
    { from: 26.9, to: 28.4, level: 'high' },
    { from: 28.7, to: 30, level: 'low' },
  ];

  /* Widths are fractions of the window, not of the day: a six-hour window drawn
     on a twenty-four-hour scale would make every run unreadable. */
  const [open, close] = [span[0], span[1] <= span[0] ? span[1] + 24 : span[1]];
  const width = close - open;
  const pct = (h: number) => ((h - open) / width) * 100;

  const shortRuns = cycles.filter((r) => r.to - r.from < SHORT);
  const faulted = useMemo(() => {
    let run = 0;
    for (const c of cycles) {
      run = c.to - c.from < SHORT ? run + 1 : 0;
      if (run >= CLUSTER) return true;
    }
    return false;
  }, [cycles]);

  const total = cycles.reduce((s, r) => s + (r.to - r.from), 0);

  return (
    <div
      style={{
        width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{label}</b>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
          اشتغل <bdi dir="ltr">{total.toFixed(1)}</bdi> من <bdi dir="ltr">{width}</bdi> ساعة
        </span>
      </div>

      <div
        data-duty=""
        role="img"
        aria-label={`${label}: ${cycles.length} دورة تشغيل، مجموعها ${total.toFixed(1)} ساعة${faulted ? '، وفيها تشغيل متقطّع قصير' : ''}`}
        style={{
          position: 'relative', height: 50,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-xs)', overflow: 'hidden',
        }}
      >
        {cycles.map((r, i) => {
          const short = r.to - r.from < SHORT;
          const l = LEVEL[r.level];
          return (
            <span
              key={i}
              data-run={short ? 'short' : r.level}
              title={`${hh(r.from)} – ${hh(r.to)} · ${l.ar}`}
              style={{
                position: 'absolute',
                insetInlineStart: `${pct(r.from)}%`,
                width: `max(2px, ${pct(r.to) - pct(r.from)}%)`,
                top: short ? 4 : l.top,
                height: short ? 42 : l.height,
                background: short ? 'var(--danger)' : l.color,
                // A clipped start is cut square, and "start" is a logical side: in
                // Arabic the run begins at the right, so a physical corner list
                // would cut the wrong end. Same class of mistake as §2's lighting.
                borderRadius: 2,
                ...(r.clipped ? { borderStartStartRadius: 0, borderEndStartRadius: 0 } : null),
                opacity: short ? 0.9 : 1,
              }}
            />
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <span key={f}><bdi dir="ltr">{hh(open + f * width)}</bdi></span>
        ))}
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', fontSize: 11.5 }}>
        {(Object.keys(LEVEL) as Level[]).map((k) => (
          <li key={k} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-2)' }}>
            <span
              data-legend-level={k}
              aria-hidden="true"
              style={{ width: 16, height: k === 'high' ? 9 : 6, borderRadius: 2, background: LEVEL[k].color, flex: 'none' }}
            />
            {LEVEL[k].ar}
          </li>
        ))}
      </ul>

      {/* the fault is a shape first; the sentence only names what is already visible */}
      {faulted && (
        <p
          data-duty-fault=""
          style={{
            margin: 0, paddingBlockStart: 'var(--sp-3)', borderBlockStart: '1px solid var(--border)',
            fontSize: 12, lineHeight: 1.6, color: 'var(--text-2)',
          }}
        >
          <b style={{ color: 'var(--danger)', fontWeight: 600 }}>تشغيل متقطّع قصير</b>{' '}
          — <bdi dir="ltr">{shortRuns.length}</bdi> دورات أقصر من عشرين دقيقة متتالية. المكيّف يبدأ ويتوقّف
          قبل أن يبرّد، وهذا يستهلك أكثر من التشغيل المتّصل ويُتلف الضاغط.
        </p>
      )}
    </div>
  );
}
