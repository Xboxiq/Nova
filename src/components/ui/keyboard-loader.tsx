/* Eight of its thirteen declaration blocks are already in this repository, and the
   five that are not carry a delay chain that does not do what it looks like.

   Compared block-for-block against `code-loader.tsx`, which came from an earlier
   upload by the same hand: 8 of 13 blocks are byte-identical after whitespace
   normalisation -- the `.track` / `.car` pair, the 2.5px stroke, the
   `stroke-dasharray: 25 75`, and `borderMove` running dashoffset 100 to 0. Same
   chassis. The five new blocks replace whatever that loader drew with a keyboard
   that types.

   25 + 75 = 100 and the offset travels exactly 100, so the outline is a path of
   length 100 -- `pathLength={100}`, the same reading as the shield loader and the
   original code loader.

   The typing is the interesting part, and it is not the sequence it appears to
   be. Three rules stack on one another:

     .keys rect:nth-child(2n) { animation-delay: 0.15s }
     .keys rect:nth-child(3n) { animation-delay: 0.3s }
     .keys rect:nth-child(4n) { animation-delay: 0.45s }

   Those sets OVERLAP, and the winner is decided by source order, not by which
   selector is "more specific" -- all three have identical specificity. Working it
   out for twelve keys:

     key  1  none        0s
     key  2  2n          0.15s
     key  3  3n          0.3s
     key  4  2n and 4n   0.45s   <- 4n is written last
     key  5  none        0s
     key  6  2n and 3n   0.3s    <- 3n is written after 2n
     key  7  none        0s
     key  8  2n and 4n   0.45s
     key  9  3n          0.3s
     key 10  2n          0.15s
     key 11  none        0s
     key 12  2n, 3n, 4n  0.45s

   So the keys do not ripple left to right. They fire in four groups scattered
   across the keyboard, which is what makes it read as typing rather than as a
   wave. The pattern is an accident of arithmetic that happens to look right.

   The key count is the one thing the CSS does not fix: `4n` needs at least four
   keys and nothing caps it. Twelve is chosen here because it is the smallest
   count that exercises all three overlaps -- key 12 is the only one matching all
   of `2n`, `3n` and `4n` -- and it makes a plausible three-row keyboard. Said out
   loud because it is a choice, not a reading.

   One addition: `role="status"` and a name. A loader that announces nothing is not
   a status indicator. */
import styled from 'styled-components';

const KEYS = Array.from({ length: 12 }, (_, i) => ({
  x: 8 + (i % 4) * 9,
  y: 14 + Math.floor(i / 4) * 8,
}));

export const KeyboardLoader = ({ label = 'جارٍ التحميل' }: { label?: string }) => (
  <StyledWrapper className="loader" role="status">
    <svg className="container" viewBox="0 0 48 48" width={64} height={64} aria-hidden="true">
      <rect className="track" x="3" y="8" width="42" height="32" rx="5" />
      <rect className="car" pathLength={100} x="3" y="8" width="42" height="32" rx="5" />
      <g className="keys">
        {KEYS.map((k, i) => (
          <rect key={i} x={k.x} y={k.y} width="6" height="5" rx="1.2" />
        ))}
      </g>
    </svg>
    <span className="loader-label">{label}</span>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  &.loader {
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

  .keys rect {
    fill: #666;
    animation: typing 1.2s infinite;
  }

  .keys rect:nth-child(2n) {
    animation-delay: 0.15s;
  }

  .keys rect:nth-child(3n) {
    animation-delay: 0.3s;
  }

  .keys rect:nth-child(4n) {
    animation-delay: 0.45s;
  }

  @keyframes borderMove {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes typing {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
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
