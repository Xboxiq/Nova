/* A perforated edge cut by a tiled conic gradient, and a two-stage pull where the
   second stage is a focus.

   THE PERFORATION. `.paper`'s mask is two layers:

     linear-gradient(#000 H - 5px, #0000 H - 3px)   cuts the bottom 5px off
     conic-gradient(#000 135deg, #0000 135.5deg, #0000 224.5deg, #000 225deg)

   The conic is tiled at `mask-size: 5px 5px` along the cut line. A conic gradient
   that is opaque from 225deg round to 135deg and transparent between them is a
   90-degree transparent wedge pointing up -- and 5px squares of that, repeated,
   is a row of triangular notches. So the torn edge is not an image, not a border,
   and not a repeating-linear-gradient: it is ONE conic gradient tiled across the
   sheet -- measured, 41.8 tiles of 5px across a 209px paper. The half-degree steps (135 to 135.5, 224.5 to 225) are
   the anti-aliasing control -- a hard stop would shimmer.

   `.cutter` uses the identical construction with `mix-blend-mode: screen` to
   paint a light edge on top of the same notches, so the perforation reads as cut
   paper rather than as a shape with bites taken out.

   THE TWO STAGES. `.paper:hover` pulls the sheet down 46px; `.paper:focus` pulls
   it 84px and hides the coupon code. Hover tears it partway, activating pulls it
   clear. That is a deliberate progression and it needs `.paper` to be focusable,
   which is why `border: none` and `cursor: pointer` are on it: it is a
   `<button>`, and the CSS says so without saying so.

   Both hover and focus also use NESTED rules (`.hov { opacity: 0 }` inside
   `.paper:hover`), so the child selectors are scoped to the state rather than
   repeated.

   And `.paper-wrapper:has(.paper:hover) .sec { animation-iteration-count: 1 }` --
   the wiggle does not stop dead on hover, it finishes the cycle it is in and then
   stops. Setting the count rather than the play state is what makes it land
   rather than freeze.

   `.wrapper { pointer-events: none }` with `.paper { pointer-events: all }`: the
   whole assembly is inert except the sheet. The cutout, the shadow and the cutter
   all sit on top of the paper and would otherwise eat the pointer.

   `.filter { position: absolute }` is declared and nothing else -- no size, no
   content, no other rule mentions it. Dead. Kept.

   `font-family: "Syne"` is the fourth face in this log that the upload names and
   this repository does not load. Same standing decision: the name falls through.

   Two additions: `type="button"`, and a visible focus ring -- the `:focus` state
   is load-bearing here (it is the second stage of the pull) and the upload draws
   no ring for it, so a keyboard user gets the motion with no indication of what
   has focus. */
import styled from 'styled-components';

export const CouponTearOff = ({
  code = 'HELLO-10%',
  cta = 'Get coupon',
  copied = 'Copied!',
}: { code?: string; cta?: string; copied?: string }) => (
  <StyledWrapper>
    <div className="wrapper">
      <div className="shadow-wrapper">
        <div className="shadow" />
      </div>
      <div className="paper-wrapper">
        <button className="paper" type="button">
          <span className="sec">
            <span className="txt">{copied}</span>
            <span className="txt coupon">{code}</span>
            <span className="txt hov">{cta}</span>
          </span>
        </button>
      </div>
      <div className="cutout-wrapper">
        <div className="cutout" />
      </div>
      <div className="cutter-wrapper">
        <div className="cutter" />
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .wrapper {
    --width: 220px;
    --paper-width-multiplier: 0.95;
    --paper-height: 160px;
    --cut-size: 5px;
    --perspective: 200px;
    --paper-color: #ffeeb8;
    --text-color: #837e7d;

    position: relative;
    display: grid;
    place-items: center;
    width: var(--width);
    height: 60px;
    margin: 1rem;
    user-select: none;
    pointer-events: none;
  }

  .cutout-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    transform-style: preserve-3d;
    perspective: var(--perspective);
  }

  .cutout {
    position: absolute;
    width: 100%;
    height: 60px;
    transform: rotateX(-10deg);
    box-sizing: border-box;
    border: 1px solid #0004;
    box-shadow:
      inset 0 1px 1px 0px #0017,
      inset 0 2px 2px 0px #0017,
      inset 0 4px 4px 0px #0017,
      inset 0 12px 12px 0px #0017,
      inset 0 24px 24px 0px #0017;
  }

  .paper-wrapper {
    position: absolute;
    width: calc(var(--width) * var(--paper-width-multiplier));
    height: var(--paper-height);
    top: 2px;
    filter: drop-shadow(0 1px 1px #0003) drop-shadow(0 6px 3px #0004)
      drop-shadow(0 16px 16px #0003);
    overflow: hidden;
  }

  .paper {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    background-color: var(--paper-color);
    background-image: repeating-linear-gradient(
      #00000020 calc(0.25 * var(--paper-height)),
      #00000035 calc(0.45 * var(--paper-height)),
      #0000 calc(0.75 * var(--paper-height)),
      #00000020 var(--paper-height)
    );
    background-position: 0 0;
    mask-image: linear-gradient(
        #000 calc(var(--paper-height) - var(--cut-size)),
        #0000 calc(var(--paper-height) - var(--cut-size) + 2px)
      ),
      conic-gradient(#000 135deg, #0000 135.5deg, #0000 224.5deg, #000 225deg);
    mask-position:
      0,
      0 calc(var(--paper-height) - var(--cut-size));
    mask-repeat: no-repeat, repeat-x;
    mask-size:
      100%,
      var(--cut-size) var(--cut-size);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    cursor: pointer;
    pointer-events: all;
    transition:
      transform 500ms ease,
      background-position 700ms ease;
  }

  /* Added: :focus is the SECOND STAGE of the pull here, and the upload draws
     nothing for it. */
  .paper:focus-visible {
    outline: 3px solid var(--text-color);
    outline-offset: -6px;
  }

  .sec {
    height: 100%;
    transform: translateY(calc(-1 * var(--paper-height) + 50px));
    animation: wiggle 2.75s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }

  .shadow-wrapper {
    position: absolute;
    width: 100%;
    height: 32px;
    top: 0;
    transform-style: preserve-3d;
    perspective: calc(var(--perspective) / 1.33);
  }

  .shadow {
    position: absolute;
    top: 1px;
    width: 100%;
    height: 32px;
    background-color: #0005;
    background-image: linear-gradient(#000, #0000 8px);
    mask-image: linear-gradient(#000 0, #0000 70%);
    transform: rotateX(-10deg);
  }

  .txt {
    font-family: "Syne", sans-serif;
    font-weight: 500;
    font-size: 1.3rem;
    letter-spacing: -0.05rem;
    color: var(--text-color);
    text-shadow:
      0 0.5px 1px #fffa,
      0 -0.5px 0.5px #0009;
    transition: opacity 250ms ease;
  }

  .paper:hover {
    transform: translateY(46px);
    background-position: 0 18px;

    .hov {
      opacity: 0;
    }
  }

  .paper:focus {
    transform: translateY(84px);
    background-position: 0 10px;

    .hov {
      opacity: 0;
    }

    .coupon {
      opacity: 0;
    }
  }

  .paper-wrapper:has(.paper:hover) .sec,
  .paper-wrapper:has(.paper:focus) .sec {
    animation-iteration-count: 1;
  }

  @keyframes wiggle {
    8%,
    27% {
      transform: translateY(calc(-1 * var(--paper-height) + 50px));
    }
    20% {
      transform: translateY(calc(-1 * var(--paper-height) + 60px));
    }
  }

  .cutter-wrapper {
    position: absolute;
    width: 100%;
    height: 32px;
    top: 0;
    transform-style: preserve-3d;
    perspective: calc(var(--perspective) / 1.33);
    mix-blend-mode: screen;
  }

  .cutter {
    position: absolute;
    top: 1px;
    width: 100%;
    height: calc(var(--cut-size) + 3px);
    background-color: #ddd;
    background-image: linear-gradient(#000, #0000 8px);
    mask-image: linear-gradient(
        #000 calc(calc(var(--cut-size) + 3px) - var(--cut-size)),
        #0000 calc(calc(var(--cut-size) + 3px) - var(--cut-size) + 2px)
      ),
      conic-gradient(#000 135deg, #0000 135.5deg, #0000 224.5deg, #000 225deg);
    mask-position:
      0,
      calc(var(--cut-size) / 2) 3px;
    mask-repeat: no-repeat, repeat-x;
    mask-size:
      100%,
      var(--cut-size) var(--cut-size);
    transform: rotateX(-10deg);
  }

  .filter {
    position: absolute;
  }
`;
