/* A bar that is already at its value before the animation runs.

   `.progress-bar` is declared `width: 40%` and then animated
   `grow 3s ease-in-out forwards` from `width: 0` to `width: 40%`. The base style
   and the animation's end frame agree, which is why this one needs no
   reduced-motion override at all: when the blanket removes `grow`, the bar sits
   at exactly the width the animation was travelling to. Measured, not assumed --
   the last three components in this log needed the opposite treatment.

   `ripple` and `float` are both `infinite`. The ripple is a 200%-square radial
   gradient centred on the bar and scaled 0.5 -> 1.5 while fading, so it reads as
   a pulse travelling out through the fill; `.particles` is five 4px dots whose
   positions and delays come from five `:nth-child` rules, which is where the
   count of five comes from -- there is no markup in the upload to count.

   One addition, and it is the whole difference between working and not working:
   this was three nested divs and a text node. A progress indicator with no role
   announces nothing, and the "40%" text is not attached to anything -- so
   `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and
   a name. The 40 is left hardcoded in both the base width and the keyframe,
   exactly as the upload has it, so the reported value and the painted value
   cannot drift apart. */
import styled from 'styled-components';

const PARTICLES = [0, 1, 2, 3, 4];

export const GlowProgressBar = ({ label = 'Loading' }: { label?: string }) => (
  <StyledWrapper>
    <div
      className="progress-container"
      role="progressbar"
      aria-label={label}
      aria-valuenow={40}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar" />
      <div className="particles">
        {PARTICLES.map((i) => (
          <span className="particle" key={i} />
        ))}
      </div>
      <div className="progress-text">40%</div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .progress-container {
    position: relative;
    width: 60%;
    max-width: 500px;
    height: 20px;
    background: radial-gradient(circle, #1b2735, #090a0f);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    border: 1px solid #313131;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, #00f260, #0575e6);
    border-radius: 30px;
    animation: grow 3s ease-in-out forwards;
    box-shadow:
      0 0 15px #00f260,
      0 0 30px #0575e6;
  }

  .progress-bar::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent);
    opacity: 0.5;
    animation: ripple 3s infinite;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
    z-index: 2;
  }

  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.6;
    animation: float 5s infinite ease-in-out;
  }

  @keyframes grow {
    0% {
      width: 0;
    }
    100% {
      width: 40%;
    }
  }

  @keyframes ripple {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.7;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-20px) translateX(10px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }

  .particle:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .particle:nth-child(2) {
    top: 30%;
    left: 70%;
    animation-delay: 1s;
  }

  .particle:nth-child(3) {
    top: 50%;
    left: 50%;
    animation-delay: 2s;
  }

  .particle:nth-child(4) {
    top: 80%;
    left: 40%;
    animation-delay: 1.5s;
  }

  .particle:nth-child(5) {
    top: 90%;
    left: 60%;
    animation-delay: 2.5s;
  }
`;
