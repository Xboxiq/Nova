/* شريطُ الفَرق — والمرسومُ هو التقاطُعُ لا أحدُ الطرفَين.
   DeltaBar -- two readings on one axis, and the drawn thing is the difference.

   VISUAL-LAW SS19: when two paths share an axis, the information is in the
   intersection and not in either of them. The imported corpus has progress bars,
   which draw one number, and it has one bar whose fill and label openly disagree --
   82.8% of a row under a label reading 69. So this draws neither value. It draws
   the SPAN between them, and the readout is the signed delta, the only figure here
   that is not already visible.

   THE SPAN IS COMPUTED, NOT PLACED.

     inset: 3px calc(100% - max(value, base) * 1%) 3px calc(min(value, base) * 1%)

   `min()` and `max()` do the ordering, so nothing in React learns which reading is
   larger. Swap them and the bar is still right. And it is `inset` rather than a
   transform -- the corpus found this once, in upload 29 -- because animating a
   box's own edges keeps its 1px border 1px and its round caps round, where scaleX
   would stretch both.

   THE SIGN IS A COLOUR MIX, NOT A CLASS.

     color-mix(in oklab, success calc(clamp(0, (value - base) * 100, 1) * 100%), danger)

   `clamp` saturates, so the mix is pure success the instant the value passes the
   base and pure danger the instant it drops below. A sign function out of one
   declaration: no second element to light and darken, no attribute for React to
   keep in sync. The dial's tick highlights use the same saturating clamp for a
   step; this uses it for a sign. One idiom, two jobs.

   AND THE RICHNESS IS INFORMATION TOO. This file was rewritten for the same reason
   `value-arc.tsx` was: the first version was a hairline in a groove, correct and
   thin. The layers added are not decoration -- each is arithmetic on the same
   scalars the reading is:

     the well       a named inset bevel, so the track is a recess and not a line
     the bloom      the same inset as the span, blurred, so the glow IS the span
     the gradient   stops mixed off the same sign colour, lit from above (SS2)
     the ticks      eleven marks, lit by clamp against the value, like the dial's
     the cap        a machined pin with its own depth token
     the baseline   engraved: a dark hairline with a light edge under it

   THE EMPTY PART OF THE SCALE IS DATA (SS11). The track is not a groove for the
   fill to sit in: it carries the base's hairline, eleven marks and the two end
   numbers, so the distance from the reading to each end is legible with no fill at
   all.

   ONE FOCUS, TWO READINGS. The base is a declared reference, not a second control,
   so there is one `role="slider"` and the base lives in `aria-valuetext`. Two tab
   stops for one fact would be two stops that mean the same thing.

   Colour is entirely `--nova-*` and `color-mix()` off it, so this is a different
   instrument in each of the seven packs. Hover halves the bloom's drift rather than
   adding anything, behind a hover-capability guard. The repo blanket covers the
   animation; the block at the foot covers the transition. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const TICKS = Array.from({ length: 11 }, (_, i) => i);

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
  const labelId = 'nv-dlt-' + useId().replace(/:/g, '');

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
      <div className="gauge" style={{ ['--nv-value' as string]: value, ['--nv-base' as string]: ref }}>
        <div className="gauge__head">
          <span className="gauge__label" id={labelId}>{label}</span>
          <p className="gauge__readout">
            <output className="gauge__value">{signed(delta)}</output>
            <span className="gauge__unit">{unit}</span>
          </p>
        </div>

        <div
          className="gauge__track"
          role="slider"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={signed(delta) + unit + ', ' + (delta >= 0 ? 'above' : 'below') + ' the ' + ref + unit + ' baseline'}
          onKeyDown={onKeyDown}
        >
          <span className="gauge__well" aria-hidden="true" />
          {TICKS.map((i) => (
            <span key={i} className="gauge__tick" style={{ ['--i' as string]: i }} aria-hidden="true" />
          ))}
          {/* the glow carries the same inset, so it ends where the span ends */}
          <span className="gauge__bloom" aria-hidden="true" />
          <span className="gauge__span" aria-hidden="true" />
          <span className="gauge__baseline" aria-hidden="true" />
          <span className="gauge__cap" aria-hidden="true" />
        </div>

        {/* SS11 and SS22: the empty scale is data, and the base's number sits AT
            the base rather than centred by a rule that puts it where it is not. */}
        <div className="gauge__scale" aria-hidden="true">
          <span className="gauge__scale-min">0</span>
          <span className="gauge__scale-base">{ref}</span>
          <span className="gauge__scale-max">100</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Both must inherit: set on the root, read by six descendants. */
  @property --nv-value {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --nv-base {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  .gauge {
    /* the sign, resolved once and read by four layers */
    --nv-sign: clamp(0, calc((var(--nv-value) - var(--nv-base)) * 100), 1);
    --nv-tone: color-mix(
      in oklab,
      var(--nova-success) calc(var(--nv-sign) * 100%),
      var(--nova-danger)
    );

    display: grid;
    gap: 0.625rem;
    inline-size: 18rem;
    padding: 0.875rem 1rem 0.75rem;
    border: 1px solid var(--nova-border);
    border-radius: var(--r-lg);
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--nova-surface) 92%, white) 0%,
        var(--nova-surface) 42%
      );
    box-shadow: var(--depth-widget);
    transition:
      --nv-value 340ms cubic-bezier(0.22, 1, 0.36, 1),
      --nv-base 340ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .gauge__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .gauge__label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--nova-ink-secondary);
  }

  .gauge__readout {
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.125rem;
  }

  .gauge__value {
    font-size: 1.375rem;
    font-weight: 660;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    color: var(--nova-ink);
  }

  .gauge__unit {
    font-size: 0.75rem;
    color: var(--nova-ink-secondary);
  }

  .gauge__track {
    position: relative;
    block-size: 1.625rem;
    border-radius: var(--r-full);
    isolation: isolate;
  }

  .gauge__track:focus-visible {
    outline: 2px solid var(--nova-action);
    outline-offset: 4px;
  }

  /* a recess, not a line */
  .gauge__well {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: color-mix(in oklab, var(--nova-surface-quiet) 84%, black);
    box-shadow: var(--depth-instrument-well);
  }

  .gauge__tick {
    position: absolute;
    inset-block: 34%;
    inline-size: 1px;
    inset-inline-start: calc(var(--i) * 10%);
    translate: -0.5px 0;
    background: var(--nova-ink);
    /* clamp saturates, so this is a step function on the same scalar -- floored at
       0.18 rather than 0, because SS11 makes the unread part of a scale data too:
       at zero the marks vanished and the scale looked as though it ended at the
       needle. Lit is 1, unread is a ghost, and both are the same declaration. */
    opacity: calc(0.18 + clamp(0, calc((var(--nv-value) - var(--i) * 10) * 100), 1) * 0.82);
  }

  .gauge__span,
  .gauge__bloom {
    position: absolute;
    inset:
      3px
      calc(100% - max(var(--nv-value), var(--nv-base)) * 1%)
      3px
      calc(min(var(--nv-value), var(--nv-base)) * 1%);
    border-radius: var(--r-full);
  }

  .gauge__bloom {
    background: var(--nv-tone);
    filter: blur(7px);
    opacity: 0.55;
    animation: gaugeBreathe 5.5s ease-in-out infinite;
  }

  .gauge__span {
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--nv-tone) 66%, white) 0%,
        var(--nv-tone) 54%,
        color-mix(in oklab, var(--nv-tone) 78%, black) 100%
      );
    box-shadow:
      var(--depth-instrument-hub),
      0 0 0 1px color-mix(in oklab, var(--nv-tone) 40%, transparent);
  }

  /* engraved: a dark line with a light edge beneath it */
  .gauge__baseline {
    position: absolute;
    inset-block: -4px;
    inline-size: 2px;
    inset-inline-start: calc(var(--nv-base) * 1%);
    translate: -1px 0;
    border-radius: var(--r-full);
    background: var(--nova-ink);
    box-shadow: 1px 0 0 var(--bevel-hair);
  }

  /* a machined pin */
  .gauge__cap {
    position: absolute;
    inset-block: -3px;
    inline-size: 4px;
    inset-inline-start: calc(var(--nv-value) * 1%);
    translate: -2px 0;
    border-radius: var(--r-full);
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--nova-ink) 62%, white) 0%,
        var(--nova-ink) 100%
      );
    box-shadow: var(--depth-instrument-hub);
  }

  .gauge__scale {
    position: relative;
    block-size: 0.875rem;
    font-size: 0.6875rem;
    font-variant-numeric: tabular-nums;
    color: var(--nova-ink-secondary);
  }

  .gauge__scale-min,
  .gauge__scale-max,
  .gauge__scale-base {
    position: absolute;
    inset-block-start: 0;
  }

  .gauge__scale-min { inset-inline-start: 0; }
  .gauge__scale-max { inset-inline-end: 0; }

  .gauge__scale-base {
    inset-inline-start: calc(var(--nv-base) * 1%);
    translate: -50% 0;
    color: var(--nova-ink);
    font-weight: 600;
  }

  @keyframes gaugeBreathe {
    0%, 100% { opacity: 0.42; }
    50% { opacity: 0.68; }
  }

  @media (hover: hover) and (pointer: fine) {
    .gauge:hover .gauge__bloom { animation-duration: 2.6s; }
  }

  @media (prefers-reduced-motion: reduce) {
    .gauge {
      transition-duration: 1ms, 1ms;
    }
  }
`;

export default DeltaBar;
