/* The fifth battery card in these uploads, and the one whose numbers are spelled
   by translate percentages.

   FIFTEEN ZONES, THREE ROTATIONS BY FIVE. `.area:nth-child(1..15):hover` each set a
   `rotateX` from {-15, 0, +15} and a `rotateY` from {15, 7, 0, -7, -15}, which is a
   3x5 grid -- and the container is `grid-template-columns: repeat(5, 1fr)`, so the
   fifteen invisible divs ARE that grid. The nine-zone card earlier in this log did
   the same thing at 3x3; this one reads the pointer twice as finely across, with no
   script, out of fifteen `:hover` rules and the `~` combinator.

   And every zone also moves the light. `.battery-widget::before` and `::after` are
   two 50%-wide blurred discs, and each zone repositions them to match where the
   pointer is: rows at `top: -20% / 22% / 66%`, columns at
   `right: 70% / 47.5% / 25% / 2.5% / -20%`. The columns are a perfect arithmetic
   run -- every step exactly -22.5% -- and the rows are NOT: -20 to 22 is 42, 22 to
   66 is 44. Two points on a five-point scale done by formula and three done by
   hand.

   "69" IS TWO PERCENTAGES. `.battery-level-text > span:first-of-type > span` runs
   `text-scroll-6`, which is `translateY(-600%)`, and `:nth-of-type(2) > span` runs
   `text-scroll-9`, `translateY(-900%)`. Each span is one digit tall inside a 48px
   `overflow: hidden` window, so -600% lands on index 6 and -900% on index 9. THE
   REEL LENGTHS FALL OUT OF THAT: the first reel needs at least seven digits and has
   eight (0-7), the second needs at least ten and has eleven (0-9 then 0). The
   spares are for the `mask-image`, a vertical fade at both ends -- a reel with no
   digit above and below its target would fade into nothing at the moment it
   stopped. So the number on this card is not written anywhere; it is two translate
   distances and a digit count. Measured after the reels settle:

     reel 1  "01234567"     shift -288px / 48px  ->  index 6  ->  showing "6"
     reel 2  "01234567890"  shift -432px / 48px  ->  index 9  ->  showing "9"

   THE MIDDLE THREE ZONES CANNOT BE REACHED. The card is `position: absolute` and
   comes after the fifteen areas, so it takes the pointer wherever it overlaps them.
   Hit-tested at the centre of each cell: twelve of the fifteen reach their own
   area, and 7, 8 and 9 -- the middle row's three central cells -- hit the card
   instead. Zone 8 is the `rotateX(0) rotateY(0)` one, so nothing is lost from the
   rotation; what is unreachable is its blob position, `top: 22%` with `right: 25%`,
   which no other zone writes. That is structural, not a consequence of the size
   chosen here: any card centred over a 3x5 grid covers the cells under it.

   THE BARS AND THE NUMBER DISAGREE. Five `.battery-level > span`, and their
   `::before` fills animate to `width: 100%` on the first four and `width: 14%` on
   the fifth -- (4 + 0.14) / 5 = 82.8% of the row. The label says 69. The only 69 in
   the bar row is a stop in its `mask-image`,
   `linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,1) 69%)`, which fades the
   left end and is not a level at all. Second time in this log that a component's
   own figures disagree, after the progress panel's 4.00% against 13/365.

   Each bar also carries a white `::after` clipped by
   `inset(0 100% 0 0)` -> `inset(0 10% 0 10%)` at 5% -> `inset(0 0 0 100%)` at 10%,
   then held for the remaining 90% of a 2s loop. So a sliver crosses each bar in
   200ms and the bar waits 1.8s, and the five are offset 0.1s apart: a glint that
   travels, built from a clip path and five delays.

   `pathLength` IN ITS NORMALISED FORM. `.battery-widget-level > :last-child` has
   `stroke-dasharray: 1; stroke-dashoffset: 1` and draws to `stroke-dashoffset: 0.23`.
   Dash and offset of ONE means the path length is one -- `pathLength="1"` -- and
   0.23 remaining is 77% drawn. Every other dash pair in this log had to be divided;
   this one is already a fraction. The drawing itself is inferred: it is the last
   child of a container at `z-index: -1` behind the card, stroked, glowing white
   through three stacked `drop-shadow`s, and it stops at 77%.

   And the rule does not target the stroke. `& > :last-child` of
   `.battery-widget-level` is the `<svg>` element, not the `<path>` inside it -- so
   the animation runs on the svg while the drawing is two levels down. It works
   because `stroke-dasharray` and `stroke-dashoffset` are INHERITED properties:
   measured, the svg holds `animation-name: drawLine` and
   `stroke-dashoffset: 0.23px`, and the path holds `animation-name: none` with the
   same `1px` and `0.23px` inherited from it. 0.77 of the path, drawn by a rule
   that never names it.

   A SELECTOR THAT DICTATES A TAG. `.content:first-of-type { margin-bottom: 1em }`.
   `:first-of-type` counts TAGS, so this only matches if the first `.content` is
   also the first element of its tag among the body's children -- which means
   `.battery-level-text`, which comes before it, must be a DIFFERENT tag. That is
   the selector telling the markup what to be: `.battery-level-text` is a `<span>`
   here (it is `display: flex` anyway) and the three `.content` rows are `<div>`s,
   so the rule lands on the first of them. Written as `<div>`s throughout, the rule
   would match nothing -- the third time in this log that `-of-type` decided
   something a class was expected to decide.

   FOUR ADDITIONS.

   Fifteen bare `<div>`s with `cursor` semantics are not controls and are not made
   into any; they are `aria-hidden`, because they are a pointer readout and there is
   nothing to operate.

   The three icons are inferred -- the CSS asks only for `gap: 1ch` between an icon
   and a `.text` -- and are `aria-hidden`.

   The per-character spans announce letter by letter, so each `.text` carries the
   whole string as its `aria-label` -- under `role="img"`, because a bare `<span>`
   resolves to role `generic` and generic prohibits an accessible name. The first
   draft left the role off and both gates caught it: `tools/qa/aria-name-legal.mjs`
   named the file and the line before the browser ever ran, and axe reported
   `aria-prohibited-attr` x3 in six packs. Third time in this log that an addition
   of mine was the defect, and the first time the source gate caught it first. Spaces are spans
   holding a no-break space: a `display: inline-block` span containing an ordinary
   space collapses to zero width, which would run the words together.

   The card is a readout, so it stays text. `.content` at `opacity: 0.5` composites
   `#eee` on `#212121` to `#888888`, measured 4.54 -- above AA by four hundredths,
   computed rather than assumed, because half-opacity ink on a dark ground is where
   this log has found failures twice. */
import styled from 'styled-components';

const ZONES = Array.from({ length: 15 }, (_, i) => i);
const REEL_1 = ['0', '1', '2', '3', '4', '5', '6', '7'];
const REEL_2 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

/* A span holding an ordinary space collapses to nothing at inline-block, which
   would join the words. */
const Letters = ({ label }: { label: string }) => (
  /* role="img": a bare span may not carry a name -- role "generic" prohibits one,
     which is the third time in this log that an accessibility addition of mine was
     the defect. This role permits the name and hides the glyph spans with it. */
  <span className="text" role="img" aria-label={label}>
    {[...label].map((ch, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={i} aria-hidden="true" style={{ ['--i' as string]: i }}>
        {ch === ' ' ? '\u00a0' : ch}
      </span>
    ))}
  </span>
);

const Bolt = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20z" />
  </svg>
);

const Cycle = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 4v4h-4" strokeLinecap="round" />
  </svg>
);

/* Inferred: last child of a layer behind the card, stroked, glowing white, and
   drawn to 77% -- pathLength 1 with 0.23 left. */
const LevelArt = () => (
  <svg viewBox="0 0 260 235" width="260" height="235" fill="none" aria-hidden="true">
    <path
      d="M40 10H220A30 30 0 01250 40V195A30 30 0 01220 225H40A30 30 0 0110 195V40A30 30 0 0140 10Z"
      pathLength={1}
      stroke="#eee"
      strokeWidth={2}
    />
  </svg>
);

export const FifteenZoneBatteryCard = ({
  state = 'CHARGING',
  health = '96% BATTERY HEALTH',
  cycles = '215 CYCLES',
}: { state?: string; health?: string; cycles?: string }) => (
  <StyledWrapper>
    <div className="battery-widget-container">
      {/* The 3x5 grid the fifteen :hover rules describe. A pointer readout, so
          there is nothing here to operate. */}
      {ZONES.map((i) => (
        <div key={i} className="area" aria-hidden="true" />
      ))}

      <div className="battery-widget">
        <div className="battery-widget-body">
          <span className="battery-level-text">
            <span>
              <span>
                {REEL_1.map((d, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={i}>{d}</span>
                ))}
              </span>
            </span>
            <span>
              <span>
                {REEL_2.map((d, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={i}>{d}</span>
                ))}
              </span>
            </span>
            %
          </span>

          <div className="content">
            <Bolt />
            <Letters label={state} />
          </div>
          <div className="content">
            <Heart />
            <Letters label={health} />
          </div>
          <div className="content">
            <Cycle />
            <Letters label={cycles} />
          </div>

          <div className="battery-level">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* After the widget: ".battery-widget:hover ~ .battery-widget-level" and
          ".battery-widget:hover ~ .wave" both need these to follow it. */}
      <div className="battery-widget-level" aria-hidden="true">
        <LevelArt />
      </div>
      <div className="wave" aria-hidden="true" />
    </div>
  </StyledWrapper>
);

const ZONE_ROWS = [
  { rx: '-15deg', top: '-20%' },
  { rx: '0', top: '22%' },
  { rx: '15deg', top: '66%' },
];
const ZONE_COLS = [
  { ry: '15deg', side: '70%' },
  { ry: '7deg', side: '47.5%' },
  { ry: '0', side: '25%' },
  { ry: '-7deg', side: '2.5%' },
  { ry: '-15deg', side: '-20%' },
];

/* Fifteen rules, written from the same 3x5 table the container's grid declares.
   The columns step by exactly -22.5% each; the rows step 42 then 44. */
const zoneRules = ZONE_ROWS.flatMap((row, r) =>
  ZONE_COLS.map((col, c) => {
    const n = r * 5 + c + 1;
    return [
      '.area:nth-child(' + n + '):hover {',
      '  & ~ .battery-widget-level,',
      '  & ~ .battery-widget,',
      '  & ~ .battery-widget > .battery-widget-body {',
      '    transform: rotateX(' + row.rx + ') rotateY(' + col.ry + ');',
      '  }',
      '  & ~ .battery-widget {',
      '    &::before {',
      '      top: ' + row.top + ';',
      '      right: ' + col.side + ';',
      '    }',
      '    &::after {',
      '      bottom: ' + row.top + ';',
      '      left: ' + col.side + ';',
      '    }',
      '  }',
      '}',
    ].join('\n  ');
  }),
).join('\n\n  ');

const StyledWrapper = styled.div`
  height: 420px;
  display: grid;
  place-items: center;

  .battery-widget-container {
    --primary-color: #212121;
    --neutral-color: #eee;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    position: relative;
    /* Added: the upload is 100%/100% of a host that is not in the file, and every
       sized child is absolute, so in flow it would have no height. */
    width: 340px;
    height: 300px;
    perspective: 1000px;
  }

  .area:hover ~ .battery-widget > .battery-widget-body {
    & > .battery-level-text,
    & > .content {
      transform: translateZ(30px);
    }
  }

  ${zoneRules}

  .battery-widget-level {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transition: all 0.2s ease-out;
    translate: -50% -50%;
    & > :last-child {
      filter: blur(1px) drop-shadow(0 0 1px #fff) drop-shadow(0 0 3px #fff)
        drop-shadow(0 0 5px #fff);
      /* Dash and offset of one: the path length IS one. */
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: drawLine 1s 0.5s ease-in-out forwards;
    }
  }

  .battery-widget {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 175px;
    color: var(--neutral-color);
    background-color: var(--primary-color);
    border-radius: 30px;
    box-shadow:
      0 0 10px 5px rgba(0, 0, 0, 0.1),
      inset 0 0 2px 0.5px rgba(238, 238, 238, 0.5);
    transition: all 0.2s ease-in-out;
    perspective: 1000px;
    transform-style: preserve-3d;
    translate: -50% -50%;
    overflow: hidden;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 50%;
      aspect-ratio: 1 / 1;
      background-color: var(--neutral-color);
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.3;
      transition: all 0.2s ease-in-out;
    }
    &::before {
      top: -20%;
      right: -20%;
    }
    &::after {
      bottom: -20%;
      left: -20%;
    }
    &:hover {
      & > .battery-widget-body {
        & .text > span {
          animation: slide-scroll 0.5s calc(var(--i) * 0.02s) ease;
        }
      }
      & ~ .battery-widget-level {
        filter: blur(3px);
        transform: scale(1.1);
      }
      & ~ .wave {
        opacity: 1;
        transition: all 1s ease-in-out;
      }
    }
  }

  .wave {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 200px;
    height: 175px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    z-index: -2;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid var(--neutral-color);
      box-shadow: 0 0 30px 0 var(--neutral-color);
      border-radius: 50px;
      filter: blur(3px);
      opacity: 0;
      animation: wave 3s linear infinite;
    }
    &::after {
      animation-delay: 0.8s;
    }
  }

  .battery-widget-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    position: absolute;
    inset: 1rem 1.5rem 1.5rem 1.5rem;
    transform-style: preserve-3d;
    transition: all 0.2s ease-in-out;
  }

  .battery-level-text {
    display: flex;
    font-size: 2em;
    transform-style: preserve-3d;
    transition: all 0.2s ease-in-out;
    & > span {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 48px;
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 1) 70%,
        rgba(0, 0, 0, 0) 100%
      );
      overflow: hidden;
      &:first-of-type > span {
        animation: text-scroll-6 2s 0.1s cubic-bezier(0.5, 1.5, 0.6, 1) forwards;
      }
      &:nth-of-type(2) > span {
        animation: text-scroll-9 2s 0.1s cubic-bezier(0.5, 1.5, 0.6, 1) forwards;
      }
    }
  }

  .content {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1ch;
    font-size: 0.6em;
    letter-spacing: -0.06rem;
    opacity: 0.5;
    transform-style: preserve-3d;
    transition: all 0.2s ease-in-out;
    /* Lands on the first .content only because .battery-level-text before it is
       a different tag. See the note at the top of the file. */
    &:first-of-type {
      margin-bottom: 1em;
    }
  }

  .text > span {
    display: inline-block;
    animation: slide-down 0.5s calc(var(--i) * 0.02s) ease;
  }

  .battery-level {
    display: flex;
    gap: 2.5px;
    margin-top: 1rem;
    width: 100%;
    height: 2.5px;
    /* The only 69 in this row, and it is a fade, not a level. */
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 1) 69%
    );
    transition: all 0.2s ease-in-out;
    & > span {
      position: relative;
      flex: 1;
      background-color: gray;
      border-radius: 10px;
      &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 100%;
        background-color: springgreen;
        border-radius: 10px;
      }
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        clip-path: inset(0 100% 0 0);
        background-color: #fff;
        border-radius: 10px;
      }
      &:nth-child(1)::before {
        animation: battery-level-100 0.1s 1s linear forwards;
      }
      &:nth-child(2)::before {
        animation: battery-level-100 0.1s 1.1s linear forwards;
      }
      &:nth-child(3)::before {
        animation: battery-level-100 0.1s 1.2s linear forwards;
      }
      &:nth-child(4)::before {
        animation: battery-level-100 0.1s 1.3s linear forwards;
      }
      &:nth-child(5)::before {
        animation: battery-level-14 0.1s 1.4s linear forwards;
      }
      &:nth-child(1)::after {
        animation: battery-level-flash-100 2s 1s linear infinite;
      }
      &:nth-child(2)::after {
        animation: battery-level-flash-100 2s 1.1s linear infinite;
      }
      &:nth-child(3)::after {
        animation: battery-level-flash-100 2s 1.2s linear infinite;
      }
      &:nth-child(4)::after {
        animation: battery-level-flash-100 2s 1.3s linear infinite;
      }
      &:nth-child(5)::after {
        animation: battery-level-flash-14 2s 1.4s linear infinite;
      }
    }
  }

  @keyframes drawLine {
    to {
      stroke-dashoffset: 0.23;
    }
  }

  @keyframes slide-scroll {
    0% {
      transform: translateY(0);
    }
    33% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    66% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes wave {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    30% {
      transform: scale(1.4);
      opacity: 0.1;
    }
    70%,
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes text-scroll-6 {
    to {
      transform: translateY(-600%);
    }
  }

  @keyframes text-scroll-9 {
    to {
      transform: translateY(-900%);
    }
  }

  @keyframes slide-down {
    0% {
      transform: translateY(0);
    }
    33% {
      opacity: 0;
      transform: translateY(0.5rem);
    }
    66% {
      opacity: 1;
      transform: translateY(-0.5rem);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes battery-level-100 {
    to {
      width: 100%;
    }
  }

  @keyframes battery-level-14 {
    to {
      width: 14%;
    }
  }

  @keyframes battery-level-flash-100 {
    0% {
      clip-path: inset(0 100% 0 0);
    }
    5% {
      clip-path: inset(0 10% 0 10%);
    }
    10% {
      clip-path: inset(0 0 0 100%);
    }
    100% {
      clip-path: inset(0 0 0 100%);
    }
  }

  @keyframes battery-level-flash-14 {
    0% {
      width: 14%;
      clip-path: inset(0 100% 0 0);
    }
    5% {
      width: 14%;
      clip-path: inset(0 10% 0 10%);
    }
    10% {
      width: 14%;
      clip-path: inset(0 0 0 100%);
    }
    100% {
      width: 14%;
      clip-path: inset(0 0 0 100%);
    }
  }
`;

export default FifteenZoneBatteryCard;
