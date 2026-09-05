/**
 * Brand directions — the curated set, and the only place the product's colours
 * are chosen.
 *
 * The colours themselves live in
 * `design-system/nova-design-os/tokens/brands.css` as oklch ANCHORS (hue,
 * chroma, a lightness for light packs and one for dark). This file registers
 * them for the settings UI and nothing else: an id, the two names, and a swatch
 * that previews the brand's own gradient rather than a flat dot, because the
 * gradient is what the brand ships.
 *
 * `none` is not a brand: it is the absence of the attribute, which leaves each
 * theme pack's own accent exactly as it was before this axis existed.
 *
 * To swap the whole set for the owner's palette file: replace the anchor blocks
 * in brands.css and the rows here. Two files, no component touched.
 */
export type BrandName =
  | "none"
  | "violet"
  | "ember"
  | "olive"
  | "teal"
  | "indigo"
  | "ruby"
  | "clay"
  | "graphite";

export interface BrandMeta {
  name: BrandName;
  label: string;
  labelAr: string;
  /** The brand's own two anchors, as a preview swatch (light-pack values). */
  swatch: string;
}

export const BRANDS: BrandMeta[] = [
  { name: "none", label: "Pack", labelAr: "لون الحزمة", swatch: "var(--nova-action)" },
  { name: "violet", label: "Violet", labelAr: "بنفسجي غامق", swatch: "linear-gradient(160deg, oklch(0.44 0.175 300), oklch(0.56 0.15 328))" },
  { name: "ember", label: "Ember", labelAr: "برتقالي مصقول", swatch: "linear-gradient(160deg, oklch(0.60 0.165 42), oklch(0.62 0.17 22))" },
  { name: "olive", label: "Olive", labelAr: "زيتوني", swatch: "linear-gradient(160deg, oklch(0.52 0.15 128), oklch(0.68 0.17 108))" },
  { name: "teal", label: "Teal", labelAr: "تركوازي عميق", swatch: "linear-gradient(160deg, oklch(0.50 0.12 195), oklch(0.62 0.13 172))" },
  { name: "indigo", label: "Indigo", labelAr: "نيلي حبري", swatch: "linear-gradient(160deg, oklch(0.47 0.17 262), oklch(0.60 0.14 232))" },
  { name: "ruby", label: "Ruby", labelAr: "قرمزي", swatch: "linear-gradient(160deg, oklch(0.51 0.175 18), oklch(0.60 0.155 355))" },
  { name: "clay", label: "Clay", labelAr: "طيني", swatch: "linear-gradient(160deg, oklch(0.52 0.075 58), oklch(0.62 0.085 32))" },
  { name: "graphite", label: "Graphite", labelAr: "فحمي", swatch: "linear-gradient(160deg, oklch(0.40 0.022 250), oklch(0.55 0.03 250))" },
];

export type RadiusName = "default" | "sharp" | "soft" | "round";

export interface RadiusMeta {
  name: RadiusName;
  label: string;
  labelAr: string;
  /** The card radius this setting produces, previewed on the chip itself. */
  preview: string;
}

/* The edge is a brand decision too, so it is a setting rather than a constant.
   It scales the UI ladder only; the photographed family's 52px widget is
   material, not preference, and stays where it is. */
export const RADII: RadiusMeta[] = [
  { name: "sharp", label: "Sharp", labelAr: "حادّة", preview: "3px" },
  { name: "default", label: "System", labelAr: "افتراضية", preview: "6px" },
  { name: "soft", label: "Soft", labelAr: "ليّنة", preview: "12px" },
  { name: "round", label: "Round", labelAr: "دائرية", preview: "18px" },
];

export function isBrandName(value: unknown): value is BrandName {
  return typeof value === "string" && BRANDS.some((brand) => brand.name === value);
}

export function isRadiusName(value: unknown): value is RadiusName {
  return typeof value === "string" && RADII.some((radius) => radius.name === value);
}
