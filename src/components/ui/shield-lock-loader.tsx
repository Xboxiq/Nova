/* The dasharray states the path length, so the path length is declared.

   `.shield` is `stroke-dasharray: 30 70` and `shieldMove` runs
   `stroke-dashoffset` from 100 to 0. Thirty plus seventy is one hundred, and the
   offset travels exactly one hundred -- so the author was drawing against a
   path whose length is 100 units: one dash covering 30% of the outline, chasing
   itself around once per cycle. Any other path length and the dash would either
   overlap itself or leave a gap, and the loop would visibly stutter at the seam.

   `pathLength={100}` states that, which makes the animation correct for whatever
   shield outline is drawn rather than only for the author's. The outline drawn
   here measures 100.69 units, so the declaration is also absorbing a 0.7% error
   that would otherwise show as a drifting seam. The shield itself is
   not supplied; what the CSS supplies is its length.

   `.scan` travels `translateY(-5px)` to `translateY(35px)` -- 40 units of travel,
   which is the height of the box the shield has to fit in. The viewBox follows
   from that, not from a guess.

   `.lock-body` and `.keyhole` pulse on the same 1.5s clock but animate different
   properties -- scale plus opacity on the body, opacity alone on the keyhole --
   so the keyhole appears to brighten inside a breathing lock rather than
   breathe with it.

   One addition, and it is the difference between working and not working: this
   is a bare `<svg>` in a `<div>`. A loader with no role and no name announces
   nothing at all. `role="status"` plus a visually-hidden label gives assistive
   technology the one fact the animation carries. */
import styled from 'styled-components';

export const ShieldLockLoader = ({ label = 'جارٍ التحقّق' }: { label?: string }) => (
  <StyledWrapper className="loader" role="status">
    <svg className="container" viewBox="0 0 40 40" width={64} height={64} aria-hidden="true">
      <path className="shield-track" d="M20 3 34 8v11c0 8.5-5.6 15.4-14 18-8.4-2.6-14-9.5-14-18V8z" />
      <path className="shield" pathLength={100} d="M20 3 34 8v11c0 8.5-5.6 15.4-14 18-8.4-2.6-14-9.5-14-18V8z" />
      <path className="lock" d="M15.5 18v-3a4.5 4.5 0 0 1 9 0v3" />
      <rect className="lock-body" x="13" y="18" width="14" height="11" rx="2.5" />
      <circle className="keyhole" cx="20" cy="22.5" r="1.8" />
      <path className="keyhole-line" d="M20 24.3v2.4" />
      <path className="scan" d="M8 6h24" />
    </svg>
    <span className="loader-label">{label}</span>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  &.loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    overflow: visible;
  }

  /* Shield background */
  .shield-track {
    fill: none;
    stroke: #d0d0d0;
    stroke-width: 2.5;
  }

  /* Animated shield border */
  .shield {
    fill: none;
    stroke: #4f8cff;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-dasharray: 30 70;
    animation: shieldMove 2s linear infinite;
  }

  /* Lock */
  .lock-body {
    fill: #4f8cff;
    animation: lockPulse 1.5s ease-in-out infinite;
  }

  .lock {
    fill: none;
    stroke: #666;
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  /* Keyhole */
  .keyhole {
    fill: #fff;
    animation: keyPulse 1.5s ease-in-out infinite;
  }

  .keyhole-line {
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
  }

  /* Scanning line */
  .scan {
    stroke: #4f8cff;
    stroke-width: 1.5;
    stroke-linecap: round;
    opacity: 0;
    animation: scan 1.8s ease-in-out infinite;
  }

  /* Shield border movement */
  @keyframes shieldMove {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  /* Lock animation */
  @keyframes lockPulse {
    0%,
    100% {
      opacity: 0.65;
      transform: scale(1);
      transform-origin: center;
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
      transform-origin: center;
    }
  }

  /* Keyhole animation */
  @keyframes keyPulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  /* Security scanner */
  @keyframes scan {
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(35px);
    }
  }

  .loader-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
