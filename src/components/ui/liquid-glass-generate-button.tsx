/* Two custom properties that only work if they are registered, and the upload
   arrived with the registration broken by the delivery rather than by the author.

   WHAT THE FILE SAYS AND WHY IT CANNOT BE WHAT WAS WRITTEN. The first two rules
   are `@property --angle-1 { syntax: ""; inherits: false; initial-value: -75deg }`
   and the same for `--angle-2` at `-45deg`. `syntax: ""` is not a valid syntax
   descriptor, and an invalid `syntax` makes the whole `@property` rule invalid and
   dropped -- which would leave both properties unregistered, so `initial-value`
   would not apply and neither would be interpolable. And the file transitions BOTH
   of them: `transition: ... --angle-1 500ms ease` on the outline and
   `--angle-2 calc(var(--anim--hover-time) * 1.25)` on the sheen. Unregistered
   custom properties do not transition; they jump. So as delivered, the two
   signature moves of this button -- a conic gradient sweeping from -75deg to
   -125deg on hover, and a highlight angle snapping to -15deg on press -- would both
   be instant cuts.

   The descriptor is `"<angle>"`, and this is reconstruction from evidence, not a
   guess. `initial-value: -75deg` is an angle and is only legal for an angle
   syntax; both properties are used exclusively inside `conic-gradient(from ...)`
   and `linear-gradient(<angle>, ...)`; and this upload arrived through a
   markdown conversion that ate every HTML tag in the file -- the entire markup is
   gone, one word survived -- so a descriptor whose value is spelled with angle
   brackets is exactly what that conversion would swallow. A NEW class of loss in
   this log: not a missing element, a missing VALUE, eaten for looking like a tag.
   `src/demos.css:1844` already writes the same descriptor the same way.

   Measured, three ways. A registered property has a computed initial value on
   every element; an unregistered one reads as the empty string. On a fresh div in
   `document.body`, `--angle-1` reads `-75deg` and a control name reads `""`. And
   mid-transition on hover it reads `-89.7739deg` -- between the -75deg initial and
   the -125deg target, which unregistered properties cannot do. `@property` is
   inherently document-wide, so writing it inside a scoped template still registers
   it globally; `inherits: false` is what keeps the value itself from leaking.

   And the addition below is load-bearing, proven by removing it: with no
   `:focus-visible` rule, the focused button computes `outline-style: none` and
   `outline-width: 0px` while `:focus-visible` matches. Origin beats specificity in
   the cascade, so an author `all: unset` erases the UA ring outright.

   `:root` HAD TO MOVE. The upload declares `--global--size`, `--anim--hover-time`
   and `--anim--hover-ease` on `:root`. In a scoped stylesheet `:root` resolves to
   a descendant selector that can never match, and `--anim--hover-time` is read in
   nine transitions -- an undeclared name inside `var()` makes each of those
   declarations invalid at computed-value time, so every transition in the file
   would be dropped. They live on the wrapper here. `--global--size` is declared and
   never read; kept dead.

   THE PRESS TIPS THE BUTTON AND THERE IS NO PERSPECTIVE.
   `.button-wrap:has(button:active) { transform: rotate3d(1, 0, 0, 25deg) }`, and
   nothing in the file declares `perspective`. So the projection is orthographic and
   a 25deg rotation about X is exactly a `cos(25deg)` = 0.9063 vertical squash --
   the third orthographic rotation in this log, after the documents button (where it
   was an accident) and the product card (where it was the point). Here it reads as
   the button tipping away from the viewer, which is what a squash of nine percent
   looks like on a pill.

   THE BORDER IS A MASK, TWICE. `mask: linear-gradient(#000 0 0) content-box,
   linear-gradient(#000 0 0)` with `mask-composite: exclude` keeps only what is
   OUTSIDE the content box -- the padding ring. So `button::after` paints a conic
   gradient across its whole box and then subtracts the middle, leaving a 1px
   gradient border; `.button-shadow::after` does the same to make a hollow shadow.
   One idiom, two jobs, and it is why the border can be a conic gradient at all.

   `999vw` FOR A RADIUS. Viewport-relative, so on a 1440px page that is 14.4 metres
   of radius, which clamps to a pill and keeps doing so at every width without a
   media query. `overflow: clip` on `button span::after`, a pseudo-element with no
   children, does nothing.

   ONE ADDITION, AND IT IS THE ONE THAT MATTERS. `all: unset` on the button. Author
   declarations beat the UA stylesheet regardless of specificity, so `all: unset`
   takes `outline-style` to its initial `none` and the UA's own `:focus-visible`
   ring goes with it -- measured on the page, the focused button draws nothing. The
   hover state is a 2.5% scale and a shadow, which is not a focus indicator. One
   `:focus-visible` rule restores one, in the outline colour the file already uses.
   Plus `type="button"`. */
import styled from 'styled-components';

export const LiquidGlassGenerateButton = ({ label = 'Generate' }: { label?: string }) => (
  <StyledWrapper>
    <div className="button-wrap">
      <div className="button-shadow" aria-hidden="true" />
      <button type="button">
        <span>{label}</span>
      </button>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  /* Defs. The descriptor is "<angle>" -- see the note at the top of the file for
     why the delivered "" cannot be what was written. */
  @property --angle-1 {
    syntax: "<angle>";
    inherits: false;
    initial-value: -75deg;
  }

  @property --angle-2 {
    syntax: "<angle>";
    inherits: false;
    initial-value: -45deg;
  }

  /* The upload puts these three on :root, which cannot match inside a scoped
     stylesheet -- and --anim--hover-time is read by nine transitions. */
  --global--size: clamp(2rem, 4vw, 5rem);
  --anim--hover-time: 400ms;
  --anim--hover-ease: cubic-bezier(0.25, 1, 0.5, 1);

  /* ========== BUTTON ========== */
  /* Button Wrap Container */
  .button-wrap {
    position: relative;
    z-index: 2;
    border-radius: 999vw;
    background: transparent;
    pointer-events: none;
    transition: all var(--anim--hover-time) var(--anim--hover-ease);
  }

  /* Button Shadow Container */
  .button-shadow {
    --shadow-cuttoff-fix: 2em;
    position: absolute;
    width: calc(100% + var(--shadow-cuttoff-fix));
    height: calc(100% + var(--shadow-cuttoff-fix));
    top: calc(0% - var(--shadow-cuttoff-fix) / 2);
    left: calc(0% - var(--shadow-cuttoff-fix) / 2);
    filter: blur(clamp(2px, 0.125em, 12px));
    -webkit-filter: blur(clamp(2px, 0.125em, 12px));
    overflow: visible;
    pointer-events: none;
  }

  /* Shadow */
  .button-shadow::after {
    content: "";
    position: absolute;
    z-index: 0;
    inset: 0;
    border-radius: 999vw;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
    width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
    height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
    top: calc(var(--shadow-cuttoff-fix) - 0.5em);
    left: calc(var(--shadow-cuttoff-fix) - 0.875em);
    padding: 0.125em;
    box-sizing: border-box;
    /* Keep only what is outside the content box: a hollow shadow. */
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    transition: all var(--anim--hover-time) var(--anim--hover-ease);
    overflow: visible;
    opacity: 1;
  }

  /* ========== BUTTON BASE STYLES ========== */
  button {
    /* Basic Styling */
    --border-width: clamp(1px, 0.0625em, 4px);
    all: unset;
    cursor: pointer;
    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    pointer-events: auto;
    z-index: 3;
    background: linear-gradient(
      -75deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.05)
    );
    border-radius: 999vw;
    box-shadow:
      inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
      inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
      0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.2),
      0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2),
      0 0 0 0 rgba(255, 255, 255, 1);
    backdrop-filter: blur(clamp(1px, 0.125em, 4px));
    -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
    transition: all var(--anim--hover-time) var(--anim--hover-ease);
  }

  button:hover {
    transform: scale(0.975);
    backdrop-filter: blur(0.01em);
    -webkit-backdrop-filter: blur(0.01em);
    box-shadow:
      inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
      inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
      0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.25),
      0 0 0.05em 0.1em inset rgba(255, 255, 255, 0.5),
      0 0 0 0 rgba(255, 255, 255, 1);
  }

  /* Added: "all: unset" takes outline-style to its initial none, and an author
     declaration beats the UA sheet, so the UA focus ring goes with it. */
  button:focus-visible {
    outline: 2px solid rgba(0, 0, 0, 0.5);
    outline-offset: 3px;
  }

  /* Button Text */
  button span {
    position: relative;
    display: block;
    user-select: none;
    -webkit-user-select: none;
    font-family: "Inter", sans-serif;
    letter-spacing: -0.05em;
    font-weight: 500;
    font-size: 1em;
    color: rgba(50, 50, 50, 1);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 0em 0.25em 0.05em rgba(0, 0, 0, 0.1);
    transition: all var(--anim--hover-time) var(--anim--hover-ease);
    padding-inline: 1.5em;
    padding-block: 0.875em;
  }

  button:hover span {
    text-shadow: 0.025em 0.025em 0.025em rgba(0, 0, 0, 0.12);
  }

  /* Text */
  button span::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    width: calc(100% - var(--border-width)); /* Prevent overlapping border */
    height: calc(100% - var(--border-width));
    top: calc(0% + var(--border-width) / 2);
    left: calc(0% + var(--border-width) / 2);
    box-sizing: border-box;
    border-radius: 999vw;
    /* No children to clip. */
    overflow: clip;
    background: linear-gradient(
      var(--angle-2),
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 40% 50%,
      rgba(255, 255, 255, 0) 55%
    );
    z-index: 3;
    mix-blend-mode: screen;
    pointer-events: none;
    background-size: 200% 200%;
    background-position: 0% 50%;
    background-repeat: no-repeat;
    transition:
      background-position calc(var(--anim--hover-time) * 1.25)
        var(--anim--hover-ease),
      --angle-2 calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease);
  }

  button:hover span::after {
    background-position: 25% 50%;
  }

  button:active span::after {
    background-position: 50% 15%;
    --angle-2: -15deg;
  }

  /* Touch Devices */
  @media (hover: none) and (pointer: coarse) {
    button span::after,
    button:active span::after {
      --angle-2: -45deg;
    }
  }

  /* ========== BUTTON OUTLINE ========== */
  /* Outline */
  button::after {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    border-radius: 999vw;
    width: calc(100% + var(--border-width));
    height: calc(100% + var(--border-width));
    top: calc(0% - var(--border-width) / 2);
    left: calc(0% - var(--border-width) / 2);
    padding: var(--border-width);
    box-sizing: border-box;
    background:
      conic-gradient(
        from var(--angle-1) at 50% 50%,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0) 5% 40%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0) 60% 95%,
        rgba(0, 0, 0, 0.5)
      ),
      linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    transition:
      all var(--anim--hover-time) var(--anim--hover-ease),
      --angle-1 500ms ease;
    box-shadow: inset 0 0 0 calc(var(--border-width) / 2) rgba(255, 255, 255, 0.5);
  }

  button:hover::after {
    --angle-1: -125deg;
  }

  button:active::after {
    --angle-1: -75deg;
  }

  @media (hover: none) and (pointer: coarse) {
    button::after,
    button:hover::after,
    button:active::after {
      --angle-1: -75deg;
    }
  }

  /* Shadow Hover */
  .button-wrap:has(button:hover) .button-shadow {
    filter: blur(clamp(2px, 0.0625em, 6px));
    -webkit-filter: blur(clamp(2px, 0.0625em, 6px));
    transition: filter var(--anim--hover-time) var(--anim--hover-ease);
  }

  .button-wrap:has(button:hover) .button-shadow::after {
    top: calc(var(--shadow-cuttoff-fix) - 0.875em);
    opacity: 1;
  }

  /* Rotation -- and no perspective anywhere, so this is a cos(25deg) squash. */
  .button-wrap:has(button:active) {
    transform: rotate3d(1, 0, 0, 25deg);
  }

  .button-wrap:has(button:active) button {
    box-shadow:
      inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
      inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
      0 0.125em 0.125em -0.125em rgba(0, 0, 0, 0.2),
      0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2),
      0 0.225em 0.05em 0 rgba(0, 0, 0, 0.05),
      0 0.25em 0 0 rgba(255, 255, 255, 0.75),
      inset 0 0.25em 0.05em 0 rgba(0, 0, 0, 0.15);
  }

  .button-wrap:has(button:active) .button-shadow {
    filter: blur(clamp(2px, 0.125em, 12px));
    -webkit-filter: blur(clamp(2px, 0.125em, 12px));
  }

  .button-wrap:has(button:active) .button-shadow::after {
    top: calc(var(--shadow-cuttoff-fix) - 0.5em);
    opacity: 0.75;
  }

  .button-wrap:has(button:active) span {
    text-shadow: 0.025em 0.25em 0.05em rgba(0, 0, 0, 0.12);
  }
`;

export default LiquidGlassGenerateButton;
