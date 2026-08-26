/* Three nested glow layers behind a clip-path button. The structure is fixed by
   "real-button:active ~ div .spin" and "real-button:hover ~ div .spin::before":
   the real control is a transparent absolutely-positioned button that comes
   BEFORE the visual stack, and every layer is reached through a following
   sibling div. That is why the button is opacity:0 rather than hidden -- it is
   the hit target sitting on top, and the drawing underneath is inert.

   THE MISSING ASSETS: filter: blur(...) url(#unopaq | #unopaq2 | #unopaq3).
   Three SVG filters the upload never provides, and their name says what they
   do -- un-opaque. Blur a hard gradient and its alpha falls off; multiply the
   alpha back up and the soft edge becomes a solid band of colour. So each is a
   feColorMatrix whose only non-identity term is the alpha row, and the three
   tiers match the three layer names: blur (widest, weakest) < intense < inside.
   The multipliers are mine; the mechanism is what the CSS asks for by name.

   THE TYPO, KEPT: the upload writes

       @keyframes woah { 0%. to { scale: 1; } 50% { scale: 0.75; } }

   with a period where a comma belongs. That makes the selector list invalid, so
   the browser drops that whole block and only the 50% step survives. Measured
   below: the animation still runs 1 -> 0.75 -> 1, because the missing 0%/100%
   fall back to the base style, which is scale 1. The typo is harmless, and it is
   the author's, so it stays -- with the measurement instead of a silent fix. */
import styled from 'styled-components';

export const SpinBorderButton = ({ children = 'Button' }: { children?: string }) => {
  return (
    <StyledWrapper>
      <div className="button-container">
        {/* the transparent hit target, first, so every "~ div" reaches the art */}
        <button className="real-button" type="button">{children}</button>
        {/* The wrapper div is not decoration. Every state rule reads
            ".real-button:hover ~ div .spin" -- a .spin that is a DESCENDANT of a
            following sibling div, not the sibling itself. I first made the spin
            layers direct siblings of the button and measured
            animationPlayState=paused in every state: the selector never matched.
            One wrapper is what the upload's own selectors require. */}
        <div className="spin-stack">
          <div className="backdrop" />
          <div className="spin spin-blur" />
          <div className="spin spin-intense" />
          <div className="button-border">
            <div className="spin spin-inside" />
            <div className="button">{children}</div>
          </div>
        </div>

        <svg className="spin-defs" aria-hidden="true" focusable="false">
          <filter id="unopaq">
            <feColorMatrix
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 3 0"
            />
          </filter>
          <filter id="unopaq2">
            <feColorMatrix
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 6 0"
            />
          </filter>
          <filter id="unopaq3">
            <feColorMatrix
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 9 0"
            />
          </filter>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    position: relative;
    margin: 0 2em;
    width: 120px;
    height: 60px;
  }

  .spin-stack {
    position: absolute;
    inset: 0;
  }

  .spin-defs {
    position: absolute;
    width: 0;
    height: 0;
  }

  .button-border {
    position: absolute;
    padding: 3px;
    inset: 0;
    background: #0005;
    border-radius: inherit;
    clip-path: path(
      "M 90 0 C 121 0 126 5 126 33 C 126 61 121 66 90 66 L 33 66 C 5 66 0 61 0 33 C 0 5 5 0 33 0 Z"
    );
  }

  .button {
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0.875em;
    clip-path: path(
      "M 90 0 C 115 0 120 5 120 30 C 120 55 115 60 90 60 L 30 60 C 5 60 0 55 0 30 C 0 5 5 0 30 0 Z"
    );
    width: 120px;
    height: 60px;
    background: #111215;
    display: flex;
    flex-direction: column;
    color: #fff;
    overflow: hidden;
  }

  .real-button {
    position: absolute;
    width: 120px;
    height: 60px;
    z-index: 1;
    outline: none;
    border: none;
    border-radius: 17px;
    cursor: pointer;
    opacity: 0;
  }

  .backdrop {
    position: absolute;
    inset: -9900%;
    background: radial-gradient(
      circle at 50% 50%,
      #0000 0,
      #0000 20%,
      #111111aa 50%
    );
    background-size: 3px 3px;
    z-index: -1;
  }

  .spin {
    position: absolute;
    inset: 0;
    z-index: -2;
    opacity: 0.5;
    overflow: hidden;
    transition: 0.3s;
  }

  .real-button:active ~ div .spin {
    opacity: 1;
  }

  .spin-blur {
    filter: blur(2em) url(#unopaq);
  }

  .spin-intense {
    inset: -0.125em;
    filter: blur(0.25em) url(#unopaq2);
    border-radius: 0.75em;
  }

  .spin-inside {
    inset: -2px;
    border-radius: inherit;
    filter: blur(2px) url(#unopaq3);
    z-index: 0;
  }

  .spin::before {
    content: "";
    position: absolute;
    inset: -150%;
    animation:
      speen 8s cubic-bezier(0.56, 0.15, 0.28, 0.86) infinite,
      woah 4s infinite;
    animation-play-state: paused;
  }

  .real-button:hover ~ div .spin::before {
    animation-play-state: running;
  }

  .spin-blur::before {
    background: linear-gradient(90deg, #f50 30%, #0000 50%, #05f 70%);
  }

  .spin-intense::before {
    background: linear-gradient(90deg, #f95 20%, #0000 45% 55%, #59f 80%);
  }

  .spin-inside::before {
    background: linear-gradient(90deg, #fc9 30%, #0000 45% 55%, #9cf 70%);
  }

  @keyframes speen {
    0% { rotate: 10deg; }
    50% { rotate: 190deg; }
    to { rotate: 370deg; }
  }

  /* Kept exactly as sent, period and all. See the note at the top of the file. */
  @keyframes woah {
    0%. to {
      scale: 1;
    }
    50% {
      scale: 0.75;
    }
  }

  /* The real control is opacity:0, so focus has nowhere to show. The ring goes on
     the drawn border, reached the same way every other state reaches it. */
  .real-button:focus-visible ~ div .spin {
    opacity: 1;
  }

  .real-button:focus-visible ~ div .button-border {
    outline: 2px solid #9cf;
    outline-offset: 3px;
  }

  /* Keyboard focus must also start the spin, or focus is a colour change nobody
     can see against three static glows. */
  .real-button:focus-visible ~ div .spin::before {
    animation-play-state: running;
  }
`;

export default SpinBorderButton;
