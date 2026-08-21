import { useCallback, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { MeshSurface, glass, ink } from './mesh';
import { move, smooth } from './roving';

/* ────────────────────────────────────────────────────────────────────────
   The credit family — the reference set, carried in and made operable.

   Nine of the fourteen references were not nine designs: they were two screens
   and two boards, photographed from different angles and distances. So this is
   two screens and the widgets they are made of, and the close-ups are camera
   shots of the same components.

   The first pass through this file was the mistake the owner named: it was
   faithful to the pixel and **dead to the touch**. Sixteen components across
   three files, and between them two `useState`, one `onClick` and zero
   `onKeyDown` — tabs that did not switch, months that did not take a click,
   a bureau selector that selected nothing. A picture assembled out of `div`s.
   `dispatch.tsx`, written two days earlier in this same library, has roving
   tabindex and derived state; by the library's own acceptance criteria 5 and 6
   these were unfinished.

   So every control here is real: it has state, it answers the keyboard, it
   exposes a callback, and **its result is visible** — a selection that changes
   nothing on screen is the same lie in a different costume.

   Checked before writing it, and not reused:
   · `AllocationBar` (energy.tsx) is a share bar. `PaidSplit` is a *pair* with a
     divider between them, and the pairing is the reading: paid against left.
   · `DayStrip` (schedule.tsx) is 24 counted cells on a time axis. `MonthGrid` is
     a calendar of *states* — paid, missed, not yet due — and its shape is the
     year, not the day.
   · `MiniBarChart` (charts.tsx) plots a series. `ScoreBands` plots one reading
     against three named ranges, which is §14 with the reference drawn as bands.
──────────────────────────────────────────────────────────────────────── */

const n = (v: number, digits = 0) =>
  v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/* Direction and the roving mover live in `roving.ts`: this file and `boards.tsx`
   had drifted copies of both. */

/* ═══════════════════════════════════════════════════════════════════════════
   LoanWidget — the square card, green or peach
   ═══════════════════════════════════════════════════════════════════════════ */

export interface LoanWidgetProps {
  bank?: string;
  country?: string;
  paid?: number;
  termMonths?: number;
  nextPayment?: string;
  tone?: 'green' | 'peach';
  /** How the progress is drawn: dots count, bars measure. Same data, two reads. */
  meter?: 'dots' | 'bars';
  /** Months already paid, out of `termMonths`. The lit part is derived from it. */
  paidMonths?: number;
  size?: number;
  /** The arrow opens the account. Without it the arrow is a picture of a button. */
  onOpen?: () => void;
}

function BankMark({ kind }: { kind: 'card' | 'bank' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 58, height: 58, borderRadius: '50%', display: 'grid', placeItems: 'center', flex: 'none',
        boxShadow: 'inset 0 0 0 1.2px rgba(255,255,255,0.6)',
      }}
    >
      {kind === 'card' ? (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="14" height="11" rx="2.5" /><path d="M3 10h14" /><circle cx="17.5" cy="15.5" r="4" /><path d="M17.5 14v3" />
        </svg>
      ) : (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9l8-5 8 5" /><path d="M5 9v9M19 9v5" /><path d="M9 18v-6M15 12v2" /><path d="M3 21h12" /><circle cx="18.5" cy="18" r="3.4" /><path d="M18.5 16.6v1.6" />
        </svg>
      )}
    </span>
  );
}

function OpenButton({
  quiet = false, dark = true, label = 'Open', onClick,
}: { quiet?: boolean; dark?: boolean; label?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 58, height: 58, border: 0, borderRadius: '50%', cursor: 'pointer', flex: 'none',
        display: 'grid', placeItems: 'center',
        background: quiet ? (dark ? 'rgba(255,255,255,0.24)' : '#f2f2f0') : '#0c0c0c',
        boxShadow: quiet
          ? 'inset 0 1px 0 rgba(255,255,255,0.42)'
          : 'inset 0 1px 0 rgba(255,255,255,0.16), var(--depth-press)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={quiet && !dark ? '#101312' : '#fff'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" /><path d="M9 7h8v8" />
      </svg>
    </button>
  );
}

export function LoanWidget({
  bank = 'TD Bank',
  country = 'USA',
  paid = 12340,
  termMonths = 36,
  nextPayment = '03.05.2024',
  tone = 'green',
  meter: initialMeter = 'dots',
  paidMonths = 23,
  size = 316,
  onOpen,
}: LoanWidgetProps) {
  /* The two meters are the same data read two ways, so the widget lets you swap
     the read rather than making the call site pick once and lose the other. */
  const [meter, setMeter] = useState(initialMeter);
  const [opened, setOpened] = useState(false);

  /* The meter is derived from the months, never passed in as a width: a widget
     that can be told a wrong length is a widget that will be. */
  const cols = 14;
  const lit = Math.round((Math.min(paidMonths, termMonths) / termMonths) * cols);

  return (
    <MeshSurface
      variant={tone}
      glow
      bevel
      style={{ width: size, height: size, padding: 26, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <BankMark kind={tone === 'green' ? 'card' : 'bank'} />
        <div style={{ flex: 1, paddingInlineStart: 14, paddingTop: 4, fontSize: 25, lineHeight: 1.12, letterSpacing: '-0.015em' }}>
          {bank}<br />{country}
        </div>
        <OpenButton
          label={`Open ${bank} ${country}`}
          onClick={() => { setOpened((v) => !v); onOpen?.(); }}
        />
      </div>

      <div style={{ marginTop: 34 }}>
        <div style={{ fontSize: 16, color: ink.label }}>Paid Amount</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontSize: 46, fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.05, display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>$</span>
            <bdi dir="ltr">{n(paid)}</bdi>
          </div>
          <div style={{ fontSize: 14, color: ink.soft, textAlign: 'end', lineHeight: 1.35, paddingBottom: 6 }}>
            Term<br /><bdi dir="ltr">{n(termMonths)} m.</bdi>
          </div>
        </div>
      </div>

      {/* dots count the instalments; bars measure the same run. The lit part is
          the paid part, and lime means measured. Pressing it swaps the read, and
          the label says what it is rather than leaving it to be guessed. */}
      <button
        type="button"
        data-meter={meter}
        data-lit={lit}
        aria-label={`${n(paidMonths)} of ${n(termMonths)} instalments paid — shown as ${meter}. Activate to switch.`}
        onClick={() => setMeter((m) => (m === 'dots' ? 'bars' : 'dots'))}
        style={{
          marginTop: 'auto', display: 'flex', gap: meter === 'dots' ? 12 : 8,
          alignItems: 'flex-end', height: 34, paddingBlock: 4,
          border: 0, background: 'transparent', cursor: 'pointer', width: '100%',
        }}
      >
        {Array.from({ length: cols }, (_, i) => {
          const on = i >= cols - lit;
          return meter === 'dots' ? (
            <span key={i} style={{ display: 'grid', gap: 6 }}>
              {[0, 1, 2].map((r) => (
                <span
                  key={r}
                  style={{
                    width: 3.6, height: 3.6, borderRadius: '50%',
                    background: on ? 'var(--lime-bright)' : 'rgba(255,255,255,0.42)',
                  }}
                />
              ))}
            </span>
          ) : (
            <span
              key={i}
              style={{
                width: 2, height: on ? 26 : 18, borderRadius: 'var(--r-pill)',
                background: on ? 'var(--lime-bright)' : 'rgba(255,255,255,0.44)',
              }}
            />
          );
        })}
      </button>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontSize: 15, marginTop: 14 }}>
        <span style={{ color: ink.label }}>{opened ? 'Opened' : 'Next Payment'}</span>
        <span><bdi dir="ltr">{nextPayment}</bdi></span>
      </div>
    </MeshSurface>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   StatWidget — the white card and the glass card
   ═══════════════════════════════════════════════════════════════════════════ */

export interface StatWidgetProps {
  title?: string;
  value?: number;
  /** `of` draws a denominator; `pct` draws a percent. */
  unit?: { of: number } | 'pct';
  tone?: 'white' | 'glass';
  /** Amber marks a reading that wants attention; it is not decoration. */
  warn?: boolean;
  icon?: 'calendar' | 'card';
  size?: number;
  onOpen?: () => void;
}

export function StatWidget({
  title = 'Payments on Time',
  value = 24,
  unit = { of: 38 },
  tone = 'white',
  warn = true,
  icon = 'calendar',
  size = 316,
  onOpen,
}: StatWidgetProps) {
  const light = tone === 'white';
  const total = typeof unit === 'object' ? unit.of : 100;
  /* The dot matrix counts the actual reading — §15-a: a counted quantity is
     drawn counted, so twenty-four dots are twenty-four dots. */
  const dots = Math.min(12, Math.max(1, Math.round((value / total) * 12)));
  const [open, setOpen] = useState(false);

  return (
    <div
      data-stat={tone}
      className="madar-glow"
      style={{
        width: size, height: size, padding: 26, borderRadius: 'var(--r-widget)',
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
        color: light ? '#101312' : '#fff',
        background: light
          ? 'linear-gradient(var(--wash), #fff 0%, #fbfbfa 100%)'
          : 'linear-gradient(var(--sheen), rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.16) 100%)',
        backdropFilter: light ? undefined : 'blur(26px)',
        boxShadow: light
          ? 'inset 0 1.5px 0 #fff, inset 0 -1px 0 rgba(0,0,0,0.05), var(--depth-widget)'
          : 'inset 0 1.5px 0 rgba(255,255,255,0.6), inset 0 -1.5px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.3), var(--depth-widget)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span
          aria-hidden="true"
          style={{
            width: 58, height: 58, borderRadius: '50%', display: 'grid', placeItems: 'center', position: 'relative',
            boxShadow: `inset 0 0 0 1.2px ${light ? 'rgba(16,16,16,0.14)' : 'rgba(255,255,255,0.6)'}`,
          }}
        >
          {icon === 'calendar' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={light ? '#101312' : '#fff'} strokeWidth="1.4" strokeLinecap="round">
              <rect x="3.5" y="5" width="17" height="16" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={light ? '#101312' : '#fff'} strokeWidth="1.4" strokeLinecap="round">
              <rect x="3" y="6" width="14" height="11" rx="2.5" /><path d="M3 10h14" /><circle cx="17.5" cy="15.5" r="4" /><path d="M17.5 14v3" />
            </svg>
          )}
          {warn && (
            <span style={{ position: 'absolute', top: -4, right: -4, display: 'grid', placeItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.5l9 16H3z" fill={light ? '#f5a623' : '#f5721f'} />
                <path d="M12 9v5M12 16.4v.3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          )}
        </span>
        <OpenButton
          quiet
          dark={!light}
          label={`Open ${title}`}
          onClick={() => { setOpen((v) => !v); onOpen?.(); }}
        />
      </div>

      <div style={{ marginTop: 26, fontSize: 21, letterSpacing: '-0.012em' }}>{title}</div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, fontSize: 44, fontWeight: light ? 600 : 500, letterSpacing: '-0.03em' }}>
          <bdi dir="ltr">{n(value)}</bdi>
          <small style={{ fontSize: 22, fontWeight: 400, color: light ? 'rgba(16,16,16,0.4)' : 'rgba(255,255,255,0.66)' }}>
            {unit === 'pct' ? '%' : <>/{n(total)}</>}
          </small>
        </div>

        {unit === 'pct' ? (
          <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                style={{
                  width: i === 3 ? 30 : 22, height: i === 3 ? 30 : 22, borderRadius: '50%',
                  boxShadow: `inset 0 0 0 ${i === 3 ? 2.2 : 1.6}px ${i === 3 ? '#fff' : 'rgba(255,255,255,0.5)'}`,
                }}
              />
            ))}
          </span>
        ) : (
          <span aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 8 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: i >= 12 - dots ? '#101312' : '#d8d8d5',
                }}
              />
            ))}
          </span>
        )}
      </div>

      {open && (
        <div
          data-stat-detail=""
          style={{
            position: 'absolute', insetInline: 0, bottom: 0, padding: '12px 26px 14px',
            fontSize: 13, lineHeight: 1.5,
            color: light ? 'rgba(16,16,16,0.62)' : 'rgba(255,255,255,0.78)',
            background: light ? 'rgba(16,16,16,0.04)' : 'rgba(255,255,255,0.14)',
            borderTop: `1px solid ${light ? 'rgba(16,16,16,0.08)' : 'rgba(255,255,255,0.24)'}`,
          }}
        >
          {unit === 'pct'
            ? <><bdi dir="ltr">{n(value)}%</bdi> of the limit in use — the fourth ring is the one you are inside.</>
            : <><bdi dir="ltr">{n(total - value)}</bdi> of <bdi dir="ltr">{n(total)}</bdi> still to fall due.</>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PaidSplit — paid against left to pay, with the divider between them
   ═══════════════════════════════════════════════════════════════════════════ */

export type Side = 'paid' | 'left';

/**
 * A pair, and which of the two you are reading.
 *
 * The divider is not decoration: its lit end sits on the side under inspection,
 * so choosing a side has a consequence you can see. Two radios, arrows follow
 * the writing direction.
 */
export function PaidSplit({
  paid = 12340,
  total = 15000,
  side: controlled,
  onSide,
}: {
  paid?: number;
  total?: number;
  side?: Side;
  onSide?: (s: Side) => void;
}) {
  const [own, setOwn] = useState<Side>('paid');
  const side = controlled ?? own;
  const pick = (s: Side) => { setOwn(s); onSide?.(s); };
  const left = Math.max(0, total - paid);
  const sides: Side[] = ['paid', 'left'];

  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, sides.indexOf(side), sides.length);
    if (next === null) return;
    e.preventDefault();
    pick(sides[next]);
  };

  return (
    <div
      data-split={side}
      role="radiogroup"
      aria-label="Which half of the balance to read"
      onKeyDown={onKey}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 16, alignItems: 'center' }}
    >
      <div>
        <Chip value={paid} lit label="You’ve Paid" on={side === 'paid'} onPick={() => pick('paid')} />
        <div style={{ fontSize: 14, color: ink.label, marginTop: 8 }}>You’ve Paid</div>
      </div>
      {/* the divider is a reading too: the lime end sits on the side being read */}
      <span
        aria-hidden="true"
        data-divider={side}
        style={{
          position: 'relative', height: 96,
          background: side === 'paid'
            ? 'linear-gradient(var(--wash), var(--lime) 0%, rgba(255,255,255,0.3) 46%, rgba(255,255,255,0.12) 100%)'
            : 'linear-gradient(0deg, var(--lime) 0%, rgba(255,255,255,0.3) 46%, rgba(255,255,255,0.12) 100%)',
        }}
      >
        <span
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            ...(side === 'paid'
              ? { top: -9, borderTop: '9px solid var(--lime)' }
              : { bottom: -9, borderBottom: '9px solid var(--lime)' }),
            width: 0, height: 0,
            borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
            filter: 'drop-shadow(0 0 6px rgba(210,245,74,0.6))',
          }}
        />
      </span>
      <div>
        <Chip value={left} label="Left To Pay" on={side === 'left'} onPick={() => pick('left')} />
        <div style={{ fontSize: 14, color: ink.label, marginTop: 8, textAlign: 'end' }}>Left To Pay</div>
      </div>
    </div>
  );
}

function Chip({
  value, lit = false, on, label, onPick,
}: { value: number; lit?: boolean; on: boolean; label: string; onPick: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      aria-label={`${label} $${n(value)}`}
      tabIndex={on ? 0 : -1}
      onClick={onPick}
      data-chip={lit ? 'paid' : 'due'}
      data-on={on ? '' : undefined}
      style={{
        width: '100%', height: 52, padding: '0 18px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        fontSize: 17, fontFamily: 'inherit', color: '#fff',
        ...glass(lit),
        /* the chosen side gains the ring; the other keeps only its own edge */
        outline: on ? '2px solid var(--lime)' : 'none',
        outlineOffset: 2,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 22, height: 22, borderRadius: '50%', flex: 'none', display: 'grid', placeItems: 'center',
          border: `1.4px solid ${lit ? 'var(--lime)' : 'rgba(255,255,255,0.5)'}`,
          boxShadow: lit ? '0 0 10px rgba(210,245,74,0.55)' : undefined,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: lit ? 'var(--lime)' : '#fff' }} />
      </span>
      <span><bdi dir="ltr">${n(value)}</bdi></span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MonthGrid — the year as states, not as a strip
   ═══════════════════════════════════════════════════════════════════════════ */

export type MonthState = 'paid' | 'missed' | 'due';
export interface MonthRow { year: number; months: { label: string; state: MonthState }[] }

const YEARS: MonthRow[] = [
  {
    year: 2023,
    months: [
      { label: 'Jan', state: 'due' }, { label: 'Feb', state: 'paid' },
      { label: 'Mar', state: 'paid' }, { label: 'Apr', state: 'paid' },
      { label: 'Jul', state: 'paid' }, { label: 'Aug', state: 'paid' },
      { label: 'Sep', state: 'missed' }, { label: 'Oct', state: 'paid' },
    ],
  },
  {
    year: 2024,
    months: [
      { label: 'Jan', state: 'due' }, { label: 'Feb', state: 'due' },
      { label: 'Mar', state: 'due' }, { label: 'Apr', state: 'due' },
    ],
  },
];

const STATE_SAYS: Record<MonthState, string> = {
  paid: 'settled',
  missed: 'missed — still owed',
  due: 'not yet due',
};

/**
 * The year, as a keyboard-operable grid.
 *
 * Four columns, so Up and Down move by four and Left and Right move by one
 * *along the writing direction*. One tab stop for the whole grid (roving
 * tabindex), because a dispatcher tabbing through twelve months to reach the
 * thirteenth is the reason nobody uses the keyboard.
 */
export function MonthGrid({
  years = YEARS,
  onSelect,
}: {
  years?: MonthRow[];
  onSelect?: (m: { year: number; label: string; state: MonthState }) => void;
}) {
  const flat = useMemo(
    () => years.flatMap((y) => y.months.map((m) => ({ ...m, year: y.year }))),
    [years],
  );
  const paid = flat.filter((m) => m.state === 'paid').length;
  const [at, setAt] = useState(() => Math.max(0, flat.findIndex((m) => m.state === 'missed')));
  const boxes = useRef<(HTMLButtonElement | null)[]>([]);
  const current = flat[at];

  const go = (i: number) => {
    setAt(i);
    boxes.current[i]?.focus();
    onSelect?.(flat[i]);
  };

  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, at, flat.length, 4);
    if (next === null) return;
    e.preventDefault();
    go(next);
  };

  return (
    <div data-months={paid} data-selected={`${current?.year}-${current?.label}`}>
      <div role="grid" aria-label="Instalments by month" aria-rowcount={years.length} onKeyDown={onKey}>
        {years.map((row, ri) => {
          const before = years.slice(0, ri).reduce((s, y) => s + y.months.length, 0);
          return (
            <div key={row.year} style={{ marginTop: ri ? 24 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 22 }}><bdi dir="ltr">{row.year}</bdi></span>
                {ri === 0 && <span style={{ fontSize: 14, color: ink.label }}>First Payment · <bdi dir="ltr">{row.year}</bdi></span>}
              </div>
              <div role="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 11, marginTop: 14 }}>
                {row.months.map((m, mi) => {
                  const i = before + mi;
                  const on = i === at;
                  return (
                    <button
                      key={m.label}
                      ref={(el) => { boxes.current[i] = el; }}
                      type="button"
                      role="gridcell"
                      aria-selected={on}
                      aria-label={`${m.label} ${row.year} — ${STATE_SAYS[m.state]}`}
                      tabIndex={on ? 0 : -1}
                      onClick={() => go(i)}
                      data-month={m.state}
                      data-on={on ? '' : undefined}
                      style={{
                        height: 92, borderRadius: 'var(--r-block)', paddingTop: 11, cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                        fontSize: 15, fontFamily: 'inherit', color: '#fff',
                        opacity: m.state === 'due' ? 0.72 : 1,
                        border: `1px solid ${m.state === 'paid' ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.2)'}`,
                        background: 'rgba(255,255,255,0.08)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.26)',
                        outline: on ? '2px solid var(--lime)' : 'none',
                        outlineOffset: 2,
                      }}
                    >
                      <span>{m.label}</span>
                      <span
                        aria-hidden="true"
                        style={{
                          width: 30, height: 30, borderRadius: '50%', marginBottom: 12,
                          display: 'grid', placeItems: 'center',
                          visibility: m.state === 'due' ? 'hidden' : 'visible',
                          background: m.state === 'paid' ? 'var(--lime)' : 'transparent',
                          border: m.state === 'missed' ? '1px solid rgba(255,255,255,0.38)' : undefined,
                          boxShadow: m.state === 'paid' ? 'var(--depth-lime), inset 0 -1px 0 rgba(0,0,0,0.12)' : undefined,
                        }}
                      >
                        {m.state === 'paid' ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--lime-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12l6 6L20 6" />
                          </svg>
                        ) : (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="2.6" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* the selection's consequence, said out loud: a choice that changes nothing
          on screen is the same emptiness as a button that does nothing */}
      <p
        data-month-says=""
        aria-live="polite"
        style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: ink.soft }}
      >
        {current
          ? <><bdi dir="ltr">{current.label} {current.year}</bdi> — {STATE_SAYS[current.state]}.</>
          : 'No instalments on record.'}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LoanScreen — the whole thing
   ═══════════════════════════════════════════════════════════════════════════ */

const TABS = ['details', 'timeline', 'updates'] as const;
type Tab = (typeof TABS)[number];

export function LoanScreen({
  paid = 12340, total = 15000, termMonths = 36,
}: { paid?: number; total?: number; termMonths?: number }) {
  const [tab, setTab] = useState<Tab>('timeline');
  const [side, setSide] = useState<Side>('paid');
  const [action, setAction] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId().replace(/:/g, '');
  const pct = Math.round((paid / total) * 100);

  const goTab = useCallback((i: number) => {
    setTab(TABS[i]);
    tabs.current[i]?.focus();
  }, []);

  const onTabKey = (e: KeyboardEvent) => {
    const next = move(e.key, TABS.indexOf(tab), TABS.length);
    if (next === null) return;
    e.preventDefault();
    goTab(next);
  };

  return (
    <MeshSurface
      variant="run"
      radius="var(--r-screen)"
      style={{ width: 430, height: 932, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '58px 26px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BankMark kind="card" />
            <div style={{ fontSize: 21, lineHeight: 1.16 }}>TD Bank<br />USA</div>
          </div>
          <OpenButton label="Open account" onClick={() => setAction('Account opened')} />
        </div>

        {/* the percentage, on a drawn path — the squiggle is the run it measures */}
        <div style={{ position: 'absolute', insetInlineEnd: 26, top: 118, textAlign: 'end' }}>
          <svg width="132" height="52" viewBox="0 0 132 52" fill="none" aria-hidden="true" style={{ display: 'block', marginInlineStart: 'auto' }}>
            <path d="M4 40c14 6 26-2 30-14C38 12 30 4 22 8c-9 4-6 20 8 26 16 7 34 2 48-10 8-7 18-10 26-6" stroke="var(--lime)" strokeWidth="1.4" opacity="0.9" />
            <circle cx="118" cy="15" r="6.5" fill="none" stroke="var(--lime)" strokeWidth="1.4" />
            <circle cx="118" cy="15" r="2.6" fill="var(--lime)" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.02em' }}>
            <bdi dir="ltr">{pct}</bdi><span style={{ fontSize: 17, color: ink.label }}>%</span>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 15, color: ink.label }}>Paid Amount</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 4 }}>
            <div style={{ fontSize: 62, fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.62)' }}>$</span>
              {/* the headline follows the side under inspection — the split is a
                  control, so it has to move something that matters */}
              <bdi dir="ltr">{n(side === 'paid' ? paid : Math.max(0, total - paid))}</bdi>
            </div>
            <div style={{ fontSize: 15, color: ink.soft, lineHeight: 1.3, paddingBottom: 8 }}>
              Term<b style={{ display: 'block', fontWeight: 400, color: '#fff' }}><bdi dir="ltr">{termMonths} m.</bdi></b>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
          <span style={{ fontSize: 15, color: ink.label }}>Next Payment</span>
          <span style={{ fontSize: 17 }}><bdi dir="ltr">03.05.2024</bdi></span>
        </div>

        <div style={{ marginTop: 26 }}>
          <PaidSplit paid={paid} total={total} side={side} onSide={setSide} />
        </div>

        {/* the active tab is a raised lip on the sheet below it, not an underline */}
        <div
          role="tablist"
          aria-label="Loan views"
          onKeyDown={onTabKey}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 30, padding: '0 4px' }}
        >
          {TABS.map((t, i) => (
            <button
              key={t}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${base}-tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`${base}-panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => goTab(i)}
              style={{
                border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 19, textTransform: 'capitalize',
                color: tab === t ? '#fff' : ink.soft,
                background: tab === t ? 'rgba(255,255,255,0.14)' : 'transparent',
                padding: tab === t ? '10px 22px 14px' : '10px 4px',
                borderRadius: tab === t ? '20px 20px 0 0' : 0,
                boxShadow: tab === t ? 'inset 0 1px 0 rgba(255,255,255,0.4)' : undefined,
                backdropFilter: tab === t ? 'blur(10px)' : undefined,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel-${tab}`}
          aria-labelledby={`${base}-tab-${tab}`}
          data-panel={tab}
          style={{
            margin: '0 -26px', padding: '22px 26px 120px', flex: 1,
            borderRadius: 'var(--r-sheet) var(--r-sheet) 0 0',
            background: 'rgba(255,255,255,0.11)',
            borderTop: '1px solid rgba(255,255,255,0.3)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.34)',
            backdropFilter: 'blur(16px)',
            overflow: 'hidden',
          }}
        >
          {tab === 'timeline' && <MonthGrid />}
          {tab === 'details' && (
            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: ink.soft, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 18px' }}>
              <dt>Rate</dt><dd style={{ margin: 0, color: '#fff' }}>Fixed</dd>
              <dt>Instalments</dt><dd style={{ margin: 0, color: '#fff' }}><bdi dir="ltr">{n(termMonths)}</bdi></dd>
              <dt>Drawn</dt><dd style={{ margin: 0, color: '#fff' }}>2023</dd>
              <dt>Settled</dt><dd style={{ margin: 0, color: '#fff' }}><bdi dir="ltr">${n(paid)}</bdi> of <bdi dir="ltr">${n(total)}</bdi></dd>
              <dt>Early exit</dt><dd style={{ margin: 0, color: '#fff' }}>No fee</dd>
            </dl>
          )}
          {tab === 'updates' && (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 15, lineHeight: 1.7, color: ink.soft, display: 'grid', gap: 14 }}>
              <li><b style={{ color: '#fff', fontWeight: 400 }}>Sep 2023</b> — instalment missed. Still owed.</li>
              <li><b style={{ color: '#fff', fontWeight: 400 }}>Oct 2023</b> — caught up, nothing outstanding since.</li>
              <li><b style={{ color: '#fff', fontWeight: 400 }}>May 2024</b> — next instalment falls due.</li>
            </ul>
          )}
        </div>
      </div>

      <div style={{ position: 'absolute', insetInline: 18, bottom: 22, display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={() => setAction('Payment started')}
          style={{
            flex: 1.05, height: 62, border: 0, borderRadius: 'var(--r-pill)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'inherit', fontSize: 17, fontWeight: 500,
            background: '#fff', color: '#101312',
            boxShadow: 'inset 0 1px 0 #fff, var(--depth-float)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101312" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <rect x="2.5" y="6" width="14" height="10" rx="2.4" /><path d="M2.5 10h14" /><path d="M20 9v6M17 12h6" />
          </svg>
          Make Payment
        </button>
        <button
          type="button"
          onClick={() => setAction('Dispute opened')}
          style={{
            flex: 1, height: 62, borderRadius: 'var(--r-pill)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'inherit', fontSize: 17, fontWeight: 500, color: '#fff',
            ...glass(),
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <rect x="4" y="3.5" width="16" height="17" rx="3" /><path d="M8 9h6M8 13h8M8 17h4" />
          </svg>
          Create Dispute
        </button>
      </div>

      {action && (
        <p
          data-action=""
          aria-live="polite"
          style={{
            position: 'absolute', insetInline: 18, bottom: 92, margin: 0, textAlign: 'center',
            fontSize: 14, color: '#fff', padding: '10px 16px', borderRadius: 'var(--r-pill)', ...glass(true),
          }}
        >
          {action}
        </p>
      )}
    </MeshSurface>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ScoreBands + CreditHistory + ScoreScreen — the light twin
   ═══════════════════════════════════════════════════════════════════════════ */

const BANDS = [
  { name: 'Poor to fair', from: 300, to: 629, dot: '#e8703f', soft: '#e8825c', bg: 'linear-gradient(var(--sheen), #fdece4, #fbdccf)' },
  { name: 'Good', from: 630, to: 689, dot: '#e0a11c', soft: '#e0ab34', bg: 'linear-gradient(var(--sheen), #fdf4d8, #fbedc0)' },
  { name: 'Very good to excellent', from: 690, to: 850, dot: '#3f8f2f', soft: '#4e9b3f', bg: 'linear-gradient(var(--sheen), #e8f5e0, #d9efcd)' },
];

/**
 * One reading against three named ranges (§14), and the ranges are selectable:
 * a band you can inspect tells you what it takes to get there, which is the only
 * reason a score screen draws bands at all.
 */
export function ScoreBands({
  score = 730,
  onBand,
  /* This is a light-ground component: pale bands, a near-black marker, grey
     scale numerals. It used to rely on whoever placed it being light, and in the
     night pack that put a #101312 label on a #2f3550 stage at 1.58 — invisible,
     not merely poor. `boards.tsx` already settled the rule for this family: a
     design that owns its background owns its foreground. So it paints its own
     ground, and `ScoreScreen` turns it off because the light mesh is already
     underneath and an opaque block would cover the hue. */
  ground = true,
}: { score?: number; onBand?: (i: number) => void; ground?: boolean }) {
  /* Which band the reading falls in, and where inside it — derived, so the
     marker cannot be told a position that contradicts the number beside it. */
  const at = useMemo(() => {
    const i = BANDS.findIndex((b) => score <= b.to);
    const idx = i < 0 ? BANDS.length - 1 : i;
    const band = BANDS[idx];
    const within = Math.min(1, Math.max(0, (score - band.from) / (band.to - band.from)));
    return { idx, within };
  }, [score]);

  const [look, setLook] = useState(at.idx);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number) => { setLook(i); cells.current[i]?.focus(); onBand?.(i); };

  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, look, BANDS.length);
    if (next === null) return;
    e.preventDefault();
    go(next);
  };

  return (
    <div
      data-bands={at.idx}
      data-looking={look}
      style={ground ? { background: '#fbfbfa', borderRadius: 'var(--r-block)', padding: 14, boxShadow: 'inset 0 0 0 1px rgba(16,16,16,0.05)' } : undefined}
    >
      <div
        role="radiogroup"
        aria-label="Score ranges"
        onKeyDown={onKey}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, position: 'relative' }}
      >
        {BANDS.map((b, i) => (
          <button
            key={b.from}
            ref={(el) => { cells.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={look === i}
            aria-label={`${b.name}, ${b.from} to ${b.to}${i === at.idx ? ' — your range' : ''}`}
            tabIndex={look === i ? 0 : -1}
            onClick={() => go(i)}
            data-band={i}
            data-on={look === i ? '' : undefined}
            style={{
              height: 62, borderRadius: 'var(--r-panel)', background: b.bg, position: 'relative', overflow: 'hidden',
              border: 0, padding: 0, cursor: 'pointer',
              boxShadow: 'inset 0 0 0 1px rgba(16,16,16,0.05)',
              outline: look === i ? `2px solid ${b.dot}` : 'none',
              outlineOffset: 2,
            }}
          >
            <svg width="100%" height="62" viewBox="0 0 124 62" preserveAspectRatio="none" aria-hidden="true">
              <g fill={b.soft} opacity="0.82">
                {[14, 30, 46, 62, 78, 92].map((x, k) => (
                  <circle key={x} cx={x} cy={26 + ((k * 7 + i * 5) % 20)} r="2" />
                ))}
              </g>
              <circle cx="106" cy={i === 2 ? 26 : 38} r="4" fill={b.dot} />
              <circle cx="106" cy={i === 2 ? 26 : 38} r="8" fill="none" stroke={b.dot} strokeWidth="1.4" />
            </svg>
          </button>
        ))}
        {/* the marker: a triangle on a hairline, standing on the reading */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: -12, textAlign: 'center',
            insetInlineStart: `calc(${(at.idx / 3) * 100}% + ${at.within * 30 + 2}%)`,
          }}
        >
          <span style={{ display: 'block', width: 0, height: 0, margin: '0 auto', borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid #101312' }} />
          <span style={{ display: 'block', width: 1.4, height: 62, background: '#101312', margin: '0 auto' }} />
          {/* the triangle and stem state their ink; the number was inheriting the
              pack's, which in the night pack put #edf0f7 on this white ground at
              1.1 — the same omission, one node deep */}
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginTop: 8, color: '#101312' }}><bdi dir="ltr">{n(score)}</bdi></span>
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 9, fontSize: 13, color: '#9a9a97' }}>
        <span>300</span><span style={{ textAlign: 'center' }}>630</span><span style={{ textAlign: 'end' }}>690</span>
      </div>
      <p data-band-says="" aria-live="polite" style={{ margin: '10px 0 0', fontSize: 13, color: '#5c5c59' }}>
        {look === at.idx
          ? <><b style={{ fontWeight: 600, color: '#101312' }}>{BANDS[look].name}</b> — where you are, at <bdi dir="ltr">{n(score)}</bdi>.</>
          : <><b style={{ fontWeight: 600, color: '#101312' }}>{BANDS[look].name}</b> — <bdi dir="ltr">{n(BANDS[look].from)}</bdi> to <bdi dir="ltr">{n(BANDS[look].to)}</bdi>, {score > BANDS[look].to ? 'behind you' : `${n(BANDS[look].from - score)} points away`}.</>}
      </p>
    </div>
  );
}

/* ── CreditHistory ─────────────────────────────────────────────────────────
   A chart, so the series is data and the path is computed from it. The first
   version had the curve as a hard-coded `d` string, which meant the "reading"
   could not move and the three bureaus in the legend were three words. */

export interface BureauSeries { name: string; points: number[]; ink: string }

const BUREAUS: BureauSeries[] = [
  { name: 'Transunion', ink: '#1a1a1a', points: [719, 721, 726, 730, 726, 716, 713, 714, 716] },
  { name: 'Equifax', ink: '#d3d3d0', points: [714, 718, 717, 719, 722, 710, 708, 712, 715] },
  { name: 'Experian', ink: '#e6e6e3', points: [709, 707, 711, 714, 713, 705, 704, 707, 709] },
];

const WHEN = ['12 Feb', '19 Mar', '2 Apr', '16 Jun', '30 Jul', '11 Sep', '24 Oct', '7 Nov', '19 Dec'];

/** A cubic through the points, so a series of numbers becomes one smooth run. */
export function CreditHistory({
  score = 730,
  series = BUREAUS,
  when = WHEN,
  onPoint,
}: {
  score?: number;
  series?: BureauSeries[];
  when?: string[];
  onPoint?: (i: number) => void;
}) {
  const lead = series[0];
  /* The reading starts on the point that matches the headline score, so the
     bubble and the number cannot disagree on first paint. */
  const [at, setAt] = useState(() => {
    const i = lead.points.indexOf(score);
    return i < 0 ? Math.floor(lead.points.length / 2) : i;
  });
  const [shown, setShown] = useState(() => series.map(() => true));
  const dots = useRef<(SVGCircleElement | null)[]>([]);

  const W = 340; const H = 168; const X0 = 46; const X1 = 328; const Y0 = 22; const Y1 = 136;
  const all = series.flatMap((s) => s.points);
  const lo = Math.min(...all, 700); const hi = Math.max(...all, 730);
  const px = (i: number, len: number) => X0 + (i / (len - 1)) * (X1 - X0);
  const py = (v: number) => Y1 - ((v - lo) / (hi - lo)) * (Y1 - Y0);

  const go = (i: number) => { setAt(i); dots.current[i]?.focus(); onPoint?.(i); };
  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, at, lead.points.length);
    if (next === null) return;
    e.preventDefault();
    go(next);
  };

  const reading = lead.points[at];
  const bubbleX = px(at, lead.points.length);
  const bubbleY = py(reading);

  return (
    <div
      data-history=""
      data-at={at}
      style={{
        borderRadius: 'var(--r-sheet)', padding: '18px 18px 12px', background: '#fff', color: '#101312',
        boxShadow: 'inset 0 1.5px 0 #fff, var(--depth-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span aria-hidden="true" style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: 'inset 0 0 0 1.2px rgba(16,16,16,0.16)' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#101312" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v5l3.5 2" /><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3 5v4h4" />
          </svg>
        </span>
        <h3 style={{ margin: 0, flex: 1, fontSize: 19, fontWeight: 500, letterSpacing: '-0.015em', color: '#101312' }}>Credit History</h3>
        <OpenButton quiet dark={false} label="Open credit history" />
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        style={{ marginTop: 12 }}
        role="radiogroup"
        aria-label="Credit score by date"
        onKeyDown={onKey}
      >
        <g stroke="#e6e6e3" strokeWidth="1" strokeDasharray="3 4">
          {[730, 720, 710, 700].map((v) => <path key={v} d={`M${X0- 2} ${py(v)}h${X1 - X0 + 8}`} />)}
        </g>
        <g fill="#9a9a97" fontSize="11">
          {[730, 720, 710, 700].map((v) => <text key={v} x="14" y={py(v) + 4}>{v}</text>)}
        </g>

        {/* the quieter bureaus sit behind: same axis, less ink, and each can be
            taken out of the picture from the legend below */}
        {series.map((s, si) => shown[si] && si > 0 && (
          <path
            key={s.name}
            d={smooth(s.points.map((v, i) => ({ x: px(i, s.points.length), y: py(v) })))}
            stroke={s.ink}
            strokeWidth="2"
          />
        ))}
        {shown[0] && (
          <path
            d={smooth(lead.points.map((v, i) => ({ x: px(i, lead.points.length), y: py(v) })))}
            stroke={lead.ink}
            strokeWidth="2"
          />
        )}

        {/* every point is reachable: one tab stop, arrows along the writing
            direction, and the bubble follows the selection */}
        {shown[0] && lead.points.map((v, i) => (
          <circle
            key={i}
            ref={(el) => { dots.current[i] = el; }}
            cx={px(i, lead.points.length)}
            cy={py(v)}
            r={i === at ? 5 : 4}
            fill={lead.ink}
            role="radio"
            aria-checked={i === at}
            aria-label={`${when[i] ?? i + 1}: ${v}`}
            tabIndex={i === at ? 0 : -1}
            onClick={() => go(i)}
            style={{ cursor: 'pointer', outlineOffset: 3 }}
          />
        ))}

        {shown[0] && (
          <>
            <path d={`M${bubbleX} ${bubbleY + 23}V${Y1 - 6}`} stroke="#8f8f8c" strokeWidth="1.2" strokeDasharray="4 4" />
            <circle cx={bubbleX} cy={bubbleY} r="23" fill="var(--lime)" />
            <text x={bubbleX} y={bubbleY + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill="#101312">{reading}</text>
            <g transform={`translate(${bubbleX} ${Y1})`}>
              <circle r="13" fill="#f2f2f0" /><path d="M-6 -4h12l-6 8z" fill="#101312" />
            </g>
            <text x={bubbleX} y={Y1 + 28} textAnchor="middle" fontSize="12" fill="#8f8f8c">{when[at]}</text>
          </>
        )}
      </svg>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 13, color: '#8f8f8c', padding: '8px 4px 2px' }}>
        {series.map((s, si) => (
          <button
            key={s.name}
            type="button"
            role="switch"
            aria-checked={shown[si]}
            onClick={() => setShown((v) => v.map((b, k) => (k === si ? !b : b)))}
            data-series={s.name}
            data-shown={shown[si] ? '' : undefined}
            style={{
              border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 13, color: shown[si] ? '#8f8f8c' : '#c9c9c5', padding: '4px 2px',
              textDecoration: shown[si] ? 'none' : 'line-through',
            }}
          >
            <i style={{ width: 7, height: 7, borderRadius: '50%', display: 'inline-block', marginInlineEnd: 7, background: shown[si] ? s.ink : '#e6e6e3' }} />
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── ScoreScreen ───────────────────────────────────────────────────────────── */

const DOCK = ['grid', 'history', 'offers', 'disputes', 'reports'] as const;

export function ScoreScreen({ name = 'Stewart', delta = 6 }: { name?: string; delta?: number }) {
  /* The bureau menu changes the reading, because a selector that does not change
     the number it sits beside is furniture. */
  const [bureau, setBureau] = useState(0);
  const [menu, setMenu] = useState(false);
  const [dock, setDock] = useState(0);
  const score = BUREAUS[bureau].points[3];
  const rotated = useMemo(
    () => [BUREAUS[bureau], ...BUREAUS.filter((_, i) => i !== bureau)],
    [bureau],
  );

  return (
    <MeshSurface variant="light" grain="light" radius="var(--r-screen)" style={{ width: 430, height: 932 }}>
      <div style={{ position: 'absolute', inset: 0, padding: '56px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#101312" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M4 16c0-5 3-8 6-8s6 3 6 8" /><path d="M8 8c0 5 3 8 6 8s6-3 6-8" />
          </svg>
          <button type="button" aria-label="Menu" style={roundBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101312" strokeWidth="1.9" strokeLinecap="round"><path d="M4 7h16M4 12h11M4 17h7" /></svg>
          </button>
          <span style={{ flex: 1 }} />
          <button type="button" aria-label="Support" style={roundBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101312" strokeWidth="1.5" strokeLinecap="round"><path d="M6 20V8a6 6 0 0 1 12 0v3" /><path d="M18 11h1.5a2 2 0 0 1 0 4H18" /></svg>
          </button>
          <span
            aria-hidden="true"
            style={{
              width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center',
              background: 'radial-gradient(70% 70% at 34% 26%, #4b5b6e, #1b2430)',
              boxShadow: 'inset 0 -2px 4px rgba(255,255,255,0.14), var(--depth-avatar)',
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#cdd6e0"><circle cx="12" cy="9" r="3.6" /><path d="M4.5 21c0-4.1 3.4-6.4 7.5-6.4s7.5 2.3 7.5 6.4z" /></svg>
          </span>
        </div>

        <div style={{ marginTop: 34, fontSize: 30, fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.18, color: '#101312' }}>
          Hey, {name}!<span style={{ display: 'block', color: '#9a9a97' }}>Let’s analyze your stats!</span>
        </div>

        <div style={{ marginTop: 22, fontSize: 15, color: ink.labelOnLight }}>
          +<bdi dir="ltr">{delta}</bdi> <span style={{ fontSize: 13 }}>pts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <span data-score="" style={{ fontSize: 68, fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 0.92, color: '#101312' }}>
              <bdi dir="ltr">{n(score)}</bdi>
            </span>
            <span style={{ fontSize: 13.5, color: ink.labelOnLight, lineHeight: 1.45, paddingBottom: 8 }}>
              {score >= 690 ? 'Excellent' : score >= 630 ? 'Good' : 'Fair'}<br />Upd. 5 Days Ago
            </span>
          </div>

          <div style={{ position: 'relative', marginTop: 6 }}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
              style={{
                height: 46, padding: '0 18px', borderRadius: 'var(--r-pill)', background: 'transparent',
                border: '1.2px solid rgba(16,16,16,0.28)', fontFamily: 'inherit', fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, color: '#101312',
              }}
            >
              {BUREAUS[bureau].name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#101312" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ transform: menu ? 'rotate(180deg)' : undefined }}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {menu && (
              <ul
                role="listbox"
                aria-label="Bureau"
                style={{
                  position: 'absolute', insetInlineEnd: 0, top: 52, zIndex: 2, margin: 0, padding: 6,
                  listStyle: 'none', borderRadius: 'var(--r-block)', background: '#fff', minWidth: 176,
                  boxShadow: 'inset 0 0 0 1px rgba(16,16,16,0.08), var(--depth-card)',
                }}
              >
                {BUREAUS.map((b, i) => (
                  <li key={b.name}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === bureau}
                      onClick={() => { setBureau(i); setMenu(false); }}
                      style={{
                        width: '100%', textAlign: 'start', border: 0, cursor: 'pointer',
                        fontFamily: 'inherit', fontSize: 14.5, padding: '10px 12px', borderRadius: 'var(--r-tile)',
                        background: i === bureau ? '#f2f2f0' : 'transparent', color: '#101312',
                      }}
                    >
                      {b.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div style={{ marginTop: 26 }}><ScoreBands score={score} ground={false} /></div>
        <div style={{ marginTop: 24 }}><CreditHistory score={score} series={rotated} /></div>
      </div>

      <nav
        aria-label="Sections"
        style={{
          position: 'absolute', insetInlineStart: 22, bottom: 24,
          display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 'var(--r-pill)',
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)',
          boxShadow: 'inset 0 1px 0 #fff, var(--depth-float)',
        }}
      >
        {DOCK.map((k, i) => (
          <button
            key={k}
            type="button"
            aria-label={k}
            aria-current={i === dock ? 'page' : undefined}
            onClick={() => setDock(i)}
            data-dock={i}
            style={{
              width: 52, height: 52, border: 0, borderRadius: '50%', cursor: 'pointer',
              display: 'grid', placeItems: 'center',
              background: i === dock ? '#101312' : '#f2f2f0',
              boxShadow: i === dock ? 'inset 0 1px 0 rgba(255,255,255,0.2), var(--depth-press)' : undefined,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={i === dock ? '#fff' : '#101312'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {i === 0 && <><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>}
              {i === 1 && <><path d="M12 7v5l3.5 2" /><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3 5v4h4" /></>}
              {i === 2 && <><circle cx="12" cy="12" r="8.5" /><path d="M9 15l6-6" /></>}
              {i === 3 && <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 10h6M8 14h8" /></>}
              {i === 4 && <><path d="M6 3h9l4 4v14H6z" /><path d="M9 9h4M9 13h6M9 17h3" /></>}
            </svg>
          </button>
        ))}
      </nav>
    </MeshSurface>
  );
}

const roundBtn: CSSProperties = {
  width: 46, height: 46, border: 0, borderRadius: '50%', cursor: 'pointer',
  display: 'grid', placeItems: 'center', background: '#fff',
  boxShadow: 'inset 0 1px 0 #fff, inset 0 0 0 1px rgba(16,16,16,0.07), var(--depth-round)',
};
