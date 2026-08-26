/* CSS only, and the structure is settled by one detail that would otherwise look
   like a mistake: `.deadbolt-input { pointer-events: none }`.

   A checkbox that cannot be clicked, sitting behind a frame that carries
   `cursor: pointer` — that combination works under exactly one arrangement, and
   only under one: `.deadbolt-checkbox-box` is a <label>. Then clicking the frame
   activates the input through label activation, and `pointer-events: none` on a
   0x0 invisible input is simply tidy rather than fatal. As a <div> the control
   would be a picture: nothing would toggle it but a keyboard. So the container is
   a label, and the sibling combinator confirms the rest —
   `.deadbolt-input:checked ~ .deadbolt-frame` makes input and frame siblings
   inside it, with receiver, bar (holding the rivet) and drum inside the frame. */
import styled from 'styled-components';

export const DeadboltCheckbox = ({ label = 'Lock' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <label className="deadbolt-checkbox-box">
        {/* No text anywhere in this component, so the name has to come from here. */}
        <input type="checkbox" className="deadbolt-input" aria-label={label} />
        <span className="deadbolt-frame">
          <span className="bolt-receiver" />
          <span className="bolt-bar">
            <span className="bolt-rivet" />
          </span>
          <span className="status-drum" />
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .deadbolt-checkbox-box {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .deadbolt-checkbox-box .deadbolt-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .deadbolt-frame {
    position: relative;
    width: 44px;
    height: 44px;
    background: linear-gradient(180deg, #1e2026 0%, #141519 100%);
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #0d0e10;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.05),
      inset 0 -1px 2px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    display: flex;
    align-items: center;
    transition: transform 0.1s ease;
  }

  .deadbolt-frame:active {
    transform: scale(0.95);
  }

  .bolt-receiver {
    position: absolute;
    right: 4px;
    width: 6px;
    height: 20px;
    background: #0b0c0e;
    border-radius: 2px;
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.8);
  }

  .bolt-bar {
    position: absolute;
    left: -20px;
    width: 32px;
    height: 16px;
    background: linear-gradient(180deg, #8a909e 0%, #4a4e59 100%);
    border-radius: 3px;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 4px;
    box-sizing: border-box;
    z-index: 2;
  }

  .bolt-rivet {
    width: 4px;
    height: 4px;
    background: #282a30;
    border-radius: 50%;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .status-drum {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: #2b2d35;
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
    z-index: 1;
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .deadbolt-input:checked ~ .deadbolt-frame .bolt-bar {
    animation: bolt-slam 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .deadbolt-input:checked ~ .deadbolt-frame .status-drum {
    background: #ffb700;
    box-shadow:
      0 0 6px rgba(255, 183, 0, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
    transition-delay: 0.15s;
  }

  .deadbolt-input:not(:checked) ~ .deadbolt-frame .bolt-bar {
    animation: bolt-retract 0.25s cubic-bezier(0.55, 0, 1, 0.45) forwards;
  }

  @keyframes bolt-slam {
    0% { transform: translateX(0); }
    45% { transform: translateX(26px); }
    70% { transform: translateX(22px); }
    100% { transform: translateX(24px); }
  }

  @keyframes bolt-retract {
    0% { transform: translateX(24px); }
    100% { transform: translateX(0); }
  }

  /* The only addition, and the same one three uploads in a row have needed: the
     input is focusable (opacity 0 at 0x0 keeps it in the tree) and there is no
     :focus rule, so focus lands on an invisible point. The ring goes on the
     frame, which is the thing a reader can see. */
  .deadbolt-input:focus-visible ~ .deadbolt-frame {
    outline: 2px solid #ffb700;
    outline-offset: 3px;
  }
`;

export default DeadboltCheckbox;
