/* Pure CSS with no missing assets, and the most economical drawing in the batch:
   one 10x8 box with two rounded top corners, plus its own ::after rotated 90deg
   and a .bottom child with two borders -- three pieces that read as a heart once
   the whole thing is rotated -45deg. Nothing else.

   The upload hides both the input and .love-heart:before with display:none in a
   single rule. The input half of that deletes the control, so it is split: the
   pseudo-element stays hidden as written, the input gets the clip. And the
   selector "input:checked + label .round" versus "input:checked + .love-heart"
   in the same file is contradictory -- one expects a label between them, the
   other expects the heart directly. The heart IS the label, which satisfies the
   second; the first is written for a structure this stylesheet does not have,
   and it is left in place, unmatched, as sent. */
import styled from 'styled-components';

export const LoveHeartCheckbox = ({ label = 'Like' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <div className="love-heart-host">
        <input id="switch" type="checkbox" aria-label={label} />
        {/* The heart is the label, which is what makes the checkbox clickable
            and what the ":checked + .love-heart" rules require. */}
        <label className="love-heart" htmlFor="switch">
          <span className="bottom" />
          <span className="round" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .love-heart-host {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: relative;
  }

  /* The upload hides these two together. Only the pseudo-element may be
     display:none; the input keeps its place in the tab order. */
  .love-heart:before {
    display: none;
  }

  #switch {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .love-heart,
  .love-heart::after {
    border-color: hsl(231deg 28% 86%);
    border: 1px solid;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    width: 10px;
    height: 8px;
    border-bottom: 0;
  }

  .round {
    position: absolute;
    z-index: 1;
    width: 8px;
    height: 8px;
    background: hsl(0deg 0% 100%);
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 4px 0px;
    border-radius: 100%;
    left: 0px;
    bottom: -1px;
    transition: all .5s ease;
    animation: check-animation2 .5s forwards;
  }

  #switch:checked + .love-heart .round {
    transform: translate(0px, 0px);
    animation: check-animation .5s forwards;
    background-color: hsl(0deg 0% 100%);
  }

  @keyframes check-animation {
    0% { transform: translate(0px, 0px); }
    50% { transform: translate(0px, 7px); }
    100% { transform: translate(7px, 7px); }
  }

  @keyframes check-animation2 {
    0% { transform: translate(7px, 7px); }
    50% { transform: translate(0px, 7px); }
    100% { transform: translate(0px, 0px); }
  }

  .love-heart {
    box-sizing: border-box;
    position: relative;
    transform: rotate(-45deg) translate(-50%, -33px) scale(4);
    display: block;
    border-color: hsl(231deg 28% 86%);
    cursor: pointer;
    top: 0;
  }

  #switch:checked + .love-heart,
  #switch:checked + .love-heart::after,
  #switch:checked + .love-heart .bottom {
    border-color: hsl(347deg 81% 61%);
    box-shadow: inset 6px -5px 0px 2px hsl(347deg 99% 72%);
  }

  .love-heart::after,
  .love-heart .bottom {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-color: hsl(231deg 28% 86%);
  }

  .love-heart::after {
    right: -9px;
    transform: rotate(90deg);
    top: 7px;
  }

  .love-heart .bottom {
    width: 11px;
    height: 11px;
    border-left: 1px solid;
    border-bottom: 1px solid;
    border-color: hsl(231deg 28% 86%);
    left: -1px;
    top: 5px;
    border-radius: 0px 0px 0px 5px;
  }

  /* The heart is 4x scaled and rotated, so an outline on it would land askew.
     The ring goes on the host box, which is upright. */
  #switch:focus-visible ~ .love-heart {
    outline: 2px solid hsl(347deg 81% 61%);
    outline-offset: 6px;
  }
`;

export default LoveHeartCheckbox;
