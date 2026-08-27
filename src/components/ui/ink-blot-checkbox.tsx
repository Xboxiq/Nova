/* A ripple that never becomes visible, and a tick drawn by a moving clip.

   Measure the ripple before believing it. `.ripple` is
   `transform: scale(0); opacity: 0` at rest, and the checked rule sets
   `transform: scale(3.8); opacity: 0`. Opacity is zero in BOTH states. So the
   element scales up 3.8 times over 0.7 seconds while remaining completely
   transparent -- the "ripple" this component is built around is never drawn.
   Measured across the click: opacity "0" before and "0" after, while the
   transform goes from scale(0) to scale(3.8). It
   is kept exactly as written; the transition on a property nothing can see is
   the author's, and naming it is worth more than silently supplying the 1 it
   probably wanted.

   The tick is the good part. `.ink-check` is a 26x14 box with only a left and a
   bottom border, rotated -45deg -- two edges of a rectangle turned into a
   checkmark. It is revealed by `clip-path: inset(0 100% 0 0)` opening to
   `inset(0 0 0 0)`, which sweeps the clip left-to-right, so the tick appears to
   be STROKED rather than to fade or scale in. And it carries
   `transition-delay: 0.28s` only in the checked state, so it waits for the blot
   to arrive and then draws itself.

   The blot floods by overrunning its own container. `.ink` is 18px and scales to
   5.2 -- 93.6px inside a 72px box with `overflow: hidden` -- so there is no state
   where a circle is seen growing to fit; it simply becomes the background. And
   its border-radius shifts from `48% 52% 45% 55%` to `43% 57% 52% 48%`, four
   values that are all near 50% and none of them equal: that irregularity is what
   makes it read as ink rather than as a circle.

   The six drops carry their own `--x`, `--y`, `--size` and a stagger of 0.03s
   each, so their positions are data in the CSS rather than markup.

   One addition, and it is the difference between working and not working:
   `.ink-checkbox input { display: none }` -- the seventh time in this log.
   `display: none` does not hide a checkbox, it deletes it: unfocusable, out of
   the tab order, out of the accessibility tree, operable by pointer alone.
   Replaced with the visually-hidden clip, which keeps every one of those and
   changes nothing on screen. Plus a focus ring on the box, since the input now
   takes focus and paints nothing. */
import { useId } from 'react';
import styled from 'styled-components';

const DROPS = ['drop-one', 'drop-two', 'drop-three', 'drop-four', 'drop-five', 'drop-six'];

export const InkBlotCheckbox = ({
  label = 'Approve',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'input'>) => {
  const id = useId();

  return (
    <StyledWrapper>
      <label className="ink-checkbox" htmlFor={id}>
        <input type="checkbox" id={id} aria-label={label} {...rest} />
        <span className="ink-box">
          <span className="ripple" />
          <span className="ink" />
          {DROPS.map((d) => (
            <span className={`drop ${d}`} key={d} />
          ))}
          <span className="ink-check" />
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ink-checkbox {
    position: relative;
    width: 72px;
    height: 72px;
    display: block;
    cursor: pointer;
  }

  /* The upload writes "display: none" here, which deletes the control rather
     than hiding it. The clip keeps the box, the focus and the a11y node. */
  .ink-checkbox input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: 0;
  }

  .ink-checkbox input:focus-visible + .ink-box {
    outline: 3px solid #111;
    outline-offset: 4px;
  }

  .ink-box {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border: 2px solid #111;
    border-radius: 19px;
    background: #eee;
    transition:
      transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
      border-radius 0.55s ease,
      background 0.4s ease;
  }

  .ink {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 50%;
    top: 50%;
    border-radius: 48% 52% 45% 55%;
    background: #111;
    transform: translate(-50%, -50%) scale(0);
    transition:
      transform 0.72s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.5s ease;
  }

  .ink::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 2px solid #111;
    border-radius: 50%;
    transform: scale(0.65);
    opacity: 0;
    transition:
      transform 0.6s ease,
      opacity 0.3s ease;
  }

  .ripple {
    position: absolute;
    width: 22px;
    height: 22px;
    left: 50%;
    top: 50%;
    border: 2px solid #111;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition:
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.5s ease;
  }

  .ink-check {
    position: absolute;
    width: 26px;
    height: 14px;
    left: 50%;
    top: 50%;
    /* Not an accent stripe: this border and the one below it are the two edges
       that FORM the checkmark, which is why the shape needs exactly two of the
       four. The CSS branch of rule 11 already exempts "transparent" side borders
       as the triangle trick; a side border used as geometry is the same case.
       anti-slop-ignore-next-line 11 */
    border-left: 4px solid #eee;
    border-bottom: 4px solid #eee;
    transform: translate(-50%, -50%) rotate(-45deg) scale(0);
    transform-origin: center;
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    transition:
      clip-path 0.45s cubic-bezier(0.65, 0, 0.35, 1),
      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.2s ease;
  }

  .drop {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: #111;
    transform: translate(-50%, -50%) translate(0, 0) scale(0);
    opacity: 0;
    transition:
      transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.25s ease;
  }

  .drop-one {
    --x: -27px;
    --y: -23px;
    --size: 5px;
    transition-delay: 0.03s;
  }

  .drop-two {
    --x: 29px;
    --y: -16px;
    --size: 4px;
    transition-delay: 0.06s;
  }

  .drop-three {
    --x: 25px;
    --y: 28px;
    --size: 7px;
    transition-delay: 0.09s;
  }

  .drop-four {
    --x: -29px;
    --y: 25px;
    --size: 4px;
    transition-delay: 0.12s;
  }

  .drop-five {
    --x: 8px;
    --y: -31px;
    --size: 3px;
    transition-delay: 0.15s;
  }

  .drop-six {
    --x: -9px;
    --y: 31px;
    --size: 3px;
    transition-delay: 0.18s;
  }

  .ink-checkbox input:checked + .ink-box {
    background: #111;
    border-color: #111;
    border-radius: 21px;
  }

  .ink-checkbox input:checked + .ink-box .ink {
    transform: translate(-50%, -50%) scale(5.2);
    border-radius: 43% 57% 52% 48%;
  }

  .ink-checkbox input:checked + .ink-box .ink::before {
    transform: scale(1.35);
    opacity: 0.18;
  }

  .ink-checkbox input:checked + .ink-box .ripple {
    transform: translate(-50%, -50%) scale(3.8);
    opacity: 0;
  }

  .ink-checkbox input:checked + .ink-box .drop {
    transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1);
    opacity: 1;
  }

  .ink-checkbox input:checked + .ink-box .ink-check {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    transform: translate(-50%, -50%) rotate(-45deg) scale(1);
    transition-delay: 0.28s;
  }

  .ink-checkbox:hover .ink-box {
    transform: scale(1.045);
  }

  .ink-checkbox:hover .ink {
    transform: translate(-50%, -50%) scale(0.65);
  }

  .ink-checkbox:active .ink-box {
    transform: scale(0.91);
  }
`;
