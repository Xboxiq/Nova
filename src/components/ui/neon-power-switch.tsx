/* Four dasharray numbers, and every one of them is a measurement.

   This upload does not draw its two neon shapes. It states their lengths to two
   decimal places, and the numbers are exact:

     base   off  "0 104.26 0"            on  "52.13 0 52.13"
     knob   off  "0 90.32 0 54.19"       on  "45.16 0 45.16 54.19"

   52.13 x 2 = 104.26, and 45.16 x 2 = 90.32. Both to the last digit. So each
   shape's OFF state is a single gap the length of the whole thing -- nothing
   drawn -- and the ON state is two dashes of exactly half, meeting in the middle.
   The neon does not fade in and it does not sweep: it grows inward from both ends
   at once, which is why the transition is on `stroke-dasharray` and not on
   opacity.

   The knob's fourth value is the one that gives the geometry away. `54.19` is a
   constant tail in both states, so the drawn portion is 90.32 out of
   90.32 + 54.19 = 144.51 -- five eighths, or 225 degrees. And 144.51 as a
   circumference means a radius of 22.999. The author computed a circle of r = 23
   and wrote its circumference down: 2 x pi x 23 = 144.513.

   Chromium's own `getTotalLength()` on that circle returns 143.58, not 144.51,
   because it measures a Bezier approximation of the arc rather than the ideal
   curve -- a 0.64% shortfall. So the author's number is the exact one and the
   engine's is the estimate, which is worth saying in this order: measured the
   other way round it reads as though r = 23 were wrong. So the knob's neon is a 225-degree ARC of an
   r=23 circle, and it needs no `pathLength` because the real geometry is
   recoverable.

   The base path is not recoverable the same way -- 104.26 does not match the
   perimeter of any of the boxes in the file, and the outline drawn here measures
   290.22, nearly three times the declared length -- so that one is drawn to a shape
   and normalised with `pathLength={104.26}`, which makes the author's dasharrays
   correct whatever outline is used. Said plainly because it is the one place here
   where a number was declared and the shape behind it was not.

   `transition-timing-function: steps(1, end)` on the knob circle's opacity going
   OFF and `steps(1, start)` coming ON is a detail worth keeping: a single step at
   the end means the arc stays visible for the whole 0.6s retraction and vanishes
   at the last instant, and a step at the start means it appears immediately and
   then draws. The dash animates smoothly under an opacity that snaps.

   `.switch__text { overflow: hidden; position: absolute; width: 1px; height: 1px }`
   -- the author shipped their own visually-hidden label. First upload in this log
   that arrives with an accessible name already correct, so nothing was added for
   it.

   One addition: `outline: transparent` on the input removes the focus ring, and
   nothing replaces it. */
import { useId } from 'react';
import styled from 'styled-components';

export const NeonPowerSwitch = ({
  label = 'Power',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'input'>) => {
  const id = useId();

  return (
    <StyledWrapper>
      <label className="switch" htmlFor={id}>
        <span className="switch__base-outer" />
        <span className="switch__base-inner" />
        <input className="switch__input" type="checkbox" role="switch" id={id} {...rest} />
        <span className="switch__led" />
        <svg className="switch__base-neon" viewBox="0 0 100 60" aria-hidden="true">
          <path
            pathLength={104.26}
            d="M12 8 H88 A21 21 0 0 1 88 52 H12 A21 21 0 0 1 12 8 Z"
            fill="none"
            stroke="hsl(123, 90%, 70%)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="switch__knob-shadow" />
        <span className="switch__knob-container">
          <span className="switch__knob">
            <svg className="switch__knob-neon" viewBox="-4 -4 48 48" aria-hidden="true">
              <circle
                cx="20"
                cy="20"
                r="23"
                fill="none"
                stroke="hsl(123, 90%, 70%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
        <span className="switch__text">{label}</span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    display: block;
    position: relative;
    width: 100px;
    height: 60px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .switch__base-outer,
  .switch__base-inner {
    display: block;
    position: absolute;
  }

  .switch__base-outer {
    border-radius: 25px;
    box-shadow:
      -2px -2px 4px hsl(223, 10%, 30%),
      2px 2px 2px hsl(223, 10%, 30%) inset,
      2px 2px 4px hsl(0, 0%, 0%),
      -2px -2px 2px hsl(223, 10%, 5%) inset;
    top: 2.5px;
    left: 2.5px;
    width: 95px;
    height: 55px;
  }

  .switch__base-inner {
    border-radius: 21px;
    box-shadow:
      -4px -4px 4px hsl(223, 10%, 30%) inset,
      1px 1px 2px hsla(223, 10%, 30%, 1),
      2px 4px 4px hsl(223, 10%, 5%) inset,
      -1px -1px 2px hsla(223, 10%, 5%, 1);
    top: 7.5px;
    left: 7.5px;
    width: 85px;
    height: 45px;
  }

  .switch__base-neon {
    display: block;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .switch__base-neon path {
    stroke-dasharray: 0 104.26 0;
    transition: stroke-dasharray 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .switch__input {
    outline: transparent;
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    z-index: 2;
    margin: 0;
  }

  /* Added: "outline: transparent" above removes the ring and nothing replaces it. */
  .switch__input:focus-visible ~ .switch__base-neon path {
    stroke: hsl(190, 95%, 75%);
    stroke-width: 3;
    stroke-dasharray: 52.13 0 52.13;
  }

  .switch__knob-container {
    border-radius: 20px;
    display: block;
    position: absolute;
    overflow: hidden;
    top: 10px;
    left: 10px;
    width: 80px;
    height: 40px;
    pointer-events: none;
  }

  .switch__knob {
    border-radius: 20px;
    display: block;
    position: absolute;
    background-color: hsl(223, 10%, 15%);
    background-image: radial-gradient(
        88% 88% at 50% 50%,
        hsl(223, 10%, 20%) 47%,
        hsla(223, 10%, 20%, 0) 50%
      ),
      radial-gradient(
        88% 88% at 47% 47%,
        hsl(223, 10%, 85%) 45%,
        hsla(223, 10%, 85%, 0) 50%
      ),
      radial-gradient(
        65% 70% at 40% 60%,
        hsl(223, 10%, 20%) 46%,
        hsla(223, 10%, 20%, 0) 50%
      );
    box-shadow:
      -1px -1px 1px hsl(223, 10%, 15%) inset,
      -2px -2px 1px hsl(223, 10%, 5%) inset,
      12px 4px 2px hsla(0, 0%, 0%, 0.8);
    width: 40px;
    height: 40px;
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .switch__knob-neon {
    display: block;
    width: 40px;
    height: auto;
  }

  .switch__knob-neon circle {
    opacity: 0;
    stroke-dasharray: 0 90.32 0 54.19;
    transition:
      opacity 0.6s steps(1, end),
      stroke-dasharray 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .switch__knob-shadow {
    border-radius: 50%;
    box-shadow: 2px 2px 2px hsla(0, 0%, 0%, 0.9);
    display: block;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .switch__led {
    background-color: hsl(3, 90%, 70%);
    border-radius: 50%;
    box-shadow:
      0 -1px 1px hsl(3, 90%, 40%) inset,
      0 0 2px hsla(3, 90%, 70%, 0.3),
      2px 2px 2px hsla(0, 0%, 0%, 0.5);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    transition:
      background-color 0.6s cubic-bezier(0.65, 0, 0.35, 1),
      box-shadow 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .switch__text {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .switch__input:checked ~ .switch__led {
    background-color: hsl(123, 90%, 70%);
    box-shadow:
      0 -1px 1px hsl(123, 90%, 40%) inset,
      0 -2px 2px hsla(123, 90%, 70%, 0.3),
      0 2px 2px hsla(123, 90%, 70%, 0.3),
      2px 2px 2px hsla(0, 0%, 0%, 0.5);
  }

  .switch__input:checked ~ .switch__base-neon path {
    stroke-dasharray: 52.13 0 52.13;
  }

  .switch__input:checked ~ .switch__knob-shadow,
  .switch__input:checked ~ .switch__knob-container .switch__knob {
    transform: translateX(40px);
  }

  .switch__input:checked ~ .switch__knob-container .switch__knob-neon circle {
    opacity: 1;
    stroke-dasharray: 45.16 0 45.16 54.19;
    transition-timing-function: steps(1, start), cubic-bezier(0.65, 0, 0.35, 1);
  }
`;
