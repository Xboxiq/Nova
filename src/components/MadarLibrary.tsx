import { Suspense, useState } from "react";
import { PiCaretRight, PiStack } from "react-icons/pi";
import MadarStageSkeleton from "./MadarStageSkeleton";
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
  const added = madarSections.filter((section) => section.added);
  const current = madarSections.find((section) => section.id === activeSection) ?? madarSections[0];
  const Section = current.component;

  return (
    <section className="madar-section" id="madar" aria-labelledby="madar-title">
      <div className="section-intro">
        <div>
          <h2 id="madar-title">{copy.madarTitle}</h2>
        </div>
        <p>{copy.madarLead}</p>
      </div>

      {/* Thirty-two tabs, and the page opens on the first one. Without this
          row an addition is only reachable by someone who already knows which
          tab it lives in — which is exactly how the last two families stayed
          invisible after they shipped. */}
      {added.length > 0 && (
        <nav className="madar-whats-new" aria-label={copy.madarNew}>
          <span className="madar-whats-new-label">{copy.madarNew}</span>
          {added.map((section) => (
            <button key={section.id} type="button" onClick={() => onSectionChange(section.id)}>
              {locale === "ar" ? section.titleAr : section.title}
            </button>
          ))}
        </nav>
      )}

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
          {/* A shelf with nothing on it is a promise, not a filter: `experiments`
              exists in the taxonomy and stays out of the toolbar until something
              is actually in it. */}
          {madarFamilies.map((entry) => {
            const count = madarSections.filter((section) => section.family === entry.id).length;
            if (!count) return null;
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
          {/* THE ROVING TABINDEX WAS HALF-BUILT, AND THE MEASUREMENT IS THE
              reason this exists: 45 tabs, ONE reachable by Tab, and ArrowDown,
              ArrowUp, Home and End all moved nothing. A keyboard user could
              reach exactly one of forty-five sections and could never leave it.

              `tabIndex={-1}` on the unselected tabs is correct for a tablist —
              it is what stops Tab from walking through forty-five items — but it
              is only half of the pattern. The other half is that the arrows have
              to do the walking, and nothing in this repository handled a key.

              Selection follows focus (automatic activation), which is what the
              ARIA practices prescribe for a tablist whose panels are cheap to
              swap, and what clicking already does here. The focus call waits a
              frame because `tabIndex` is derived from `current.id`: the tab being
              moved to is still -1 until React has re-rendered with the new
              selection. */}
          <div
            className="madar-picker-list"
            role="tablist"
            aria-label={copy.madarSections}
            aria-orientation="vertical"
            onKeyDown={(event) => {
              const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
              if (!keys.includes(event.key)) return;
              const index = visible.findIndex((section) => section.id === current.id);
              if (index === -1) return;
              const last = visible.length - 1;
              const next =
                event.key === "Home" ? 0
                : event.key === "End" ? last
                : event.key === "ArrowDown" ? Math.min(last, index + 1)
                : Math.max(0, index - 1);
              if (next === index) return;
              event.preventDefault();
              onSectionChange(visible[next].id);
              const id = `${visible[next].id}-tab`;
              window.requestAnimationFrame(() => document.getElementById(id)?.focus());
            }}
          >
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
                  <strong>
                    {locale === "ar" ? section.titleAr : section.title}
                    {section.added && <em className="madar-new">{copy.madarNewBadge}</em>}
                  </strong>
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
          <Suspense fallback={<MadarStageSkeleton locale={locale} />}>
            <Section />
          </Suspense>
        </ThemeProvider>
      </div>
    </section>
  );
}
