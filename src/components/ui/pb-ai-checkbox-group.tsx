/* The sibling of the radio group, and near enough its twin that the overlap was
   measured rather than guessed: normalising both uploads and renaming
   radio→checkbox, 13 of 16 declaration blocks are byte-identical. The container,
   its gloss, its grain, the two surface states, the surface gloss, the surface
   texture, the hover lift and the press are shared verbatim. Exactly three blocks
   differ, and they are the whole difference between the two controls:

     surface radius   999px (a disc, one of many)  →  12px (a box, on or off)
     the mark         a dot that scales 0.4 → 1    →  a glyph that goes from
                                                      transparent to white
     the mark's rule  background + transform       →  color + transform

   The two files are kept separate and both verbatim. Factoring the shared 13
   blocks into one place would be tidier and would also be rewriting two people's
   stylesheets into a third thing neither of them wrote — the brief is to
   implement each as it stands, so the duplication is recorded, not removed.

   `.pb-ai-check` carries no character in the CSS, only a size, a weight and
   `color: transparent`. The upload's copy supplies it: `✦`, the same mark the
   input pill in the next upload uses. A dingbat, not an emoji.

   `input { display: none }` replaced with the clip, for the fifth time. */
import styled from 'styled-components';

const OPTIONS = ['Generate AI', 'Smart Suggestions', 'Auto Enhance'];

export const PbAiCheckboxGroup = ({
  legend = 'AI features',
  options = OPTIONS,
}: {
  legend?: string;
  options?: string[];
}) => {
  return (
    <StyledWrapper>
      <div className="pb-ai-checkbox-group" role="group" aria-label={legend}>
        {options.map((option) => (
          <label className="pb-ai-checkbox" key={option}>
            <input type="checkbox" value={option} />
            <span className="pb-ai-checkbox-ui">
              {/* aria-hidden: the mark repeats the state the checkbox already
                  reports, and a bare "✦" read aloud is noise. */}
              <span className="pb-ai-check" aria-hidden="true">
                ✦
              </span>
            </span>
            <span className="pb-ai-label">{option}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pb-ai-checkbox-group,
  .pb-ai-checkbox-group * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Outfit", sans-serif;
  }

  /* ===== Premium AI Container ===== */
  .pb-ai-checkbox-group {
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
  .pb-ai-checkbox-group::before {
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
  .pb-ai-checkbox-group::after {
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

  /* ===== Checkbox Row ===== */
  .pb-ai-checkbox {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    user-select: none;
  }

  /* "display: none" in the upload; hidden the standard way here. */
  .pb-ai-checkbox input {
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

  /* ===== Checkbox Surface ===== */
  .pb-ai-checkbox-ui {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 12px;
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

  /* ===== Unchecked State ===== */
  .pb-ai-checkbox input:not(:checked) + .pb-ai-checkbox-ui {
    background: linear-gradient(180deg, #2a2a35 0%, #1a1a24 45%, #111118 100%);
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.04),
      0 8px 22px rgba(0, 0, 0, 0.32),
      inset 0 2px 8px rgba(255, 255, 255, 0.08);
  }

  /* ===== Checked State ===== */
  .pb-ai-checkbox input:checked + .pb-ai-checkbox-ui {
    background: linear-gradient(180deg, #a67dff 0%, #7a45ff 45%, #5d24ff 100%);
    box-shadow:
      0 0 0 4px rgba(125, 71, 255, 0.12),
      0 10px 30px rgba(98, 43, 255, 0.35),
      inset 0 2px 10px rgba(255, 255, 255, 0.22);
  }

  /* ===== Checkbox Gloss ===== */
  .pb-ai-checkbox-ui::before {
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

  /* ===== Checkbox Texture ===== */
  .pb-ai-checkbox-ui::after {
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

  /* ===== Check Icon ===== */
  .pb-ai-check {
    position: relative;
    z-index: 3;
    color: transparent;
    font-size: 15px;
    font-weight: 600;
    transform: scale(0.6);
    transition:
      transform 0.25s ease,
      color 0.25s ease;
  }

  /* ===== Visible Check ===== */
  .pb-ai-checkbox input:checked + .pb-ai-checkbox-ui .pb-ai-check {
    color: #ffffff;
    transform: scale(1);
  }

  /* ===== Label ===== */
  .pb-ai-label {
    position: relative;
    z-index: 2;
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.3px;
  }

  /* ===== Hover Animation ===== */
  .pb-ai-checkbox:hover .pb-ai-checkbox-ui {
    transform: translateY(-2px) scale(1.04);
  }

  /* ===== Press Animation ===== */
  .pb-ai-checkbox:active .pb-ai-checkbox-ui {
    transform: scale(0.96);
  }

  /* No :focus rule in the upload either. */
  .pb-ai-checkbox input:focus-visible + .pb-ai-checkbox-ui {
    outline: 3px solid #a67dff;
    outline-offset: 4px;
  }
`;

export default PbAiCheckboxGroup;
