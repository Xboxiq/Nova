/* A 20px column split in half, and paper that grows out of the bottom half.

   `.printer-wrapper` is 20px wide and full height, a flex column of exactly two
   halves. The top half holds the printer and is `align-items: flex-end`, so the
   glyph sits on the dividing line; the bottom half is `align-items: flex-start`,
   so the paper starts on that same line. The printer is then nudged
   `translateY(4px)` DOWN across it, which is what makes the paper look like it is
   emerging from the machine rather than sitting beneath it -- and because the
   paper is the later sibling it paints over the printer, so the sheet is in front
   of the slot.

   Hover raises `.printer-page` from 10px to 16px with `transform-origin: top`,
   so the sheet feeds downward from its fixed top edge, and the button and the
   sheet both go grey at the same moment. `overflow: hidden` on the button keeps
   the 4px overhang from spilling.

   The printer glyph is not supplied; the CSS names only its box
   (`.printer-container svg { width: 100%; height: auto }`, no fill), so it is
   drawn here at that size and left to the default fill the CSS implies.

   One addition: a focus ring. The button has a real accessible name from its own
   text, so nothing else was missing. */
import styled from 'styled-components';

export const PrintPageButton = ({
  children = 'Print',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="print-btn" type="button" {...rest}>
      <span className="printer-wrapper">
        <span className="printer-container">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2h10v4H7z" />
            <path d="M4 7h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v-3H5v3H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm14 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
        </span>
        <span className="printer-page-wrapper">
          <span className="printer-page" />
        </span>
      </span>
      {children}
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .print-btn {
    width: 100px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 10px;
    gap: 10px;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden;
    font-weight: 500;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.065);
    transition: all 0.3s;
  }

  /* Added: no focus style in the upload. */
  .print-btn:focus-visible {
    outline: 3px solid #1b6ef3;
    outline-offset: 2px;
  }

  .printer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 100%;
  }

  .printer-container {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .printer-container svg {
    width: 100%;
    height: auto;
    transform: translateY(4px);
  }

  .printer-page-wrapper {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .printer-page {
    width: 70%;
    height: 10px;
    border: 1px solid black;
    background-color: white;
    transform: translateY(0px);
    transition: all 0.3s;
    transform-origin: top;
  }

  .print-btn:hover .printer-page {
    height: 16px;
    background-color: rgb(239, 239, 239);
  }

  .print-btn:hover {
    background-color: rgb(239, 239, 239);
  }
`;
