/* A star rating that fills the wrong way, and four rules that paint nothing.

   Three findings, and the first one is the design.

   `.radio > input:checked + label ~ label > svg` and
   `.radio input:checked ~ label svg` both light every label that FOLLOWS the
   checked one. So choosing the second star lights stars two through five and
   leaves the first dark -- the fill runs away from the origin instead of toward
   it, which is the reverse of how every star rating reads. It is kept, because
   the control still reports the right value; only the paint is backwards, and
   that is the author's paint.

   Second: four rules set `fill` on the LABEL --
   `.radio > label:hover, .radio > label:hover ~ label { fill: #ff9e0b }` and the
   `:checked + label:hover` pair. They are not dead in the parse sense: under a
   real hover the label's own computed `fill` IS `rgb(255, 158, 11)`. They simply
   cannot be seen. A `<label>` paints no fillable geometry, and the one descendant
   that would inherit the value has a direct rule of its own -- measured with the
   third star checked and the second hovered, the second label computes
   `fill: rgb(255, 158, 11)` while its svg computes `rgb(255, 167, 35)`, a
   DIFFERENT colour. The inherited value never arrives. Measured with a genuine
   pointer hover, not a dispatched `mouseover`, which does not match `:hover`
   at all and made the first attempt at this measurement worthless.

   A smaller thing falls out of the same measurement: with the third star checked
   the fills settle to `#666, #666, #ffa723, #ff9e0b, #ff9e0b`. The checked star
   is a different orange from the two after it, and nothing in the CSS says so on
   purpose -- `.radio > input:checked + label ~ label > svg` carries one more
   element in its selector than `.radio input:checked ~ label svg`, so it wins for
   stars four and five, while for star three the two tie and source order hands it
   to the later `#ffa723`. **A specificity tie broken by document order is the
   only reason the selected star has its own shade.**

   Third, and this one is the difference between working and not working: the
   inputs carry no `name`. Five radios with no shared name are five independent
   radios -- they never exclude each other, so every star can be on at once and
   none can be turned off. `useId()` supplies the name. The same inputs also have
   no accessible name at all (their labels contain only an svg), so each gets one,
   and the set gets a `radiogroup` with a name of its own.

   The inputs stay `position: absolute; appearance: none` exactly as written -- an
   appearance-stripped radio paints no box, so it is invisible without being
   deleted from the a11y tree, which is the one thing `display: none` would have
   cost.

   `particle-explosion` is attached to `::before` and `::after` unconditionally,
   with no state gating it, so both particles play once at load for all ten
   pseudo-elements before settling back to `opacity: 0`. Verbatim. `pulse` and
   `shimmer` are `infinite alternate`; the reduced-motion blanket removes them and
   the base styles are the correct rest.

   The star is not supplied; the CSS asks only for a `fill`, so it is a filled
   path sized in `em` to follow the label's 30px. */
import { useId } from 'react';
import styled from 'styled-components';

const STARS = [1, 2, 3, 4, 5];

export const StarRatingRadio = ({ label = 'Rating' }: { label?: string }) => {
  const name = useId();

  return (
    <StyledWrapper>
      <div className="radio" role="radiogroup" aria-label={label}>
        {STARS.map((value) => (
          <RadioStar key={value} name={name} value={value} />
        ))}
      </div>
    </StyledWrapper>
  );
};

const RadioStar = ({ name, value }: { name: string; value: number }) => {
  const id = `${name}-${value}`;

  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
      />
      <label htmlFor={id}>
        <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
          <path d="M12 2.1l2.9 6.26 6.85.72-5.12 4.6 1.44 6.72L12 16.9l-6.07 3.5 1.44-6.72-5.12-4.6 6.85-.72z" />
        </svg>
      </label>
    </>
  );
};

const StyledWrapper = styled.div`
  .radio {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .radio > input {
    position: absolute;
    appearance: none;
  }

  /* Added: the inputs paint nothing, so focus needs to land on the label. */
  .radio > input:focus-visible + label {
    outline: 3px solid #ff9e0b;
    outline-offset: 4px;
    border-radius: 4px;
  }

  .radio > label {
    cursor: pointer;
    font-size: 30px;
    position: relative;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .radio > label > svg {
    fill: #666;
    transition: fill 0.3s ease;
  }

  .radio > label::before,
  .radio > label::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #ff9e0b;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
    transition:
      transform 0.4s ease,
      opacity 0.4s ease;
    animation: particle-explosion 1s ease-out;
  }

  .radio > label::before {
    top: -15px;
    left: 50%;
    transform: translateX(-50%) scale(0);
  }

  .radio > label::after {
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%) scale(0);
  }

  .radio > label:hover::before,
  .radio > label:hover::after {
    opacity: 1;
    transform: translateX(-50%) scale(1.5);
  }

  .radio > label:hover {
    transform: scale(1.2);
    animation: pulse 0.6s infinite alternate;
  }

  /* Star glow and animation on hover */
  .radio > label:hover > svg {
    fill: #ff9e0b;
    filter: drop-shadow(0 0 15px rgba(255, 158, 11, 0.9));
    animation: shimmer 1s ease infinite alternate;
  }

  .radio > input:checked + label > svg {
    fill: #ff9e0b;
    filter: drop-shadow(0 0 15px rgba(255, 158, 11, 0.9));
    animation: pulse 0.8s infinite alternate;
  }

  .radio > input:checked + label ~ label > svg,
  .radio > input:checked + label > svg {
    fill: #ff9e0b; /* Highlight the stars */
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }

  @keyframes particle-explosion {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }

  @keyframes shimmer {
    0% {
      filter: drop-shadow(0 0 10px rgba(255, 158, 11, 0.5));
    }
    100% {
      filter: drop-shadow(0 0 20px rgba(255, 158, 11, 1));
    }
  }

  .radio > input:checked + label:hover,
  .radio > input:checked + label:hover ~ label {
    fill: #e58e09;
  }

  .radio > label:hover,
  .radio > label:hover ~ label {
    fill: #ff9e0b;
  }

  .radio input:checked ~ label svg {
    fill: #ffa723;
  }
`;
