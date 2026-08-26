/* A tooltip that only exists because the button stops clipping.

   `.deleteButton` carries `overflow: hidden`, and `.tooltip` sits at `top: -40px`
   -- entirely outside the 40x40 button. So at rest the tooltip is clipped away
   AND transparent; two independent reasons for it not to show. Hover flips both
   at once: `overflow: visible` on the button and `opacity: 1` on the tooltip.
   Removing either declaration leaves the tooltip invisible, which is worth
   knowing before anyone "simplifies" the hover rule.

   `.tooltip::before` is a 10px square rotated 45deg at `bottom: -10%` -- the
   pointer. 10% of a 30px-tall tooltip is 3px, so it pokes out three pixels: the
   arrow is sized by a percentage of the box it hangs off, not by its own edge.

   Two additions, and both are the difference between working and not working.
   This is an icon-only button, so `aria-label` gives it the name it did not have.
   And the tooltip is driven by `:hover` alone, so on the keyboard path there was
   no tooltip and no label at all -- `:focus-visible` is added to the same two
   rules, which is the same two declarations rather than a second mechanism. The
   tooltip itself is `aria-hidden`, because the accessible name already says
   "Delete" and a screen reader announcing it twice is worse than once.

   The bin is not supplied; the CSS names `.bin path` and fills it `#fff` on
   hover, so it is a filled path in a `.bin` group. */
import styled from 'styled-components';

export const DeleteTooltipButton = ({
  label = 'Delete',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="deleteButton" type="button" aria-label={label} {...rest}>
      <svg className="bin" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1zm-3 6h12l-.8 11.1A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.9L6 9zm4 2v8h1.5v-8H10zm3.5 0v8H15v-8h-1.5z" />
      </svg>
      <span className="tooltip" aria-hidden="true">{label}</span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .deleteButton {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .deleteButton svg {
    width: 44%;
  }

  .deleteButton:hover {
    background-color: rgb(237, 56, 56);
    overflow: visible;
  }

  .bin path {
    transition: all 0.2s;
  }

  .deleteButton:hover .bin path {
    fill: #fff;
  }

  .deleteButton:active {
    transform: scale(0.98);
  }

  .tooltip {
    --tooltip-color: rgb(41, 41, 41);

    position: absolute;
    top: -40px;
    background-color: var(--tooltip-color);
    color: white;
    border-radius: 5px;
    font-size: 12px;
    padding: 8px 12px;
    font-weight: 600;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.105);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s;
  }

  .tooltip::before {
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    content: "";
    background-color: var(--tooltip-color);
    bottom: -10%;
  }

  .deleteButton:hover .tooltip {
    opacity: 1;
  }

  /* Added: the tooltip was hover-only, so a keyboard user got the icon and
     nothing else. Same two declarations, second trigger -- and the ring, which
     the upload has nowhere. */
  .deleteButton:focus-visible {
    background-color: rgb(237, 56, 56);
    overflow: visible;
    outline: 3px solid rgb(237, 56, 56);
    outline-offset: 2px;
  }

  .deleteButton:focus-visible .bin path {
    fill: #fff;
  }

  .deleteButton:focus-visible .tooltip {
    opacity: 1;
  }
`;
