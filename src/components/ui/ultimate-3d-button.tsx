/* CSS only, and the richest single control in the log: two pseudo-layers on the
   button, two more on its text, a ripple element, a CSS-drawn chevron, five
   states and two keyframe sets.

   The markup is fixed by what the CSS reads OUT of it rather than by combinators:

     `.btn-text::before, ::after { content: attr(data-text) }`
       The glitch layers render an ATTRIBUTE. Without `data-text` on the element
       they render the empty string and the entire glitch effect is silently
       nothing — no error, no visual, just absent. So `data-text` carries the
       label a second time, and it has to stay in step with the visible text;
       both come from the same prop here so they cannot drift.
     `.ripple` is selected as a child, not a pseudo-element, so it is a real
       element — the CSS needs two independent transition timelines on it
       (instant reset while pressed, slow bloom on release) and a pseudo-element
       would have to share the parent's.
     `.icon` is drawn from `border-top` + `border-right` rotated 45deg: a chevron
       with no asset at all.

   And the z-order is worth reading, because it is why `overflow: hidden` and
   `z-index: 1` on the button are load-bearing rather than tidy. The button is a
   stacking context, so a negative-z child paints ABOVE its background:

     button background #111  →  ::before (-2, the spinning conic)
                             →  ::after (-1, inset 2px, the inner face)
                             →  .ripple (1)  →  .btn-text (2), .icon (2)

   `::after` is inset by 2px, so the only place the conic gradient shows is that
   2px rim — the "perimeter progress" is a 250%-wide spinning disc seen through a
   two-pixel window, and `overflow: hidden` is what stops the disc being visible
   anywhere else. Remove either declaration and the effect is not diminished, it
   is a different picture entirely. */
import styled from 'styled-components';

export const Ultimate3dButton = ({
  children = 'Initialize',
  disabled = false,
}: {
  children?: string;
  disabled?: boolean;
}) => {
  return (
    <StyledWrapper>
      {/* `type="button"`: the upload gives no type, and the default inside a form
          is submit — a demo button that navigates the page is a bug, not a
          style. */}
      <button className="ultimate-3d-btn" type="button" disabled={disabled}>
        {/* data-text is what the two glitch layers render. Same source as the
            visible label, so they cannot fall out of step. */}
        <span className="btn-text" data-text={children}>
          {children}
        </span>
        <span className="ripple" aria-hidden="true" />
        <span className="icon" aria-hidden="true" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Base 3D Button Container */
  .ultimate-3d-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 40px;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #cccccc;
    background: #111111;
    border: none;
    border-radius: 12px;
    overflow: hidden; /* Masks the ripple and internal layers */
    cursor: pointer;
    z-index: 1;
    /* 3D Drop Shadows */
    box-shadow:
      0 8px 15px rgba(0, 0, 0, 0.6),
      0 4px 6px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(0, 0, 0, 0.8);
    transition:
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.3s ease;
  }

  /* 1. Perimeter Progress Animation (Spinning gradient in the gap) */
  .ultimate-3d-btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250%;
    aspect-ratio: 1;
    background: conic-gradient(
      from 0deg,
      transparent 60%,
      #a0a0a0 85%,
      #ffffff 100%
    );
    animation: spinPerimeter 3s linear infinite;
    z-index: -2;
  }

  /* 2. Inner 3D Surface (Creates the 2px outline) */
  .ultimate-3d-btn::after {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 10px;
    background: linear-gradient(180deg, #3a3a3a 0%, #202020 100%);
    box-shadow:
      inset 0 2px 2px rgba(255, 255, 255, 0.15),
      inset 0 -2px 4px rgba(0, 0, 0, 0.5);
    z-index: -1;
    transition:
      background 0.3s ease,
      box-shadow 0.2s ease;
  }

  /* 3. The "Shockwave" Release Ripple (Tactile) */
  .ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
    width: 150%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 60%
    );
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    /* Animates outward on mouse release */
    transition:
      transform 0.5s ease-out,
      opacity 0.6s ease-out;
  }

  /* 4. Text Base Layer */
  .ultimate-3d-btn .btn-text {
    position: relative;
    z-index: 2;
    transition:
      color 0.3s ease,
      transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }

  /* 5. Glitch Text Pseudo-elements */
  .ultimate-3d-btn .btn-text::before,
  .ultimate-3d-btn .btn-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    color: #ffffff;
  }

  /* 6. CSS-Only Chevron Icon */
  .ultimate-3d-btn .icon {
    position: absolute;
    right: 20px;
    width: 8px;
    height: 8px;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(45deg);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 2;
  }

  /* --- STATES --- */
  /* Hover State */
  .ultimate-3d-btn:hover {
    transform: translateY(-2px);
    /* Added Ambient Hover Bloom */
    box-shadow:
      0 12px 20px rgba(0, 0, 0, 0.7),
      0 6px 8px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(0, 0, 0, 0.8),
      0 0 20px 2px rgba(200, 200, 200, 0.15);
  }

  .ultimate-3d-btn:hover::after {
    background: linear-gradient(180deg, #454545 0%, #262626 100%);
  }

  .ultimate-3d-btn:hover::before {
    animation: spinPerimeter 1.2s linear infinite;
  }

  .ultimate-3d-btn:hover .btn-text {
    color: #ffffff;
    transform: translateX(-12px); /* Slides left to make room for icon */
  }

  /* Trigger Glitch Animation on Hover */
  .ultimate-3d-btn:hover .btn-text::before {
    animation: glitchTop 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;
  }

  .ultimate-3d-btn:hover .btn-text::after {
    animation: glitchBottom 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;
  }

  /* Animate Icon In */
  .ultimate-3d-btn:hover .icon {
    right: 28px;
    opacity: 1;
  }

  /* Active (Click) State */
  .ultimate-3d-btn:active {
    transform: translateY(4px);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.8),
      0 1px 2px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(0, 0, 0, 0.8),
      0 0 10px 0 rgba(200, 200, 200, 0.1);
  }

  .ultimate-3d-btn:active::after {
    background: linear-gradient(180deg, #2a2a2a 0%, #151515 100%);
    box-shadow:
      inset 0 3px 6px rgba(0, 0, 0, 0.8),
      inset 0 -1px 1px rgba(255, 255, 255, 0.05);
  }

  /* Reset Ripple Instantly on Click down */
  .ultimate-3d-btn:active .ripple {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
    transition: 0s;
  }

  .ultimate-3d-btn:active .btn-text,
  .ultimate-3d-btn:active .icon {
    transform: translateY(1px) translateX(-12px); /* Maintain left shift while pressing down */
  }

  .ultimate-3d-btn:active .icon {
    transform: rotate(45deg) translate(1px, 1px);
  }

  /* Focus State */
  .ultimate-3d-btn:focus-visible {
    outline: 2px solid #a0a0a0;
    outline-offset: 4px;
  }

  /* Disabled State */
  .ultimate-3d-btn:disabled {
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }

  .ultimate-3d-btn:disabled::before,
  .ultimate-3d-btn:disabled .ripple,
  .ultimate-3d-btn:disabled .icon,
  .ultimate-3d-btn:disabled .btn-text::before,
  .ultimate-3d-btn:disabled .btn-text::after {
    display: none;
  }

  .ultimate-3d-btn:disabled::after {
    background: #222222;
    box-shadow: none;
    border: 1px solid #333333;
    inset: 0;
  }

  .ultimate-3d-btn:disabled .btn-text {
    color: #555555;
    text-shadow: none;
    transform: none;
  }

  /* --- KEYFRAMES --- */
  @keyframes spinPerimeter {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes glitchTop {
    0% {
      clip-path: inset(0 0 50% 0);
      transform: translate(0, 0);
      opacity: 1;
    }
    20% {
      transform: translate(-2px, 1px);
      opacity: 1;
    }
    40% {
      transform: translate(1px, -1px);
      opacity: 1;
    }
    60% {
      transform: translate(0, 0);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes glitchBottom {
    0% {
      clip-path: inset(50% 0 0 0);
      transform: translate(0, 0);
      opacity: 1;
    }
    20% {
      transform: translate(2px, -1px);
      opacity: 1;
    }
    40% {
      transform: translate(-1px, 1px);
      opacity: 1;
    }
    60% {
      transform: translate(0, 0);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default Ultimate3dButton;
