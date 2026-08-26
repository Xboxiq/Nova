/* Sixteen filters cycled by one keyframe list, two spans per letter, and a
   variable read in a keyframe and declared nowhere.

   THE ELECTRIC BORDER IS SIXTEEN FILTERS, NOT ONE ANIMATED FILTER.
   `@keyframes turbulentSwap` steps `filter: url(#turbulent-displace-N)` from 0 to
   15 at exactly 6.25% intervals -- sixteen times 6.25 is 100 -- and returns to 0.
   `filter` is not smoothly interpolable between two `url()` references, so this is
   a flip-book: sixteen discrete displacement maps shown in order over 1.5s, about
   93ms each. Animating one filter's `seed` attribute would need SMIL or script;
   sixteen filters and a keyframe list need neither.

   The filters are inferred, and the CSS says a great deal about what they are:
   there are exactly sixteen, they differ only by index, they are applied to a box
   whose only paint is `border: 2px solid white`, and the result is called
   turbulent displacement. That is `feTurbulence` into `feDisplacementMap`, with the
   seed as the only thing that changes. The octave count here is deliberately low --
   the classic version of this effect uses ten, which is sixteen ten-octave noise
   fields being re-rasterised on a page that already runs forty animations.

   The ids are literal, so two of these on one page duplicate sixteen ids each.
   Declared, not silently renamed -- the same call as the sky toggle in wave 9 --
   and the showcase carries one.

   `--d` IS READ AND NEVER DECLARED. `@keyframes particleMove` opens with
   `transform: translateX(var(--d)) rotate(-45deg) skew(0deg, 0deg) scale(var(--f))`
   and nothing in the file declares `--d`. An undeclared name inside a `var()` makes
   the whole declaration invalid at computed-value time, so the 0% keyframe has NO
   transform at all -- the particles do not fly in from `--d`, they appear at their
   final position and only the opacity animates. `--t` is read as `var(--t, 0)` with
   a fallback, so the author was thinking about this exact failure one line earlier.

   Proven by supplying it. With `--d` undeclared the particle's `::before` paints
   with no translation component at all; with `--d: 40px` forced in, the same frame
   carries `matrix(0.468877, -0.379651, 0.468877, 0.379651, 34.6642, 0)` -- a 34.66px
   shift and a different skew. The two differ, so the keyframe's transform is only in
   force when `--d` resolves, and in the upload it never does.

   Kept as written; the particle count is inferred, since the CSS asks the markup for
   `--x`, `--y`, `--a`, `--t` and `--f` per particle and never says how many.

   ONE STRAY COMMA MAKES THE BUTTON TRANSITION EVERYTHING. `.button` writes
   `transition: background-color, 0.5s linear, box-shadow 0.5s ease, transform 0.5s
   ease`. The comma after `background-color` ends the first item, so item two is
   `0.5s linear` with no property named -- which means `all`. Measured:

     transition-property   background-color, all, box-shadow, transform
     transition-duration   0s, 0.5s, 0.5s, 0.5s

   So the one property the author named first is the only one that does NOT
   transition, and every other property on the element does, over half a second. It
   surfaced by accident: the focus ring added below read back as 2px of a 3px outline
   in a part-way colour, because `all` was interpolating the outline too.

   TWO SPANS PER LETTER, FOR TWO ANIMATIONS THAT MUST NOT COLLIDE.
   `.text p.state-1 > span` runs `appear`, and `.text span > span` runs `waveText`.
   One element cannot hold both, because the two rules each set the whole
   `animation` shorthand and the more specific one would win outright -- so every
   character is an outer span that arrives and an inner span that waves. The wave
   also uses a NEGATIVE delay, `calc(var(--i) * -0.13s)`, which starts each letter
   mid-cycle rather than making it wait: the ripple is already in progress on the
   first frame. And it is `animation-play-state: paused` at rest, running on hover,
   so the ripple keeps its phase between hovers.

   THE WORD GAP MOVES BETWEEN STATES.
   `.area .state-1 span:nth-child(3), .area .state-2 span:nth-child(5)` both get
   `margin-right: 10px`. "GetStarted" breaks after three characters and
   "Let'sCook!" after five, so unlike the join button in wave 12 -- where one
   `nth-child(5)` served both labels because they happened to break in the same
   place -- this file needs two different indices and writes them.

   A CHECKBOX WITH NO `display: none`. `.area input { opacity: 0; width: 0;
   height: 0 }` -- eight uploads in this log hid an input with `display: none`,
   which takes it out of the tab order entirely. This one does not: a 0x0 input at
   zero opacity is still focusable and still operable by keyboard, and it sits
   inside the `<label>` that wraps the whole control. That is the correct version of
   the pattern, arrived at by the upload.

   `.button` carries `pointer-events: none` and `.area` carries the cursor, so every
   click lands on the label and reaches the input. Nothing needed adding there.

   `stroke-dasharray: 0 173` WITH `stroke-dashoffset: 174`. A dash of zero and a gap
   of 173 draws nothing, which is the resting state, and the lap length is 173 --
   `pathLength=173`. `splashFeedback` animates to `10 110` with offset 80, so the
   dash pattern itself changes period mid-flight; that is what turns a ring into a
   scatter of ticks. Both `splashFeedback` and `splashFeedback2` have identical
   bodies and different names, used on the checked state and the base state.

   THREE ADDITIONS.

   `aria-label` on the input. Its name would otherwise be the concatenation of
   twenty single-character spans from both labels at once -- "GetStartedLet'sCook!"
   -- because the `<label>` wraps them both.

   The letter spans, the particles, the rainbow, the liquid and the svgs are
   `aria-hidden`, so the label's text is not read character by character.

   `outline: none` is on `.button`, which is not the focusable element -- the input
   is -- so the UA ring on the input survives. But the input is 0x0 at zero opacity,
   so that ring is invisible: a `:focus-visible` rule on the input draws the ring on
   the button instead, which is the element a keyboard user can actually see. */
import styled from 'styled-components';

const FILTERS = Array.from({ length: 16 }, (_, i) => i);

/* Inferred: sixteen displacement maps differing only by seed. Low octave count on
   purpose -- the usual ten would re-rasterise sixteen noise fields on a page that
   is already running dozens of animations. */
const Turbulence = () => (
  <svg className="svg-turbulence" width="0" height="0" aria-hidden="true">
    <defs>
      {FILTERS.map((i) => (
        <filter key={i} id={'turbulent-displace-' + i} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" seed={i * 7 + 3} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      ))}
    </defs>
  </svg>
);

/* Inferred count: the CSS asks the markup for --x, --y, --a, --t and --f per
   particle and never says how many. Twelve, spread deterministically. */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  x: (7 + i * 23) % 96 + '%',
  y: (11 + i * 37) % 92 + '%',
  a: (i * 61) % 360 + 'deg',
  t: (i % 5) * 0.2,
  f: 0.6 + ((i * 3) % 7) * 0.12,
}));

const Letters = ({ text, state }: { text: string; state: 1 | 2 }) => (
  <p className={'state-' + state} aria-hidden="true">
    {[...text].map((ch, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={i} style={{ ['--i' as string]: i }}>
        <span>{ch === ' ' ? '\u00a0' : ch}</span>
      </span>
    ))}
  </p>
);

export const ElectricCookButton = ({
  resting = 'GetStarted',
  checked = "Let'sCook!",
  name = 'Get Started',
}: { resting?: string; checked?: string; name?: string }) => (
  <StyledWrapper>
    <label className="area">
      <Turbulence />
      <input type="checkbox" aria-label={name} />
      <span className="area-button">
        {/* pathLength 173: a dash of 0 and a gap of 173 is one blank lap. */}
        <svg viewBox="0 0 120 120" width="180" height="180" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="55" pathLength={173} stroke="currentColor" />
        </svg>
        <span className="button">
          <span className="wrap">
            <span className="bg" />
            <span className="liquid">
              <span className="wave" />
            </span>
            <span className="reflex" />
            <span className="text">
              <Letters text={resting} state={1} />
              <Letters text={checked} state={2} />
            </span>
          </span>
          <span className="outline" />
        </span>
        <span className="rainbow" aria-hidden="true" />
        <span className="electric" aria-hidden="true" />
        <span className="glass" aria-hidden="true" />
        <span className="particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                ['--x' as string]: p.x,
                ['--y' as string]: p.y,
                ['--a' as string]: p.a,
                ['--t' as string]: p.t,
                ['--f' as string]: p.f,
              }}
            />
          ))}
        </span>
      </span>
    </label>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  /* stackblitz.com/edit/button-mastery-13 */
  /* Sixteen url() references at 6.25% apart: a flip-book, not an interpolation. */
  @keyframes turbulentSwap {
    0% { filter: url(#turbulent-displace-0); }
    6.25% { filter: url(#turbulent-displace-1); }
    12.5% { filter: url(#turbulent-displace-2); }
    18.75% { filter: url(#turbulent-displace-3); }
    25% { filter: url(#turbulent-displace-4); }
    31.25% { filter: url(#turbulent-displace-5); }
    37.5% { filter: url(#turbulent-displace-6); }
    43.75% { filter: url(#turbulent-displace-7); }
    50% { filter: url(#turbulent-displace-8); }
    56.25% { filter: url(#turbulent-displace-9); }
    62.5% { filter: url(#turbulent-displace-10); }
    68.75% { filter: url(#turbulent-displace-11); }
    75% { filter: url(#turbulent-displace-12); }
    81.25% { filter: url(#turbulent-displace-13); }
    87.5% { filter: url(#turbulent-displace-14); }
    93.75% { filter: url(#turbulent-displace-15); }
    100% { filter: url(#turbulent-displace-0); }
  }

  .area {
    --radius: 50px;
    perspective: 40px;
    cursor: pointer;
    user-select: none;
    /* Added: the upload's host gives this its box; the label needs one to
       position everything absolute inside it. */
    position: relative;
    display: inline-block;
    width: 290px;
    height: 80px;
  }

  .area > svg {
    position: absolute;
    pointer-events: none;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Not display: none -- 0x0 at zero opacity is still focusable. */
  .area input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* Added: the input is the focusable element and it has no visible box, so the
     ring is drawn on the button the user can see. */
  .area input:focus-visible + .area-button .button {
    outline: 3px solid #9a4df1;
    outline-offset: 4px;
  }

  .particles {
    --m: 1;
    position: absolute;
    inset: 0;
    z-index: 10;
    transition: opacity 0.5s ease;
    opacity: 0;
  }

  .particle {
    --f: 1;
    display: grid;
    position: absolute;
    left: var(--x);
    top: var(--y);
    rotate: var(--a);
    filter: blur(2px);
  }

  /* --d is read here and declared nowhere: this whole declaration is invalid at
     computed-value time, so the 0% keyframe carries no transform. */
  .particle::before {
    content: "";
    grid-area: 1/1;
    width: 15px;
    height: 3px;
    transform-origin: 0 0;
    mix-blend-mode: overlay;
    background: rgb(154, 77, 241);
    animation: particleMove calc(var(--m) * 0.5s) linear
      calc(var(--m) * var(--t, 0) * 1.2s) infinite;
    opacity: 0;
    transform: translateX(0) rotate(-45deg) skew(45deg, 45deg) scale(var(--f));
  }

  .rainbow {
    width: 100%;
    height: 130px;
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 0;
    right: 0;
    --stripes: repeating-linear-gradient(
      100deg,
      #fff 0%,
      #fff 7%,
      transparent 10%,
      transparent 12%,
      #fff 16%
    );
    --rainbow: repeating-linear-gradient(
      100deg,
      #60a5fa 10%,
      #f9799c 15%,
      #60a5fa 20%,
      #5eeabd 25%,
      #60a5fa 30%
    );
    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position:
      50% 50%,
      50% 50%;
    filter: invert(100%);
    mix-blend-mode: overlay;
    mask-image: radial-gradient(ellipse at 50%, black 40%, transparent 70%);
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: var(--stripes), var(--rainbow);
      background-size: 200%, 100%;
      animation: rainbowBg 60s linear infinite;
      background-attachment: fixed;
      mix-blend-mode: difference;
    }
  }

  .svg-turbulence {
    position: absolute;
    pointer-events: none;
  }

  .electric {
    border-radius: var(--radius);
    border: 2px solid white;
    filter: url(#turbulent-displace-0);
    animation: turbulentSwap 1.5s infinite;
    position: absolute;
    right: 0;
    bottom: 0;
    top: -8px;
    left: -8px;
    opacity: 0;
    transition: all 0.6s ease;
    z-index: 10;
    mix-blend-mode: overlay;
    transform: scale(1.1);
  }

  .glass {
    position: absolute;
    inset: 0;
    z-index: 9;
    pointer-events: none;
    overflow: hidden;
    border-radius: var(--radius);
    transition: all 0.5s ease;
  }

  .glass::before,
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease;
  }

  .glass::before {
    transform: skewX(70deg) rotate(347deg) translate(-45px, -54px);
  }

  .glass::after {
    transform: skewX(65deg) rotate(347deg) translate(115px, -14px);
  }

  .area:hover .glass {
    transform: translateX(-10px);
  }

  .area:hover .glass::before {
    transform: skewX(70deg) rotate(347deg) translate(-30px, -56px);
  }

  .area:hover .glass::after {
    transform: skewX(65deg) rotate(347deg) translate(85px, -14px);
  }

  .area-button > svg {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
    z-index: 9;
    animation: splashFeedback2 0.7s cubic-bezier(0.18, 0.94, 1, 1) forwards;
    color: #9a4df1;
    pointer-events: none;
    stroke-width: 2px;
    stroke-dasharray: 0 173;
    stroke-dashoffset: 174;
    filter: blur(1px);
  }

  .button {
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 26px;
    border-radius: var(--radius);
    position: relative;
    width: 290px;
    height: 80px;
    pointer-events: none;
    transition:
      background-color,
      0.5s linear,
      box-shadow 0.5s ease,
      transform 0.5s ease;
    box-shadow:
      0 -10px 30px rgba(57, 20, 115, 0.3),
      0 20px 30px rgba(57, 20, 115, 0.4),
      inset 0 0 2px 0 black;
    background: linear-gradient(to bottom, #000000 80%, #f2f2f2 100%);
    /* Added with the span: the upload's .button is a <button>, and this one is
       not, so the block box it relies on has to be declared. */
    display: block;
  }

  .wrap {
    border-radius: calc(var(--radius) * 0.85);
    height: 100%;
    transform: translate(0px, -4px);
    background: linear-gradient(
      to bottom,
      #d0d0d05e 0%,
      #ffffff 50%,
      #000000 100%
    );
    position: relative;
    transition: all 0.5s ease;
    display: block;
  }

  .reflex {
    position: absolute;
    z-index: 9;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
  }

  .reflex:before {
    content: "";
    position: absolute;
    width: 350px;
    background-color: rgba(255, 255, 255, 0.2);
    background: linear-gradient(
      to right,
      rgba(244, 221, 255, 0.1) 10%,
      rgba(244, 221, 255, 0.5) 60%,
      rgba(244, 221, 255, 0.3) 60%,
      rgba(244, 221, 255, 0.1) 90%
    );
    top: -40%;
    bottom: -40%;
    left: -140%;
    opacity: 1;
    transition: all 0.6s cubic-bezier(0.5, 0, 0.3, 1);
    transform: translate(250%, 0) skew(30deg);
  }

  .area:hover .reflex:before {
    transform: translateX(0) skew(-30deg);
    opacity: 0.7;
  }

  .area input:checked + .area-button .reflex:before {
    transform: translate(250%, 0) skew(30deg);
    opacity: 1;
  }

  .outline {
    position: absolute;
    overflow: hidden;
    outline: none;
    border-radius: inherit;
    transition: all 0.4s ease;
    inset: -2px;
    bottom: -4px;
    filter: blur(1px);
    opacity: 0;
  }

  .outline::before {
    content: "";
    position: absolute;
    inset: 5px;
    width: 120px;
    height: 300px;
    margin: auto;
    background: linear-gradient(
      to right,
      transparent 0%,
      white 50%,
      transparent 100%
    );
    animation: spin 4s linear infinite;
  }

  .bg {
    z-index: 1;
    position: absolute;
    inset: 5px;
    transition: all 0.3s ease;
    overflow: hidden;
    border-radius: calc(var(--radius) * 0.85);
  }

  .bg::before,
  .bg::after {
    content: "";
    inset: 0;
    position: absolute;
    transition: all 1s ease;
    z-index: -1;
    filter: blur(4px);
  }

  .bg::before {
    background: linear-gradient(
      6deg,
      #000000 0%,
      #181c40 44%,
      #121c71 48%,
      #bb4c8f 57%,
      #bb4c8f 59%,
      #c5996e 62%,
      #badeee 79%,
      #83cafb 90%
    );
  }

  .text {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    position: relative;
    height: 100%;
    font-size: 23px;
    font-weight: 500;
    transition: all 0.3s ease;
    overflow: hidden;
    border-radius: calc(var(--radius) * 0.85);
    box-shadow:
      inset -6px -2px 2px -2px rgb(0 0 0 / 79%),
      inset 6px -7px 2px -2px rgb(0 0 0 / 79%),
      inset -1px 1px 4px 4px rgb(255 255 255 / 82%),
      inset 1px 4px 5px #005880;
  }

  .text p {
    position: absolute;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: -3px;
    /* No preflight in this repo, so a bare <p> keeps its UA margin. */
    margin: 0;
  }

  .text span {
    display: inline-block;
  }

  /* The inner span. Negative delay: the ripple is already under way. */
  .text span > span {
    animation: waveText 2.2s cubic-bezier(0.45, 0, 0.55, 1)
      calc(var(--i) * -0.13s) infinite;
    animation-play-state: paused;
  }

  .area:hover .text span > span {
    animation-play-state: running;
  }

  .area:active .text {
    box-shadow:
      inset -6px -2px 2px -2px rgb(0 0 0 / 79%),
      inset 6px -7px 2px -2px rgb(0 0 0 / 79%),
      inset -1px 1px 4px 4px rgb(255 255 255 / 82%),
      inset 1px 4px 5px #005880,
      inset 1px 3px 20px rgba(13, 0, 101, 0.7),
      inset 1px -10px 20px rgba(129, 49, 101, 0.338);
  }

  .text p.state-1 > span {
    opacity: 0;
    animation: appear 1.5s ease forwards calc(var(--i) * 0.1s);
  }

  .text p.state-2 > span {
    opacity: 1;
    animation: disappear 0.6s ease forwards calc(var(--i) * 0.05s);
  }

  .liquid {
    position: absolute;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    transition: 0.5s;
    z-index: 2;
    inset: 2px;
    overflow: hidden;
    border-radius: inherit;
  }

  .liquid .wave {
    position: absolute;
    inset: 0;
    margin: auto;
    transition: transform 0.8s cubic-bezier(0.5, -0.5, 0.5, 1.5);
    filter: blur(4px);
    top: 790px;
    left: -80px;
  }

  .liquid .wave::before {
    content: "";
    width: 1000px;
    height: 1000px;
    position: absolute;
    left: 50%;
    border-radius: 48%;
    background: radial-gradient(white 50%, #03081b 70%);
    animation: wave 5s linear infinite;
    opacity: 0.5;
    filter: blur(2px);
    top: -8px;
  }

  @keyframes waveText {
    0% {
      transform: translateX(-5px) rotate(8deg);
      opacity: 0.7;
    }
    60% {
      opacity: 1;
      transform: translateY(3px) translateX(2px) rotate(0);
    }
    100% {
      transform: translateX(-5px) rotate(8deg);
      opacity: 0.7;
    }
  }

  @keyframes particleMove {
    0% {
      transform: translateX(var(--d)) rotate(-45deg) skew(0deg, 0deg)
        scale(var(--f));
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateX(0) rotate(-45deg) skew(45deg, 45deg) scale(var(--f));
    }
  }

  @keyframes rainbowBg {
    from {
      background-position:
        50% 50%,
        50% 50%;
    }
    to {
      background-position:
        350% 50%,
        350% 50%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes wave {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  @keyframes splash {
    0%,
    62% {
      opacity: 0.5;
      transform: scale(0);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  @keyframes appear {
    0% {
      transform: translateY(-40px) rotate(-90deg);
      filter: blur(10px);
    }
    30% {
      transform: translateY(7px) rotate(0);
    }
    60% {
      filter: blur(0);
      transform: translateY(-5px) rotate(0);
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  }

  @keyframes disappear {
    0% {
      opacity: 1;
    }
    100% {
      transform: translateY(40px);
      filter: blur(6px);
      opacity: 0;
      color: black;
    }
  }

  @keyframes splashFeedback {
    to {
      stroke-dasharray: 10 110;
      stroke-dashoffset: 80;
      opacity: 0;
    }
  }

  @keyframes splashFeedback2 {
    to {
      stroke-dasharray: 10 110;
      stroke-dashoffset: 80;
      opacity: 0;
    }
  }

  /** STATES */
  /* Two indices, because the two labels break in different places. */
  .area .state-1 span:nth-child(3),
  .area .state-2 span:nth-child(5) {
    margin-right: 10px;
  }

  .area input:checked + .area-button > svg {
    animation: splashFeedback 0.7s cubic-bezier(0.18, 0.94, 1, 1) forwards;
  }

  .area input:checked + .area-button .electric {
    opacity: 1;
    transform: scale(1);
  }

  .area:hover .particles {
    opacity: 1;
  }

  .area input:checked + .area-button .particles {
    opacity: 0;
  }

  .area:hover .button {
    transform: translate(0px, -4px);
  }

  .area:active .wrap {
    transform: translate(0);
  }

  .area:hover .outline {
    opacity: 1;
  }

  .area:hover .liquid .wave {
    transform: translateY(-5px);
  }

  .area input:checked + .area-button p.state-1 > span {
    opacity: 1;
    animation: disappear 0.6s ease forwards calc(var(--i) * 0.05s);
  }

  .area input:checked + .area-button p.state-2 > span {
    opacity: 0;
    animation: appear 1.5s ease forwards calc(var(--i) * 0.1s);
  }

  @media (max-width: 768px) {
    .liquid {
      display: none;
    }
  }
`;

export default ElectricCookButton;
