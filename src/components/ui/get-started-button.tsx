/* Two plates, one of which is breathing, and an arrow parked outside the clip.

   The stack is what makes this read as a physical key: `.btn-back` is the full
   200x60 box with a 4px border and a hard `0 2px 0` shadow -- the socket -- and
   `.btn-front` is a second, 98%-wide plate lifted `translateY(-6px)` out of it.
   The 4px gap the lift opens is filled by `box-shadow: 0 4px 4px #84d2dd`, which
   is the socket's own colour: the front does not float above a gap, it appears to
   sit on a cyan rim. Hover pushes the socket DOWN 4px and the front UP to -8px at
   the same moment, so a 2px lift becomes a 12px separation from one hover.

   The arrow is the mechanism worth naming. `.btn-front svg` is absolute at
   `left: 100%` and `.btn-front` has `overflow: hidden` -- so the arrow starts
   fully outside the plate and is clipped away entirely. Hover moves it to
   `left: 80%` and shifts the label `translateX(-12px)`; the arrow does not fade
   in, it slides in through the right edge of its own clip.

   `glow-up` runs `2s infinite`, so the resting button pulses one extra pixel of
   lift and a wider cyan glow. Base style already carries `translateY(-6px)`, so
   when the reduced-motion blanket removes the animation the button rests lifted
   and correct -- measured, nothing overridden.

   Two additions. The upload has NO focus style anywhere, and the interactive
   element is the whole container, so a keyboard user had no indication at all;
   a ring on the container answers it. And `.btn-front p` cannot survive: `<p>` is
   flow content and a `<button>` accepts only phrasing content, so the label is a
   `<span>` and the one selector that named `p` names a class instead. The
   container is the `<button>` -- `:hover` and `:active` propagate to ancestors,
   which is why both work on it, and nesting a second button inside would not be
   valid markup. */
import { ArrowRight } from 'lucide-react';
import styled from 'styled-components';

export const GetStartedButton = ({
  children = 'GET STARTED',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="btn-container" type="button" {...rest}>
      <span className="btn-back" />
      <span className="btn-front">
        <span className="btn-label">{children}</span>
        <ArrowRight aria-hidden="true" />
      </span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .btn-container {
    position: relative;
    width: 200px;
    height: 60px;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  /* Added: the upload has no focus style at all. */
  .btn-container:focus-visible {
    outline: 3px solid #395d7a;
    outline-offset: 4px;
    border-radius: 27px;
  }

  .btn-back {
    width: 100%;
    height: 100%;
    border: 4px solid #6e737f;
    border-radius: 25px;
    background: #84d2dd;
    box-shadow:
      0 24px 24px rgba(0, 0, 0, 0.15),
      0 2px 0 rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .btn-front {
    position: absolute;
    width: 98%;
    height: 100%;
    background: linear-gradient(#dcdfe0 60%, #bec4c8 100%);
    border-radius: 22px;
    border: none;
    transform: translateY(-6px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    color: #395d7a;
    box-shadow:
      0 4px 4px #84d2dd,
      inset 0 -2px 2px #6e737f;
    transition: all 0.1s ease;
    overflow: hidden;
    animation: glow-up 2s infinite ease-in-out;
  }

  @keyframes glow-up {
    50% {
      transform: translateY(-8px);
      box-shadow:
        0 4px 12px #75e7f7,
        inset 0 -2px 2px #6e737f;
    }
  }

  .btn-front .btn-label {
    position: absolute;
    transition: all 0.3s ease;
  }

  .btn-front svg {
    position: absolute;
    left: 100%;
    transition: all 0.3s ease;
  }

  .btn-container:hover .btn-back {
    background: transparent;
    transform: translateY(4px);
    box-shadow:
      0 12px 12px rgba(0, 0, 0, 0.15),
      0 2px 0 rgba(0, 0, 0, 0.4);
  }

  .btn-container:hover .btn-front {
    transform: translateY(-8px);
    box-shadow: inset 0 -2px 2px #6e737f;
    animation: none;
  }

  .btn-container:hover .btn-front .btn-label {
    transform: translateX(-12px);
  }

  .btn-container:hover .btn-front svg {
    left: 80%;
  }

  .btn-container:active .btn-front {
    transform: translateY(2px);
    box-shadow:
      0 0 60px #75e7f7,
      inset 0 -2px 2px #6e737f;
  }
`;
