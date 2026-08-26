/* CSS only. The tree is closed the usual way — `input:checked + .pb-ai-radio-ui`
   makes the surface the input's immediate next sibling, `.pb-ai-radio-label`
   follows it, and `.pb-ai-radio-dot` is inside the surface (the two pseudo
   layers are gloss and texture, so the dot is the only real child). The three
   labels come from the upload's copy.

   TWO THINGS THE CSS CANNOT SAY, and one of them decides whether this is a radio
   group at all:

   1. `name`. A set of radios with no shared name is not a group — each one is an
      independent control that can be switched on and never off, so all three end
      up selected and none of them excludes the others. Nothing in a stylesheet
      can express that, and the component is called a radio group, so the name is
      generated per instance with `useId`. This is the difference between the
      component being what it says it is and being three broken switches.
   2. Arrow keys. They come free WITH the name — a named radio group is a single
      tab stop that the arrows move within. So there is no roving-tabindex code
      here: the platform does it, once the name exists.

   And `input { display: none }` for the fourth time in these uploads: it does not
   hide a radio, it deletes it. Replaced with the visually-hidden clip, nothing
   drawn moves. */
import { useId } from 'react';
import styled from 'styled-components';

const OPTIONS = ['Generate AI', 'Smart Suggestions', 'Auto Enhance'];

export const PbAiRadioGroup = ({
  legend = 'AI mode',
  options = OPTIONS,
  defaultValue = OPTIONS[0],
}: {
  legend?: string;
  options?: string[];
  defaultValue?: string;
}) => {
  const name = useId();
  return (
    <StyledWrapper>
      {/* `role="radiogroup"` with a name, because a group of radios that is not
          announced as one leaves the reader counting "1 of 3" with no idea what
          the three are for. */}
      <div className="pb-ai-radio-group" role="radiogroup" aria-label={legend}>
        {options.map((option) => (
          <label className="pb-ai-radio" key={option}>
            <input type="radio" name={name} value={option} defaultChecked={option === defaultValue} />
            <span className="pb-ai-radio-ui">
              <span className="pb-ai-radio-dot" />
            </span>
            <span className="pb-ai-radio-label">{option}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pb-ai-radio-group,
  .pb-ai-radio-group * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Outfit", sans-serif;
  }

  /* ===== Premium AI Container ===== */
  .pb-ai-radio-group {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    flex-direction: column;
    gap: 18px;
    padding: 28px;
    border-radius: 32px;
    background: radial-gradient(
        circle at top left,
        rgba(166, 125, 255, 0.22) 0%,
        transparent 32%
      ),
      radial-gradient(
        circle at bottom right,
        rgba(93, 36, 255, 0.28) 0%,
        transparent 36%
      ),
      linear-gradient(180deg, #181824 0%, #12121b 45%, #0b0b12 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 30px 80px rgba(0, 0, 0, 0.45),
      0 0 80px rgba(125, 71, 255, 0.12);
  }

  /* ===== Container Gloss ===== */
  .pb-ai-radio-group::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 24%,
      transparent 60%
    );
    pointer-events: none;
  }

  /* ===== Container Grain ===== */
  .pb-ai-radio-group::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        rgba(255, 255, 255, 0.08) 0.7px,
        transparent 0.7px
      ),
      radial-gradient(rgba(255, 255, 255, 0.05) 0.5px, transparent 0.5px);
    background-size:
      5px 5px,
      8px 8px;
    opacity: 0.35;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  /* ===== Radio Row ===== */
  .pb-ai-radio {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    user-select: none;
  }

  /* The upload writes "display: none" here. Hidden the standard way instead, so
     the control stays in the tab order and in the accessibility tree. */
  .pb-ai-radio input {
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

  /* ===== Radio Surface ===== */
  .pb-ai-radio-ui {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    isolation: isolate;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      background 0.3s ease;
  }

  /* ===== Unselected State ===== */
  .pb-ai-radio input:not(:checked) + .pb-ai-radio-ui {
    background: linear-gradient(180deg, #2a2a35 0%, #1a1a24 45%, #111118 100%);
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.04),
      0 8px 22px rgba(0, 0, 0, 0.32),
      inset 0 2px 8px rgba(255, 255, 255, 0.08);
  }

  /* ===== Selected State ===== */
  .pb-ai-radio input:checked + .pb-ai-radio-ui {
    background: linear-gradient(180deg, #a67dff 0%, #7a45ff 45%, #5d24ff 100%);
    box-shadow:
      0 0 0 4px rgba(125, 71, 255, 0.12),
      0 10px 30px rgba(98, 43, 255, 0.35),
      inset 0 2px 10px rgba(255, 255, 255, 0.22);
  }

  /* ===== Radio Gloss ===== */
  .pb-ai-radio-ui::before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22),
      rgba(255, 255, 255, 0.05) 45%,
      rgba(255, 255, 255, 0)
    );
    z-index: 1;
    pointer-events: none;
  }

  /* ===== Radio Texture ===== */
  .pb-ai-radio-ui::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: radial-gradient(
        circle at bottom center,
        rgba(255, 255, 255, 0.42) 0%,
        rgba(255, 255, 255, 0.18) 18%,
        rgba(255, 255, 255, 0.06) 35%,
        transparent 65%
      ),
      radial-gradient(rgba(255, 255, 255, 0.14) 0.8px, transparent 0.8px),
      radial-gradient(rgba(255, 255, 255, 0.08) 0.5px, transparent 0.5px),
      radial-gradient(rgba(0, 0, 0, 0.08) 0.7px, transparent 0.7px);
    background-size:
      100% 100%,
      4px 4px,
      7px 7px,
      5px 5px;
    background-position:
      center,
      0 0,
      2px 2px,
      1px 3px;
    opacity: 0.55;
    mix-blend-mode: overlay;
    z-index: 2;
    pointer-events: none;
  }

  /* ===== Inner Radio Dot ===== */
  .pb-ai-radio-dot {
    position: relative;
    z-index: 3;
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: transparent;
    transform: scale(0.4);
    transition:
      transform 0.25s ease,
      background 0.25s ease;
  }

  /* ===== Active Dot ===== */
  .pb-ai-radio input:checked + .pb-ai-radio-ui .pb-ai-radio-dot {
    background: #ffffff;
    transform: scale(1);
  }

  /* ===== Label ===== */
  .pb-ai-radio-label {
    position: relative;
    z-index: 2;
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.3px;
  }

  /* ===== Hover Animation ===== */
  .pb-ai-radio:hover .pb-ai-radio-ui {
    transform: translateY(-2px) scale(1.04);
  }

  /* ===== Press Animation ===== */
  .pb-ai-radio:active .pb-ai-radio-ui {
    transform: scale(0.96);
  }

  /* The one addition beyond the name: the upload writes no :focus rule, so once
     the input is reachable focus has nowhere visible to land. */
  .pb-ai-radio input:focus-visible + .pb-ai-radio-ui {
    outline: 3px solid #a67dff;
    outline-offset: 4px;
  }
`;

export default PbAiRadioGroup;
