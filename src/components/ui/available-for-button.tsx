/* A ripple that cannot paint, and an animation that fixes the dot it moves.

   The markup is read out of the selectors, not guessed. `.circle:nth-child(2)`,
   `.circle:nth-child(1) .outline` and `.circle:nth-child(2) .outline` all carry
   their own `animation-delay` -- 0.3s, 0.9s, 1.2s against the first circle's 0 --
   so there are TWO circles, staggered, each with a `.dot` and an `.outline`, and
   the label is the text node after them.

   The finding: `@keyframes outline-keys` opens with
   `outline: solid 20px var(--color)` and `--color` is declared NOWHERE in the
   upload. The declaration is NOT dropped -- it is still there in the CSSOM, which
   is what the first version of this note got wrong -- it is invalid at
   computed-value time, so the shorthand resolves to `unset` and the longhands
   take their initial values. Measured on a throwaway element:
   `outline: solid 20px var(--nope)` computes to
   `{ style: "none", width: "0px" }`. And `.outline` has no background, no border
   and no content of its own, so the element animates
   `transform: scale(0) -> scale(1)`, `opacity: 1 -> 0` and
   `outline-offset: 0 -> 20px` while painting **nothing at all**. The expanding
   ring this component exists to show never renders. Kept as written, because the
   missing custom property is the author's, and named here instead of quietly
   supplied.

   The second finding runs the other way, and took three measurements to state
   correctly. `.circle .dot` sets `transform: translate(-50%, -50%)`, and the dot
   is already centred by the circle's flex centring, so that translate moves it
   6px up and 6px left. With the animation switched off in situ the dot measures
   `dx -6, dy -6`; with it running, `0, 0` -- because `dot-keys` overrides
   `transform` with `scale()` on every frame. **The animation is what corrects the
   position the base style breaks.**

   The reduced-motion answer is then NOT what the blanket's shape predicts. This
   repo's blanket is `* { animation-duration: 1ms !important;
   animation-iteration-count: 1 !important }` in
   `design-system/nova-design-os/tokens/tokens.css` -- one 1ms pass with
   `fill-mode: none`, which should hand back the base style and the 6px error with
   it. Measured under emulated reduce, it does not: the dot reads
   `matrix(1, 0, 0, 1, 0, 0)` and sits centred, i.e. the end frame stays applied.
   That held with this override deleted from the live stylesheet too. So the
   override below is not load-bearing in Chromium -- it is kept anyway, because
   "the engine happens to leave the last frame applied" is not a resting frame,
   and three lines that state the rest explicitly are cheaper than depending on
   it.

   `outline: none` on the button removed the focus ring; a `:focus-visible` ring
   puts one back. Both keyframe sets are `infinite`. */
import styled from 'styled-components';

export const AvailableForButton = ({
  children = 'Available for new project',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="available-for-btn" type="button" {...rest}>
      <span className="circle">
        <span className="dot" />
        <span className="outline" />
      </span>
      <span className="circle">
        <span className="dot" />
        <span className="outline" />
      </span>
      {children}
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .available-for-btn {
    --animation: 2s ease-in-out infinite;

    display: flex;
    align-items: center;
    column-gap: 2px;
    color: #178d00;
    background-color: #e1f9dc;
    border-radius: 100px;
    padding: 1rem 1.5rem 1rem 0.5rem;
    outline: none;
    border: none;
    font-weight: 600;
    position: relative;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }

  .available-for-btn:hover {
    background-color: #ffffff;
  }

  .available-for-btn:active {
    background-color: #e1f9dc;
    border: solid 2px #178d00;
  }

  /* Added: "outline: none" above took the only focus indicator away. */
  .available-for-btn:focus-visible {
    outline: 3px solid #178d00;
    outline-offset: 3px;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 16px;
    height: 16px;
    border: solid 2px #178d00;
    border-radius: 50%;
    margin: 0 10px;
    background-color: transparent;
    animation: circle-keys var(--animation);
  }

  .circle .dot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #178d00;
    animation: dot-keys var(--animation);
  }

  .circle .outline {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    animation: outline-keys var(--animation);
  }

  .circle:nth-child(2) {
    animation-delay: 0.3s;
  }

  .circle:nth-child(2) .dot {
    animation-delay: 0.3s;
  }

  .circle:nth-child(1) .outline {
    animation-delay: 0.9s;
  }

  .circle:nth-child(2) .outline {
    animation-delay: 1.2s;
  }

  @keyframes circle-keys {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes dot-keys {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes outline-keys {
    0% {
      transform: scale(0);
      outline: solid 20px var(--color);
      outline-offset: 0;
      opacity: 1;
    }
    100% {
      transform: scale(1);
      outline: solid 0 transparent;
      outline-offset: 20px;
      opacity: 0;
    }
  }

  /* The resting frame the base style gets wrong. "dot-keys" overrides
     "transform" on every frame, so the dot is centred only WHILE it runs; with
     the animation removed the base "translate(-50%, -50%)" pushes it 6px out of
     its own ring. Flex centring already places it, so "none" is the correct
     rest. */
  @media (prefers-reduced-motion: reduce) {
    .circle .dot,
    .circle .outline {
      transform: none;
    }
  }
`;
