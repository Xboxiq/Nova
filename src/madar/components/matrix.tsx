import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { move } from './roving';
import { readPair, type Reading } from './contrast';

/* ────────────────────────────────────────────────────────────────────────
   The Matrix — the surface this library never had.

   Forty sections show the *parts*. Nothing showed the *system*. And after
   `data-direction` landed there are three document axes — seven colour packs,
   six shape registers, three glass levels — which is 126 renderings of every
   component in the library and no way to look at them.

   Every design system in the world has this gap and they all fill it the same
   way: a Foundations page that lists the tokens. A list of tokens is not the
   system; it is the alphabet. What was missing is a **contact sheet** — the whole
   cross product at once, small enough to scan, with every cell a real render
   rather than a swatch.

   And once the whole cross product is on one screen, one more thing becomes
   possible, which is the reason this is worth building at all:

     **every cell measures itself and says so.**

   Forty-nine live cells, each reading its own ink against its own painted
   ground, in both lenses — WCAG 2.x because that is the standard the product is
   held to, and APCA because WCAG has no notion of polarity and four of these
   packs are dark. A cell that fails marks itself. So the library audits itself in
   the browser, visibly, and a combination that breaks is found by *looking*
   rather than by remembering to run something.

   That is the difference between a showcase and a proof.
──────────────────────────────────────────────────────────────────────── */

export const PACKS = ['light', 'mint', 'sky', 'iris', 'coral', 'dark', 'night'] as const;
export const REGISTERS = [null, 'civic', 'editorial', 'data-dense', 'futuristic', 'premium', 'experimental'] as const;

export type Pack = (typeof PACKS)[number];
export type Register = (typeof REGISTERS)[number];

/** The leading label column's width. Wide enough for «مستقبليّ», narrow enough
    that seven registers still get equal room. */
const SIDE = 44;

/** Below this a cell cannot carry its own reading, so the sheet scrolls instead. */
const MIN_CELL = 92;

const LABEL: Record<string, string> = {
  light: 'فاتح', mint: 'نعناع', sky: 'سماء', iris: 'سوسن',
  coral: 'مرجان', dark: 'داكن', night: 'ليل',
  civic: 'مدنيّ', editorial: 'تحريريّ', 'data-dense': 'كثيف',
  futuristic: 'مستقبليّ', premium: 'فاخر', experimental: 'تجريبيّ',
};

/* ── The specimen ────────────────────────────────────────────────────────────
   Deliberately the smallest thing that carries all three axes at once: a heading
   (type scale), a body line (the pair most likely to fail), a chip (pill radius)
   and a filled action (the action colour against its own ink). Anything larger
   and forty-nine of them cannot be scanned; anything smaller and a register stops
   being visible. */
function Cell({ pack, register }: { pack: Pack; register: Register }) {
  const body = useRef<HTMLParagraphElement>(null);
  const action = useRef<HTMLSpanElement>(null);
  const [read, setRead] = useState<{ body: Reading | null; action: Reading | null }>({ body: null, action: null });

  /* One frame after paint, because a token cascade resolved before the browser has
     applied it reads the parent's colours and reports a number for a cell that
     does not exist yet. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setRead({
        body: body.current ? readPair(body.current) : null,
        action: action.current ? readPair(action.current) : null,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [pack, register]);

  const both = [read.body, read.action].filter(Boolean) as Reading[];
  const fails = both.some((r) => r.fails);
  const thin = !fails && both.some((r) => r.thin);

  /* Show the pair that DRIVES the verdict, not the first one measured. The dark
     pack's body sits at 11:1 while its action pair is thin, so the cell was
     printing 11.0 next to a "thin" mark and the reader could not see why. The
     number on a cell has to be the number the mark is about. */
  const shown = both.length
    ? both.reduce((a, b) => (a.fails !== b.fails ? (a.fails ? a : b) : a.lc <= b.lc ? a : b))
    : null;

  return (
    <span
      data-cell={`${pack}/${register ?? 'default'}`}
      data-verdict={fails ? 'fail' : thin ? 'thin' : 'pass'}
      data-theme={pack}
      {...(register ? { 'data-direction': register } : null)}
      style={{
        display: 'grid',
        gap: 6,
        padding: 10,
        minWidth: 0,
        /* The cell paints the pack's own canvas. A cell that inherited the page's
           ground would be measuring the wrong background — the same defect
           `SplitDonut` had, one axis wider. */
        background: 'var(--nova-canvas)',
        borderRadius: 'var(--nova-radius-card)',
        boxShadow: 'inset 0 0 0 1px var(--nova-border)',
        /* The cell clips. At 390px the reading overflowed the cell and landed on
           the *page's* ground — so axe measured the cell's ink against the night
           pack's canvas and found 2.6:1, correctly. A cell that paints its own
           background must not let anything escape it, or every measurement it
           makes about itself is about somewhere else. */
        overflow: 'hidden',
      }}
    >
      {/* The measured number, not the pack's name. The name was repeated
          forty-nine times where seven would do, and the space it wasted is the
          most valuable space on the sheet: with the reading in the cell, this
          stops being a grid of marks and becomes a heatmap of measurements. */}
      <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 4, lineHeight: 1.1 }}>
        <span
          data-cell-ratio={shown ? shown.ratio : undefined}
          style={{
            fontSize: 11,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            color: fails ? 'var(--nova-danger)' : thin ? 'var(--nova-ink)' : 'var(--nova-ink-secondary)',
          }}
        >
          <bdi dir="ltr">{shown ? shown.ratio.toFixed(1) : '—'}</bdi>
        </span>
        <span style={{ fontSize: 9, color: 'var(--nova-ink-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          <bdi dir="ltr">Lc{shown ? Math.round(shown.lc) : '—'}</bdi>
        </span>
      </span>
      <p ref={body} style={{ margin: 0, fontSize: 'var(--nova-text-label-sm)', lineHeight: 1.35, color: 'var(--nova-ink-secondary)' }}>
        سطرُ نصٍّ ثانويّ
      </p>
      <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <span
          style={{
            fontSize: 9,
            padding: '2px 7px',
            borderRadius: 'var(--nova-radius-pill)',
            background: 'var(--nova-surface-quiet)',
            color: 'var(--nova-ink-tertiary)',
          }}
        >
          رقاقة
        </span>
        <span
          ref={action}
          style={{
            fontSize: 9,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 'var(--nova-radius-control)',
            background: 'var(--nova-action)',
            color: 'var(--nova-on-action)',
          }}
        >
          إجراء
        </span>
      </span>
    </span>
  );
}

/* ── The sheet ───────────────────────────────────────────────────────────────
   Seven packs down, seven registers across — the default plus six. A square,
   which matters: the eye finds a column that fails and a row that fails, and a
   defect in one *axis* looks different from a defect in one *cell*. That is the
   whole diagnostic value, and a ragged grid loses it. */
export function Matrix({
  onApply,
}: {
  onApply?: (pack: Pack, register: Register) => void;
}) {
  const cols = REGISTERS.length;
  const [at, setAt] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const [tally, setTally] = useState({ fail: 0, thin: 0, pass: 0 });

  const cells = useMemo(
    () => PACKS.flatMap((p) => REGISTERS.map((r) => ({ pack: p, register: r }))),
    [],
  );

  /* The tally is read back off the rendered cells rather than recomputed, so the
     count and the marks can never disagree — a summary that is calculated twice is
     a summary that will eventually contradict the thing it summarises. */
  useEffect(() => {
    const id = setTimeout(() => {
      const seen = { fail: 0, thin: 0, pass: 0 };
      grid.current?.querySelectorAll('[data-verdict]').forEach((el) => {
        const v = el.getAttribute('data-verdict') as keyof typeof seen;
        if (v in seen) seen[v] += 1;
      });
      setTally(seen);
    }, 120);
    return () => clearTimeout(id);
  }, []);

  const current = cells[at];

  const key = (e: React.KeyboardEvent) => {
    const to = move(e.key, at, cells.length, cols);
    if (to === null) return;
    e.preventDefault();
    setAt(to);
    grid.current?.querySelectorAll<HTMLButtonElement>('[data-cell-pick]')[to]?.focus();
  };

  return (
    <div data-matrix={`${current.pack}/${current.register ?? 'default'}`} style={{ display: 'grid', gap: 12, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--nova-ink-secondary)' }}>
          <bdi dir="ltr">{PACKS.length} × {REGISTERS.length} = {cells.length}</bdi> خليّة، وكلٌّ تقيس نفسها
        </p>
        <p data-matrix-tally="" aria-live="polite" style={{ margin: 0, fontSize: 12.5, display: 'flex', gap: 12 }}>
          <span style={{ color: 'var(--nova-ink-secondary)' }}>
            <bdi dir="ltr">{tally.pass}</bdi> تجتاز
          </span>
          <span style={{ color: tally.thin ? 'var(--nova-warning-ink, var(--nova-ink))' : 'var(--nova-ink-tertiary)' }}>
            <bdi dir="ltr">{tally.thin}</bdi> رقيقة
          </span>
          <span style={{ color: tally.fail ? 'var(--nova-danger-ink, var(--nova-danger))' : 'var(--nova-ink-tertiary)', fontWeight: tally.fail ? 700 : 400 }}>
            <bdi dir="ltr">{tally.fail}</bdi> تخفق
          </span>
        </p>
      </div>

      {/* Register names across the top and pack names down the side, each once.
          Labelling every cell put ninety-eight words on a sheet meant to be
          scanned in one look. The leading column is `aria-hidden` because the
          grid cells carry the full pair in their own labels. */}
      {/* A contact sheet is inherently wide: seven columns at 390px is fifty pixels
          a cell, which cannot carry a reading. So it scrolls inside its own
          container rather than crushing — the repo's own rule for wide content —
          and `MIN_CELL` is the width below which a cell stops being legible. */}
      <div style={{ overflowX: 'auto', overscrollBehaviorX: 'contain', display: 'grid', gap: 8, paddingBottom: 4 }}>
      <div aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: `${SIDE}px repeat(${cols}, minmax(${MIN_CELL}px, 1fr))`, gap: 8, fontSize: 10.5, color: 'var(--nova-ink-tertiary)', minWidth: 'min-content' }}>
        <span />
        {REGISTERS.map((r) => (
          <span key={r ?? 'default'} style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {r ? LABEL[r] : 'الافتراض'}
          </span>
        ))}
      </div>

      <div
        ref={grid}
        /* `role="radiogroup"`, not `role="grid"`. The first version used grid and
           gridcell and axe produced 50 violations per pack: a gridcell needs a
           `row` parent and a grid needs `row` children, and this is a CSS grid
           with no row elements. That is the same defect `OppsTable` had — a role
           claimed without the structure it requires.

           And the honest role is the simpler one: this is a single-select picker
           that happens to be laid out in two dimensions. The arrow keys still move
           by row, because that is a property of the mover, not of the role. */
        role="radiogroup"
        aria-label="مصفوفة الحزم والسجلّات"
        onKeyDown={key}
        style={{ display: 'grid', gridTemplateColumns: `${SIDE}px repeat(${cols}, minmax(${MIN_CELL}px, 1fr))`, gap: 8, minWidth: 'min-content' }}
      >
        {cells.map((c, i) => {
          const rowHead = i % cols === 0 ? (
            <span
              key={`head-${c.pack}`}
              aria-hidden="true"
              style={{ display: 'grid', placeItems: 'center end', fontSize: 11, fontWeight: 600, color: 'var(--nova-ink-secondary)', paddingInlineEnd: 2 }}
            >
              {LABEL[c.pack]}
            </span>
          ) : null;
          const on = i === at;
          const label = `${LABEL[c.pack]} · ${c.register ? LABEL[c.register] : 'الافتراض'}`;
          return (
            <Fragment key={`${c.pack}-${c.register ?? 'default'}`}>
            {rowHead}
            <button
              type="button"
              data-cell-pick={i}
              role="radio"
              aria-checked={on}
              aria-label={label}
              tabIndex={on ? 0 : -1}
              onClick={() => { setAt(i); onApply?.(c.pack, c.register); }}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                padding: 0,
                minWidth: 0,
                minHeight: 24,
                textAlign: 'start',
                font: 'inherit',
                background: 'none',
                border: 0,
                borderRadius: 'var(--nova-radius-card)',
                outline: on ? '2px solid var(--nova-action)' : 'none',
                outlineOffset: 2,
              }}
            >
              <Cell pack={c.pack} register={c.register} />
            </button>
            </Fragment>
          );
        })}
      </div>

      </div>

      <p data-matrix-says="" aria-live="polite" style={{ margin: 0, fontSize: 12.5, color: 'var(--nova-ink-secondary)' }}>
        <bdi dir="ltr">{current.pack} · {current.register ?? 'default'}</bdi>
        {' — '}اضغط خليّةً لتطبيق تركيبها على المستند كلّه.
      </p>
    </div>
  );
}
