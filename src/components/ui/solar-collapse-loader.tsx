/* Two scenes in one four-second loop, and the cut between them is made by
   animating everything to zero.

   Every animation in this file is 4s and every one has the same four-part shape:

     0 - 40%   the solar system runs
     40 - 50%  every element shrinks to width: 0; height: 0
     50 - 90%  the black hole holds
     90 - 100% back again

   There is no cross-fade and no opacity between the scenes. The sun, the three
   orbits and the star all animate their WIDTH AND HEIGHT to zero at the 50% mark
   while the black hole and its two disks animate up from zero at the same instant.
   The scene change is a collapse, which is a strange and rather good way to cut:
   the first scene implodes and the second grows out of the same point.

   The three orbits do not turn by the same amount:

     #planetTrail1  rotate(360deg)   the full turn
     #planetTrail2  rotate(250deg)
     #planetTrail3  rotate(170deg)

   Different arcs in the same 40%, so the three planets visibly drift out of phase
   -- an orbital period difference expressed as three numbers rather than three
   durations. Had they all been 360deg the whole system would have moved as one
   rigid disc.

   The accretion disk is two elements and a pair of clip-paths:

     #blackHoleDisk1  clip-path: inset(50% 0 0 0)   rotateX(70deg)   black
     #blackHoleDisk2  clip-path: inset(0 0 50% 0)   rotateX(55deg)   orange

   The bottom half of one ring and the top half of another, at DIFFERENT tilts and
   different colours. That is how you draw a ring that passes both in front of and
   behind a sphere using two flat elements: the near half is the bright one, the
   far half is the dark one, and the 15-degree tilt difference keeps them from
   meeting in a straight line.

   `#planet` animates `z-index` from 1 to 0 at the 71% mark, so it passes BEHIND
   the black hole partway through its arc. z-index is animatable as an integer and
   steps rather than interpolating, which is exactly what an occlusion needs.

   The orbits are drawn with `outline` rather than `border`, so the rings add no
   size to the elements they circle -- which matters here because those same
   elements have their width and height animated.

   One addition: the whole thing is a stack of nine divs with literal ids and no
   role. `role="img"` with a name, because it is one picture and not nine. */
import styled from 'styled-components';

export const SolarCollapseLoader = ({
  label = 'نظامٌ شمسيٌّ ينهارُ إلى ثقبٍ أسود',
}: { label?: string }) => (
  <StyledWrapper role="img" aria-label={label}>
    <div className="planets">
      <div id="planetTrail1" />
      <div id="planetTrail2" />
      <div id="planetTrail3" />
      <div id="starShadow" />
      <div id="star" />
      <div id="blackHoleDisk1" />
      <div id="blackHole" />
      <div id="blackHoleDisk2" />
      <div id="planet" />
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: grid;
  place-items: center;
  width: 240px;
  height: 240px;

  .planets {
    position: relative;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #planetTrail1,
  #planetTrail2,
  #planetTrail3 {
    outline: solid rgb(101, 101, 101) 1px;
    border-radius: 50%;
    position: absolute;
  }

  #planetTrail1::after,
  #planetTrail2::after,
  #planetTrail3::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }

  #planetTrail1::after {
    background-color: rgb(213, 213, 120);
  }

  #planetTrail2::after {
    background-color: rgb(115, 174, 231);
  }

  #planetTrail3::after {
    background-color: rgb(180, 73, 49);
  }

  #planetTrail1 {
    width: 120px;
    height: 120px;
    animation: trails1 4s infinite;
  }

  #planetTrail2 {
    width: 170px;
    height: 170px;
    animation: trails2 4s infinite;
  }

  #planetTrail3 {
    width: 220px;
    height: 220px;
    animation: trails3 4s infinite;
  }

  @keyframes trails1 {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(360deg);
      width: 120px;
      height: 120px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 120px;
      height: 120px;
    }
  }

  @keyframes trails2 {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(250deg);
      width: 170px;
      height: 170px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 170px;
      height: 170px;
    }
  }

  @keyframes trails3 {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(170deg);
      width: 220px;
      height: 220px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 220px;
      height: 220px;
    }
  }

  #star {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgb(255, 170, 0);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: bouncingStar 4s infinite;
  }

  #starShadow {
    position: absolute;
    width: 50px;
    height: 20px;
    background-color: rgb(255, 170, 0);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
    filter: blur(5px);
    opacity: 0.3;
    animation: shadowAnimation 4s infinite;
  }

  @keyframes bouncingStar {
    0% {
      transform: translate(-50%, -50%);
    }
    10% {
      transform: translate(-50%, -30%);
    }
    20% {
      transform: translate(-50%, -50%);
    }
    30% {
      transform: translate(-50%, -30%);
    }
    40% {
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 50px;
      height: 50px;
    }
  }

  @keyframes shadowAnimation {
    0% {
      opacity: 0.1;
    }
    10% {
      opacity: 0.4;
    }
    20% {
      opacity: 0.1;
    }
    30% {
      opacity: 0.4;
    }
    40% {
      opacity: 0.1;
    }
    50% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0.1;
    }
  }

  #blackHole {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgb(0, 0, 0);
    outline: orange solid 5px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: bouncingBlackHole 4s infinite;
  }

  @keyframes bouncingBlackHole {
    0% {
      height: 0px;
      width: 0px;
    }
    40% {
      width: 0px;
      height: 0px;
    }
    50% {
      width: 50px;
      height: 50px;
    }
    90% {
      width: 50px;
      height: 50px;
    }
    100% {
      width: 0px;
      height: 0px;
    }
  }

  #blackHoleDisk1 {
    position: absolute;
    width: 68px;
    height: 68px;
    clip-path: inset(50% 0 0 0);
    border: black 10px solid;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(70deg);
    animation: diskAn 4s infinite;
  }

  #blackHoleDisk2 {
    position: absolute;
    width: 70px;
    height: 70px;
    clip-path: inset(0 0 50% 0);
    border: rgb(245, 174, 8) 10px solid;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(55deg);
    animation: diskAn 4s infinite;
  }

  @keyframes diskAn {
    0% {
      height: 0px;
      width: 0px;
      border: orange 0px solid;
    }
    40% {
      width: 0px;
      height: 0px;
      border: orange 0px solid;
    }
    50% {
      width: 88px;
      height: 88px;
      border: orange 18px solid;
    }
    90% {
      width: 88px;
      height: 88px;
      border: orange 18px solid;
    }
    100% {
      width: 0px;
      height: 0px;
      border: orange 0px solid;
    }
  }

  #planet {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    animation: planetAn 4s infinite;
  }

  @keyframes planetAn {
    0% {
      opacity: 0;
      transform: translate(0px, 0px);
      z-index: 1;
    }
    50% {
      opacity: 0;
      transform: translate(0px, 0px);
      z-index: 1;
    }
    58% {
      opacity: 1;
    }
    70% {
      opacity: 1;
      transform: translate(100px, 40px);
      z-index: 1;
    }
    71% {
      z-index: 0;
    }
    90% {
      z-index: 0;
      opacity: 1;
      transform: translate(-10px, 70px);
    }
    100% {
      transform: translate(-10px, 70px);
      opacity: 0;
    }
  }
`;
