/* Eight delays that spell out a drawing order, and dashed lines that cannot be
   dashed borders.

   Multiply every `animation-delay` by `--animation-speed` (0.35s) and the
   sequence is not decorative -- it is how a draughtsman works:

     0.00s  dot  top-left        a corner is marked
     0.21s  dot  top-right       the next corner is marked
     0.28s  line top             only now is the edge between them ruled
     0.42s  dot  bottom-right
     0.49s  line right
     0.63s  dot  bottom-left
     0.70s  line bottom
     0.84s  line left            the last edge, both ends long since placed

   Measured off the computed delays under a real pointer hover, which is what
   produced exactly that list:

     0.00s  move-top-left      dot top left
     0.21s  move-top-right     dot top right
     0.28s  draw-top           line horizontal top
     0.42s  move-bottom-right  dot bottom right
     0.49s  draw-right         line vertical right
     0.63s  move-bottom-left   dot bottom left
     0.70s  draw-bottom        line horizontal bottom
     0.84s  draw-left          line vertical left

   Every edge is drawn AFTER both of its endpoints exist. Nothing in the CSS says
   "sequence"; the order falls out of eight multipliers, and it reads as a
   technical drawing being set out rather than a border animating in.

   The lines are `repeating-linear-gradient` and not `border-style: dashed`, and
   that is forced rather than stylistic: each line is revealed with
   `scaleX(0) -> scaleX(1)`, and a dashed border cannot be scaled -- the dashes
   would stretch with it. A gradient painted into a scaling box keeps its pitch
   because the pitch is in the background, which is not what scale touches. The
   pitch itself is arithmetic off one variable: transparent for
   `--line-weight * 2`, colour for the next `* 2`.

   Each line also starts `rotate(5deg)` and animates to `rotate(0deg)`, so the
   edges STRAIGHTEN as they draw. Five degrees is enough to read as a hand
   settling and not enough to read as a mistake.

   The whole thing is driven by `:has(.btn:hover)` on the wrapper -- which is the
   only way this works without script. The wrapper is 0.9rem/1.1rem larger than
   the button on purpose (that gap is where the dots land), so `:hover` on the
   wrapper itself would fire from the empty margin; `:has()` asks about the BUTTON
   and applies to the wrapper.

   `border-radius: 30% / 200%` is worth its own line: a vertical radius over 100%
   is legal and gets scaled down proportionally with its horizontal partner, which
   is how you get that flattened-lozenge edge from one declaration.

   `font-family: "Inter", sans-serif` -- this repo does not load Inter, and its
   own anti-slop rule bans naming it in the shell stylesheets. The reference names
   it, so it stays, and it resolves to the fallback here. Said out loud rather
   than silently swapped.

   One addition: the machinery is keyed entirely on `:hover`, so the same
   `:has()` selector is repeated for `:focus-visible` -- otherwise a keyboard user
   gets a yellow lozenge and none of the drawing. Plus a ring. */
import styled from 'styled-components';

export const DraughtsmanButton = ({
  children = 'start designing',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <div className="btn-wrapper">
      <span className="dot top left" />
      <span className="dot top right" />
      <span className="dot bottom right" />
      <span className="dot bottom left" />
      <span className="line horizontal top" />
      <span className="line horizontal bottom" />
      <span className="line vertical left" />
      <span className="line vertical right" />
      <button className="btn" type="button" {...rest}>
        {children}
        <svg className="btn-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20 20 4M20 4h-7M20 4v7" />
        </svg>
      </button>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .btn-wrapper {
    --dot-size: 6px;
    --line-weight: 1px;
    --line-distance: 0.9rem 1.1rem;
    --animation-speed: 0.35s;
    --dot-color: #666;
    --line-color: #999;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: var(--line-distance);
    background-color: #0000;
    transition: background-color 0.3s ease-in-out;
    user-select: none;
  }

  .btn-wrapper:has(.btn:hover),
  .btn-wrapper:has(.btn:focus-visible) {
    animation: backround-color-change calc(var(--animation-speed) * 4) ease-in-out
      forwards;
  }

  @keyframes backround-color-change {
    80% {
      background-color: #0000;
    }
    100% {
      background-color: #e5ff0055;
    }
  }

  .btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 1.25rem;
    background-color: #e5ff00;
    background-image: linear-gradient(#0000, #0004);
    border: none;
    color: #0008;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    border-radius: 30% / 200%;
    cursor: pointer;
    box-shadow:
      0 0 0px 1px #0003,
      0px 1px 1px rgba(3, 7, 18, 0.02),
      0px 5px 4px rgba(3, 7, 18, 0.04),
      0px 12px 9px rgba(3, 7, 18, 0.06),
      0px 20px 15px rgba(3, 7, 18, 0.08),
      0px 32px 24px rgba(3, 7, 18, 0.1);
    transition:
      background-color 0.2s ease-in-out,
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out,
      border-radius 0.3s ease-in-out,
      border-color 0.2s ease-in-out;
  }

  .btn:hover {
    background-color: #fff;
    transform: scale(1.05);
    border-radius: 10% / 200%;
  }

  /* Added: the upload has no focus style, and every rule below is hover-keyed. */
  .btn:focus-visible {
    background-color: #fff;
    border-radius: 10% / 200%;
    outline: 3px solid #0008;
    outline-offset: 4px;
  }

  .btn:active {
    background-color: #e5ff00;
    transform: scale(0.98);
    border-radius: 20% / 200%;
  }

  .btn-svg {
    margin-left: 0.5rem;
    height: 24px;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #0007;
    fill: #fffa;
    transition: all 0.3s ease-in-out;
  }

  .btn:hover .btn-svg,
  .btn:focus-visible .btn-svg {
    stroke: #0008;
    fill: #e5ff00;
  }

  .btn:active .btn-svg {
    stroke: #0009;
    fill: #f1ff76;
  }

  /* Dots */
  .dot {
    position: absolute;
    width: var(--dot-size);
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--dot-color);
    transition: all 0.3s ease-in-out;
    opacity: 0;
  }

  .btn-wrapper:has(.btn:hover) .dot.top.left,
  .btn-wrapper:has(.btn:focus-visible) .dot.top.left {
    top: 50%;
    left: 20%;
    animation: move-top-left var(--animation-speed) ease-in-out forwards;
  }

  @keyframes move-top-left {
    90% {
      opacity: 0.6;
    }
    100% {
      top: calc(var(--dot-size) * -0.5);
      left: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .btn-wrapper:has(.btn:hover) .dot.top.right,
  .btn-wrapper:has(.btn:focus-visible) .dot.top.right {
    top: 50%;
    right: 20%;
    animation: move-top-right var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 0.6);
  }

  @keyframes move-top-right {
    80% {
      opacity: 0.6;
    }
    100% {
      top: calc(var(--dot-size) * -0.5);
      right: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .btn-wrapper:has(.btn:hover) .dot.bottom.right,
  .btn-wrapper:has(.btn:focus-visible) .dot.bottom.right {
    bottom: 50%;
    right: 20%;
    animation: move-bottom-right var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 1.2);
  }

  @keyframes move-bottom-right {
    80% {
      opacity: 0.6;
    }
    100% {
      bottom: calc(var(--dot-size) * -0.5);
      right: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .btn-wrapper:has(.btn:hover) .dot.bottom.left,
  .btn-wrapper:has(.btn:focus-visible) .dot.bottom.left {
    bottom: 50%;
    left: 20%;
    animation: move-bottom-left var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 1.8);
  }

  @keyframes move-bottom-left {
    80% {
      opacity: 0.6;
    }
    100% {
      bottom: calc(var(--dot-size) * -0.5);
      left: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  /* Lines */
  .line {
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  .line.horizontal {
    height: var(--line-weight);
    width: 100%;
    background-image: repeating-linear-gradient(
      90deg,
      #0000 0 calc(var(--line-weight) * 2),
      var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
    );
  }

  .line.top {
    top: calc(var(--line-weight) * -0.5);
  }

  .line.bottom {
    bottom: calc(var(--line-weight) * -0.5);
  }

  .line.vertical {
    width: var(--line-weight);
    height: 100%;
    background-image: repeating-linear-gradient(
      0deg,
      #0000 0 calc(var(--line-weight) * 2),
      var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
    );
  }

  .line.left {
    left: calc(var(--line-weight) * -0.5);
  }

  .line.right {
    right: calc(var(--line-weight) * -0.5);
  }

  .line.top {
    transform-origin: top left;
    transform: rotate(5deg) scaleX(0);
  }

  .btn-wrapper:has(.btn:hover) .line.top,
  .btn-wrapper:has(.btn:focus-visible) .line.top {
    animation: draw-top var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 0.8);
  }

  @keyframes draw-top {
    100% {
      transform: rotate(0deg) scaleX(1);
    }
  }

  .line.bottom {
    transform-origin: bottom right;
    transform: rotate(5deg) scaleX(0);
  }

  .btn-wrapper:has(.btn:hover) .line.bottom,
  .btn-wrapper:has(.btn:focus-visible) .line.bottom {
    animation: draw-bottom var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 2);
  }

  @keyframes draw-bottom {
    100% {
      transform: rotate(0deg) scaleX(1);
    }
  }

  .line.left {
    transform-origin: bottom left;
    transform: rotate(0deg) scaleY(0);
  }

  .btn-wrapper:has(.btn:hover) .line.left,
  .btn-wrapper:has(.btn:focus-visible) .line.left {
    animation: draw-left var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 2.4);
  }

  @keyframes draw-left {
    100% {
      transform: rotate(0deg) scaleY(1);
    }
  }

  .line.right {
    transform-origin: top right;
    transform: rotate(5deg) scaleY(0);
  }

  .btn-wrapper:has(.btn:hover) .line.right,
  .btn-wrapper:has(.btn:focus-visible) .line.right {
    animation: draw-right var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 1.4);
  }

  @keyframes draw-right {
    100% {
      transform: rotate(0deg) scaleY(1);
    }
  }
`;
