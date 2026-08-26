/* CSS plus one surviving fragment of markup:

     button class="inner-glow-btn" type="button">  Explore Universe

   — enough to fix the element, the type and the label. The rest comes off the
   class names, which are BEM and so name their own nesting:
   `__text` and `__icon-wrapper` are children of the block, and `__icon` is
   inside the wrapper (the wrapper is 36x36 and centres its content; the icon is
   18x18). `justify-content: space-between` with `gap: 20px` and an asymmetric
   `padding: 10px 10px 10px 24px` says exactly two children, text then a round
   thing pinned to the right — the padding is 24 on the text side and 10 on the
   wrapper side because the wrapper is a filled circle that supplies its own.

   The icon itself is NOT in the upload. What the CSS says about it: 18x18, and
   `stroke: #0f172a` — stroked, not filled, so a line icon. What the design says
   about it: the wrapper stretches from a 36px circle to a 50px rounded slot and
   slides 4px right on hover, which is a nudge in ONE direction, and the label is
   "Explore Universe". That is an arrow pointing the way the motion goes. So it
   is lucide's ArrowRight — `lucide-react` is already a dependency, and drawing a
   fresh arrow by hand would be inventing where something installed already
   answers. Stated here because it is the one part of this component that is
   inferred rather than given. */
import { ArrowRight } from 'lucide-react';
import styled from 'styled-components';

export const InnerGlowButton = ({ children = 'Explore Universe' }: { children?: React.ReactNode }) => {
  return (
    <StyledWrapper>
      <button className="inner-glow-btn" type="button">
        <span className="inner-glow-btn__text">{children}</span>
        <span className="inner-glow-btn__icon-wrapper">
          {/* aria-hidden: the label beside it already says where this goes. */}
          <ArrowRight className="inner-glow-btn__icon" aria-hidden="true" focusable="false" />
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .inner-glow-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    gap: 20px;
    padding: 10px 10px 10px 24px;
    height: 56px;
    background: #a8ff1b;
    box-shadow:
      inset 0 4px 6px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 9999px;
    color: #0f172a;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    cursor: pointer;
    overflow: visible;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .inner-glow-btn__text {
    position: relative;
    z-index: 1;
    line-height: 1;
  }

  .inner-glow-btn__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(15, 23, 42, 0.12);
    border-radius: 50%;
    transition:
      transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      border-radius 0.4s ease,
      background 0.4s ease,
      width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .inner-glow-btn__icon {
    width: 18px;
    height: 18px;
    stroke: #0f172a;
    transition: none;
  }

  .inner-glow-btn:hover {
    background: #c8ff00;
    color: #0f172a;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow:
      inset 0 4px 8px rgba(0, 0, 0, 0.15),
      inset 0 2px 6px rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
  }

  .inner-glow-btn:hover .inner-glow-btn__icon-wrapper {
    background: rgba(15, 23, 42, 0.2);
    width: 50px;
    border-radius: 18px;
    transform: translateX(4px);
  }

  .inner-glow-btn:active {
    background: #a3e635;
    color: #0f172a;
    transform: scale(0.98);
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.3);
  }

  .inner-glow-btn:active .inner-glow-btn__icon-wrapper {
    width: 36px;
    border-radius: 50%;
    transform: translateX(0);
    background: rgba(15, 23, 42, 0.12);
  }
`;

export default InnerGlowButton;
