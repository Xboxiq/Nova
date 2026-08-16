import { Suspense, useState } from "react";
import { PiCaretRight, PiStack } from "react-icons/pi";
import { ThemeProvider } from "../madar/theme/ThemeContext";
import type { GlassLevel, ThemeName } from "../madar/theme/themes";
import { madarFamilies, madarSections, type MadarFamilyId } from "../madar/sections";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface MadarLibraryProps {
  locale: Locale;
  theme: ThemeName;
  glass: GlassLevel;
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export default function MadarLibrary({
  locale,
  theme,
  glass,
  activeSection,
  onSectionChange,
}: MadarLibraryProps) {
  const copy = uiCopy[locale];
  const [family, setFamily] = useState<MadarFamilyId | "all">("all");

  const visible = family === "all" ? madarSections : madarSections.filter((section) => section.family === family);
  const current = madarSections.find((section) => section.id === activeSection) ?? madarSections[0];
  const Section = current.component;

  return (
    <section className="madar-section" id="madar" aria-labelledby="madar-title">
      <div className="section-intro">
        <div>
          <p className="eyebrow"><span />{copy.madarEyebrow}</p>
          <h2 id="madar-title">{copy.madarTitle}</h2>
        </div>
        <p>{copy.madarLead}</p>
      </div>

      <div className="madar-controls">
        <div className="madar-families" role="toolbar" aria-label={copy.madarFamilies}>
          <button
            type="button"
            className={family === "all" ? "active" : ""}
            aria-pressed={family === "all"}
            onClick={() => setFamily("all")}
          >
            {copy.all}
            <small>{madarSections.length}</small>
          </button>
          {madarFamilies.map((entry) => {
            const count = madarSections.filter((section) => section.family === entry.id).length;
            return (
              <button
                key={entry.id}
                type="button"
                className={family === entry.id ? "active" : ""}
                aria-pressed={family === entry.id}
                onClick={() => setFamily(entry.id)}
              >
                {locale === "ar" ? entry.label : entry.labelEn}
                <small>{count}</small>
              </button>
            );
          })}
        </div>

        <div className="madar-picker">
          <p className="madar-picker-heading">
            <PiStack aria-hidden="true" />
            <span>{copy.madarSections}</span>
          </p>
          <div className="madar-picker-list" role="tablist" aria-label={copy.madarSections} aria-orientation="vertical">
            {visible.map((section) => (
              <button
                key={section.id}
                type="button"
                role="tab"
                id={`${section.id}-tab`}
                aria-selected={section.id === current.id}
                aria-controls={`${section.id}-panel`}
                tabIndex={section.id === current.id ? 0 : -1}
                className={section.id === current.id ? "active" : ""}
                onClick={() => onSectionChange(section.id)}
              >
                <span>
                  <strong>{locale === "ar" ? section.titleAr : section.title}</strong>
                  <small>{locale === "ar" ? section.descriptionAr : section.description}</small>
                </span>
                <PiCaretRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="madar-stage madar-surface"
        role="tabpanel"
        id={`${current.id}-panel`}
        aria-labelledby={`${current.id}-tab`}
        tabIndex={-1}
      >
        <ThemeProvider theme={theme} glass={glass} rtl={locale === "ar"}>
          <Suspense fallback={<p className="madar-loading">{copy.madarLoading}</p>}>
            <Section />
          </Suspense>
        </ThemeProvider>
      </div>
    </section>
  );
}
