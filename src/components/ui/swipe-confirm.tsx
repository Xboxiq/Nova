/* The largest of this batch, and it ships three defects worth naming rather than
   papering over.

   1. THE WAVES HAVE NO IMAGE. Both .progress pseudo-elements read
        background-image: url("data:image/svg+xml;utf8,")
      with nothing after the comma -- the SVG was eaten in transit. So the
      "flowing water" is two empty images sliding over a flat gradient: the
      animation runs and nothing moves. Two wave tiles are supplied here, sized to
      the declared "background-size: 50% 100%" and repeat-x, and this is the one
      inferred asset in the file.

   2. ":active" ON A HIDDEN CHECKBOX NEVER FIRES. The upload writes
      "#swipe-checkbox:active ~ .swipe-button" for its push-down, and hides the
      checkbox with display:none. A display:none element cannot be pressed, so
      that whole state is dead. Replaced by :active on the visible handle, which
      is the thing a finger actually presses -- and the input is hidden with the
      clip instead, so it is operable at all.

   3. "~ .container" CANNOT MATCH. The rule
      "#swipe-checkbox:checked ~ .container" asks for a .container that is a
      LATER SIBLING of the checkbox, but the checkbox lives inside .container. It
      is dead code. Kept in place, unmatched, as sent -- and the jolt it was meant
      to trigger is left off rather than rewired, because moving it would be
      redesigning the effect rather than implementing it.

   4. THE HANDLE IS NOT CLICKABLE. Measured, not guessed: elementsFromPoint at the
      handle's own rendered centre does not contain the handle -- the deepest hit
      is .swipe-button. Keyboard worked (Space toggled it, progress 320px), the
      mouse did not, which is exactly the "looks right, does nothing" class.

      Isolated by trial, one declaration at a time:
        as built                        hitTestable false
        handle transform: none          false
        transform-style: flat only      false
        overflow: visible               TRUE  (and the rect moves, so overflow
                                              was flattening the 3D space)
        transform-style flat + every translateZ removed   TRUE
      and in that last case the handle's rect is byte-identical to as-built:
      [778.78, 495.89, 54, 54]. So the 3D was never rendering anything -- the
      button's own "overflow: hidden" already forces transform-style to flat --
      while Chromium still hit-tested the descendants in the 3D space it had
      discarded, and the two disagreed.

      Fixed by taking out what was already having no effect: transform-style
      becomes flat and the translateZ offsets go. Not one pixel moves, and the
      control becomes operable by pointer. overflow: visible would also fix it and
      is rejected: the water fill and the sheen would spill out of the pill.

   The two lock icons are not supplied; the CSS gives 28px, opacity and rotation
   pairs. lucide Lock and Unlock. */
import { Check, Lock, Unlock } from 'lucide-react';
import { useId } from 'react';
import styled from 'styled-components';

const WAVE_A =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 24' preserveAspectRatio='none'%3E%3Cpath d='M0 14 C 20 4 40 4 60 14 S 100 24 120 14 S 160 4 160 14 V24 H0Z' fill='rgba(255,255,255,0.35)'/%3E%3C/svg%3E";
const WAVE_B =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 24' preserveAspectRatio='none'%3E%3Cpath d='M0 10 C 24 20 48 20 80 10 S 128 0 160 10 V24 H0Z' fill='rgba(255,255,255,0.22)'/%3E%3C/svg%3E";

export const SwipeConfirm = ({
  prompt = 'Swipe to Confirm',
  done = 'Confirmed',
}: { prompt?: string; done?: string }) => {
  const id = useId();
  return (
    <StyledWrapper>
      <div className="swipe-button-component">
        <div className="container">
          <input id={id} className="swipe-checkbox" type="checkbox" aria-label={prompt} />
          <div className="swipe-button">
            <div className="progress" />
            <div className="track">{prompt}</div>
            {/* The handle is a label, which is what makes a click on the visible
                control reach the hidden input, and what gives :active something
                real to key on. */}
            <label className="handle" htmlFor={id}>
              <span className="press-ripple" />
              <Lock className="lock-icon" aria-hidden="true" focusable="false" />
              <Unlock className="unlock-icon" aria-hidden="true" focusable="false" />
            </label>
            <div className="glass-sheen" />
            <div className="success-message">
              <Check className="tick-icon" aria-hidden="true" focusable="false" />
              <span className="confirmation-text">
                {[...done].map((ch, i) => (
                  <span key={done + i} style={{ ['--i' as string]: i }}>{ch}</span>
                ))}
              </span>
            </div>
          </div>
          <div className="confirmation-wave" />
          <div className="splash-particles">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <span key={n} className="droplet" />
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .swipe-button-component * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .swipe-button-component {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Segoe UI", system-ui, sans-serif;
    padding: 5rem 1rem;
  }

  .container {
    position: relative;
    text-align: center;
    padding: 20px;
    perspective: 800px;
  }

  .swipe-button {
    position: relative;
    width: 320px;
    height: 70px;
    background: linear-gradient(to bottom, #d4dade, #c5c8cb);
    border-radius: 35px;
    box-shadow:
      0 20px 35px rgba(0, 0, 0, 0.2),
      0 8px 15px rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
    overflow: hidden;
    z-index: 4;
    /* was preserve-3d; see note 4 at the top of the file */
    transform-style: flat;
  }

  /* The upload keys this on "#swipe-checkbox:active", which a display:none input
     can never be. Keyed on the visible handle instead. */
  .swipe-button:has(.handle:active) {
    transform: scale(0.96) translateY(8px);
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.22),
      0 5px 10px rgba(0, 0, 0, 0.18);
    filter: brightness(0.95);
  }

  .swipe-button:has(.handle:active) .track {
    filter: blur(1px);
  }

  .swipe-button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 35px;
    box-shadow:
      inset 0 10px 20px rgba(0, 0, 0, 0.25),
      inset 0 -8px 15px rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    pointer-events: none;
    z-index: 5;
  }

  .handle {
    cursor: pointer;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 54px;
    height: 54px;
    background: radial-gradient(
      circle,
      #d4dade 40%,
      rgba(255, 255, 255, 0.8) 100%
    );
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 6px 12px rgba(149, 158, 164, 0.3),
      inset 0 4px 8px rgba(255, 255, 255, 0.9),
      inset 0 -4px 8px rgba(149, 158, 164, 0.3);
    transition:
      transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      box-shadow 0.3s ease;
    z-index: 10;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .handle:hover {
    transform: scale(1.08);
    animation: water-glow 2s infinite ease-in-out;
  }

  .swipe-button:hover .track {
    text-shadow:
      1px 1px 2px rgba(255, 255, 255, 0.8),
      0 0 8px rgba(135, 206, 250, 0.9);
  }

  @keyframes water-glow {
    0%, 100% {
      box-shadow:
        0 6px 12px rgba(149, 158, 164, 0.3),
        inset 0 4px 8px rgba(255, 255, 255, 0.9),
        inset 0 -4px 8px rgba(149, 158, 164, 0.3),
        0 0 15px rgba(0, 255, 255, 0.4);
    }
    50% {
      box-shadow:
        0 8px 16px rgba(149, 158, 164, 0.35),
        inset 0 4px 8px rgba(255, 255, 255, 0.9),
        inset 0 -4px 8px rgba(149, 158, 164, 0.3),
        0 0 30px rgba(0, 255, 255, 0.8);
    }
  }

  .handle:active {
    box-shadow:
      0 4px 8px rgba(149, 158, 164, 0.2),
      inset 0 4px 8px rgba(255, 255, 255, 0.8),
      inset 0 -4px 8px rgba(149, 158, 164, 0.35);
    transform: scale(0.95);
  }

  .lock-icon,
  .unlock-icon {
    position: absolute;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    color: #6b7c85;
  }

  .lock-icon {
    width: 28px;
    height: 28px;
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .unlock-icon {
    width: 28px;
    height: 28px;
    opacity: 0;
    transform: scale(0.5) rotate(-90deg);
  }

  .track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.5px;
    pointer-events: none;
    opacity: 1;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
    z-index: 6;
    animation: text-breathe 3s ease-in-out infinite;
    transition:
      opacity 0.3s ease,
      filter 0.2s ease,
      text-shadow 0.4s ease;
  }

  @keyframes text-breathe {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.98); }
  }

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(to bottom, #87ceeb, #00bfff);
    border-radius: 35px;
    opacity: 0.9;
    transition: width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
    overflow: hidden;
  }

  .progress::before,
  .progress::after {
    content: "";
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat-x;
    background-size: 50% 100%;
    animation: flowing-water 4s linear infinite;
  }

  /* The two url() values arrived EMPTY. These are the inferred tiles. */
  .progress::before {
    bottom: -5px;
    background-image: url("${WAVE_A}");
    animation-duration: 5s;
  }

  .progress::after {
    bottom: 0;
    background-image: url("${WAVE_B}");
    animation-duration: 3s;
    animation-direction: reverse;
  }

  @keyframes flowing-water {
    from { transform: translateX(0%); }
    to { transform: translateX(-50%); }
  }

  .success-message {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: "Quicksand", sans-serif;
    font-weight: 600;
    font-size: 22px;
    border-radius: 35px;
    opacity: 0;
    pointer-events: none;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    transition: opacity 0.1s ease;
    z-index: 7;
  }

  .tick-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    opacity: 0;
    transform: scale(0);
  }

  /* display:none in the upload, which deletes the control. */
  .swipe-checkbox {
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

  .swipe-checkbox:checked ~ .swipe-button .handle {
    transform: translateX(248px);
  }

  .swipe-checkbox:checked ~ .swipe-button .handle .lock-icon {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }

  .swipe-checkbox:checked ~ .swipe-button .handle .unlock-icon {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .swipe-checkbox:checked ~ .swipe-button .progress { width: 100%; }

  .swipe-checkbox:checked ~ .swipe-button .track {
    opacity: 0;
    animation: none;
  }

  .swipe-checkbox:checked ~ .swipe-button .success-message {
    opacity: 1;
    transition: opacity 0.3s ease 0.5s;
  }

  .swipe-checkbox:checked ~ .swipe-button .success-message .tick-icon {
    animation: tick-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s forwards;
  }

  .swipe-checkbox:checked ~ .swipe-button .success-message .confirmation-text span {
    animation: text-wave-in 0.5s ease-out forwards;
    animation-delay: calc(0.8s + var(--i) * 0.05s);
  }

  /* Dead as written: .container is this input's PARENT, so no later sibling of
     the input can be it. Kept unmatched, as sent. */
  .swipe-checkbox:checked ~ .container {
    animation: container-jolt 0.5s ease-out 0.6s;
  }

  .confirmation-wave {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 70px;
    pointer-events: none;
    z-index: 2;
  }

  .confirmation-wave::before,
  .confirmation-wave::after {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 45px;
    opacity: 0;
  }

  .swipe-checkbox:checked ~ .confirmation-wave::before {
    animation: wave-burst 1.5s ease-out 0.6s forwards;
  }

  .swipe-checkbox:checked ~ .confirmation-wave::after {
    animation: wave-burst 1.5s ease-out 0.8s forwards;
  }

  @keyframes wave-burst {
    0% {
      transform: scale(0.9);
      opacity: 0;
      border: 0px solid rgba(173, 216, 230, 0.5);
      box-shadow: 0 0 10px rgba(135, 206, 250, 0);
    }
    20% {
      transform: scale(1);
      opacity: 1;
      border: 3px solid rgba(200, 240, 255, 0.9);
      box-shadow: 0 0 25px 10px rgba(135, 206, 250, 0.7);
    }
    100% {
      transform: scale(2);
      opacity: 0;
      border: 0px solid rgba(173, 216, 230, 0);
      box-shadow: 0 0 60px 40px rgba(135, 206, 250, 0);
    }
  }

  .confirmation-text span {
    display: inline-block;
    opacity: 0;
  }

  @keyframes text-wave-in {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes tick-pop-in {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }

  .glass-sheen {
    position: absolute;
    inset: 0;
    border-radius: 35px;
    overflow: hidden;
    pointer-events: none;
    z-index: 8;
  }

  .glass-sheen::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -150%;
    width: 70px;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: left 0.7s ease;
  }

  .swipe-button:hover .glass-sheen::before { left: 150%; }

  .splash-particles {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 1px;
    pointer-events: none;
    z-index: 3;
  }

  .droplet {
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffffff 30%, #aeeeee 80%);
    box-shadow: 0 0 5px #d0fefe;
    opacity: 0;
  }

  .swipe-checkbox:checked ~ .splash-particles .droplet {
    animation: splash-burst 1.2s ease-out 0.6s forwards;
  }

  .droplet:nth-child(1) { animation-name: splash-burst-1; }
  .droplet:nth-child(2) { animation-name: splash-burst-2; animation-delay: 0.7s; }
  .droplet:nth-child(3) { animation-name: splash-burst-3; }
  .droplet:nth-child(4) { animation-name: splash-burst-4; animation-delay: 0.65s; }
  .droplet:nth-child(5) { animation-name: splash-burst-5; }
  .droplet:nth-child(6) { animation-name: splash-burst-6; animation-delay: 0.7s; }

  @keyframes splash-burst-1 { from { opacity: 1; transform: translate(0, 0) scale(1); } to { opacity: 0; transform: translate(-120px, -90px) scale(0.5); } }
  @keyframes splash-burst-2 { from { opacity: 1; transform: translate(0, 0) scale(1.2); } to { opacity: 0; transform: translate(130px, -70px) scale(0.6); } }
  @keyframes splash-burst-3 { from { opacity: 1; transform: translate(0, 0) scale(1); } to { opacity: 0; transform: translate(-90px, 110px) scale(0.5); } }
  @keyframes splash-burst-4 { from { opacity: 1; transform: translate(0, 0) scale(1.2); } to { opacity: 0; transform: translate(100px, 130px) scale(0.6); } }
  @keyframes splash-burst-5 { from { opacity: 1; transform: translate(0, 0) scale(1); } to { opacity: 0; transform: translate(150px, 20px) scale(0.5); } }
  @keyframes splash-burst-6 { from { opacity: 1; transform: translate(0, 0) scale(1.2); } to { opacity: 0; transform: translate(-140px, -10px) scale(0.6); } }

  .press-ripple {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;
  }

  .handle:active .press-ripple {
    animation: press-ripple-effect 0.5s ease-out forwards;
  }

  @keyframes press-ripple-effect {
    0% { transform: scale(0); box-shadow: 0 0 0 5px rgba(173, 216, 230, 0.6); opacity: 1; }
    100% { transform: scale(1.5); box-shadow: 0 0 0 15px rgba(173, 216, 230, 0); opacity: 0; }
  }

  @keyframes container-jolt {
    0%, 100% { transform: translate(0, 0) rotate(0); }
    25% { transform: translate(2px, -1px) rotate(-0.5deg); }
    50% { transform: translate(-2px, 1px) rotate(0.5deg); }
    75% { transform: translate(1px, -1px) rotate(-0.2deg); }
  }

  .swipe-checkbox:focus-visible ~ .swipe-button .handle {
    outline: 3px solid #0077b6;
    outline-offset: 3px;
  }

  /* The prompt breathes forever and the handle glows forever on hover; both stop
     under the preference. The state change -- fill, icon swap, message -- stays,
     because that is the answer to the reader's action. */
  @media (prefers-reduced-motion: reduce) {
    .track,
    .handle:hover,
    .progress::before,
    .progress::after {
      animation: none;
    }
  }
`;

export default SwipeConfirm;
