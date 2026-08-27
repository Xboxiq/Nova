/* Four named SVG groups, and the names are the whole specification.

   Nothing in this upload says what the glyph is. What it says is how four parts
   of it move, and it names them: `.toshrink`, `.tocome`, `.tocome2` and
   `.toremainasis`. Read together they describe one gesture --

     .toremainasis   translate(28%, 37%) -> translate(28%, 22%)   the box lid, rising
     .toshrink       translate(28%, 37%) scale(0.788) -> translate(22%, 55%)   the sheet, dropping in
     .tocome         scale(0) -> translate(35.5%, 37%)            a second sheet, arriving
     .tocome2        scale(0) -> translate(30.8%, 45%)            a third, arriving later

   -- so the icon is an open container plus three sheets, two of which do not
   exist until hover. `scale(0)` as a resting state is how the CSS says "this part
   is not drawn yet"; the hover transform has no scale at all, so it returns to 1
   implicitly. And the two arrivals are timed apart, 0.45s and 0.4s, which is what
   makes them read as a sequence rather than a group.

   `transform-origin: bottom` on the svg with `.tocome` scaling from 0 is what
   makes the sheets grow upward out of the box rather than out of their own middle.

   `.archiveBtn::before` is 340% square -- 260x260 in a 76.5px button -- blurred
   17px and scaled 0 -> 1. Same trick as the edit button: absolute with no offsets
   inside a centred flex container puts it in the middle, not the corner. And the
   hover changes `background-color` on the button too, from `rgb(86, 88, 130)` to
   `rgb(37, 100, 61)` -- blue to green -- while the blurred disc underneath is
   `rgb(37, 61, 100)`, blue with the last two channels swapped. Someone typed the
   same three numbers in a different order; both are kept.

   Every dimension is a fraction of a pixel (76.5, 22.1, 5.1, 8.5, 17). That is a
   whole-pixel design scaled by 0.85, which is what "make it a bit smaller for
   uiverse" looks like after the fact.

   One addition, and it is the difference between working and not working: an
   icon-only button with no accessible name announces "button". `aria-label` gives
   it one, plus a focus ring since every state here is `:hover`. */
import styled from 'styled-components';

export const ArchiveIconButton = ({
  label = 'Archive',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="archiveBtn" type="button" aria-label={label} {...rest}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g className="tocome2">
          <path d="M0 0h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H0a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z" opacity="0.55" />
        </g>
        <g className="tocome">
          <path d="M0 0h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H0a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z" opacity="0.75" />
        </g>
        <g className="toshrink">
          <path d="M0 0h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H0a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z" />
        </g>
        <g className="toremainasis">
          <path d="M-2 4h14a1 1 0 0 1 1 1v1H-3V5a1 1 0 0 1 1-1zm-1 3h16v6a1 1 0 0 1-1 1H-2a1 1 0 0 1-1-1V7zm5 2v1.4h6V9H2z" />
        </g>
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

  .archiveBtn svg .toshrink {
    transform: translateX(28%) translateY(37%) scale(0.788);
    transition: transform 0.3s ease-in-out;
  }

  .archiveBtn:hover svg .toshrink {
    transform: translateX(22%) translateY(55%);
    transition: transform 0.3s ease-in-out;
  }

  .archiveBtn svg .tocome {
    transform: scale(0);
    transition: transform 0.45s ease-in-out;
  }

  .archiveBtn:hover svg .tocome {
    transform: translateX(35.5%) translateY(37%);
    transition: transform 0.45s ease-in-out;
  }

  .archiveBtn svg .tocome2 {
    transform: scale(0);
    transition: transform 0.45s ease-in-out;
  }

  .archiveBtn:hover svg .tocome2 {
    transform: translateX(30.8%) translateY(45%);
    transition: transform 0.4s ease-in-out;
  }

  .archiveBtn svg .toremainasis {
    transform: translateX(28%) translateY(37%);
    transition: transform 0.3s ease-in-out;
  }

  .archiveBtn:hover svg .toremainasis {
    transform: translateX(28%) translateY(22%);
    transition: transform 0.3s ease-in-out;
  }
`;
