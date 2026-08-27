/* The first upload in this whole log that ships its own reduced-motion block --
   and the first whose printed numbers do not agree with each other.

   Two things make this file unusual before any of its CSS is read:

     @media (prefers-reduced-motion: reduce) { .status-indicator, .progress-line,
       .progress-particles { animation: none } }
     @media (max-width: 600px) { ... }

   Every other upload in this log left both of those to the consumer. This one
   names its three infinite animations and switches them off, and reflows its
   three-column grid to two at 600px. Nothing needed adding for either.

   And then the arithmetic, which is the opposite of the receipt printer's. That
   file's sums were exact to the cent. This one's are not:

     13 days active + 352 days remaining = 365
     13 / 365 = 3.5616%
     the panel prints 4.00% COMPLETED, and .progress-line is width: 4%

   Four percent of 365 is 14.6 days. So the bar, the percentage and the day count
   are internally inconsistent by 0.44 of a point. The width and the label agree
   with each other and disagree with the days. Reproduced exactly as delivered,
   because they are the author's numbers and one of them is wrong -- and which one
   is a question only the author can answer.

   `.progress-particles` is a single radial-gradient tiled at `8px 8px` with
   `background-position` animated 0 to 100% over 20 seconds. No particle elements
   at all: the dots are a background, and the "flow" is the background sliding.
   One element, one gradient, no DOM.

   One addition, and the file's own care makes it conspicuous: the bar has no
   `role`. A progress indicator that announces nothing is not one, and this is the
   only piece of the component its author did not think of. */
import styled from 'styled-components';

export const SystemProgressPanel = ({
  percent = 4,
  active = 13,
  remaining = 352,
}: { percent?: number; active?: number; remaining?: number }) => (
  <StyledWrapper>
    <div className="progress-app">
      <div className="progress-panel">
        <div className="panel-header">
          <div className="system-status">
            <span className="status-indicator" />
            <span className="status-text">SYSTEM ACTIVE</span>
          </div>
        </div>
        <div className="progress-section">
          <div
            className="progress-wrapper"
            role="progressbar"
            aria-label="Cycle progress"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-bar">
              <div className="progress-line" />
              <div className="progress-particles" />
            </div>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-value">{percent.toFixed(2)}%</span>
              <span className="info-label">COMPLETED</span>
            </div>
            <div className="info-item">
              <span className="info-value">{active}</span>
              <span className="info-label">DAYS ACTIVE</span>
            </div>
            <div className="info-item">
              <span className="info-value">{remaining}</span>
              <span className="info-label">DAYS REMAINING</span>
            </div>
          </div>
          <div className="timeline">
            <span className="time-marker">JAN</span>
            <span className="time-marker">JUN</span>
            <span className="time-marker">DEC</span>
          </div>
        </div>
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .progress-app {
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    color: #ffffff;
    line-height: 1.5;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .progress-panel {
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .panel-header {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .system-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    background: #00ff9d;
    border-radius: 50%;
    animation: pulse 2s infinite ease-in-out;
  }

  .status-text {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 1px;
  }

  .progress-section {
    margin-bottom: 24px;
  }

  .progress-wrapper {
    position: relative;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .progress-line {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4%;
    background: linear-gradient(
      90deg,
      rgba(0, 255, 157, 0.7),
      rgba(0, 255, 157, 0.3)
    );
    border-radius: 20px;
    animation: progressGlow 2s infinite;
  }

  .progress-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 1px,
      transparent 1px
    );
    background-size: 8px 8px;
    animation: particleFlow 20s linear infinite;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 24px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-value {
    font-size: 24px;
    font-weight: 700;
    color: #00ff9d;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
    margin-bottom: 4px;
  }

  .info-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.5px;
  }

  .timeline {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 24px;
  }

  .time-marker {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-weight: 500;
    position: relative;
    padding-top: 12px;
  }

  .time-marker::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  @keyframes progressGlow {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
    }
  }

  @keyframes particleFlow {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  @media (max-width: 600px) {
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .info-value {
      font-size: 20px;
    }
    .progress-wrapper {
      height: 32px;
    }
  }

  /* The author's own. Not added, not adjusted. */
  @media (prefers-reduced-motion: reduce) {
    .status-indicator,
    .progress-line,
    .progress-particles {
      animation: none;
    }
  }
`;
