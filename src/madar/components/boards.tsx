import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { AiOrb, MeshSurface } from './mesh';
import { move, n } from './roving';

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

   And the thing the first pass got wrong, which the owner caught: every one of
   these eight had **zero** state, zero handlers and zero keyboard. Eight cards
   that looked exactly right and did nothing — a legend that could not hide a
   series, a table that could not sort, a search box that could not search, an
   input that could not be typed into. Faithful to the image and useless as a
   library. Fixed here: each piece is operable, answers the keyboard, and shows
   the result of what you did to it.

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


/* ═══════════════════════════════════════════════════════════════════════════
   DarkPlate — a black card with a green pool lit inside it
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PlateStat { label: string; value: string; unit?: string; icon?: ReactNode; note?: string }

export function DarkPlate({
  title = 'Smart Sales Distribution',
  note = 'AI-enhanced sales metrics showing growth in leads, revenue, and overall performance.',
  stats = DEFAULT_STATS,
  onStat,
}: { title?: string; note?: string; stats?: PlateStat[]; onStat?: (i: number) => void }) {
  /* The three figures are the point of the card, so they are selectable and the
     note line follows the selection: the card explains the number you asked
     about rather than repeating one sentence forever. */
  const [at, setAt] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => { setAt(i); tiles.current[i]?.focus(); onStat?.(i); };
  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, at ?? 0, stats.length);
    if (next === null) return;
    e.preventDefault();
    go(next);
  };

  return (
    <MeshSurface
      variant="plate"
      grain="none"
      bevel="deep"
      radius="var(--r-panel)"
      style={{ padding: 15 }}
    >
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>{title}</h3>
      <p
        data-plate-note=""
        aria-live="polite"
        style={{ margin: '3px 0 0', fontSize: 10.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45, minHeight: 30 }}
      >
        {at === null ? note : (stats[at].note ?? `${stats[at].label} — ${stats[at].value}${stats[at].unit ? ` ${stats[at].unit}` : ''}.`)}
      </p>
      <div
        role="radiogroup"
        aria-label={title}
        onKeyDown={onKey}
        style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 9, marginTop: 13 }}
      >
        {stats.map((s, i) => (
          <button
            key={s.label}
            ref={(el) => { tiles.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={at === i}
            tabIndex={at === i || (at === null && i === 0) ? 0 : -1}
            onClick={() => go(i)}
            data-plate-stat={s.label}
            data-on={at === i ? '' : undefined}
            style={{
              borderRadius: 'var(--r-tile)', padding: 10, border: 0, cursor: 'pointer',
              textAlign: 'start', fontFamily: 'inherit', color: '#fff',
              background: 'linear-gradient(var(--sheen), rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.06)',
              outline: at === i ? '2px solid var(--lime)' : 'none',
              outlineOffset: 2,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, color: 'rgba(255,255,255,0.82)' }}>
              <span style={{ width: 20, height: 20, borderRadius: 'var(--r-lg)', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>{s.icon}</span>
              {s.label}
            </span>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 9 }}>
              <bdi dir="ltr">{s.value}</bdi>
              {s.unit && <small style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}> {s.unit}</small>}
            </span>
          </button>
        ))}
      </div>
    </MeshSurface>
  );
}

const stroke = { fill: 'none', stroke: 'var(--lime)', strokeWidth: 1.8, strokeLinecap: 'round' } as const;
const DEFAULT_STATS: PlateStat[] = [
  {
    label: 'Total Income', value: '56,000.00', unit: '$',
    note: 'Total Income — 56,000.00 $ booked in the period, before AI-attributed uplift.',
    icon: <svg width="12" height="12" viewBox="0 0 24 24" {...stroke}><path d="M12 4l8 4-8 4-8-4z" /><path d="M4 12l8 4 8-4M4 16l8 4 8-4" /></svg>,
  },
  {
    label: 'ROI', value: '+312', unit: '%',
    note: 'ROI — +312 % against spend, which is the figure the uplift is measured on.',
    icon: <svg width="12" height="12" viewBox="0 0 24 24" {...stroke}><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 15l3-4 2 2 3-4" /></svg>,
  },
  {
    label: 'Daily Active Users', value: '12,846',
    note: 'Daily Active Users — 12,846, counted on the last full day rather than averaged.',
    icon: <svg width="12" height="12" viewBox="0 0 24 24" {...stroke}><circle cx="9" cy="9" r="3" /><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" /></svg>,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   AssistantCard — the orb, and the card that is tall because it spans two rows
   ═══════════════════════════════════════════════════════════════════════════ */

export function AssistantCard({
  name = 'Bostie AI',
  prompt = 'How can I assist you today?',
  onAsk,
}: { name?: string; prompt?: string; onAsk?: (text: string) => void }) {
  /* A card with a text field that cannot be typed into is the clearest possible
     case of the defect this file was rewritten for. So: controlled input, a real
     transcript, the two shortcut buttons fill the field, and the orb's size is
     state rather than a constant with buttons next to it. */
  const [text, setText] = useState('');
  const [said, setSaid] = useState<string[]>([]);
  const [size, setSize] = useState(128);
  const [listening, setListening] = useState(false);
  const field = useRef<HTMLInputElement>(null);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setSaid((s) => [...s, t].slice(-3));
    setText('');
    onAsk?.(t);
  };

  return (
    <div
      data-assistant=""
      style={{
        borderRadius: 'var(--r-panel)', padding: 14, color: '#fff', textAlign: 'center',
        display: 'flex', flexDirection: 'column', height: '100%',
        background: 'linear-gradient(var(--sheen), #1d201e 0%, #0d100e 100%)',
        boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.12), inset 0 -1.5px 0 var(--bevel-dark-deep)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, fontWeight: 500 }}>
        <button
          type="button"
          aria-label="Smaller orb"
          onClick={() => setSize((s) => Math.max(72, s - 20))}
          style={orbBtn}
        >
          −
        </button>
        {name}
        <button
          type="button"
          aria-label="Larger orb"
          onClick={() => setSize((s) => Math.min(168, s + 20))}
          style={orbBtn}
        >
          +
        </button>
      </div>

      <div data-orb-size={size} style={{ display: 'grid', placeItems: 'center', marginTop: 10 }}>
        <AiOrb size={size} />
      </div>

      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.82)', marginTop: 12, minHeight: 17 }} aria-live="polite">
        {said.length ? said[said.length - 1] : prompt}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
        {[
          { label: 'Pro Analysis', fill: 'Run a pro analysis on this period', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><path d="M12 3a9 9 0 1 0 9 9h-9z" /></svg> },
          { label: 'Report', fill: 'Draft the weekly report', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M9 8h6M9 12h6M9 16h4" /></svg> },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={() => { setText(b.fill); field.current?.focus(); }}
            style={{
              border: 0, borderRadius: 'var(--r-tile)', padding: '10px 8px', fontSize: 10.5, cursor: 'pointer',
              fontFamily: 'inherit', color: '#fff',
              background: 'linear-gradient(var(--sheen), rgba(255,255,255,0.09), rgba(255,255,255,0.03))',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}
          >
            {b.icon}{b.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        style={{ display: 'flex', gap: 7, marginTop: 'auto', paddingTop: 10, alignItems: 'center' }}
      >
        <span
          style={{
            flex: 1, height: 34, borderRadius: 'var(--r-pill)', display: 'flex', alignItems: 'center',
            padding: '0 6px 0 14px',
            background: 'rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <input
            ref={field}
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Ask the assistant"
            placeholder="Ask anything..."
            style={{
              flex: 1, minWidth: 0, minHeight: 24, border: 0, outline: 'none', background: 'transparent',
              fontFamily: 'inherit', fontSize: 11, color: '#fff',
            }}
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={!text.trim()}
            style={{
              width: 26, height: 26, borderRadius: '50%', border: 0, flex: 'none',
              background: '#2c2f2d', display: 'grid', placeItems: 'center',
              cursor: text.trim() ? 'pointer' : 'default', opacity: text.trim() ? 1 : 0.45,
              marginInlineStart: 'auto',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--lime)" aria-hidden="true"><path d="M3 20l18-8L3 4l4 8z" /></svg>
          </button>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={listening}
          aria-label="Dictate"
          onClick={() => setListening((v) => !v)}
          style={{
            width: 34, height: 34, borderRadius: '50%', border: 0, flex: 'none', cursor: 'pointer',
            background: listening ? 'var(--lime)' : 'rgba(255,255,255,0.1)',
            display: 'grid', placeItems: 'center',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={listening ? 'var(--lime-ink)' : '#fff'} strokeWidth="1.7" aria-hidden="true">
            <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
          </svg>
        </button>
      </form>
    </div>
  );
}

const orbBtn: CSSProperties = {
  width: 24, height: 24, border: 0, borderRadius: '50%', background: '#262927',
  color: '#fff', fontSize: 15, lineHeight: 1, cursor: 'pointer', display: 'grid', placeItems: 'center',
};

/* ═══════════════════════════════════════════════════════════════════════════
   SplitDonut — one revenue figure split three ways, with the hatch meaning
   "counted but not realised" (§15-b)
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Slice { label: string; value: number; kind: 'solid' | 'hatch' | 'accent' }

const SLICES: Slice[] = [
  { label: 'Leads', value: 344, kind: 'solid' },
  { label: 'Revenue', value: 256, kind: 'hatch' },
  { label: 'AI Uplift', value: 128, kind: 'accent' },
];

const paint = (kind: Slice['kind']) =>
  kind === 'hatch' ? 'url(#madar-donut-hatch)' : kind === 'accent' ? 'var(--lime-hatch)' : '#5b4bea';

export function SplitDonut({
  caption = 'Total Revenue',
  slices = SLICES,
  /** Money per unit, so the centre figure is derived from the visible slices
      rather than typed beside them. */
  rate = 1000,
  ground = true,
  pad = 16,
}: { caption?: string; slices?: Slice[]; rate?: number; ground?: boolean; pad?: number }) {
  /* A legend whose items cannot be switched off is a caption. Toggling one
     recomputes the arcs *and* the centre total, so hiding a slice cannot leave
     a total that no longer matches the ring. */
  const [off, setOff] = useState<string[]>([]);
  const shown = slices.filter((s) => !off.includes(s.label));
  const sum = shown.reduce((t, s) => t + s.value, 0);
  const C = 2 * Math.PI * 44;

  const arcs = useMemo(() => {
    let acc = 0;
    return shown.map((s) => {
      const frac = sum ? s.value / sum : 0;
      const arc = { ...s, dash: C * frac, offset: -C * acc };
      acc += frac;
      return arc;
    });
  }, [shown, sum, C]);

  return (
    /* The donut owns its ground. Every value in it — the #f0eef6 track, the
       #101312 centre reading, the #4d4f52 legend — is chosen for white, and both
       original call sites wrapped it in a white card to make that true. A third
       call site forgot, and the night pack put the legend on #282d46 at 1.64:1.
       This is the same defect `ScoreBands` had and the same fix: a component that
       owns its background owns its foreground. `ground={false}` is for a caller
       that has already painted one. */
    <div
      data-donut={sum}
      style={{
        color: LIGHT_INK,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        ...(ground
          ? { padding: pad, borderRadius: 'var(--r-panel)', background: '#fff', boxShadow: 'inset 0 0 0 1px #f0eef6' }
          : null),
      }}
    >
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" style={{ flex: 'none' }}>
        <defs>
          <pattern id="madar-donut-hatch" width="7" height="7" patternTransform="rotate(135)" patternUnits="userSpaceOnUse">
            <rect width="7" height="7" fill="#fff" />
            <path d="M0 0v7" stroke="var(--lime-hatch)" strokeWidth="4" />
          </pattern>
        </defs>
        <circle cx="64" cy="64" r="44" stroke="#f0eef6" strokeWidth="21" />
        {arcs.map((a) => (
          <circle
            key={a.label}
            cx="64" cy="64" r="44"
            stroke={paint(a.kind)}
            strokeWidth="21"
            strokeDasharray={`${a.dash} ${C}`}
            strokeDashoffset={a.offset}
            transform="rotate(-90 64 64)"
            strokeLinecap="butt"
          />
        ))}
        <text x="64" y="62" textAnchor="middle" fontSize="15" fontWeight="600" fill="#101312">
          ${n(sum * rate)}
        </text>
        <text x="64" y="76" textAnchor="middle" fontSize="9" fill="#a7a7ad">{caption}</text>
      </svg>
      <div style={{ fontSize: 10.5, color: '#4d4f52', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {slices.map((s) => {
          const on = !off.includes(s.label);
          return (
            <button
              key={s.label}
              type="button"
              role="switch"
              aria-checked={on}
              onClick={() => setOff((v) => (on ? [...v, s.label] : v.filter((l) => l !== s.label)))}
              data-slice={s.label}
              data-on={on ? '' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, border: 0, background: 'transparent',
                /* 5px block padding, not 3: at 3 the row measured 21px tall and the
                   hit-area gate wants 24 on the short side (WCAG 2.5.8). */
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 10.5, padding: '5px 2px', minHeight: 24,
                color: on ? '#4d4f52' : '#b8b8be', textDecoration: on ? 'none' : 'line-through',
              }}
            >
              <i
                style={{
                  width: 9, height: 9, borderRadius: 'var(--r-xs)', display: 'inline-block',
                  background: !on
                    ? '#dcdae8'
                    : s.kind === 'hatch'
                      ? 'repeating-linear-gradient(var(--hatch-angle), var(--lime-hatch) 0 3px, #fff 3px 6px)'
                      : s.kind === 'accent' ? 'var(--lime-hatch)' : '#5b4bea',
                }}
              />
              <b style={{ fontWeight: 600 }}><bdi dir="ltr">{n(s.value)}</bdi></b> {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OppsTable — the risk column is counted, not scored
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Opp { name: string; region: string; score: number; risk: number; leads: number; value: string; tone: 'lime' | 'iris' }

type SortKey = 'name' | 'region' | 'score' | 'risk' | 'leads';
const COLS: { key: SortKey | null; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'region', label: 'Region' },
  { key: 'score', label: 'AI Success Score' },
  { key: 'risk', label: 'Risks Level' },
  { key: 'leads', label: 'Lead Increase' },
  { key: null, label: 'Account Value' },
];

export function OppsTable({ rows = OPPS }: { rows?: Opp[] }) {
  const cols = '1.5fr 0.9fr 1.1fr 1fr 1fr 1.1fr';
  /* Sorting is the one thing every table is asked for and this one could not do.
     `aria-sort` on the header is what makes it announced rather than merely
     working. */
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'score', dir: -1 });
  const [at, setAt] = useState(0);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);

  const sorted = useMemo(() => {
    const v = (r: Opp) => (typeof r[sort.key] === 'string' ? String(r[sort.key]) : Number(r[sort.key]));
    return [...rows].sort((a, b) => {
      const av = v(a); const bv = v(b);
      if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * sort.dir;
      return ((av as number) - (bv as number)) * sort.dir;
    });
  }, [rows, sort]);

  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, at, sorted.length);
    if (next === null) return;
    e.preventDefault();
    setAt(next);
    cells.current[next]?.focus();
  };

  return (
    <div data-opps={rows.length} data-sort={`${sort.key}:${sort.dir}`} style={{ color: LIGHT_INK, borderRadius: 'var(--r-panel)', background: '#fff', padding: 13, boxShadow: 'inset 0 0 0 1px #f0eef6' }}>
      <div style={{ display: 'grid', gridTemplateColumns: cols, fontSize: 10, color: '#a7a7ad', padding: '6px 8px' }}>
        {COLS.map((c) => (
          c.key ? (
            <button
              key={c.label}
              type="button"
              /* `aria-sort` belongs on a columnheader, not on a button — axe was
                 right to refuse it. Without table roles here the state has to
                 travel in the label, which is announced either way. */
              aria-label={`${c.label}${sort.key === c.key ? `, sorted ${sort.dir === 1 ? 'ascending' : 'descending'}` : ''}. Activate to sort.`}
              onClick={() => setSort((s) => ({ key: c.key as SortKey, dir: s.key === c.key && s.dir === -1 ? 1 : -1 }))}
              style={{
                border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                /* block padding to 24: a sort header is a control, and it measured
                   15px tall until the hit-area gate said so (WCAG 2.5.8). */
                fontSize: 10, textAlign: 'start', padding: '5px 0', minHeight: 24, display: 'flex', alignItems: 'center', gap: 4,
                color: sort.key === c.key ? LIGHT_INK : '#a7a7ad',
                fontWeight: sort.key === c.key ? 600 : 400,
              }}
            >
              {c.label}
              {sort.key === c.key && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" style={{ transform: sort.dir === 1 ? 'rotate(180deg)' : undefined }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </button>
          ) : <span key={c.label}>{c.label}</span>
        ))}
      </div>

      <div role="radiogroup" aria-label="Opportunities" onKeyDown={onKey}>
        {sorted.map((r, i) => (
          <button
            key={r.name}
            ref={(el) => { cells.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={i === at}
            tabIndex={i === at ? 0 : -1}
            onClick={() => setAt(i)}
            data-row={r.name}
            data-on={i === at ? '' : undefined}
            style={{
              width: '100%', display: 'grid', gridTemplateColumns: cols, alignItems: 'center',
              fontSize: 11, padding: 8, borderRadius: 'var(--r-tile)', border: 0, cursor: 'pointer',
              fontFamily: 'inherit', color: LIGHT_INK, textAlign: 'start',
              background: i === at ? '#f8f7fd' : 'transparent',
              boxShadow: i === at ? 'inset 0 0 0 1.4px #5b4bea' : 'inset 0 0 0 1px #f0eef6',
              marginTop: 7,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}>
              <i
                style={{
                  width: 22, height: 22, borderRadius: '50%', flex: 'none',
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
              {Array.from({ length: 7 }, (_, k) => (
                <i
                  key={k}
                  style={{
                    width: 5, height: 15, borderRadius: 'var(--r-xs)',
                    background: k < r.risk ? (r.tone === 'lime' ? 'var(--lime-hatch)' : '#5b4bea') : '#dcdae8',
                  }}
                />
              ))}
            </span>
            <span><bdi dir="ltr">+{n(r.leads)}</bdi></span>
            <span><bdi dir="ltr">{r.value}</bdi></span>
          </button>
        ))}
      </div>
    </div>
  );
}

const OPPS: Opp[] = [
  { name: 'Quinta Starter', region: 'USA', score: 88, risk: 7, leads: 8000, value: '+$48,569,09', tone: 'lime' },
  { name: 'Vertex Mode', region: 'Spain', score: 74, risk: 4, leads: 3400, value: '+$21,140,00', tone: 'iris' },
  { name: 'Northwind Co', region: 'Iraq', score: 61, risk: 2, leads: 1250, value: '+$9,480,00', tone: 'iris' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CareOverview — a progress bar with pinned markers, and four counted rings
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CareMetric { label: string; value: number; of?: number; icon: 'person' | 'heart' | 'discharge' }

const PERIODS = ['This Week', 'This Month', 'This Quarter'] as const;

export function CareOverview({
  progress = 75,
  pins = [45, 75],
  metrics = CARE,
  onMetric,
}: { progress?: number; pins?: number[]; metrics?: CareMetric[]; onMetric?: (i: number) => void }) {
  const [period, setPeriod] = useState(0);
  const [at, setAt] = useState(0);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = metrics[at];

  const go = (i: number) => { setAt(i); tiles.current[i]?.focus(); onMetric?.(i); };
  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, at, metrics.length);
    if (next === null) return;
    e.preventDefault();
    go(next);
  };

  return (
    <div data-care={progress} data-period={PERIODS[period]} style={{ color: LIGHT_INK, background: '#fbfbfa', borderRadius: 'var(--r-panel)', padding: 14, boxShadow: 'inset 0 1px 0 #fff, var(--depth-hairline)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.015em' }}>Patient Care Overview</h4>
        <button
          type="button"
          onClick={() => setPeriod((p) => (p + 1) % PERIODS.length)}
          aria-label={`Period: ${PERIODS[period]}. Activate to change.`}
          style={{
            height: 26, padding: '0 10px', borderRadius: 'var(--r-pill)', background: '#fff', fontSize: 11,
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit',
            color: LIGHT_INK, border: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)',
          }}
        >
          {PERIODS[period]}
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#131a12" strokeWidth="2.6" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </button>
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
          <div style={{ position: 'relative', height: 13, borderRadius: 'var(--r-pill)', marginTop: 24, background: '#ececec', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', inset: 0, insetInlineEnd: `${100 - progress}%`, background: 'linear-gradient(90deg, #8fb06c 0%, #7ba055 46%, #5e7f3d 100%)' }} />
            <span style={{ position: 'absolute', inset: 0, insetInlineStart: `${progress}%`, background: 'repeating-linear-gradient(var(--hatch-angle), #e2e2e2 0 4px, #f2f2f0 4px 8px)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#9aa09b', marginTop: 6 }}>
          <span>0%</span><span>45%</span><span>75%</span><span>100%</span>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Patient groups"
        onKeyDown={onKey}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9, marginTop: 14 }}
      >
        {metrics.map((m, i) => {
          const frac = m.of ? m.value / m.of : 1;
          const C = 2 * Math.PI * 17;
          return (
            <button
              key={m.label}
              ref={(el) => { tiles.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={i === at}
              aria-label={`${m.label}: ${m.value}${m.of ? ` of ${m.of}` : ''}`}
              tabIndex={i === at ? 0 : -1}
              onClick={() => go(i)}
              data-metric={m.label}
              data-on={i === at ? '' : undefined}
              style={{
                background: '#f2f2f0', borderRadius: 'var(--r-tile)', padding: '12px 6px', textAlign: 'center',
                border: 0, cursor: 'pointer', fontFamily: 'inherit', color: LIGHT_INK,
                boxShadow: 'inset 0 1px 0 #fff',
                outline: i === at ? '2px solid #5e7f3d' : 'none',
                outlineOffset: 2,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" style={{ margin: '0 auto 8px', display: 'block' }} aria-hidden="true">
                <circle cx="20" cy="20" r="17" fill="none" stroke="#e2e2e2" strokeWidth="2.4" />
                <circle cx="20" cy="20" r="17" fill="none" stroke="#7ba055" strokeWidth="2.4" strokeDasharray={`${C * frac} ${C}`} transform="rotate(-90 20 20)" strokeLinecap="round" />
                <g transform="translate(12 12)" stroke="#131a12" strokeWidth="1.7" fill="none">
                  {m.icon === 'heart'
                    ? <path d="M8 14s-5-3-5-6.4A2.9 2.9 0 0 1 8 5.4 2.9 2.9 0 0 1 13 7.6C13 11 8 14 8 14z" />
                    : <><circle cx="7" cy="5.6" r="2.1" /><path d="M2.8 14c0-2.3 1.9-3.5 4.2-3.5s4.2 1.2 4.2 3.5" />{m.icon === 'person' ? <path d="M12.6 4.2v2.8M11.2 5.6h2.8" /> : <path d="M14 4.2l-2.8 2.8M11.2 4.2l2.8 2.8" />}</>}
                </g>
              </svg>
              <span style={{ display: 'block', fontSize: 11.5, fontWeight: 500, lineHeight: 1.3 }}>{m.label}</span>
              <span style={{ display: 'block', fontSize: 13, marginTop: 8 }}>
                <bdi dir="ltr">{n(m.value)}</bdi>
                {/* `!== undefined`, not truthiness: `of` is a number, and `{0 && …}`
                renders a bare "0" next to the reading. A metric out of zero is a
                real state — nobody discharged yet — and it printed a stray digit. */}
            {m.of !== undefined && <small style={{ color: '#9aa09b' }}> / <bdi dir="ltr">{n(m.of)}</bdi></small>}
              </span>
            </button>
          );
        })}
      </div>

      <p data-care-says="" aria-live="polite" style={{ margin: '12px 0 0', fontSize: 11.5, color: '#6b736d' }}>
        {cur.of
          ? <><b style={{ fontWeight: 600, color: LIGHT_INK }}>{cur.label}</b> — <bdi dir="ltr">{n(cur.value)}</bdi> of <bdi dir="ltr">{n(cur.of)}</bdi>, {Math.round((cur.value / cur.of) * 100)}% · {PERIODS[period]}</>
          : <><b style={{ fontWeight: 600, color: LIGHT_INK }}>{cur.label}</b> — <bdi dir="ltr">{n(cur.value)}</bdi> on the ward · {PERIODS[period]}</>}
      </p>
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

const FLOW = [
  { label: 'Current Status', frac: 0.4, ink: '#7ba055' },
  { label: 'Target Health', frac: 0.26, ink: '#e8d47a' },
  { label: 'Discharged', frac: 0.22, ink: '#d9b6dd' },
];

export function FlowDonut({ total = 900, incoming = 400 }: { total?: number; incoming?: number }) {
  const [off, setOff] = useState<string[]>([]);
  const C = 2 * Math.PI * 44;
  const shown = FLOW.filter((f) => !off.includes(f.label));
  /* The centre figure is the sum of what is *shown*, so switching a band off
     cannot leave a number that the ring no longer accounts for. */
  const sumFrac = shown.reduce((t, f) => t + f.frac, 0);
  const arcs = useMemo(() => {
    let acc = 0;
    return shown.map((f) => {
      const a = { ...f, dash: C * f.frac, offset: -C * acc };
      acc += f.frac;
      return a;
    });
  }, [shown, C]);

  return (
    <div data-flow={Math.round(total * sumFrac / 0.88)} style={{ color: LIGHT_INK, background: 'linear-gradient(var(--sheen), #e7efdf, #dae8cd)', borderRadius: 'var(--r-panel)', padding: 14, boxShadow: 'inset 0 1px 0 #fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.015em' }}>Patient Flow</h4>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#6b736d" aria-hidden="true"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', marginTop: 6 }}>
        <svg width="164" height="126" viewBox="0 0 164 126" fill="none">
          <circle cx="82" cy="66" r="44" stroke="#f0f4ea" strokeWidth="15" />
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="82" cy="66" r="44"
              stroke={a.ink} strokeWidth="15"
              strokeDasharray={`${a.dash} ${C}`}
              strokeDashoffset={a.offset}
              transform="rotate(-108 82 66)"
              strokeLinecap="round"
            />
          ))}
          <text x="82" y="66" textAnchor="middle" fontSize="20" fontWeight="600" fill="#131a12">
            {n(Math.round(total * (sumFrac / 0.88)))}
          </text>
          <text x="82" y="80" textAnchor="middle" fontSize="9" fill="#6b736d">{Math.round((sumFrac / 0.88) * 100)}% Capacity</text>
          <g transform="translate(120 28)">
            <rect width="36" height="18" rx="9" fill="#22331b" />
            <text x="18" y="12.6" textAnchor="middle" fontSize="9.5" fill="#fff">{n(incoming)}</text>
          </g>
        </svg>
        <span style={{ display: 'flex', gap: 8, fontSize: 10.5, marginTop: 2 }}>
          {FLOW.slice(0, 2).map((f) => {
            const on = !off.includes(f.label);
            return (
              <button
                key={f.label}
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => setOff((v) => (on ? [...v, f.label] : v.filter((l) => l !== f.label)))}
                data-band={f.label}
                data-on={on ? '' : undefined}
                style={{
                  border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 10.5, padding: '5px 3px', minHeight: 24,
                  color: on ? '#6b736d' : '#9aa09b', textDecoration: on ? 'none' : 'line-through',
                }}
              >
                <i style={legendDot(on ? f.ink : '#c9cfc4')} />{f.label}
              </button>
            );
          })}
        </span>
      </div>
    </div>
  );
}

const legendDot = (bg: string): CSSProperties => ({ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginInlineEnd: 5, background: bg });

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

export function StaffList({ staff = STAFF, onPick }: { staff?: Staff[]; onPick?: (s: Staff) => void }) {
  /* The reference draws a search affordance. Drawing one and not wiring it is
     worse than leaving it out: it promises a capability the card does not have. */
  const [q, setQ] = useState('');
  const [at, setAt] = useState(0);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);

  const found = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return staff;
    return staff.filter((s) => `${s.name} ${s.role} ${DUTY[s.duty].label}`.toLowerCase().includes(t));
  }, [staff, q]);

  const pos = Math.min(at, Math.max(0, found.length - 1));
  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, pos, found.length);
    if (next === null) return;
    e.preventDefault();
    setAt(next);
    rows.current[next]?.focus();
    onPick?.(found[next]);
  };

  return (
    <div data-staff={found.length} style={{ color: LIGHT_INK, background: '#fbfbfa', borderRadius: 'var(--r-panel)', padding: 14, boxShadow: 'inset 0 1px 0 #fff, var(--depth-hairline)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.015em' }}>Doctor</h4>
        <span
          style={{
            display: 'flex', alignItems: 'center', gap: 6, height: 26, paddingInline: 9,
            borderRadius: 'var(--r-pill)', background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#131a12" strokeWidth="2.2" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setAt(0); }}
            aria-label="Search the roster"
            placeholder="Search"
            style={{ width: 76, minHeight: 24, border: 0, outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 11, color: LIGHT_INK }}
          />
        </span>
      </div>

      <div role="radiogroup" aria-label="Doctors" onKeyDown={onKey} style={{ marginTop: 6 }}>
        {found.map((s, i) => {
          const d = DUTY[s.duty];
          return (
            <button
              key={s.name}
              ref={(el) => { rows.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={i === pos}
              tabIndex={i === pos ? 0 : -1}
              onClick={() => { setAt(i); onPick?.(s); }}
              data-duty={s.duty}
              data-on={i === pos ? '' : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '7px 6px',
                border: 0, cursor: 'pointer', fontFamily: 'inherit', color: LIGHT_INK, textAlign: 'start',
                borderRadius: 'var(--r-tile)',
                background: i === pos ? '#f1f4ef' : 'transparent',
                borderBottom: i === found.length - 1 ? 0 : '1px solid #f0f0f0',
              }}
            >
              <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: '50%', flex: 'none', background: s.tint, display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(0,0,0,0.28)"><circle cx="12" cy="9" r="3.4" /><path d="M5 21c0-3.9 3.2-6 7-6s7 2.1 7 6z" /></svg>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <b style={{ display: 'block', fontSize: 12, fontWeight: 500 }}>{s.name}</b>
                <span style={{ fontSize: 10.5, color: '#8d948e' }}>{s.role}</span>
              </span>
              <span style={{ height: 22, padding: '0 9px', borderRadius: 'var(--r-pill)', fontSize: 10.5, display: 'flex', alignItems: 'center', gap: 5, background: d.bg, color: d.ink, flex: 'none' }}>
                <i style={{ width: 5, height: 5, borderRadius: '50%', background: d.dot }} />{d.label}
              </span>
            </button>
          );
        })}
        {!found.length && (
          <p style={{ margin: '12px 2px', fontSize: 11.5, color: '#8d948e' }}>
            Nobody on the roster matches “{q}”.
          </p>
        )}
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

/* The batch after this one carried the same slide on a lavender ground instead of
   an olive one. That is a key, not a second component: the type, the pills, the
   spheres, the copy behaviour and the live region are identical, and the only
   things that change are the field behind them and which way the ink runs. So
   `tone` is one prop and the light twin costs nine lines — building it twice is
   how a library ends up with two slides that drift apart. */
const SLIDE = {
  dark: {
    field: 'olive' as const,
    ink: 'rgba(255,255,255,0.9)',
    soft: 'rgba(255,255,255,0.72)',
    pillInk: '#fff',
    pillEdge: 'rgba(255,255,255,0.22)',
    pillFill: 'rgba(255,255,255,0.05)',
    lip: 'inset 0 1.5px 0 rgba(255,255,255,0.24), inset 0 -1.5px 0 rgba(0,0,0,0.2)',
    type: 'linear-gradient(var(--wash), #fff 0%, #f2f2ee 42%, #c9c9c2 100%)',
  },
  light: {
    field: 'light' as const,
    ink: '#1c1a2e',
    soft: 'rgba(28,26,46,0.62)',
    pillInk: '#1c1a2e',
    pillEdge: 'rgba(28,26,46,0.14)',
    pillFill: 'rgba(255,255,255,0.55)',
    lip: 'inset 0 1.5px 0 rgba(255,255,255,0.9), inset 0 -1.5px 0 rgba(28,26,46,0.08)',
    type: 'linear-gradient(var(--wash), #3a3752 0%, #1c1a2e 52%, #100f1c 100%)',
  },
};

export function PaletteSlide({
  face = 'Neue Montreal',
  weights = ['Regular', 'Medium'],
  swatches = SWATCHES,
  tone = 'dark',
}: { face?: string; weights?: string[]; swatches?: Swatch[]; tone?: 'dark' | 'light' }) {
  const t = SLIDE[tone];
  /* The whole use of a palette slide is getting the hex out of it, so the pills
     copy. Clipboard access is refused in plenty of contexts, so the state says
     what actually happened rather than claiming success. */
  const [copied, setCopied] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const pills = useRef<(HTMLButtonElement | null)[]>([]);
  const [at, setAt] = useState(0);

  const copy = async (hex: string, i: number) => {
    setAt(i);
    try {
      await navigator.clipboard.writeText(hex);
      setFailed(false);
    } catch {
      setFailed(true);
    }
    setCopied(hex);
  };

  const onKey = (e: KeyboardEvent) => {
    const next = move(e.key, at, swatches.length);
    if (next === null) return;
    e.preventDefault();
    setAt(next);
    pills.current[next]?.focus();
  };

  return (
    <MeshSurface variant={t.field} grain="light" radius="var(--r-panel)" data-slide={tone} style={{ padding: '54px 40px 60px', textAlign: 'center' }}>
      <div style={{ fontSize: 15, color: t.ink }}>Typography</div>
      <div
        style={{
          fontSize: 62, fontWeight: 300, letterSpacing: '-0.045em', lineHeight: 1, marginTop: 10,
          background: t.type,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}
      >
        {face}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: t.soft, marginTop: 14, padding: '0 6%' }}>
        {weights.map((w) => <span key={w}>{w}</span>)}
      </div>

      <div style={{ fontSize: 15, color: t.ink, marginTop: 44 }}>Colour Palette</div>
      <div
        onKeyDown={onKey}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 18 }}
      >
        {swatches.map((s, i) => (
          <button
            key={s.hex}
            ref={(el) => { pills.current[i] = el; }}
            type="button"
            onClick={() => copy(s.hex, i)}
            tabIndex={i === at ? 0 : -1}
            aria-label={`Copy ${s.hex}`}
            data-swatch={s.hex}
            data-copied={copied === s.hex ? '' : undefined}
            style={{
              height: 62, padding: '0 22px 0 9px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 16, fontSize: 17,
              fontFamily: 'inherit', color: t.pillInk,
              border: `1px solid ${t.pillEdge}`,
              background: t.pillFill,
              boxShadow: t.lip,
              backdropFilter: 'blur(6px)',
              outline: copied === s.hex ? '2px solid var(--lime)' : 'none',
              outlineOffset: 3,
            }}
          >
            <i
              style={{
                width: 44, height: 44, borderRadius: '50%', flex: 'none',
                background: `radial-gradient(66% 66% at 33% 26%, ${s.from} 0%, ${s.mid} 46%, ${s.to} 84%)`,
                boxShadow: 'inset 0 -3px 5px rgba(255,255,255,0.28), var(--depth-sphere)',
              }}
            />
            <bdi dir="ltr">{copied === s.hex ? (failed ? 'select it' : 'copied') : s.hex}</bdi>
          </button>
        ))}
      </div>
      <p data-palette-says="" aria-live="polite" style={{ margin: '18px 0 0', fontSize: 13, color: t.soft }}>
        {copied
          ? (failed
            ? <>The clipboard is not available here — <bdi dir="ltr">{copied}</bdi> is shown to be selected by hand.</>
            : <><bdi dir="ltr">{copied}</bdi> copied.</>)
          : 'Pick a colour to copy its hex.'}
      </p>
    </MeshSurface>
  );
}

const SWATCHES: Swatch[] = [
  { hex: '#BAF91A', from: '#e6ff7a', mid: '#baf91a', to: '#93c810' },
  { hex: '#E2FF99', from: '#fff', mid: '#e2ff99', to: '#c2e072' },
  { hex: '#876DFF', from: '#c4b6ff', mid: '#876dff', to: '#6650d9' },
  { hex: '#101312', from: '#4a4f4c', mid: '#1c201e', to: '#101312' },
  { hex: '#FFFFFF', from: '#fff', mid: '#fff', to: '#dcdcd6' },
];
