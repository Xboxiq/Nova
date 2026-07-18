import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  PiArrowDown,
  PiCheckCircleFill,
  PiCommand,
  PiGridFour,
  PiListDashes,
  PiMagnifyingGlass,
  PiMoonStars,
  PiSparkle,
  PiSun,
  PiTranslate,
  PiX,
} from "react-icons/pi";
import CommandPalette from "./components/CommandPalette";
import AdvancedPatternLab from "./components/AdvancedPatternLab";
import HeroPreview from "./components/HeroPreview";
import MobileDock from "./components/MobileDock";
import PatternStudio from "./components/PatternStudio";
import SystemShowcase from "./components/SystemShowcase";
import { catalog, categories } from "./data/catalog";
import type { Locale } from "./i18n";
import { uiCopy } from "./i18n";
import type { CategoryId } from "./types";

const Gallery = lazy(() => import("./components/Gallery"));

type Theme = "light" | "dark";
type GalleryView = "grid" | "compact";

function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem("nova-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialLocale(): Locale {
  const stored = window.localStorage.getItem("nova-locale");
  return stored === "en" ? "en" : "ar";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<GalleryView>("grid");
  const [toast, setToast] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const copy = uiCopy[locale];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#F3F7F8" : "#0D1B22");
    window.localStorage.setItem("nova-theme", theme);
  }, [theme]);

  useEffect(() => {
    const direction = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
    window.localStorage.setItem("nova-locale", locale);
  }, [locale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      const isEditing = activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT";

      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
        return;
      }

      if (event.key === "/" && !isEditing) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return catalog.filter((component) => {
      const inCategory = category === "all" || component.category === category;
      const haystack = [
        component.title,
        component.titleAr,
        component.description,
        component.author,
        ...component.tags,
      ]
        .join(" ")
        .toLocaleLowerCase(locale);
      return inCategory && (!normalized || haystack.includes(normalized));
    });
  }, [category, locale, query]);

  const resetFilters = () => {
    setCategory("all");
    setQuery("");
    window.requestAnimationFrame(() => searchRef.current?.focus());
  };

  const toggleTheme = () => setTheme((value) => (value === "light" ? "dark" : "light"));

  const jumpToComponent = (id: string) => {
    const item = catalog.find((entry) => entry.id === id);
    if (!item) return;

    setQuery("");
    setCategory(item.category);
    setCommandOpen(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(`[data-component-id="${id}"]`);
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
        target?.focus({ preventScroll: true });
      });
    });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">{copy.skip}</a>

      <header className="topbar nova-glass" aria-label={copy.navLabel}>
        <a className="brand" href="#top" aria-label="NOVA UI">
          <span className="brand-mark" aria-hidden="true"><PiSparkle /></span>
          <span>NOVA</span>
          <span className="brand-suffix">UI</span>
        </a>

        <nav className="top-nav" aria-label={copy.navLabel}>
          <a href="#components">{copy.components}</a>
          <a href="#workbench">{copy.studio}</a>
          <a href="#advanced">{locale === "ar" ? "الابتكار" : "Innovation"}</a>
          <a href="#system">{copy.system}</a>
        </nav>

        <div className="top-actions">
          <button className="command-trigger" type="button" aria-label={copy.command} onClick={() => setCommandOpen(true)}>
            <PiMagnifyingGlass aria-hidden="true" />
            <span>{copy.command}</span>
            <kbd><PiCommand /> K</kbd>
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={copy.switchLanguage}
            onClick={() => setLocale((value) => (value === "ar" ? "en" : "ar"))}
          >
            <PiTranslate />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={theme === "light" ? copy.switchToDark : copy.switchToLight}
            onClick={toggleTheme}
          >
            {theme === "light" ? <PiMoonStars /> : <PiSun />}
          </button>
          <a className="primary-link top-cta" href="#components">
            {copy.explore}
            <PiArrowDown aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1 id="hero-title">
              {copy.heroTitle}<br />
              <span>{copy.heroAccent}</span>
            </h1>
            <p className="hero-lead">{copy.heroLead}</p>

            <div className="hero-actions">
              <a className="primary-link" href="#components">
                {copy.browse}
                <PiArrowDown aria-hidden="true" />
              </a>
              <a className="secondary-link" href="#system">{copy.inspect}</a>
            </div>

            <dl className="hero-stats" aria-label={locale === "ar" ? "إحصاءات المكتبة" : "Library statistics"}>
              <div><dt>{copy.patterns}</dt><dd>{catalog.length}</dd></div>
              <div><dt>{copy.categories}</dt><dd>08</dd></div>
              <div><dt>{copy.directions}</dt><dd><bdi dir="ltr" lang="en">RTL / LTR</bdi></dd></div>
            </dl>
          </div>

          <HeroPreview locale={locale} />
        </section>

        <PatternStudio locale={locale} onNotify={setToast} />

        <AdvancedPatternLab locale={locale} onNotify={setToast} />

        <SystemShowcase locale={locale} />

        <section className="library-section" id="components" aria-labelledby="library-title">
          <div className="section-intro library-intro">
            <div>
              <p className="eyebrow"><span />{copy.libraryEyebrow}</p>
              <h2 id="library-title">{copy.libraryTitle}</h2>
            </div>
            <p>{copy.libraryLead}</p>
          </div>

          <div className="library-workbench">
            <aside className="library-sidebar" aria-label={locale === "ar" ? "أدوات المكتبة" : "Library tools"}>
              <label className="search-field">
                <PiMagnifyingGlass aria-hidden="true" />
                <span className="sr-only">{copy.searchLabel}</span>
                <input
                  ref={searchRef}
                  type="search"
                  autoComplete="off"
                  placeholder={copy.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query ? (
                  <button type="button" aria-label={copy.clearSearch} onClick={() => setQuery("")}><PiX /></button>
                ) : <kbd>/</kbd>}
              </label>

              <div className="sidebar-heading">
                <span>{copy.categories}</span>
                <small>{categories.length}</small>
              </div>

              <div className="category-list" role="toolbar" aria-label={copy.categories}>
                <button
                  type="button"
                  className={category === "all" ? "active" : ""}
                  aria-pressed={category === "all"}
                  onClick={() => setCategory("all")}
                >
                  <span>{copy.all}</span><small>{catalog.length}</small>
                </button>
                {categories.map((entry) => {
                  const count = catalog.filter((component) => component.category === entry.id).length;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      className={category === entry.id ? "active" : ""}
                      aria-pressed={category === entry.id}
                      onClick={() => setCategory(entry.id)}
                    >
                      <span>{locale === "ar" ? entry.label : entry.labelEn}</span><small>{count}</small>
                    </button>
                  );
                })}
              </div>

              <div className="view-switch" aria-label={locale === "ar" ? "طريقة العرض" : "View mode"}>
                <button type="button" className={view === "grid" ? "active" : ""} aria-pressed={view === "grid"} aria-label={copy.gridView} onClick={() => setView("grid")}><PiGridFour /></button>
                <button type="button" className={view === "compact" ? "active" : ""} aria-pressed={view === "compact"} aria-label={copy.listView} onClick={() => setView("compact")}><PiListDashes /></button>
              </div>
            </aside>

            <div className="library-content">
              <div className="results-toolbar" aria-live="polite">
                <p>{copy.showing} <strong>{filtered.length}</strong> {copy.from} {catalog.length} {copy.results}</p>
                {(query || category !== "all") && <button type="button" onClick={resetFilters}>{copy.reset}</button>}
              </div>

              <Suspense fallback={<GallerySkeleton locale={locale} />}>
                <Gallery
                  items={filtered}
                  locale={locale}
                  view={view}
                  selectedCategory={category}
                  onReset={resetFilters}
                  onNotify={setToast}
                  onThemeToggle={toggleTheme}
                />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="principles" id="principles" aria-labelledby="principles-title">
          <div className="section-intro">
            <div>
              <h2 id="principles-title">{copy.principlesTitle}</h2>
            </div>
            <p>{copy.principlesLead}</p>
          </div>
          <div className="principle-grid">
            <article><span>01</span><h3>{copy.principleOne}</h3><p>{copy.principleOneBody}</p></article>
            <article><span>02</span><h3>{copy.principleTwo}</h3><p>{copy.principleTwoBody}</p></article>
            <article><span>03</span><h3>{copy.principleThree}</h3><p>{copy.principleThreeBody}</p></article>
            <article><span>04</span><h3>{copy.principleFour}</h3><p>{copy.principleFourBody}</p></article>
          </div>
        </section>
      </main>

      <footer id="sources">
        <div className="brand footer-brand"><span className="brand-mark"><PiSparkle /></span><span>NOVA</span><span className="brand-suffix">UI</span></div>
        <p>{copy.footer}</p>
        <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev</a>
      </footer>

      <MobileDock locale={locale} onSearch={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} items={catalog} locale={locale} onOpenChange={setCommandOpen} onSelect={jumpToComponent} />

      <div className={`toast nova-glass ${toast ? "show" : ""}`} role="status" aria-live="polite">
        <PiCheckCircleFill aria-hidden="true" />
        <span>{toast}</span>
      </div>
    </div>
  );
}

function GallerySkeleton({ locale }: { locale: Locale }) {
  return (
    <div className="gallery-skeleton" aria-label={locale === "ar" ? "جارٍ تحميل المكتبة" : "Loading library"} aria-busy="true">
      {Array.from({ length: 4 }, (_, index) => <span key={index} />)}
    </div>
  );
}

export default App;
