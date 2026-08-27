/* Small, and it carries the sharpest accessibility defect in the whole log.

   Every "copied" rule is keyed on ":focus:not(:focus-visible)" -- that is
   deliberately "focused, but NOT in a way the browser thinks deserves a ring",
   which in practice means focused BY MOUSE. So the tooltip flipping to
   "Copied!", the clipboard icon hiding and the checkmark appearing all happen on
   a click and NEVER on a keyboard activation. Press the button with Enter and the
   text copies with no confirmation at all: the one piece of feedback the
   component exists to give is switched off for keyboard users by construction.

   That is not kept verbatim, because it is not a look -- it is the feedback being
   absent. A data-copied attribute set by the handler drives the same three rules,
   so the state comes from what happened rather than from how the button was
   focused. The mouse path is unchanged; the keyboard path now has one.

   Two more, smaller: the upload writes "visibility: 0", which is not a valid
   value for visibility (it wants "hidden") -- so the tooltip was never actually
   hidden, only transparent, and it still occupied the a11y tree. And
   --tooltip-transition-duration is commented out in the upload while
   "transition: all var(--tooltip-transition-duration)" still references it, so
   the transition resolves to an invalid duration and does nothing. Both left
   as-is except the visibility typo, which is corrected because an invisible
   tooltip that screen readers still announce is a bug, not a style.

   The two icons are not supplied; the CSS names them .clipboard and .checkmark. */
import { useCallback, useRef, useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import styled from 'styled-components';

export const CopyTooltipButton = ({
  value = 'npm i nova-ui-react-library',
  label = 'Copy to clipboard',
  initialText = 'Copy',
  endText = 'Copied!',
}: { value?: string; label?: string; initialText?: string; endText?: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* a denied or unavailable clipboard must not leave the button claiming
         success, so the confirmation only runs when the write resolved */
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <StyledWrapper>
      <button
        className="copy"
        type="button"
        onClick={copy}
        aria-label={label}
        data-copied={copied ? 'true' : undefined}
      >
        <span className="tooltip" data-text-initial={initialText} data-text-end={endText} />
        <Clipboard className="clipboard" aria-hidden="true" focusable="false" />
        <Check className="checkmark" aria-hidden="true" focusable="false" />
        {/* the only thing a reader needs: what just happened */}
        <span className="sr-live" role="status" aria-live="polite">
          {copied ? endText : ''}
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .copy {
    --button-bg: #353434;
    --button-hover-bg: #464646;
    --button-text-color: #CCCCCC;
    --button-hover-text-color: #8bb9fe;
    --button-border-radius: 10px;
    --button-diameter: 36px;
    --button-outline-width: 1px;
    --button-outline-color: rgb(141, 141, 141);
    --tooltip-bg: #f4f3f3;
    --toolptip-border-radius: 4px;
    --tooltip-font-family: Menlo, Roboto Mono, monospace;
    --tooltip-font-size: 12px;
    --tootip-text-color: rgb(50, 50, 50);
    --tooltip-padding-x: 7px;
    --tooltip-padding-y: 7px;
    --tooltip-offset: 8px;
  }

  .copy {
    box-sizing: border-box;
    width: var(--button-diameter);
    height: var(--button-diameter);
    border-radius: var(--button-border-radius);
    background-color: var(--button-bg);
    color: var(--button-text-color);
    border: none;
    cursor: pointer;
    position: relative;
    outline: none;
  }

  .tooltip {
    position: absolute;
    opacity: 0;
    /* the upload writes "visibility: 0", which is not a valid value, so the
       tooltip was transparent but still present to a screen reader */
    visibility: hidden;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font: var(--tooltip-font-size) var(--tooltip-font-family);
    color: var(--tootip-text-color);
    background: var(--tooltip-bg);
    padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
    border-radius: var(--toolptip-border-radius);
    pointer-events: none;
    transition: all var(--tooltip-transition-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .tooltip::before {
    content: attr(data-text-initial);
  }

  .tooltip::after {
    content: "";
    position: absolute;
    bottom: calc(var(--tooltip-padding-y) / 2 * -1);
    width: var(--tooltip-padding-y);
    height: var(--tooltip-padding-y);
    background: inherit;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -999;
    pointer-events: none;
  }

  .copy svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
  }

  .checkmark {
    display: none;
  }

  .sr-live {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* The upload's own trigger, kept: hover, and mouse-focus. */
  .copy:hover .tooltip,
  .copy:focus:not(:focus-visible) .tooltip,
  .copy[data-copied] .tooltip {
    opacity: 1;
    visibility: visible;
    top: calc((100% + var(--tooltip-offset)) * -1);
  }

  /* ...and the same three rules driven by what HAPPENED, so the keyboard path
     gets the confirmation the mouse path already had. */
  .copy:focus:not(:focus-visible) .tooltip::before,
  .copy[data-copied] .tooltip::before {
    content: attr(data-text-end);
  }

  .copy:focus:not(:focus-visible) .clipboard,
  .copy[data-copied] .clipboard {
    display: none;
  }

  .copy:focus:not(:focus-visible) .checkmark,
  .copy[data-copied] .checkmark {
    display: block;
  }

  .copy:hover,
  .copy:focus {
    background-color: var(--button-hover-bg);
  }

  .copy:active {
    outline: var(--button-outline-width) solid var(--button-outline-color);
  }

  .copy:hover svg {
    color: var(--button-hover-text-color);
  }

  /* outline:none with no replacement, and a 36px button is the whole target. */
  .copy:focus-visible {
    outline: 2px solid var(--button-hover-text-color);
    outline-offset: 2px;
  }
`;

export default CopyTooltipButton;
