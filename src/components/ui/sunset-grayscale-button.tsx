/* Fifty-three paths, and I was wrong about them.

   THE VERDICT THAT HAD TO BE WITHDRAWN. This file sat unimplemented for five waves
   on a position stated in this log: "fifty-three paths cannot be inferred; drawing
   them is painting a new picture, not implementing one." That was written from a
   glance at the selector `path:nth-child(53)` and it does not survive reading the
   rest. The CSS names SIX individual indices and two ranges, and it says what each
   one IS:

     1   dark silhouette, swayLeft,  transform-origin 15% 100%   -> the left palm
     2   dark silhouette, swayRight, transform-origin 85% 100%   -> the right palm
     3   sunPulse, and translateY(-2px) on hover                 -> the sun
     16  dark silhouette, no animation                           -> a hill
     45  dark silhouette, in the n+30 range, odd -> waveBob      -> a pier post
     53  same, and the highest index named -> there are 53       -> a pier post
     n+30            fill oklch(74% 0.22 58), even/odd waveBob   -> water
     everything else fill oklch(88% 0.18 80)                     -> sky lines

   So the count is stated, every role is stated, and what is left over is two
   homogeneous families -- twenty-five sky lines and twenty-two water lines. That is
   an implementation, not a painting. The comment in the upload even names the
   families out loud: "Palm trees, hills, pier paths", "Sun, clouds, sky lines",
   "Water reflection / wave highlights".

   `transform-origin: 15% 100%` CONFIRMS THE READING. Percentages on an SVG element
   resolve against `transform-box: view-box` by default, so 15%/85% of the viewBox
   width is where the two palms stand -- left edge and right edge -- and 100% of its
   height is their base. The origin is not decoration; it is the author telling us
   where the trees are.

   SEVEN CUSTOM PROPERTIES DECLARED AND NEVER READ. `:root` declares `--bg`,
   `--text`, `--accent`, `--accent-strong`, `--danger` and `--secondary`, and
   `.real-button` declares `--ambient` with a `color-mix()`. All seven are read zero
   times. A record for this log, and `--bg` in particular is a name this repo's own
   host declares, which is why it is not carried onto an inheriting selector here.

   AND SIX MORE EATEN DESCRIPTORS. Every one of the six `@property` rules arrived as
   `syntax: ""`, the same conversion loss as wave 14 -- and here it is not a
   nicety, it is the whole button. None of the six properties is declared anywhere
   in the base state: `--tilt` is declared NOWHERE outside its own registration, and
   `--lift`, `--glow`, `--sheen`, `--scan` and `--halo` appear only inside `:hover`,
   `:active` and keyframes. So at rest all six values come from `initial-value`,
   which only applies if the registration is valid -- and if it is not, every
   declaration that reads them at rest is invalid at computed-value time:

     the transform      translateY(calc(var(--lift) * -3px)) ...   dropped
     ::before           conic-gradient(from var(--tilt), ...)      dropped, no halo
     ::after            color-mix(... var(--sheen) ...)            dropped, no sheen
     the transition     --tilt, --lift, --glow, --sheen            not interpolable

   The resting appearance of this button collapses without the descriptors. They are
   restored from their own initial values, which fix them individually: `<angle>` for
   `--tilt` at 135deg, `<number>` for `--lift` at 0, and `<percentage>` for the four
   at 35%, 18%, -30% and 40%. Measured with them in place -- all six resolve at rest
   while an unregistered control name reads back as the empty string:

     --tilt 135deg  --lift 0  --glow 35%  --sheen 18%  --scan -30%  --halo 40%

   And measured with `--tilt` taken away, which is the whole point:

     ::before background-image   conic-gradient(from 135deg, ...)   with it
     ::before background-image   none                               without it

   One unresolved name and the halo does not exist.

   ONE OF THEM IS BROKEN EITHER WAY, AND THAT ONE IS THE AUTHOR'S.
   `background-position: ..., calc(var(--scan) * 1%) 0, ...` with `--scan: -30%`.
   A percentage times a percentage is not valid arithmetic, so `calc(-30% * 1%)` is
   invalid -- and `--scan` cannot be a `<number>` instead, because `-30%` would then
   be an invalid initial value and the registration would fail. Whichever way it is
   registered, that one declaration falls, and with it all three background-position
   layers revert to `0% 0%`. Since the first and third layers want exactly that, the
   only visible loss is the scan sweep. Recorded, kept, and the remedy is one
   character: `calc(var(--scan) * 1)`.

   A PSEUDO-ELEMENT THAT ONLY EXISTS IN A MEDIA QUERY. `.scene::before` appears
   exactly once in the whole file -- a grep of every selector confirms it -- inside
   `@media (prefers-reduced-motion: reduce)`, setting `opacity: 0.35`. Nothing
   anywhere declares `content` for it, so the override has nothing to override.
   Whatever it was meant to fade is not in the file that arrived.

   THE BUTTON IS GREY UNTIL YOU TOUCH IT. `filter: grayscale(100%) brightness(0.9)`
   in the base rule, `grayscale(0%) saturate(1.12) brightness(1.04)` on hover, over
   `1200ms cubic-bezier(0.65, 0, 0.35, 1)` -- the slowest transition in this whole
   log, and the only one where the entire palette is the thing being transitioned.
   Measured: `grayscale(1) brightness(0.9)` at rest, and a seven-item transition
   duration list ending in 1.2s.
   The sunset exists at rest and has no colour.

   That `filter` also does structural work: a filter other than `none` establishes a
   stacking context, which is what keeps `::before` at `z-index: -2` inside the
   button. Four different properties have now done that job in this log -- isolation,
   perspective, translate, and now filter -- and only one of them was written for it.

   TWO ADDITIONS. `type="button"`, and `aria-hidden` on the art. The upload writes
   its own `:focus-visible` with a real two-ring box-shadow, so nothing was needed
   there -- the third upload in this log to do that unprompted. */
import styled from 'styled-components';

/* The sunset, indexed. Every role below is the CSS's, not this file's: see the
   table at the top. The two families -- sky lines and water lines -- are the only
   thing left to distribute, and their counts follow from the six named indices. */
const PALM = (x: number) =>
  `M${x - 2} 42 L${x + 2} 42 L${x + 1} 16 L${x - 1} 16 Z` +
  ` M${x} 16 L${x - 16} 10 L${x - 12} 18 Z` +
  ` M${x} 16 L${x - 14} 22 L${x - 8} 24 Z` +
  ` M${x} 16 L${x + 16} 10 L${x + 12} 18 Z` +
  ` M${x} 16 L${x + 14} 22 L${x + 8} 24 Z` +
  ` M${x} 16 L${x} 4 L${x + 4} 12 Z`;

const band = (y: number, h: number) => `M0 ${y} H230 V${y + h} H0 Z`;
const post = (x: number) => `M${x} 38 L${x + 2.5} 38 L${x + 2.5} 70 L${x} 70 Z`;

const SKY = Array.from({ length: 25 }, (_, i) => band(4 + i * 0.92, 0.55));
const WATER = Array.from({ length: 22 }, (_, i) => band(42 + i * 1.3, 0.7));

const PATHS = [
  PALM(30),                        // 1
  PALM(200),                       // 2
  'M115 12 A10 10 0 1 0 115 32 A10 10 0 1 0 115 12 Z', // 3, the sun
  ...SKY.slice(0, 12),             // 4-15
  'M0 40 L40 32 L70 36 L110 30 L150 35 L190 31 L230 38 L230 42 L0 42 Z', // 16, hill
  ...SKY.slice(12),                // 17-29
  ...WATER.slice(0, 15),           // 30-44
  post(60),                        // 45
  ...WATER.slice(15),              // 46-52
  post(170),                       // 53
];

export const SunsetGrayscaleButton = ({ label = 'Click me' }: { label?: string }) => (
  <StyledWrapper>
    <div className="scene">
      <button className="real-button" type="button">
        <svg className="real-button__art" viewBox="0 0 230 72" preserveAspectRatio="none" aria-hidden="true">
          {PATHS.map((d, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <path key={i} d={d} />
          ))}
        </svg>
        <span className="real-button__label">{label}</span>
      </button>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  /* Six descriptors, each fixed by its own initial value. Delivered as "" -- see
     the note at the top of the file for why that cannot be what was written. */
  @property --tilt {
    syntax: "<angle>";
    inherits: false;
    initial-value: 135deg;
  }
  @property --lift {
    syntax: "<number>";
    inherits: false;
    initial-value: 0;
  }
  @property --glow {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 35%;
  }
  @property --sheen {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 18%;
  }
  @property --scan {
    syntax: "<percentage>";
    inherits: false;
    initial-value: -30%;
  }
  @property --halo {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 40%;
  }

  /* The upload's :root block. All six colours are declared and read zero times, so
     they stay in the component's own scope rather than on an inheriting selector --
     "--bg" is a name this repo's host declares. */
  color-scheme: dark;

  .scene {
    box-sizing: border-box;
    min-height: 400px;
    display: grid;
    place-items: center;
    position: relative;
    isolation: isolate;
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    --bg: oklch(73.173% 0.15447 47.234);
    --text: oklch(97% 0.01 250);
    --accent: oklch(72% 0.18 46);
    --accent-strong: oklch(66% 0.22 42);
    --danger: oklch(68% 0.2 28);
    --secondary: oklch(80% 0.04 260);
  }

  .scene *,
  .scene *::before,
  .scene *::after {
    box-sizing: border-box;
  }

  .real-button {
    --button-base: oklch(72% 0.24 60);
    --button-edge: oklch(56% 0.26 38);
    --button-text: oklch(98% 0.01 250);
    /* Declared and read zero times. */
    --ambient: color-mix(in oklab, var(--button-base) 24%, black);
    position: relative;
    overflow: hidden;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-width: 230px;
    min-height: 72px;
    padding: 10px 24px;
    border: 1px solid
      color-mix(in oklab, var(--button-edge) 75%, oklch(25% 0.1 270));
    border-radius: 20px;
    color: var(--button-text);
    background: linear-gradient(
      180deg,
      oklch(80% 0.22 72) 0%,
      /* bright golden-amber top */ oklch(72% 0.26 58) 45%,
      /* rich warm orange middle */ oklch(54% 0.26 36) 100%
        /* deep red-orange at the bottom */
    );
    box-shadow:
      0 1px 0 color-mix(in oklab, white 24%, transparent) inset,
      0 -1px 0 color-mix(in oklab, black 32%, transparent) inset,
      0 10px 20px color-mix(in oklab, black 30%, transparent);
    cursor: pointer;
    text-align: center;
    transform: translateY(calc(var(--lift) * -3px)) perspective(900px)
      rotateX(calc(var(--lift) * 1.6deg)) rotateZ(-0.1deg);
    transform-style: preserve-3d;
    /* Grey until hovered, and 1200ms is the slowest transition in this log. */
    filter: grayscale(100%) brightness(0.9);
    transition:
      --tilt 400ms ease,
      --lift 200ms ease,
      --glow 300ms ease,
      --sheen 300ms ease,
      transform 200ms ease,
      box-shadow 200ms ease,
      filter 1200ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  .real-button__art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.95;
    filter: saturate(1.2) contrast(1.1);
    pointer-events: none;
    z-index: 1;
  }

  /* Individual sunset SVG landscape elements */
  /* 1. Palm trees, hills, pier paths -> dark silhouette */
  .real-button__art path:nth-child(1),
  .real-button__art path:nth-child(2),
  .real-button__art path:nth-child(16),
  .real-button__art path:nth-child(45),
  .real-button__art path:nth-child(53) {
    fill: oklch(14% 0.04 35) !important;
  }

  /* 2. Sun, clouds, sky lines (default/top) -> glowing golden yellow */
  .real-button__art path {
    fill: oklch(88% 0.18 80);
  }

  /* 3. Water reflection / wave highlights -> rich sunset orange/gold */
  .real-button__art path:nth-child(n + 30) {
    fill: oklch(74% 0.22 58);
  }

  /* --- Sunset Landscape Animations (Pure CSS) --- */
  /* Swaying palm trees */
  @keyframes swayLeft {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-1.5deg);
    }
  }

  @keyframes swayRight {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(1.5deg);
    }
  }

  /* transform-box defaults to view-box on SVG, so 15%/85% of the viewBox width is
     where the two trees stand. */
  .real-button__art path:nth-child(1) {
    transform-origin: 15% 100%;
    animation: swayLeft 6s ease-in-out infinite alternate;
  }

  .real-button__art path:nth-child(2) {
    transform-origin: 85% 100%;
    animation: swayRight 7s ease-in-out infinite alternate;
  }

  /* Hover swayed palm trees (sway faster/more when hovered!) */
  .real-button:hover .real-button__art path:nth-child(1) {
    animation: swayLeft 3s ease-in-out infinite alternate;
  }

  .real-button:hover .real-button__art path:nth-child(2) {
    animation: swayRight 3.2s ease-in-out infinite alternate;
  }

  /* Bobbing water waves */
  @keyframes waveBob {
    0%,
    100% {
      transform: translateY(0) scaleY(1);
    }
    50% {
      transform: translateY(1.5px) scaleY(0.96);
    }
  }

  .real-button__art path:nth-child(n + 30):nth-child(even) {
    transform-origin: center bottom;
    animation: waveBob 4s ease-in-out infinite alternate;
    animation-delay: -1s;
  }

  .real-button__art path:nth-child(n + 30):nth-child(odd) {
    transform-origin: center bottom;
    animation: waveBob 3.2s ease-in-out infinite alternate;
    animation-delay: -2.5s;
  }

  /* Bob waves faster on hover */
  .real-button:hover .real-button__art path:nth-child(n + 30):nth-child(even) {
    animation: waveBob 2s ease-in-out infinite alternate;
  }

  .real-button:hover .real-button__art path:nth-child(n + 30):nth-child(odd) {
    animation: waveBob 1.6s ease-in-out infinite alternate;
  }

  /* Glowing/pulsing sun and sun position transition */
  @keyframes sunPulse {
    0%,
    100% {
      filter: drop-shadow(0 0 1px rgba(255, 235, 59, 0.3));
    }
    50% {
      filter: drop-shadow(0 0 8px rgba(255, 235, 59, 0.7));
    }
  }

  .real-button__art path:nth-child(3) {
    animation: sunPulse 4.5s ease-in-out infinite;
    transition: transform 600ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .real-button:hover .real-button__art path:nth-child(3) {
    transform: translateY(-2px);
  }

  .real-button__label {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 22px;
    border-radius: 999px;
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: #ffffff;
    background: rgba(
      12,
      8,
      12,
      0.45
    ); /* slightly dark container by default for readability */
    backdrop-filter: blur(5px) saturate(1.2); /* blur by default to keep text legible */
    -webkit-backdrop-filter: blur(5px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.75);
    transition:
      backdrop-filter 350ms cubic-bezier(0.25, 0.8, 0.25, 1),
      -webkit-backdrop-filter 350ms cubic-bezier(0.25, 0.8, 0.25, 1),
      background 350ms cubic-bezier(0.25, 0.8, 0.25, 1),
      border-color 350ms cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 350ms cubic-bezier(0.25, 0.8, 0.25, 1),
      transform 350ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .real-button:hover .real-button__label {
    background: rgba(8, 4, 8, 0.72); /* darkens on hover to isolate text */
    backdrop-filter: blur(12px) saturate(1.4); /* blur deepens on hover */
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  }

  .real-button::before,
  .real-button::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  .real-button::before {
    inset: -14px;
    background: conic-gradient(
        from var(--tilt),
        transparent 0 12%,
        color-mix(in oklab, white 12%, transparent) 18%,
        color-mix(in oklab, var(--button-base) 38%, transparent) 26%,
        transparent 38% 100%
      ),
      radial-gradient(
        circle at center,
        color-mix(in oklab, var(--button-base) var(--halo), transparent),
        transparent 68%
      );
    filter: blur(16px);
    transform: translateY(calc(1px + var(--lift) * -3px)) scale(0.95);
    z-index: -2;
    opacity: 0.56;
  }

  .real-button::after {
    background: linear-gradient(
        180deg,
        color-mix(in oklab, white 18%, transparent),
        transparent 34%
      ),
      linear-gradient(
        115deg,
        transparent 0 28%,
        color-mix(in oklab, white var(--sheen), transparent) 44%,
        transparent 60% 100%
      ),
      radial-gradient(
        circle at 50% 0%,
        color-mix(in oklab, white var(--glow), transparent),
        transparent 40%
      );
    /* A percentage times a percentage: invalid, and the author's, not the
       conversion's. All three layer positions fall back to 0% 0%. */
    background-position:
      0 0,
      calc(var(--scan) * 1%) 0,
      0 0;
    background-size:
      100% 100%,
      220% 100%,
      100% 100%;
    mix-blend-mode: screen;
    opacity: 0.9;
    mask: linear-gradient(180deg, black, black 58%, transparent);
  }

  .real-button:hover {
    --lift: 1;
    --glow: 62%;
    --sheen: 34%;
    --halo: 58%;
    filter: grayscale(0%) saturate(1.12) brightness(1.04);
    box-shadow:
      0 1px 0 color-mix(in oklab, white 20%, transparent) inset,
      0 -1px 0 color-mix(in oklab, black 22%, transparent) inset,
      0 12px 22px color-mix(in oklab, black 30%, transparent),
      0 0 16px color-mix(in oklab, var(--button-base) 22%, transparent);
  }

  .real-button:hover::before {
    animation:
      haloSpin 1.7s linear infinite,
      haloPulse 1.3s ease-in-out infinite;
  }

  .real-button:hover::after {
    animation:
      scanSweep 0.9s ease-in-out infinite,
      shimmer 1.1s ease-in-out infinite;
  }

  .real-button:active {
    --lift: 0.15;
    --glow: 28%;
    --sheen: 12%;
    transform: translateY(3px) perspective(900px) rotateX(0deg) scale(0.985);
    box-shadow:
      0 1px 0 color-mix(in oklab, white 12%, transparent) inset,
      0 -1px 0 color-mix(in oklab, black 34%, transparent) inset,
      0 7px 14px color-mix(in oklab, black 20%, transparent),
      0 0 12px color-mix(in oklab, var(--button-base) 18%, transparent);
  }

  /* The upload's own, and a real one. Third file here to write it unprompted. */
  .real-button:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 4px color-mix(in oklab, white 20%, transparent),
      0 0 0 8px color-mix(in oklab, var(--button-base) 24%, transparent),
      0 1px 0 color-mix(in oklab, white 18%, transparent) inset,
      0 -1px 0 color-mix(in oklab, black 28%, transparent) inset,
      0 12px 22px color-mix(in oklab, black 24%, transparent),
      0 0 14px color-mix(in oklab, var(--button-base) 18%, transparent);
  }

  @keyframes haloPulse {
    0%,
    100% {
      --glow: 30%;
      --halo: 40%;
    }
    50% {
      --glow: 44%;
      --halo: 55%;
    }
  }

  @keyframes shimmer {
    0%,
    100% {
      opacity: 0.82;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes haloSpin {
    from {
      transform: translateY(calc(2px + var(--lift) * -5px)) scale(0.96)
        rotate(0deg);
    }
    to {
      transform: translateY(calc(2px + var(--lift) * -5px)) scale(0.96)
        rotate(360deg);
    }
  }

  @keyframes scanSweep {
    0%,
    100% {
      --scan: -30%;
    }
    50% {
      --scan: 30%;
    }
  }

  @media (max-width: 720px) {
    .real-button {
      min-width: min(92%, 240px);
      min-height: 70px;
      padding: 8px 20px;
    }
    .real-button__label {
      font-size: 1.05rem;
      padding: 6px 18px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .real-button {
      transition-duration: 0.01ms;
    }
    .real-button::before,
    .real-button::after {
      animation: none;
    }
    /* No base rule anywhere in the file, so no content and no box to fade. */
    .scene::before {
      opacity: 0.35;
    }
  }
`;

export default SunsetGrayscaleButton;
