/* The rule "input[id=radio-1]:checked ~ .glider" puts three radios before .tabs
   and the glider after the labels inside it. Each tab is 50x30 and the glider
   translates 0/100/200%, so three. The badge is selected as
   "label > .notification", so it sits inside a label.

   Same two fixes: display:none replaced with the clip, and a shared name so the
   three radios exclude each other. */
import { Fragment, useId } from 'react';
import styled from 'styled-components';

const ITEMS = [
  { label: 'Hello', badge: '2' },
  { label: 'UI', badge: null },
  { label: 'World', badge: null },
];

export const GliderTabs = ({ label = 'Section' }: { label?: string }) => {
  const name = useId();
  return (
    <StyledWrapper>
      <div className="container" role="radiogroup" aria-label={label}>
        {/* Inputs, labels and the glider are all siblings INSIDE .tabs, not
            outside it. I first put the inputs in .container and the glider in
            .tabs, and measured the glider never moving: "input:checked ~ .glider"
            needs them to be siblings. The rule reads ".container input" as a
            DESCENDANT, so .container is only an ancestor qualifier — which is
            what lets everything sit inside .tabs, where .glider also gets the
            positioned parent its absolute placement needs. */}
        <div className="tabs">
          {ITEMS.map((it, i) => (
            <Fragment key={it.label}>
              <input
                type="radio"
                id={`radio-${i + 1}`}
                name={name}
                defaultChecked={i === 0}
                aria-label={it.label}
              />
              <label className="tab" htmlFor={`radio-${i + 1}`}>
                {it.label}
                {it.badge ? (
                  <span className="notification" aria-hidden="true">
                    {it.badge}
                  </span>
                ) : null}
              </label>
            </Fragment>
          ))}
          <span className="glider" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .tabs {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    padding: 0.75rem;
    border-radius: 99px;
  }

  .tabs * {
    z-index: 2;
  }

  /* display:none in the upload. */
  .container input[type="radio"] {
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

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    font-size: .8rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
  }

  .notification {
    display: flex;
    align-items: center;
    justify-content: center;
    width: .8rem;
    height: .8rem;
    position: absolute;
    top: 10px;
    left: 30%;
    font-size: 10px;
    margin-left: 0.75rem;
    border-radius: 50%;
    margin: 0px;
    background-color: #e6eef9;
    transition: 0.15s ease-in;
  }

  .container input[type="radio"]:checked + label {
    color: #185ee0;
  }

  .container input[type="radio"]:checked + label > .notification {
    background-color: #185ee0;
    color: #fff;
    margin: 0px;
  }

  .container input[id="radio-1"]:checked ~ .glider { transform: translateX(0); }
  .container input[id="radio-2"]:checked ~ .glider { transform: translateX(100%); }
  .container input[id="radio-3"]:checked ~ .glider { transform: translateX(200%); }

  .glider {
    position: absolute;
    display: flex;
    height: 30px;
    width: 50px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
  }

  @media (max-width: 700px) {
    .tabs {
      transform: scale(0.6);
    }
  }

  .container input[type="radio"]:focus-visible + label {
    outline: 2px solid #185ee0;
    outline-offset: 2px;
  }
`;

export default GliderTabs;
