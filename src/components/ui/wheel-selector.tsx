/* A wheel with its hub off the screen, and three click targets that take turns
   being on top.

   `transform-origin: 280px center` on a label sitting at `left: 40px` inside a
   200px panel puts the pivot 280px to the RIGHT of the label's own box -- well
   outside the panel. So the labels do not rotate in place; they swing on an arc
   whose centre is off-screen, which is what makes three lines of text read as
   three positions on one large wheel rather than three rotating words. One
   property, and it is the whole illusion.

   The selection then works in two layers. `:has(#value-N:checked)` rotates the
   ENTIRE set by +30deg, 0deg or -30deg -- the wheel turning -- and
   `input:checked + .wheel-label` overrides the selected one with
   `rotate(0deg) translateX(10px)`, straightening it and stepping it forward out
   of the arc. The others keep `filter: blur(2px); opacity: 0.1`, so they read as
   out of focus behind glass rather than merely dim.

   THE TAP TARGET IS THE CLEVER PART. `.next-trigger` is a full-bleed overlay at
   `z-index: -1` -- unreachable. Then:

     :has(#value-1:checked) #trigger-for-1,
     :has(#value-2:checked) #trigger-for-2,
     :has(#value-3:checked) #trigger-for-3 { z-index: 100 }

   Exactly one trigger is ever on top, and it is the one belonging to the CURRENT
   value. Each trigger is a label pointing at the NEXT value, so a tap anywhere
   advances the wheel by one and hands the top layer to the next trigger. A
   three-position rotary control, with no script, from three z-index swaps.
   Measured by clicking whichever trigger is actually on top, three times:

     checked value    2  ->  3  ->  1  ->  2
     trigger z-index  ["-1", "100", "-1"]      exactly one on top, always

   And the pivot: `transform-origin: 280px 25.5px` on a label inside a 200px
   panel -- outside it, confirmed.

   `repeating-conic-gradient(from 0deg, #222 0deg 10deg, #252525 10deg 20deg)` is
   the spoked drum -- eighteen spokes from one gradient, in a 300px circle pushed
   `right: -150px` so only its left edge shows through the panel.

   `.radio-input input { display: none }` -- the eighth time in this log. It does
   not hide the radios, it deletes them: unfocusable, out of the tab order, out of
   the accessibility tree. Replaced with the visually-hidden clip, which changes
   nothing on screen and keeps all three. The `:has()` and `+` selectors are
   unaffected, since both depend on position rather than on display.

   Two divergences worth naming. The three inputs are rendered inside FRAGMENTS,
   not wrapper elements: the upload's `:has(#value-N:checked)` becomes
   `:has(input:nth-of-type(N):checked)` here so the ids can be generated per
   instance instead of being document-global, and `nth-of-type` counts among an
   element's own siblings -- a wrapper around each pair would make every input the
   first of its type and collapse all three selectors onto one. That is the same
   trap the LAUNCHING loader's stars fell into, avoided here because of it. And
   the triggers are matched by `data-trigger-for` rather than by `#trigger-for-N`,
   for the same reason.

   The last line of the upload is the author's own note, kept: "I improved the
   version including brushed metallic textures, inner shadows for a sunken wheel
   look". */
import { Fragment, useId } from 'react';
import styled from 'styled-components';

const VALUES = [
  { num: '01', label: 'PRIME', angle: '-30deg' },
  { num: '02', label: 'SELECT', angle: '0deg' },
  { num: '03', label: 'ULTRA', angle: '30deg' },
];

export const WheelSelector = ({ label = 'Tier' }: { label?: string }) => {
  const base = useId();
  const idFor = (i: number) => `${base}-value-${i + 1}`;

  return (
    <StyledWrapper>
      <div className="wheel-selector">
        <span className="hint-pop">Tap to spin</span>
        <div className="radio-input" role="radiogroup" aria-label={label}>
          {VALUES.map((v, i) => (
            <Fragment key={v.num}>
              <input
                type="radio"
                name={base}
                id={idFor(i)}
                defaultChecked={i === 1}
                aria-label={`${v.num} ${v.label}`}
              />
              <span className="wheel-label" style={{ ['--angle' as string]: v.angle }}>
                <span className="num">{v.num}</span>
                <span className="label">{v.label}</span>
              </span>
            </Fragment>
          ))}
          {VALUES.map((v, i) => (
            <label
              className="next-trigger"
              key={`t-${v.num}`}
              data-trigger-for={i + 1}
              htmlFor={idFor((i + 1) % VALUES.length)}
            />
          ))}
          <span className="glass-overlay" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  --accent: #ff3e3e;
  --panel-bg: #1a1a1a;
  --wheel-bg: #2a2a2a;
  --text-active: #ffffff;
  --text-idle: rgba(255, 255, 255, 0.1);

  .wheel-selector {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hint-pop {
    position: absolute;
    top: -40px;
    font-family: "Inter", sans-serif;
    font-weight: 800;
    font-size: 0.6rem;
    letter-spacing: 2px;
    color: #888;
    text-transform: uppercase;
    animation: pulseHint 2s infinite ease-in-out;
    pointer-events: none;
  }

  @keyframes pulseHint {
    0%,
    100% {
      opacity: 0.8;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }

  .radio-input {
    position: relative;
    height: 240px;
    width: 200px;
    background: #111;
    border: 2px solid #333;
    border-radius: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.5),
      inset 0 0 10px rgba(0, 0, 0, 0.8);
  }

  .radio-input::after {
    content: "";
    position: absolute;
    right: -150px;
    width: 300px;
    height: 300px;
    background: repeating-conic-gradient(
      from 0deg,
      #222 0deg 10deg,
      #252525 10deg 20deg
    );
    border-radius: 50%;
    z-index: 1;
    opacity: 0.5;
  }

  .radio-input::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    z-index: 30;
    box-shadow:
      0 0 15px var(--accent),
      0 0 30px var(--accent);
    pointer-events: none;
  }

  /* The upload writes "display: none" here, which deletes the radios rather than
     hiding them. The clip keeps all three focusable and announced, and neither
     the :has() nor the + selectors care. */
  .radio-input input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: 0;
  }

  .radio-input input:focus-visible + .wheel-label {
    outline: 3px solid var(--accent);
    outline-offset: 4px;
  }

  .glass-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 25;
    pointer-events: none;
  }

  .wheel-label {
    position: absolute;
    left: 40px;
    display: flex;
    flex-direction: column;
    transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: 280px center;
    transform: rotate(var(--angle));
    filter: blur(2px);
    opacity: 0.1;
    z-index: 5;
  }

  .wheel-label .num {
    font-family: "Inter", sans-serif;
    font-weight: 900;
    font-size: 0.7rem;
    color: #ff3e3e;
    margin-bottom: -5px;
  }

  .wheel-label .label {
    font-family: "Inter", sans-serif;
    font-weight: 900;
    font-size: 2.4rem;
    color: #fff;
    letter-spacing: -2px;
    text-transform: uppercase;
  }

  .radio-input:has(input:nth-of-type(1):checked) .wheel-label {
    transform: rotate(calc(var(--angle) + 30deg));
  }

  .radio-input:has(input:nth-of-type(2):checked) .wheel-label {
    transform: rotate(calc(var(--angle) + 0deg));
  }

  .radio-input:has(input:nth-of-type(3):checked) .wheel-label {
    transform: rotate(calc(var(--angle) - 30deg));
  }

  .radio-input input:checked + .wheel-label {
    opacity: 1;
    filter: blur(0);
    transform: rotate(0deg) translateX(10px);
    z-index: 10;
  }

  .radio-input input:checked + .wheel-label .label {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  .next-trigger {
    position: absolute;
    inset: 0;
    z-index: -1;
    cursor: pointer;
  }

  .radio-input:has(input:nth-of-type(1):checked) [data-trigger-for="1"],
  .radio-input:has(input:nth-of-type(2):checked) [data-trigger-for="2"],
  .radio-input:has(input:nth-of-type(3):checked) [data-trigger-for="3"] {
    z-index: 100;
  }

  /* I improved the version including brushed metallic textures, inner shadows for a "sunken" wheel look */
`;
