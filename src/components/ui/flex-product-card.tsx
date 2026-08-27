/* A card that clips its own price and both its buttons, and two paddings hand-cut
   so two different words come out the same width.

   The measurements settle the structure. `.price` sits at `top: 9.6em`, `.btn1`
   at `14.8em` and `.btn2` at `15.5em`, inside a card that is `7.5em` tall with
   `overflow: hidden`. So at rest the price and BOTH buttons are clipped away
   entirely -- not faded, not hidden: outside the box. Hover grows the card to
   `23em` and they arrive. The card is a disclosure whose closed state is a crop.

   `.card:hover + .glasses` is an ADJACENT SIBLING, so the glasses are outside the
   card -- which is why they can grow past its edges -- and then pulled back over
   it by `top: -4em; left: 9.5em`. The combinator dictates the markup; the offsets
   undo it.

   `.btn1 { padding-left: 6.9em; padding-right: 6.9em }` against
   `.btn2 { padding: … 5.1em }`. Two buttons, two different paddings, because
   "Buy" is shorter than "Add to Cart" and the author wanted both bars the same
   width. 6.9 and 5.1 are not from a scale; they are what made the two match.

   `rotateX(360deg)` on the glasses with no `perspective` anywhere is a full turn
   that ends where it began -- and it is NOT a no-op, because it passes through
   90 degrees, where cos(90) is zero. The glasses flatten to nothing and come
   back. Same orthographic projection as the documents button earlier in this log,
   used here deliberately rather than by accident.

   ONE addition, and it is the difference between working and not working: the
   two buttons are real focusable controls sitting outside a clip. A keyboard user
   tabs to a button that is not on screen, twice. There ARE focusable children
   here, so `:focus-within` is the honest answer rather than a tabindex -- it
   mirrors every `:hover` rule exactly, so tabbing into the card opens it the way
   pointing at it does. */
import styled from 'styled-components';

export const FlexProductCard = ({
  name = 'UltraFlex',
  price = '$299',
}: { name?: string; price?: string }) => (
  <StyledWrapper>
    <div className="card">
      <div className="heading">{name}</div>
      <div className="details">
        Beste Design till date.<br />
        Flex it up as you wish,<br />
        but you can&apos;t break it.
      </div>
      <div className="price">{price}</div>
      <button className="btn1" type="button">Buy</button>
      <button className="btn2" type="button">Add to Cart</button>
    </div>
    <svg className="glasses" viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M8 46h26a6 6 0 0 1 6 6v8a10 10 0 0 1-10 10H18a10 10 0 0 1-10-10v-14zm58 0h26v14a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10v-8a6 6 0 0 1 6-6zM40 52h20"
        fill="none"
        stroke="#111"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .card {
    position: relative;
    top: 2em;
    width: 12.5em;
    height: 7.5em;
    background: white;
    transition: 0.4s ease-in-out;
    border-radius: 15px;
    box-shadow:
      rgba(0, 0, 0, 0.07) 0px 1px 1px,
      rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px,
      rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
    overflow: hidden;
  }

  .heading {
    position: relative;
    color: black;
    font-weight: bold;
    font-size: 1.1em;
    padding-top: 1em;
    padding-left: 1em;
    transition: 0.4s ease-in-out;
  }

  .details {
    position: relative;
    color: black;
    font-size: 0.6em;
    padding-top: 1.5em;
    padding-left: 2em;
    transition: 0.4s ease-in-out;
  }

  .price {
    position: relative;
    color: black;
    font-weight: bold;
    font-size: 0.8em;
    padding-top: 1.5em;
    padding-left: 1.5em;
    top: 9.6em;
    left: 5em;
    transition: 0.4s ease-in-out;
  }

  .btn1 {
    position: relative;
    border: none;
    outline: none;
    background-color: black;
    color: white;
    font-size: 0.6em;
    padding-left: 6.9em;
    padding-right: 6.9em;
    padding-top: 0.8em;
    padding-bottom: 0.85em;
    border-radius: 10px;
    left: 2.6em;
    top: 14.8em;
    transition: 0.4s ease-in-out;
    font-weight: bold;
  }

  .btn1:hover {
    background-color: limegreen;
    cursor: pointer;
  }

  .btn2 {
    position: relative;
    border: none;
    outline: none;
    background-color: black;
    color: white;
    font-size: 0.6em;
    padding-left: 5.1em;
    padding-right: 5.1em;
    padding-top: 0.8em;
    padding-bottom: 0.85em;
    border-radius: 10px;
    left: 2.6em;
    top: 15.5em;
    transition: 0.4s ease-in-out;
    font-weight: bold;
  }

  .btn2:hover {
    background-color: limegreen;
    cursor: pointer;
  }

  /* Added: "outline: none" on both buttons, replaced with nothing. */
  .btn1:focus-visible,
  .btn2:focus-visible {
    background-color: limegreen;
    outline: 3px solid #111;
    outline-offset: 2px;
  }

  .glasses {
    position: relative;
    top: -4em;
    left: 9.5em;
    width: 70px;
    height: 70px;
    transition: 0.4s ease-in-out;
  }

  .card:hover {
    width: 12.5em;
    height: 23em;
    transform: translateY(1.25em);
  }

  .card:hover + .glasses {
    transform: rotateX(360deg);
    height: 100px;
    width: 100px;
    left: 3em;
    top: -18em;
  }

  .card:hover .heading {
    transform: translateY(7em) translateX(2.3em);
  }

  .card:hover .details {
    transform: translateY(13em) translateX(3.5em);
  }

  /* Added: the price and BOTH buttons live outside a 7.5em clip. The buttons are
     real focusable controls, so a keyboard reaches them while they are off
     screen. There are focusable children here, so :focus-within is the honest
     trigger — it mirrors every hover rule above exactly. */
  .card:focus-within {
    width: 12.5em;
    height: 23em;
    transform: translateY(1.25em);
  }

  .card:focus-within + .glasses {
    transform: rotateX(360deg);
    height: 100px;
    width: 100px;
    left: 3em;
    top: -18em;
  }

  .card:focus-within .heading {
    transform: translateY(7em) translateX(2.3em);
  }

  .card:focus-within .details {
    transform: translateY(13em) translateX(3.5em);
  }
`;
