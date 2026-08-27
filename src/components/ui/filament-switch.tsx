/* The largest upload in the batch, and almost none of its markup needed guessing.

   THE LETTER COUNTS ARE IN THE CSS. Three rules place the word breaks:

     .text.state-1 span:nth-child(3)  { margin-right: 5px }
     .text.state-2 span:nth-child(4)  { margin-right: 5px }
     .text.state-2 span:nth-child(6)  { margin-right: 5px }

   A gap after the 3rd letter of state 1, and after the 4th and 6th of state 2.
   So the spaces are NOT characters -- they are margins on specific letters, which
   means state 1 is ten spans reading "GetStarted" (Get|Started) and state 2 is
   eleven reading "TimetoShine" (Time|to|Shine). Any other count puts the gaps in
   the wrong place. Measured in the browser:

     state1  count 10  word "GetStarted"   gapAfter [3]
     state2  count 11  word "TimetoShine"  gapAfter [4, 6]

   THE SCREW COUNTS ARE IN THE ARITHMETIC. `calc((5 - var(--i)) * 0.2s)` on
   `.screw g` and `calc((3 - var(--i)) * 0.15s)` on `.screw .dot` -- a
   reverse-stagger only makes sense counting down from the last index, so there
   are five groups and three dots. Five and three, not "some". Measured: 5 and 3.

   TWO PATH LENGTHS ARE DECLARED BY THEIR DASHARRAYS. `.filament-on` is
   `stroke-dasharray: 100 100` with `stroke-dashoffset: 100`, going to `100 0` --
   a filament drawn along a path of length 100. `.path-glass` is `430 430` at
   offset 430, animating to `860 430` -- length 430, and the doubled first value is
   what makes the dash run twice around while fading. So `pathLength={100}` and
   `pathLength={430}`, and the drawn paths can then be any
   shape -- which is not a formality here. Measured, the paths drawn in this file
   are 54.72 and 474.27 units long, so without the declarations the filament's
   dash maths would be out by 45% and the glass ring's by 10%, and both would show
   as a dash that never closes on itself.

   EACH LETTER IS THREE COPIES OF ITSELF. `.text span` is `color: transparent`,
   and `span::before` and `span::after` BOTH carry `content: attr(data-label)`.
   That is the mechanism: a letter needs two bodies so the outgoing copy can slide
   up and out (`char-out`, translateY -70%, blur 4px) while the incoming one drops
   in (`char-in`, from scale(10) and blur(10px), overshooting to -15% then +7%
   before settling). One element cannot be in two places, so the author gave every
   letter a pair and made the element itself invisible.

   `--i` on each span drives `calc(var(--i) * 0.03s)` going in and `* 0.04s`
   coming out -- so the word assembles slightly faster than it leaves.

   HOVER PUSHES THE SWITCH DOWN, not up. `.wrapper` rests at
   `translateY(-10px) scale(1.02)` and `:hover` sets `translateY(0) scale(1)`. The
   resting state is the raised one; hovering seats it. Read the other way round it
   looks like a bug, which is why it is worth saying.

   `@keyframes path-glass` is written INSIDE the `.part-2` rule in the upload.
   Keyframes are not one of the at-rules CSS nesting permits inside a style rule,
   so whether it survives depends on the compiler rather than the spec. Kept
   nested exactly as delivered, and measured rather than assumed:

     animationNameOnElement: "path-glass"   keyframesFoundInSheet: "path-glass"

   styled-components' compiler hoists it to the top level, so it resolves here.
   That is the compiler's doing and not the spec's, which is worth knowing before
   this CSS is moved into a plain stylesheet.

   `mix-blend-mode: color-dodge` on the two glow pseudo-elements is what makes the
   orange read as light rather than paint: dodge against the dark case brightens
   only what is already lit.

   Additions: the input is a full-size transparent checkbox, which is the right
   way to do this -- it stays focusable and stays in the accessibility tree -- but
   it has no name and no focus ring, and both `.text` blocks would otherwise be
   read out letter by letter three times over. So: a name on the input, a ring,
   and the letter machinery hidden from the accessibility tree. */
import { useId } from 'react';
import styled from 'styled-components';

const STATE_1 = [...'GetStarted'];
const STATE_2 = [...'TimetoShine'];
const SCREW_GROUPS = [1, 2, 3, 4, 5];
const SCREW_DOTS = [1, 2, 3];

const Letters = ({ chars, state }: { chars: string[]; state: string }) => (
  <div className={`text ${state}`} aria-hidden="true">
    {chars.map((c, i) => (
      <span key={i} data-label={c} style={{ ['--i' as string]: i + 1 }} />
    ))}
  </div>
);

export const FilamentSwitch = ({
  label = 'Get started',
}: { label?: string }) => {
  const id = useId();

  return (
    <StyledWrapper>
      <div className="area">
        <div className="bg">
          <span className="light-1" />
          <span className="light-2" />
          <span className="light-3" />
        </div>
        <div className="noise" />
        <div className="area-wrapper">
          <div className="wrapper">
            <input type="checkbox" id={id} aria-label={label} />
            <div className="button">
              <div className="part-1">
                <div className="line" />
                <div className="screw">
                  <svg viewBox="0 0 24 60" aria-hidden="true">
                    {SCREW_GROUPS.map((i) => (
                      <g key={i} style={{ ['--i' as string]: i }}>
                        <rect x="10" y={4 + (i - 1) * 11} width="4" height="7" rx="2" fill="#5b5f66" />
                      </g>
                    ))}
                    {SCREW_DOTS.map((i) => (
                      <circle
                        className="dot"
                        key={i}
                        cx="12"
                        cy={14 + (i - 1) * 16}
                        r="1.6"
                        fill="currentColor"
                        style={{ ['--i' as string]: i }}
                      />
                    ))}
                  </svg>
                </div>
                <div className="case">
                  <div className="mask" />
                </div>
              </div>
              <div className="part-2">
                <div className="glass">
                  <div className="glass-reflex" />
                  <div className="glass-noise" />
                </div>
                <svg className="path-glass" viewBox="0 0 190 78" aria-hidden="true">
                  <path
                    pathLength={430}
                    d="M10 10 H180 A8 8 0 0 1 188 18 V60 A8 8 0 0 1 180 68 H10 A8 8 0 0 1 2 60 V18 A8 8 0 0 1 10 10 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <svg className="filament" viewBox="0 0 40 26" aria-hidden="true">
                  <path d="M4 22 C4 8 14 2 20 12 C26 22 36 16 36 4" fill="none" stroke="currentColor" />
                </svg>
                <svg className="filament filament-on" viewBox="0 0 40 26" aria-hidden="true">
                  <path pathLength={100} d="M4 22 C4 8 14 2 20 12 C26 22 36 16 36 4" fill="none" stroke="currentColor" />
                </svg>
                <svg className="filament filament-blur" viewBox="0 0 40 26" aria-hidden="true">
                  <path d="M4 22 C4 8 14 2 20 12 C26 22 36 16 36 4" fill="none" stroke="currentColor" />
                </svg>
                <Letters chars={STATE_1} state="state-1" />
                <Letters chars={STATE_2} state="state-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 320px;

  .area {
    --ease-elastic: cubic-bezier(0.5, 2, 0.3, 0.8);
    --ease-elastic-2: cubic-bezier(0.5, -1, 0.3, 0.8);
    --primary: #ff8800;
    --rounded-max: 100px;
    --rounded-min: 10px;
    --h: 78px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;

    .area-wrapper {
      position: relative;
      padding: 20px 5px;
      cursor: pointer;

      &:hover .wrapper {
        transform: translateY(0) scale(1);

        .case .mask {
          box-shadow:
            inset 8px -15px 15px -10px black,
            inset 10px -17px 12px -12px white,
            0 20px 50px -5px #111;
        }

        .part-2 .glass {
          box-shadow:
            inset 0 0 7px -4px white,
            inset 0 -10px 10px -8px rgba(255, 255, 255, 0.4),
            inset 8px -15px 15px -10px black,
            inset 8px -10px 12px -12px white,
            0 20px 50px -5px #111;
        }
      }
    }

    svg {
      overflow: visible;
    }
  }

  .wrapper {
    display: block;
    border-radius: 100px;
    position: relative;
    z-index: 2;
    transition: all 0.6s var(--ease-elastic);
    transform: translateY(-10px) scale(1.02);

    input {
      position: absolute;
      background: transparent;
      opacity: 0;
      width: 100%;
      height: 100%;
      inset: 0;
      z-index: 10;
      cursor: pointer;
      pointer-events: all;
      user-select: none;
      outline: none;
      margin: 0;
    }

    /* Added: the input is correctly transparent rather than display:none, so it
       keeps focus — and therefore shows nothing when focused. */
    input:focus-visible ~ .button .part-2 .glass {
      outline: 3px solid var(--primary);
      outline-offset: 4px;
    }

    .button {
      background: transparent;
      display: flex;
      border: none;
      padding: 0;
      margin: 0;

      &::before {
        content: "";
        top: 0;
        bottom: 0;
        left: 25%;
        width: 70%;
        height: 100%;
        margin: auto;
        border-radius: 0 50% 50% 0;
        position: absolute;
        pointer-events: none;
        background: var(--primary);
        background: linear-gradient(
          to right,
          var(--primary) 0%,
          transparent 100%
        );
        z-index: 1;
        filter: blur(30px);
        mix-blend-mode: color-dodge;
        transition: all 1s ease 0.4s;
        opacity: 0;
      }

      &::after {
        content: "";
        width: 50px;
        height: 50px;
        top: 0;
        bottom: 0;
        left: 28%;
        margin: auto;
        border-radius: 50%;
        position: absolute;
        pointer-events: none;
        background: var(--primary);
        z-index: 2;
        filter: blur(15px);
        mix-blend-mode: color-dodge;
        transition: all 1s ease 0.4s;
        opacity: 0;
      }

      .part-1 {
        position: relative;
        z-index: 1;
        height: var(--h);
        width: 80px;
        border-radius: var(--rounded-max) var(--rounded-min) var(--rounded-min)
          var(--rounded-max);

        .line {
          position: absolute;
          top: 0;
          bottom: 0;
          right: -1px;
          transition: all 0.4s ease;

          &::before {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            content: "";
            width: 1px;
            background: white;
            box-shadow: 1px 0 10px 3px #ffa600;
            border-radius: 50%;
            height: 0%;
            margin: auto;
            animation: 1.8s line ease infinite;
          }
        }

        .screw {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          z-index: -1;
          overflow: hidden;
          padding: 10px 0;

          svg {
            width: auto;
            height: 60px;

            g {
              transform-origin: center;
            }

            .dot {
              color: #8e8c8b;
            }
          }
        }

        .case {
          height: var(--h);
          width: 80px;
          border-radius: inherit;
          transform: translateX(-40px);
          transition: all 0.9s var(--ease-elastic);

          .mask {
            position: absolute;
            overflow: hidden;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(
              to bottom,
              #2c2e31 0%,
              #31343e 20%,
              #212329 100%
            );
            box-shadow:
              inset 8px -15px 15px -10px black,
              inset 10px -17px 12px -12px white,
              0 30px 70px -5px #111;
            transition: all 0.9s var(--ease-elastic);

            &::before {
              content: "";
              position: absolute;
              border-radius: inherit;
              left: 30%;
              top: 23%;
              width: 100%;
              height: 30%;
              background: white;
              filter: blur(12px);
            }

            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 4px;
              background-color: rgba(255, 255, 255, 0.2);
              mix-blend-mode: overlay;
            }
          }
        }
      }

      .part-2 {
        position: relative;
        height: var(--h);
        width: 190px;
        border-radius: var(--rounded-min) var(--rounded-max) var(--rounded-max)
          var(--rounded-min);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.6s ease;

        .glass {
          position: relative;
          overflow: hidden;
          height: 100%;
          width: 100%;
          transition: all 0.9s var(--ease-elastic);
          border-radius: inherit;
          border-left: 1px solid rgba(0, 0, 0, 0.3);
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(0, 0, 0, 0.5) 100%
          );
          box-shadow:
            inset 0 0 7px -4px white,
            inset 0 -10px 10px -8px rgba(255, 255, 255, 0.4),
            inset 8px -15px 15px -10px black,
            inset 8px -10px 12px -12px white,
            0 30px 70px -5px #111;

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10%;
            right: 14%;
            height: 70%;
            border-radius: 0 25px 0 0;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.5) 0%,
              rgba(255, 255, 255, 0) 60%
            );
          }

          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 15%;
            right: 5%;
            height: 75%;
            border-radius: 0 30px 30px 0;
            box-shadow: inset -2px -6px 5px -5px rgba(255, 255, 255, 0.8);
            filter: blur(3px);
          }

          .glass-reflex {
            position: absolute;
            inset: 0;
            width: 70%;
            border-radius: 0 50% 50% 0;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(255, 255, 255, 0.2) 100%
            );
            transform: translateX(-115%) skewX(30deg);
          }

          .glass-noise {
            position: absolute;
            inset: 0;
            opacity: 0.2;
          }
        }

        .path-glass {
          position: absolute;
          inset: 0;
          transition: opacity 0.6s linear;
          opacity: 0;

          path {
            stroke-dashoffset: 430;
            stroke-dasharray: 430 430;
            animation: 1.4s path-glass ease infinite;
          }
        }

        @keyframes path-glass {
          0% {
            stroke-dasharray: 430 430;
            color: greenyellow;
            opacity: 1;
            filter: blur(2px);
          }
          50% {
            stroke-dasharray: 860 430;
            opacity: 1;
            filter: blur(4px);
          }
          100% {
            stroke-dasharray: 860 430;
            color: var(--primary);
            opacity: 0;
          }
        }

        .filament {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          width: auto;
          height: 26px;
          stroke-width: 2px;
          opacity: 0.3;

          path {
            transition: all 0.6s ease-in-out;
          }
        }

        .filament-on {
          opacity: 1;

          path {
            stroke-dashoffset: 100;
            stroke-dasharray: 100 100;
          }
        }

        .filament-blur {
          opacity: 1;
          filter: blur(8px);
          color: rgb(255, 208, 0);
          stroke-width: 10px;
        }
      }
    }
  }

  .text {
    transition: all 0.3s ease;
    transform: translateY(-4px);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.16em;
    position: absolute;
    inset: 0;
  }

  .text span {
    display: block;
    color: transparent;
    position: relative;
  }

  .text.state-1 span:nth-child(3) {
    margin-right: 5px;
  }

  .text.state-2 span:nth-child(4),
  .text.state-2 span:nth-child(6) {
    margin-right: 5px;
  }

  .text span::before,
  .text span::after {
    content: attr(data-label);
    position: absolute;
    font-size: 18px;
    left: 0;
    color: rgba(255, 255, 255, 0.9);
  }

  .text span::before {
    opacity: 0;
    transform: translateY(-100%);
  }

  .area-wrapper input:checked ~ .button .filament path {
    transition-delay: 0.6s;
  }

  .area-wrapper:hover input:checked ~ .button .filament path {
    stroke-dasharray: 100 0;
  }

  .area-wrapper input:checked ~ .button .part-1 .case {
    transform: translateX(0px);
    transition: all 1.25s var(--ease-elastic-2);
  }

  .area-wrapper:hover input:checked ~ .button::before,
  .area-wrapper:hover input:checked ~ .button::after,
  .area-wrapper:hover input:checked ~ .button .path-glass {
    opacity: 1;
  }

  .area-wrapper:hover .button .part-1 .line {
    opacity: 0;
  }

  .area-wrapper input:not(:checked) ~ .button .part-1 .line::before {
    box-shadow: 1px 0 10px 3px rgba(255, 220, 145, 0.4);
    background: rgb(140, 140, 140);
  }

  .area-wrapper:hover .glass-reflex {
    animation: reflex 0.6s ease;
  }

  .area-wrapper:hover .text span::before {
    animation: char-in 1s ease calc(var(--i) * 0.03s) forwards;
  }

  .area-wrapper:hover .text span::after,
  .area-wrapper input:not(:checked) ~ .button .text.state-1 span::before,
  .area-wrapper input:not(:checked) ~ .button .text.state-1 span::after,
  .area-wrapper input:checked ~ .button .text.state-2 span::before,
  .area-wrapper input:checked ~ .button .text.state-2 span::after {
    opacity: 0;
    animation: char-out 1.3s ease calc(var(--i) * 0.04s) backwards;
  }

  .area-wrapper input:not(:checked) ~ .button .part-1 .screw g {
    animation: pulse 0.8s ease calc(var(--i) * 0.1s) backwards;
  }

  .area-wrapper input:checked ~ .button .part-1 .screw g {
    animation: pulse-out 0.8s ease calc((5 - var(--i)) * 0.2s) backwards;
  }

  .area-wrapper input:not(:checked) ~ .button .part-1 .screw .dot {
    animation: dot 0.7s ease calc(var(--i) * 0.15s) backwards;
  }

  .area-wrapper input:checked ~ .button .part-1 .screw .dot {
    animation: dot-out 0.7s ease calc((3 - var(--i)) * 0.15s) forwards;
  }

  @keyframes line {
    0% {
      height: 0%;
      opacity: 1;
    }
    50% {
      height: 100%;
      opacity: 1;
    }
    100% {
      height: 140%;
      opacity: 0;
    }
  }

  @keyframes dot {
    30% {
      color: var(--primary);
      filter: blur(2px);
    }
  }

  @keyframes dot-out {
    40% {
      color: white;
      filter: blur(2px);
    }
  }

  @keyframes pulse {
    30% {
      transform: scaleY(0.8);
    }
  }

  @keyframes pulse-out {
    40% {
      transform: scaleY(0.8);
    }
  }

  @keyframes char-in {
    0% {
      opacity: 0;
      transform: scale(10) translateX(-25%);
      filter: blur(10px);
      color: rgb(0, 251, 255);
    }
    25% {
      transform: translateY(-15%);
      opacity: 1;
      filter: blur(1px);
      color: var(--primary);
    }
    50% {
      transform: translateY(7%);
      opacity: 1;
      filter: blur(0);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
      filter: blur(0);
    }
  }

  @keyframes char-out {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-70%);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes reflex {
    0% {
      transform: translateX(-115%);
    }
    100% {
      transform: translateX(140%);
    }
  }

  .noise {
    position: absolute;
    top: -25px;
    bottom: -20px;
    left: 0;
    right: 0;
    opacity: 0.07;
    mask-image: linear-gradient(
      transparent 5%,
      white 30%,
      white 70%,
      transparent 95%
    );
    filter: grayscale(1);
    pointer-events: none;
    z-index: 1;
  }

  .bg {
    position: absolute;
    inset: 0;

    svg {
      position: absolute;
      overflow: visible;
      inset: 0;
      z-index: 999;
    }

    &::before {
      content: "";
      border-radius: 50%;
      position: absolute;
      right: -25%;
      top: -25%;
      width: 50%;
      height: 50%;
      background-color: var(--primary);
      border-bottom: 10px solid white;
      border-left: 10px solid white;
      filter: blur(130px);
      z-index: 1;
    }

    .light-1 {
      position: absolute;
      right: 20%;
      top: -35%;
      height: 70%;
      width: 8%;
      border-radius: 0 0 50% 50%;
      background-color: white;
      transform: rotate(65deg);
      filter: blur(90px);
    }

    .light-2 {
      position: absolute;
      right: 20%;
      top: -25%;
      height: 90%;
      width: 2%;
      border-radius: 50%;
      background-color: var(--primary);
      transform: rotate(50deg);
      filter: blur(80px);
    }

    .light-3 {
      position: absolute;
      right: 0%;
      top: -20%;
      height: 80%;
      width: 3%;
      border-radius: 0 0 50% 50%;
      background-color: white;
      transform: rotate(35deg);
      filter: blur(80px);
    }
  }
`;
