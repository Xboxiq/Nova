/* Structure fixed by the selectors: four inputs come FIRST (every rule reads
   "#id:checked ~ .cc-ios-tabs__control"), then the control, holding the thumb and
   four labels. The thumb translates 0/100/200/300% across a box of
   calc(25% - 4px), which is what says there are exactly four.

   Two fixes, both familiar by now: display:none on the inputs replaced with the
   visually-hidden clip, and a shared name -- without it four radios are four
   independent switches that never exclude each other. The upload keys everything
   off literal ids, which are document-global and would collide between two
   instances on one page; kept as written, and stated. */
import { useId } from 'react';
import styled from 'styled-components';

const TABS = ['Day', 'Week', 'Month', 'Year'];
const KEYS = ['day', 'week', 'month', 'year'];

export const IosSegmentedTabs = ({ label = 'Range' }: { label?: string }) => {
  const name = useId();
  return (
    <StyledWrapper>
      <div className="cc-ios-tabs" role="radiogroup" aria-label={label}>
        {KEYS.map((k, i) => (
          <input
            key={k}
            className="cc-ios-tabs__input"
            id={`cc-tab-${k}`}
            type="radio"
            name={name}
            defaultChecked={i === 0}
            aria-label={TABS[i]}
          />
        ))}
        <div className="cc-ios-tabs__control">
          <div className="cc-ios-tabs__thumb" />
          {KEYS.map((k, i) => (
            <label key={k} className="cc-ios-tabs__item" htmlFor={`cc-tab-${k}`}>
              {TABS[i]}
            </label>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cc-ios-tabs {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 32px;
    background: #e8e8e8;
    font-family: Inter, Arial, sans-serif;
  }

  /* The upload writes display:none here; hidden the standard way instead. */
  .cc-ios-tabs__input {
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

  .cc-ios-tabs__control {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    width: 304px;
    padding: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    box-shadow:
      inset 0 0 0 1px rgba(15, 23, 42, 0.05),
      0 2px 8px rgba(15, 23, 42, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .cc-ios-tabs__thumb {
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(25% - 4px);
    height: calc(100% - 10px);
    border-radius: 999px;
    background: #0b1220;
    box-shadow:
      0 1px 2px rgba(15, 23, 42, 0.2),
      0 8px 20px rgba(15, 23, 42, 0.16);
    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .cc-ios-tabs__item {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border-radius: 999px;
    color: #6b7280;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition: color 260ms ease;
  }

  .cc-ios-tabs__item:hover {
    color: #374151;
  }

  #cc-tab-day:checked ~ .cc-ios-tabs__control .cc-ios-tabs__thumb { transform: translateX(0%); }
  #cc-tab-week:checked ~ .cc-ios-tabs__control .cc-ios-tabs__thumb { transform: translateX(100%); }
  #cc-tab-month:checked ~ .cc-ios-tabs__control .cc-ios-tabs__thumb { transform: translateX(200%); }
  #cc-tab-year:checked ~ .cc-ios-tabs__control .cc-ios-tabs__thumb { transform: translateX(300%); }

  #cc-tab-day:checked ~ .cc-ios-tabs__control label[for="cc-tab-day"],
  #cc-tab-week:checked ~ .cc-ios-tabs__control label[for="cc-tab-week"],
  #cc-tab-month:checked ~ .cc-ios-tabs__control label[for="cc-tab-month"],
  #cc-tab-year:checked ~ .cc-ios-tabs__control label[for="cc-tab-year"] {
    color: #ffffff;
  }

  @media (prefers-reduced-motion: reduce) {
    .cc-ios-tabs__thumb,
    .cc-ios-tabs__item {
      transition: none;
    }
  }

  /* No focus rule in the upload, and the inputs are now reachable. */
  .cc-ios-tabs__input:focus-visible ~ .cc-ios-tabs__control {
    outline: 3px solid #0b1220;
    outline-offset: 3px;
  }
`;

export default IosSegmentedTabs;
