import type { Locale } from "../i18n";

/* anti-slop-ui #28: a section is a lazy chunk, and the fallback used to be one
   line of text — a blank stage that then jumps when the real content lands. This
   holds the stage's actual shape: a label, a title, two lines of lede, then
   the cell grid, at the sizes the section really uses, so nothing shifts. */
export default function MadarStageSkeleton({ locale }: { locale: Locale }) {
  return (
    <div
      className="madar-skeleton"
      aria-label={locale === "ar" ? "يجري تحميل القسم" : "Loading section"}
      aria-busy="true"
    >
      <span className="madar-skeleton-label" />
      <span className="madar-skeleton-title" />
      <span className="madar-skeleton-line" />
      <span className="madar-skeleton-line is-short" />
      <div className="madar-skeleton-grid">
        {Array.from({ length: 3 }, (_, index) => <span key={index} />)}
      </div>
    </div>
  );
}
