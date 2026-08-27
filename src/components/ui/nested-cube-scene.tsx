/* Two cubes turning opposite ways, and four negative animation-delays that put
   one animation on four faces at four different phases.

   Uploads 35 and 36 are byte-identical after normalisation. One tool.

   THE NEGATIVE DELAYS. All four side faces run the same `blur` animation, and
   they are offset by:

     face-front  0
     face-right  calc(var(--duration) * -0.75)
     face-back   calc(var(--duration) * -0.5)
     face-left   calc(var(--duration) * -0.25)

   A NEGATIVE delay does not wait -- it starts the animation already part-way
   through. So one seven-second keyframe list is playing on four faces at four
   phases a quarter apart, and the blur travels around the cube. Four positive
   delays would have made the first face blur, then the second, then a gap; four
   negative ones make it continuous from the first frame. Measured:

     face-front  blur  delay 0s        face-top     none
     face-right  blur  delay -5.25s    face-bottom  none
     face-back   blur  delay -3.5s
     face-left   blur  delay -1.75s

   -5.25, -3.5 and -1.75 are exactly -0.75, -0.5 and -0.25 of the 7s duration.

   And `face-top` and `face-bottom` set `animation: none`. The blur only travels
   around the SIDES, because a cube seen from above has no horizon for it to cross.

   THE TWO CUBES COUNTER-ROTATE. `.cube-outer` runs `rotate ... reverse` and
   `.cube-inner` runs it forward, both at the same duration -- so the inner cube
   turns against the shell at exactly twice the relative rate. And the two shadows
   do the same: `.cube-shadow` forward, `:nth-child(2)` reversed.

   `clamp()` IS THE AUTHOR'S GUARD RAIL, AND THEY DOCUMENTED IT. Every tunable
   custom property is used through a clamp, and the comment gives the range:

     --inner-multiplier: 0.5   with an inline note "[0.1,0.6]"
                               used as clamp(0.1, ..., 0.6)
     --angle: -10deg           with an inline note "[-40,40]"
                               used as clamp(-40deg, ..., 40deg)

   (Those two notes are written as CSS comments in the upload. Quoting them
   verbatim inside THIS comment closed it early and broke the build -- a nested
   comment terminator is a new way to lose a file in this log, after five rounds
   of losing them to backticks.)

   So the knobs cannot be turned into a broken scene. That is rare enough in this
   log to be worth naming: most uploads read a custom property raw and trust the
   consumer.

   `.cube-inner`'s `top: calc((1 - var(--inner-scale)) * var(--cube-size) / 2)`
   is the correction for scaling from the wrong origin -- a scaled box shrinks
   toward its top-left, so it is pushed back down by half of what it lost.

   `overflow: clip` on the faces rather than `hidden`: clip does not create a
   scroll container, which matters on an element inside a `preserve-3d` subtree
   because `overflow: hidden` would flatten it -- the same mechanism that broke
   the swipe control in wave 3.

   One addition: nine divs and no role. The scene says "Processing / Please wait"
   on its faces, so the name is real content rather than invented -- `role="img"`
   carrying it, with the faces hidden so the words are not read four times as the
   cube turns. */
import styled from 'styled-components';

const FACES = ['front', 'right', 'back', 'left', 'top', 'bottom'] as const;
const WORDS: Record<string, string> = { front: 'Processing', right: 'Please wait', back: '...', left: '...' };

export const NestedCubeScene = ({
  label = 'Processing, please wait',
}: { label?: string }) => (
  <StyledWrapper role="img" aria-label={label}>
    <div className="scene">
      <div className="light" />
      <div className="shadow" />
      <div className="cube-shadow" />
      <div className="cube-shadow" />
      <div className="cube-outer blur" aria-hidden="true">
        {FACES.map((f) => (
          <div className={`face face-${f} bg-color-out`} key={f}>
            {WORDS[f] ?? ''}
          </div>
        ))}
      </div>
      <div className="cube-inner" aria-hidden="true">
        {FACES.map((f) => (
          <div className={`face face-${f} bg-color-in`} key={f} />
        ))}
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: grid;
  place-items: center;
  width: 260px;
  height: 260px;

  .scene {
    --cube-size: 120px;
    --inner-multiplier: 0.5; /* [0.1,0.6] */
    --color-inner: hsla(85, 100%, 50%, 0.85);
    --color-outer: hsla(170, 70%, 50%, 0.2);
    --blur: 2px;
    --angle: -10deg; /* [-40,40] */
    --duration: 7s;

    position: relative;
    width: var(--cube-size);
    height: var(--cube-size);
    perspective: 750px;
  }

  .cube-outer,
  .cube-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
  }

  .cube-inner {
    --inner-scale: clamp(0.1, var(--inner-multiplier), 0.6);

    scale: var(--inner-scale);
    top: calc((1 - var(--inner-scale)) * var(--cube-size) / 2);
  }

  .face {
    user-select: none;
    display: grid;
    place-items: center;
    position: absolute;
    width: var(--cube-size);
    height: var(--cube-size);
    box-shadow:
      inset 0 0 2px 0 #fff5,
      inset 0 0 12px -8px #fff1,
      inset 0 0 32px -10px #fff1,
      inset 0 0 64px -8px #fff1,
      inset 0 0 32px 16px #00000015;
    overflow: clip;
    font:
      500 1em "Inter",
      sans-serif;
    letter-spacing: -0.01em;
    color: #111;
    text-shadow:
      0 3px 4px #0008,
      0 -6px 6px #0005;
    animation: blur var(--duration, 10s) linear infinite reverse;

    &.face-front {
      transform: rotateY(0deg) translateZ(calc(var(--cube-size) / 2));
      animation-delay: 0s;
    }

    &.face-right {
      transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));
      animation-delay: calc(var(--duration, 10s) * -0.75);
    }

    &.face-back {
      transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));
      animation-delay: calc(var(--duration, 10s) * -0.5);
    }

    &.face-left {
      transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));
      animation-delay: calc(var(--duration, 10s) * -0.25);
    }

    &.face-top {
      transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));
      animation: none;
    }

    &.face-bottom {
      transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));
      filter: blur(20px);
      animation: none;
    }
  }

  .cube-inner .face {
    animation: none;
    box-shadow:
      inset 0 0 1px 0px #000e,
      inset 0 0 12px -2px #0005,
      inset 0 0 32px 0px #0001,
      inset 0 0 64px 8px #0001;
  }

  @keyframes blur {
    0%,
    9% {
      filter: blur(0px);
    }
    10%,
    64% {
      filter: blur(10px);
    }
    65%,
    100% {
      filter: blur(0px);
    }
  }

  .bg-color-in {
    background: var(--color-inner);
  }

  .bg-color-out {
    background-color: var(--color-outer);
    background: linear-gradient(to bottom, #fff5, #0000),
      radial-gradient(
        circle at 50% -50%,
        var(--color-inner) -20%,
        #fff0 30%,
        var(--color-outer)
      );
  }

  .cube-outer,
  .cube-inner {
    transform: rotateX(-20deg) rotateY(45deg);
  }

  .cube-inner {
    position: absolute;
    transform-origin: center;
    scale: clamp(0.1, var(--inner-multiplier), 0.6);
    animation: rotate var(--duration, 10s) linear infinite;
  }

  .cube-outer {
    animation: rotate var(--duration, 10s) linear infinite reverse;
  }

  @keyframes rotate {
    from {
      transform: rotateX(clamp(-40deg, var(--angle), 40deg)) rotateY(45deg);
    }
    to {
      transform: rotateX(clamp(-40deg, var(--angle), 40deg)) rotateY(405deg);
    }
  }

  .blur {
    filter: blur(clamp(1px, var(--blur, 7px), 20px));
  }

  .cube-shadow {
    inset: 25%;
    transform-style: preserve-3d;
    position: absolute;
    background-color: #00000015;
    filter: blur(5px);
    animation: rotate-shadow var(--duration, 10s) linear infinite;
    z-index: 1;
    mix-blend-mode: multiply;
  }

  .cube-shadow:nth-child(2) {
    inset: 0%;
    transform-style: preserve-3d;
    position: absolute;
    background-color: #00000015;
    filter: blur(5px);
    animation: rotate-shadow var(--duration, 10s) linear infinite reverse;
    z-index: 0;
  }

  @keyframes rotate-shadow {
    from {
      transform: rotateX(calc(-100deg + clamp(-40deg, var(--angle), 40deg)))
        rotateZ(45deg) translateZ(calc(var(--cube-size) / 1.5));
    }
    to {
      transform: rotateX(calc(-100deg + clamp(-40deg, var(--angle), 40deg)))
        rotateZ(405deg) translateZ(calc(var(--cube-size) / 1.5));
    }
  }

  .scene .shadow {
    position: absolute;
    top: 45%;
    left: 35%;
    width: 50%;
    aspect-ratio: 1 / 1.5;
    background-color: #999;
    border-radius: 50%;
    transform: rotate(45deg);
    filter: blur(24px);
    mix-blend-mode: color-burn;
  }

  .scene .light {
    position: absolute;
    background-color: #555b;
    filter: blur(30px);
    mix-blend-mode: color-dodge;
    inset: 22%;
  }

  .scene::before {
    content: "";
    position: absolute;
    inset: -100%;
    top: 50%;
    background-color: #0002;
    filter: blur(70px);
  }
`;
