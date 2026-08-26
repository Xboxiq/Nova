/* CSS only, and the media query is what fixes the markup:

     @media (max-width: 640px) { .pb-ai-input-btn span:first-child { display: none } }

   A rule that hides the button's FIRST span has two consequences. It tells you
   the button has at least two children and that the first is the word — so the
   order is <span>Create</span> then <span class="pb-ai-sparkle">✦</span>, not the
   other way round. And it means that below 640px the button's only remaining
   content is a dingbat.

   THAT IS THE DEFECT THIS COMPONENT NEEDS FIXED. A button whose entire label is
   "✦" has no accessible name on a phone: a screen reader announces "button", and
   voice control has nothing to say. `aria-label` on the button carries the word
   across the breakpoint at zero visual cost — the sparkle is `aria-hidden`, so
   the name is stable at every width instead of evaporating at 640px.

   And this is the first upload that actively REMOVES focus: `outline: none` on
   both the field and the button. Restored for both, because a keyboard user with
   no ring is a keyboard user who has lost their place — and the upload's own
   `::placeholder` rule shows it expects to be typed into. */
import styled from 'styled-components';

export const PbAiInput = ({
  placeholder = 'Describe what to create…',
  action = 'Create',
  label = 'Prompt',
}: {
  placeholder?: string;
  action?: string;
  label?: string;
}) => {
  return (
    <StyledWrapper>
      <div className="pb-ai-input-wrap">
        {/* The field has no visible label of its own; a placeholder is not a
            name (it disappears the moment anything is typed). */}
        <input className="pb-ai-input" type="text" placeholder={placeholder} aria-label={label} />
        <button className="pb-ai-input-btn" type="button" aria-label={action}>
          <span>{action}</span>
          <span className="pb-ai-sparkle" aria-hidden="true">
            ✦
          </span>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pb-ai-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    min-width: 290px;
    max-width: 360px;
    padding: 6px;
    border-radius: 999px;
    background: linear-gradient(
      180deg,
      rgba(166, 125, 255, 0.18) 0%,
      rgba(122, 69, 255, 0.12) 100%
    );
    backdrop-filter: blur(14px);
    box-shadow:
      0 0 0 4px rgba(125, 71, 255, 0.08),
      0 0 24px rgba(98, 43, 255, 0.14),
      inset 0 0 6px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    isolation: isolate;
  }

  /* Gloss */
  .pb-ai-input-wrap::before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16),
      rgba(255, 255, 255, 0.04) 45%,
      rgba(255, 255, 255, 0)
    );
    pointer-events: none;
    z-index: 1;
  }

  /* Grain */
  .pb-ai-input-wrap::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: radial-gradient(
        circle at bottom center,
        rgba(255, 255, 255, 0.18) 0%,
        rgba(255, 255, 255, 0.06) 20%,
        transparent 60%
      ),
      radial-gradient(rgba(255, 255, 255, 0.1) 0.8px, transparent 0.8px);
    background-size:
      100% 100%,
      5px 5px;
    opacity: 0.35;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 2;
  }

  .pb-ai-input {
    position: relative;
    z-index: 3;
    flex: 1;
    /* The upload gives the field no vertical size at all — "padding: 0 8px" and
       "font-size: 13px", so its hit target measured 274x19. WCAG 2.5.8 asks for
       24, and a 19px-tall text field is genuinely hard to hit with a thumb. This
       is invisible: the field is transparent, the pill is already ~44px tall
       from its own padding plus the button's, and the row is centred — so the
       box grows into space that was already there. Measured before and after. */
    min-height: 24px;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 8px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: -0.15px;
  }

  .pb-ai-input::placeholder {
    color: rgba(255, 255, 255, 0.55);
  }

  .pb-ai-input-btn {
    position: relative;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px 14px;
    border-radius: 999px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.15px;
    background: linear-gradient(180deg, #a67dff 0%, #7a45ff 45%, #5d24ff 100%);
    box-shadow:
      0 0 0 3px rgba(125, 71, 255, 0.1),
      0 5px 12px rgba(98, 43, 255, 0.2),
      inset 0 2px 8px rgba(255, 255, 255, 0.16);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .pb-ai-input-btn:hover {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 4px rgba(125, 71, 255, 0.12),
      0 8px 16px rgba(98, 43, 255, 0.24),
      inset 0 2px 8px rgba(255, 255, 255, 0.2);
  }

  .pb-ai-input-btn:active {
    transform: scale(0.97);
  }

  .pb-ai-sparkle {
    font-size: 12px;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    .pb-ai-input-wrap {
      width: 100%;
      min-width: unset;
    }
    .pb-ai-input-btn span:first-child {
      display: none;
    }
    .pb-ai-input-btn {
      padding: 10px 12px;
    }
  }

  /* Putting back what "outline: none" took away, on both controls. The wrapper
     clips ("overflow: hidden"), so an outset ring on the field would be cut —
     hence a box-shadow ring there, which draws inside the wrapper, and a real
     outline on the button, which sits far enough in to clear the edge. */
  .pb-ai-input:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(166, 125, 255, 0.9);
    border-radius: 999px;
  }

  .pb-ai-input-btn:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: -3px;
  }
`;

export default PbAiInput;
