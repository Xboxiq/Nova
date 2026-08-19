import {
  PiHouse,
  PiMagnifyingGlass,
  PiSquaresFour,
  PiSwatches,
} from "react-icons/pi";
import type { Locale } from "../i18n";
import { uiCopy } from "../i18n";

interface MobileDockProps {
  locale: Locale;
  onSearch: () => void;
}

export default function MobileDock({ locale, onSearch }: MobileDockProps) {
  const copy = uiCopy[locale];

  return (
    <nav className="mobile-dock nova-glass" aria-label={copy.navLabel}>
      <a href="#top">
        <PiHouse aria-hidden="true" />
        <span>{copy.home}</span>
      </a>
      <a href="#system">
        <PiSwatches aria-hidden="true" />
        <span>{copy.system}</span>
      </a>
      <a className="dock-primary" href="#components">
        <PiSquaresFour aria-hidden="true" />
        <span>{copy.components}</span>
      </a>
      <button type="button" onClick={onSearch}>
        <PiMagnifyingGlass aria-hidden="true" />
        <span>{copy.search}</span>
      </button>
    </nav>
  );
}
