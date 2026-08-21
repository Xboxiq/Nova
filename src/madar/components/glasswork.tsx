import { useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { MeshSurface, ink } from './mesh';
import { move, smooth } from './roving';

/* ────────────────────────────────────────────────────────────────────────
   Glasswork — the two reference families whose whole subject is one pane.

   One of the reference slides in this batch is not a design. It is the recipe,
   with the numbers written on the artboard: Background Blur 20 · White Stroke
   35% · Soft Shadow Y:8 Blur:30 12% · Top Highlight 1px White · Inner Shadow
   0/1/8 20% · Transparent Fill 25%. Being handed the numbers is the reason this
   file exists as a file: two unrelated products in the batch — a legal
   compliance app on an emerald field, a hydration tracker on an aqua one — are
   the *same pane* over different grounds, and if the recipe were typed at each
   use site the two would drift apart within a week of edits.

   So the recipe is five tokens in `bridge.css` and one function here, and the
   two families differ only in what stands behind the glass. That is also the
   answer to why `pane()` is not `glass()` from `mesh.tsx`: `glass()` is a chip
   floating on the photographed mesh at blur 14 with a 24% stroke, tuned for a
   dark ground; this is the reference's own stated recipe, at blur 20 and a 35%
   stroke, and it has to stay legible over a pale one. Two panes, two jobs, both
   named — rather than one function with a flag nobody can read.

   Four things here are derived rather than passed, because a component that can
   be told a wrong number will be:

     · the folder's document count is the length of its sheet list,
     · the head count is the length of the avatar list,
     · the review track's marker position comes from the stage index,
     · the curve's peak, its reference line and the week's date range all come
       from the readings.
──────────────────────────────────────────────────────────────────────── */

/* ── the recipe ─────────────────────────────────────────────────────────────
   `lift` is the only knob: a pane resting on the ground keeps the stated soft
   shadow, a pane inside another pane drops it, because two stacked soft shadows
   read as smoke rather than as depth. */
export function pane(lift: 'rest' | 'flush' = 'rest'): CSSProperties {
  return {
    background: 'var(--pane-fill)',
    border: '1px solid var(--pane-stroke)',
    backdropFilter: 'blur(var(--pane-blur))',
    WebkitBackdropFilter: 'blur(var(--pane-blur))',
    boxShadow: [
      'inset 0 1px 0 var(--pane-highlight)',
      'inset 0 1px 8px var(--pane-inner)',
      lift === 'rest' ? 'var(--depth-pane)' : '',
    ].filter(Boolean).join(', '),
  };
}

const PANE_INK = '#0f2a1e';
/** The fan's pitch: less than a sheet's own height, so every sheet keeps a band
    of itself exposed and can be pressed. */
const FAN_PITCH = 54;
const PANE_LABEL = 'rgba(15,42,30,0.62)';

/* ═══════════════════════════════════════════════════════════════════════════
   DocFolder — the compliance poster: a glass folder with sheets fanned behind it
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Sheet { title: string; kind: string; pages: number }

const SHEETS: Sheet[] = [
  { title: 'MSA — TechNovate', kind: 'Contract', pages: 6 },
  { title: 'Audit Committee', kind: 'Minutes', pages: 4 },
  { title: 'GDPR Workshop', kind: 'Training', pages: 2 },
];

const TEAM = ['AK', 'RM', 'EC', 'JS'];

export function DocFolder({
  label = 'Compliance',
  sheets = SHEETS,
  team = TEAM,
  onPick,
}: {
  label?: string;
  sheets?: Sheet[];
  team?: string[];
  onPick?: (s: Sheet) => void;
}) {
  const [at, setAt] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const front = sheets[at];

  /* Not a passed total. The folder reads "12 Doc" in the reference, and the three
     sheets have to *add to twelve* for that to be a derivation rather than a
     coincidence — the first draft summed to 23 and printed 23, which is a
     component telling the truth about the wrong data. A folder that can be told a
     total it does not hold will eventually be told one. */
  const docs = sheets.reduce((t, s) => t + s.pages, 0);

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, at, sheets.length);
    if (to === null) return;
    e.preventDefault();
    setAt(to);
    onPick?.(sheets[to]);
    strip.current?.querySelectorAll<HTMLButtonElement>('[data-sheet]')[to]?.focus();
  };

  return (
    <MeshSurface
      variant="sage"
      radius="var(--r-screen)"
      glow
      data-folder=""
      style={{ padding: '46px 34px 34px', width: '100%', maxWidth: 430 }}
    >
      {/* the fan. Each sheet is a real control: pick one and it comes forward. */}
      <div
        ref={strip}
        role="radiogroup"
        aria-label={`${label} documents`}
        data-fan={at}
        onKeyDown={key}
        style={{ position: 'relative', height: FAN_PITCH * sheets.length, marginBottom: 22 }}
      >
        {sheets.map((s, i) => {
          const on = i === at;
          /* Selection is a lift, not a reordering. The first version raised the
             chosen sheet's z-index, which put it over the middle of every sheet
             behind it — so the back sheets were unclickable and the harness said
             so. Fanning at a fixed pitch below each card's own height leaves each
             one a band of itself to be pressed on, which is also the only way a
             hand can use it. */
          return (
            <button
              key={s.title}
              type="button"
              data-sheet={i}
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => { setAt(i); onPick?.(s); }}
              style={{
                position: 'absolute',
                insetInlineStart: 0,
                insetInlineEnd: 0,
                top: i * FAN_PITCH,
                zIndex: i,
                appearance: 'none',
                cursor: 'pointer',
                textAlign: 'start',
                display: 'block',
                width: '100%',
                padding: '14px 18px',
                borderRadius: 'var(--r-block)',
                color: PANE_INK,
                transform: on ? 'translateY(-6px)' : 'none',
                transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)',
                ...pane(on ? 'rest' : 'flush'),
                ...(on ? { borderColor: 'var(--sage-deep)' } : null),
              }}
            >
              {/* One line, not two. Two lines meant the fan's pitch clipped whichever
                   one sat at the bottom — first the title, then the page count. A
                   stacked card shows its tab, and the tab is the title with the
                   count that makes `12 Doc` a visible sum. The kind is already on
                   the folder card below, for the sheet that is selected. */}
              <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</span>
                <span style={{ fontSize: 12, color: PANE_LABEL }}><bdi dir="ltr">{s.pages} p</bdi></span>
              </span>
            </button>
          );
        })}
      </div>

      {/* the folder card itself */}
      <div style={{ borderRadius: 'var(--r-sheet)', padding: '20px 22px', color: PANE_INK, ...pane() }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <span style={{ display: 'flex' }}>
            {team.map((t, i) => (
              <span
                key={t}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  marginInlineStart: i ? -10 : 0,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#fff',
                  background: `linear-gradient(var(--sheen), var(--sage-mid) 0%, var(--sage-deep) 100%)`,
                  border: '2px solid var(--pane-highlight)',
                  boxShadow: 'var(--depth-avatar)',
                }}
              >
                {t}
              </span>
            ))}
            <span style={{ alignSelf: 'center', marginInlineStart: 10, fontSize: 13, color: PANE_LABEL }}>
              {team.length}
            </span>
          </span>
          <span data-folder-docs="" style={{ fontSize: 13, color: PANE_LABEL }}>
            <bdi dir="ltr"><b style={{ fontSize: 20, color: PANE_INK, fontWeight: 600 }}>{docs}</b> Doc</bdi>
          </span>
        </div>
        <div style={{ marginTop: 14, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>{label}</div>
        <div data-folder-front="" style={{ marginTop: 4, fontSize: 13, color: PANE_LABEL }}>{front.kind} · {front.title}</div>
      </div>
    </MeshSurface>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ReviewTrack — the half-dotted progress line with a triangle on it
   ═══════════════════════════════════════════════════════════════════════════ */

/* The reference draws this line half solid and half dotted, with a triangle
   where the two meet. It is the same distinction §15-b already makes for the
   hatch: solid is what happened, dotted is counted but not realised, and the
   marker is the seam. So the dotted half is not decoration and its position is
   not a style — it is `stage / (stages - 1)` and nothing else. */
export function ReviewTrack({ stages, at }: { stages: string[]; at: number }) {
  const pct = stages.length < 2 ? 0 : (at / (stages.length - 1)) * 100;
  return (
    <div data-track={at} style={{ position: 'relative', paddingTop: 12 }}>
      <div style={{ position: 'relative', height: 3, borderRadius: 'var(--r-pill)', background: 'rgba(15,42,30,0.14)' }}>
        <span
          style={{
            position: 'absolute',
            insetInlineStart: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            borderRadius: 'var(--r-pill)',
            background: 'var(--sage-deep)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetInlineStart: `${pct}%`,
            top: -4,
            width: 0,
            height: 0,
            borderInlineStart: '5px solid transparent',
            borderInlineEnd: '5px solid transparent',
            borderTop: '7px solid var(--sage-deep)',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: PANE_LABEL }}>
        {stages.map((s, i) => (
          <span key={s} style={{ fontWeight: i === at ? 600 : 400, color: i <= at ? PANE_INK : PANE_LABEL }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ComplianceScreen — the phone, glass over the emerald field
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Activity {
  org: string;
  stage: string;
  by: string;
  seen: boolean;
  at: string;
}

const ACTIVITY: Activity[] = [
  { org: 'TechNovate Solutions: MSA', stage: 'Legal Review', by: 'e.carter@aegis.legal', seen: true, at: '09:00 AM' },
  { org: 'Sample of Scanned Document', stage: 'Intake', by: 'e.carter@aegis.legal', seen: false, at: '10:20 AM' },
  { org: 'Audit Committee Review', stage: 'Internal Board', by: 'board@aegis.legal', seen: false, at: '02:15 PM' },
  { org: 'GDPR Staff Workshop', stage: 'Engineering Leads', by: 'training@aegis.legal', seen: true, at: '04:40 PM' },
];

const STAGES = ['Intake', 'Legal Review', 'Internal Board', 'Signed'];

export function ComplianceScreen({ activity = ACTIVITY }: { activity?: Activity[] }) {
  const [rows, setRows] = useState(activity);
  const [at, setAt] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const base = useId().replace(/:/g, '');

  /* Read is the count of what has actually been opened, so toggling an eye moves
     the header. A header that showed a constant would be a caption. */
  const seen = rows.filter((r) => r.seen).length;
  const row = rows[at];
  const stage = Math.max(0, STAGES.indexOf(row.stage));

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, at, rows.length);
    if (to === null) return;
    e.preventDefault();
    setAt(to);
    list.current?.querySelectorAll<HTMLButtonElement>('[data-activity]')[to]?.focus();
  };

  return (
    <MeshSurface
      variant="sage"
      radius="var(--r-screen)"
      data-compliance={at}
      style={{ width: 372, padding: 18, display: 'grid', gap: 14 }}
    >
      <header style={{ padding: '10px 8px 0', color: ink.strong }}>
        <div style={{ fontSize: 12, opacity: 0.78 }}>Compliance</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Recent activity</h3>
          <span data-seen="" style={{ fontSize: 12, opacity: 0.78 }}>
            {seen}/{rows.length} read
          </span>
        </div>
      </header>

      <div
        ref={list}
        role="radiogroup"
        aria-label="Recent activity"
        onKeyDown={key}
        style={{ display: 'grid', gap: 10 }}
      >
        {rows.map((r, i) => {
          const on = i === at;
          return (
            <div
              key={r.org}
              style={{
                borderRadius: 'var(--r-sheet)',
                padding: 14,
                color: PANE_INK,
                ...pane(on ? 'rest' : 'flush'),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <button
                  type="button"
                  data-activity={i}
                  role="radio"
                  aria-checked={on}
                  aria-describedby={`${base}-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setAt(i)}
                  style={{
                    appearance: 'none',
                    background: 'none',
                    border: 0,
                    padding: 0,
                    flex: 1,
                    textAlign: 'start',
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                  }}
                >
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{r.org}</span>
                  <span id={`${base}-${i}`} style={{ display: 'block', marginTop: 3, fontSize: 12, color: PANE_LABEL }}>
                    {r.stage} · <bdi dir="ltr">{r.by}</bdi>
                  </span>
                </button>
                <button
                  type="button"
                  data-eye={i}
                  role="switch"
                  aria-checked={r.seen}
                  aria-label={`${r.org} — mark as read`}
                  onClick={() => setRows(rows.map((x, j) => (j === i ? { ...x, seen: !x.seen } : x)))}
                  style={{
                    appearance: 'none',
                    cursor: 'pointer',
                    width: 30,
                    height: 30,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    border: '1px solid var(--pane-stroke)',
                    background: r.seen ? 'var(--sage-deep)' : 'var(--pane-fill)',
                    color: r.seen ? '#fff' : PANE_LABEL,
                    boxShadow: r.seen ? 'none' : 'inset 0 1px 0 var(--pane-highlight)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M1 8s2.6-4.4 7-4.4S15 8 15 8s-2.6 4.4-7 4.4S1 8 1 8Z" />
                    <circle cx="8" cy="8" r="1.9" />
                  </svg>
                </button>
              </div>
              {on && <ReviewTrack stages={STAGES} at={stage} />}
            </div>
          );
        })}
      </div>

      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          borderRadius: 'var(--r-pill)',
          padding: '10px 16px',
          color: PANE_INK,
          ...pane(),
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600 }}>{row.stage}</span>
        <span data-when="" style={{ fontSize: 13, color: PANE_LABEL }}><bdi dir="ltr">{row.at}</bdi></span>
      </footer>
    </MeshSurface>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   The vitals family — the same pane over aqua, with the readings behind it
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Vital {
  key: string;
  label: string;
  unit: string;
  week: number[];
  /* Both stops stay pale, and the ink on them is dark. White on a mid-tone
     gradient is the one contrast failure no checker reports — axe skips a
     gradient background entirely — and it measured about 2:1 by hand at the light
     end. A gradient is legible under white only if *both* stops are dark, which
     these blobs are not; so the ink moved instead of the design. `line` is the
     saturated end of the same hue, for the stroke on a chart where there is no
     fill behind the mark. */
  from: string;
  to: string;
  line: string;
}

/* Three metrics, seven readings each: the curve, the peak day, the reference
   line and the headline number are all read off this and nothing else. */
export const VITALS: Vital[] = [
  { key: 'flasks', label: 'Flasks / Day', unit: 'mg', week: [11.4, 12.8, 14.1, 16.2, 15.3, 13.7, 12.1], from: '#a8ecd6', to: '#6fd0b4', line: '#12735c' },
  { key: 'h2', label: 'Mol. Hydrogen', unit: 'ppm', week: [3.1, 3.0, 2.9, 2.8, 2.8, 2.7, 2.9], from: '#d4c4fa', to: '#a98cf0', line: '#5b32b8' },
  { key: 'water', label: 'Water', unit: 'oz', week: [64, 70, 74, 76, 72, 68, 66], from: '#c6d9f9', to: '#8fb0ea', line: '#2f5aa8' },
];

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const WEEK = ['Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10', 'Jun 11', 'Jun 12'];

/** The reference's own arrow: up, down, or the flat dash for no change. */
function delta(week: number[], at: number) {
  if (at === 0) return { mark: '·', pct: 0 };
  const change = ((week[at] - week[at - 1]) / week[at - 1]) * 100;
  const pct = Math.round(Math.abs(change));
  return { mark: pct === 0 ? '·' : change > 0 ? '↑' : '↓', pct };
}

export function CurveCard({
  vital = VITALS[0],
  day: dayProp,
  onDay,
}: {
  vital?: Vital;
  day?: number;
  onDay?: (d: number) => void;
}) {
  const [own, setOwn] = useState(3);
  const day = dayProp ?? own;
  const strip = useRef<HTMLDivElement>(null);

  const W = 300;
  const H = 130;
  const geometry = useMemo(() => {
    const lo = Math.min(...vital.week);
    const hi = Math.max(...vital.week);
    const span = hi - lo || 1;
    const pts = vital.week.map((v, i) => ({
      x: 8 + (i * (W - 16)) / (vital.week.length - 1),
      y: H - 14 - ((v - lo) / span) * (H - 40),
    }));
    const mean = vital.week.reduce((t, v) => t + v, 0) / vital.week.length;
    return { pts, path: smooth(pts), meanY: H - 14 - ((mean - lo) / span) * (H - 40), mean };
  }, [vital]);

  const set = (to: number) => { setOwn(to); onDay?.(to); };
  const key = (e: KeyboardEvent) => {
    const to = move(e.key, day, DAYS.length);
    if (to === null) return;
    e.preventDefault();
    set(to);
    strip.current?.querySelectorAll<HTMLButtonElement>('[data-day]')[to]?.focus();
  };

  const d = delta(vital.week, day);
  const p = geometry.pts[day];

  return (
    <div
      data-curve={day}
      style={{ borderRadius: 'var(--r-sheet)', padding: 20, width: '100%', maxWidth: 340, color: PANE_INK, ...pane() }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ fontSize: 13, color: PANE_LABEL }}>{vital.label}</span>
        <span data-range="" style={{ fontSize: 12, color: PANE_LABEL }}>
          <bdi dir="ltr">{WEEK[0]} – {WEEK[WEEK.length - 1]}</bdi>
        </span>
      </div>
      <div data-reading="" style={{ marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <b style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.03em' }}>{vital.week[day]}</b>
        <span style={{ fontSize: 13, color: PANE_LABEL }}>{vital.unit}</span>
        <span style={{ fontSize: 12, color: d.mark === '·' ? PANE_LABEL : PANE_INK }}>
          <bdi dir="ltr">{d.mark}{d.pct ? `${d.pct}%` : ''}</bdi>
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img"
        aria-label={`${vital.label}: ${vital.week[day]} ${vital.unit} on ${WEEK[day]}, week average ${geometry.mean.toFixed(1)}`}
        style={{ display: 'block', marginTop: 8, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`${vital.key}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={vital.from} stopOpacity="0.5" />
            <stop offset="100%" stopColor={vital.from} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* the dotted reference line is the week's own mean — a line at a number
            nobody measured is scenery */}
        <line x1="0" y1={geometry.meanY} x2={W} y2={geometry.meanY}
          stroke={PANE_LABEL} strokeWidth="1" strokeDasharray="2 5" />
        <path d={`${geometry.path} L${W - 8} ${H} L8 ${H} Z`} fill={`url(#${vital.key}-fill)`} />
        <path d={geometry.path} fill="none" stroke={vital.line} strokeWidth="2.5" strokeLinecap="round" />
        <line x1={p.x} y1={p.y} x2={p.x} y2={H} stroke={vital.line} strokeWidth="1" strokeOpacity="0.4" />
        <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke={vital.line} strokeWidth="2.5" />
      </svg>

      <div
        ref={strip}
        role="radiogroup"
        aria-label={`${vital.label} — day`}
        onKeyDown={key}
        style={{ display: 'grid', gridTemplateColumns: `repeat(${DAYS.length}, 1fr)`, gap: 6, marginTop: 12 }}
      >
        {DAYS.map((label, i) => {
          const on = i === day;
          return (
            <button
              key={WEEK[i]}
              type="button"
              data-day={i}
              role="radio"
              aria-checked={on}
              aria-label={`${WEEK[i]}: ${vital.week[i]} ${vital.unit}`}
              tabIndex={on ? 0 : -1}
              onClick={() => set(i)}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                height: 34,
                borderRadius: 'var(--r-pill)',
                fontSize: 12,
                fontWeight: on ? 600 : 400,
                border: on ? '1px solid transparent' : '1px solid var(--pane-stroke)',
                background: on ? `linear-gradient(var(--sheen), ${vital.from} 0%, ${vital.to} 100%)` : 'var(--pane-fill)',
                color: PANE_INK,
                boxShadow: on ? 'var(--depth-blob)' : 'inset 0 1px 0 var(--pane-highlight)',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── BlobStat ───────────────────────────────────────────────────────────────
   The gradient pill. It is a radio, not a card: in the reference three of them
   sit in a row under one chart, and the only thing that arrangement can mean is
   that the chart shows the one you pick. */
export function BlobStat({
  vital,
  day,
  on,
  onPick,
  tabIndex,
}: {
  vital: Vital;
  day: number;
  on: boolean;
  onPick: () => void;
  tabIndex: number;
}) {
  const d = delta(vital.week, day);
  return (
    <button
      type="button"
      data-blob={vital.key}
      role="radio"
      aria-checked={on}
      tabIndex={tabIndex}
      onClick={onPick}
      style={{
        appearance: 'none',
        cursor: 'pointer',
        textAlign: 'start',
        padding: '14px 16px',
        borderRadius: 'var(--r-sheet)',
        border: '1px solid var(--pane-stroke)',
        color: PANE_INK,
        background: `linear-gradient(var(--sheen), ${vital.from} 0%, ${vital.to} 100%)`,
        /* §31: the mark is added, not subtracted. Fading the unpicked blobs to 0.72
           took the saturation out of the gradient they exist to be. */
        boxShadow: on
          ? 'inset 0 1px 0 var(--pane-highlight), var(--depth-blob)'
          : 'inset 0 1px 0 var(--pane-highlight)',
        outline: on ? '2px solid var(--sage-deep)' : 'none',
        outlineOffset: 2,
        transition: 'box-shadow 220ms',
      }}
    >
      <span style={{ display: 'block', fontSize: 12, color: PANE_LABEL }}>{vital.label}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
        <b style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{vital.week[day]}</b>
        <span style={{ fontSize: 12, color: PANE_LABEL }}>{vital.unit}</span>
        <span style={{ fontSize: 11, color: PANE_LABEL, marginInlineStart: 'auto' }}>
          <bdi dir="ltr">{d.mark}{d.pct ? `${d.pct}%` : ''}</bdi>
        </span>
      </span>
    </button>
  );
}

export function VitalsScreen({ vitals = VITALS }: { vitals?: Vital[] }) {
  const [pick, setPick] = useState(0);
  const [day, setDay] = useState(3);
  const [added, setAdded] = useState<string[]>([]);
  const row = useRef<HTMLDivElement>(null);

  const key = (e: KeyboardEvent) => {
    const to = move(e.key, pick, vitals.length);
    if (to === null) return;
    e.preventDefault();
    setPick(to);
    row.current?.querySelectorAll<HTMLButtonElement>('[data-blob]')[to]?.focus();
  };

  return (
    <MeshSurface
      variant="aqua"
      radius="var(--r-screen)"
      data-vitals={vitals[pick].key}
      style={{ width: 380, padding: 20, display: 'grid', gap: 14, justifyItems: 'center' }}
    >
      {/* The range is the card's, not the screen's. Both printing it was the same
          reading twice, three centimetres apart. */}
      <header style={{ width: '100%', color: PANE_INK }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Hydrogen &amp; Water Stats</h3>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: PANE_LABEL }}><bdi dir="ltr">{vitals.length} metrics</bdi></p>
      </header>

      <CurveCard vital={vitals[pick]} day={day} onDay={setDay} />

      <div
        ref={row}
        role="radiogroup"
        aria-label="Metric"
        onKeyDown={key}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}
      >
        {vitals.map((v, i) => (
          <BlobStat
            key={v.key}
            vital={v}
            day={day}
            on={i === pick}
            tabIndex={i === pick ? 0 : -1}
            onPick={() => setPick(i)}
          />
        ))}
        <button
          type="button"
          data-add=""
          aria-label={`Log a reading for ${vitals[pick].label}`}
          onClick={() => setAdded([...added, vitals[pick].key])}
          style={{
            appearance: 'none',
            cursor: 'pointer',
            borderRadius: 'var(--r-sheet)',
            border: '1px solid var(--pane-stroke)',
            background: '#fff',
            color: PANE_INK,
            fontSize: 22,
            boxShadow: 'var(--depth-float)',
          }}
        >
          +
        </button>
      </div>

      <p data-logged="" aria-live="polite" style={{ margin: 0, width: '100%', fontSize: 12, color: PANE_LABEL, minHeight: 16 }}>
        {added.length
          ? `${added.length} reading${added.length > 1 ? 's' : ''} logged this session — last: ${vitals.find((v) => v.key === added[added.length - 1])?.label}`
          : ''}
      </p>
    </MeshSurface>
  );
}

/* ── GlassRecipe ────────────────────────────────────────────────────────────
   The recipe slide itself, rendered from the tokens it documents. It is not a
   decorative exhibit: if a token changes, this drawing changes with it, which is
   the only kind of specimen worth keeping. */
export function GlassRecipe({ children }: { children?: ReactNode }) {
  const rows: [string, string][] = [
    ['Background Blur', 'var(--pane-blur)'],
    ['Transparent Fill', 'var(--pane-fill)'],
    ['White Stroke', 'var(--pane-stroke)'],
    ['Top Highlight', 'var(--pane-highlight)'],
    ['Inner Shadow', 'var(--pane-inner)'],
    ['Soft Shadow', 'var(--depth-pane)'],
  ];
  return (
    <MeshSurface variant="aqua" radius="var(--r-sheet)" style={{ padding: 26, width: '100%', display: 'grid', gap: 18 }}>
      <div style={{ borderRadius: 'var(--r-block)', padding: '18px 22px', color: PANE_INK, ...pane() }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Glass Button</span>
        {children}
      </div>
      <dl style={{ margin: 0, display: 'grid', gap: 8, fontSize: 12, color: PANE_INK }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 10, alignItems: 'baseline', justifyContent: 'space-between' }}>
            <dt style={{ color: PANE_LABEL }}>{k}</dt>
            <dd style={{ margin: 0 }}><bdi dir="ltr">{v}</bdi></dd>
          </div>
        ))}
      </dl>
    </MeshSurface>
  );
}
