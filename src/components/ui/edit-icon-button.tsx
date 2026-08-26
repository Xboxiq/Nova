/* A blurred disc that is centred by the flexbox spec, and a stroke drawn by a
   changing transform-origin.

   `.editBtn::before` is 200% square -- 110x110 inside a 55px button -- absolutely
   positioned with NO top or left, and blurred 10px. An absolutely-positioned
   child of a flex container takes its static position as though it were the sole
   flex item, which means `justify-content: center` and `align-items: center`
   place it centred, not in the corner. So `scale(0) -> scale(1)` on hover grows a
   soft disc out of the middle of the button. Measured, because "no offsets" reads
   like "top-left" and here it is not.

   `::after` is the better trick: a 25px x 1.5px white bar at `left: -5px` with
   `transform: scaleX(0)` and `transform-origin: left`. Hover moves it to
   `left: 0` AND flips the origin to `right`. Growing from the left while sliding
   right, with the origin swapped mid-transition, is what makes it read as a line
   being drawn by the pencil rather than a bar being revealed.

   Three z-indexes settle the stack: the blurred disc at 1, the drawn stroke at 2,
   the pencil at 3 -- so the stroke passes under the pencil tip and over the glow.

   One addition, and it is the whole difference between working and not working:
   this is an icon-only button, so without an accessible name it announces itself
   as "button" and nothing else. `aria-label` supplies it. Plus a focus ring: the
   upload has none, and every piece of feedback here is on `:hover`.

   The pencil is not supplied. The CSS gives `height: 17px` and `fill: white`, so
   it is a filled path at that height. */
import styled from 'styled-components';

export const EditIconButton = ({
  label = 'Edit',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="editBtn" type="button" aria-label={label} {...rest}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.84 1.83 3.75 3.75 1.84-1.83z" />
      </svg>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .editBtn {
    width: 55px;
    height: 55px;
    border-radius: 20px;
    border: none;
    background-color: rgb(93, 93, 116);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }

  /* Added: no focus style in the upload, and every effect is hover-only. */
  .editBtn:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 3px;
  }

  .editBtn::before {
    content: "";
    width: 200%;
    height: 200%;
    background-color: rgb(102, 102, 141);
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all 0.3s;
    border-radius: 50%;
    filter: blur(10px);
  }

  .editBtn:hover::before {
    transform: scale(1);
  }

  .editBtn:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.336);
  }

  .editBtn svg {
    height: 17px;
    fill: white;
    z-index: 3;
    transition: all 0.2s;
    transform-origin: bottom;
  }

  .editBtn:hover svg {
    transform: rotate(-15deg) translateX(5px);
  }

  .editBtn::after {
    content: "";
    width: 25px;
    height: 1.5px;
    position: absolute;
    bottom: 19px;
    left: -5px;
    background-color: white;
    border-radius: 2px;
    z-index: 2;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }

  .editBtn:hover::after {
    transform: scaleX(1);
    left: 0px;
    transform-origin: right;
  }
`;
