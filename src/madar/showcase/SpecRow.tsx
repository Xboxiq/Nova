import { useState, type ReactNode } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   The showcase's composition, rebuilt.

   Thirty-four sections and twenty-four of them were the same equal auto-fit card
   grid — icon, title, short paragraph, three across. That is the exact layout
   `anti-slop-ui` #13 bans, and I had been checking only the shell for it while
   building it into every section I wrote. The owner's note that the look was not
   what they wanted was this, measured.

   The standard does not only forbid; it prescribes. #13 asks for asymmetrical
   layouts, deep master-detail rows and narrative splits, #14 for linear
   workflows over card collages, and #7 for "subtle background tone contrast" as
   the depth a shadow no longer provides. `SpecRow` is that:

     · unequal columns, not a fraction each — the specimen gets the room,
     · a hairline between them instead of two nested cards,
     · the side alternates down the section, so reading it is a rhythm rather
       than a scan of a grid,
     · the specimen stands on a toned stage, which is #7's own prescription.
──────────────────────────────────────────────────────────────────────── */

export interface SpecRowProps {
  name: string;
  /** What the piece claims, in one paragraph. Optional: some specimens are named
      and nothing more, and an invented sentence is worse than no sentence. */
  children?: ReactNode;
  specimen: ReactNode;
  /** The specimen is a full-width thing (a table, a board) rather than an object
      to be centred, so the stage stretches instead of shrink-wrapping it. */
  fill?: boolean;
  /** The specimen already paints its own surface — an upload folder, a bezel plate.
      A toned stage under it is the card-inside-a-card #13 bans, so the stage keeps
      the column and drops the tone. */
  bare?: boolean;
}

/* The ordinal and the alternation are CSS, not props: a counter numbers the rows
   in document order and `:nth-child(even)` flips the sides. That matters more than
   tidiness — it means a section's existing local wrapper can be reimplemented as
   one line of SpecRow without touching thirty call sites, which is how the rest of
   the library gets migrated without rewriting its JSX. */
export function SpecRow({ name, children, specimen, fill, bare }: SpecRowProps) {
  return (
    <div className="madar-spec-row" data-spec-row="">
      <div className="madar-spec-stage" data-spec-stage={bare ? 'bare' : fill ? 'fill' : ''}>{specimen}</div>
      <div className="madar-spec-copy">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span className="madar-spec-ordinal" aria-hidden="true" />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>{name}</h3>
        </div>
        {children ? <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: 'var(--text-2)' }}>{children}</p> : null}
      </div>
    </div>
  );
}

/** Wraps a run of rows so the counter resets per section. */
export function SpecList({ children }: { children: ReactNode }) {
  return <div className="madar-spec-list">{children}</div>;
}

export interface SpecShelfProps {
  children: ReactNode;
  /** The repeating rhythm of column spans out of twelve. */
  rhythm?: number[];
  label?: string;
  /** The items are already finished objects — a specular card, a bezel plate — so
      they get the rhythm without a plinth. A toned box under a card is the
      card-inside-a-card the standard bans. */
  bare?: boolean;
}

/* ── SpecShelf — specimens without statements, still not a grid.

   `SpecRow` is master-detail, and it needs a statement per specimen. Some sections
   are banks: four kinetics demos, six pattern cards, and no sentence attached to
   any one of them. Converting those to master-detail would mean inventing fifty
   paragraphs of copy, and invented copy is its own slop — so it was not done.

   `anti-slop-ui` #13 offers more than one replacement for the equal grid, and the
   one that fits a bank is the asymmetrical layout. Items take spans out of twelve
   on a repeating uneven rhythm — 7/5, then 5/7, then 12 — so no two rows are the
   same width and nothing needs a caption it does not have. The rhythm is stated
   rather than random, which is the difference between a composition and a
   scatter: `-3.5°, 2.1°, -1.2°` reads as a hand, and §4 asks for exactly that.
──────────────────────────────────────────────────────────────────────── */
export function SpecShelf({ children, rhythm = [7, 5, 5, 7, 12], label, bare }: SpecShelfProps) {
  const items = Array.isArray(children) ? children : [children];
  const flat = items.flat().filter(Boolean);

  return (
    <div
      data-spec-shelf=""
      role="group"
      aria-label={label}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        gap: 'var(--sp-5, 24px)',
        paddingBlockStart: bare ? 0 : 28,
        borderBlockStart: bare ? undefined : '1px solid var(--border)',
      }}
    >
      {flat.map((child, i) => (
        <div
          key={i}
          data-shelf-item={rhythm[i % rhythm.length]}
          style={{
            gridColumn: `span ${rhythm[i % rhythm.length]}`,
            display: 'grid',
            placeItems: bare ? 'stretch' : 'center',
            ...(bare
              ? null
              : {
                  padding: 22,
                  // tone contrast rather than a card: #7's own replacement for the
                  // shadow, and it stops a card sitting inside a card
                  background: 'var(--surface-2)',
                  borderRadius: 'var(--r-xs)',
                }),
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export interface SpecStackProps {
  /** One entry per variant. Collapsed they layer; expanded they stand apart. */
  items: { label: string; node: ReactNode }[];
  collapsedLabel?: string;
  expandedLabel?: string;
}

/* ── SpecStack — variants layered, and depth from three ramps.

   VISUAL-LAW.md §20, taken from the notification stack in the reference account:
   depth there is not a shadow. Each layer is *lower, smaller and dimmer* than the
   one in front by a fixed step — `translateY: i × 18`, `scale: 1 − i × 0.05`,
   `opacity: 1 − i × 0.1` — and three ramps together read as distance where one
   would read as a mistake.

   Which is exactly what a system with no drop shadows needs. It expands on a
   press rather than on hover, because #21 bans the hover transform and because a
   pointer already down is direct manipulation rather than an invitation. */
export function SpecStack({ items, collapsedLabel = 'افردها', expandedLabel = 'اجمعها' }: SpecStackProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 14, width: '100%', placeItems: 'center' }}>
      <div
        data-spec-stack={open ? 'open' : 'closed'}
        style={{
          display: open ? 'grid' : 'block',
          gap: open ? 18 : 0,
          position: 'relative',
          width: '100%',
          placeItems: 'center',
          // closed, the layers overlap and the tallest sets the height
          minHeight: open ? undefined : 120,
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            data-layer={i}
            style={{
              ...(open
                ? { position: 'relative', transform: 'none', opacity: 1, zIndex: 1 }
                : {
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: i === 0 ? undefined : 0,
                  display: 'grid',
                  placeItems: 'center',
                  // the three ramps: lower, smaller, dimmer — one step each
                  transform: `translateY(${i * 18}px) scale(${1 - i * 0.05})`,
                  opacity: 1 - i * 0.1,
                  zIndex: items.length - i,
                  pointerEvents: i === 0 ? undefined : 'none',
                }),
              transition: 'transform var(--dur-3) var(--ease-out), opacity var(--dur-3) var(--ease-out)',
            }}
          >
            {item.node}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: '6px 14px', fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
          color: 'var(--text-2)', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 'var(--r-xs)', cursor: 'pointer',
          transition: 'border-color var(--dur-2) var(--ease-out)',
        }}
      >
        {open ? expandedLabel : collapsedLabel}
        <span style={{ marginInlineStart: 8, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
          <bdi dir="ltr">{items.length}</bdi>
        </span>
      </button>
    </div>
  );
}
