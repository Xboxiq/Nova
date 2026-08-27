/* A wipe made by animating `inset`, and a fade that is really a hard cut.

   This upload arrived TWICE -- as 29 in the first batch and as 79 in the second,
   byte-identical after normalisation. One tool.

   THE WIPE. `@keyframes frame-half { 0% { inset: 0 50% } 100% { inset: 0 0% } }`
   on an absolutely positioned element. `inset: 0 50%` is a box collapsed to a
   vertical line down the middle; `inset: 0 0%` is the full box. So the frame does
   not scale and it is not clipped -- its own edges are animated apart, which
   means the border stays 1px the whole way instead of stretching as `scaleX`
   would. That is why `inset` and not `transform`: a scaled border is a thick
   border.

   And the hover version, `@keyframes frame { 50% { inset: 0 50% } }`, closes to
   the centre line and opens again, so the label swap happens behind a shutter
   that is only shut for one frame.

   THE FADE THAT IS NOT ONE. `txt-in` is `90% { opacity: 0 } 100% { opacity: 1 }`
   over 0.5s -- so the incoming label is invisible for 450ms and then appears in
   the last 50ms. Read as a curve it looks like a fade; measured, it is a cut with
   a long wait in front of it. `txt-out` mirrors it: `50% { opacity: 1 }` holds the
   outgoing label at full for a quarter second before it goes.

   THE CONFIRMATION. `.btn::before` carries `content: "Address copied"` -- the
   message is in the CSS, not the markup, and measured on the pseudo-element it
   resolves to exactly that string -- at `z-index: -1` with
   `filter: blur(16px); opacity: 0`, and `.btn:focus` runs `appear`, which
   sharpens the blur to zero and lifts it 24px. A blurred word behind the button
   that comes into focus as it rises.

   That `z-index: -1` is the FOURTH negative layer in this log to escape its
   container: `.btn` is `position: absolute` with `z-index: auto` and
   `.btn-wrapper` is `position: relative` with `z-index: auto`, and neither
   establishes a stacking context. So the message painted beneath the page. One
   declaration on the wrapper fixes it, as it did the other three.

   `calc(var(--anim-speed, 01s) * 1.5)` -- `01s` with a leading zero. Valid CSS
   (numbers may carry leading zeros) and identical to `1s`, so it is a typo that
   costs nothing. Kept.

   `.btn:focus` rather than `:focus-visible` means the confirmation fires for
   mouse and keyboard alike, which is right, and is the opposite of the copy
   button in wave 3 that used `:focus:not(:focus-visible)` and worked for the
   mouse only.

   Four `.point` elements, one per edge, named by their own classes. And
   `mix-blend-mode: hard-light` over a 45-degree repeating gradient at
   `background-size: 440%`, going to `700%` on hover -- the sheen does not move,
   it gets bigger, which stretches the highlight across the button.

   Two additions: `type="button"`, and a focus ring -- `:focus` is load-bearing
   here and the upload draws nothing for it. The two hint lines keep their literal
   ids' behaviour through data attributes instead, so two of these on one page do
   not collide. */
import styled from 'styled-components';

export const AddressCopyButton = ({
  name = 'John Doe',
  address = 'john@doe.com',
}: { name?: string; address?: string }) => (
  <StyledWrapper>
    <div className="btn-wrapper">
      <button className="btn" type="button">
        <span className="txt-box">
          <span className="txt">{name}</span>
          <span className="txt">{address}</span>
        </span>
        <span className="frame" />
        <span className="point top left" />
        <span className="point top right" />
        <span className="point bottom left" />
        <span className="point bottom right" />
      </button>
      <span className="txt-secondary" data-hint="1">Hover to reveal address</span>
      <span className="txt-secondary" data-hint="2">Click to copy</span>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .btn-wrapper {
    --color: #b5faff31;
    --txt-color: #283a3b;
    --txt-color-2: #283a3b;
    --point-size: 8px;
    --point-color: #ffffff;
    --line-color: #00000015;
    --line-style: solid;
    --line-weight: 1px;
    --anim-speed: 1s;

    position: relative;
    display: grid;
    place-items: center;
    padding: 1.5rem 5rem;
    min-width: 160px;
    min-height: 48px;
    user-select: none;
    /* Added: the ::before message below is z-index -1, and neither .btn nor this
       wrapper establishes a stacking context on its own — position alone does
       not. Fourth time in this log. */
    isolation: isolate;
  }

  .txt-secondary {
    position: absolute;
    bottom: -2rem;
    font:
      400 0.75em "Inter",
      sans-serif;
    color: #0006;
    font-style: italic;
    will-change: opacity;
    transition: opacity calc(var(--anim-speed, 1s) * 0.5) ease;
    opacity: 1;
  }

  [data-hint="2"] {
    opacity: 0;
  }

  .btn {
    filter: drop-shadow(0 6px 2px #00000055) drop-shadow(0 14px 4px #00000055)
      drop-shadow(0 32px 8px #00000055) drop-shadow(0 64px 16px #00000055);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    height: 100%;
  }

  /* Added: :focus drives the confirmation and the upload draws no ring. */
  .btn:focus-visible {
    outline: 3px solid var(--txt-color);
    outline-offset: 4px;
  }

  .txt-box {
    position: absolute;
    display: grid;
    place-items: center;
    text-wrap: nowrap;
    inset: 0 0%;
    overflow: clip;
    will-change: inset, filter;
    transition: filter 0.25s ease;
    animation: frame-half calc(var(--anim-speed, 1s) * 0.5) forwards;
  }

  .txt-box::after {
    content: "";
    position: absolute;
    inset: var(--point-size, 8px);
    background: repeating-linear-gradient(45deg, #3f87a6, #ebf8e1 15%, #fff 20%);
    mix-blend-mode: hard-light;
    background-size: 440%;
    transition: background-size 0.4s ease-in;
    filter: blur(1px);
    z-index: 3;
    opacity: 0.1;
  }

  .txt {
    position: absolute;
    padding: 1rem 2rem;
    z-index: 2;
    font:
      500 1.3em "Inter",
      sans-serif;
    color: var(--txt-color, #15104c);
    will-change: opacity, display, text-shadow;
    text-shadow:
      0 -1px 1px #ffffff60,
      0 2px 1px #00000015,
      0 4px 2px #00000015,
      0 8px 4px #00000015,
      0 16px 8px #00000015;
  }

  .txt:last-child {
    color: var(--txt-color-2, #15104c);
    opacity: 0;
    animation: none;
  }

  .frame {
    position: absolute;
    inset: 0 0%;
    z-index: 1;
    border: var(--line-style, solid) var(--line-weight, 1px)
      var(--line-color, #000000);
    background-color: var(--color, #f9d323);
    transition-delay: calc(var(--anim-speed, 1s) * 0.5);
    box-shadow: inset 0 1px 4px 1px #fff5;
    animation: frame-half calc(var(--anim-speed, 1s) * 0.5) forwards;
  }

  .point {
    position: absolute;
    box-sizing: border-box;
    width: var(--point-size, 8px);
    aspect-ratio: 1;
    border-radius: 25%;
    border: solid var(--line-weight, 1px) var(--line-color, #000000);
    background-color: var(--point-color, #fff);
    background-image: radial-gradient(circle at 50% 120%, #0005, #ffff);

    &.top {
      top: calc(var(--point-size, 8px) * -0.5);
    }

    &.bottom {
      bottom: calc(var(--point-size, 8px) * -0.5);
    }

    &.left {
      left: calc(var(--point-size, 8px) * -0.5);
    }

    &.right {
      right: calc(var(--point-size, 8px) * -0.5);
    }
  }

  .btn:hover,
  .btn:focus-visible {
    .txt {
      animation: txt-out calc(var(--anim-speed, 1s) * 0.5) forwards;
    }

    .txt:last-child {
      animation: txt-in calc(var(--anim-speed, 1s) * 0.5) forwards;
    }

    .txt-box {
      animation: frame var(--anim-speed, 1s) ease;

      &::after {
        background-size: 700%;
      }
    }

    .frame {
      animation: frame var(--anim-speed, 1s) ease;
    }

    ~ [data-hint="1"] {
      opacity: 0;
    }

    ~ [data-hint="2"] {
      opacity: 1;
    }
  }

  @keyframes txt-in {
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes txt-out {
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes frame-half {
    0% {
      inset: 0 50%;
    }
    100% {
      inset: 0 0%;
    }
  }

  @keyframes frame {
    50% {
      inset: 0 50%;
    }
  }

  .btn::before {
    content: "Address copied";
    position: absolute;
    inset: 0;
    font:
      400 1em "Inter",
      sans-serif;
    letter-spacing: 0.03em;
    color: #000a;
    z-index: -1;
    filter: blur(16px);
    opacity: 0;
  }

  .btn:active {
    .txt-box {
      filter: contrast(1.4) brightness(1.4);
    }
  }

  .btn:focus {
    &::before {
      animation: appear calc(var(--anim-speed, 01s) * 1.5)
        cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  }

  @keyframes appear {
    70% {
      opacity: 0.75;
      filter: blur(0px);
    }
    100% {
      transform: translateY(-24px);
    }
  }
`;
