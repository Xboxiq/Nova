/* The same button as archive-icon-button, and a completely different glyph -- with
   translations so large the viewBox has to be read backwards out of them.

   The two uploads (145551 and 150350) share FIVE declaration blocks byte for
   byte: the button, its blurred `::before`, both hover rules, and the svg. What
   differs is every group rule. Where the first names four parts by what they do
   (`toshrink`, `tocome`, `tocome2`, `toremainasis`), this one names two by ONE
   thing: `togrow` and `togrow2`, both `scaleY(5.5)` and `scaleY(4.5)` on hover.
   Not a duplicate -- the same chassis with a different mechanism bolted in.

   The interesting part is the units. The transforms are in `em`:

     .togrow    translateX(53.125em)  translateY(45.8125em)  ->  translateY(22.25em) scaleY(5.5)
     .togrow2   translateX(45.5em)    translateY(53.4375em)  ->  translateY(32.25em) scaleY(4.5)

   On an SVG element a CSS `em` resolves against the element's own font-size, and
   the values are enormous -- at a 16px font-size, 53.125em is 850 user units. A
   24-unit viewBox would fling both groups a hundred widths off screen. So the
   viewBox is not free: it has to be the coordinate space in which 850 x 733 is
   inside the picture, which puts it at 1000. Every other number then lands where
   a drawing would want it: 850/1000 and 733/1000 is the lower right, and the
   hover pulls one group up to 356 and the other to 516 while stretching them
   five and four and a half times vertically. Two bars growing upward out of the
   bottom-right corner.

   Measured, which is the only reason the viewBox above is 1000 rather than a
   guess: both groups render INSIDE the svg, at 79% / 73.3% and 66.8% / 85.5% of
   it. On hover their heights go 3.1px to 16.8px and 3.1px to 13.8px -- ratios of
   5.42 and 4.45 against the declared 5.5 and 4.5 -- and their tops rise to 35.6%
   and 51.6%. Both grow upward, as "transform-origin: bottom" requires.

   `transform-origin: bottom` on the svg is what makes `scaleY` grow them upward
   rather than from their middles, and the hover also gives both a white
   `stroke-width: 2px` they do not have at rest -- so they gain an outline as they
   grow, which reads as them coming forward.

   The scale factors are the author's arithmetic too: 76.5px, 22.1px, 5.1px,
   8.5px, 17px are all whole pixels multiplied by 0.85, the same 15% reduction
   the first upload carries.

   One addition, as before: an icon-only button with no accessible name announces
   "button". `aria-label` supplies one, plus a focus ring, since every state in
   the upload is `:hover`. */
import styled from 'styled-components';

export const ArchiveGrowButton = ({
  label = 'Archive',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="archiveBtn" type="button" aria-label={label} {...rest}>
      <svg viewBox="0 0 1000 1000" aria-hidden="true">
        <g className="togrow">
          <rect x="-60" y="0" width="120" height="60" rx="12" />
        </g>
        <g className="togrow2">
          <rect x="-60" y="0" width="120" height="60" rx="12" />
        </g>
        <path d="M120 300h760a40 40 0 0 1 40 40v70H80v-70a40 40 0 0 1 40-40zm-40 150h840v420a40 40 0 0 1-40 40H120a40 40 0 0 1-40-40V450zm300 90v90h240v-90H380z" />
      </svg>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .archiveBtn {
    width: 76.5px;
    height: 76.5px;
    border-radius: 22.1px;
    background-color: rgb(86, 88, 130);
    border: 5.1px solid rgb(180, 183, 200);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 8.5px 17px rgba(0, 0, 0, 0.123);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
  }

  /* Added: no focus style in the upload. */
  .archiveBtn:focus-visible {
    outline: 3px solid rgb(180, 183, 200);
    outline-offset: 3px;
  }

  .archiveBtn::before {
    content: "";
    width: 340%;
    height: 340%;
    background-color: rgb(37, 61, 100);
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all 0.3s;
    border-radius: 50%;
    filter: blur(17px);
  }

  .archiveBtn:hover::before {
    transform: scale(1);
  }

  .archiveBtn:hover {
    box-shadow: 0px 8.5px 17px rgba(0, 0, 0, 0.336);
    background-color: rgb(37, 100, 61);
  }

  .archiveBtn svg {
    height: 3.1875em;
    width: 3.1875em;
    fill: white;
    z-index: 3;
    transition: all 0.2s;
    transform-origin: bottom;
  }

  .archiveBtn svg .togrow {
    transform: translateX(53.125em) translateY(45.8125em);
    transition:
      transform 0.3s ease-in-out,
      fill 0.3s ease-in-out;
  }

  .archiveBtn:hover svg .togrow {
    transform: translateX(53.125em) translateY(22.25em) scaleY(5.5);
    fill: #8b8d8b;
    stroke: white;
    stroke-width: 2px;
    transition:
      transform 0.3s ease-in-out,
      fill 0.3s ease-in-out;
  }

  .archiveBtn svg .togrow2 {
    transform: translateX(45.5em) translateY(53.4375em);
    transition:
      transform 0.3s ease-in-out,
      fill 0.3s ease-in-out;
  }

  .archiveBtn:hover svg .togrow2 {
    transform: translateX(45.9375em) translateY(32.25em) scaleY(4.5);
    fill: #8b8d8b;
    stroke: white;
    stroke-width: 2px;
    transition:
      transform 0.3s ease-in-out,
      fill 0.3s ease-in-out;
  }
`;
