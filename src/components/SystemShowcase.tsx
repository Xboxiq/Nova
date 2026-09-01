import {
  PiArrowRight,
  PiCheck,
  PiCircleNotch,
  PiCursorClick,
  PiSwatches,
} from "react-icons/pi";
import type { CSSProperties } from "react";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface SystemShowcaseProps {
  locale: Locale;
}

const swatches = [
  { name: "Cobalt", token: "var(--nova-action)" },
  { name: "Mint", token: "var(--nova-expressive-mint)" },
  { name: "Coral", token: "var(--nova-expressive-coral)" },
  { name: "Amber", token: "var(--nova-expressive-amber)" },
  { name: "Frost", token: "var(--nova-expressive-frost)" },
];

export default function SystemShowcase({ locale }: SystemShowcaseProps) {
  const copy = uiCopy[locale];

  return (
    <section className="system-showcase" id="system" aria-labelledby="system-title">
      <div className="section-intro system-intro">
        <div>
          <h2 id="system-title">{copy.systemTitle}</h2>
        </div>
        <p>{copy.systemLead}</p>
      </div>

      <div className="specimen-grid">
        <article className="specimen-panel specimen-type">
          <header>
            <p>{copy.typeLabel}</p>
          </header>
          <div className="type-sample" role="group" aria-label={copy.typeLabel}>
            <span>NOVA / نوفا</span>
            <h3>{copy.typeTitle}</h3>
            <p>{copy.typeBody}</p>
          </div>
          <footer>
            <span>Display</span><span>Title</span><span>Body</span><span>Label</span>
          </footer>
        </article>

        <article className="specimen-panel specimen-palette">
          <header>
            <p>{copy.paletteLabel}</p>
          </header>
          <div className="palette-row" role="group" aria-label={copy.paletteLabel}>
            {swatches.map((swatch) => (
              <span key={swatch.name} style={{ "--swatch": swatch.token } as CSSProperties}>
                <i />
                <small>{swatch.name}</small>
              </span>
            ))}
          </div>
          <p>{copy.paletteDescription}</p>
        </article>

        <article className="specimen-panel specimen-material nova-glass">
          <header>
            <p>{copy.materialLabel}</p>
          </header>
          <div className="material-orbit" aria-hidden="true">
            <span><PiSwatches /></span>
            <i /><i /><i />
          </div>
          <h3>{copy.materialTitle}</h3>
          <p>{copy.materialBody}</p>
        </article>

        <article className="specimen-panel specimen-motion">
          <header>
            <p>{copy.motionLabel}</p>
          </header>
          <div className="motion-track" aria-hidden="true">
            <i /><span><PiCursorClick /></span><i /><span><PiCircleNotch /></span><i /><span><PiCheck /></span>
          </div>
          <h3>{copy.motionTitle}</h3>
          <p>{copy.motionBody}</p>
          <a href="#components">
            {copy.components}
            <PiArrowRight aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
