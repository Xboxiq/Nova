/* One pseudo-element asked to do two different jobs, and the second job wins.

   THE COLLISION. The upload writes `.vtab.active::after` -- a 3px grey bar down
   the left edge, `left: 0; top: 6px; bottom: 6px; width: 3px` -- and then, further
   down the same file, writes `.vtab::after` again for something else entirely: a
   blurred conic-gradient sweep at `inset: -70%`, `filter: blur(16px)`,
   `opacity: 0`, waiting for hover.

   There is only ONE ::after per element. So on the active tab the cascade merges
   them declaration by declaration: `top`, `bottom`, `left` and `width` come from
   the more specific `.active` rule, `right` comes from the `inset` shorthand in
   the base rule, and `background` is the grey. But `opacity: 0`, `filter:
   blur(16px)` and the `transform` are declared ONLY in the base rule, so nothing
   overrides them -- and the active bar is painted at opacity zero.

   **The active-tab indicator never appears.** Measured on the page, not inferred:
   the computed opacity of the active tab's ::after is 0. Kept verbatim, because
   the owner asked for these files as they are and a missing decoration is not a
   missing function -- the active state is still carried by `background`, `color`
   and `border-color`, all three of which do paint. The one-line remedy, if the bar
   is wanted, is `opacity: 1; filter: none` inside the `.active::after` rule.

   THE DEBRIS AND THE TAG TRAP. `.debris:nth-of-type(1..3)` gives three motes per
   tab different tops and durations -- 5s, 7s, 6.5s -- so they never line up.
   `nth-of-type` counts TAGS, not classes, which in wave 10 shifted every index by
   one when a same-tag sibling got added ahead of them. So the three motes are the
   only `<span>` children here and the tab's label stays a bare text node.

   Their travel is arithmetic: `left: -20px` with `translateX(-20px)` at 0% puts a
   mote 40px outside the tab, and `translateX(240px)` at 100% puts it 220px along a
   tab whose content box is 188px wide (200px sidebar less 6px padding each side,
   less 1px border each side, less 12px tab padding each side, less 1px tab border
   each side). So every mote enters from outside and leaves from outside, which is
   why the opacity ramp -- 0 at both ends, 0.25/0.2/0.25 across the middle -- has
   nothing to hide.

   `animation-play-state: paused` on `.vtab:hover .debris`, with `opacity: 0`. The
   motes do not fade out and resume; they FREEZE, and hovering off resumes them
   mid-flight from wherever they stopped. Drift and sweep are mutually exclusive by
   design: the hover state stops the ambient animation and starts the loud one.

   TWO ADDITIONS.

   `.vtab` is styled as a button and is not one -- `cursor: pointer`, `:active`,
   `:hover`, and four labels that are plainly a nav. Real `<button type="button">`
   elements, so the whole set is keyboard-reachable and announces as buttons.

   Nothing in the upload draws a focus indicator; the hover rule is the only
   feedback. `:focus-visible` takes the hover appearance plus an outline, because
   an outline alone on a 1px-bordered dark tab is not enough to find.

   `aria-current` marks the active tab, which is the fact the `.active` class
   carries and the only part of it a screen reader can otherwise not reach. */
import { useState } from 'react';
import styled from 'styled-components';

const TABS = ['Home', 'Settings', 'Profile', 'Logs'];

export const PrintstreamSidebar = ({ tabs = TABS }: { tabs?: string[] }) => {
  const [active, setActive] = useState(0);

  return (
    <StyledWrapper>
      <div className="cs2-printstream-ui">
        <div className="sidebar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={i === active ? 'vtab active' : 'vtab'}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
            >
              {/* The three motes are the only spans in the tab: nth-of-type
                  counts tags, and the label is a bare text node for that reason. */}
              <span className="debris" />
              <span className="debris" />
              <span className="debris" />
              {tab}
            </button>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* ========================= */
  /* ROOT SCOPE               */
  /* ========================= */
  .cs2-printstream-ui {
    font-family: sans-serif;
  }

  /* ========================= */
  /* SIDEBAR                  */
  /* ========================= */
  .cs2-printstream-ui .sidebar {
    width: 200px;
    background: rgb(12, 12, 12);
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 1px solid rgb(28, 28, 28);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  }

  /* ========================= */
  /* BASE TAB                 */
  /* ========================= */
  .cs2-printstream-ui .vtab {
    position: relative;
    overflow: hidden;
    background: rgb(20, 20, 20);
    color: rgb(170, 170, 170);
    border: 1px solid rgb(35, 35, 35);
    padding: 10px 12px;
    text-align: left;
    border-radius: 2px;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      border-color 0.25s ease,
      background 0.25s ease,
      color 0.25s ease;
    will-change: transform;
    /* Added with the <button>: a button carries a UA font and font-size that a
       styled div never had, so the size the upload drew has to be restated. */
    font: inherit;
    font-size: 14px;
  }

  /* subtle sheen */
  .cs2-printstream-ui .vtab::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04),
      transparent 55%
    );
    pointer-events: none;
  }

  /* ========================= */
  /* ACTIVE STATE             */
  /* ========================= */
  .cs2-printstream-ui .vtab.active {
    background: rgb(26, 26, 26);
    color: white;
    border-color: rgb(90, 90, 90);
  }

  /* active bar */
  /* This is the first of the two ::after rules. Every geometric property here
     wins on specificity -- and every property it does NOT declare is inherited
     from the sweep rule below, including "opacity: 0". So this bar is laid out
     correctly and painted at zero alpha. See the note at the top of the file. */
  .cs2-printstream-ui .vtab.active::after {
    content: "";
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: rgb(180, 180, 180);
  }

  /* ========================= */
  /* PRINTSTREAM HOVER        */
  /* ========================= */
  .cs2-printstream-ui .vtab::after {
    content: "";
    position: absolute;
    inset: -70%;
    background: conic-gradient(
      from 180deg,
      rgba(0, 255, 255, 0),
      rgba(0, 255, 255, 0.25),
      rgba(255, 0, 255, 0.25),
      rgba(0, 255, 128, 0.25),
      rgba(255, 255, 255, 0.12),
      rgba(0, 255, 255, 0)
    );
    filter: blur(16px);
    opacity: 0;
    transform: translateX(-70%) rotate(20deg);
  }

  .cs2-printstream-ui .vtab:hover::after,
  .cs2-printstream-ui .vtab:focus-visible::after {
    opacity: 1;
    animation: cs2-sweep 3.2s ease-in-out infinite;
  }

  @keyframes cs2-sweep {
    0% {
      transform: translateX(-70%) rotate(20deg);
    }
    50% {
      transform: translateX(0%) rotate(20deg);
    }
    100% {
      transform: translateX(70%) rotate(20deg);
    }
  }

  .cs2-printstream-ui .vtab:hover,
  .cs2-printstream-ui .vtab:focus-visible {
    color: white;
    border-color: rgb(110, 110, 110);
    background: rgb(22, 22, 22);
    transform: translateX(2px);
  }

  /* Added: the upload draws nothing for focus, and the hover appearance alone --
     a border going from rgb(35,35,35) to rgb(110,110,110) -- is not findable. */
  .cs2-printstream-ui .vtab:focus-visible {
    outline: 2px solid rgb(0, 255, 255);
    outline-offset: 1px;
  }

  .cs2-printstream-ui .vtab:active {
    transform: translateX(1px) scale(0.99);
  }

  /* ========================= */
  /* DEBRIS SYSTEM            */
  /* ========================= */
  .cs2-printstream-ui .debris {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(220, 220, 220, 0.22);
    border-radius: 1px;
    top: 50%;
    left: -20px;
    opacity: 0;
    filter: blur(0.3px);
    animation: cs2-drift 6s linear infinite;
  }

  .cs2-printstream-ui .debris:nth-of-type(1) {
    top: 25%;
    animation-duration: 5s;
  }

  .cs2-printstream-ui .debris:nth-of-type(2) {
    top: 60%;
    animation-duration: 7s;
    opacity: 0.18;
  }

  .cs2-printstream-ui .debris:nth-of-type(3) {
    top: 80%;
    animation-duration: 6.5s;
    opacity: 0.12;
  }

  @keyframes cs2-drift {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    10% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.2;
    }
    90% {
      opacity: 0.25;
    }
    100% {
      transform: translateX(240px);
      opacity: 0;
    }
  }

  .cs2-printstream-ui .vtab:hover .debris,
  .cs2-printstream-ui .vtab:focus-visible .debris {
    animation-play-state: paused;
    opacity: 0;
  }
`;

export default PrintstreamSidebar;
