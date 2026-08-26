/* CSS only, and this one asks for FOUR icons it does not supply — more inferred
   content than any upload so far, so each one is named.

   The tree first, which is fixed: `.pixel-checkbox:checked ~ .pixel-toggle-track`
   makes input and track siblings inside `.pixel-toggle-label`; the track holds
   `.indicator-on-wrap`, `.indicator-off-wrap` and `.pixel-coin-thumb`; and
   `.pixel-toggle-track .face-sad / .face-happy` sit inside the thumb, because
   `.pixel-coin-thumb { overflow: hidden }` is what clips them and its `::after`
   sheen is the only other thing in there.

   The four missing icons, and what the CSS says about each:
     `.indicator-on-wrap`  0.85em, `color: #00ffaa`, at the LEFT, faint until
                           checked → the affirmative mark the thumb uncovers
     `.indicator-off-wrap` 0.85em, `color: #ff007f`, at the RIGHT, bright until
                           checked → its negative
     `.face-sad`           1.35em, `color: #16171d`, visible at rest
     `.face-happy`         1.35em, same colour, visible when checked
   All four are sized in em, coloured through `color`, and centred by flex — that
   is a stroked SVG inheriting currentColor, four times. So: lucide's Check, X,
   Frown and Smile. `lucide-react` is already a dependency and it draws exactly
   that shape; hand-cutting four glyphs would be inventing where an installed
   package answers. The choice is mine, the constraints are the upload's. */
import { Check, Frown, Smile, X } from 'lucide-react';
import styled from 'styled-components';

export const PixelToggle = ({ label = 'Toggle' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <label className="pixel-toggle-label">
        {/* `display: none` in the upload, replaced by the visually-hidden clip.
            The third time in this batch: `display: none` does not hide a
            checkbox, it deletes it — out of the tab order and out of the
            accessibility tree, mouse-only. The box stays exactly as invisible
            and nothing drawn moves. */}
        <input type="checkbox" className="pixel-checkbox" aria-label={label} />
        <span className="pixel-toggle-track">
          <span className="indicator-wrapper indicator-on-wrap">
            <Check className="indicator-svg" aria-hidden="true" focusable="false" />
          </span>
          <span className="indicator-wrapper indicator-off-wrap">
            <X className="indicator-svg" aria-hidden="true" focusable="false" />
          </span>
          <span className="pixel-coin-thumb">
            <Frown className="face-svg face-sad" aria-hidden="true" focusable="false" />
            <Smile className="face-svg face-happy" aria-hidden="true" focusable="false" />
          </span>
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pixel-toggle-label {
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }

  /* The upload writes "display: none" here. See the note in the markup: the box
     is hidden the standard way instead, which changes nothing visible. */
  .pixel-checkbox {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .pixel-toggle-track {
    width: 6em;
    height: 3.2em;
    border-radius: 3em;
    background: #0e0f12;
    border: 4px solid #16171d;
    box-shadow:
      inset 0 4px 8px rgba(0, 0, 0, 0.65),
      0 10px 25px rgba(0, 0, 0, 0.45);
    position: relative;
    transition:
      background 0.4s ease,
      border-color 0.4s ease;
  }

  /* The upload styles the track without declaring it a block, and it is a <span>
     here for the same reason the glass checkbox needed it: width and height do
     not apply to a non-replaced inline box. One property, nothing declared
     changes. */
  .pixel-toggle-track {
    display: block;
  }

  .indicator-wrapper {
    position: absolute;
    top: 50%;
    width: 0.85em;
    height: 0.85em;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .indicator-svg {
    width: 100%;
    height: 100%;
  }

  .indicator-on-wrap {
    left: 0.9em;
    color: #00ffaa;
    opacity: 0.12;
    transform: translateY(-50%) scale(0.8);
  }

  .indicator-off-wrap {
    right: 0.9em;
    color: #ff007f;
    opacity: 0.7;
    transform: translateY(-50%) scale(1.1);
    filter: drop-shadow(0 0 3px rgba(255, 0, 127, 0.4));
  }

  .pixel-coin-thumb {
    width: 2.45em;
    height: 2.45em;
    border-radius: 50%;
    background: #ff007f;
    border: 3.5px solid #16171d;
    position: absolute;
    top: 0.12em;
    left: 0.12em;
    box-shadow:
      inset 0 3px 0 rgba(255, 255, 255, 0.28),
      inset 0 -3px 0 rgba(0, 0, 0, 0.28),
      0 4px 8px rgba(0, 0, 0, 0.45),
      0 0 15px rgba(255, 0, 127, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transform: translate3d(0, 0, 0) rotate(0deg);
    transition:
      transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.4s ease,
      box-shadow 0.4s ease;
  }

  .pixel-coin-thumb::after {
    content: "";
    position: absolute;
    top: 0;
    left: -130%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.32) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .face-svg {
    position: absolute;
    width: 1.35em;
    height: 1.35em;
    color: #16171d;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
    z-index: 2;
  }

  .face-sad {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .face-happy {
    opacity: 0;
    transform: rotate(180deg) scale(0.7);
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track {
    background: #0b120f;
    border-color: #131715;
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track .indicator-on-wrap {
    opacity: 0.85;
    transform: translateY(-50%) scale(1.15) rotate(5deg);
    filter: drop-shadow(0 0 4px rgba(0, 255, 170, 0.5));
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track .indicator-off-wrap {
    opacity: 0.1;
    transform: translateY(-50%) scale(0.8) rotate(-5deg);
    filter: none;
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track .pixel-coin-thumb {
    transform: translate3d(2.83em, 0, 0) rotate(360deg);
    background: #00ffaa;
    box-shadow:
      inset 0 3px 0 rgba(255, 255, 255, 0.32),
      inset 0 -3px 0 rgba(0, 0, 0, 0.22),
      0 4px 8px rgba(0, 0, 0, 0.45),
      0 0 18px rgba(0, 255, 170, 0.5);
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track .pixel-coin-thumb::after {
    left: 130%;
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track .face-sad {
    opacity: 0;
    transform: rotate(-180deg) scale(0.7);
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track .face-happy {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .pixel-toggle-label:hover .pixel-coin-thumb {
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1.06);
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track:hover .pixel-coin-thumb {
    transform: translate3d(2.83em, 0, 0) rotate(360deg) scale(1.06);
  }

  .pixel-toggle-label:active .pixel-coin-thumb {
    transform: translate3d(0, 0, 0) rotate(0deg) scale(0.92);
  }

  .pixel-checkbox:checked ~ .pixel-toggle-track:active .pixel-coin-thumb {
    transform: translate3d(2.83em, 0, 0) rotate(360deg) scale(0.92);
  }

  /* Focus, for the same reason as the last three: the box is now reachable and
     had nowhere visible to land. */
  .pixel-checkbox:focus-visible ~ .pixel-toggle-track {
    outline: 3px solid #00ffaa;
    outline-offset: 4px;
  }
`;

export default PixelToggle;
