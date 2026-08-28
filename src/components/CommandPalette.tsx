import { useEffect, useMemo, useRef, useState } from "react";
import {
  PiArrowElbowDownLeft,
  PiMagnifyingGlass,
  PiX,
} from "react-icons/pi";
import { familyIcon } from "../family-icons";
import type { CatalogItem } from "../types";
import type { MadarSection } from "../madar/sections";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface CommandPaletteProps {
  open: boolean;
  items: CatalogItem[];
  madarItems: MadarSection[];
  locale: Locale;
  onOpenChange: (open: boolean) => void;
  onSelect: (id: string) => void;
  onSelectMadar: (id: string) => void;
}

export default function CommandPalette({
  open,
  items,
  madarItems,
  locale,
  onOpenChange,
  onSelect,
  onSelectMadar,
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const copy = uiCopy[locale];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      setQuery("");
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }

    if (!open && dialog.open) dialog.close();
  }, [open]);

  /* The slice moved OUT of `search`. It used to return the truncated list and
     nothing else, so 30 matches rendered as 8 with no way for the reader — or for
     this component — to know the other 22 existed. A cap that says nothing is a
     display that under-reports its own data, which is the defect the spacing
     ruler had in another form. */
  const search = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return <T,>(list: T[], haystack: (item: T) => string[]) =>
      normalized
        ? list.filter((item) => haystack(item).join(" ").toLocaleLowerCase(locale).includes(normalized))
        : list;
  }, [locale, query]);

  const allResults = search(items, (item) => [
    item.title,
    item.titleAr,
    item.description,
    item.author,
    ...item.tags,
  ]);

  const allMadarResults = search(madarItems, (item) => [
    item.title,
    item.titleAr,
    item.description,
    item.descriptionAr,
    ...item.tags,
  ]);

  const results = allResults.slice(0, 8);
  const madarResults = allMadarResults.slice(0, 4);
  const shown = results.length + madarResults.length;
  const total = allResults.length + allMadarResults.length;

  return (
    <dialog
      ref={dialogRef}
      className="command-dialog"
      aria-labelledby="command-title"
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target === dialogRef.current) onOpenChange(false);
      }}
    >
      <div className="command-surface nova-glass">
        <header className="command-header">
          <span aria-hidden="true"><PiMagnifyingGlass /></span>
          <div>
            <h2 id="command-title">{copy.commandTitle}</h2>
            <p>{copy.commandHint}</p>
          </div>
          <button type="button" className="icon-button" aria-label={copy.close} onClick={() => onOpenChange(false)}>
            <PiX />
          </button>
        </header>

        <label className="command-input">
          <PiMagnifyingGlass aria-hidden="true" />
          <span className="sr-only">{copy.searchLabel}</span>
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            value={query}
            placeholder={copy.searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>ESC</kbd>
        </label>

        {/* `role="listbox"` with `role="option" aria-selected="false"` on every
            item promised arrow-key selection that does not exist and reported a
            state that never changes — a screen reader heard "option, not
            selected" eight times over. These are real buttons in the tab order
            and Enter activates them, so the honest contract is a named group of
            buttons. Arrow-key navigation with `aria-activedescendant` would be
            the fuller answer; it is not built, and claiming it was is worse than
            not having it. */}
        <div className="command-results" role="group" aria-label={copy.components}>
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
            >
              <span className="command-result-icon" data-family={item.category} aria-hidden="true">{(() => { const Icon = familyIcon(item.category); return <Icon />; })()}</span>
              <span>
                <strong>{locale === "ar" ? item.titleAr : item.title}</strong>
                <small>{locale === "ar" ? item.title : item.titleAr}</small>
              </span>
              <PiArrowElbowDownLeft aria-hidden="true" />
            </button>
          ))}

          {madarResults.length > 0 && <p className="command-group">{copy.madarSections}</p>}
          {madarResults.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectMadar(item.id)}
            >
              <span className="command-result-icon" data-family={item.family} aria-hidden="true">{(() => { const Icon = familyIcon(item.family); return <Icon />; })()}</span>
              <span>
                <strong>{locale === "ar" ? item.titleAr : item.title}</strong>
                <small>{locale === "ar" ? item.title : item.titleAr}</small>
              </span>
              <PiArrowElbowDownLeft aria-hidden="true" />
            </button>
          ))}

          {total > shown && (
            <p className="command-truncated">
              {copy.commandTruncated.replace("{shown}", String(shown)).replace("{total}", String(total))}
            </p>
          )}

          {results.length === 0 && madarResults.length === 0 && (
            <p className="command-empty">{copy.commandEmpty}</p>
          )}
        </div>
      </div>
    </dialog>
  );
}
