/* Four rules, and the two class names that describe a state the CSS cannot reach.

   `.copied-text { color: #059669 }` and `.copied-icon { stroke: #059669 }` are
   declared and never applied by any selector in the upload -- there is no
   `:checked`, no attribute, no sibling combinator that could add them. They are
   the author telling you what the second state looks like and leaving the switch
   to the consumer. So the switch is a piece of component state, and it drives
   exactly those two classes and nothing else.

   `stroke`, not `fill`, on the confirmed icon: the icons here are stroke-drawn,
   which is why lucide's are the right shape and not a filled glyph.

   `backdrop-filter: blur(10px)` over `rgba(255,255,255,0.3)` has nothing to blur
   on a flat ground -- on white it is white. The specimen is placed over a busy
   backdrop for that reason; on a plain background this button is simply a pale
   translucent panel, which is the CSS working, not failing.

   Two additions. `type="button"` -- inside a form the upload's button would
   submit it. And the confirmation is announced: the label swap is the only
   feedback this component has, so a polite live region carries it to anyone who
   is not looking at the button. A failed clipboard write leaves the label alone
   rather than claiming a copy that did not happen. Plus a focus ring: the only
   feedback in the upload is on `:hover` and `:active`. */
import { useCallback, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import styled from 'styled-components';

export const GlassCopyButton = ({
  value = 'npm i nova-ui-react-library',
  initialText = 'Copy',
  endText = 'Copied!',
}: { value?: string; initialText?: string; endText?: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* the label must not report a copy the browser refused */
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }, [value]);

  const Icon = copied ? Check : Copy;

  return (
    <StyledWrapper>
      <button className="glass-btn" type="button" onClick={copy}>
        <Icon className={copied ? 'icon copied-icon' : 'icon'} aria-hidden="true" />
        <span className={copied ? 'copied-text' : undefined}>
          {copied ? endText : initialText}
        </span>
      </button>
      <span className="announce" role="status">{copied ? endText : ''}</span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .glass-btn {
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    color: #1f2937;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Added: every state in the upload is hover or active. */
  .glass-btn:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 3px;
  }

  .glass-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .glass-btn:active {
    transform: scale(0.95);
  }

  .icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .glass-btn:hover .icon {
    transform: rotate(12deg);
  }

  .copied-text {
    color: #059669;
  }

  .copied-icon {
    stroke: #059669;
  }

  .announce {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
