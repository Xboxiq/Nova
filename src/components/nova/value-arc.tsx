/* قوسُ القيمة — أوّلُ آلةٍ في هذه العائلة.
   ValueArc -- the first instrument in this family.

   WHAT THIS IS FOR. The imported corpus is ninety-five decorations: motion that
   looks like something happening. Almost none of it CARRIES a reading, and
   VISUAL-LAW SS15 and SS22 both say a measured quantity must be drawn measured.
   So the family this file opens has one rule of its own: **the motion is the
   reading**, and nothing in it is a second copy of a number written elsewhere.

   ONE REGISTERED SCALAR, FOUR SYNCHRONISED FACTS. `--nv-value` is registered as a
   `<number>` and set once, from the value. Everything visible is arithmetic on it:

     the arc     stroke-dasharray: var(--nv-value) 100   with pathLength="100"
     the needle  rotate(calc(-135deg + var(--nv-value) * 2.7deg))
     the ticks   opacity: clamp(0, (var(--nv-value) - var(--i) * 10) * 100, 1)
     the readout the same number, from the same prop

   That is the corpus's best idea -- upload 46 drove an entire button off one
   `--active` -- pointed at information instead of at glow. And because a
   registered property INTERPOLATES, one `transition` on `--nv-value` moves the
   arc, the needle and eleven tick opacities together, on one timeline, with no
   script and no per-element animation. The corpus never once did that: it
   animated elements, so its elements drifted apart.

   THE DASH IS THE NUMBER, NOT A PICTURE OF IT. `pathLength="100"` makes
   `stroke-dasharray` read in percent regardless of the arc's real length, so
   `var(--nv-value) 100` is the value itself. The corpus used `pathLength` six
   times and every one was decorative -- a ring drawing itself in. Here there is
   no conversion step to get wrong, and changing the arc's radius cannot desync
   the reading from the geometry.

   THE TICK HIGHLIGHT IS CALC, NOT A CLASS. `clamp(0, (value - i * 10) * 100, 1)`
   is 1 for every tick at or below the value and 0 above it -- a step function
   built out of clamp's own saturation. So React sets no per-tick class, and the
   ticks light in order DURING the interpolation rather than after it.

   TWO THINGS THE CORPUS DID NOT DO, AND THEY ARE THE POINT.

   1. **It reads the theme.** Every one of the ninety-five imported components
      hardcodes its own palette, which is why each had to be given a fixed ground
      in the showcase and why all seven theme packs look identical on them. This
      one is drawn entirely in `--nova-*` tokens, so it is a different instrument
      in every pack, and the contrast gate exercises it across all seven rather
      than being told to skip it.

   2. **It answers reduced motion itself.** The repo blanket in `tokens.css:326`
      neutralises ANIMATIONS. This component has no animations -- it has
      transitions, which the blanket does not touch -- so the block at the foot of
      this file is not decoration: without it, a reader who asked for less motion
      still gets a sweeping needle. One of ninety-five uploads shipped its own
      answer; this family ships one every time.

   OPERABLE FROM THE FIRST LINE. `role="slider"` with the four value attributes,
   arrows for one step, PageUp/PageDown for ten, Home/End for the ends, and a
   `:focus-visible` ring. The corpus's habit was the opposite -- a control drawn,
   `outline: none`, and the state reachable only by pointer. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const TICKS = Array.from({ length: 11 }, (_, i) => i);

/* 270deg opening at the bottom: theta -135deg to +135deg about (60, 62), r = 46.
   The endpoints are computed, not eyeballed -- 46 * sin(135deg) = 32.527. */
const ARC = 'M27.473 94.527 A46 46 0 1 1 92.527 94.527';

const clampValue = (n: number) => Math.min(100, Math.max(0, n));

export const ValueArc = ({
  label = 'Load',
  unit = '%',
  value: controlled,
  defaultValue = 62,
  onChange,
}: {
  label?: string;
  unit?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (n: number) => void;
}) => {
  const [own, setOwn] = useState(defaultValue);
  const value = clampValue(controlled ?? own);
  const labelId = useId();

  const set = (n: number) => {
    const v = clampValue(n);
    if (controlled === undefined) setOwn(v);
    onChange?.(v);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step =
      e.key === 'PageUp' || e.key === 'PageDown' ? 10 : 1;
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
      <div
        className="arc"
        style={{ ['--nv-value' as string]: value }}
        role="slider"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={value + unit}
        onKeyDown={onKeyDown}
      >
        <svg className="arc__face" viewBox="0 0 120 120" aria-hidden="true">
          <path className="arc__track" d={ARC} pathLength={100} />
          {/* the dash IS the value */}
          <path className="arc__fill" d={ARC} pathLength={100} />
          {TICKS.map((i) => (
            <line
              key={i}
              className="arc__tick"
              x1="60" y1="16" x2="60" y2="22"
              style={{ ['--i' as string]: i }}
            />
          ))}
          <line className="arc__needle" x1="60" y1="62" x2="60" y2="26" />
          <circle className="arc__hub" cx="60" cy="62" r="4" />
        </svg>

        <p className="arc__readout">
          <output className="arc__value">{value}</output>
          <span className="arc__unit">{unit}</span>
        </p>
        <span className="arc__label" id={labelId}>{label}</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* The family's scalar. Registered, so it interpolates. */
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

  .arc {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 0.25rem;
    padding: 1rem 1.25rem 0.875rem;
    inline-size: 13rem;
    border: 1px solid var(--nova-border);
    border-radius: var(--r-lg);
    background: var(--nova-surface);
    box-shadow: var(--depth-widget);
    /* one interpolation, four synchronised readings */
    transition: --nv-value 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .arc:focus-visible {
    outline: 2px solid var(--nova-action);
    outline-offset: 3px;
  }

  .arc__face {
    inline-size: 8.5rem;
    block-size: 8.5rem;
    overflow: visible;
  }

  .arc__track,
  .arc__fill {
    fill: none;
    stroke-width: 7;
    stroke-linecap: round;
  }

  .arc__track {
    stroke: var(--nova-border);
  }

  .arc__fill {
    stroke: var(--nova-action);
    /* pathLength is 100, so this is the reading and not a conversion of it */
    stroke-dasharray: var(--nv-value) 100;
  }

  .arc__tick {
    stroke: var(--nova-ink);
    stroke-width: 2;
    stroke-linecap: round;
    transform-box: view-box;
    transform-origin: 60px 62px;
    transform: rotate(calc(-135deg + var(--i) * 27deg));
    /* clamp saturates, so this is a step function on the same scalar */
    opacity: clamp(0, calc((var(--nv-value) - var(--i) * 10) * 100), 1);
  }

  .arc__needle {
    stroke: var(--nova-ink);
    stroke-width: 2.5;
    stroke-linecap: round;
    transform-box: view-box;
    transform-origin: 60px 62px;
    transform: rotate(calc(-135deg + var(--nv-value) * 2.7deg));
  }

  .arc__hub {
    fill: var(--nova-surface);
    stroke: var(--nova-ink);
    stroke-width: 2.5;
  }

  .arc__readout {
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.125rem;
    color: var(--nova-ink);
  }

  .arc__value {
    font-size: 1.75rem;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .arc__unit {
    font-size: 0.875rem;
    color: var(--nova-ink-secondary);
  }

  .arc__label {
    font-size: 0.8125rem;
    color: var(--nova-ink-secondary);
  }

  /* The repo blanket neutralises animations. This instrument has none -- it has a
     transition -- so without this a reader who asked for less motion still gets a
     sweeping needle. */
  @media (prefers-reduced-motion: reduce) {
    .arc {
      transition-duration: 1ms;
    }
  }
`;

export default ValueArc;
