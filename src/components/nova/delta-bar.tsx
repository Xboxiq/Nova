/* شريطُ الفَرق — والمرسومُ هو التقاطُعُ لا أحدُ الطرفَين.
   DeltaBar -- two readings on one axis, and the drawn thing is the difference.

   VISUAL-LAW SS19 says that when two paths share an axis, the information is in
   the intersection and not in either of them. Nothing in the imported corpus does
   that: it has progress bars, which draw one number, and it has bars whose fill
   and whose label disagree -- the fifteen-zone card shows 82.8% of a row under a
   label reading 69. So this bar draws neither value. **It draws the span between
   them**, and the readout is the signed delta, because that is the only figure
   here that is not already visible.

   THE SPAN IS COMPUTED, NOT PLACED. The fill's box is derived from both scalars at
   once, in CSS:

     inset: 0 calc(100% - max(value, base) * 1%) 0 calc(min(value, base) * 1%)

   so `min()` and `max()` do the ordering and nothing in React needs to know which
   reading is the larger. Swap them and the bar is still correct.

   AND IT IS `inset`, NOT `transform`. The corpus found this once, in upload 29:
   animating `inset` moves a box's own edges apart, so a 1px border stays 1px --
   where `scaleX` would stretch the border along with the box and thicken it. Here
   that matters more than it did there, because this fill has a visible cap on each
   end and a scaled cap is an oval.

   THE SIGN IS A COLOUR MIX, NOT A CLASS. Direction is not passed in; it is
   derived:

     color-mix(in oklab, success calc(clamp(0, (value - base) * 100, 1) * 100%), danger)

   `clamp` saturates, so the mix is 100% success the moment the value passes the
   base and 0% the moment it drops below -- a sign function out of one declaration,
   with no second element to light and darken and no attribute for React to keep in
   sync. The tick highlights in `value-arc.tsx` use the same saturating clamp for a
   step; this uses it for a sign. One idiom, two jobs.

   THE EMPTY PART OF THE SCALE IS DATA TOO (SS11). The track is not a groove for
   the fill to sit in: it carries the base's hairline and the two end labels, so
   the distance from the reading to each end of the range is legible without the
   fill. A bar whose empty half says nothing is a bar that has thrown half its
   information away.

   ONE FOCUS, TWO READINGS. The base is a declared reference, not a second control,
   so there is one `role="slider"` and the base lives in `aria-valuetext` -- "+7,
   above the 55 baseline". Two focusables for one fact would be two tab stops that
   both mean the same thing.

   Colour comes entirely from `--nova-*`, so this is a different instrument in each
   of the seven packs, and the reduced-motion block is its own: the repo blanket
   neutralises animations and this has only a transition. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const clampValue = (n: number) => Math.min(100, Math.max(0, n));
const signed = (n: number) => (n > 0 ? '+' + n : String(n));

export const DeltaBar = ({
  label = 'Throughput',
  unit = '%',
  base = 55,
  value: controlled,
  defaultValue = 62,
  onChange,
}: {
  label?: string;
  unit?: string;
  base?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (n: number) => void;
}) => {
  const [own, setOwn] = useState(defaultValue);
  const value = clampValue(controlled ?? own);
  const ref = clampValue(base);
  const delta = Math.round((value - ref) * 10) / 10;
  const labelId = useId();

  const set = (n: number) => {
    const v = clampValue(n);
    if (controlled === undefined) setOwn(v);
    onChange?.(v);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === 'PageUp' || e.key === 'PageDown' ? 10 : 1;
    const dir =
      e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'PageUp' ? 1
      : e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'PageDown' ? -1
      : 0;
    if (dir !== 0) { e.preventDefault(); set(value + dir * step); return; }
    if (e.key === 'Home') { e.preventDefault(); set(0); }
    if (e.key === 'End') { e.preventDefault(); set(100); }
  };

  return (
    <StyledWrapper>
      <div className="delta" style={{ ['--nv-value' as string]: value, ['--nv-base' as string]: ref }}>
        <div className="delta__head">
          <span className="delta__label" id={labelId}>{label}</span>
          <p className="delta__readout">
            <output className="delta__value">{signed(delta)}</output>
            <span className="delta__unit">{unit}</span>
          </p>
        </div>

        <div
          className="delta__track"
          role="slider"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={signed(delta) + unit + ', ' + (delta >= 0 ? 'above' : 'below') + ' the ' + ref + unit + ' baseline'}
          onKeyDown={onKeyDown}
        >
          {/* the span between the two readings, ordered by min()/max() in CSS */}
          <span className="delta__span" aria-hidden="true" />
          <span className="delta__baseline" aria-hidden="true" />
          <span className="delta__cap" aria-hidden="true" />
        </div>

        {/* SS11: the empty part of the scale is data too. And SS22: the base's
            label sits AT the base, not centred by a flex rule that happens to
            put a number where the number is not. */}
        <div className="delta__scale" aria-hidden="true">
          <span className="delta__scale-min">0</span>
          <span className="delta__scale-base">{ref}</span>
          <span className="delta__scale-max">100</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @property --nv-value {
    syntax: "<number>";
    /* inherits: TRUE, and this was measured the hard way. The first draft wrote
       'inherits: false' -- lifted from this repo's own vocabulary note, where it is
       recommended to stop one instrument's value leaking into another. It does that,
       and it also stops the value ARRIVING: set on the root and read in the
       descendants, every one of them computed the registered initial instead. The
       dash measured 0 with the readout showing 62, the needle sat at -135deg, and
       all eleven ticks were dark.

       A scalar read by descendants must inherit. What prevents the leak is not the
       descriptor, it is that every instance declares its own value on its own root,
       so a nested instrument shadows the outer one -- which is the same rule that
       made upload 46's 'body:has()' a no-op, read from the useful side. */
    inherits: true;
    initial-value: 0;
  }
  @property --nv-base {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  .delta {
    display: grid;
    gap: 0.5rem;
    inline-size: 17rem;
    padding: 0.875rem 1rem 0.75rem;
    border: 1px solid var(--nova-border);
    border-radius: var(--r-lg);
    background: var(--nova-surface);
    box-shadow: var(--depth-widget);
    transition:
      --nv-value 320ms cubic-bezier(0.22, 1, 0.36, 1),
      --nv-base 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .delta__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .delta__label {
    font-size: 0.8125rem;
    color: var(--nova-ink-secondary);
  }

  .delta__readout {
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.125rem;
  }

  .delta__value {
    font-size: 1.125rem;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
    color: var(--nova-ink);
  }

  .delta__unit {
    font-size: 0.75rem;
    color: var(--nova-ink-secondary);
  }

  .delta__track {
    position: relative;
    block-size: 1.25rem;
    border: 1px solid var(--nova-border);
    border-radius: var(--r-full);
    background: var(--nova-surface-quiet);
    isolation: isolate;
  }

  .delta__track:focus-visible {
    outline: 2px solid var(--nova-action);
    outline-offset: 3px;
  }

  /* inset, so the 1px border and the two caps keep their shape */
  .delta__span {
    position: absolute;
    inset:
      2px
      calc(100% - max(var(--nv-value), var(--nv-base)) * 1%)
      2px
      calc(min(var(--nv-value), var(--nv-base)) * 1%);
    border-radius: var(--r-full);
    /* the sign, out of one saturating clamp */
    background: color-mix(
      in oklab,
      var(--nova-success)
        calc(clamp(0, calc((var(--nv-value) - var(--nv-base)) * 100), 1) * 100%),
      var(--nova-danger)
    );
  }

  .delta__baseline {
    position: absolute;
    inset-block: -3px;
    inline-size: 2px;
    inset-inline-start: calc(var(--nv-base) * 1%);
    translate: -1px 0;
    border-radius: var(--r-full);
    background: var(--nova-ink);
  }

  .delta__cap {
    position: absolute;
    inset-block: -2px;
    inline-size: 3px;
    inset-inline-start: calc(var(--nv-value) * 1%);
    translate: -1.5px 0;
    border-radius: var(--r-full);
    background: var(--nova-ink);
  }

  .delta__scale {
    position: relative;
    block-size: 0.875rem;
    font-size: 0.6875rem;
    font-variant-numeric: tabular-nums;
    color: var(--nova-ink-secondary);
  }

  .delta__scale-min,
  .delta__scale-max {
    position: absolute;
    inset-block-start: 0;
  }

  .delta__scale-min {
    inset-inline-start: 0;
  }

  .delta__scale-max {
    inset-inline-end: 0;
  }

  /* Under its own hairline, at the base's own percentage. */
  .delta__scale-base {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: calc(var(--nv-base) * 1%);
    translate: -50% 0;
    color: var(--nova-ink);
    font-weight: 600;
  }

  @media (prefers-reduced-motion: reduce) {
    .delta {
      transition-duration: 1ms, 1ms;
    }
  }
`;

export default DeltaBar;
