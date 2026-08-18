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
  /** The ordinal in the section. A real sequence, so it is numbered. */
  n: number;
  name: string;
  /** What the piece claims, in one paragraph. */
  children: ReactNode;
  specimen: ReactNode;
  /** Flips which side the specimen takes. The section alternates it. */
  flip?: boolean;
}

export function SpecRow({ n, name, children, specimen, flip = false }: SpecRowProps) {
  return (
    <div
      data-spec-row={flip ? 'flipped' : 'normal'}
      style={{
        display: 'grid',
        // deliberately unequal: 1.45 to 1, because a half each says the
        // statement and the specimen weigh the same, and they do not
        gridTemplateColumns: flip ? 'minmax(0,1fr) minmax(0,1.45fr)' : 'minmax(0,1.45fr) minmax(0,1fr)',
        gap: 'var(--sp-6, 32px)',
        alignItems: 'start',
        paddingBlock: 34,
        borderBlockStart: '1px solid var(--border)',
      }}
    >
      <div
        data-spec-stage=""
        style={{
          gridColumn: flip ? 2 : 1,
          gridRow: 1,
          display: 'grid',
          placeItems: 'center',
          padding: 26,
          // tone contrast, not a card: no border, no radius competing with the
          // specimen's own, and the ground reads as the surface it stands on
          background: 'var(--surface-2)',
          borderRadius: 'var(--r-xs)',
        }}
      >
        {specimen}
      </div>

      <div style={{ gridColumn: flip ? 1 : 2, gridRow: 1, display: 'grid', gap: 10, paddingBlockStart: 4 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <bdi dir="ltr">{String(n).padStart(2, '0')}</bdi>
          </span>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>{name}</h3>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: 'var(--text-2)' }}>{children}</p>
      </div>
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
