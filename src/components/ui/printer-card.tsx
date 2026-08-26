/* The largest CSS-only upload yet: one 6.4s cycle driving twenty infinite
   animations, and not a single tag. The tree is nonetheless almost entirely
   determined, because every part is absolutely positioned and its `left`/`top`
   only lands in the right place under one parent. Worked example:

     `.printer-body` is `left: 0; top: 14px; 132x58`
     `.slot` is `top: 5px`   → 5 is inside the BODY; under `.printer` it would sit
                               above the body, which starts at 14. So the slot,
                               and by the same test `.panel` (top 16), `.buttons`
                               (18), `.led-wrap` (16), `.vents` (30), `.brand`
                               (46) and `.tray` (bottom -3) are all children of
                               the body, not siblings of it.
     `.printer-ambient-shadow` is `z-index: 0` and the body is `z-index: 2`, so
                               the shadow is a SIBLING under `.printer` — it has
                               to be behind the body, not inside it.

   Two counts the CSS does not fix, and they are the only guesses here:
     `.btn`  — 6px discs in a 3px-gap row starting at left 58, with the LED at
               about left 115: any count from 1 to 8 fits. Three, the usual
               power/feed/cancel cluster.
     `.vent` — 15x2 bars, 2.5px gaps, starting at top 30 in a 58-tall body: five
               is the largest count that still clears the brand mark at top 46
               (5x2 + 4x2.5 = 20, ending at 50).
   Everything else — eight ink lines, five status words — is named in the CSS or
   given in the upload's copy. */
import styled from 'styled-components';

export const PrinterCard = () => {
  return (
    <StyledWrapper>
      {/* `role="img"` with one name, and that is the whole accessibility story.
          The five status words all live in the DOM at once and are cycled by
          opacity, so a screen reader would read "Ready Feeding paper...
          Printing... Ejecting... Done" in one breath — five contradictory
          states, none of them true, describing a printer that does not exist.
          `role="img"` makes the subtree presentational, so the words stop being
          announced and the card is described once, correctly, as a picture. */}
      <div className="card" role="img" aria-label="Illustration of a printer running through a print cycle">
        <div className="scene">
          <div className="paper-group">
            <div className="paper-shadow" />
            <div className="paper">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className={`ink ink-${i}`} />
              ))}
            </div>
          </div>

          <div className="printer">
            <div className="printer-ambient-shadow" />
            <div className="printer-top">
              <div className="printer-top-inner" />
            </div>
            <div className="printer-body">
              <div className="slot" />
              <div className="panel">
                <div className="panel-line-lg" />
                <div className="panel-line-sm" />
              </div>
              <div className="buttons">
                <div className="btn" />
                <div className="btn" />
                <div className="btn" />
              </div>
              <div className="led-wrap">
                <div className="led" />
                <div className="led-glow-wrap">
                  <div className="led-glow" />
                </div>
              </div>
              <div className="vents">
                <div className="vent" />
                <div className="vent" />
                <div className="vent" />
                <div className="vent" />
                <div className="vent" />
              </div>
              <div className="tray">
                <div className="tray-inner" />
              </div>
              <div className="brand" />
            </div>
          </div>
        </div>

        <div className="status">
          <div className="st ready">Ready</div>
          <div className="st feeding">Feeding paper...</div>
          <div className="st printing">Printing...</div>
          <div className="st ejecting">Ejecting...</div>
          <div className="st done">Done</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* ─── Scoped Card Wrapper ─── */
  .card {
    width: 190px;
    height: 254px;
    background: linear-gradient(145deg, #1a1a1a, #222222);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family:
      "Segoe UI",
      system-ui,
      -apple-system,
      sans-serif;
  }

  /* subtle dot grid */
  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px
    );
    background-size: 14px 14px;
    pointer-events: none;
  }

  /* ─── Scene ─── */
  .scene {
    position: relative;
    width: 190px;
    height: 175px;
    margin-top: 18px;
  }

  /* ─── Paper (behind printer) ─── */
  .paper-group {
    position: absolute;
    left: 50%;
    top: 22px;
    transform: translateX(-50%);
    z-index: 1;
    animation: paperMove 6.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .paper {
    width: 54px;
    height: 68px;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    padding: 7px 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    z-index: 2;
  }

  .paper-shadow {
    position: absolute;
    top: 2px;
    left: 1px;
    width: 56px;
    height: 70px;
    background: rgba(0, 0, 0, 0.22);
    border-radius: 3px;
    filter: blur(2px);
    z-index: 1;
    animation: shadowOpacity 6.4s ease-in-out infinite;
  }

  /* Ink lines */
  .ink {
    height: 2.5px;
    background: #2a2a2a;
    border-radius: 1.5px;
    opacity: 0;
  }
  .ink-1 { width: 40px; animation: ink1 6.4s ease-out infinite; }
  .ink-2 { width: 28px; animation: ink2 6.4s ease-out infinite; }
  .ink-3 { width: 19px; animation: ink3 6.4s ease-out infinite; }
  .ink-4 { width: 40px; animation: ink4 6.4s ease-out infinite; }
  .ink-5 { width: 28px; animation: ink5 6.4s ease-out infinite; }
  .ink-6 { width: 19px; animation: ink6 6.4s ease-out infinite; }
  .ink-7 { width: 40px; animation: ink7 6.4s ease-out infinite; }
  .ink-8 { width: 28px; animation: ink8 6.4s ease-out infinite; }

  /* ─── Printer Body (in front) ─── */
  .printer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 132px;
    height: 96px;
    z-index: 3;
  }

  .printer-ambient-shadow {
    position: absolute;
    left: 3px;
    top: 10px;
    width: 126px;
    height: 70px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    z-index: 0;
  }

  .printer-top {
    position: absolute;
    left: 26px;
    top: 0;
    width: 80px;
    height: 17px;
    background: #f0f0f0;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    z-index: 2;
  }

  .printer-top-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 72px;
    height: 11px;
    background: #f8f8f8;
    border: 0.5px solid #d8d8d8;
    border-radius: 2px;
  }

  .printer-body {
    position: absolute;
    left: 0;
    top: 14px;
    width: 132px;
    height: 58px;
    background: #ffffff;
    border: 1.5px solid #d5d5d5;
    border-radius: 10px;
    z-index: 2;
    box-shadow: 0 5px 0 rgba(0, 0, 0, 0.03);
  }

  .slot {
    position: absolute;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
    width: 70px;
    height: 4px;
    background: #2a2a2a;
    border-radius: 2px;
    z-index: 3;
  }

  .panel {
    position: absolute;
    left: 9px;
    top: 16px;
    width: 42px;
    height: 16px;
    background: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    z-index: 3;
  }

  .panel-line-lg {
    position: absolute;
    left: 4px;
    top: 4px;
    width: 16px;
    height: 2.5px;
    background: #a0a0a0;
    border-radius: 1.5px;
  }

  .panel-line-sm {
    position: absolute;
    left: 4px;
    top: 9px;
    width: 26px;
    height: 2px;
    background: #c8c8c8;
    border-radius: 1px;
  }

  .buttons {
    position: absolute;
    left: 58px;
    top: 18px;
    display: flex;
    gap: 3px;
    z-index: 3;
  }

  .btn {
    width: 6px;
    height: 6px;
    background: #e0e0e0;
    border: 0.5px solid #c8c8c8;
    border-radius: 50%;
  }

  .led-wrap {
    position: absolute;
    right: 10px;
    top: 16px;
    width: 7px;
    height: 7px;
    z-index: 3;
  }

  .led {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    animation: ledColor 6.4s ease-in-out infinite;
  }

  .led-glow-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    z-index: 1;
    animation: ledGlowPhase 6.4s ease-in-out infinite;
  }

  .led-glow {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation:
      ledPulse 0.6s ease-in-out infinite alternate,
      ledGlowColor 6.4s ease-in-out infinite;
  }

  .vents {
    position: absolute;
    right: 9px;
    top: 30px;
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    z-index: 3;
  }

  .vent {
    width: 15px;
    height: 2px;
    background: #e0e0e0;
    border-radius: 1px;
  }

  .tray {
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 108px;
    height: 5px;
    background: #e8e8e8;
    border: 0.5px solid #c8c8c8;
    border-radius: 3px;
    z-index: 3;
  }

  .tray-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 96px;
    height: 2.5px;
    background: #d0d0d0;
    border-radius: 1px;
  }

  .brand {
    position: absolute;
    left: 9px;
    top: 46px;
    width: 28px;
    height: 4px;
    background: #e8e8e8;
    border-radius: 1px;
    z-index: 3;
  }

  /* ─── Status Text ─── */
  .status {
    position: relative;
    margin-top: 6px;
    width: 100%;
    height: 18px;
    z-index: 4;
  }

  .st {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 0.3px;
    opacity: 0;
    animation-duration: 6.4s;
    animation-timing-function: step-end;
    animation-iteration-count: infinite;
  }

  .ready { animation-name: stReady; }
  .feeding { animation-name: stFeeding; }
  .printing { animation-name: stPrinting; }
  .ejecting { animation-name: stEjecting; }
  .done { animation-name: stDone; }

  /* ─── Keyframes ─── */
  @keyframes paperMove {
    0%, 3% { transform: translateX(-50%) translateY(-75px); opacity: 0; }
    18.75% { transform: translateX(-50%) translateY(-6px); opacity: 1; }
    43.75% { transform: translateX(-50%) translateY(14px); opacity: 1; }
    78% { transform: translateX(-50%) translateY(72px); opacity: 1; }
    81.25% { transform: translateX(-50%) translateY(72px); opacity: 0; }
    81.3%, 100% { transform: translateX(-50%) translateY(-75px); opacity: 0; }
  }

  @keyframes shadowOpacity {
    0%, 18.75% { opacity: 0; }
    43.75% { opacity: 0; }
    78% { opacity: 0.22; }
    81.25%, 100% { opacity: 0; }
  }

  @keyframes ink1 { 0%, 43.75% { opacity: 0; } 48.75%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink2 { 0%, 46.25% { opacity: 0; } 51.25%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink3 { 0%, 48.75% { opacity: 0; } 53.75%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink4 { 0%, 51.25% { opacity: 0; } 56.25%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink5 { 0%, 53.75% { opacity: 0; } 58.75%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink6 { 0%, 56.25% { opacity: 0; } 61.25%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink7 { 0%, 58.75% { opacity: 0; } 63.75%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }
  @keyframes ink8 { 0%, 61.25% { opacity: 0; } 66.25%, 78% { opacity: 1; } 81.25%, 100% { opacity: 0; } }

  @keyframes ledColor {
    0%, 18.75% { background: #ffa500; box-shadow: 0 0 4px #ffa500; }
    18.75%, 43.75% { background: #1e90ff; box-shadow: 0 0 4px #1e90ff; }
    43.75%, 100% { background: #32cd32; box-shadow: 0 0 4px #32cd32; }
  }

  @keyframes ledGlowColor {
    0%, 18.75% { background: #ffa500; }
    18.75%, 43.75% { background: #1e90ff; }
    43.75%, 100% { background: #32cd32; }
  }

  @keyframes ledPulse {
    from { transform: scale(1); opacity: 0.7; }
    to { transform: scale(1.5); opacity: 0.15; }
  }

  @keyframes ledGlowPhase {
    0%, 43.75% { opacity: 1; }
    43.75%, 81.25% { opacity: 0; }
    81.25%, 100% { opacity: 1; }
  }

  @keyframes stReady { 0%, 2.9% { opacity: 1; } 3%, 89.9% { opacity: 0; } 90%, 100% { opacity: 1; } }
  @keyframes stFeeding { 0%, 2.9% { opacity: 0; } 3%, 18.6% { opacity: 1; } 18.7%, 100% { opacity: 0; } }
  @keyframes stPrinting { 0%, 18.6% { opacity: 0; } 18.7%, 43.6% { opacity: 1; } 43.7%, 100% { opacity: 0; } }
  @keyframes stEjecting { 0%, 43.6% { opacity: 0; } 43.7%, 77.9% { opacity: 1; } 78%, 100% { opacity: 0; } }
  @keyframes stDone { 0%, 77.9% { opacity: 0; } 78%, 89.9% { opacity: 1; } 90%, 100% { opacity: 0; } }

  /* Reduced motion needs a static frame, and the repo's blanket does not leave a
     usable one. It forces every animation to "1ms" and "iteration-count: 1", and
     because none of these animations fills forwards, their effect is REMOVED when
     they end — so the card falls back to its BASE styles, not to the last
     keyframe. Measured: no status word at all (".st" is "opacity: 0" at rest), a
     transparent LED (".led" declares no background of its own) and the paper
     sitting mid-scene instead of parked. A printer with a dead light and no
     caption.

     So the resting state is written out: the light green, the caption "Ready",
     the paper and the glow gone. These are ordinary declarations, not animation
     properties, so they do not fight the blanket — they are simply what is left
     standing once it has done its work, and they need no !important. */
  @media (prefers-reduced-motion: reduce) {
    .led {
      background: #32cd32;
      box-shadow: 0 0 4px #32cd32;
    }
    .led-glow-wrap {
      opacity: 0;
    }
    .paper-group {
      opacity: 0;
    }
    .st.ready {
      opacity: 1;
    }
  }
`;

export default PrinterCard;
