/* The fourth battery card in these uploads, and the first one whose negative
   z-index stays where it was put.

   FOUR CARDS, FOUR MECHANISMS. The other three read the pointer with nine
   invisible hover zones, or tilt on a single transform, or do not tilt at all.
   This one changes the PERSPECTIVE instead: `perspective: 1500px` on the
   container drops to `1000px` on hover. A shorter perspective is a closer eye, so
   the same `rotateY(16deg)` on the card reads as a stronger turn without the
   rotation changing at all. Nothing else in these uploads animates the camera.

   THE NEGATIVE LAYER THAT WORKED. `.s_path` carries `z-index: -1`, and four
   earlier uploads in this log put a negative layer behind the whole page because
   `position: relative` establishes no stacking context. Here it stays put, and the
   reason is one property: `.card-container` declares `perspective: 1500px`, and a
   perspective other than `none` DOES establish a stacking context (and a
   containing block for fixed and absolute descendants). So the same declaration
   that makes the camera move is also what keeps the backdrop from falling through
   the floor. Measured on the page: the backdrop paints behind the card and in
   front of the section.

   THE SIX BARS THAT ARE NOT 60px. `.bat_bar { width: 60px }` x 6, in a
   `display: flex` row with `gap: 0.2rem`. The chain is measured, not estimated:
   the card is 300px, its 2px borders leave a 296px padding box, `.main_card` is
   `width: 100%` of that, its `padding: 2rem` leaves 232px, and the row inherits
   all 232. Six 60px bars plus five 3.2px gaps ask for 376px of it. Flex items
   shrink by default, so each bar computes to 36.0156px -- and paints at 25.21px,
   because `.card-container` scales everything by 0.7. Three different widths for
   one declaration: 60 asked, 36 laid out, 25 seen. The 60px is a maximum that
   never obtains, which is why the row reads even rather than clipped:
   `overflow: hidden` on the card never has anything to clip.

   The six `transition-delay` steps -- 0.05s to 0.3s in 0.05s increments -- are
   what makes the row read left to right rather than as one block, and they are
   `nth-child` on `.bat_bar`, so the bars must be the only children of
   `.battery_bar`. They are.

   THE GLOWS ARE ALL SHADOW. `.glow` is a 100x100 box with no background at all;
   everything it shows is `box-shadow`, four at once -- two coloured blooms at 200px
   and 100px spread, and two hard black/`#222` shadows offset +-300px that mask the
   bloom left and right. On hover `.glow2` swaps to a 400px green bloom and drops
   the maskers' blur to 0px. So the "light" is a shadow, and the shape of the light
   is two more shadows cutting it.

   FOUR THINGS THE UPLOAD NEEDS AND DOES NOT SUPPLY.

   1. A HEIGHT. `.card-container` is `width: 100%; height: 100%` and its only
      sized child is `position: absolute`, so in normal flow it collapses to zero
      and nothing shows. The wrapper here is given a height: the card is 280px, the
      backdrop 400px at `scale(1.05)`, and the container scales everything by 0.7 --
      420 * 0.7 = 294 -- plus room for the hover `translateY(-20px)` and
      `scale(1.1)`. Stated as added, because it is layout the file omits.

   2. THE BACKDROP DRAWING. `.s_path` is a 350x400 flex-centred box holding an
      `<svg>` that is not in the upload, rotated 60deg on hover. Unlike the sunset
      upload -- 53 numbered paths, which is a new painting, not an implementation --
      this is ONE path, and the class name, the box, and the rotation say what it
      is: an S-curve stroke wide enough to show past a 300px card. Drawn here and
      declared inferred; every dimension around it is the upload's.

   3. THE ICONS. `flash_fill` in the markup is a Material Symbols ligature, so the
      upload reached for an icon font. Three strokes are drawn instead -- a bolt, a
      heart, a cycle arrow -- because the CSS asks only that they be `svg` children
      of `.charging` and `.battery_health` and take a `drop-shadow` on hover.
      Inferred, and no dimension of theirs is load-bearing.

   4. A REASON TO BE HOVERABLE. `cursor: pointer` on a card with no action is the
      upload's, and it is kept -- but nothing here is made a control, because
      nothing here does anything. The card is a readout, so it is text.

   `@keyframes float` is declared and never used. Dead in the upload, kept dead
   here rather than deleted, since deleting it would be a change with no effect. */
import styled from 'styled-components';

const Bolt = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20z" />
  </svg>
);

const Cycle = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 4v4h-4" strokeLinecap="round" />
  </svg>
);

/* Inferred: the upload gives .s_path a 350x400 box, a scale(1.05), a rotate(60deg)
   on hover and a name. One stroked S, wide enough to show past a 300px card. */
const Backdrop = () => (
  <svg viewBox="0 0 350 400" width="350" height="400" fill="none" aria-hidden="true">
    <path
      d="M60 60C60 130 290 130 290 200S60 270 60 340"
      stroke="#3a3b3a"
      strokeWidth={14}
      strokeLinecap="round"
    />
  </svg>
);

export const PerspectiveBatteryCard = ({
  percent = '69%',
  state = 'CHARGING',
  health = '96% BATTERY HEALTH',
  cycles = '215 CYCLES',
}: { percent?: string; state?: string; health?: string; cycles?: string }) => (
  <StyledWrapper>
    <div className="card-container">
      <div className="card">
        <span className="glow glow1" />
        <span className="glow glow2" />
        <div className="main_card">
          <div className="main_card-content">
            <div className="battery">{percent}</div>
            <div className="charging">
              <Bolt />
              {state}
            </div>
            <div className="battery_health">
              <Heart />
              {health}
            </div>
            <div className="battery_health">
              <Cycle />
              {cycles}
            </div>
            <div className="battery_bar">
              <span className="bat_bar" />
              <span className="bat_bar" />
              <span className="bat_bar" />
              <span className="bat_bar" />
              <span className="bat_bar" />
              <span className="bat_bar" />
            </div>
          </div>
        </div>
      </div>
      <div className="s_path">
        <Backdrop />
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  /* Added: .card-container is width/height 100% over an absolutely positioned
     card, so in flow it has no height at all. 294px is the backdrop at its own
     scale; the rest is headroom for the hover lift. */
  height: 340px;
  display: grid;
  place-items: center;

  .card-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    transform: scale(0.7);
    transition: all 0.3s ease-in-out;
    perspective: 1500px;
  }

  .card-container:hover {
    perspective: 1000px;
  }

  .card {
    position: absolute;
    width: 300px;
    height: 280px;
    background-color: #232423;
    border-radius: 48px;
    border: 2px solid #434443;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset 2px 2px 12px #1a1919,
      inset -2px -2px 6px #232423,
      0 20px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: scale(1.1) rotateY(16deg) translateY(-20px);
  }

  .main_card {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in-out;
  }

  .card:hover .main_card {
    transform: translateZ(60px);
  }

  .glow {
    position: absolute;
    bottom: -40%;
    left: -25%;
    width: 100px;
    height: 100px;
    box-shadow:
      0 0 200px #f6f4bb,
      0 0 100px #ffffff,
      300px -50px 100px #000,
      -300px -50px 100px #222;
    transition: all 0.5s ease-out;
  }

  .card:hover .glow1 {
    filter: brightness(0.5);
  }

  .glow2 {
    top: -25%;
    left: 100%;
  }

  .card:hover .glow2 {
    filter: brightness(2);
    box-shadow:
      0 0 400px #00ff62,
      0 0 100px #06ff66,
      300px -50px 0px #000,
      -300px -50px 0px #222;
  }

  .main_card-content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #8d8e8d;
    gap: 1rem;
    transform-style: preserve-3d;
    transform: perspective(600px);
  }

  .card:hover .main_card .main_card-content {
    transform: perspective(1000px);
  }

  .battery {
    color: #f6f6f6;
    font-size: 48px;
    font-family: Optima, sans-serif;
    transform: translateZ(5px);
    transition: all 0.3s ease-out;
  }

  .battery::after {
    content: "6 min remaining...";
    font-size: 0.875rem;
    color: #ff6106;
    margin-left: 6px;
    text-wrap: wrap;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover .battery::after {
    opacity: 1;
    text-shadow: none;
  }

  .card:hover .battery {
    transform: translateZ(40px);
    text-shadow: 0 0 10px rgba(246, 246, 246, 0.3);
  }

  .charging {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateZ(0);
    transition: all 0.3s ease-out;
    transition-delay: 0.2s;
  }

  .card:hover .charging {
    transform: translateZ(30px) translateY(-6px);
  }

  .card:hover .charging svg {
    filter: drop-shadow(0 0 3px rgba(141, 142, 141, 0.5));
  }

  .battery_health {
    transform: translateZ(0);
    transition: all 0.3s ease-out 0.05s;
    transition-delay: 0.3s;
    /* Added with the second row: the upload's markup puts an icon beside each of
       these lines and the rule sets no layout, so the row would stack. */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
  }

  .card:hover .battery_health {
    transform: translateZ(25px) translateY(-6px);
  }

  .card:hover .battery_health svg {
    filter: drop-shadow(0 0 2px rgba(141, 142, 141, 0.4));
  }

  .battery_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    transform: translateZ(0);
    transition: all 0.3s ease-out;
    transition-delay: 0.4s;
  }

  .card:hover .battery_bar {
    transform: translateZ(20px) translateY(-6px);
  }

  .bat_bar {
    width: 60px;
    height: 4px;
    background: #06ff66;
    border-radius: 6px;
    transition: all 0.3s ease-out;
  }

  .card:hover .bat_bar {
    height: 5px;
    filter: drop-shadow(0 0 4px rgba(6, 255, 102, 0.6));
  }

  .s_path {
    position: absolute;
    width: 350px;
    height: 400px;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s ease-out;
  }

  .card:hover + .s_path {
    transform: translateZ(-50px) scale(1.03);
  }

  .s_path svg {
    transform: scale(1.05);
    transition: transform 0.5s ease-out;
  }

  .card:hover + .s_path svg {
    transform: rotate(60deg) scale(1.1);
  }

  .card:hover .bat_bar:nth-child(1) {
    transition-delay: 0.05s;
  }

  .card:hover .bat_bar:nth-child(2) {
    transition-delay: 0.1s;
  }

  .card:hover .bat_bar:nth-child(3) {
    transition-delay: 0.15s;
  }

  .card:hover .bat_bar:nth-child(4) {
    transition-delay: 0.2s;
  }

  .card:hover .bat_bar:nth-child(5) {
    transition-delay: 0.25s;
  }

  .card:hover .bat_bar:nth-child(6) {
    transition-delay: 0.3s;
  }

  /* Declared and never used in the upload. Kept dead rather than deleted: a
     deletion with no effect is still a change to a file the owner sent as-is. */
  @keyframes float {
    50% {
      transform: translateY(-6px);
    }
  }

  @media (hover: hover) {
    .card-container:hover .card {
      transition: transform 0.2s ease;
    }

    .card-container:hover .card:hover {
      transition: transform 0.3s ease;
    }
  }
`;

export default PerspectiveBatteryCard;
