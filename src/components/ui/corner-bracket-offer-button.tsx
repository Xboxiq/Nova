/* A timing function whose fourth control point is 2.5, and four corner brackets
   that are one drawing rotated four ways.

   THE OVERSHOOT IS IN THE CURVE. `--timing-function: cubic-bezier(0, 0, 0, 2.5)`.
   The second coordinate pair is the output axis and it is unbounded, so 2.5 means
   the transition travels two and a half times its distance before settling back.
   That is the whole reason the drawers spring out and the corners snap rather than
   glide: nothing here uses a keyframe overshoot, one number in one curve does it,
   and it is reused by every transition in the file through a custom property.

   FOUR BRACKETS, ONE PATH. `.btn-corner:nth-of-type(1..4)` place the same 32px svg
   at the four corners with `rotate(90deg)`, `rotate(180deg)`, `rotate(-90deg)` and
   `rotate(0deg)`. The rotations fix what the drawing has to be: the one at
   `rotate(0deg)` sits bottom-left, so the base shape is a bottom-left bracket, and
   the other three fall out of it. Inferred, and the rotations are the evidence.

   `nth-of-type` counts TAGS, and this file leans on it four times, so the four
   `<svg>` elements have to be the only svgs among their siblings -- which they are:
   the container holds four svgs, two divs and a button. Wave 10 lost a whole star
   to getting this wrong.

   Note the file uses `:first-of-type` for corner one in both state blocks and
   `nth-of-type(1)` in the base block. Same element, two spellings.

   A BACKGROUND WRITTEN TWICE, AND THE SECOND ONE WINS. `.btn-drawer` declares
   `background: linear-gradient(#fff2, #0001), var(--btn-color)` -- the shorthand,
   which resets `background-color` to the colour in its last layer -- and then, on
   the next line, `background-color: #fbff13`. So the drawers are NOT the button's
   `--btn-color` (#d8ff7c); they are a brighter yellow, and the only reason is
   declaration order. Measured on the page.

   `hue-anim` then rotates that hue to -70deg and back over 3s, but only while the
   drawers are out -- the animation is declared in the hover block, not the base
   rule, so it starts from frame zero each time the button is hovered.

   TEXT WITH NO COLOUR. `.btn-text` is `color: #5550` -- four-digit hex, alpha zero
   -- plus `-webkit-text-fill-color: transparent`, with the visible glyphs coming
   from `background-image: linear-gradient(#444, #000a)` and
   `background-clip: text`. Two ways of saying the same thing, and the readable
   contrast is the gradient's, not the colour's: #444 on the button's #d8ff7c is
   8.59 and #000a composites to 7.10, so both ends clear AA comfortably. Worth
   computing rather than trusting, because a `color` of `transparent` is exactly
   the shape of a defect.

   NATIVE NESTING, AND A DECLARATION AFTER IT. The two state blocks are written
   with CSS nesting -- `.btn-container:has(.btn:hover) { .btn { ... } }` -- and each
   one puts a bare `--corner-color: #0004;` AFTER several nested rules. Declarations
   that follow nested rules are legal in current CSS and were dropped by earlier
   engines, so it is worth checking rather than assuming: measured on the page, the
   hovered container's `--corner-color` is the overridden value, so it lands.

   `@-moz-document url-prefix()` appears twice, nested, flipping the second
   corner's drop-shadow direction for Firefox only. Dead in Chromium, kept as
   written -- and worth noting that it survives the nesting without taking the
   surrounding rules down with it.

   TWO ADDITIONS, AND THE UPLOAD ALREADY MADE THE ONE THAT USUALLY HAS TO BE ADDED.
   `.btn-container:has(.btn:focus-visible)` is in the file, beside the hover
   selector, in both state blocks -- so the drawers, the corners and the scale all
   reach a keyboard. That is the first upload in this log to write it unprompted, and
   it is why no focus ring was added: the focused state slides out two labels, pushes
   four brackets 36px and scales the button. So: `type="button"`, and the svgs are
   `aria-hidden`. The two drawer labels are real text and stay readable. */
import styled from 'styled-components';

/* Inferred: the rotations fix the drawing. The one at rotate(0deg) is bottom-left,
   so the base shape is a bottom-left bracket and the other three follow. */
const Corner = () => (
  <svg className="btn-corner" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M3 3V29H29" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CornerBracketOfferButton = ({
  label = 'Get Offer',
  top = 'expires in...',
  bottom = '...8 hours',
}: { label?: string; top?: string; bottom?: string }) => (
  <StyledWrapper>
    <div className="btn-container">
      <Corner />
      <Corner />
      <Corner />
      <Corner />
      <div className="btn-drawer transition-top">{top}</div>
      <div className="btn-drawer transition-bottom">{bottom}</div>
      <button className="btn" type="button">
        <span className="btn-text">{label}</span>
      </button>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .btn-container {
    --btn-color: #d8ff7c;
    --corner-color: #0002;
    --corner-dist: 24px;
    --corner-multiplier: 1.5;
    /* The fourth control point is 2.5: the output axis is unbounded. */
    --timing-function: cubic-bezier(0, 0, 0, 2.5);
    --duration: 250ms;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    position: relative;
    min-width: 160px;
    min-height: calc(var(--corner-dist) * 2);
    border-radius: 16px;
    border: none;
    padding: 0.25em 1em;
    background: linear-gradient(#fff2, #0001), var(--btn-color);
    box-shadow:
      1px 1px 2px -1px #fff inset,
      0 2px 1px #00000010,
      0 4px 2px #00000010,
      0 8px 4px #00000010,
      0 16px 8px #00000010,
      0 32px 16px #00000010;
    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function);
    cursor: pointer;
  }

  .btn-drawer {
    position: absolute;
    display: flex;
    justify-content: center;
    min-height: 32px;
    border-radius: 16px;
    border: none;
    padding: 0.25em 1em;
    font-size: 0.8em;
    font-weight: 600;
    font-family: "Poppins", monospace;
    color: #0009;
    /* The shorthand sets a background-color, and the next line overrides it. */
    background: linear-gradient(#fff2, #0001), var(--btn-color);
    background-color: #fbff13;
    opacity: 0;
    transition:
      transform calc(0.5 * var(--duration)) ease,
      filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    -webkit-transition:
      transform calc(0.5 * var(--duration)) ease,
      -webkit-filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }

  .transition-top {
    top: 0;
    left: 0;
    border-radius: 12px 12px 0 0;
    align-items: start;
  }

  .transition-bottom {
    bottom: 0;
    right: 0;
    border-radius: 0 0 12px 12px;
    align-items: end;
  }

  .btn-text {
    display: inline-block;
    font-size: 1.25em;
    font-family: "Syne", "Poppins", "Inter", sans-serif;
    font-weight: 600;
    color: #5550;
    background-image: linear-gradient(#444, #000a);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006);
    -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006);
    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
  }

  .btn-corner {
    position: absolute;
    width: 32px;
    fill: none;
    stroke: var(--corner-color);
    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function);
  }

  .btn-corner:nth-of-type(1) {
    top: 0;
    left: 0;
    transform: translate(
        calc(-1 * var(--corner-dist)),
        calc(-1 * var(--corner-dist))
      )
      rotate(90deg);
  }

  .btn-corner:nth-of-type(2) {
    top: 0;
    right: 0;
    transform: translate(var(--corner-dist), calc(-1 * var(--corner-dist)))
      rotate(180deg);
  }

  .btn-corner:nth-of-type(3) {
    bottom: 0;
    right: 0;
    transform: translate(var(--corner-dist), var(--corner-dist)) rotate(-90deg);
  }

  .btn-corner:nth-of-type(4) {
    bottom: 0;
    left: 0;
    transform: translate(calc(-1 * var(--corner-dist)), var(--corner-dist))
      rotate(0deg);
  }

  .btn-container:has(.btn:hover),
  .btn-container:has(.btn:focus-visible) {
    .btn {
      transform: scale(1.05);
      filter: drop-shadow(0 16px 16px #0002);
      -webkit-filter: drop-shadow(0 16px 16px #0002);
    }
    .transition-top {
      transform: translateY(-24px) rotateZ(4deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      animation: hue-anim 3s infinite linear;
      -webkit-animation: hue-anim 3s infinite linear;
      opacity: 1;
    }
    .transition-bottom {
      transform: translateY(24px) rotateZ(4deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      animation: hue-anim 3s infinite linear;
      -webkit-animation: hue-anim 3s infinite linear;
      opacity: 1;
    }
    .btn-text {
      filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      transform: scale(1.05);
      color: #0008;
    }
    /* A bare declaration AFTER nested rules. Legal now, dropped by older
       engines, so it is measured rather than assumed. */
    --corner-color: #0004;
    .btn-corner:first-of-type {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(90deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    .btn-corner:nth-of-type(2) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(180deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    @-moz-document url-prefix() {
      .btn-corner:nth-of-type(2) {
        filter: drop-shadow(10px -10px 1px var(--corner-color))
          drop-shadow(20px -20px 2px var(--corner-color));
      }
    }
    .btn-corner:nth-of-type(3) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(-90deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    .btn-corner:nth-of-type(4) {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(0deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
  }

  .btn-container:has(.btn:active) {
    .btn {
      transform: scale(0.95);
      filter: drop-shadow(0 10px 4px #0002);
      -webkit-filter: drop-shadow(0 10px 4px #0002);
    }
    .transition-top,
    .transition-bottom {
      transform: translateY(0px) scale(0.5);
    }
    .btn-text {
      filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      transform: scale(1);
      color: #000a;
    }
    --corner-color: #0005;
    --corner-multiplier: 0.95;
    .btn-corner:first-of-type {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(90deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
    .btn-corner:nth-of-type(2) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(180deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
    @-moz-document url-prefix() {
      .btn-corner:nth-of-type(2) {
        filter: drop-shadow(10px -10px 2px var(--corner-color))
          drop-shadow(20px -20px 3px var(--corner-color));
      }
    }
    .btn-corner:nth-of-type(3) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(-90deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
    .btn-corner:nth-of-type(4) {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(0deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
  }

  @keyframes hue-anim {
    0%,
    100% {
      filter: hue-rotate(0deg);
      -webkit-filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(-70deg);
      -webkit-filter: hue-rotate(-70deg);
    }
  }
`;

export default CornerBracketOfferButton;
