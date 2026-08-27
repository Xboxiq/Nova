import {
  PiCheckCircleFill,
  PiDotsThree,
  PiGauge,
} from "react-icons/pi";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface HeroPreviewProps {
  locale: Locale;
}

/* The eight samples, and the ONLY source for the figure below them. The card used
   to draw these and print a hardcoded 84.6% underneath; their mean is 62.0, so the
   drawing and the number had disagreed since the day it was written. VISUAL-LAW SS15
   and SS22: a measured quantity is drawn measured, and the measurement falls on the
   drawn thing. */
const samples = [36, 50, 44, 68, 58, 78, 70, 92];
const mean = samples.reduce((a, b) => a + b, 0) / samples.length;

export default function HeroPreview({ locale }: HeroPreviewProps) {
  const copy = uiCopy[locale];

  return (
    <div className="hero-stage" role="group" aria-label={copy.previewLabel}>
      <span className="stage-aurora" aria-hidden="true" />
      <div className="stage-window">
        <header className="stage-toolbar">
          <span className="stage-name">NOVA OS</span>
          <span className="stage-more" aria-hidden="true"><PiDotsThree /></span>
        </header>

        <div className="stage-layout">
          <aside className="stage-rail" aria-hidden="true">
            <span className="active"><PiGauge /></span>
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
                <strong>{mean.toFixed(1)}%</strong>
                {/* one scalar per bar drives its height, its saturation against the
                    mean, and its own bloom -- and the mean is drawn as a reference
                    line, so eight heights read as a distribution with a centre
                    rather than eight arbitrary sticks (SS11, SS19) */}
                <div
                  className="stage-bars"
                  aria-hidden="true"
                  style={{ ['--nv-mean' as string]: mean }}
                >
                  <span className="stage-bars__mean" />
                  {samples.map((height, index) => (
                    <i
                      key={index}
                      style={{
                        ['--nv-h' as string]: height,
                        ['--i' as string]: index,
                      }}
                    />
                  ))}
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
        <div><strong><bdi dir="ltr" lang="en">React 19</bdi></strong><small><bdi dir="ltr" lang="en">TypeScript + Vite</bdi></small></div>
      </div>
    </div>
  );
}
