/* Nine rotations, ten balls, and one container the author forgot to turn.

   `.loader:nth-child(2)` through `nth-child(9)` set rotations of 20deg to 160deg
   in twenty-degree steps. Child 1 gets none, so it is the 0deg member: NINE
   tracks spanning 0 to 160. That is only half a turn, and it is right -- each
   track is a 13em BAR, a diameter rather than a radius, so nine diameters twenty
   degrees apart already cover every direction. Rotating one to 180 would put it
   back on top of the first.

   `.loaderA` gets the identical eight rotation rules. But the balls are named
   `.ball0` through `.ball9` -- TEN of them, with delays 0s to 1.8s (ball0 has no
   delay rule, so it is the 0s member). Nine rotated containers, ten balls.

   The tenth container has no `nth-child(10)` rule, so it sits unrotated at 0deg
   alongside the first. Two balls run the same diameter, 1.8s apart in phase. It
   reads fine -- two balls on one line at different points -- and it is almost
   certainly a rule that was never written rather than a design. Kept as
   delivered, and named, because "nine rotations for ten balls" is the sort of
   thing that gets silently rounded up.

   The track is built from a bar plus two shadowed caps, and the caps are cut with
   masks: `mask-image: linear-gradient(to bottom, black calc(100% - 48px),
   transparent)` on the top cap and `to top` on the bottom one. So each cap fades
   out over its last 48px instead of ending on a line -- which is how a 5em and a
   4.5em stub join a 13em bar without either seam being visible.

   `animation: 3.63s move` is not a round number, and the stagger is 0.2s across
   ten balls -- 1.8s of spread inside a 3.63s cycle, leaving 1.83s where the last
   ball has landed and the first has not started again. The pause is the point.

   One addition: `role="status"` and a name. This is a bare stack of divs. */
import styled from 'styled-components';

const TRACKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const BALLS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const BallRingLoader = ({ label = 'جارٍ التحميل' }: { label?: string }) => (
  <StyledWrapper role="status">
    <div className="main">
      <div className="loaders">
        {TRACKS.map((i) => (
          <div className="loader" key={i} />
        ))}
      </div>
      <div className="loadersB">
        {BALLS.map((i) => (
          <div className="loaderA" key={i}>
            <div className={`ball${i}`} />
          </div>
        ))}
      </div>
    </div>
    <span className="loader-label">{label}</span>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  font-size: 8px;

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 13em;
    height: 13em;
  }

  .loaders,
  .loadersB {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: #e0e0e0;
  }

  .loader:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1.15em;
    height: 5em;
    background: #e0e0e0;
    border-radius: 50px;
    border: 1px solid #e2e2e2;
    box-shadow:
      inset 5px 5px 15px #d3d2d2ab,
      inset -5px -5px 15px #e9e9e9ab;
    mask-image: linear-gradient(
      to bottom,
      black calc(100% - 48px),
      transparent 100%
    );
  }

  .loader::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.15em;
    height: 4.5em;
    background: #e0e0e0;
    border-radius: 50px;
    border: 1px solid #e2e2e2;
    box-shadow:
      inset 5px 5px 15px #d3d2d2ab,
      inset -5px -5px 15px #e9e9e9ab;
    mask-image: linear-gradient(
      to top,
      black calc(100% - 48px),
      transparent 100%
    );
  }

  .loaderA {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: transparent;
  }

  .ball0,
  .ball1,
  .ball2,
  .ball3,
  .ball4,
  .ball5,
  .ball6,
  .ball7,
  .ball8,
  .ball9 {
    width: 1.15em;
    height: 1.15em;
    box-shadow:
      rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px,
      rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px,
      rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px,
      0px -1px 15px -8px rgba(0, 0, 0, 0.09);
    border-radius: 50%;
    transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
    background-color: rgb(232, 232, 232, 1);
    animation: 3.63s move ease-in-out infinite;
  }

  .loader:nth-child(2) {
    transform: rotate(20deg);
  }
  .loader:nth-child(3) {
    transform: rotate(40deg);
  }
  .loader:nth-child(4) {
    transform: rotate(60deg);
  }
  .loader:nth-child(5) {
    transform: rotate(80deg);
  }
  .loader:nth-child(6) {
    transform: rotate(100deg);
  }
  .loader:nth-child(7) {
    transform: rotate(120deg);
  }
  .loader:nth-child(8) {
    transform: rotate(140deg);
  }
  .loader:nth-child(9) {
    transform: rotate(160deg);
  }

  .loaderA:nth-child(2) {
    transform: rotate(20deg);
  }
  .loaderA:nth-child(3) {
    transform: rotate(40deg);
  }
  .loaderA:nth-child(4) {
    transform: rotate(60deg);
  }
  .loaderA:nth-child(5) {
    transform: rotate(80deg);
  }
  .loaderA:nth-child(6) {
    transform: rotate(100deg);
  }
  .loaderA:nth-child(7) {
    transform: rotate(120deg);
  }
  .loaderA:nth-child(8) {
    transform: rotate(140deg);
  }
  .loaderA:nth-child(9) {
    transform: rotate(160deg);
  }

  .ball1 {
    animation-delay: 0.2s;
  }
  .ball2 {
    animation-delay: 0.4s;
  }
  .ball3 {
    animation-delay: 0.6s;
  }
  .ball4 {
    animation-delay: 0.8s;
  }
  .ball5 {
    animation-delay: 1s;
  }
  .ball6 {
    animation-delay: 1.2s;
  }
  .ball7 {
    animation-delay: 1.4s;
  }
  .ball8 {
    animation-delay: 1.6s;
  }
  .ball9 {
    animation-delay: 1.8s;
  }

  @keyframes move {
    0% {
      transform: translateY(0em);
    }
    50% {
      transform: translateY(12em);
    }
    100% {
      transform: translateY(0em);
    }
  }

  .loader-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
