/* A tilt that is not a tilt, because nothing declares a perspective.

   `.Documents-btn:hover .fileFront { transform: rotateX(30deg) }` reads like the
   front sheet lifting toward you. There is no `perspective` on the button, on the
   container, or anywhere else in the upload -- and `rotateX` without perspective
   is an orthographic projection, which means the element's height is multiplied
   by cos(30 degrees) = 0.866 and nothing else. So the sheet does not lean; it
   squashes to 87% of its height from `transform-origin: bottom`. That reads as a
   lean because the sheet behind it does not move, which is a cheaper effect than
   the code appears to ask for and worth knowing before someone "fixes" it by
   adding perspective and changing the look. Measured: 16.78px tall at rest,
   14.53px on hover -- a ratio of 0.866, and cos(30 degrees) is 0.8660. The
   computed transform is a matrix3d carrying that same 0.866, with the button's
   perspective reading "none".

   The stack is three SVGs at three widths and three z-indexes -- 80% back, 50%
   page, 85% front -- with the page the narrowest so it reads as paper inside a
   folder rather than another folder. Only the page and the front move; the back
   is the anchor.

   One addition: a focus ring. The button's own text supplies its name, and every
   other state here is hover or active. */
import styled from 'styled-components';

export const DocumentsStackButton = ({
  children = 'Documents',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="Documents-btn" type="button" {...rest}>
      <span className="folderContainer">
        <svg className="fileBack" viewBox="0 0 146 113" aria-hidden="true">
          <path d="M0 4a4 4 0 0 1 4-4h50l14 18h74a4 4 0 0 1 4 4v87a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4z" fill="#7f8dd0" />
        </svg>
        <svg className="filePage" viewBox="0 0 88 99" aria-hidden="true">
          <rect width="88" height="99" rx="4" fill="#fff" />
          <path d="M12 22h64v5H12zm0 18h64v5H12zm0 18h44v5H12z" fill="#c7cbe6" />
        </svg>
        <svg className="fileFront" viewBox="0 0 160 79" aria-hidden="true">
          <path d="M0 8a8 8 0 0 1 8-8h144a8 8 0 0 1 7.9 9.3l-10 60A8 8 0 0 1 142 75H8a8 8 0 0 1-8-8V8z" fill="#98a7ea" />
        </svg>
      </span>
      <span className="text">{children}</span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .Documents-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    height: 45px;
    border: none;
    padding: 0px 15px;
    border-radius: 5px;
    background-color: rgb(49, 49, 83);
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s;
  }

  /* Added: no focus style in the upload. */
  .Documents-btn:focus-visible {
    outline: 3px solid rgb(152, 167, 234);
    outline-offset: 3px;
  }

  .folderContainer {
    width: 40px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }

  .fileBack {
    z-index: 1;
    width: 80%;
    height: auto;
  }

  .filePage {
    width: 50%;
    height: auto;
    position: absolute;
    z-index: 2;
    transition: all 0.3s ease-out;
  }

  .fileFront {
    width: 85%;
    height: auto;
    position: absolute;
    z-index: 3;
    opacity: 0.95;
    transform-origin: bottom;
    transition: all 0.3s ease-out;
  }

  .text {
    color: white;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .Documents-btn:hover .filePage {
    transform: translateY(-5px);
  }

  .Documents-btn:hover {
    background-color: rgb(58, 58, 94);
  }

  .Documents-btn:active {
    transform: scale(0.95);
  }

  .Documents-btn:hover .fileFront {
    transform: rotateX(30deg);
  }
`;
