/* Every letter is drawn twice and the letter itself is invisible.

   `.char span { color: transparent }`, and then `.char span::before` and
   `::after` both carry `content: attr(data-label)`. So each character exists three
   times: a transparent span that reserves the width and does the layout, a
   `::before` parked at `translateY(-100%)` with `opacity: 0` -- the incoming copy,
   waiting above -- and an `::after` at rest, the outgoing copy. The swap is those
   two trading places, and the span is the ruler they slide along. That is why the
   text is in `data-label` attributes rather than as text nodes: an attribute can
   be read by two pseudo-elements at once, a text node cannot be in two places.

   THE FIFTH CHILD IS THE SPACE. `.char span:nth-child(5) { margin-left: 5px }` --
   one rule, no state qualifier. State one is "JoinToday" and state two is
   "JoinNow", and BOTH break after four characters, so the fifth span is the T in
   one label and the N in the other. The same 5px is the word gap in both, which
   is only true because the two labels happen to share their break point. Change
   "Join" to "Sign up" and the rule silently puts a gap mid-word.

   THE ARROW LEAVES THE BUTTON AND COMES BACK FROM THE OTHER SIDE.
   `@keyframes arrow`: opacity 1 at 0%, `translateX(60px)` and opacity 0 at 50%,
   `translateX(-200px)` still invisible at 51%, and `translateX(-128px)` visible at
   100%. One percent of the duration does the teleport, under cover of opacity 0 --
   the arrow flies out to the right, cuts to off-screen left, and walks back in to
   park at -128px. And `resetArrow` is the same journey without the exit: on mount
   the arrow slides from -128px to 0. So the button has a resting arrow position
   and a focused arrow position, 128px apart, and two animations to travel between
   them in opposite directions.

   TWO DASH LENGTHS, BOTH DECLARED. `.path` is `stroke-dasharray: 150 480` with
   `stroke-dashoffset: 150`, animating to `-480`: one lap is 480 units, so
   `pathLength=480`. `.splash` is `60 60` offset `60` animating to
   `stroke-dasharray: 2 60; stroke-dashoffset: -60`: one lap is 60, so
   `pathLength=60`, and the dash SHRINKS from 60 to 2 as it travels, which is how a
   line becomes a spark. Same reading as every other dash pair in this log, and the
   two SVGs themselves are inferred -- the CSS says where they sit (`.path` full
   width at the bottom, `.splash` at the top left, offset -17%/-31%) and how long
   they are, and that is all it says.

   A RULE THAT DOES NOTHING, TWICE OVER. `.button:hover .words { opacity: 1 }` and
   `.button:hover .words span { animation-play-state: running }`. `.words` has no
   base rule anywhere in the file, so there is no opacity to raise from -- measured
   at rest it is already 1. And its spans DO have an animation, `charAppear` from
   `.char.state-1 span` -- measured `animation-play-state: running` at rest, so
   setting it running changes nothing either. Both hover declarations are no-ops,
   for two different reasons. The `:active` rule on the same element, `opacity: 0`,
   is the only one that does anything, and it is what makes the label vanish under
   the press while the splash fires.

   `animation-play-state: paused` appears FOUR times as a base state -- on the
   outline sweep and on the three arrow bars -- with `:hover` setting them all
   running in one rule. So those four animations exist from load and are frozen at
   frame zero, which is the cheapest possible way to have a hover animation start
   instantly and keep its phase between hovers.

   THREE ADDITIONS.

   `type="button"`. Then: nine spans and seven spans announce letter by letter, so
   the two labels and the arrow are `aria-hidden` and the button carries a real
   name -- and the name FOLLOWS the swap, because the swap is `:focus`-driven and
   reversible, so a name frozen at "Join Today" would contradict a visible "Join
   Now" for anyone using speech input. Two handlers mirror exactly the state the
   CSS already keys on.

   No focus ring was added. `outline: none` is declared, but `:focus` here is not
   decoration -- it is the whole state machine: the label swaps, the underline
   draws 480 units, and the arrow crosses 128px. There is no reading of that as
   an invisible focus. */
import { useState } from 'react';
import styled from 'styled-components';

const Chars = ({ word, state }: { word: string; state: 1 | 2 }) => (
  <div className={'char state-' + state}>
    {[...word].map((ch, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={i} data-label={ch} style={{ ['--i' as string]: i }} />
    ))}
  </div>
);

export const CharSwapJoinButton = ({
  resting = 'JoinToday',
  focused = 'JoinNow',
  restingName = 'Join Today',
  focusedName = 'Join Now',
}: { resting?: string; focused?: string; restingName?: string; focusedName?: string }) => {
  /* The visible label is swapped by :focus and swapped back on blur, so the
     accessible name has to move with it. */
  const [named, setNamed] = useState(restingName);

  return (
    <StyledWrapper>
      <button
        className="button"
        type="button"
        aria-label={named}
        onFocus={() => setNamed(focusedName)}
        onBlur={() => setNamed(restingName)}
      >
        <div className="bg" aria-hidden="true" />
        <div className="wrap">
          <div className="content" aria-hidden="true">
            <div className="words">
              <Chars word={resting} state={1} />
              <Chars word={focused} state={2} />
            </div>
            <div className="icon">
              <div />
            </div>
          </div>
          <div className="outline" />
        </div>
        {/* Inferred: full width at the bottom, one lap = 480 units. */}
        <svg className="path" viewBox="0 0 220 4" fill="none" aria-hidden="true">
          <path d="M2 2H218" pathLength={480} stroke="white" strokeWidth={3} strokeLinecap="round" />
        </svg>
        {/* Inferred: a burst at the top left, one lap = 60 units. */}
        <svg className="splash" viewBox="0 0 60 60" width="60" height="60" fill="none" aria-hidden="true">
          <path
            d="M30 30L30 6M30 30L47 13M30 30L54 30M30 30L13 13M30 30L6 30M30 30L13 47"
            pathLength={60}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    --white: #ffe7ff;
    --purple-100: #f4b1fd;
    --purple-200: #d190ff;
    --purple-300: #c389f2;
    --purple-400: #8e26e2;
    --purple-500: #5e2b83;
    --radius: 18px;
    border-radius: var(--radius);
    outline: none;
    cursor: pointer;
    font-size: 23px;
    font-family: Arial;
    background: transparent;
    letter-spacing: -1px;
    border: 0;
    position: relative;
    width: 220px;
    height: 80px;
    transform: rotate(353deg) skewX(4deg);
  }

  .bg {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    filter: blur(1px);
  }

  .bg::before,
  .bg::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: calc(var(--radius) * 1.1);
    background: var(--purple-500);
  }

  .bg::before {
    filter: blur(5px);
    transition: all 0.3s ease;
    box-shadow:
      -7px 6px 0 0 rgb(115 75 155 / 40%),
      -14px 12px 0 0 rgb(115 75 155 / 30%),
      -21px 18px 4px 0 rgb(115 75 155 / 25%),
      -28px 24px 8px 0 rgb(115 75 155 / 15%),
      -35px 30px 12px 0 rgb(115 75 155 / 12%),
      -42px 36px 16px 0 rgb(115 75 155 / 8%),
      -56px 42px 20px 0 rgb(115 75 155 / 5%);
  }

  .wrap {
    border-radius: inherit;
    overflow: hidden;
    height: 100%;
    transform: translate(6px, -6px);
    padding: 3px;
    background: linear-gradient(
      to bottom,
      var(--purple-100) 0%,
      var(--purple-400) 100%
    );
    position: relative;
    transition: all 0.3s ease;
  }

  .outline {
    position: absolute;
    overflow: hidden;
    inset: 0;
    opacity: 0;
    outline: none;
    border-radius: inherit;
    transition: all 0.4s ease;
  }

  .outline::before {
    content: "";
    position: absolute;
    inset: 2px;
    width: 120px;
    height: 300px;
    margin: auto;
    background: linear-gradient(
      to right,
      transparent 0%,
      white 50%,
      transparent 100%
    );
    animation: spin 3s linear infinite;
    animation-play-state: paused;
  }

  .content {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: relative;
    height: 100%;
    gap: 16px;
    border-radius: calc(var(--radius) * 0.85);
    font-weight: 600;
    transition: all 0.3s ease;
    background: linear-gradient(
      to bottom,
      var(--purple-300) 0%,
      var(--purple-400) 100%
    );
    box-shadow:
      inset -2px 12px 11px -5px var(--purple-200),
      inset 1px -3px 11px 0px rgb(0 0 0 / 35%);
  }

  .content::before {
    content: "";
    inset: 0;
    position: absolute;
    z-index: 10;
    width: 80%;
    top: 45%;
    bottom: 35%;
    opacity: 0.7;
    margin: auto;
    background: linear-gradient(to bottom, transparent, var(--purple-400));
    filter: brightness(1.3) blur(5px);
  }

  .char {
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .char span {
    display: block;
    color: transparent;
    position: relative;
  }

  /* One rule, both labels: "JoinToday" and "JoinNow" break after four. */
  .char span:nth-child(5) {
    margin-left: 5px;
  }

  .char.state-1 span:nth-child(5) {
    margin-right: -3px;
  }

  .char.state-1 span {
    animation: charAppear 1.2s ease backwards calc(var(--i) * 0.03s);
  }

  .char.state-1 span::before,
  .char span::after {
    content: attr(data-label);
    position: absolute;
    color: var(--white);
    text-shadow: -1px 1px 2px var(--purple-500);
    left: 0;
  }

  .char span::before {
    opacity: 0;
    transform: translateY(-100%);
  }

  .char.state-2 {
    position: absolute;
    left: 80px;
  }

  .char.state-2 span::after {
    opacity: 1;
  }

  .icon {
    animation: resetArrow 0.8s cubic-bezier(0.7, -0.5, 0.3, 1.2) forwards;
    z-index: 10;
  }

  .icon div,
  .icon div::before,
  .icon div::after {
    height: 3px;
    border-radius: 1px;
    background-color: var(--white);
  }

  .icon div::before,
  .icon div::after {
    content: "";
    position: absolute;
    right: 0;
    transform-origin: center right;
    width: 14px;
    border-radius: 15px;
    transition: all 0.3s ease;
  }

  .icon div {
    position: relative;
    width: 24px;
    box-shadow: -2px 2px 5px var(--purple-400);
    transform: scale(0.9);
    background: linear-gradient(to bottom, var(--white), var(--purple-100));
    animation: swingArrow 1s ease-in-out infinite;
    animation-play-state: paused;
  }

  .icon div::before {
    transform: rotate(44deg);
    top: 1px;
    box-shadow: 1px -2px 3px -1px var(--purple-400);
    animation: rotateArrowLine 1s linear infinite;
    animation-play-state: paused;
  }

  .icon div::after {
    bottom: 1px;
    transform: rotate(316deg);
    box-shadow: -2px 2px 3px 0 var(--purple-400);
    background: linear-gradient(200deg, var(--white), var(--purple-100));
    animation: rotateArrowLine2 1s linear infinite;
    animation-play-state: paused;
  }

  .path {
    position: absolute;
    z-index: 12;
    bottom: 0;
    left: 0;
    right: 0;
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    pointer-events: none;
  }

  .splash {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    stroke-dasharray: 60 60;
    stroke-dashoffset: 60;
    transform: translate(-17%, -31%);
    stroke: var(--purple-300);
  }

  /** STATES */
  /* .words has no base rule in the upload, so there is no opacity to raise
     from and no paused animation on its spans to resume. Both no-ops, kept. */
  .button:hover .words {
    opacity: 1;
  }

  .button:hover .words span {
    animation-play-state: running;
  }

  .button:hover .char.state-1 span::before {
    animation: charAppear 0.7s ease calc(var(--i) * 0.03s);
  }

  .button:hover .char.state-1 span::after {
    opacity: 1;
    animation: charDisappear 0.7s ease calc(var(--i) * 0.03s);
  }

  .button:hover .wrap {
    transform: translate(8px, -8px);
  }

  .button:hover .outline {
    opacity: 1;
  }

  .button:hover .outline::before,
  .button:hover .icon div::before,
  .button:hover .icon div::after,
  .button:hover .icon div {
    animation-play-state: running;
  }

  .button:active .bg::before {
    filter: blur(5px);
    opacity: 0.7;
    box-shadow:
      -7px 6px 0 0 rgb(115 75 155 / 40%),
      -14px 12px 0 0 rgb(115 75 155 / 25%),
      -21px 18px 4px 0 rgb(115 75 155 / 15%);
  }

  .button:active .content {
    box-shadow:
      inset -1px 12px 8px -5px rgba(71, 0, 137, 0.4),
      inset 0px -3px 8px 0px var(--purple-200);
  }

  .button:active .words,
  .button:active .outline {
    opacity: 0;
  }

  .button:active .wrap {
    transform: translate(3px, -3px);
  }

  .button:active .splash {
    animation: splash 0.8s cubic-bezier(0.3, 0, 0, 1) forwards 0.05s;
  }

  .button:focus .path {
    animation: path 1.6s ease forwards 0.2s;
  }

  .button:focus .icon {
    animation: arrow 1s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards;
  }

  .char.state-2 span::after,
  .button:focus .char.state-1 span {
    animation: charDisappear 0.5s ease forwards calc(var(--i) * 0.03s);
  }

  .button:focus .char.state-2 span::after {
    animation: charAppear 1s ease backwards calc(var(--i) * 0.03s);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes charAppear {
    0% {
      transform: translateY(50%);
      opacity: 0;
      filter: blur(20px);
    }
    20% {
      transform: translateY(70%);
      opacity: 1;
    }
    50% {
      transform: translateY(-15%);
      opacity: 1;
      filter: blur(0);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes charDisappear {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-70%);
      opacity: 0;
      filter: blur(3px);
    }
  }

  /* One percent of the duration does the teleport, hidden by opacity 0. */
  @keyframes arrow {
    0% {
      opacity: 1;
    }
    50% {
      transform: translateX(60px);
      opacity: 0;
    }
    51% {
      transform: translateX(-200px);
      opacity: 0;
    }
    100% {
      transform: translateX(-128px);
      opacity: 1;
    }
  }

  @keyframes swingArrow {
    50% {
      transform: translateX(5px) scale(0.9);
    }
  }

  @keyframes rotateArrowLine {
    50% {
      transform: rotate(30deg);
    }
    80% {
      transform: rotate(55deg);
    }
  }

  @keyframes rotateArrowLine2 {
    50% {
      transform: rotate(330deg);
    }
    80% {
      transform: rotate(300deg);
    }
  }

  @keyframes resetArrow {
    0% {
      transform: translateX(-128px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes path {
    from {
      stroke: white;
    }
    to {
      stroke-dashoffset: -480;
      stroke: #f9c6fe;
    }
  }

  @keyframes splash {
    to {
      stroke-dasharray: 2 60;
      stroke-dashoffset: -60;
    }
  }
`;

export default CharSwapJoinButton;
