/* Two ways of writing the same label, one of which does nothing, and three
   classes waiting for a script that never arrives.

   The status word is set twice:

     .neo-toggle-input:checked + .neo-toggle .neo-status-text { content: "ACTIVE" }
     .neo-toggle-input:checked + .neo-toggle .neo-status-text::before { content: "ACTIVE" }

   The first computes and paints nothing, which is not the same as being dropped.
   Measured: with the `::before` content killed and the element's own
   `content: "ACTIVE"` left in place, the element renders at 0x0 -- and with the
   pseudo-element restored it is 49.8x10. `content` on a normal element only takes
   effect for replaced content; a bare string computes and never draws. Same shape
   as the invalid-at-computed-value-time finding earlier in this log: the
   declaration is there, the paint is not. The second works, and the pair
   together settle a markup question the upload does not answer: `.neo-status-text`
   has to be an EMPTY element, because its text comes from a pseudo-element. Put a
   word inside it and you get the word twice.

   The `::before` pair is also the only place STANDBY appears, so the off-state
   label exists nowhere in the markup either.

   `.neo-toggle-input:checked + .neo-toggle + .neo-value-display` is a two-step
   sibling chain, which fixes the order: input, then the label, then the value
   display -- the display cannot be inside the label or that selector never
   matches.

   The thumb travels `calc(var(--toggle-width) - 38px)` = 42px, which is
   80 - 30 (thumb) - 4 - 4 (its insets). The one arithmetic in the file, and it
   is exact.

   `.neo-gesture-area { inset: -10px; z-index: 0 }` is an invisible box 10px
   larger than the toggle on every side, inside the label -- so the hit target is
   100x58 rather than 80x38. Nothing paints it; its only job is to be bigger.

   Three things declared and unreachable, all kept and all named:

     .neo-dragging / .neo-activated / .neo-progress -- the upload's own comment
       says "Custom script to enable advance features". No CSS applies them, so
       the ripple and the progress arc never run. There is no script here either;
       adding one would be designing, not implementing.
     .neo-thumb-wave::before and ::after -- a hover rule sets their opacity to 1,
       and neither pseudo-element is ever given `content`, so they do not exist.
     .neo-track-highlight's resting gradient ends at `rgba(54, 249, 199, 0)` --
       transparent to transparent, under `opacity: 0`. Two ways of being invisible.

   Two additions. The input is hidden with `opacity: 0; width: 0; height: 0`,
   which is correct -- it stays focusable and stays in the accessibility tree,
   unlike `display: none` -- but it has no label of any kind and no focus ring, so
   it announced as "checkbox" and showed nothing when focused. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const BARS = [0, 1, 2, 3, 4];

export const NeoSpectrumToggle = ({
  label = 'Audio engine',
  value = '48 kHz',
}: { label?: string; value?: string }) => {
  const id = useId();
  const [on, setOn] = useState(false);

  return (
    <StyledWrapper className="neo-toggle-container">
      <input
        className="neo-toggle-input"
        type="checkbox"
        id={id}
        aria-label={label}
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
      <label className="neo-toggle" htmlFor={id}>
        <span className="neo-track">
          <span className="neo-background-layer" />
          <span className="neo-grid-layer" />
          <span className="neo-track-highlight" />
          <span className="neo-spectrum-analyzer">
            {BARS.map((b) => (
              <span className="neo-spectrum-bar" key={b} />
            ))}
          </span>
        </span>
        <span className="neo-thumb">
          <span className="neo-thumb-ring" />
          <span className="neo-thumb-core">
            <span className="neo-thumb-icon">
              <span className="neo-thumb-wave" />
            </span>
          </span>
          <span className="neo-thumb-pulse" />
        </span>
        <span className="neo-gesture-area" />
        <span className="neo-interaction-feedback">
          <span className="neo-ripple" />
          <span className="neo-progress-arc" />
        </span>
        <span className="neo-status">
          <span className="neo-status-indicator">
            <span className="neo-status-dot" />
            {/* Empty on purpose: the word comes from ::before. */}
            <span className="neo-status-text" />
          </span>
        </span>
      </label>
      <span className="neo-value-display">
        <span className="neo-value-text">{value}</span>
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  &.neo-toggle-container {
    --toggle-width: 80px;
    --toggle-height: 38px;
    --toggle-bg: #181c20;
    --toggle-off-color: #475057;
    --toggle-on-color: #36f9c7;
    --toggle-transition: 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    position: relative;
    display: inline-flex;
    flex-direction: column;
    font-family: "Segoe UI", Tahoma, sans-serif;
    user-select: none;
  }

  .neo-toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* Added: the input is correctly hidden with opacity, which keeps it focusable
     — and therefore leaves focus invisible without a ring of its own. */
  .neo-toggle-input:focus-visible + .neo-toggle .neo-track {
    outline: 3px solid var(--toggle-on-color);
    outline-offset: 4px;
  }

  .neo-toggle {
    position: relative;
    width: var(--toggle-width);
    height: var(--toggle-height);
    display: block;
    cursor: pointer;
    transform: translateZ(0);
    perspective: 500px;
  }

  /* Track styles */
  .neo-track {
    position: absolute;
    inset: 0;
    border-radius: calc(var(--toggle-height) / 2);
    overflow: hidden;
    transform-style: preserve-3d;
    transform: translateZ(-1px);
    transition: transform var(--toggle-transition);
    box-shadow:
      0 2px 10px rgba(0, 0, 0, 0.5),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .neo-background-layer {
    position: absolute;
    inset: 0;
    background: var(--toggle-bg);
    background-image: linear-gradient(
      -45deg,
      rgba(20, 20, 20, 0.8) 0%,
      rgba(30, 30, 30, 0.3) 50%,
      rgba(20, 20, 20, 0.8) 100%
    );
    opacity: 1;
    transition: all var(--toggle-transition);
  }

  .neo-grid-layer {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        to right,
        rgba(71, 80, 87, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(71, 80, 87, 0.05) 1px, transparent 1px);
    background-size: 5px 5px;
    opacity: 0;
    transition: opacity var(--toggle-transition);
  }

  .neo-track-highlight {
    position: absolute;
    inset: 1px;
    border-radius: calc(var(--toggle-height) / 2);
    background: linear-gradient(90deg, transparent, rgba(54, 249, 199, 0));
    opacity: 0;
    transition: all var(--toggle-transition);
  }

  /* Spectrum analyzer */
  .neo-spectrum-analyzer {
    position: absolute;
    bottom: 6px;
    right: 10px;
    height: 10px;
    display: flex;
    align-items: flex-end;
    gap: 2px;
    opacity: 0;
    transition: opacity var(--toggle-transition);
  }

  .neo-spectrum-bar {
    width: 2px;
    height: 3px;
    background-color: var(--toggle-on-color);
    opacity: 0.8;
  }

  /* Thumb styles */
  .neo-thumb {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transform-style: preserve-3d;
    transition: transform var(--toggle-transition);
    z-index: 1;
  }

  .neo-thumb-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: var(--toggle-off-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all var(--toggle-transition);
  }

  .neo-thumb-core {
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
    transition: all var(--toggle-transition);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .neo-thumb-icon {
    position: relative;
    width: 10px;
    height: 10px;
    transition: all var(--toggle-transition);
  }

  .neo-thumb-wave {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 2px;
    background: var(--toggle-off-color);
    transform: translate(-50%, -50%);
    transition: all var(--toggle-transition);
  }

  .neo-thumb-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid var(--toggle-off-color);
    transform: scale(0);
    opacity: 0;
    transition: all var(--toggle-transition);
  }

  /* Gesture area */
  .neo-gesture-area {
    position: absolute;
    inset: -10px;
    z-index: 0;
  }

  /* Interaction feedback */
  .neo-interaction-feedback {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .neo-ripple {
    position: absolute;
    top: 50%;
    left: 30%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--toggle-on-color) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.4s ease-out;
  }

  .neo-progress-arc {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: var(--toggle-on-color);
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    opacity: 0;
    transition:
      opacity 0.3s ease,
      transform 0.5s ease;
  }

  /* Status indicator */
  .neo-status {
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .neo-status-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .neo-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--toggle-off-color);
    transition: all var(--toggle-transition);
  }

  .neo-status-text {
    font-size: 9px;
    font-weight: 600;
    color: var(--toggle-off-color);
    letter-spacing: 1px;
    transition: all var(--toggle-transition);
  }

  /* Value display */
  .neo-value-display {
    position: absolute;
    top: -22px;
    right: 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--toggle-off-color);
    opacity: 0;
    transform: translateY(5px);
    transition: all var(--toggle-transition);
  }

  .neo-value-text {
    transition: all var(--toggle-transition);
  }

  /* Active states */
  /* ON state */
  .neo-toggle-input:checked + .neo-toggle .neo-thumb {
    transform: translateX(calc(var(--toggle-width) - 38px));
  }

  .neo-toggle-input:checked + .neo-toggle .neo-thumb-ring {
    background-color: var(--toggle-on-color);
    border-color: rgba(54, 249, 199, 0.3);
    box-shadow: 0 0 15px rgba(54, 249, 199, 0.5);
  }

  .neo-toggle-input:checked + .neo-toggle .neo-thumb-wave {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #fff;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-thumb-pulse {
    transform: scale(1.2);
    opacity: 0.3;
    animation: neo-pulse 1.5s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-track-highlight {
    background: linear-gradient(90deg, transparent, rgba(54, 249, 199, 0.2));
    opacity: 1;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-grid-layer {
    opacity: 1;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-analyzer {
    opacity: 1;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(1) {
    animation: neo-spectrum 0.9s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(2) {
    animation: neo-spectrum 0.8s 0.1s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(3) {
    animation: neo-spectrum 1.1s 0.2s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(4) {
    animation: neo-spectrum 0.7s 0.1s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(5) {
    animation: neo-spectrum 0.9s 0.15s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-status-dot {
    background-color: var(--toggle-on-color);
    box-shadow: 0 0 8px var(--toggle-on-color);
  }

  .neo-toggle-input:checked + .neo-toggle .neo-status-text {
    color: var(--toggle-on-color);
    content: "ACTIVE";
  }

  .neo-toggle-input:checked + .neo-toggle + .neo-value-display {
    opacity: 1;
    transform: translateY(0);
  }

  .neo-toggle-input:checked + .neo-toggle + .neo-value-display .neo-value-text {
    color: var(--toggle-on-color);
  }

  /* Hover effects */
  .neo-toggle:hover .neo-thumb-ring {
    transform: scale(1.05);
  }

  .neo-toggle-input:not(:checked) + .neo-toggle:hover .neo-thumb-wave::before,
  .neo-toggle-input:not(:checked) + .neo-toggle:hover .neo-thumb-wave::after {
    opacity: 1;
  }

  /* Drag gesture handling */
  .neo-toggle.neo-dragging .neo-track {
    transform: translateZ(-1px) scale(1.02);
  }

  .neo-toggle.neo-dragging .neo-thumb {
    transition: none;
  }

  /* Animations */
  @keyframes neo-pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  @keyframes neo-spectrum {
    0% {
      height: 3px;
    }
    50% {
      height: 8px;
    }
    100% {
      height: 3px;
    }
  }

  /* Custom script to enable advance features */
  .neo-toggle.neo-activated .neo-ripple {
    width: 100px;
    height: 100px;
    opacity: 0.5;
    transition: all 0.6s ease-out;
  }

  .neo-toggle.neo-progress .neo-progress-arc {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1) rotate(270deg);
    transition:
      opacity 0.3s ease,
      transform 1s ease;
  }

  /* Status text change */
  .neo-toggle-input:checked + .neo-toggle .neo-status-text::before {
    content: "ACTIVE";
  }

  .neo-toggle-input:not(:checked) + .neo-toggle .neo-status-text::before {
    content: "STANDBY";
  }
`;
