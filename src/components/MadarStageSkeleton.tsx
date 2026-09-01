import type { Locale } from "../i18n";

/* anti-slop-ui #28: a section is a lazy chunk, and the fallback used to be one
   line of text — a blank stage that then jumps when the real content lands. This
   holds the stage's actual shape: a label, a title, two lines of lede, then
   the cell grid, at the sizes the section really uses, so nothing shifts. */
export default function MadarStageSkeleton({ locale }: { locale: Locale }) {
  return (
    /* `role="status"`, because `aria-label` on a bare `<div>` is a name on the
       generic role, which ARIA prohibits — axe's `aria-prohibited-attr`, and the
       very defect class this repo wrote `aria-name-legal` for in wave 9. That gate
       walks `src/components/ui` and `src/components/nova`, so it never looked
       here, and the violation only ever surfaced when a slow chunk left the
       skeleton on screen at the moment axe ran.

       `status` is also the truthful role: a live region announcing that something
       is loading, which is what `aria-busy` beside it was already claiming. */
    <div
      className="madar-skeleton"
      role="status"
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
