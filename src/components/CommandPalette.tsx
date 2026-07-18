import { useEffect, useMemo, useRef, useState } from "react";
import {
  PiArrowElbowDownLeft,
  PiMagnifyingGlass,
  PiSparkle,
  PiX,
} from "react-icons/pi";
import type { CatalogItem } from "../types";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface CommandPaletteProps {
  open: boolean;
  items: CatalogItem[];
  locale: Locale;
  onOpenChange: (open: boolean) => void;
  onSelect: (id: string) => void;
}

export default function CommandPalette({
  open,
  items,
  locale,
  onOpenChange,
  onSelect,
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

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === "ar" ? "ar" : "en");
    if (!normalized) return items.slice(0, 8);

    return items
      .filter((item) =>
        [item.title, item.titleAr, item.description, item.author, ...item.tags]
          .join(" ")
          .toLocaleLowerCase(locale === "ar" ? "ar" : "en")
          .includes(normalized),
      )
      .slice(0, 8);
  }, [items, locale, query]);

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
          <span aria-hidden="true"><PiSparkle /></span>
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

        <div className="command-results" role="listbox" aria-label={copy.components}>
          {results.length ? results.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected="false"
              onClick={() => onSelect(item.id)}
            >
              <span className="command-result-icon" aria-hidden="true"><PiSparkle /></span>
              <span>
                <strong>{locale === "ar" ? item.titleAr : item.title}</strong>
                <small>{locale === "ar" ? item.title : item.titleAr}</small>
              </span>
              <PiArrowElbowDownLeft aria-hidden="true" />
            </button>
          )) : (
            <p className="command-empty">{copy.commandEmpty}</p>
          )}
        </div>
      </div>
    </dialog>
  );
}
