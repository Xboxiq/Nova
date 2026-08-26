/* Eleven declarations, and the mechanism is in the selector
   "svg:last-child { position: absolute }": two identical icons stack, and on
   :active only the last one flies off -- rotate 10deg, translate 50px/-80px, fade
   out -- while the tile itself dips to 0.92. One glyph appears to peel away from
   the other. The class name keeps the upload's own spelling, icon-conatiner.

   The icon is not supplied; the CSS says 50px wide and auto height, twice, in a
   tile labelled Group. lucide Users. Added: a real button element (the upload
   gives a div with cursor:pointer and no control), and aria-hidden on both
   glyphs since the label says the word. */
import { Users } from 'lucide-react';
import styled from 'styled-components';

export const GroupIconButton = ({ label = 'Group' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <button className="icon-conatiner" type="button">
        <Users aria-hidden="true" focusable="false" />
        <Users aria-hidden="true" focusable="false" />
        <span className="text">{label}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .icon-conatiner {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 15px;
    box-shadow: 20px 20px 15px 0 #ababab4d;
    cursor: pointer;
    position: relative;
    border: none;
  }

  .icon-conatiner svg {
    width: 50px;
    height: auto;
    color: #666;
  }

  .icon-conatiner svg:last-of-type {
    position: absolute;
    top: 34px;
  }

  .icon-conatiner:active {
    animation: press 0.2s 1 linear;
  }

  .icon-conatiner:active svg:last-of-type {
    animation: bounce 0.2s 1 linear;
  }

  .text {
    color: #666;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    user-select: none;
  }

  @keyframes press {
    0% { transform: scale(1); }
    50% { transform: scale(0.92); }
    to { transform: scale(1); }
  }

  @keyframes bounce {
    50% { transform: rotate(5deg) translate(20px, -50px); }
    to { transform: scale(0.9) rotate(10deg) translate(50px, -80px); opacity: 0; }
  }

  .icon-conatiner:focus-visible {
    outline: 3px solid #666;
    outline-offset: 4px;
  }
`;

export default GroupIconButton;
