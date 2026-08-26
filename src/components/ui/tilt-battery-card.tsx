/* The third distinct battery card in these uploads -- not a duplicate of the other
   two. Its structure is fixed by nine invisible hover zones: .a is 100x100 at
   translateZ(600px), and .tl .t .tr .l .c .r .bl .br place eight of them on a 3x3
   grid at -30/70/170 with .c in the middle. Each one tilts the card a different
   way through "&:hover ~ .card", so all nine come BEFORE the card. That is a
   pointer-position readout built with no script: nine boxes standing in for nine
   directions.

   TWO THINGS THE CSS NEEDS AND NEVER DECLARES.

   1. --z. It is read six times -- in translateZ, in stroke-width, in three
      translate3d calls -- and defined nowhere. An undefined var inside calc()
      makes the whole declaration invalid at computed-value time, so every one of
      those transforms would be DROPPED. Set to 1 here, because that is the value
      the arithmetic is written around: "calc(6px - 3px * var(--z) * var(--z))"
      gives 3px at z=1 and 6px at z=0, and 6px is what the base rule already sets,
      so z=1 is the state the variants exist to reach. Stated as inferred.

   2. The border art. .outer is an SVG whose paths carry
      "stroke-dasharray: 0 0 360 0" on .bak and an animation from
      "stroke-dashoffset: 360" -- so one lap is 360 units, which is pathLength=360
      on a rounded-rect path. Same reading as the loader and the tick.

   The three row icons are hand-drawn rather than taken from a library, because the
   CSS makes structural demands a library glyph cannot meet: .charging needs a
   single stroked path of known length (dasharray 10 10 drawing in on hover, so
   pathLength=20), and .health needs a child with class .fd that fades in. Those
   are inferred; every dimension and colour around them is the upload's. */
import styled from 'styled-components';

const ZONES = ['tl', 't', 'tr', 'l', 'c', 'r', 'bl', 'b', 'br'];
const RING = 'M60 6H180A54 54 0 01234 60V180A54 54 0 01180 234H60A54 54 0 016 180V60A54 54 0 0160 6Z';

export const TiltBatteryCard = ({
  percent = '69%',
  health = '96% BATTERY HEALTH',
  cycles = '215 CYCLES',
  state = 'CHARGING',
}: { percent?: string; health?: string; cycles?: string; state?: string }) => {
  return (
    <StyledWrapper>
      {/* role="img" with one name: five stacked copies of the same number and
          three rows of micro-text are one picture of a battery, not eight facts.
          Without it a reader hears "69% 69% 69% 69% 69%". */}
      <div className="parent" role="img" aria-label={"Battery " + percent + ", " + state + ", " + health + ", " + cycles}>
        {ZONES.map((z) => (
          <div key={z} className={"a " + z} />
        ))}

        <div className="card">
          <svg className="outer bb1" width={300} height={300} viewBox="0 0 240 240" aria-hidden="true" focusable="false">
            <path className="bak" d={RING} pathLength={360} />
            <path className="bak20" d={RING} pathLength={360} />
            <path className="patt blur" d={RING} pathLength={360} />
            <path className="patt" d={RING} pathLength={360} />
          </svg>

          <div className="inner">
            <div className="inner-bg disabled-kuz-low-end-devices" />
          </div>
          <div className="inner-border" />

          {/* .top first: it is transparent and the only one that takes the
              pointer, and every following .percent lifts when it is hovered. */}
          <div className="percent top">{percent}</div>
          <div className="percent bak">{percent}</div>
          <div className="percent">{percent}</div>
          <div className="percent">{percent}</div>
          <div className="percent">{percent}</div>

          <div className="txt charging">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" pathLength={20} />
            </svg>
            {state}
          </div>

          <div className="txt health">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 12h3l2-4 3 8 2-4h6" fill="none" stroke="currentColor" strokeWidth={1.5} />
              <circle className="fd" cx={12} cy={12} r={9} fill="none" stroke="currentColor" strokeWidth={1} />
            </svg>
            {health}
          </div>

          <div className="txt cycles">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" fill="none" stroke="currentColor" strokeWidth={1.5} />
            </svg>
            {cycles}
          </div>

          <div className="bar-hb" />
          <div className="bar bak">
            <div className="bar-slider" />
          </div>
          <div className="bar">
            <div className="bar-slider" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .parent {
    /* Read six times by the upload, declared nowhere in it. See the file note. */
    --z: 1;
    width: 240px;
    height: 240px;
    perspective: 3000px;
    position: relative;
  }

  .card:hover {
    transform: rotateX(5deg) rotateY(10deg);
  }
  .card:hover .inner .inner-bg.disabled-kuz-low-end-devices {
    transform: translateZ(-10px) rotateX(5deg) rotateY(10deg);
  }
  .card:hover div.bar.bak { opacity: 0.7; }

  .a:hover ~ .card .outer .patt,
  .card:hover .outer .patt {
    stroke-dasharray: 0 90 280 999;
    stroke-dashoffset: 10;
  }

  .a {
    position: absolute;
    width: 100px;
    height: 100px;
    transform: translateZ(600px);
  }

  .a:hover ~ .card .bar.bak { opacity: 1; }

  .tl { top: -30px; left: -30px; }
  .tl:hover ~ .card { transform: rotateX(-20deg) rotateY(20deg); }
  .tl:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateX(-20deg) rotateY(20deg); }

  .t { top: -30px; left: 70px; }
  .t:hover ~ .card { transform: rotateX(-20deg); }
  .t:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateX(-20deg); }

  .tr { top: -30px; left: 170px; }
  .tr:hover ~ .card { transform: rotateX(-20deg) rotateY(-20deg); }
  .tr:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateX(-20deg) rotateY(-20deg); }

  .l { top: 70px; left: -30px; }
  .l:hover ~ .card { transform: rotateY(20deg); }
  .l:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateY(20deg); }

  .c { top: 70px; left: 70px; }

  .r { top: 70px; left: 170px; }
  .r:hover ~ .card { transform: rotateY(-20deg); }
  .r:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateY(-20deg); }

  .bl { top: 170px; left: -30px; }
  .bl:hover ~ .card { transform: rotateX(20deg) rotateY(20deg); }
  .bl:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateX(20deg) rotateY(20deg); }

  .b { top: 170px; left: 70px; }
  .b:hover ~ .card { transform: rotateX(20deg); }
  .b:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateX(20deg); }

  .br { top: 170px; left: 170px; }
  .br:hover ~ .card { transform: rotateX(20deg) rotateY(-20deg); }
  .br:hover ~ .card .inner .inner-bg.disabled-kuz-low-end-devices { transform: translateZ(-10px) rotateX(20deg) rotateY(-20deg); }

  .card {
    position: relative;
    width: 240px;
    height: 240px;
    transform-style: preserve-3d;
    transition: 0.7s;
  }

  .outer {
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    overflow: visible;
    transition: 1s;
    transform: scale(1.05) translateZ(-50px);
    transform-origin: 170px;
    pointer-events: none;
  }

  .outer.bb { transform: scale(1.0535) translateZ(-55px); }

  .outer.bb1 {
    transform: scale(1.0535) translateZ(calc(-55px + 5px * var(--z)));
  }
  .outer.bb1 path {
    stroke-width: calc(6px - 3px * var(--z) * var(--z));
  }

  .outer path {
    stroke: #fff;
    fill: none;
    stroke-width: 6;
    stroke-linecap: round;
    stroke-dasharray: 0 0 280 999;
    transition: 1s;
  }

  .outer path.blur { filter: blur(8px); opacity: 0.4; }
  .outer path.bak { stroke: #ffffff09; stroke-dasharray: 0 0 360 0; }
  .outer path.bak20 {
    stroke: #ffffff09;
    stroke-dasharray: 20 50;
    stroke-dashoffset: 0;
    animation: stronk 40s linear infinite;
  }

  @keyframes stronk {
    from { stroke-dashoffset: 360; }
  }

  .inner {
    position: absolute;
    inset: 1px;
    border-radius: 29px;
    background: #212121;
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 100px;
  }

  .inner .inner-bg {
    position: absolute;
    inset: -1000%;
    filter: blur(40px);
    opacity: 0.3;
    transform: translateZ(-10px);
    transition: 1s;
    background: conic-gradient(
      from 45deg,
      #fff 5%,
      #fff0 10% 40%,
      #fff 45% 55%,
      #fff0 60% 90%,
      #fff 95%
    );
    animation: speen 24s cubic-bezier(0.36, 0.2, 0.64, 0.8) infinite;
  }

  @keyframes speen {
    50% { rotate: 180deg; }
    to { rotate: 360deg; }
  }

  .inner-border {
    position: absolute;
    inset: 0;
    border: double 2px transparent;
    background-image: linear-gradient(-45deg, #2221, #fff2, #3331);
    background-origin: border-box;
    clip-path: path(
      "M30 0H210A30 30 0 01240 30V210A30 30 0 01210 240H30A30 30 0 010 210V30A30 30 0 0130 0V2A28 28 0 002 30V210A28 28 0 0030 238H210A28 28 0 00238 210V30A28 28 0 00210 2H30"
    );
    clip-rule: evenodd;
    transform: translateZ(calc(var(--z) * 1px));
    pointer-events: none;
  }

  .percent {
    position: absolute;
    top: 24px;
    left: 34px;
    font-size: 42px;
    color: #ccc;
    transition: 0.4s;
    transform: translate3d(0px, 0px, calc(40px + var(--z) * 1.5px));
    cursor: default;
    pointer-events: none;
  }

  .percent.top { pointer-events: all; color: #0000; }

  .percent.bak {
    color: #fff;
    transform: translate3d(0px, 0px, 1px);
    filter: blur(8px);
    opacity: 0.8;
  }

  .percent.top:hover ~ .percent {
    text-shadow: 0 0 6px #fff3;
    transform: translate3d(0px, 0px, calc(60px + var(--z) * 1.5px));
  }

  .txt {
    position: absolute;
    font-family: monospace;
    cursor: default;
    display: flex;
    gap: 4px;
    fill: #888;
    font-size: 14px;
    font-weight: 500;
    color: #888;
    transition: 0.4s, fill 0.2s, color 0.2s;
    transform: translate3d(0px, 0px, 20px);
    align-items: center;
  }

  .txt:hover {
    transform: translate3d(0px, 0px, 40px);
    color: #aaa;
    fill: #aaa;
  }

  .txt svg { width: 18px; height: 18px; transition: 0.5s; }

  .charging { top: 104px; left: 28px; }
  .charging svg {
    stroke-width: 1.5px;
    stroke: #0f8;
    fill: none;
    stroke-dasharray: 10 10;
    stroke-dashoffset: 10;
  }
  .charging:hover svg { stroke-dasharray: 10 10; stroke-dashoffset: 0; }

  .health { top: 140px; left: 28px; }
  .health svg .fd { opacity: 0; transition: 0.4s; }
  .health:hover svg .fd { opacity: 1; }

  .cycles { top: 164px; left: 28px; }
  .cycles:hover svg { rotate: 180deg; fill: #5d9; }

  .bar-hb {
    position: absolute;
    width: 190px;
    height: 14px;
    top: 205px;
    left: 25px;
    transform: translate3d(0px, 0px, 10px);
  }

  .bar-hb:hover ~ .bar:not(.bak) {
    transform: translate3d(0px, 0px, calc(30px + var(--z) * 2px));
  }
  .bar-hb:hover ~ .bar:not(.bak) .bar-slider {
    background-color: #3eea8e6c;
  }

  .bar {
    position: absolute;
    width: 180px;
    height: 4px;
    background: linear-gradient(90deg, #0000 128px, #ffffff05 0);
    top: 210px;
    left: 30px;
    border-radius: 2px;
    transform: translate3d(0px, 0px, calc(10px + var(--z) * 1.5px));
    transition: 0.4s;
    clip-path: path(
      "M2 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Z"
    );
    pointer-events: none;
  }

  .bar .bar-slider {
    width: 128px;
    border-radius: inherit;
    height: 4px;
    background: linear-gradient(90deg, #3eea8e00, #3eea8e70, #3eea8e00),
      linear-gradient(90deg, #3eea8e00, #3eea8e9a, #3eea8e00);
    background-size: 200%;
    animation: bg 4s linear infinite;
    transition: 0.3s;
  }

  .bar.bak {
    transform: translate3d(0px, 0px, 1px);
    filter: blur(6px);
    opacity: 0.1;
    clip-path: none;
  }

  .bar.bak .bar-slider {
    width: 124px;
    border-radius: inherit;
    height: 4px;
    background: #3eea8e;
    background-size: 200%;
    animation: bg 4s linear infinite;
  }

  @keyframes bg {
    from { background-position: 200%, 0%; }
  }

  /* Two endless animations -- a 24s conic sweep and a 40s dash crawl -- plus a
     4s gradient slide. All decoration: the numbers, the bar width and the icons
     are static declarations, so stopping the motion loses nothing readable. */
  @media (prefers-reduced-motion: reduce) {
    .inner .inner-bg,
    .outer path.bak20,
    .bar .bar-slider,
    .bar.bak .bar-slider {
      animation: none;
    }
    .card,
    .outer,
    .percent,
    .txt,
    .bar {
      transition-duration: 0.01ms;
    }
  }
`;

export default TiltBatteryCard;
