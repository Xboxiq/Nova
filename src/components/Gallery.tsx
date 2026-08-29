import { useMemo } from "react";
import {
  PiArrowUpRight,
  PiCopy,
  PiSquaresFour,
} from "react-icons/pi";
import { categories } from "../data/catalog";
import type { Locale } from "../i18n";
import type { CatalogItem, CategoryId } from "../types";
import DemoRenderer from "./demos/DemoRenderer";
import { familyIcon } from "../family-icons";

interface GalleryProps {
  items: CatalogItem[];
  locale: Locale;
  view: "grid" | "compact";
  selectedCategory: CategoryId | "all";
  onReset: () => void;
  onNotify: (message: string) => void;
  onThemeToggle: () => void;
}

const descriptionsEn: Record<CategoryId, string> = {
  flows: "Clear journeys from entry to completion",
  controls: "Small decisions with immediate feedback",
  navigation: "Fast access with visible context",
  motion: "Motion that explains state without distraction",
  inputs: "Forgiving, legible, accessible input",
  actions: "Focused commands with direct outcomes",
  surfaces: "Composed interfaces with precise hierarchy",
  effects: "Expressive details used with restraint",
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

export default function Gallery({
  items,
  locale,
  view,
  selectedCategory,
  onReset,
  onNotify,
  onThemeToggle,
}: GalleryProps) {
  const groups = useMemo(() => {
    const allowed = selectedCategory === "all" ? categories : categories.filter((entry) => entry.id === selectedCategory);
    return allowed
      .map((entry) => ({ ...entry, items: items.filter((component) => component.category === entry.id) }))
      .filter((entry) => entry.items.length > 0);
  }, [items, selectedCategory]);

  if (!items.length) {
    return (
      <section className="empty-state" aria-labelledby="empty-title">
        <span><PiSquaresFour /></span>
        <h2 id="empty-title">{locale === "ar" ? "لا توجد نتيجة مطابقة" : "No matching components"}</h2>
        <p>{locale === "ar" ? "جرّب كلمة أقصر أو ارجع إلى جميع الفئات." : "Try a shorter term or return to all categories."}</p>
        <button className="primary-button" type="button" onClick={onReset}>
          {locale === "ar" ? "مسح عوامل التصفية" : "Clear filters"}
        </button>
      </section>
    );
  }

  return (
    <div className="gallery" role="region" aria-label={locale === "ar" ? "مكوّنات NOVA" : "NOVA components"}>
      {groups.map((group) => {
        const Icon = familyIcon(group.id);
        return (
          <section className="category-section" key={group.id} id={`category-${group.id}`} aria-labelledby={`title-${group.id}`}>
            <header className="category-heading">
              <div className="category-icon"><Icon /></div>
              <div>
                <p lang={locale === "ar" ? "en" : "ar"} dir={locale === "ar" ? "ltr" : "rtl"}>{locale === "ar" ? group.labelEn : group.label}</p>
                <h2 id={`title-${group.id}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>{locale === "ar" ? group.label : group.labelEn}</h2>
              </div>
              <span className="category-description">{locale === "ar" ? group.description : descriptionsEn[group.id]}</span>
              <strong>{String(group.items.length).padStart(2, "0")}</strong>
            </header>

            <div className={`component-grid ${view === "compact" ? "is-compact" : ""}`}>
              {group.items.map((component, index) => (
                <article className="component-card" key={component.id} data-component-id={component.id} tabIndex={-1}>
                  <header className="component-heading">
                    <div>
                      <span className="component-number">{String(index + 1).padStart(2, "0")}</span>
                      <h3 lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>{locale === "ar" ? component.titleAr : component.title}</h3>
                      <p lang={locale === "ar" ? "en" : "ar"} dir={locale === "ar" ? "ltr" : "rtl"}>{locale === "ar" ? component.title : component.titleAr}</p>
                    </div>
                    <a
                      className="source-link"
                      href={component.source}
                      target={component.source.startsWith("#") ? undefined : "_blank"}
                      rel={component.source.startsWith("#") ? undefined : "noreferrer"}
                      aria-label={locale === "ar" ? `فتح مصدر ${component.titleAr}` : `Open ${component.title} source`}
                    >
                      <PiArrowUpRight />
                    </a>
                  </header>

                  <div className="demo-frame">
                    <DemoRenderer kind={component.kind} onNotify={onNotify} onThemeToggle={onThemeToggle} />
                  </div>

                  <footer className="component-meta">
                    <div>
                      <p>{component.description}</p>
                      <span><bdi dir="ltr" lang="en">@{component.author}</bdi></span>
                    </div>
                    <button
                      type="button"
                      className="copy-source"
                      aria-label={locale === "ar" ? `نسخ رابط ${component.titleAr}` : `Copy ${component.title} source link`}
                      onClick={() => {
                        void copyText(component.source)
                          .then(() => onNotify(locale === "ar" ? "تم نسخ رابط المصدر" : "Source link copied"))
                          .catch(() => onNotify(locale === "ar" ? "تعذّر النسخ، افتح المصدر مباشرة" : "Copy failed, open the source directly"));
                      }}
                    >
                      <PiCopy />
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
