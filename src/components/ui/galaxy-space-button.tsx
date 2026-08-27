/* Twenty-six stars from two elements, one custom property doing all the work, and
   a rule that would have lit this button up whenever ANY button on the page was
   hovered.

   ONE PROPERTY, EVERYTHING. `--active: 0` on the button, `--active: 1` on
   `:is(:hover, :focus-visible)`, and every state in the component is arithmetic on
   it: the saturation `calc(var(--active) * 97%)`, the lightness
   `calc(12% - (var(--active) * 8%))`, the gradient position
   `calc(100px - (var(--active) * 100px))`, the glow spread
   `calc(var(--active) * 6em)`, the scale `calc(1 + (var(--active) * 0.1))`, the
   label lightness `calc(60% + (var(--active) * 26%))`, and the galaxy's own
   `opacity: var(--active)`. There is no `.active` class and no second state block
   -- one number between 0 and 1 is the whole state machine, and because it is a
   custom property it inherits to every descendant that needs it.

   THE STARS. `.galaxy::before` and `::after` are each a single 2x2 dot whose
   `box-shadow` list places copies of itself: twelve offsets on the first, fourteen
   on the second. Twenty-six stars, two elements, no markup. Both run
   `glowing-stars 1s linear alternate infinite` at 0.4s and 0.8s delays, so the two
   constellations breathe out of phase.

   THE NEGATIVE LAYER THAT DOES NOT ESCAPE, AND A CLAIM OF MINE THAT DIED PROVING
   IT. Both star layers carry `z-index: -1` inside `.galaxy`, and four earlier
   uploads in this log put exactly that arrangement behind the whole page, because
   `position: absolute` with `z-index: auto` establishes no stacking context. The
   first reading here was that this is the fifth, and worse -- conditional, since
   `opacity: var(--active)` makes `.galaxy` a stacking context only while the
   opacity is BELOW 1, which is only while the stars are invisible -- so the layers
   would escape at the exact moment they became visible. `isolation: isolate` went
   in as the fix, the same one declaration that fixed the other four.

   It was wrong, and the measurement that was supposed to confirm it refuted it.
   Three screenshots of the same button, stars forced visible, everything else
   equal:

     isolation: isolate   -> 8701a6e4  }  byte-identical: the declaration
     isolation: auto      -> 8701a6e4  }  changes nothing that paints
     translate: none      -> 770320c0     the painting changes here

   `.galaxy` declares `translate: -50% -50%` to centre itself. `translate` is one
   of the individual transform properties, a transformed element IS a stacking
   context, and so `.galaxy` has been one all along -- unconditionally, regardless
   of opacity. The stars never escaped. Replace the translate with equivalent
   margins and they do. So the `isolation` line was removed: it was a divergence
   from the upload with no measured effect, and the upload was right without it.

   And the same property answers the other puzzle in this file, four lines below --
   `translate` on `.text` is why a percentage there resolves against the label.
   One word, used twice for centring, quietly deciding two things nobody reads it
   as deciding.

   THE SHOOTING STARS DO NOT, AND THE REASON IS A PROPERTY NOBODY READS AS A
   TRANSFORM. `.text::before` and `::after` are `position: absolute` at
   `top: -290%`. `.text` is `position: static`, so the obvious reading is that the
   percentage resolves against `.space-button` -- and `offsetParent` agrees, it
   reports the button. Measured, it does not: `top` computes to -95.69px, which is
   -290% of the LABEL's 33px, not -290% of the button's 73.31px (that would be
   -212.61). `.text` carries `translate: 2% -6%`, and `translate` is a transform,
   and a transformed element is a containing block for absolutely positioned
   descendants even when its `position` is `static`. So `offsetParent` and the real
   containing block disagree, and the second one is the one that pays.

   Either way it is clipped. The label sits 18.18px below the button's top edge, so
   the star lands 77.51px ABOVE it, and the button is `overflow: hidden`. The two
   shooting stars never appear. Kept as written: there is no single declaration that
   rescues them without un-clipping the button.

   `:active` ON A DESCENDANT. `.galaxy:active::before` swaps to a `circling`
   animation. `:active` is set on the activated element and its ANCESTORS, and
   `.galaxy` is neither -- it is a sibling of the label. So it fires when the press
   lands on the button's own padding, over the galaxy, and does NOT fire when the
   press lands on the label. One button, two different press animations depending on
   where in it you press. Measured, and left alone, because it is the upload's.

   THE RULE THAT LOOKS LIKE A LEAK AND IS A NO-OP. The upload writes:

       body:has(button:is(:hover, :focus-visible)) { --active: 1 }

   -- on `body`, matching ANY button anywhere in the document. On this showcase,
   which has hundreds, that reads as a leak: hover an unrelated control and this
   button lights up. It was scoped to the component's own wrapper for that reason,
   and then the mutation test put the upload's version back and hovered a tab three
   sections away:

     scoped rule                 --active 0, scale 1, galaxy opacity 0
     upload's body rule restored --active 0, scale 1, galaxy opacity 0

   Identical. The rule cannot reach the button in either form, because
   `.space-button` DECLARES `--active: 0` on itself, and a custom property declared
   on an element beats the same property inherited from an ancestor. It is the
   wave-6 `--bg` lesson read backwards: there a locally-captured property swallowed
   a fallback that was meant to arrive; here it swallows an ancestor's override that
   was meant to arrive. Same rule of the cascade, opposite consequence.

   So the `body` selector's only live targets are `.bodydrop` and `.particle-pen`,
   which declare no `--active` of their own -- and the rule immediately below
   already covers those two from the button. Dead twice over, then: shadowed by the
   button, and duplicated by its neighbour. The scoped form is kept because inside a
   scoped stylesheet a `body`-anchored selector cannot match at all, and a rule that
   is merely redundant is better than one that is unmatchable.

   `--play-state: running` is set in three places and read in none. Dead.

   NO FOCUS RING WAS ADDED, and that is a decision rather than an omission:
   `:focus-visible` is in the same `:is()` as `:hover`, so focusing the button turns
   the ground from `hsl(0 0% 12%)` to a red bloom, raises the label from 60% to 86%
   lightness, scales the whole thing to 1.1 and adds a 6em glow. An outline on top
   of that would be decoration, not information.

   `.bodydrop` and `.particle-pen` are named by two selectors and given no
   properties beyond `display: none` on the first. They are vestigial in the
   upload; they are present here so those two selectors still have something to
   match, and they paint nothing. */
import styled from 'styled-components';

export const GalaxySpaceButton = ({ label = 'Space' }: { label?: string }) => (
  <StyledWrapper>
    <div className="galaxy-button">
      <button className="space-button" type="button">
        <span className="backdrop" aria-hidden="true" />
        <span className="galaxy" aria-hidden="true" />
        <span className="text">{label}</span>
      </button>
      <span className="bodydrop" aria-hidden="true" />
      <span className="particle-pen" aria-hidden="true" />
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .text {
    translate: 2% -6%;
    letter-spacing: 0.01ch;
    color: hsl(0 0% calc(60% + (var(--active) * 26%)));
    z-index: 999;
    padding: 0 34px;
    font-weight: 600;
  }

  /* Measured dead: top -290% against .space-button, which is overflow: hidden. */
  .text::before {
    content: "";
    position: absolute;
    top: -290%;
    left: 90%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 4s shootingStar ease-in-out infinite;
    transition: 1s ease;
    z-index: -1;
    animation-delay: 1s;
    display: none;
  }

  .text::after {
    content: "";
    display: none;
    position: absolute;
    top: -290%;
    left: 10%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 7s shootingStar ease-in-out infinite;
    animation-delay: 3s;
  }

  .space-button:hover .text::before,
  .space-button:hover .text::after {
    display: block;
  }

  /* Twelve stars. */
  .galaxy::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow:
      140px 20px #fff,
      425px 20px #fff,
      70px 120px #fff,
      20px 130px #fff,
      110px 80px #fff,
      280px 80px #fff,
      250px 350px #fff,
      280px 230px #fff,
      220px 190px #fff,
      450px 100px #fff,
      380px 80px #fff,
      520px 50px #fff;
    z-index: -1;
    transition: all 1.5s ease-in-out;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0.4s;
  }

  /* Fourteen. Twenty-six between them, and no markup for any of them. */
  .galaxy::after {
    content: "";
    position: absolute;
    top: -150px;
    left: -65px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow:
      490px 330px #fff,
      420px 300px #fff,
      320px 280px #fff,
      380px 350px #fff,
      546px 170px #fff,
      420px 180px #fff,
      370px 150px #fff,
      200px 250px #fff,
      80px 20px #fff,
      190px 50px #fff,
      270px 20px #fff,
      120px 230px #fff,
      350px -1px #fff,
      150px 369px #fff;
    z-index: -1;
    transition: all 2s ease-in-out;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0.8s;
  }

  .space-button {
    --cut: 0.1em;
    --active: 0;
    --bg: radial-gradient(
          120% 120% at 126% 126%,
          hsl(0 calc(var(--active) * 97%) 98% / calc(var(--active) * 0.9)) 40%,
          /* Changed hue to 0 for red */ transparent 50%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      radial-gradient(
          120% 120% at 120% 120%,
          hsl(0 calc(var(--active) * 97%) 70% / calc(var(--active) * 1)) 30%,
          /* Changed hue to 0 for red */ transparent 70%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      hsl(0 calc(var(--active) * 100%) calc(12% - (var(--active) * 8%))); /* Changed hue to 0 for red */
    background: var(--bg);
    font-size: 1.4rem;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    padding: 0.9em 1.3em;
    display: flex;
    align-items: center;
    gap: 0.25em;
    white-space: nowrap;
    border-radius: 2rem;
    position: relative;
    box-shadow:
      0 0 calc(var(--active) * 6em) calc(var(--active) * 3em)
        hsla(12, 97%, 61%, 0.3),
      0 0.05em 0 0
        hsl(0, calc(var(--active) * 97%), calc((var(--active) * 50%) + 30%)) inset,
      0 -0.05em 0 0 hsl(0, calc(var(--active) * 97%), calc(var(--active) * 10%)) inset;
    transition:
      box-shadow 0.25s ease-out,
      scale 0.25s,
      background 0.25s;
    scale: calc(1 + (var(--active) * 0.1));
    transform-style: preserve-3d;
    perspective: 100vmin;
    overflow: hidden;
  }

  .space-button:active {
    scale: 1;
    --bg: radial-gradient(
          120% 120% at 126% 126%,
          hsl(245 calc(var(--active) * 97%) 98% / calc(var(--active) * 0.9)) 40%,
          transparent 50%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      radial-gradient(
          120% 120% at 120% 120%,
          hsl(245 calc(var(--active) * 97%) 70% / calc(var(--active) * 1)) 30%,
          transparent 70%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      hsl(245 calc(var(--active) * 100%) calc(12% - (var(--active) * 8%)));
    box-shadow:
      0 0 calc(var(--active) * 6em) calc(var(--active) * 3em)
        hsl(245 97% 61% / 0.5),
      0 0.05em 0 0
        hsl(245 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
      0 -0.05em 0 0 hsl(245 calc(var(--active) * 97%) calc(var(--active) * 10%)) inset;
    background: var(--bg);
  }

  /* Apply wobble animation on active button */
  .space-button:active .text {
    font-weight: 300;
    animation:
      wobble 0.6s ease-in-out infinite,
      blurMove 1.5s ease-in-out infinite;
    text-shadow:
      5px 5px 20px rgba(255, 255, 255, 0.8),
      10px 10px 30px rgba(255, 0, 255, 0.6);
  }

  /* Wobble animation */
  @keyframes wobble {
    0%,
    100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-2px, -10px);
    }
    50% {
      transform: translate(2px, 3px);
    }
    75% {
      transform: translate(-1px, 5px);
    }
  }

  /* Blur move animation */
  @keyframes blurMove {
    0%,
    100% {
      text-shadow:
        5px 5px 20px rgba(255, 255, 255, 0.8),
        10px 10px 30px rgba(255, 0, 255, 0.6);
    }
    50% {
      filter: blur(1px);
      text-shadow:
        10px 10px 25px rgba(255, 255, 255, 0.8),
        15px 15px 35px rgba(255, 0, 255, 0.6);
    }
  }

  /* .galaxy is a sibling of the label, so this fires for a press on the button's
     padding and not for a press on the word. */
  .galaxy:active::before {
    animation: circling 2s linear infinite; /* Animation for circling effect */
  }

  .galaxy:active::after {
    animation: circling 1.5s linear infinite; /* Animation for circling effect */
  }

  @keyframes circling {
    0% {
      transform: translate(-10px, -20%) rotate(0deg);
    }
    100% {
      transform: translate(-10px, -20%) rotate(200deg);
    }
  }

  .galaxy {
    position: absolute;
    width: 100%;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    overflow: hidden;
    opacity: var(--active);
    transition: opacity 0.25s;
    /* 'translate' here is not only centring: it is what makes this a stacking
       context, which is what keeps the two z-index: -1 star layers inside it.
       Measured -- see the top of the file. */
  }

  @-webkit-keyframes move-x {
    0% {
      translate: -100px 0;
    }
    100% {
      translate: 100px 0;
    }
  }

  @keyframes move-x {
    0% {
      translate: -100px 0;
    }
    100% {
      translate: 100px 0;
    }
  }

  @-webkit-keyframes move-y {
    0% {
      transform: translate(0, -50px);
    }
    100% {
      transform: translate(0, 50px);
    }
  }

  @keyframes move-y {
    0% {
      transform: translate(0, -50px);
    }
    100% {
      transform: translate(0, 50px);
    }
  }

  .backdrop {
    position: absolute;
    inset: var(--cut);
    background: var(--bg);
    border-radius: 2rem;
    transition: background 0.25s;
  }

  /* Scoped: the upload puts this on "body:has(button:is(:hover, :focus-visible))",
     which matches any button in the document. */
  @supports (selector(:has(:is(+ *)))) {
    .galaxy-button:has(button:is(:hover, :focus-visible)) {
      --active: 1;
      --play-state: running;
    }
    .bodydrop {
      display: none;
    }
  }

  .space-button:is(:hover, :focus-visible) ~ :is(.bodydrop, .particle-pen) {
    --active: 1;
    --play-state: running;
  }

  .space-button:is(:hover, :focus-visible) {
    --active: 1;
    --play-state: running;
  }

  .galaxy-button {
    position: relative;
  }

  /* ANIMATIONS */
  @keyframes shootingStar {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateX(-55em) translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateX(-70em) translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateX(0) translateY(0);
      opacity: 0;
    }
  }

  @keyframes glowing-stars {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default GalaxySpaceButton;
