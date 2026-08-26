/* A word with no width, revealed by giving it width.

   The label is not faded in and it is not slid in: `.text` is
   `position: absolute; right: 0; width: 0%; opacity: 0`, and hover sets
   `width: 70%; opacity: 1`. A zero-width box inside a button with
   `overflow: hidden` has nowhere to render, so the word does not exist until the
   button is 125px wide and hands it 70% of that. The icon gives up the space in
   the same breath -- `.sign` goes from `width: 100%` to `width: 30%` -- so the
   two shares always add to one. Measured: the word is 0px wide at rest inside a
   45px button and 87.5px wide inside a 125px one -- 87.5 / 125 is exactly the
   70% the hover rule asks for.

   `transition-duration: .3s` is declared SIX times: once on the button, once on
   the sign, once on the text, and again inside each of the three hover rules.
   The three inside the hover rules change nothing, since the base declarations
   already cover both directions. Verbatim; it is how the author wrote it.

   Two additions. Every state here is `:hover`, so `:focus-visible` mirrors all
   three consequences -- otherwise a keyboard user gets a 45px red circle with no
   word in it and no way to make one appear. And a ring, which the upload has
   nowhere. The accessible name was already fine: the label is real text, and
   `opacity: 0` leaves it in the accessibility tree. */
import styled from 'styled-components';

export const LogoutExpandButton = ({
  children = 'Logout',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="Btn" type="button" {...rest}>
      <div className="sign">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3a1 1 0 0 1 0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h3zm7.3 3.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4L18.6 13H10a1 1 0 1 1 0-2h8.6l-2.3-2.3a1 1 0 0 1 0-1.4z" />
        </svg>
      </div>
      <div className="text">{children}</div>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(255, 65, 65);
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }

  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: 0.3s;
  }

  /* hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: 0.3s;
    padding-left: 20px;
  }

  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }

  /* button click effect*/
  .Btn:active {
    transform: translate(2px, 2px);
  }

  /* Added: the expansion was hover-only, so the keyboard path had no word at
     all. Same three consequences, second trigger, plus the ring the upload has
     nowhere. */
  .Btn:focus-visible {
    width: 125px;
    border-radius: 40px;
    outline: 3px solid rgb(255, 65, 65);
    outline-offset: 3px;
  }

  .Btn:focus-visible .sign {
    width: 30%;
    padding-left: 20px;
  }

  .Btn:focus-visible .text {
    opacity: 1;
    width: 70%;
    padding-right: 10px;
  }
`;
