/* Three rules and nothing missing. The only thing worth naming is the press:
   "scale(0.95) rotateZ(1.7deg)" -- a press that also tilts, which is why it reads
   as a physical card being pushed rather than a box shrinking.

   backdrop-filter: blur(6px) over a 58%-alpha grey means the ground shows through,
   so this needs something behind it to be itself; a flat stage makes the blur a
   no-op. Added: a real button, because the upload gives a div with cursor:pointer,
   user-select:none and an :active state -- every signal of a control and none of
   the behaviour. */
import styled from 'styled-components';

export const FrostedClickCard = ({ children = 'Click me' }: { children?: string }) => {
  return (
    <StyledWrapper>
      <button className="card" type="button">{children}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    background: rgba(217, 217, 217, 0.58);
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: black;
  }

  .card:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }

  /* No focus rule in the upload. The border already changes on hover, so the ring
     goes outside it rather than replacing it. */
  .card:focus-visible {
    outline: 3px solid #111;
    outline-offset: 4px;
  }
`;

export default FrostedClickCard;
