/* A button that says it cannot be pressed, and then styles what happens when you
   press it.

   `cursor: not-allowed` with no `disabled` attribute is the whole idea here: the
   pointer says no, the DOM says yes. That is deliberate -- a genuinely disabled
   button would not fire `:hover`, and every effect in this upload is on
   `:hover`. So this is a button that LOOKS blocked and reacts anyway, which is
   the joke it is built on. It stays as written, and it stays a real enabled
   button, because adding `disabled` would delete the animation the component
   exists to show.

   The red fill is a `::before` at `translate: 0 105%` -- 105%, not 100%, so it
   starts five percent past the bottom edge and there is no seam at the start of
   the rise. `overflow: hidden` clips it; hover moves it to `translate: 0 0`.
   `.button span { z-index: 2 }` is why the label survives the flood: the
   pseudo-element has no z-index, so without that the red would paint over the
   text.

   And `transition: all 0.3s ease cubic-bezier(0.23, 1, 0.320, 1)` on the button
   is invalid -- TWO timing functions in one shorthand, `ease` and the bezier. The
   browser drops the declaration, so the BUTTON has no transition at all; only the
   `::before` and the svg do, and those declarations are well formed. Measured
   rather than assumed, because it looks like it should work. Kept: it is the
   author's typo and it costs the background-colour fade, nothing more.

   `shake` runs `0.2s linear 1` and ends on `rotate: 10deg` with no fill mode --
   so the button snaps back to 0 when it finishes rather than resting tilted. The
   fourth keyframe is 100% `rotate: 10deg`, which is never seen.

   Two additions: `type="button"`, and a focus ring, since every state is hover. */
import styled from 'styled-components';

export const NotAllowedButton = ({
  children = 'Not allowed!',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="button" type="button" {...rest}>
      <span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8zm0 16a7.96 7.96 0 0 1-4.9-1.69L18.31 7.1A7.96 7.96 0 0 1 20 12c0 4.42-3.58 8-8 8z" />
        </svg>
        {children}
      </span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 15px 20px;
    background-color: #212121;
    border: none;
    font: inherit;
    color: #e8e8e8;
    font-size: 20px;
    font-weight: 600;
    border-radius: 50px;
    cursor: not-allowed;
    overflow: hidden;
    transition: all 0.3s ease cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .button::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    translate: 0 105%;
    background-color: #F53844;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button svg {
    width: 32px;
    height: 32px;
    fill: #F53844;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button:hover {
    animation: shake 0.2s linear 1;
  }

  .button:hover::before {
    translate: 0 0;
  }

  .button:hover svg {
    fill: #e8e8e8;
  }

  @keyframes shake {
    0% {
      rotate: 0deg;
    }
    33% {
      rotate: 10deg;
    }
    66% {
      rotate: -10deg;
    }
    100% {
      rotate: 10deg;
    }
  }

  /* Added: every state above is hover-only. */
  .button:focus-visible {
    outline: 3px solid #f53844;
    outline-offset: 3px;
  }
`;
