/* The Generating loader's sibling: eleven of its blocks are identical, and it has
   one delay rule too many.

   Measured block-for-block against upload 51 (`generating-ring-loader`): 11 of
   this file's 28 declaration blocks are byte-identical after whitespace
   normalisation -- the wrapper, the rotating disc, the ten delay rules, the
   letter base. What differs is the palette (pink `#f051` and `#fa09` instead of
   violet and indigo), a `blur(2px)` on every letter, a `text-shadow` in the
   letter keyframes, and seven stars.

   And the count is off by one. `.loader-letter:nth-child(1)` through `(10)` --
   ten rules -- for "LAUNCHING", which is NINE letters. The tenth delay has
   nothing to apply to. Exactly the same shape as the receipt printer's twelve
   rules for eleven characters, in an unrelated upload: a delay chain written to a
   round number rather than to the word.

   `.star:nth-of-type(2)` through `(7)` gives six overrides plus the base rule --
   seven stars -- and each one carries its own `transform: translate(x, y)` AND a
   separate `scale`. Two properties rather than one composite transform, which is
   why the scale does not wipe out the position: `scale` is its own property in
   modern CSS, so `translate()` in `transform` and `scale: 1.05` compose instead
   of overwriting. Written the old way -- `transform: translate(...) scale(...)` --
   the keyframe's transform would have clobbered both.

   Measured after the reorder, all seven map to their own rule and none repeats:

     1  translate(20, 90)    scale none  0s        5  translate(32, -66)   1.3   0.35s
     2  translate(56, 46)    1.05        0.2s      6  translate(82, -36)   1     0.9s
     3  translate(-26, 56)   1.4         0.4s      7  translate(-92, 26)   1     0.95s
     4  translate(-50, -70)  0.95        0.7s

   And that table is also the proof of the composition point: star 2's computed
   `transform` is the translate ALONE, with `scale: 1.05` sitting beside it as its
   own property. That matters here because `blur-anim` animates only `opacity` and
   `filter`, so the stars' positions survive the animation. In the dot-keys case earlier in this
   log the opposite happened and the animation ate the position.

   Two additions, and they are the same two the sibling needed: `role="status"`
   with a name, and the nine letters collapsed onto one element that can legally
   carry it -- `role="img"`, because a bare span's `generic` role prohibits a
   name. */
import styled from 'styled-components';

const WORD = [...'LAUNCHING'];
const STARS = [1, 2, 3, 4, 5, 6, 7];

export const LaunchingLoader = ({ label = 'LAUNCHING' }: { label?: string }) => (
  <StyledWrapper>
    <div className="loader-wrapper" role="status">
      {/* The stars come FIRST, and that is not arrangement — it is what the
          selectors require. The author wrote `.star:nth-of-type(2)` through `(7)`,
          and `nth-of-type` counts elements of the same TAG, not of the same
          class. Every child here is a <span>, so putting `.loader` first shifts
          every star's index by one: measured that way, the third star rendered
          `translate(-50px, -70px) scale(0.95)`, which is the FOURTH rule, and the
          seventh star matched no rule at all and silently duplicated the first.
          With the stars as spans 1 through 7 the mapping is the one written. */}
      {STARS.map((s) => (
        <span className="star" key={s} />
      ))}
      <span className="loader" />
      <span className="loader-letters" role="img" aria-label={label}>
        {WORD.map((c, i) => (
          <span className="loader-letter" key={i} aria-hidden="true">{c}</span>
        ))}
      </span>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    font-family: "Inter", sans-serif;
    font-size: 1.2em;
    font-weight: 600;
    color: #fff;
    border-radius: 50%;
    background-color: #f051;
    box-shadow: 0 0 60px -10px #fff5;
    user-select: none;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: transparent;
    animation: loader-rotate 2s linear infinite;
    z-index: 0;
  }

  @keyframes loader-rotate {
    0% {
      transform: rotate(90deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 30px 0 #fff5 inset,
        0 60px 60px 0 #f001 inset;
    }
    50% {
      transform: rotate(270deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 10px 0 #fa09 inset,
        0 40px 60px 0 #f002 inset;
    }
    100% {
      transform: rotate(450deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 30px 0 #fff5 inset,
        0 60px 60px 0 #f001 inset;
    }
  }

  .loader-letters {
    display: inline-flex;
    z-index: 1;
  }

  .loader-letter {
    display: inline-block;
    opacity: 0.4;
    transform: translateY(0);
    animation: loader-letter-anim 2s infinite;
    z-index: 1;
    border-radius: 50ch;
    border: none;
    filter: blur(2px);
    margin: 0.35em;
  }

  .loader-letter:nth-child(1) {
    animation-delay: 0s;
  }
  .loader-letter:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loader-letter:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loader-letter:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loader-letter:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loader-letter:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loader-letter:nth-child(7) {
    animation-delay: 0.6s;
  }
  .loader-letter:nth-child(8) {
    animation-delay: 0.7s;
  }
  .loader-letter:nth-child(9) {
    animation-delay: 0.8s;
  }
  /* Ten rules for nine letters: "LAUNCHING". This one matches nothing. */
  .loader-letter:nth-child(10) {
    animation-delay: 0.9s;
  }

  @keyframes loader-letter-anim {
    0%,
    100% {
      opacity: 0;
      transform: translateY(0);
      filter: blur(2px);
    }
    20% {
      opacity: 1;
      transform: scale(1.2) translateY(-1px);
      filter: blur(0px);
      text-shadow:
        0px 0px 2px #fff,
        0px 0px 6px #000;
    }
    40% {
      opacity: 0.7;
      transform: translateY(0);
      filter: blur(2px);
    }
  }

  .star {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(20px, 90px);
    animation: blur-anim 2s infinite;
    box-shadow: 0 0 8px 0 #fff;
    filter: blur(4px);
    opacity: 0.2;
  }

  .star:nth-of-type(2) {
    transform: translate(56px, 46px);
    scale: 1.05;
    animation-delay: 0.2s;
  }
  .star:nth-of-type(3) {
    transform: translate(-26px, 56px);
    scale: 1.4;
    animation-delay: 0.4s;
  }
  .star:nth-of-type(4) {
    transform: translate(-50px, -70px);
    scale: 0.95;
    animation-delay: 0.7s;
  }
  .star:nth-of-type(5) {
    transform: translate(32px, -66px);
    scale: 1.3;
    animation-delay: 0.35s;
  }
  .star:nth-of-type(6) {
    transform: translate(82px, -36px);
    scale: 1;
    animation-delay: 0.9s;
  }
  .star:nth-of-type(7) {
    transform: translate(-92px, 26px);
    scale: 1;
    animation-delay: 0.95s;
  }

  @keyframes blur-anim {
    0%,
    100% {
      opacity: 0.2;
      filter: blur(4px);
    }
    50% {
      opacity: 0.3;
      filter: blur(1px);
    }
  }
`;
