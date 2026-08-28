import type { IconType } from "react-icons";
import {
  PiArrowsLeftRight,
  PiCards,
  PiChartLineUp,
  PiCursorClick,
  PiFlask,
  PiGridFour,
  PiMagicWand,
  PiNavigationArrow,
  PiPath,
  PiSquaresFour,
  PiStack,
  PiTextAa,
  PiToggleLeft,
  PiBookOpenText,
} from "react-icons/pi";

/**
 * One glyph per family, for every family in the library — the eight catalogue
 * categories and the eight Madar section families.
 *
 * WHY IT IS SHARED. The gallery already drew a distinct glyph per category from a
 * local map inside `Gallery.tsx`, while the command palette drew `PiStack` twelve
 * times: one shape for every result, in a panel whose whole job is telling twelve
 * things apart. Giving the palette's plaque a family COLOUR fixed half of that
 * and left the worse half — an identity carried by colour alone, which is no
 * identity for a reader who cannot separate those hues (WCAG 1.4.1). The shape
 * has to carry it too, and the shape the gallery already uses is the right one:
 * the same family means the same glyph in both places.
 *
 * `motion` is the one id both sets share, so it appears once.
 */
export const familyIcons: Record<string, IconType> = {
  /* CategoryId */
  flows: PiPath,
  controls: PiToggleLeft,
  navigation: PiNavigationArrow,
  motion: PiChartLineUp,
  inputs: PiSquaresFour,
  actions: PiCursorClick,
  surfaces: PiCards,
  effects: PiMagicWand,
  /* MadarFamilyId, less `motion` */
  directions: PiArrowsLeftRight,
  patterns: PiGridFour,
  components: PiStack,
  layouts: PiGridFour,
  typography: PiTextAa,
  references: PiBookOpenText,
  experiments: PiFlask,
};

/* A family the map has not heard of still gets a plaque, and `PiStack` is the
   neutral one — the glyph the palette used for everything before this existed. */
export const familyIcon = (id: string | undefined): IconType => familyIcons[id ?? ""] ?? PiStack;
