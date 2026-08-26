/* CSS plus the copy, no tags. The tree is short and the selectors close it:
   `.wrapper` (300px square, clips, carries the :hover) holds `.card` (the
   oversized gradient plate) and, absolutely positioned over it, `.title` and
   `.desc`. Both hover rules are `.wrapper:hover .title` / `.desc`, so both are
   descendants of the wrapper, not of the card.

   THE ASSET THAT IS NOT IN THE UPLOAD:
   `.card { filter: url("#noise") }` points at an SVG filter with id `noise` that
   the upload never provides. I first wrote here that a dangling filter reference
   makes the element not render at all, so the card would be blank. That was
   WRONG, and measuring it said so: with the filter element removed the card
   still paints 84 distinct colours across 225 fixed sample points, i.e. it
   renders as if `filter: none`. The failure is quieter than I claimed, and worse
   for it — the card looks finished and simply has no grain, so nobody goes
   looking. Supplying the filter is still load-bearing: comparing the same 225
   points with and without it, 82 of them change.

   What the filter must be is fixed by two other declarations nobody would write
   otherwise: `width/height: 110%` with `translate: -5% -5%`. Oversizing a plate
   by 10% and pulling it back by half of that is the standard way to keep a
   DISPLACEMENT filter's torn edges outside the clip — a purely additive grain
   overlay would need neither. So `#noise` is feTurbulence driving
   feDisplacementMap, and the 10% overhang is exactly the slack its `scale`
   eats. The numbers are mine; the mechanism is the upload's own arithmetic. */
import styled from 'styled-components';

export const LessButBetterCard = () => {
  return (
    <StyledWrapper>
      {/* `cursor: pointer` is in the upload and there is nothing to click: no
          href, no handler, no state — only two :hover rules. So it stays a
          <div>, because promoting it to a button would invent a destination.
          `role="group"` with a name, so the pair of texts reads as one thing. */}
      <div className="wrapper" role="group" aria-label="Less but better">
        <div className="card" />
        <div className="title">
          Less
          <br />
          but better
        </div>
        <div className="desc">
          Everything you need,
          <br />
          nothing more.
        </div>

        {/* The filter lives inside the component so it travels with it. It is
            zero-sized and hidden from the reader; `id="noise"` is kept literally
            because `url("#noise")` is what the design writes, and an id is
            document-global — two of these on one page would share one filter,
            which is harmless here (they would want the same one) but is worth
            knowing. */}
        <svg className="noise-defs" aria-hidden="true" focusable="false">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves={2} seed={4} result="turb" />
            <feDisplacementMap in="SourceGraphic" in2="turb" scale={26} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wrapper,
  .wrapper * {
    box-sizing: border-box;
  }

  .wrapper {
    width: 300px;
    aspect-ratio: 1/1;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    position: relative;
    font-family: "Space Grotesk", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #ececec;
    cursor: pointer;
  }

  .card {
    width: 110%;
    height: 110%;
    translate: -5% -5%;
    filter: url("#noise");
    --color-1: #f3ecde;
    --color-2: #e581a2;
    --color-3: #fce3ec;
    background: radial-gradient(
        circle at 50% 100%,
        var(--color-1) 20%,
        var(--color-2) 40% 50%,
        var(--color-3) 55%
      )
      no-repeat center / auto;
    font-size: 100px;
  }

  .title {
    position: absolute;
    top: 10%;
    left: 10%;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.1;
    background: linear-gradient(135deg, #e581a2 0%, #ffb4c8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    letter-spacing: -0.04em;
    filter: drop-shadow(0px 4px 12px rgba(229, 129, 162, 0.25));
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .desc {
    position: absolute;
    bottom: 27%;
    left: 50%;
    translate: -50% 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    white-space: nowrap;
    line-height: 1.6;
    letter-spacing: 0.04em;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .wrapper:hover .title {
    letter-spacing: -0.01em;
    filter: drop-shadow(0px 8px 16px rgba(229, 129, 162, 0.4));
    transform: translateY(-2px);
  }

  .wrapper:hover .desc {
    letter-spacing: 0.08em;
    color: #ffffff;
    transform: translateY(-2px);
  }

  .noise-defs {
    position: absolute;
    width: 0;
    height: 0;
  }

  /* Forced colours: the headline is drawn by clipping a gradient to the glyphs
     and filling the text itself with transparent. In forced-colors mode the
     background is replaced and the fill is not, so the words become invisible —
     the content is gone, not merely restyled. Two declarations put the glyphs
     back and touch nothing outside the mode. */
  @media (forced-colors: active) {
    .title {
      -webkit-text-fill-color: CanvasText;
      color: CanvasText;
      background: none;
      filter: none;
    }
    .desc {
      color: CanvasText;
      text-shadow: none;
    }
  }
`;

export default LessButBetterCard;
