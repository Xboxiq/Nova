/* A label that leaves and an icon that takes its place, on the same 1.2em.

   Three rules make the whole gesture. `button:hover span { opacity: 0 }` fades
   the word out; `button:hover svg { transform: translateX(1.2em) scale(1.1) }`
   slides the icon right by exactly the distance the word occupied; and
   `button:hover .svg-wrapper { transform: scale(1.25) }` enlarges the icon's
   frame around it. So the icon does not move NEXT TO the label -- it moves INTO
   where the label was, and the label is gone by the time it arrives.

   `1.2em` at `font-size: 20px` is 24px, which is what "Save" plus its `0.3em`
   margin measures. The number is the label's width, not a guess.

   Two things declared and never used, both kept: `font-weight: 1000` (the valid
   range ends at 1000, so this is legal and means the same as 900 for every real
   font) and the two separate `transition` declarations that overwrite each
   other's timing on hover -- `0.3s ease-in-out` in the base rule, `0.5s linear`
   in the hover rule. The hover wins going in, the base wins coming out, so the
   gesture is deliberately asymmetric: slower to leave than to return.

   `.svg-wrapper` is named by the CSS and is not the svg -- it has to be a
   separate element, because it scales while the svg inside it translates.

   Two additions: `type="button"`, and a focus ring, since the whole animation is
   keyed on `:hover` and there is no focus state at all. The upload styles the
   bare `button` element, which would reach every button on the page; scoped here
   to this component's own tree, which is the same rule with a smaller blast
   radius. */
import styled from 'styled-components';

export const SaveSlideButton = ({
  children = 'Save',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button type="button" {...rest}>
      <div className="svg-wrapper">
        <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
          <path d="M5 3h11l3 3v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 1v6h8V4H7zm5 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      </div>
      <span>{children}</span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 20px;
    background: #212121;
    color: white;
    fill: rgb(155, 153, 153);
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: 15px;
    font-weight: 1000;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover {
    background: #000;
  }

  button:hover .svg-wrapper {
    transform: scale(1.25);
    transition: 0.5s linear;
  }

  button:hover svg {
    transform: translateX(1.2em) scale(1.1);
    fill: #fff;
  }

  button:hover span {
    opacity: 0;
    transition: 0.5s linear;
  }

  button:active {
    transform: scale(0.95);
  }

  /* Added: the entire gesture is hover-only. */
  button:focus-visible {
    outline: 3px solid #9b9999;
    outline-offset: 3px;
  }
`;
