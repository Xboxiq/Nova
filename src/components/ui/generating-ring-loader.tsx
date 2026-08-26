/* A ring whose colour is nothing but four inset shadows, and ten letters that
   name themselves.

   `.loader` is `background-color: transparent`. Every pixel of the glowing disc
   comes from the keyframes, which animate three INSET box-shadows at once:

     0%    0 10px 20px #fff · 0 20px 30px #ad5fff · 0 60px 60px #471eec
     50%   0 10px 20px #fff · 0 20px 10px #d60a47 · 0 40px 60px #311e80
     100%  back to the 0% set

   Three stacked inset shadows on a transparent circle, rotated 90deg -> 270deg ->
   450deg. The rotation is what smears them; the shadows are what colours them.
   Nothing else in the file paints anything.

   And 450 rather than 90 at the end matters: a full 360 of travel per cycle, so
   the loop is seamless. Ending at 90 would have snapped back.

   `.loader-letter:nth-child(1)` through `(10)` -- exactly ten, at 0.1s apart, and
   the word is "Generating": ten letters. The count is not an assumption, the
   selectors are the count.

   `border-radius: 50ch` on `.loader-letter` is dead. It is an inline-block of
   text with no background and no border, so there is no box for a radius to
   round -- and `50ch` on a radius is a nonsense unit choice besides. Kept.

   Additions, and one of them is a lesson from earlier in this log. This is a
   loader with no role and no name, so it announced nothing at all. And the ten
   letters would be read out one at a time -- so they need collapsing into a word,
   which means an element that can legally CARRY a name. A bare span cannot:
   role `generic` prohibits an accessible name, which axe caught the last time I
   tried it. `role="img"` on the letter row, `role="status"` on the wrapper. */
import styled from 'styled-components';

const WORD = [...'Generating'];

export const GeneratingRingLoader = ({ label = 'Generating' }: { label?: string }) => (
  <StyledWrapper>
    <div className="loader-wrapper" role="status">
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
    width: 180px;
    height: 180px;
    font-family: "Inter", sans-serif;
    font-size: 1.2em;
    font-weight: 300;
    color: white;
    border-radius: 50%;
    background-color: transparent;
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
        0 20px 30px 0 #ad5fff inset,
        0 60px 60px 0 #471eec inset;
    }
    50% {
      transform: rotate(270deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 10px 0 #d60a47 inset,
        0 40px 60px 0 #311e80 inset;
    }
    100% {
      transform: rotate(450deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 30px 0 #ad5fff inset,
        0 60px 60px 0 #471eec inset;
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
  .loader-letter:nth-child(10) {
    animation-delay: 0.9s;
  }

  @keyframes loader-letter-anim {
    0%,
    100% {
      opacity: 0.4;
      transform: translateY(0);
    }
    20% {
      opacity: 1;
      transform: scale(1.15);
    }
    40% {
      opacity: 0.7;
      transform: translateY(0);
    }
  }
`;
