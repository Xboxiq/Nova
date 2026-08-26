/* CSS-only again, and the most complete upload in this batch: it ships variants,
   a disabled state, a focus ring AND its own reduced-motion block. It is the
   first one that needed nothing added for a keyboard.

   The tree is closed by two combinators used deliberately differently:
     `__input:checked + __box`      ADJACENT — the box is the input's immediate
                                     next sibling
     `__input:checked ~ __content`  GENERAL — the content is a later sibling, so
                                     it comes after the box
   and `+ __box .__grid / .__glow / .__check / .__particle` puts all four inside
   the box. `__content` holds `__label` and `__description` (the CSS gives both,
   and the upload's copy gives their words).

   THE ONE THING NOT IN THE UPLOAD: the tick's path. What the CSS says about it —
   `stroke-dasharray: 22; stroke-dashoffset: 22` transitioning to 0 — is a
   draw-on, and a draw-on is only clean when the dash equals the path's own
   length. A 22x22 icon with a two-segment tick measures about 20.5 user units,
   so `pathLength={22}` is set on the path: it makes the author's 22 exact
   instead of nearly right, the same reading as the loader's pathLength=100. */
import styled from 'styled-components';

type Size = 'small' | 'default' | 'large';

export const PrismCheckbox = ({
  label = 'Enable feature',
  description = 'Activate this option',
  size = 'default',
  iconOnly = false,
  disabled = false,
  defaultChecked = false,
}: {
  label?: string;
  description?: string;
  size?: Size;
  iconOnly?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}) => {
  const mods = [
    size === 'small' && 'prism-checkbox--small',
    size === 'large' && 'prism-checkbox--large',
    iconOnly && 'prism-checkbox--icon-only',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <StyledWrapper>
      <label className={`prism-checkbox ${mods}`}>
        {/* When the words are hidden by `--icon-only` the control loses its
            name with them, so the label text is carried on the input as well.
            The visible copy is unchanged either way. */}
        <input
          type="checkbox"
          className="prism-checkbox__input"
          aria-label={iconOnly ? label : undefined}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
        <span className="prism-checkbox__box">
          <span className="prism-checkbox__grid" />
          <span className="prism-checkbox__glow" />
          <svg className="prism-checkbox__check" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
            <path d="M4 12 L9 17 L18 7" pathLength={22} />
          </svg>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className={`prism-checkbox__particle prism-checkbox__particle--${i}`} />
          ))}
        </span>
        <span className="prism-checkbox__content">
          <span className="prism-checkbox__label">{label}</span>
          <span className="prism-checkbox__description">{description}</span>
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .prism-checkbox {
    --checkbox-size: 34px;
    --checkbox-color: #63ffd2;
    --checkbox-secondary: #7c6cff;
    --checkbox-text: #eaf2ff;
    --checkbox-muted: #8490a8;
    --checkbox-surface: #0a0e18;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 13px;
    min-height: 46px;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .prism-checkbox *,
  .prism-checkbox *::before,
  .prism-checkbox *::after {
    box-sizing: border-box;
  }

  /* Hide the native checkbox while keeping it accessible */
  .prism-checkbox__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    white-space: nowrap;
    clip-path: inset(50%);
  }

  /* Main checkbox */
  .prism-checkbox__box {
    position: relative;
    display: grid;
    flex: 0 0 auto;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    place-items: center;
    overflow: visible;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    color: var(--checkbox-color);
    background: radial-gradient(
        circle at 30% 22%,
        rgba(255, 255, 255, 0.12),
        transparent 36%
      ),
      linear-gradient(145deg, #151b2a, var(--checkbox-surface) 64%);
    box-shadow:
      0 8px 18px rgba(0, 0, 0, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.1),
      inset 0 -3px 7px rgba(0, 0, 0, 0.55);
    isolation: isolate;
    transition:
      border-color 350ms ease,
      background 350ms ease,
      box-shadow 350ms ease,
      transform 180ms ease;
  }

  .prism-checkbox__box::before {
    content: "";
    position: absolute;
    inset: -1px;
    z-index: -2;
    border-radius: inherit;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(99, 255, 210, 0.8),
      transparent 35%,
      rgba(124, 108, 255, 0.8),
      transparent 70%
    );
    opacity: 0;
    filter: blur(5px);
    transition: opacity 350ms ease;
  }

  .prism-checkbox__box::after {
    content: "";
    position: absolute;
    inset: 3px;
    z-index: 0;
    border: 1px solid rgba(255, 255, 255, 0.035);
    border-radius: 7px;
    pointer-events: none;
  }

  /* Decorative grid */
  .prism-checkbox__grid {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: inherit;
    opacity: 0.12;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.15) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 8px 8px;
    transition:
      opacity 350ms ease,
      transform 500ms ease;
  }

  /* Inner glow */
  .prism-checkbox__glow {
    position: absolute;
    inset: 5px;
    z-index: 1;
    border-radius: 6px;
    background: radial-gradient(
      circle,
      rgba(99, 255, 210, 0.48),
      rgba(124, 108, 255, 0.18) 48%,
      transparent 75%
    );
    opacity: 0;
    filter: blur(4px);
    transform: scale(0.4);
    transition:
      opacity 350ms ease,
      transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Check icon */
  .prism-checkbox__check {
    position: relative;
    z-index: 3;
    width: 22px;
    height: 22px;
    overflow: visible;
    filter: drop-shadow(0 0 4px var(--checkbox-color))
      drop-shadow(0 0 9px rgba(99, 255, 210, 0.6));
    transform: scale(0.55) rotate(-12deg);
    opacity: 0;
    transition:
      opacity 220ms ease,
      transform 450ms cubic-bezier(0.2, 1.4, 0.3, 1);
  }

  .prism-checkbox__check path {
    fill: none;
    stroke: currentColor;
    stroke-width: 2.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 22;
    stroke-dashoffset: 22;
    transition: stroke-dashoffset 450ms ease 90ms;
  }

  /* Text */
  .prism-checkbox__content {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  .prism-checkbox__label {
    color: var(--checkbox-text);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.01em;
    transition:
      color 300ms ease,
      text-shadow 300ms ease;
  }

  .prism-checkbox__description {
    color: var(--checkbox-muted);
    font-size: 11px;
    font-weight: 500;
    line-height: 1.25;
    transition: color 300ms ease;
  }

  /* Particle effects */
  .prism-checkbox__particle {
    position: absolute;
    z-index: 5;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--checkbox-color);
    box-shadow:
      0 0 5px var(--checkbox-color),
      0 0 10px var(--checkbox-color);
    opacity: 0;
    pointer-events: none;
  }

  .prism-checkbox__particle--1 { top: 3px; left: 50%; }
  .prism-checkbox__particle--2 { top: 7px; right: 2px; }
  .prism-checkbox__particle--3 { right: 3px; bottom: 6px; }
  .prism-checkbox__particle--4 { bottom: 2px; left: 45%; }
  .prism-checkbox__particle--5 { bottom: 7px; left: 2px; }
  .prism-checkbox__particle--6 { top: 7px; left: 2px; }

  /* Hover */
  .prism-checkbox:hover .prism-checkbox__box {
    border-color: rgba(99, 255, 210, 0.35);
    transform: translateY(-1px);
  }

  .prism-checkbox:hover .prism-checkbox__label {
    color: #ffffff;
  }

  /* Pressed */
  .prism-checkbox:active .prism-checkbox__box {
    transform: translateY(0) scale(0.92);
  }

  /* Checked state */
  .prism-checkbox__input:checked + .prism-checkbox__box {
    border-color: rgba(99, 255, 210, 0.75);
    background: radial-gradient(
        circle at 50% 50%,
        rgba(99, 255, 210, 0.2),
        transparent 65%
      ),
      linear-gradient(145deg, #122b28, #071512 70%);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.32),
      0 0 13px rgba(99, 255, 210, 0.38),
      0 0 26px rgba(124, 108, 255, 0.16),
      inset 0 1px 1px rgba(255, 255, 255, 0.13),
      inset 0 -3px 8px rgba(0, 0, 0, 0.5);
    animation: prism-checkbox-pop 420ms ease;
  }

  .prism-checkbox__input:checked + .prism-checkbox__box::before {
    opacity: 0.75;
    animation: prism-checkbox-border-spin 3s linear infinite;
  }

  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__grid {
    opacity: 0.22;
    transform: scale(1.15) rotate(8deg);
  }

  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__glow {
    opacity: 1;
    transform: scale(1);
  }

  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__check {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .prism-checkbox__input:checked
    + .prism-checkbox__box
    .prism-checkbox__check
    path {
    stroke-dashoffset: 0;
  }

  .prism-checkbox__input:checked
    ~ .prism-checkbox__content
    .prism-checkbox__label {
    color: var(--checkbox-color);
    text-shadow: 0 0 12px rgba(99, 255, 210, 0.28);
  }

  .prism-checkbox__input:checked
    ~ .prism-checkbox__content
    .prism-checkbox__description {
    color: #9eabbd;
  }

  .prism-checkbox__input:checked
    + .prism-checkbox__box
    .prism-checkbox__particle {
    animation: prism-checkbox-particle 620ms ease-out;
  }

  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__particle--2 { animation-delay: 40ms; }
  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__particle--3 { animation-delay: 80ms; }
  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__particle--4 { animation-delay: 120ms; }
  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__particle--5 { animation-delay: 160ms; }
  .prism-checkbox__input:checked + .prism-checkbox__box .prism-checkbox__particle--6 { animation-delay: 200ms; }

  /* Keyboard accessibility */
  .prism-checkbox__input:focus-visible + .prism-checkbox__box {
    outline: 3px solid rgba(99, 255, 210, 0.4);
    outline-offset: 5px;
  }

  /* Disabled state */
  .prism-checkbox:has(.prism-checkbox__input:disabled) {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .prism-checkbox__input:disabled + .prism-checkbox__box {
    filter: grayscale(0.85);
  }

  /* Checkbox-only version */
  .prism-checkbox--icon-only {
    min-height: var(--checkbox-size);
    gap: 0;
  }

  .prism-checkbox--icon-only .prism-checkbox__content {
    display: none;
  }

  /* Small size */
  .prism-checkbox--small {
    --checkbox-size: 26px;
    gap: 10px;
  }
  .prism-checkbox--small .prism-checkbox__box { border-radius: 8px; }
  .prism-checkbox--small .prism-checkbox__check { width: 17px; height: 17px; }
  .prism-checkbox--small .prism-checkbox__label { font-size: 12px; }
  .prism-checkbox--small .prism-checkbox__description { font-size: 10px; }

  /* Large size */
  .prism-checkbox--large {
    --checkbox-size: 44px;
    gap: 16px;
  }
  .prism-checkbox--large .prism-checkbox__box { border-radius: 13px; }
  .prism-checkbox--large .prism-checkbox__check { width: 28px; height: 28px; }
  .prism-checkbox--large .prism-checkbox__label { font-size: 16px; }
  .prism-checkbox--large .prism-checkbox__description { font-size: 12px; }

  /* Animations */
  @keyframes prism-checkbox-pop {
    0% { transform: scale(0.82); }
    55% { transform: scale(1.12); }
    100% { transform: scale(1); }
  }

  @keyframes prism-checkbox-border-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes prism-checkbox-particle {
    0% { opacity: 0; transform: translate(0, 0) scale(0); }
    35% { opacity: 1; transform: translate(0, 0) scale(1.25); }
    100% {
      opacity: 0;
      transform: translate(
          calc((var(--particle-x, 1)) * 8px),
          calc((var(--particle-y, -1)) * 8px)
        )
        scale(0);
    }
  }

  .prism-checkbox__particle--1 { --particle-x: 0; --particle-y: -1; }
  .prism-checkbox__particle--2 { --particle-x: 1; --particle-y: -1; }
  .prism-checkbox__particle--3 { --particle-x: 1; --particle-y: 1; }
  .prism-checkbox__particle--4 { --particle-x: 0; --particle-y: 1; }
  .prism-checkbox__particle--5 { --particle-x: -1; --particle-y: 1; }
  .prism-checkbox__particle--6 { --particle-x: -1; --particle-y: -1; }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .prism-checkbox *,
    .prism-checkbox *::before,
    .prism-checkbox *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 1ms !important;
    }
  }
`;

export default PrismCheckbox;
