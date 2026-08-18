import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  PiArrowDown,
  PiCheckCircleFill,
  PiCommand,
  PiDrop,
  PiGridFour,
  PiListDashes,
  PiMagnifyingGlass,
  PiMoonStars,
  PiPalette,
  PiSun,
  PiTranslate,
  PiX,
} from "react-icons/pi";
import BrandMark from "./components/BrandMark";
import CommandPalette from "./components/CommandPalette";
import LegalDialog, { type LegalDoc } from "./components/LegalDialog";
import MadarStageSkeleton from "./components/MadarStageSkeleton";
import AdvancedPatternLab from "./components/AdvancedPatternLab";
import HeroPreview from "./components/HeroPreview";
import MobileDock from "./components/MobileDock";
import PatternStudio from "./components/PatternStudio";
import SystemShowcase from "./components/SystemShowcase";
import { catalog, categories } from "./data/catalog";
import { madarSections } from "./madar/sections";
import {
  DARK_THEMES,
  GLASS_LEVELS,
  THEMES,
  isGlassLevel,
  isThemeName,
  type GlassLevel,
  type ThemeName,
} from "./madar/theme/themes";
import type { Locale } from "./i18n";
import { uiCopy } from "./i18n";
import type { CategoryId } from "./types";

const Gallery = lazy(() => import("./components/Gallery"));
const MadarLibrary = lazy(() => import("./components/MadarLibrary"));

type GalleryView = "grid" | "compact";

const THEME_COLOR: Record<ThemeName, string> = {
  light: "#F3F7F8",
  dark: "#0D1B22",
  mint: "#F1F8F7",
  coral: "#FAF4F0",
  sky: "#F1F5FA",
  iris: "#F5F2FA",
  night: "#242540",
};

function getInitialTheme(): ThemeName {
  const stored = window.localStorage.getItem("nova-theme");
  if (isThemeName(stored)) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/* g0 by the owner's ruling on anti-slop-ui #8: the product surface is solid, and
   glass is something a reader turns on rather than something they land in. */
function getInitialGlass(): GlassLevel {
  const stored = window.localStorage.getItem("nova-glass");
  return isGlassLevel(stored) ? stored : "g0";
}

function getInitialLocale(): Locale {
  const stored = window.localStorage.getItem("nova-locale");
  return stored === "en" ? "en" : "ar";
}

/* A section id in the URL fragment names the section to open. Anything else
   in the fragment — the `#madar` nav anchor, for instance — is left alone. */
function sectionFromHash(): string | null {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return madarSections.some((section) => section.id === id) ? id : null;
}

function App() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);
  const [glass, setGlass] = useState<GlassLevel>(getInitialGlass);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [madarSection, setMadarSection] = useState(() => sectionFromHash() ?? madarSections[0].id);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<GalleryView>("grid");
  const [toast, setToast] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const copy = uiCopy[locale];
  const isDarkTheme = DARK_THEMES.includes(theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = isDarkTheme ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
    window.localStorage.setItem("nova-theme", theme);
  }, [isDarkTheme, theme]);

  useEffect(() => {
    document.documentElement.dataset.glass = glass;
    window.localStorage.setItem("nova-glass", glass);
  }, [glass]);

  /* A pasted link, and the back button, both arrive as a hash change. */
  useEffect(() => {
    const open = () => {
      const id = sectionFromHash();
      if (id) setMadarSection(id);
    };
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  /* On a deep link the library is still a lazy chunk, so `#madar` does not
     exist yet and the browser's own fragment scroll has nothing to land on.
     Wait for the element rather than for a duration.
     ponytail: capped at ~2s of frames instead of a MutationObserver — if the
     chunk is that slow the user has already scrolled themselves. Upgrade to an
     observer only if a slow connection is ever reported. */
  useEffect(() => {
    if (!sectionFromHash()) return;
    let frame = 0;
    let left = 120;
    const land = () => {
      const stage = document.getElementById("madar");
      if (stage) stage.scrollIntoView({ block: "start" });
      else if (left-- > 0) frame = window.requestAnimationFrame(land);
    };
    frame = window.requestAnimationFrame(land);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!themeMenuOpen) return;

    const close = (event: Event) => {
      if (event.type === "keydown" && (event as KeyboardEvent).key !== "Escape") return;
      if (event.type === "pointerdown" && themeMenuRef.current?.contains(event.target as Node)) return;
      setThemeMenuOpen(false);
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [themeMenuOpen]);

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

  const toggleTheme = () => setTheme((value) => (DARK_THEMES.includes(value) ? "light" : "dark"));

  /* The fragment is the address. Without it a thirty-two section library has
     no shareable link to any of its sections, which is how additions ended up
     invisible: the page always opened on the first tab and nothing could point
     anywhere else. replaceState rather than assignment, so picking through the
     tabs does not fill the back button with thirty-two entries. */
  const selectMadarSection = (id: string) => {
    setMadarSection(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const jumpToMadarSection = (id: string) => {
    selectMadarSection(id);
    setCommandOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById("madar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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
          <span className="brand-mark" aria-hidden="true"><BrandMark /></span>
          <span>NOVA</span>
          <span className="brand-suffix">UI</span>
        </a>

        <nav className="top-nav" aria-label={copy.navLabel}>
          <a href="#components">{copy.components}</a>
          <a href="#workbench">{copy.studio}</a>
          <a href="#advanced">{locale === "ar" ? "الابتكار" : "Innovation"}</a>
          <a href="#madar">{copy.madar}</a>
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
            aria-label={isDarkTheme ? copy.switchToLight : copy.switchToDark}
            onClick={toggleTheme}
          >
            {isDarkTheme ? <PiSun /> : <PiMoonStars />}
          </button>
          <div className="theme-menu" ref={themeMenuRef}>
            <button
              className="icon-button"
              type="button"
              aria-label={copy.themeLabel}
              aria-expanded={themeMenuOpen}
              aria-haspopup="true"
              onClick={() => setThemeMenuOpen((value) => !value)}
            >
              <PiPalette />
            </button>
            {themeMenuOpen && (
            <div className="theme-panel nova-glass" role="group" aria-label={copy.themeLabel}>
              <p className="theme-panel-heading">{copy.themePacks}</p>
              <div className="theme-pack-list" role="radiogroup" aria-label={copy.themePacks}>
                {THEMES.map((pack) => (
                  <button
                    key={pack.name}
                    type="button"
                    role="radio"
                    aria-checked={theme === pack.name}
                    className={theme === pack.name ? "active" : ""}
                    onClick={() => setTheme(pack.name)}
                  >
                    <span className="theme-swatch" style={{ background: pack.swatch }} aria-hidden="true" />
                    {locale === "ar" ? pack.labelAr : pack.label}
                  </button>
                ))}
              </div>

              <p className="theme-panel-heading">
                <PiDrop aria-hidden="true" />
                {copy.glassLabel}
              </p>
              <div className="theme-glass-list" role="radiogroup" aria-label={copy.glassLabel}>
                {GLASS_LEVELS.map((level) => (
                  <button
                    key={level.level}
                    type="button"
                    role="radio"
                    aria-checked={glass === level.level}
                    aria-label={locale === "ar" ? level.labelAr : level.label}
                    className={glass === level.level ? "active" : ""}
                    onClick={() => setGlass(level.level)}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>
          <a className="primary-link top-cta" href="#components">
            {copy.explore}
            <PiArrowDown aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
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

        <Suspense fallback={<MadarStageSkeleton locale={locale} />}>
          <MadarLibrary
            locale={locale}
            theme={theme}
            glass={glass}
            activeSection={madarSection}
            onSectionChange={selectMadarSection}
          />
        </Suspense>

        <section className="principles" id="principles" aria-labelledby="principles-title">
          <div className="section-intro">
            <div>
              <h2 id="principles-title">{copy.principlesTitle}</h2>
            </div>
            <p>{copy.principlesLead}</p>
          </div>
          <div className="principle-grid">
            <article><h3>{copy.principleOne}</h3><p>{copy.principleOneBody}</p></article>
            <article><h3>{copy.principleTwo}</h3><p>{copy.principleTwoBody}</p></article>
            <article><h3>{copy.principleThree}</h3><p>{copy.principleThreeBody}</p></article>
            <article><h3>{copy.principleFour}</h3><p>{copy.principleFourBody}</p></article>
          </div>
        </section>
      </main>

      <footer id="sources">
        <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true"><BrandMark /></span><span>NOVA</span><span className="brand-suffix">UI</span></div>
        <p>{copy.footer}</p>
        {/* anti-slop-ui #29 and #30: real documents behind real controls. Buttons
            rather than `#` links, because there is no page to navigate to and a
            dead fragment is the thing the standard names. */}
        <nav className="footer-legal" aria-label={`${copy.terms} / ${copy.privacy}`}>
          <button type="button" onClick={() => setLegalDoc("terms")}>{copy.terms}</button>
          <button type="button" onClick={() => setLegalDoc("privacy")}>{copy.privacy}</button>
          <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev</a>
        </nav>
      </footer>

      <LegalDialog doc={legalDoc} locale={locale} closeLabel={copy.close} onClose={() => setLegalDoc(null)} />

      <MobileDock locale={locale} onSearch={() => setCommandOpen(true)} />
      <CommandPalette
        open={commandOpen}
        items={catalog}
        madarItems={madarSections}
        locale={locale}
        onOpenChange={setCommandOpen}
        onSelect={jumpToComponent}
        onSelectMadar={jumpToMadarSection}
      />

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
