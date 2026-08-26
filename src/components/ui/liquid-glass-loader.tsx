/* The first upload in this log that ships its own reduced-motion answer -- and it
   is the same answer this repo settled on.

   `@media (prefers-reduced-motion: reduce)` at the foot of the file sets
   `animation-duration: 0.01ms; animation-iteration-count: 1` on the shell, the
   sheen, the orb, the surface, the bubbles and the ellipsis. Not `animation: none`
   -- duration to nothing and one iteration, which is exactly the technique in
   `tokens.css:326`, arrived at independently. Every other upload here left that
   question to the repo's blanket. Worth recording as the exception.

   THE 3D THAT IS FLAT. `.liquid-loader` declares `perspective: 72em` and
   `transform-style: preserve-3d`; `.liquid-loader__shell` declares
   `transform-style: preserve-3d` too, and the orb inside it asks for
   `transform: translateZ(0.6em)` -- a real pop toward the viewer. But the shell
   also declares `overflow: hidden`, and `overflow` other than `visible` forces
   `transform-style` to be USED as `flat` -- it is a grouping property, and a group
   cannot be a 3D rendering context.

   And this one cannot be measured the obvious way. `getComputedStyle(shell)
   .transformStyle` still reports `preserve-3d`, because the flattening changes the
   USED value and not the computed one, and the orb's transform still resolves to a
   full `matrix3d(...9.6...)`. The reading that settles it is the rendered width:
   under a 1152px perspective, an element 9.6px closer to the eye is 1152/1142.4
   times wider. Measured with the float and wobble frozen so their `scale` keyframe
   cannot contaminate it:

     translateZ(0.6em)  ->  40.797px
     translateZ(0)      ->  40.797px      identical
     if 3D applied      ->  41.140px      never observed

   So the orb's `translateZ` and the hover tilt's `translateZ(0.3em)` are both
   inert. The 3D is declared four times and happens once -- in the hover
   `rotateX(6deg) rotateY(-4deg)`, which is a rotation and reads even flattened.

   THE ELLIPSIS ANIMATES A PROPERTY THAT IS NOT SUPPOSED TO ANIMATE.
   `@keyframes ll-ellipsis` steps `content` through "", ".", "..", "..." with
   `steps(4, end)` over 1.35s. `content` is not an animatable property in the
   spec, and this is the SECOND `content` finding in this log -- the first was a
   `content` declared on a non-pseudo element, which computes and never paints.
   This one is different: Chromium DOES interpolate `content` discretely on
   pseudo-elements, so the ellipsis really counts up. Measured, not assumed --
   the check reads the pseudo's computed `content` twice, a third of a cycle
   apart, and gets different strings.

   Which is why the label is not left to speak for itself: a `role="status"` whose
   text changes four times a second is a live region that never stops talking. The
   name is pinned with `aria-label`, so what a screen reader gets is "Loading",
   once, and the counting dots stay a picture.

   SIX BUBBLES, SIX OF EVERYTHING. `--1` to `--6`, and no two share a left, a
   size, a duration or a delay: 0.34/0.78/1.1/1.48/1.72/0.56em across an orb
   2.55em wide, sizes 0.34/0.25/0.4/0.22/0.3/0.18em, durations
   2/2.28/2.42/1.88/2.56/1.72s, delays 0/0.22/0.48/0.34/0.72/0.92s. Six separate
   `@keyframes` too, each with its own horizontal drift and its own final scale --
   so the six are not one animation staggered, they are six animations. They start
   at `bottom: -0.42em` inside an `overflow: hidden` orb, which is why they appear
   from nothing rather than fading in.

   `ll-shell-float` uses the `translate` property and not `transform`, and the
   upload says why in a comment: "so hover transform still works". Animating
   `transform` would have been overwritten by the hover rule's `transform`;
   animating `translate` composes with it instead. That is the same individual
   transform property that decided two things in the galaxy button, used here
   deliberately and for a third reason.

   TWO THINGS LEFT ALONE ON PURPOSE. The upload writes
   `.liquid-loader:focus-visible .liquid-loader__shell` and
   `.liquid-loader__shell:focus-visible` and a focus-ring box-shadow for them --
   but nothing here is focusable, and a loader does not belong in the tab order.
   The rules are kept and stay unmatched; adding a `tabindex` to make them fire
   would be a worse component, not a more accessible one. And `cursor: default`
   with `user-select: none` on something that is not a control is the upload's,
   and correct. */
import styled from 'styled-components';

const BUBBLES = [1, 2, 3, 4, 5, 6];

export const LiquidGlassLoader = ({ label = 'Loading' }: { label?: string }) => (
  <StyledWrapper>
    {/* The ellipsis on the label is animated CSS content -- four values a
        second. Pinning the name keeps a live region from reading it out. */}
    <div className="liquid-loader" role="status" aria-label={label}>
      <div className="liquid-loader__shell">
        <div className="liquid-loader__orb">
          {BUBBLES.map((n) => (
            <span key={n} className={'liquid-loader__bubble liquid-loader__bubble--' + n} />
          ))}
        </div>
        <span className="liquid-loader__label">{label}</span>
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .liquid-loader {
    /* Component-scope variables only */
    --ll-bg-1: #ffffff;
    --ll-bg-2: #f7f2ff;
    --ll-bg-3: #eee6ff;
    --ll-edge: rgba(111, 83, 214, 0.18);
    --ll-edge-bright: rgba(255, 255, 255, 0.86);
    --ll-shadow: rgba(54, 36, 116, 0.18);
    --ll-shadow-strong: rgba(54, 36, 116, 0.3);
    --ll-contact: rgba(49, 28, 104, 0.2);
    --ll-text: #2d2059;
    --ll-orb-1: #d8cbff;
    --ll-orb-2: #a98cff;
    --ll-orb-3: #7650f2;
    --ll-orb-4: #3f18ad;
    --ll-orb-deep: #251064;
    --ll-glow: rgba(144, 112, 255, 0.42);
    --ll-bubble: rgba(255, 255, 255, 0.94);
    --ll-bubble-soft: rgba(255, 255, 255, 0.42);
    --ll-focus: rgba(133, 107, 255, 0.34);
    display: inline-block;
    perspective: 72em;
    transform-style: preserve-3d;
  }

  /* Main pill shell */
  .liquid-loader__shell {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.95em;
    min-width: 12.2em;
    min-height: 4.7em;
    padding: 0.9em 1.2em;
    border-radius: 999em;
    border: 0.08em solid var(--ll-edge);
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.5) 18%,
        transparent 42%
      ),
      radial-gradient(
        ellipse at 22% 8%,
        rgba(255, 255, 255, 0.92) 0%,
        rgba(255, 255, 255, 0.38) 24%,
        transparent 48%
      ),
      linear-gradient(
        165deg,
        var(--ll-bg-1) 0%,
        var(--ll-bg-2) 54%,
        var(--ll-bg-3) 100%
      );
    box-shadow:
      0 1.45em 2.8em var(--ll-shadow),
      0 0.65em 0.85em -0.65em var(--ll-contact),
      inset 0 0.16em 0.22em var(--ll-edge-bright),
      inset 0 -0.58em 1.05em rgba(91, 60, 188, 0.16),
      inset 0 -0.12em 0.16em rgba(54, 28, 132, 0.12),
      inset 0 0 0 0.055em rgba(255, 255, 255, 0.5);
    /* Declared, and computed "flat", because of the overflow below. */
    transform-style: preserve-3d;
    transform: rotateX(0deg) rotateY(0deg) translateZ(0);
    translate: 0 0;
    overflow: hidden;
    cursor: default;
    outline: none;
    user-select: none;
    transition:
      transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 260ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 260ms ease;
    animation: ll-shell-float 4s ease-in-out infinite;
  }

  /* Moving premium glass sweep across shell */
  .liquid-loader__shell::before {
    content: "";
    position: absolute;
    inset: 0.18em;
    border-radius: inherit;
    background: linear-gradient(
      115deg,
      transparent 0%,
      transparent 18%,
      rgba(255, 255, 255, 0.78) 28%,
      rgba(255, 255, 255, 0.22) 39%,
      transparent 58%
    );
    transform: translateX(-135%) skewX(-8deg);
    pointer-events: none;
    z-index: 3;
    animation: ll-shell-sheen 4.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }

  /* Lower-right internal glow / 3D weight */
  .liquid-loader__shell::after {
    content: "";
    position: absolute;
    width: 5em;
    height: 5em;
    right: -1.75em;
    bottom: -1.95em;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(144, 112, 255, 0.42) 0%,
      rgba(144, 112, 255, 0.18) 34%,
      transparent 72%
    );
    filter: blur(0.28em);
    pointer-events: none;
    z-index: 0;
  }

  /* Accessible focus ring -- kept, and never matched: nothing here is focusable,
     and a loader in the tab order would be the worse component. */
  .liquid-loader:focus-visible .liquid-loader__shell,
  .liquid-loader__shell:focus-visible {
    box-shadow:
      0 1.45em 2.8em var(--ll-shadow),
      0 0 0 0.24em var(--ll-focus),
      inset 0 0.16em 0.22em var(--ll-edge-bright),
      inset 0 -0.58em 1.05em rgba(91, 60, 188, 0.16),
      inset 0 0 0 0.055em rgba(255, 255, 255, 0.5);
  }

  /* Hover adds physical tilt */
  .liquid-loader:hover .liquid-loader__shell {
    transform: rotateX(6deg) rotateY(-4deg) translateZ(0.3em);
    border-color: rgba(111, 83, 214, 0.24);
    box-shadow:
      0 1.75em 3.2em var(--ll-shadow-strong),
      0 0.8em 1em -0.65em var(--ll-contact),
      inset 0 0.18em 0.26em rgba(255, 255, 255, 0.92),
      inset 0 -0.68em 1.2em rgba(91, 60, 188, 0.19),
      inset 0 -0.12em 0.16em rgba(54, 28, 132, 0.14),
      inset 0 0 0 0.055em rgba(255, 255, 255, 0.58);
  }

  /* Pressed state feels like soft silicone */
  .liquid-loader:active .liquid-loader__shell {
    transform: rotateX(2deg) rotateY(-1deg) translateZ(0) scale(0.985);
  }

  /* Main liquid glass orb */
  .liquid-loader__orb {
    position: relative;
    width: 2.55em;
    height: 2.55em;
    flex: 0 0 auto;
    border-radius: 50%;
    overflow: hidden;
    isolation: isolate;
    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.52) 0%,
        rgba(255, 255, 255, 0.16) 24%,
        transparent 42%
      ),
      radial-gradient(
        ellipse at 42% 28%,
        var(--ll-orb-1) 0%,
        var(--ll-orb-2) 30%,
        var(--ll-orb-3) 64%,
        var(--ll-orb-4) 86%,
        var(--ll-orb-deep) 100%
      );
    box-shadow:
      0 0.72em 1.2em rgba(72, 38, 184, 0.34),
      0 0 1.25em rgba(137, 104, 255, 0.28),
      inset 0 0.16em 0.22em rgba(255, 255, 255, 0.58),
      inset -0.22em -0.36em 0.56em rgba(31, 10, 100, 0.44),
      inset 0.16em 0.18em 0.28em rgba(255, 255, 255, 0.2),
      inset 0 0 0 0.075em rgba(255, 255, 255, 0.18);
    transform-style: preserve-3d;
    transform: translateZ(0.6em);
    animation:
      ll-orb-float 2.8s cubic-bezier(0.37, 0, 0.22, 1) infinite,
      ll-orb-wobble 4.8s ease-in-out infinite;
  }

  /* Internal liquid lens, not a static shine dot */
  .liquid-loader__orb::before {
    content: "";
    position: absolute;
    inset: 0.12em;
    border-radius: inherit;
    background: linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.28) 0%,
      transparent 34%,
      rgba(46, 14, 137, 0.16) 74%,
      rgba(13, 4, 55, 0.28) 100%
    );
    mix-blend-mode: screen;
    pointer-events: none;
    z-index: 3;
  }

  /* Soft liquid surface curve */
  .liquid-loader__orb::after {
    content: "";
    position: absolute;
    left: -18%;
    top: 13%;
    width: 136%;
    height: 64%;
    border-radius: 48% 52% 54% 46% / 42% 44% 56% 58%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0.08) 42%,
      transparent 72%
    );
    transform: rotate(-8deg);
    filter: blur(0.025em);
    pointer-events: none;
    z-index: 2;
    animation: ll-liquid-surface 3.4s ease-in-out infinite;
  }

  /* Label styling */
  .liquid-loader__label {
    position: relative;
    z-index: 4;
    color: var(--ll-text);
    font:
      700 0.96em/1.2 system-ui,
      sans-serif;
    letter-spacing: 0.03em;
    text-shadow:
      0 0.06em 0 rgba(255, 255, 255, 0.78),
      0 0.22em 0.55em rgba(67, 42, 138, 0.12);
  }

  .liquid-loader__label::after {
    content: "";
    display: inline-block;
    width: 1.25em;
    text-align: left;
    animation: ll-ellipsis 1.35s steps(4, end) infinite;
  }

  /* Rising bubbles inside orb */
  .liquid-loader__bubble {
    position: absolute;
    bottom: -0.42em;
    border-radius: 50%;
    background: radial-gradient(
      circle at 34% 28%,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.82) 28%,
      var(--ll-bubble-soft) 48%,
      rgba(255, 255, 255, 0.08) 100%
    );
    box-shadow:
      inset 0 0.05em 0.12em rgba(255, 255, 255, 0.72),
      inset -0.04em -0.06em 0.1em rgba(112, 72, 220, 0.18),
      0 0.08em 0.18em rgba(39, 18, 112, 0.18);
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.7);
    filter: blur(0.002em);
    will-change: transform, opacity, filter;
    z-index: 4;
  }

  .liquid-loader__bubble--1 {
    left: 0.34em;
    width: 0.34em;
    height: 0.34em;
    animation: ll-bubble-rise-1 2s cubic-bezier(0.2, 0.86, 0.22, 1) infinite;
  }

  .liquid-loader__bubble--2 {
    left: 0.78em;
    width: 0.25em;
    height: 0.25em;
    animation: ll-bubble-rise-2 2.28s cubic-bezier(0.2, 0.86, 0.22, 1) 0.22s
      infinite;
  }

  .liquid-loader__bubble--3 {
    left: 1.1em;
    width: 0.4em;
    height: 0.4em;
    animation: ll-bubble-rise-3 2.42s cubic-bezier(0.2, 0.86, 0.22, 1) 0.48s
      infinite;
  }

  .liquid-loader__bubble--4 {
    left: 1.48em;
    width: 0.22em;
    height: 0.22em;
    animation: ll-bubble-rise-4 1.88s cubic-bezier(0.2, 0.86, 0.22, 1) 0.34s
      infinite;
  }

  .liquid-loader__bubble--5 {
    left: 1.72em;
    width: 0.3em;
    height: 0.3em;
    animation: ll-bubble-rise-5 2.56s cubic-bezier(0.2, 0.86, 0.22, 1) 0.72s
      infinite;
  }

  .liquid-loader__bubble--6 {
    left: 0.56em;
    width: 0.18em;
    height: 0.18em;
    animation: ll-bubble-rise-6 1.72s cubic-bezier(0.2, 0.86, 0.22, 1) 0.92s
      infinite;
  }

  /* Shell floating uses translate, so hover transform still works */
  @keyframes ll-shell-float {
    0%,
    100% {
      translate: 0 0;
    }
    50% {
      translate: 0 -0.07em;
    }
  }

  @keyframes ll-shell-sheen {
    0%,
    18% {
      transform: translateX(-135%) skewX(-8deg);
    }
    54%,
    100% {
      transform: translateX(132%) skewX(-8deg);
    }
  }

  @keyframes ll-orb-float {
    0%,
    100% {
      translate: 0 0;
      scale: 1;
    }
    50% {
      translate: 0 -0.07em;
      scale: 1.035;
    }
  }

  /* Organic liquid shape */
  @keyframes ll-orb-wobble {
    0%,
    100% {
      border-radius: 50% 50% 48% 52% / 49% 51% 49% 51%;
    }
    25% {
      border-radius: 53% 47% 50% 50% / 47% 53% 48% 52%;
    }
    50% {
      border-radius: 49% 51% 54% 46% / 50% 48% 52% 50%;
    }
    75% {
      border-radius: 51% 49% 47% 53% / 52% 50% 50% 48%;
    }
  }

  /* Moving liquid surface inside the orb */
  @keyframes ll-liquid-surface {
    0%,
    100% {
      transform: translateY(0) rotate(-8deg) scaleX(1);
      opacity: 0.72;
    }
    50% {
      transform: translateY(0.08em) rotate(-3deg) scaleX(1.06);
      opacity: 0.92;
    }
  }

  /* Smoother bubble motion with slight depth blur */
  @keyframes ll-bubble-rise-1 {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.55);
      filter: blur(0.018em);
    }
    14% {
      opacity: 0.92;
    }
    62% {
      opacity: 0.96;
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0.13em, -2.2em, 0) scale(1.08);
      filter: blur(0.035em);
    }
  }

  @keyframes ll-bubble-rise-2 {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.5);
      filter: blur(0.018em);
    }
    18% {
      opacity: 0.84;
    }
    68% {
      opacity: 0.92;
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(-0.13em, -2.04em, 0) scale(0.96);
      filter: blur(0.032em);
    }
  }

  @keyframes ll-bubble-rise-3 {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.62);
      filter: blur(0.018em);
    }
    15% {
      opacity: 0.95;
    }
    66% {
      opacity: 0.98;
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0.1em, -2.25em, 0) scale(1.12);
      filter: blur(0.04em);
    }
  }

  @keyframes ll-bubble-rise-4 {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.45);
      filter: blur(0.018em);
    }
    16% {
      opacity: 0.82;
    }
    70% {
      opacity: 0.88;
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(-0.08em, -1.92em, 0) scale(0.92);
      filter: blur(0.03em);
    }
  }

  @keyframes ll-bubble-rise-5 {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.58);
      filter: blur(0.018em);
    }
    14% {
      opacity: 0.88;
    }
    64% {
      opacity: 0.95;
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(-0.16em, -2.3em, 0) scale(1.04);
      filter: blur(0.038em);
    }
  }

  @keyframes ll-bubble-rise-6 {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.4);
      filter: blur(0.018em);
    }
    20% {
      opacity: 0.8;
    }
    68% {
      opacity: 0.85;
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0.14em, -1.9em, 0) scale(0.84);
      filter: blur(0.03em);
    }
  }

  /* content, stepped four ways. Not animatable per spec; Chromium does it. */
  @keyframes ll-ellipsis {
    0% {
      content: "";
    }
    25% {
      content: ".";
    }
    50% {
      content: "..";
    }
    75%,
    100% {
      content: "...";
    }
  }

  /* Motion safety -- the upload's own, and the same technique as tokens.css:326 */
  @media (prefers-reduced-motion: reduce) {
    .liquid-loader__shell,
    .liquid-loader__shell::before,
    .liquid-loader__orb,
    .liquid-loader__orb::after,
    .liquid-loader__bubble,
    .liquid-loader__label::after {
      animation-duration: 0.01ms;
      animation-iteration-count: 1;
    }
  }
`;

export default LiquidGlassLoader;
