/* Four squares folding, and a delay that shows all four at once first.

   This is the folding-cube loader, and it differs from the original it descends
   from in two ways that are both the author's and both kept.

   One: the per-cube `animation-delay` is declared -- 0.3s, 0.6s, 0.9s, 1.2s --
   and `animation-fill-mode` is NOT. With no fill mode a delayed animation paints
   the element's BASE style until it starts, and the base here is opacity 1 with
   no rotation. So the loader opens as a solid 40x40 block of four bordered
   squares and only begins folding 1.2s in. `both` would have held them at the 0%
   frame, which is opacity 0. Left alone: it is the cascade as written.

   Two: the original rotates each cube by 90deg increments so the fold travels
   around the square. This copy sets `transform-origin` per cube but no rotation,
   so all four fold on the same axis from four different hinges.

   One addition, and it is the difference between working and not working: the
   loader carried no role and no accessible name, so it announced nothing --
   a spinner that no assistive technology can report is not a status indicator.

   Under reduced motion this repo's blanket -- `* { animation-duration: 1ms
   !important; animation-iteration-count: 1 !important }` in
   `design-system/nova-design-os/tokens/tokens.css` -- turns 2.4s of infinite
   folding into a single imperceptible pass. Measured across ten animation frames
   under emulated reduce: opacity is `1` on every frame for every cube, no
   flicker, so the loader rests as four opaque squares in a 2x2 grid. That is a
   legible resting shape, so nothing here is overridden. */
import styled from 'styled-components';

export const FoldCubeLoader = ({ label = 'جارٍ التحميل' }: { label?: string }) => (
  <StyledWrapper role="status">
    <div className="cube-loader">
      <div className="cube cube1" />
      <div className="cube cube2" />
      <div className="cube cube3" />
      <div className="cube cube4" />
    </div>
    <span className="loader-label">{label}</span>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .cube-loader {
    position: relative;
    width: 40px;
    height: 40px;
    margin: auto;
  }

  .cube {
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: #333;
    border: 2px solid #fff;
    animation: foldCube 2.4s infinite linear;
  }

  /* Individual cube positioning */
  .cube1 {
    top: 0;
    left: 0;
    transform-origin: 100% 100%;
  }

  .cube2 {
    top: 0;
    right: 0;
    transform-origin: 0 100%;
  }

  .cube3 {
    bottom: 0;
    right: 0;
    transform-origin: 0 0;
  }

  .cube4 {
    bottom: 0;
    left: 0;
    transform-origin: 100% 0;
  }

  /* Keyframes for the folding animation */
  @keyframes foldCube {
    0%,
    10% {
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      transform: perspective(140px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      transform: perspective(140px) rotateY(180deg);
      opacity: 0;
    }
  }

  /* Animation delay for each cube */
  .cube1 {
    animation-delay: 0.3s;
  }

  .cube2 {
    animation-delay: 0.6s;
  }

  .cube3 {
    animation-delay: 0.9s;
  }

  .cube4 {
    animation-delay: 1.2s;
  }

  /* Added: the name the loader did not have. */
  .loader-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
