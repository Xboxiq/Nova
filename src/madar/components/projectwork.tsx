import { useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { move, n } from './roving';

/* ────────────────────────────────────────────────────────────────────────
   Projectwork — two project boards that are one grammar in two keys.

   The batch carries a dark violet engineering board and a light learning hub,
   and they look like different products until you measure them: both count work
   in tracks, both mark the *reached* part of a track solid and the rest hatched,
   both put exactly one row or card in an inverted plate to say "this is the
   one you are on", and both derive a percentage from a pair of counts rather
   than printing it.

   That is why they share a file. The difference between them is a ground and an
   accent, held as two named keys, and every component here takes the key rather
   than a colour — so the light twin cannot drift into a third palette the way
   the previous batch's off-whites did.

   What is *not* here, deliberately:

     · a kanban board. `collections.tsx` already has `KanbanBoard` with drag
       between columns; the reference's version differs in having coloured lane
       headers and a richer card, which is a card and a header, not a board. So
       `TaskCard` is new and the board is the one that already exists.
     · a progress donut. `boards.tsx` has `SplitDonut`, and its `hatch` slice
       kind already means what the learning hub's In-Progress segment means.
     · a calendar and a file tree. `CalendarMonth` and `TreeView` are in
       `collections.tsx` and the reference asks nothing of them that they do not
       already do.
──────────────────────────────────────────────────────────────────────── */

export type Key = 'dark' | 'light';

/* One palette entry per key, and every component reads its colours from here.
   Eleven off-whites in one file is what happens when each component picks its
   own; two keys of five named roles is the fix. */
const KEYS = {
  dark: {
    ground: '#171226',
    plate: '#211a35',
    raised: '#2b2242',
    ink: '#f4f2fb',
    label: 'rgba(244,242,251,0.6)',
    /* Not `#8b5cf6` and not `#7c3aed`. Rule 04 of the slop standard bans exactly
       five hexes — the tailwind violets — because they are the ones reached for
       by default, and it was right to flag both of my first two guesses at the
       reference's accent. The reference is a purple board and stays one; what it
       does not have to be is the default purple. This value also clears 6.2:1
       under white, which the lighter one did not. */
    accent: '#6d3ce0',
    accentInk: '#ffffff',
    line: 'rgba(244,242,251,0.12)',
  },
  light: {
    ground: '#efedfa',
    plate: '#ffffff',
    raised: '#ebe9f6',
    ink: '#1c1a2e',
    label: 'rgba(28,26,46,0.7)',
    accent: '#5b4bea',
    accentInk: '#ffffff',
    line: 'rgba(28,26,46,0.1)',
  },
} as const;

const HATCH = (line: string, gap: string) =>
  `repeating-linear-gradient(var(--hatch-angle), ${line} 0 3px, ${gap} 3px 7px)`;

/* The four bands of the velocity arc and the three states of a lane, named once.
   The reference uses these same four hues for the gauge and for the lane pills,
   which is the whole reason the two read as one product. */
const BANDS = [
  { key: 'done', label: 'Done', hex: '#3fbf8f', on: { dark: '#6fe0b4', light: '#0f6b4c' } },
  { key: 'review', label: 'In review', hex: '#4a9bf0', on: { dark: '#93c4fb', light: '#1c5aa8' } },
  { key: 'progress', label: 'In progress', hex: '#f0a93f', on: { dark: '#ffcd7d', light: '#7a4a00' } },
  { key: 'blocked', label: 'Blocked', hex: '#ef5f7a', on: { dark: '#ffa3b4', light: '#a01230' } },
] as const;

export type BandKey = (typeof BANDS)[number]['key'];

/* ═══════════════════════════════════════════════════════════════════════════
   TimeSheet — the leaderboard, with the leader in the accent plate
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Member { name: string; role: string; hours: number }

const TEAM: Member[] = [
  { name: 'Galler White', role: 'Product design', hours: 38.5 },
  { name: 'Ana Moreno', role: 'Frontend', hours: 34 },
  { name: 'Dev Raman', role: 'Backend', hours: 31.5 },
  { name: 'Iris Chen', role: 'QA', hours: 27 },
];

const PERIODS = ['This week', 'This month', 'This quarter'] as const;

export function TimeSheet({ team = TEAM, tone = 'dark' }: { team?: Member[]; tone?: Key }) {
  const k = KEYS[tone];
  const [period, setPeriod] = useState(0);
  const [by, setBy] = useState<'hours' | 'name'>('hours');

  /* The multiplier is the period made honest: a month is not a week with a
     different caption, so switching it has to change the numbers. */
  const scale = [1, 4.2, 12.6][period];
  const rows = useMemo(() => {
    const scaled = team.map((m) => ({ ...m, hours: Math.round(m.hours * scale * 10) / 10 }));
    return by === 'hours'
      ? [...scaled].sort((a, b) => b.hours - a.hours)
      : [...scaled].sort((a, b) => a.name.localeCompare(b.name));
  }, [team, scale, by]);

  const top = Math.max(...rows.map((r) => r.hours));

  return (
    <section
      data-timesheet={by}
      style={{
        borderRadius: 'var(--r-sheet)',
        padding: 22,
        background: k.ground,
        color: k.ink,
        border: `1px solid ${k.line}`,
        boxShadow: 'var(--depth-card)',
        width: '100%',
        maxWidth: 400,
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Time Sheet</h3>
        <button
          type="button"
          data-period={period}
          onClick={() => setPeriod((period + 1) % PERIODS.length)}
          aria-label={`Period: ${PERIODS[period]}. Activate to change.`}
          style={{
            appearance: 'none',
            cursor: 'pointer',
            fontSize: 12,
            padding: '5px 12px',
            borderRadius: 'var(--r-pill)',
            background: k.raised,
            color: k.label,
            border: `1px solid ${k.line}`,
          }}
        >
          {PERIODS[period]}
        </button>
      </header>

      <div style={{ display: 'flex', gap: 8, margin: '14px 0 10px' }}>
        {(['hours', 'name'] as const).map((s) => (
          <button
            key={s}
            type="button"
            data-sortby={s}
            aria-pressed={by === s}
            onClick={() => setBy(s)}
            style={{
              appearance: 'none',
              cursor: 'pointer',
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 'var(--r-pill)',
              border: `1px solid ${by === s ? 'transparent' : k.line}`,
              background: by === s ? k.accent : 'transparent',
              color: by === s ? k.accentInk : k.label,
            }}
          >
            {s === 'hours' ? 'By hours' : 'By name'}
          </button>
        ))}
      </div>

      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {rows.map((m, i) => {
          /* The leader gets the accent plate — but only when the list is ordered
             by hours. Sorted by name, the first row is not the leader, and a
             plate that stayed put would be decorating the wrong person. */
          const lead = by === 'hours' && i === 0;
          return (
            <li
              key={m.name}
              data-member={lead ? 'lead' : 'row'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 14px',
                borderRadius: 'var(--r-block)',
                background: lead ? k.accent : k.plate,
                color: lead ? k.accentInk : k.ink,
                border: `1px solid ${lead ? 'transparent' : k.line}`,
              }}
            >
              <span style={{ fontSize: 12, opacity: lead ? 0.9 : 0.72, width: 14 }}>{i + 1}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>
                  {m.name} {lead && <span aria-hidden="true">🎉</span>}
                </span>
                <span style={{ display: 'block', fontSize: 11, opacity: lead ? 0.9 : 0.72 }}>{m.role}</span>
              </span>
              <span style={{ textAlign: 'end' }}>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>
                  <bdi dir="ltr">{n(m.hours, 1)}h</bdi>
                </span>
                {/* the share of the leader's hours, drawn — the bar is why the
                    list is a leaderboard and not four sentences */}
                <span aria-hidden="true" style={{ display: 'block', width: 56, height: 3, marginTop: 4, borderRadius: 'var(--r-pill)', background: lead ? 'rgba(255,255,255,0.3)' : k.raised }}>
                  <span style={{ display: 'block', height: '100%', width: `${(m.hours / top) * 100}%`, borderRadius: 'var(--r-pill)', background: lead ? k.accentInk : k.accent }} />
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ArcGauge — the velocity arc, four bands, and one of them read
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Band { key: BandKey; points: number }

const VELOCITY: Band[] = [
  { key: 'done', points: 21 },
  { key: 'review', points: 12 },
  { key: 'progress', points: 21 },
  { key: 'blocked', points: 33.29 },
];

/**
 * The reference prints "87.29" and "24%" on one dial, and the only way those two
 * numbers belong together is if the percentage is one band's share of the total.
 * So the total is the sum and the reading is `band / total` — pick a different
 * band and both the arc's highlight and the percentage move. Passing either as a
 * prop would let the dial disagree with itself.
 */
export function ArcGauge({
  bands = VELOCITY,
  tone = 'dark',
  size = 208,
}: {
  bands?: Band[];
  tone?: Key;
  size?: number;
}) {
  const k = KEYS[tone];
  const [at, setAt] = useState(3);
  const strip = useRef<HTMLDivElement>(null);

  const total = bands.reduce((t, b) => t + b.points, 0);
  const share = (bands[at].points / total) * 100;

  /* A 240° arc, opening at the bottom, drawn as one circle per band with a dash
     offset — no path arithmetic, and the gap between bands is a dash gap. */
  const R = size / 2 - 14;
  const C = 2 * Math.PI * R;
  const SWEEP = 0.667; // 240 of 360
  let run = 0;
  const arcs = bands.map((b) => {
    const len = (b.points / total) * C * SWEEP;
    const seg = { key: b.key, len: Math.max(0, len - 4), offset: run };
    run += len;
    return seg;
  });

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, at, bands.length);
    if (to === null) return;
    e.preventDefault();
    setAt(to);
    strip.current?.querySelectorAll<HTMLButtonElement>('[data-band-pick]')[to]?.focus();
  };

  return (
    <section
      data-gauge={bands[at].key}
      style={{
        borderRadius: 'var(--r-sheet)',
        padding: 22,
        background: k.ground,
        color: k.ink,
        border: `1px solid ${k.line}`,
        boxShadow: 'var(--depth-card)',
        display: 'grid',
        justifyItems: 'center',
        gap: 12,
        width: '100%',
        maxWidth: 300,
      }}
    >
      <header style={{ width: '100%' }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Sprint Velocity</h3>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: k.label }}>
          <bdi dir="ltr">{bands.length} bands · {n(total, 2)} points</bdi>
        </p>
      </header>

      {/* The arc is a 240° sweep, so the drawing is 208 tall and the visible arc is
          not. Cropping the box to the arc is what puts the legend under the dial
          instead of a hand's width below it — and the overflow has to be hidden
          and the drawing has to refuse the pointer, because an aria-hidden
          decoration overlapping a control silently eats the click. That was
          measured: the second legend pill did nothing until this line existed. */}
      <div style={{ position: 'relative', width: size, height: size * 0.78, overflow: 'hidden' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true"
          style={{ display: 'block', transform: 'rotate(150deg)', pointerEvents: 'none' }}>
          {/* butt, not round: a rounded track cap sticks out past the first and last
              band as a dark blob on the arc's ends */}
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={k.raised} strokeWidth="12"
            strokeDasharray={`${C * SWEEP} ${C}`} strokeLinecap="butt" />
          {arcs.map((a, i) => (
            <circle
              key={a.key}
              cx={size / 2}
              cy={size / 2}
              r={R}
              fill="none"
              stroke={BANDS.find((b) => b.key === a.key)!.hex}
              strokeWidth={i === at ? 18 : 12}
              strokeLinecap="butt"
              strokeDasharray={`${a.len} ${C}`}
              strokeDashoffset={-a.offset}
              /* No opacity. Dimming the unselected bands to 0.5 read as four muddy
                 colours instead of four; the selected band is thicker, and that is
                 the whole difference the reference draws. */
              style={{ transition: 'stroke-width 220ms' }}
            />
          ))}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <b style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.03em' }}>
            <bdi dir="ltr">{n(bands[at].points, 2)}</bdi>
          </b>
          <span data-share="" style={{ fontSize: 13, color: k.label }}>
            <bdi dir="ltr">{Math.round(share)}% of sprint</bdi>
          </span>
        </div>
      </div>

      <div ref={strip} role="radiogroup" aria-label="Velocity band" onKeyDown={key}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, width: '100%' }}>
        {bands.map((b, i) => {
          const meta = BANDS.find((x) => x.key === b.key)!;
          const on = i === at;
          return (
            <button
              key={b.key}
              type="button"
              data-band-pick={b.key}
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setAt(i)}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 11,
                padding: '5px 10px',
                borderRadius: 'var(--r-pill)',
                border: `1px solid ${on ? meta.hex : k.line}`,
                background: on ? k.raised : 'transparent',
                color: on ? k.ink : k.label,
              }}
            >
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: meta.hex }} />
              {meta.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TaskCard — the card the reference's lanes are full of
   ═══════════════════════════════════════════════════════════════════════════ */

export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  due: string;
  who: string[];
  priority: Priority;
  subtasks: string[];
  file?: string;
  band: BandKey;
  /** How far along, 0–100. It is data, not a position in a list: the first draft
      derived it from the row index, which is an invented number wearing a percent
      sign — exactly what the rest of this file refuses. */
  progress: number;
}

const PRIORITY_HUE: Record<Priority, string> = {
  Low: '#3fbf8f',
  Medium: '#f0a93f',
  High: '#ef5f7a',
};

/* A coloured chip is either a solid with dark ink or a tint with darkened ink;
   it cannot be a tint with the ink at full hue, which is what this was. The
   three hues all clear 5.4:1 against the dark ground, so one ink serves all
   three and both keys. */
const CHIP_INK = KEYS.dark.ground;

export function TaskCard({
  task,
  tone = 'dark',
  active = false,
  onMove,
  tabIndex = 0,
}: {
  task: Task;
  tone?: Key;
  active?: boolean;
  onMove?: () => void;
  tabIndex?: number;
}) {
  const k = KEYS[tone];
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<number[]>([]);
  const hue = PRIORITY_HUE[task.priority];

  /* The "2 subtasks" chip in the reference is a count. Here it is the count of
     what is left, so ticking one changes it — a chip that printed the total
     would be a label pretending to be a reading. */
  const left = task.subtasks.length - done.length;

  return (
    <article
      data-task={task.id}
      data-active={active ? '' : undefined}
      style={{
        borderRadius: 'var(--r-block)',
        padding: 14,
        background: active ? k.ground : k.plate,
        color: active ? k.ink : tone === 'dark' ? k.ink : KEYS.light.ink,
        border: `1px solid ${active ? 'transparent' : k.line}`,
        boxShadow: active ? 'var(--depth-float)' : 'var(--depth-hairline)',
        display: 'grid',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <h4 style={{ margin: 0, flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>{task.title}</h4>
        {onMove && (
          <button
            type="button"
            data-advance={task.id}
            tabIndex={tabIndex}
            onClick={onMove}
            aria-label={`Move “${task.title}” to the next lane`}
            style={{
              appearance: 'none',
              cursor: 'pointer',
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `1px solid ${k.line}`,
              background: 'transparent',
              color: k.label,
              fontSize: 13,
              lineHeight: 1,
            }}
          >
            ›
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 11, color: k.label }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <rect x="1" y="2.5" width="12" height="10.5" rx="1.6" />
            <path d="M1 6h12M4.5 1v3M9.5 1v3" />
          </svg>
          <bdi dir="ltr">{task.due}</bdi>
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 8px',
            borderRadius: 'var(--r-pill)',
            background: hue,
            color: CHIP_INK,
            fontWeight: 500,
          }}
        >
          <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
            <path d="M1 0h1v11H1zM2 1h6l-1.4 2L8 5H2z" />
          </svg>
          {task.priority} Priority
        </span>
        <button
          type="button"
          data-subtasks={task.id}
          aria-expanded={open}
          tabIndex={tabIndex}
          onClick={() => setOpen(!open)}
          style={{
            appearance: 'none',
            cursor: 'pointer',
            font: 'inherit',
            padding: '3px 8px',
            borderRadius: 'var(--r-pill)',
            border: `1px solid ${k.line}`,
            background: 'transparent',
            color: k.label,
          }}
        >
          <bdi dir="ltr">{left} subtask{left === 1 ? '' : 's'}</bdi>
        </button>
      </div>

      {open && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          {task.subtasks.map((s, i) => {
            const on = done.includes(i);
            return (
              <li key={s}>
                <button
                  type="button"
                  data-subtask={i}
                  role="switch"
                  aria-checked={on}
                  onClick={() => setDone(on ? done.filter((x) => x !== i) : [...done, i])}
                  style={{
                    appearance: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    textAlign: 'start',
                    font: 'inherit',
                    fontSize: 12,
                    padding: '6px 8px',
                    borderRadius: 'var(--r-lg)',
                    border: `1px solid ${k.line}`,
                    background: 'transparent',
                    color: on ? k.label : k.ink,
                    textDecoration: on ? 'line-through' : 'none',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 'var(--r-xs)',
                      border: `1px solid ${on ? k.accent : k.line}`,
                      background: on ? k.accent : 'transparent',
                    }}
                  />
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'flex' }}>
          {task.who.map((w, i) => (
            <span
              key={w}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                marginInlineStart: i ? -8 : 0,
                display: 'grid',
                placeItems: 'center',
                fontSize: 9,
                fontWeight: 600,
                color: k.accentInk,
                background: k.accent,
                border: `2px solid ${active ? k.ground : k.plate}`,
              }}
            >
              {w}
            </span>
          ))}
        </span>
        {task.file && (
          <span
            style={{
              marginInlineStart: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 10,
              padding: '4px 8px',
              borderRadius: 'var(--r-lg)',
              background: k.raised,
              color: k.label,
            }}
          >
            <span aria-hidden="true" style={{ width: 6, height: 9, borderRadius: 'var(--r-xs)', background: BANDS[1].hex }} />
            <bdi dir="ltr">{task.file}</bdi>
          </span>
        )}
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LaneBoard — three lanes, coloured heads, and cards that actually move
   ═══════════════════════════════════════════════════════════════════════════ */

const LANES: { key: BandKey; label: string }[] = [
  { key: 'progress', label: 'IN PROGRESS' },
  { key: 'review', label: 'READY TO DESIGN' },
  { key: 'done', label: 'FINAL REVIEW' },
];

const TASKS: Task[] = [
  { id: 't1', title: 'Fix Flexbox Layout', due: 'Jun 14', who: ['GW', 'AM'], priority: 'Medium', subtasks: ['Hover states', 'Focus ring'], file: 'feedback.fig', band: 'progress', progress: 87 },
  { id: 't2', title: 'Onboarding illustration set', due: 'Jun 17', who: ['IC'], priority: 'Low', subtasks: ['Three scenes'], band: 'progress', progress: 34 },
  { id: 't3', title: 'Billing empty states', due: 'Jun 12', who: ['DR', 'GW'], priority: 'High', subtasks: ['Copy pass', 'Icon', 'Dark key'], file: 'billing.fig', band: 'review', progress: 62 },
  { id: 't4', title: 'Release notes template', due: 'Jun 9', who: ['AM'], priority: 'Low', subtasks: ['Sign-off'], band: 'done', progress: 100 },
];

export function LaneBoard({ tasks = TASKS, tone = 'dark' }: { tasks?: Task[]; tone?: Key }) {
  const k = KEYS[tone];
  const [where, setWhere] = useState<Record<string, BandKey>>(
    Object.fromEntries(tasks.map((t) => [t.id, t.band])),
  );

  const advance = (id: string) => {
    const i = LANES.findIndex((l) => l.key === where[id]);
    setWhere({ ...where, [id]: LANES[Math.min(LANES.length - 1, i + 1)].key });
  };

  return (
    <div
      data-lanes={Object.values(where).join('-')}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 14,
        padding: 18,
        borderRadius: 'var(--r-sheet)',
        background: k.ground,
        border: `1px solid ${k.line}`,
        width: '100%',
      }}
    >
      {LANES.map((lane) => {
        const band = BANDS.find((b) => b.key === lane.key)!;
        const hue = band.hex;
        const mine = tasks.filter((t) => where[t.id] === lane.key);
        return (
          <section key={lane.key} data-lane={lane.key} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
            <h4
              style={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                fontSize: 10,
                letterSpacing: '0.08em',
                padding: '6px 12px',
                borderRadius: 'var(--r-pill)',
                background: `color-mix(in srgb, ${hue} 18%, transparent)`,
                color: band.on[tone],
              }}
            >
              {lane.label}
              <span data-lane-count="">{mine.length}</span>
            </h4>
            {mine.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                tone={tone}
                onMove={lane.key === LANES[LANES.length - 1].key ? undefined : () => advance(t.id)}
              />
            ))}
            {/* an empty lane is hatched, not blank: §15-b, counted but not
                realised — the column exists and holds nothing yet */}
            {!mine.length && (
              <p
                style={{
                  margin: 0,
                  padding: '18px 12px',
                  fontSize: 11,
                  textAlign: 'center',
                  color: k.label,
                  borderRadius: 'var(--r-block)',
                  border: `1px dashed ${k.line}`,
                  backgroundImage: HATCH(k.line, 'transparent'),
                }}
              >
                Nothing here yet
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   UploadFeed — the activity list with a transfer running through it
   ═══════════════════════════════════════════════════════════════════════════ */

export function UploadFeed({ tone = 'dark' }: { tone?: Key }) {
  const k = KEYS[tone];
  const [pct, setPct] = useState(43);
  const [running, setRunning] = useState(false);

  /* No timer. The reference shows 43% frozen in a screenshot, and a specimen
     that animates on its own is a thing a reader cannot inspect — so the step
     is a control, and the "running" state is what a real transfer would set.
     ponytail: a real upload would drive this from progress events; the ceiling
     is that nothing here talks to a network. */
  const step = () => {
    setRunning(true);
    setPct((p) => (p >= 100 ? 0 : Math.min(100, p + 19)));
  };

  const events: [string, string][] = [
    ['Galler White', 'moved Enhance Visual Feedback to Final Review'],
    ['Ana Moreno', 'commented on Billing empty states'],
    ['Dev Raman', 'opened a pull request'],
  ];

  return (
    <section
      data-feed={pct}
      style={{
        borderRadius: 'var(--r-sheet)',
        padding: 20,
        background: k.ground,
        color: k.ink,
        border: `1px solid ${k.line}`,
        width: '100%',
        maxWidth: 360,
        display: 'grid',
        gap: 14,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Activity</h3>

      <div style={{ borderRadius: 'var(--r-block)', padding: 12, background: k.plate, border: `1px solid ${k.line}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ fontSize: 12 }}><bdi dir="ltr">sprint-27-assets.zip</bdi></span>
          <span style={{ fontSize: 12, color: k.label }}><bdi dir="ltr">{pct}%</bdi></span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Upload progress"
          style={{ position: 'relative', height: 6, marginTop: 8, borderRadius: 'var(--r-pill)', overflow: 'hidden', background: k.raised }}
        >
          <span style={{ position: 'absolute', inset: 0, insetInlineStart: `${pct}%`, backgroundImage: HATCH(k.line, 'transparent') }} />
          <span style={{ position: 'absolute', insetInlineStart: 0, top: 0, height: '100%', width: `${pct}%`, borderRadius: 'var(--r-pill)', background: k.accent }} />
        </div>
        <button
          type="button"
          data-step=""
          onClick={step}
          style={{
            appearance: 'none',
            cursor: 'pointer',
            marginTop: 10,
            fontSize: 11,
            padding: '5px 12px',
            borderRadius: 'var(--r-pill)',
            border: `1px solid ${k.line}`,
            background: 'transparent',
            color: k.label,
          }}
        >
          {running && pct >= 100 ? 'Start again' : running ? 'Continue' : 'Resume upload'}
        </button>
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
        {events.map(([who, what]) => (
          <li key={what} style={{ display: 'flex', gap: 10, fontSize: 12, color: k.label }}>
            <span
              aria-hidden="true"
              style={{ width: 24, height: 24, flex: '0 0 auto', borderRadius: '50%', background: k.raised, display: 'grid', placeItems: 'center', fontSize: 9, color: k.ink }}
            >
              {who.split(' ').map((x) => x[0]).join('')}
            </span>
            <span><b style={{ color: k.ink, fontWeight: 600 }}>{who}</b> {what}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   The learning hub — the same grammar in the light key
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Course {
  name: string;
  done: number;
  of: number;
  from: string;
  to: string;
  weeks: [number, number];
}

export const COURSES: Course[] = [
  { name: 'Backend Development', done: 16, of: 28, from: '#7b4de8', to: '#4a9bf0', weeks: [0, 4] },
  { name: 'Design Systems', done: 9, of: 15, from: '#3fbf8f', to: '#4a9bf0', weeks: [1, 5] },
  { name: 'Data Foundations', done: 3, of: 22, from: '#f0a93f', to: '#ef5f7a', weeks: [3, 6] },
];

/** A card whose percentage is `done / of`, so the two lines cannot disagree. */
export function CourseCard({
  course,
  on,
  onPick,
  tabIndex,
}: {
  course: Course;
  on: boolean;
  onPick: () => void;
  tabIndex: number;
}) {
  const pct = Math.round((course.done / course.of) * 100);
  return (
    <button
      type="button"
      data-course={course.name}
      role="radio"
      aria-checked={on}
      tabIndex={tabIndex}
      onClick={onPick}
      style={{
        appearance: 'none',
        cursor: 'pointer',
        textAlign: 'start',
        padding: 6,
        borderRadius: 'var(--r-sheet)',
        border: 'none',
        background: `linear-gradient(var(--sheen), ${course.from} 0%, ${course.to} 100%)`,
        /* Not opacity. Fading the card to 0.66 greyed out the plate the card exists
           to carry, and greyed the gradient with it — three washed cards instead of
           three saturated ones with a mark on the chosen one. */
        boxShadow: on ? 'var(--depth-float), 0 0 0 2px ' + KEYS.light.accent : 'var(--depth-hairline)',
        transition: 'box-shadow 220ms',
      }}
    >
      {/* the dark inner plate: the reference's gradient cards all carry one, and
          it is what makes the reading legible on a saturated ground instead of
          fighting it */}
      <span style={{ display: 'block', padding: '14px 16px', borderRadius: 'var(--r-block)', background: KEYS.dark.ground, color: KEYS.dark.ink }}>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{course.name}</span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <b style={{ fontSize: 22, fontWeight: 600 }}><bdi dir="ltr">{pct}%</bdi></b>
          <span style={{ fontSize: 11, color: KEYS.dark.label }}>
            <bdi dir="ltr">{course.done}/{course.of} lessons</bdi>
          </span>
        </span>
        <span aria-hidden="true" style={{ display: 'block', height: 4, marginTop: 10, borderRadius: 'var(--r-pill)', background: KEYS.dark.raised, overflow: 'hidden' }}>
          <span style={{ display: 'block', height: '100%', width: `${pct}%`, borderRadius: 'var(--r-pill)', background: `linear-gradient(90deg, ${course.from} 0%, ${course.to} 100%)` }} />
        </span>
        <span style={{ display: 'block', marginTop: 8, fontSize: 11, color: KEYS.dark.label }}>
          <bdi dir="ltr">{course.of - course.done} lessons left</bdi>
        </span>
      </span>
    </button>
  );
}

/**
 * The gantt. Its empty track is hatched for the same reason the empty lane and
 * the unreached half of a plan are: counted, not realised. Twelve weeks of an
 * empty row drawn blank is a row that looks like it does not exist.
 */
export function TrackGantt({
  courses = COURSES,
  weeks = 8,
  pick,
  onPick,
}: {
  courses?: Course[];
  weeks?: number;
  pick?: number;
  onPick?: (i: number) => void;
}) {
  const k = KEYS.light;
  const [own, setOwn] = useState(0);
  const at = pick ?? own;
  const list = useRef<HTMLDivElement>(null);

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, at, courses.length);
    if (to === null) return;
    e.preventDefault();
    setOwn(to);
    onPick?.(to);
    list.current?.querySelectorAll<HTMLButtonElement>('[data-gantt-row]')[to]?.focus();
  };

  return (
    <section
      data-gantt={at}
      style={{
        borderRadius: 'var(--r-sheet)',
        padding: 20,
        background: k.plate,
        color: k.ink,
        border: `1px solid ${k.line}`,
        boxShadow: 'var(--depth-card)',
        width: '100%',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>My Schedule</h3>
        <span style={{ fontSize: 11, color: k.label }}><bdi dir="ltr">{weeks} weeks</bdi></span>
      </header>

      <div ref={list} role="radiogroup" aria-label="Schedule track" onKeyDown={key} style={{ display: 'grid', gap: 8, marginTop: 14 }}>
        {courses.map((c, i) => {
          const on = i === at;
          const [from, to] = c.weeks;
          return (
            <button
              key={c.name}
              type="button"
              data-gantt-row={i}
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              aria-label={`${c.name}: weeks ${from + 1} to ${to + 1} of ${weeks}`}
              onClick={() => { setOwn(i); onPick?.(i); }}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: 'minmax(96px, 1fr) 2.4fr',
                alignItems: 'center',
                gap: 12,
                padding: 6,
                borderRadius: 'var(--r-block)',
                border: `1px solid ${on ? k.accent : 'transparent'}`,
                background: on ? k.raised : 'transparent',
                color: 'inherit',
                font: 'inherit',
                textAlign: 'start',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: on ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
              <span
                style={{
                  position: 'relative',
                  height: 22,
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  backgroundImage: HATCH(k.line, 'transparent'),
                  border: `1px solid ${k.line}`,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    insetInlineStart: `${(from / weeks) * 100}%`,
                    width: `${((to - from + 1) / weeks) * 100}%`,
                    borderRadius: 'var(--r-lg)',
                    background: `linear-gradient(90deg, ${c.from} 0%, ${c.to} 100%)`,
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** My Tasks: exactly one card is inverted, and it is the one you selected. */
export function TaskLane({ tasks = TASKS, tone = 'light' }: { tasks?: Task[]; tone?: Key }) {
  const k = KEYS[tone];
  const [at, setAt] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, at, tasks.length);
    if (to === null) return;
    e.preventDefault();
    setAt(to);
    list.current?.querySelectorAll<HTMLButtonElement>('[data-pick-task]')[to]?.focus();
  };

  return (
    <section
      data-tasklane={at}
      style={{
        borderRadius: 'var(--r-sheet)',
        padding: 20,
        background: k.plate,
        color: k.ink,
        border: `1px solid ${k.line}`,
        boxShadow: 'var(--depth-card)',
        width: '100%',
        maxWidth: 360,
        display: 'grid',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>My Tasks</h3>
      <div ref={list} role="radiogroup" aria-label="My tasks" onKeyDown={key} style={{ display: 'grid', gap: 10 }}>
        {tasks.map((t, i) => {
          const on = i === at;
          const pct = t.progress;
          return (
            <button
              key={t.id}
              type="button"
              data-pick-task={i}
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setAt(i)}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                textAlign: 'start',
                font: 'inherit',
                display: 'grid',
                gap: 8,
                padding: '13px 15px',
                borderRadius: 'var(--r-block)',
                background: on ? KEYS.dark.ground : 'transparent',
                color: on ? KEYS.dark.ink : k.ink,
                border: `1px solid ${on ? 'transparent' : k.line}`,
                boxShadow: on ? 'var(--depth-float)' : 'none',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</span>
                <span style={{ fontSize: 12, opacity: 0.72 }}><bdi dir="ltr">{pct}%</bdi></span>
              </span>
              <span
                aria-hidden="true"
                style={{ display: 'block', height: 4, borderRadius: 'var(--r-pill)', overflow: 'hidden', background: on ? KEYS.dark.raised : k.raised }}
              >
                <span style={{ display: 'block', height: '100%', width: `${pct}%`, borderRadius: 'var(--r-pill)', background: on ? KEYS.dark.accent : k.accent }} />
              </span>
              <span style={{ fontSize: 11, opacity: 0.72 }}><bdi dir="ltr">{pct}% complete · {t.due}</bdi></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** The hub, assembled — a course drives the schedule, which is the point of it. */
export function LearnHub({ courses = COURSES }: { courses?: Course[] }) {
  const [pick, setPick] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const k = KEYS.light;

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, pick, courses.length);
    if (to === null) return;
    e.preventDefault();
    setPick(to);
    row.current?.querySelectorAll<HTMLButtonElement>('[data-course]')[to]?.focus();
  };

  return (
    <div data-hub={pick} style={{ display: 'grid', gap: 16, padding: 20, borderRadius: 'var(--r-screen)', background: k.ground, width: '100%' }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: k.ink }}>My courses</h3>
      {/* auto-fill, not auto-fit: with three cards in a two-up row, auto-fit
          stretches the odd one to the full width and it stops reading as a peer */}
      <div ref={row} role="radiogroup" aria-label="Course" onKeyDown={key}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {courses.map((c, i) => (
          <CourseCard key={c.name} course={c} on={i === pick} tabIndex={i === pick ? 0 : -1} onPick={() => setPick(i)} />
        ))}
      </div>
      <TrackGantt courses={courses} pick={pick} onPick={setPick} />
    </div>
  );
}

export function bandLegend(): ReactNode {
  return (
    <span style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', fontSize: 11 }}>
      {BANDS.map((b) => (
        <span key={b.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: b.hex }} />
          {b.label}
        </span>
      ))}
    </span>
  );
}
