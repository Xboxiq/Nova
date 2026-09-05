import { useId, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { move, n } from './roving';

/* ────────────────────────────────────────────────────────────────────────
   Prepaid — the balance read as time, against the day you can next top up.

   The roadmap's third round asked "كم يكفيني الرصيد؟" and warned the answer is
   §14 in a new shape: a reading measured to a reference that is *your own
   rate*. Divide the balance by an average and you get "4.3 days", which is
   wrong twice — the days are not equal (a weekend at home draws half again
   as much as a weekday), and "4.3 days" still leaves the real question to
   mental arithmetic: does it last until I can pay?

   So the axis is kilowatt-hours, and each day is a cell as WIDE as that day
   usually draws (§15: a counted quantity, drawn counted, in unequal units).
   The balance is one solid length from the start; where it ends is where the
   lights go out, and it lands on a named day at a time of day, derived. The
   top-up day is a marker on the same axis — the only control here — and the
   verdict is the intersection (§19): a balance that ends before the marker
   leaves a hatched gap whose LENGTH IS THE SHORTFALL, in danger colour, and
   the card's edge leaks. Move the marker to an earlier day and the gap
   closes, the leak goes out, and nothing is announced twice: the slider's
   own value text carries the verdict, so there is no live region to shut up.

   Checked before writing it, and not reused:
   · `ConsumptionBand` (energy.tsx) is a reading against a hatched usual
     range on a fixed scale; here the scale itself is made of days.
   · `DayStrip` (schedule.tsx) is 24 equal hours picked as a window; these
     cells are unequal by design and the pick is a single boundary.
   · `TariffLadder` is where the *price* changes along a length; nothing
     here changes price.
   · `LoadComb` draws counted units of one size; a comb with teeth of
     different widths is a different instrument, and this is it.

   Tokens only. Direction is read from the element at the keystroke (§33), so
   a specimen in `dir="ltr"` inside an Arabic page steps the right way.
──────────────────────────────────────────────────────────────────────── */

export interface RunwayDay {
  /** Short weekday name, as it should read under the axis. */
  label: string;
  /** What this household usually draws on that day, in the axis unit. */
  usual: number;
}

export interface PrepaidRunwayProps {
  /** Balance remaining, in `unit`. */
  balance?: number;
  /** The coming days in order. Defaults to ten days from Thursday, weekends heavier. */
  days?: RunwayDay[];
  /** Index of the first day a top-up is possible, 1..days.length. `days.length` means after the axis. */
  topUp?: number;
  unit?: string;
  onTopUpChange?: (index: number) => void;
}

const WEEK: RunwayDay[] = [
  { label: 'خميس', usual: 12 }, { label: 'جمعة', usual: 17 }, { label: 'سبت', usual: 16 },
  { label: 'أحد', usual: 11 }, { label: 'اثنين', usual: 11 }, { label: 'ثلاثاء', usual: 12 }, { label: 'أربعاء', usual: 11 },
  { label: 'خميس', usual: 12 }, { label: 'جمعة', usual: 17 }, { label: 'سبت', usual: 16 },
];

const timeOfDay = (f: number) => (f < 0.34 ? 'صباحًا' : f < 0.67 ? 'ظهرًا' : 'مساءً');

export function PrepaidRunway({
  balance = 58, days = WEEK, topUp: initial = 5, unit = 'ك.و.س', onTopUpChange,
}: PrepaidRunwayProps) {
  const clamp = (i: number) => Math.min(days.length, Math.max(1, i));
  const [topUp, setTopUp] = useState(() => clamp(initial));
  const id = useId();

  /* starts[i] is the energy spent before day i begins; starts[days.length] is the whole axis */
  const starts = days.reduce<number[]>((acc, d) => [...acc, acc[acc.length - 1] + d.usual], [0]);
  const total = starts[days.length];
  const pct = (kwh: number) => `${Math.min(100, Math.max(0, (kwh / total) * 100))}%`;

  const outIndex = days.findIndex((_, i) => starts[i + 1] > balance);
  const outAt = outIndex < 0 ? `يكفي ما بعد ال${days[days.length - 1].label}` : `ينفد ال${days[outIndex].label} ${timeOfDay((balance - starts[outIndex]) / days[outIndex].usual)}`;

  const needed = starts[topUp];
  const gap = needed - balance;
  const short = gap > 0;
  const topUpLabel = topUp === days.length ? 'بعد نهاية المدّة' : `يوم ال${days[topUp].label}`;
  const verdict = short ? `ينقصك ${n(gap)} ${unit} حتى يوم الشحن` : `يكفي حتى يوم الشحن ويفضُل ${n(-gap)} ${unit}`;

  const set = (i: number) => {
    const next = clamp(i);
    if (next === topUp) return;
    setTopUp(next);
    onTopUpChange?.(next);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const next = move(e.key, topUp - 1, days.length, undefined, rtl);
    if (next === null) return;
    e.preventDefault();
    set(next + 1);
  };

  /* a press on the axis moves the marker to the nearest day boundary; the thumb takes focus so the arrows continue from there */
  const onTrack = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault(); /* else the mouse events that follow take focus off the thumb the moment it gets it */
    const r = e.currentTarget.getBoundingClientRect();
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const kwh = ((rtl ? r.right - e.clientX : e.clientX - r.left) / r.width) * total;
    let best = 1;
    for (let i = 2; i <= days.length; i += 1) if (Math.abs(starts[i] - kwh) < Math.abs(starts[best] - kwh)) best = i;
    set(best);
    e.currentTarget.focus();
  };

  return (
    <div
      data-runway=""
      data-top-up={topUp}
      data-short={short ? 'true' : 'false'}
      className={short ? 'madar-leak' : undefined}
      style={{
        ...(short ? { ['--madar-leak-color' as string]: 'var(--danger)' } : null),
        position: 'relative', width: '100%', maxWidth: 440,
        display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
          <bdi dir="ltr">{n(balance)}</bdi>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-3)', marginInlineStart: 6 }}>{unit}</span>
        </b>
        <span id={`${id}-verdict`} data-verdict="" style={{ fontSize: 12.5, fontWeight: 600, color: short ? 'var(--danger-ink)' : 'var(--text-2)' }}>
          {short ? 'لا يكفي حتى يوم الشحن' : 'يكفي حتى يوم الشحن'}
        </span>
      </div>

      {/* the axis IS the slider: one focusable element takes the keys and the press, and the
          marker inside it is only a drawing. A pressable strip whose focusable part lives
          outside it is a cursor that lies to the keyboard (gates/25). */}
      <div
        data-axis=""
        data-thumb="true"
        role="slider"
        tabIndex={0}
        aria-label="يوم الشحن"
        aria-valuemin={1}
        aria-valuemax={days.length}
        aria-valuenow={topUp}
        aria-valuetext={`الشحن ${topUpLabel}، ${verdict}`}
        aria-describedby={`${id}-note`}
        onKeyDown={onKey}
        onPointerDown={onTrack}
        style={{ position: 'relative', height: 34, cursor: 'pointer', borderRadius: 'var(--r-sm)' }}
      >
        {/* kilowatt-hours, cut into days of unequal width */}
        <div
          data-track=""
          style={{
            position: 'absolute', insetInline: 0, top: 10, height: 14,
            borderRadius: 'var(--r-sm)', background: 'var(--surface-2)',
            border: '1px solid var(--border)', overflow: 'hidden',
          }}
        >
          {/* what the balance does not reach, after the top-up day: not yet funded, not a problem */}
          <span className="madar-hatch" data-after="" style={{ position: 'absolute', insetBlock: 0, insetInlineStart: pct(Math.max(balance, needed)), insetInlineEnd: 0 }} />
          {/* the shortfall: from where the balance ends to the day money arrives — its length is the missing energy */}
          {short ? (
            <span
              className="madar-hatch"
              data-shortfall=""
              style={{ ['--madar-hatch-color' as string]: 'var(--danger)', position: 'absolute', insetBlock: 0, insetInlineStart: pct(balance), insetInlineEnd: `calc(100% - ${pct(needed)})` }}
            />
          ) : null}
          {/* the balance itself, solid, because it is measured */}
          <span data-fill="" style={{ position: 'absolute', insetBlock: 0, insetInlineStart: 0, insetInlineEnd: `calc(100% - ${pct(balance)})`, background: 'var(--text)' }} />
          {/* one hairline per day boundary: the count, drawn */}
          {starts.slice(1, -1).map((s, i) => (
            <span key={i} data-day-edge="" style={{ position: 'absolute', insetBlock: 0, insetInlineStart: pct(s), width: 1, background: 'var(--surface)', opacity: 0.85 }} />
          ))}
        </div>

        {/* where the lights go out: solid, because it is measured */}
        <span data-out="" style={{ position: 'absolute', top: 4, insetInlineStart: `calc(${pct(balance)} - 1px)`, width: 2, height: 26, background: 'var(--text)' }} />

        {/* the top-up day: hollow, because a plan is not a measurement (§15-ب), and ringed in
            surface so it stays a shape on the ink fill and on the hatch alike */}
        <span
          data-marker=""
          style={{
            position: 'absolute', top: 2, height: 30, width: 14, insetInlineStart: `calc(${pct(needed)} - 7px)`,
            display: 'grid', placeItems: 'center',
            transition: 'inset-inline-start var(--dur-2) var(--ease-out)',
          }}
        >
          <span style={{ display: 'block', width: 10, height: '100%', border: '2px solid var(--surface)', borderRadius: 'var(--r-sm)' }}>
            <span style={{ display: 'block', width: '100%', height: '100%', border: `2px solid ${short ? 'var(--danger)' : 'var(--text-2)'}`, borderRadius: 'var(--r-sm)', transition: 'border-color var(--dur-2) var(--ease-out)' }} />
          </span>
        </span>
      </div>

      {/* the days, each under its own width */}
      <div aria-hidden="true" style={{ display: 'flex', fontSize: 11, color: 'var(--text-3)', marginTop: 'calc(-1 * var(--sp-3))' }}>
        {days.map((d, i) => (
          <span key={i} data-day="" style={{ width: pct(d.usual), textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', fontWeight: i === topUp ? 700 : 400, color: i === topUp ? 'var(--text)' : undefined }}>
            {d.label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-3)', fontSize: 12, color: 'var(--text-2)' }}>
        <span data-out-text="">{outAt}</span>
        <span data-gap="" style={{ color: short ? 'var(--danger-ink)' : 'var(--text-2)' }}>{verdict}</span>
      </div>
      <p id={`${id}-note`} style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6, color: 'var(--text-3)' }}>
        كلّ خانة يومٌ بعرض ما تستهلكه عادةً فيه، فالعطلة أعرض. الأسهم تُحرّك يوم الشحن، والنقر على المحور يضعه عند أقرب يوم.
      </p>
    </div>
  );
}
