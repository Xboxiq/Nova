/* One decorative shape, scaled nine times, doing all the work.

   `.BG svg` is 50% of the card wide, parked at `left: -20%; top: -20%` and filled
   `rgb(244, 244, 244)` -- so at rest it is a barely-visible pale shape hanging off
   the top-left corner. Hover moves it to `0, 0` and applies
   `rotate(180deg) scale(9)`: 115px x 9 = 1035px inside a 230px card. The card has
   `overflow: hidden`, so what you see is not a shape growing, it is the card
   filling edge to edge with `#c0c7ec` from one corner. Nine is not a arbitrary
   multiplier -- anything less would leave a corner uncovered on the diagonal.

   The shape itself is not supplied. What the CSS specifies is its box, its fill
   and that it must look right rotated 180 degrees, which is a blob rather than a
   glyph.

   `.sub-heading { margin-top: -7px }` is the giveaway that the three headings are
   meant to read as one block with the second pulled up tight under the first.

   Two additions, and both are the difference between working and not working. The
   `.email` field is an `<input>` with a bottom border and `outline: none` -- so
   there is no focus indicator at all on the one control a user has to type into.
   A `:focus-visible` rule puts the border back at full strength. And it had no
   label; `aria-label` gives it one, since the visible "Type your email to recover"
   line is a sibling paragraph and not associated with anything.

   The heading is "Oops!" and the sub-heading is "forgot password?" -- the copy is
   the author's and is left exactly as delivered. */
import styled from 'styled-components';

export const ResetPasswordCard = () => (
  <StyledWrapper>
    <div className="card">
      <div className="BG">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path d="M45 20c35-18 78-6 96 26 18 32 8 74-22 94-30 20-74 14-96-14C1 98 3 54 24 34c7-6 14-10 21-14z" />
        </svg>
      </div>
      <div className="content">
        <p className="heading">Oops!</p>
        <p className="sub-heading">forgot password?</p>
        <p className="sub-sub-heading">Type your email to recover</p>
        <input type="email" className="email" aria-label="Email address" placeholder="you@example.com" />
        <button className="card-btn" type="button">Reset Password</button>
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .card {
    width: 230px;
    height: 230px;
    position: relative;
    background-color: rgb(255, 255, 255);
    border-bottom: 3px solid #4c6bff;
    overflow: hidden;
    -webkit-box-shadow: 0px 12px 65px -39px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 12px 65px -39px rgba(0, 0, 0, 1);
    box-shadow: 0px 12px 65px -39px rgba(0, 0, 0, 1);
    border-radius: 5px;
  }

  .BG {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .BG svg {
    position: absolute;
    width: 50%;
    left: -20%;
    top: -20%;
    fill: rgb(244, 244, 244);
    transition: all 0.5s;
  }

  /* Added, and it is an environment difference rather than a defect in the
     upload. This repo runs Tailwind with utilities only and NO preflight, so a
     bare <p> keeps the user-agent's "margin: 1em 0". The reference was written
     against a page that had a reset. Three paragraphs at 1.4em, 0.9em and 0.7em
     carry roughly 96px of margin between them, flex items do not collapse
     margins, and the card is 230px tall with 50px of padding — so the content
     column measured 270px against 227px of room and the "Reset Password" button
     hung 39.5px BELOW the card, where "overflow: hidden" deleted it. The card's
     only action was invisible and unclickable.

     Zeroing those margins is restoring what the reference assumed, the same as
     supplying a filter it references and does not define. ".sub-heading"'s own
     "margin-top: -7px" still wins on specificity, so the tight pair it wants is
     unchanged. Measured before and after:

       as delivered   scroll 270 / room 227   button 39.5px BELOW the card
       margins zeroed scroll 227 / room 227   button 28px inside

     And the field: the column was overflowing, so "flex-shrink: 1" was squeezing
     it from its declared 25px down to 20 — under the 24px minimum target size.
     With the margins gone it measures 24.1px, which clears the floor by a tenth
     of a pixel and would fall back under it on any font change, so
     "flex-shrink: 0" restores the 25 the author actually wrote. */
  .content p {
    margin: 0;
  }

  .content .email {
    flex-shrink: 0;
  }

  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 25px;
    color: rgb(30, 30, 30);
    gap: 3px;
  }

  .heading {
    font-size: 1.4em;
    font-weight: 700;
    color: rgb(30, 30, 30);
  }

  .sub-heading {
    margin-top: -7px;
    font-size: 0.9em;
    font-weight: 600;
    color: rgb(30, 30, 30);
  }

  .sub-sub-heading {
    font-size: 0.7em;
    color: rgb(128, 128, 128);
  }

  .email {
    width: 100%;
    height: 25px;
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid #c0c7ec;
    outline: none;
    font-size: 0.7em;
    background-color: transparent;
  }

  /* Added: "outline: none" on the one field a user must type into left it with
     no focus indicator whatsoever. */
  .email:focus-visible {
    border-bottom: 2px solid #4c6bff;
  }

  .card-btn {
    margin-top: 20px;
    height: 30px;
    width: 100%;
    border: none;
    background: linear-gradient(60deg, #4c6bff, #8196ff);
    color: white;
    border-radius: 30px;
    cursor: pointer;
  }

  .card-btn:focus-visible {
    outline: 3px solid #4c6bff;
    outline-offset: 2px;
  }

  .card:hover .BG svg {
    left: 0%;
    top: 0%;
    transform: rotate(180deg) scale(9);
    fill: #c0c7ec;
  }
`;
