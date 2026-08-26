/* The upload arrived as CSS alone: no JSX, no wrapper, not one tag. The
   structure below is not a guess — the sibling and descendant combinators spell
   it exactly, and there is only one tree that satisfies all of them:

     `.hidden-checkbox:checked ~ .bookmark-shadow`   shadow is the input's SIBLING
     `.hidden-checkbox:checked ~ .ripple-ring`       so is the ring
     `… ~ .bookmark-shadow .bookmark-shape`          shape is INSIDE the shadow
     `… .bookmark-shape .bookmark-inner`             inner is inside the shape
     `… .bookmark-shape .highlight-sweep`            so is the sweep

   Which fixes every node: input, shadow > shape > (inner, sweep), ring — all
   four of the outer ones children of `.bookmark-toggle`. And `.bookmark-toggle`
   is a `<label>`: it has `cursor: pointer`, it is the checkbox's only possible
   ancestor, and a checkbox with no visible box is driven by its label or by
   nothing at all.

   styled-components rather than a new mechanism, because it is already a
   dependency from the previous upload and the CSS is plain. */
import styled from 'styled-components';

export const BookmarkToggle = ({ label = 'Bookmark' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <label className="bookmark-toggle">
        {/* aria-label on the input, not the label element: a `<label>` with no
            text content gives the control no accessible name, and this one has
            no text by design — the bookmark shape IS the label. */}
        <input type="checkbox" className="hidden-checkbox" aria-label={label} />
        <div className="bookmark-shadow">
          <div className="bookmark-shape">
            <div className="bookmark-inner" />
            <div className="highlight-sweep" />
          </div>
        </div>
        <div className="ripple-ring" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bookmark-toggle {
    position: relative;
    width: 60px;
    height: 90px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
  }

  /* THE ONE CHANGE THAT MOVES NO PIXEL AND IS THE DIFFERENCE BETWEEN WORKING
     AND NOT. The upload writes ".hidden-checkbox { display: none }", and
     "display: none" does not hide a checkbox — it DELETES it: out of the
     accessibility tree, out of the tab order, unfocusable, unreachable by
     keyboard or screen reader. The only way to toggle it would be a mouse on
     the label. Measured before the change: zero tab stops on the control.
     The replacement is the standard visually-hidden clip, which keeps the box
     exactly as invisible — 1px, clipped away, no layout effect inside a flex
     parent because it is absolute — while leaving it focusable and announced.
     Nothing about the drawn bookmark changes. */
  .hidden-checkbox {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* And a focus indicator, because the consequence of making the control
     focusable is that focus now has somewhere to land and must be seen. It sits
     on the 60x90 shadow box, so it never touches the resting drawing.
     "currentColor" rather than a new hue: the design is greyscale, and the ring
     then follows whatever ground it is placed on. */
  .hidden-checkbox:focus-visible ~ .bookmark-shadow {
    outline: 2px solid currentColor;
    outline-offset: 4px;
    border-radius: 4px;
  }

  .bookmark-shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.08))
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.04));
    transition:
      filter 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .bookmark-shape {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #d1d1d6 0%, #ffffff 100%);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
    transition: background 0.4s ease;
    overflow: hidden;
  }

  .bookmark-inner {
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 5px;
    background-color: #f5f5f7;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
    transition:
      opacity 0.3s ease,
      transform 0.4s ease;
    z-index: 2;
  }

  .highlight-sweep {
    position: absolute;
    top: -100%;
    left: -150%;
    width: 150%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(35deg);
    opacity: 0;
    z-index: 3;
    pointer-events: none;
  }

  .ripple-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0px;
    height: 0px;
    border-radius: 50%;
    border: 2px solid #000000;
    opacity: 0;
    pointer-events: none;
  }

  .bookmark-toggle:active .bookmark-shadow {
    transform: scale(0.92) translateY(4px);
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  }

  .hidden-checkbox:checked ~ .bookmark-shadow {
    filter: drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15))
      drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.6));
    animation: breathe 3s ease-in-out infinite alternate 0.7s;
  }

  .hidden-checkbox:checked ~ .bookmark-shadow .bookmark-shape {
    background: radial-gradient(circle at 30% 30%, #4a4a4a 0%, #000000 80%);
    animation: foldBounce 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  .hidden-checkbox:checked ~ .bookmark-shadow .bookmark-shape .bookmark-inner {
    opacity: 0;
    transform: scale(0.8);
  }

  .hidden-checkbox:checked ~ .bookmark-shadow .bookmark-shape .highlight-sweep {
    animation: sweepAnim 0.8s ease-in-out 0.1s forwards;
  }

  .hidden-checkbox:checked ~ .ripple-ring {
    animation: rippleAnim 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  @keyframes foldBounce {
    0% {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
      transform: scale(1);
    }
    30% {
      clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 35%, 0% 85%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 35%, 0% 85%);
      transform: scale(0.85);
    }
    60% {
      clip-path: polygon(0% 0%, 100% 0%, 100% 105%, 50% 85%, 0% 105%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 105%, 50% 85%, 0% 105%);
      transform: scale(1.12);
    }
    80% {
      clip-path: polygon(0% 0%, 100% 0%, 100% 98%, 50% 72%, 0% 98%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 98%, 50% 72%, 0% 98%);
      transform: scale(0.97);
    }
    100% {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%);
      transform: scale(1);
    }
  }

  @keyframes sweepAnim {
    0% {
      left: -150%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    60% {
      left: 150%;
      opacity: 1;
    }
    100% {
      left: 150%;
      opacity: 0;
    }
  }

  @keyframes rippleAnim {
    0% {
      width: 40px;
      height: 40px;
      opacity: 1;
      border-width: 8px;
    }
    100% {
      width: 180px;
      height: 180px;
      opacity: 0;
      border-width: 0px;
    }
  }

  @keyframes breathe {
    0% {
      transform: translateY(0px) scale(1);
    }
    100% {
      transform: translateY(-4px) scale(1.02);
    }
  }

  /* "breathe" is "infinite alternate" — it never stops while the bookmark is
     saved. That is a permanent 3s oscillation on a page, which is what a
     vestibular disorder cannot look at, so it is answered here rather than by
     editing the design: the one-shot animations are kept (they are feedback for
     an action the reader just took, and they end), the endless one is not, and
     the checked state still LOOKS checked because the gradient, the shadow and
     the hidden inner plate are all static declarations. Nothing is lost except
     the perpetual motion. */
  @media (prefers-reduced-motion: reduce) {
    .hidden-checkbox:checked ~ .bookmark-shadow {
      animation: none;
    }
    .bookmark-shadow,
    .bookmark-inner,
    .bookmark-shape {
      transition-duration: 0.01ms;
    }
  }
`;

export default BookmarkToggle;
