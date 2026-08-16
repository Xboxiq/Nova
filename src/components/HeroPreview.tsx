import {
  PiCheckCircleFill,
  PiDotsThree,
  PiSparkle,
} from "react-icons/pi";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface HeroPreviewProps {
  locale: Locale;
}

const bars = [36, 50, 44, 68, 58, 78, 70, 92];

export default function HeroPreview({ locale }: HeroPreviewProps) {
  const copy = uiCopy[locale];

  return (
    <div className="hero-stage" role="group" aria-label={copy.previewLabel}>
      <span className="stage-aurora" aria-hidden="true" />
      <div className="stage-window">
        <header className="stage-toolbar">
          <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
          <span><PiSparkle /> NOVA OS</span>
          <span className="stage-more" aria-hidden="true"><PiDotsThree /></span>
        </header>

        <div className="stage-layout">
          <aside className="stage-rail" aria-hidden="true">
            <span className="active"><PiSparkle /></span>
            <span /><span /><span />
          </aside>

          <div className="stage-content">
            <div className="stage-heading">
              <div>
                <small>{copy.previewProject}</small>
                <strong>{copy.previewMorning}</strong>
              </div>
              <span className="stage-avatar">ن</span>
            </div>

            <div className="stage-dashboard">
              <section className="stage-metric">
                <header>
                  <span>{copy.previewMetric}</span>
                  <small>{copy.previewSample}</small>
                </header>
                <strong>84.6%</strong>
                <div className="stage-bars" aria-hidden="true">
                  {bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                </div>
              </section>

              <div className="stage-side">
                <section className="stage-status">
                  <PiCheckCircleFill aria-hidden="true" />
                  <div>
                    <strong>{copy.previewPublished}</strong>
                    <small>{copy.previewChecked}</small>
                  </div>
                </section>
                <section className="stage-activity">
                  <header><strong>{copy.previewActivity}</strong><PiDotsThree /></header>
                  <div><span className="activity-orb cobalt" /><p><strong>{copy.previewDesign}</strong><small>{copy.previewNow}</small></p></div>
                  <div><span className="activity-orb mint" /><p><strong>{copy.previewReview}</strong><small>{copy.previewMinutes}</small></p></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stage-float nova-glass">
        <span><PiSparkle /></span>
        <div><strong><bdi dir="ltr" lang="en">React 19</bdi></strong><small><bdi dir="ltr" lang="en">TypeScript + Vite</bdi></small></div>
      </div>
    </div>
  );
}
