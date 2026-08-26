/* The first upload in this log that declares `isolation: isolate` itself.

   Four earlier files put a negative layer behind the whole page because
   `position: relative` establishes no stacking context, and each was fixed by
   adding exactly one declaration. This one has it already -- `isolation: isolate`
   is in the base `.button` rule -- and it needs it, because there are two negative
   layers: `::before` at `z-index: -2` (the orbiting halo) and `.blob1` at
   `z-index: -1` (the lava). And the author got the second case right too:
   `.inner` is `position: relative; z-index: 2`, and a positioned element with a
   NUMERIC z-index is a stacking context, so `.inner::before` at `z-index: -1`
   stays inside without needing anything added.

   THE HALO IS INTERNAL. `::before` is `inset: -120%` with `blur(34px)` -- a box
   two and a half times the button in every direction -- and `.button` is
   `overflow: hidden`. So the halo never appears outside the pill; the whole
   12-second `haloOrbit` rotation happens INSIDE a 68px-tall capsule, and what
   escapes the clip is only the `box-shadow`, which is not clipped. Two glows, one
   inside the clip and one outside it, and they are different mechanisms.

   FIVE ANIMATIONS AND SEVEN DURATION OVERRIDES. `premiumBorderFlow` 6s,
   `haloOrbit` 12s, `microSheen` 5.5s, `lavaFloat` 8s, `innerLuxuryMove` 10s -- and
   hover does not add motion, it SPEEDS UP what is already running: 6s->3.2s,
   12s->7s, 5.5s->2.2s, 8s->4.5s, 10s->5.5s. Every one of them roughly halves.
   Changing `animation-duration` on a running animation keeps the current progress
   fraction, so nothing restarts -- the whole button just gets more urgent. That is
   why hover reads as heat rather than as a new effect starting.

   The transitions are the same trick in reverse: everything is 900-1100ms on
   `cubic-bezier(0.16, 1, 0.3, 1)` (a hard ease-out, near-instant then settling),
   and `:active` overrides `transition-duration` to 140-180ms. So the press is
   sharp and the release is slow, from two numbers.

   ONE ADDITION, AND IT IS `type="button"`. Nothing else was needed, which is rare
   enough here to say: the upload never writes `outline: none`, so the UA focus ring
   survives; the hover state carries no information, only intensity, so there is
   nothing a keyboard user is locked out of; and `.inner`'s `#fff7f2` on a
   `#191919`-to-`#000` gradient is far above AA at every stop. */
import styled from 'styled-components';

export const LavaHaloButton = ({ label = 'Get Started' }: { label?: string }) => (
  <StyledWrapper>
    <button className="button" type="button">
      <span className="blob1" aria-hidden="true" />
      <span className="inner">{label}</span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .button {
    --brand-orange: #e85002;
    --hot-orange: #ff7a00;
    --deep-red: #c10801;
    --dark-red: #3a0300;
    --black: #000;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.5px;
    border: 0;
    border-radius: 999px;
    cursor: pointer;
    overflow: hidden;
    /* The upload's own, and it is load-bearing: two negative layers below. */
    isolation: isolate;
    background:
      radial-gradient(circle at 0% 0%, #000 0%, transparent 22%),
      radial-gradient(circle at 100% 100%, #000 0%, transparent 24%),
      linear-gradient(
        120deg,
        #000 0%,
        #1a0700 16%,
        #e85002 34%,
        #ff7a00 48%,
        #c10801 66%,
        #250100 82%,
        #000 100%
      );
    background-size: 260% 260%;
    animation: premiumBorderFlow 6s ease-in-out infinite;
    box-shadow:
      0 18px 55px rgba(232, 80, 2, 0.18),
      0 0 0 1px rgba(255, 255, 255, 0.035) inset;
    will-change: transform, box-shadow, filter;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition:
      transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 900ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .button::before {
    content: "";
    position: absolute;
    inset: -120%;
    background: conic-gradient(
      from 90deg,
      transparent 0deg,
      rgba(255, 122, 0, 0) 35deg,
      rgba(255, 122, 0, 0.34) 90deg,
      rgba(232, 80, 2, 0.22) 145deg,
      rgba(193, 8, 1, 0.3) 210deg,
      rgba(255, 122, 0, 0.14) 270deg,
      transparent 330deg
    );
    filter: blur(34px);
    opacity: 0.42;
    transform: scale(0.92);
    animation: haloOrbit 12s linear infinite;
    transition:
      opacity 1.15s cubic-bezier(0.16, 1, 0.3, 1),
      transform 1.15s cubic-bezier(0.16, 1, 0.3, 1),
      filter 1.15s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -2;
  }

  .button::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    background: linear-gradient(
      115deg,
      transparent 0%,
      rgba(255, 255, 255, 0.13) 18%,
      transparent 32%,
      transparent 100%
    );
    background-size: 260% 100%;
    animation: microSheen 5.5s ease-in-out infinite;
    opacity: 0.35;
    pointer-events: none;
    transition:
      opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
      background-position 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .blob1 {
    position: absolute;
    width: 260px;
    height: 260px;
    left: -130px;
    bottom: -180px;
    border-radius: 999px;
    background:
      radial-gradient(
        circle,
        rgba(255, 122, 0, 0.86) 0%,
        transparent 58%
      ),
      radial-gradient(circle, rgba(193, 8, 1, 0.45) 22%, transparent 72%);
    filter: blur(36px);
    opacity: 0.62;
    transform: scale(0.96);
    animation: lavaFloat 8s ease-in-out infinite;
    transition:
      opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
      transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
      filter 1.1s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
  }

  .inner {
    position: relative;
    z-index: 2;
    padding: 16px 34px;
    border-radius: inherit;
    overflow: hidden;
    color: #fff7f2;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    background:
      radial-gradient(
        circle at 18% 90%,
        rgba(232, 80, 2, 0.18),
        transparent 34%
      ),
      radial-gradient(
        circle at 82% 12%,
        rgba(255, 255, 255, 0.08),
        transparent 26%
      ),
      linear-gradient(145deg, #191919 0%, #070707 54%, #000 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -18px 34px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(18px);
    transition:
      transform 1100ms cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 1100ms cubic-bezier(0.16, 1, 0.3, 1),
      background 1100ms cubic-bezier(0.16, 1, 0.3, 1),
      letter-spacing 1100ms cubic-bezier(0.16, 1, 0.3, 1),
      text-shadow 1100ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .inner::before {
    content: "";
    position: absolute;
    inset: -180%;
    background:
      radial-gradient(
        circle at 30% 70%,
        rgba(255, 122, 0, 0.26),
        transparent 28%
      ),
      radial-gradient(circle at 70% 30%, rgba(193, 8, 1, 0.2), transparent 32%),
      linear-gradient(
        120deg,
        transparent 35%,
        rgba(255, 255, 255, 0.1) 48%,
        transparent 62%
      );
    background-size: 180% 180%;
    filter: blur(34px);
    opacity: 0.78;
    animation: innerLuxuryMove 10s ease-in-out infinite;
    z-index: -1;
    transition:
      opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
      transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
      filter 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .inner::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(
        circle at top left,
        rgba(0, 0, 0, 0.96),
        transparent 28%
      ),
      radial-gradient(
        circle at bottom right,
        rgba(0, 0, 0, 0.96),
        transparent 30%
      ),
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 34%);
    pointer-events: none;
  }

  /* Hover does not add motion; it halves five durations. */
  .button:hover {
    transform: translateY(-5px) scale(1.022);
    box-shadow:
      0 40px 120px rgba(232, 80, 2, 0.34),
      0 0 80px rgba(255, 122, 0, 0.14),
      0 0 0 1px rgba(255, 255, 255, 0.06) inset;
    filter: saturate(1.08) brightness(1.02);
    animation-duration: 3.2s;
  }

  .button:hover::before {
    opacity: 1;
    transform: scale(1.14);
    filter: blur(58px);
    animation-duration: 7s;
  }

  .button:hover::after {
    opacity: 0.82;
    background-size: 180% 100%;
    animation-duration: 2.2s;
  }

  .button:hover .blob1 {
    opacity: 1;
    transform: scale(1.18) translate3d(18px, -10px, 0);
    filter: blur(54px);
    animation-duration: 4.5s;
  }

  .button:hover .inner {
    transform: translateY(-1px) scale(1.004);
    background:
      radial-gradient(
        circle at 18% 90%,
        rgba(232, 80, 2, 0.24),
        transparent 34%
      ),
      radial-gradient(
        circle at 82% 12%,
        rgba(255, 255, 255, 0.1),
        transparent 26%
      ),
      linear-gradient(145deg, #202020 0%, #090909 54%, #000 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      inset 0 -24px 44px rgba(0, 0, 0, 0.58),
      0 12px 30px rgba(0, 0, 0, 0.18);
    letter-spacing: -0.035em;
    text-shadow:
      0 0 22px rgba(255, 122, 0, 0.22),
      0 1px 1px rgba(0, 0, 0, 0.72);
  }

  .button:hover .inner::before {
    opacity: 1;
    filter: blur(42px);
    transform: scale(1.08) rotate(10deg);
    animation-duration: 5.5s;
  }

  /* The press is 140-180ms; the release is 900-1100ms. Two numbers. */
  .button:active {
    transition-duration: 180ms;
    transform: translateY(-1px) scale(0.985);
    box-shadow:
      0 12px 34px rgba(232, 80, 2, 0.16),
      0 0 24px rgba(255, 122, 0, 0.08);
    filter: saturate(0.98) brightness(0.98);
  }

  .button:active::before {
    opacity: 0.72;
    transform: scale(0.94);
    filter: blur(28px);
  }

  .button:active .inner {
    transform: scale(0.982) translateY(1px);
    box-shadow:
      inset 0 3px 12px rgba(0, 0, 0, 0.75),
      inset 0 -12px 22px rgba(0, 0, 0, 0.72);
    transition-duration: 140ms;
  }

  .button:active .blob1 {
    opacity: 0.62;
    transform: scale(0.92) translate3d(0, 0, 0);
    filter: blur(24px);
    transition-duration: 140ms;
  }

  .button:active .inner::before {
    opacity: 0.42;
    transform: scale(0.9) rotate(0deg);
    filter: blur(20px);
    transition-duration: 140ms;
  }

  @keyframes premiumBorderFlow {
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 65% 20%;
    }
    50% {
      background-position: 100% 60%;
    }
    75% {
      background-position: 35% 85%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes haloOrbit {
    from {
      transform: rotate(0deg) scale(0.92);
    }
    to {
      transform: rotate(360deg) scale(0.92);
    }
  }

  @keyframes microSheen {
    0%,
    35% {
      background-position: 140% 0;
    }
    65%,
    100% {
      background-position: -140% 0;
    }
  }

  @keyframes lavaFloat {
    0% {
      transform: translate3d(0, 0, 0) scale(0.96);
    }
    50% {
      transform: translate3d(42px, -24px, 0) scale(1.07);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(0.96);
    }
  }

  @keyframes innerLuxuryMove {
    0% {
      transform: translate3d(-2%, 2%, 0) rotate(0deg);
      background-position: 0% 50%;
    }
    50% {
      transform: translate3d(3%, -3%, 0) rotate(7deg);
      background-position: 100% 50%;
    }
    100% {
      transform: translate3d(-2%, 2%, 0) rotate(0deg);
      background-position: 0% 50%;
    }
  }
`;

export default LavaHaloButton;
