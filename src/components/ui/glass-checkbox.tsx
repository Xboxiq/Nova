/* CSS alone again, and the tree is fixed by the same reading as before:

     `.container { display: inline-block; cursor: pointer; user-select: none }`
       a <label> — it is the checkbox's only possible ancestor and it carries the
       pointer, and `font-size: 20px` is the em base every dimension below is
       written in (1.6em box, 0.53em tick offset, 0.16em tick stroke).
     `.container input { position: absolute; opacity: 0; height: 0; width: 0 }`
     `.container input:checked ~ .checkmark`   the box is the input's SIBLING
     `.checkmark:after`                        the tick is a pseudo-element, so
       there is nothing inside the box: <span class="checkmark" /> and no child.

   Worth saying what this upload got RIGHT, because the last two got it wrong:
   `opacity: 0` with a zero-size box is not `display: none`. The input stays in
   the accessibility tree and stays focusable, so Tab reaches it and Space flips
   it with nothing changed. Measured, not assumed. */
import styled from 'styled-components';

export const GlassCheckbox = ({ label = 'Toggle' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <label className="container">
        {/* The <label> has no text, so without this the control has no name. */}
        <input type="checkbox" aria-label={label} />
        <span className="checkmark" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: inline-block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    /* "display: block" is added, and it is the difference between this component
       rendering and not rendering. ".checkmark" is a <span>, and "width" and
       "height" do not apply to a non-replaced INLINE box — so every dimension the
       upload writes in em was being dropped. Measured as shipped: the drawn box
       was 2px wide (its two 1px borders and nothing between them) by 32px tall,
       a vertical sliver. The author's demo must have had a reset or a block
       element under that class. Nothing about the declared design changes; this
       is what lets the declared 1.6em x 1.6em actually take effect. */
    display: block;
    position: relative;
    top: 0;
    left: 0;
    height: 1.6em;
    width: 1.6em;
    border-radius: 38%;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.12),
      0 2px 6px rgba(0, 0, 0, 0.08),
      inset 0 1px 2px rgba(255, 255, 255, 0.5),
      inset 0 -1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .container:hover input:not(:checked) ~ .checkmark {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
    box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.08),
      inset 0 1.5px 3px rgba(255, 255, 255, 0.7);
  }

  .container input:checked ~ .checkmark {
    transform: scale(1.22);
    background: linear-gradient(
      145deg,
      #004cff 0%,
      #0e34b3 50%,
      hsl(217, 100%, 25%) 100%
    );
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow:
      0 12px 28px rgba(0, 81, 255, 0.45),
      0 4px 10px rgba(0, 76, 255, 0),
      inset 0 2px 4px rgba(255, 255, 255, 0.6),
      inset 0 -2px 6px rgba(255, 255, 255, 0.35);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    left: 0.53em;
    top: 0.3em;
    width: 0.32em;
    height: 0.64em;
    border: solid #ffffff;
    border-width: 0 0.16em 0.16em 0;
    border-radius: 2px;
    transform: rotate(45deg) scale(0.3);
    opacity: 0;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .container input:checked ~ .checkmark:after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  .container:active input ~ .checkmark {
    transform: scale(0.92);
    transition: transform 0.15s ease-out;
  }

  /* The one addition. The input is focusable — the upload is right about that —
     but it is a 0x0 box at opacity 0, so focus lands somewhere with nothing to
     see. The upload writes no :focus rule at all, and a control you can Tab to
     and cannot locate is worse than one you cannot Tab to: the reader is in it
     without knowing. The ring goes on the drawn box and touches no other state. */
  .container input:focus-visible ~ .checkmark {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

export default GlassCheckbox;
