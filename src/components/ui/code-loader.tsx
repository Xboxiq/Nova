/* The seventh upload, and the second to arrive as CSS alone: no JSX, no markup,
   not one tag. As with the bookmark, the selectors and the numbers fix the tree
   rather than leaving it to taste — and this one is fixed by ARITHMETIC as much
   as by combinators:

     `.track, .car { fill: none; stroke-width: 2.5 }`   both are SVG shapes
     `.container { overflow: visible }`                 the <svg> itself, and the
       line only means something if the stroke SPILLS past the viewBox — which is
       what a 2.5-wide stroke on a rect flush to the box edge does, 1.25 out on
       each side. So the rect is 0,0,40,40 in a 0 0 40 40 box, not inset.
     `.car { stroke-dasharray: 25 75 }` + `borderMove: dashoffset 100 → 0`
       25 + 75 = 100, and one lap is exactly 100. That only lines up if the path
       measures 100, so `pathLength={100}` is on both shapes: it is the one value
       under which the author's numbers are a seamless loop instead of a pattern
       that drifts by whatever the real perimeter happens to be.
     `.lines line:nth-child(1..4) { --len: 20 | 14 | 24 | 10 }`
       four <line> elements, direct children of `.lines`, in that order — and
       `--len` is BOTH the dasharray and the dashoffset, so each line's geometric
       length has to equal its own `--len` or the reveal under-runs or over-runs.
       Hence x2 - x1 = 20, 14, 24, 10 exactly.
     `.lines .indent { stroke: #4f8cff }`  at least one line is indented, and it
       is coloured rather than grey: the nested lines of a code block.

   styled-components again, because it is already a dependency and this is plain
   CSS. */
import styled from 'styled-components';

export const CodeLoader = ({ label = 'Loading' }: { label?: string }) => {
  return (
    <StyledWrapper>
      {/* `role="status"` with a name, and the drawing hidden from the reader.
          A loader nobody is told about is a decoration: this is the whole point
          of the component, and the SVG carries none of it. `aria-live` is
          implicit in `role="status"`, so it is not repeated. */}
      <div className="loader" role="status" aria-label={label}>
        <svg
          className="container"
          viewBox="0 0 40 40"
          width={48}
          height={48}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <rect className="track" x={0} y={0} width={40} height={40} rx={10} pathLength={100} />
          <rect className="car" x={0} y={0} width={40} height={40} rx={10} pathLength={100} />
          <g className="lines">
            <line x1={8} y1={10} x2={28} y2={10} />
            <line className="indent" x1={12} y1={17} x2={26} y2={17} />
            <line x1={8} y1={24} x2={32} y2={24} />
            <line className="indent" x1={12} y1={31} x2={22} y2={31} />
          </g>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    overflow: visible;
  }

  .track,
  .car {
    fill: none;
    stroke-width: 2.5;
  }

  .track {
    stroke: #d0d0d0;
  }

  .car {
    stroke: #4f8cff;
    stroke-linecap: round;
    stroke-dasharray: 25 75;
    animation: borderMove 2s linear infinite;
  }

  .lines line {
    stroke: #666;
    stroke-width: 3;
    stroke-dasharray: var(--len);
    stroke-dashoffset: var(--len);
    animation: typeLine 2.4s ease-in-out infinite;
  }

  .lines .indent {
    stroke: #4f8cff;
  }

  .lines line:nth-child(1) {
    --len: 20;
    animation-delay: 0s;
  }

  .lines line:nth-child(2) {
    --len: 14;
    animation-delay: 0.3s;
  }

  .lines line:nth-child(3) {
    --len: 24;
    animation-delay: 0.6s;
  }

  .lines line:nth-child(4) {
    --len: 10;
    animation-delay: 0.9s;
  }

  @keyframes borderMove {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes typeLine {
    0% {
      stroke-dashoffset: var(--len);
      opacity: 0.3;
    }
    35%,
    70% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 0.15;
    }
  }

  /* A loader is the one component where switching every animation off is a
     REGRESSION, not a courtesy: a still drawing says nothing, and the reader who
     asked for less motion still needs to know the page is working. So under the
     preference the two travelling animations are replaced rather than removed —
     the dash stops orbiting and the lines stop typing, and the car breathes in
     place instead. Opacity, not translation: no movement across the screen,
     which is what a vestibular disorder reacts to, and the signal survives.
     The lines are pinned drawn (dashoffset 0) so the code block still reads. */
  @media (prefers-reduced-motion: reduce) {
    /* The two !important lines are aimed at ONE rule and were written only after
       it was measured. This repo's token layer carries a blanket

           *, *::before, *::after {
             animation-duration: 1ms !important;
             animation-iteration-count: 1 !important;
           }

       under the same query, and it is right about almost everything — but it
       cannot tell "stop this decoration" from "stop the only thing telling the
       reader the page is working". Measured with the pulse written normally:
       "animation-name" computed to "carPulse", "matchMedia" matched, and
       "getAnimations()" on the car returned [] with opacity pinned at 1 — the
       blanket had already run it once for a millisecond and dropped it. The
       loader was a still drawing.

       So the two properties the blanket forces are answered, and only those two.
       Both declarations are !important, so the cascade is settled by specificity:
       "*" is (0,0,0) and this is (0,2,0). Narrow on purpose — the blanket keeps
       governing every other animation in the library. */
    .car {
      animation: carPulse 1.6s ease-in-out infinite alternate;
      animation-duration: 1.6s !important;
      animation-iteration-count: infinite !important;
    }
    .lines line {
      animation: none;
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }

  @keyframes carPulse {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.2;
    }
  }
`;

export default CodeLoader;
