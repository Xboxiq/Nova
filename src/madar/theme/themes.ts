export type ThemeName = "light" | "dark" | "mint" | "coral" | "sky" | "iris" | "night";
export type GlassLevel = "g1" | "g2" | "g3";

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  labelAr: string;
  swatch: string;
  /** true for dark packs — used for icon-only chrome decisions */
  dark?: boolean;
}

/**
 * Registered theme packs. Colors live in
 * design-system/nova-design-os/tokens/tokens.css (light, dark) and
 * design-system/nova-design-os/tokens/theme-packs.css (the Madar families) as
 * `--nova-*` custom properties. This list only drives the switcher UI.
 * To add a pack: add one `[data-theme="name"]` block declaring the NOVA color
 * tokens, then register it here. Nothing else in the app needs to change.
 */
export const THEMES: ThemeMeta[] = [
  { name: "light", label: "Light", labelAr: "نهاري", swatch: "#0068d9" },
  { name: "dark", label: "Dark", labelAr: "ليلي", swatch: "#70b7ff", dark: true },
  { name: "mint", label: "Mint", labelAr: "نعناعي", swatch: "oklch(0.72 0.13 172)" },
  { name: "coral", label: "Coral", labelAr: "مرجاني", swatch: "oklch(0.62 0.17 38)" },
  { name: "sky", label: "Sky", labelAr: "سماوي", swatch: "oklch(0.58 0.17 245)" },
  { name: "iris", label: "Iris", labelAr: "بنفسجي", swatch: "oklch(0.56 0.19 293)" },
  { name: "night", label: "Night", labelAr: "نيلي", swatch: "oklch(0.285 0.048 274)", dark: true },
];

export const DARK_THEMES: ThemeName[] = THEMES.filter((theme) => theme.dark).map((theme) => theme.name);

export const GLASS_LEVELS: { level: GlassLevel; label: string; labelAr: string }[] = [
  { level: "g1", label: "G1", labelAr: "زجاج خفيف" },
  { level: "g2", label: "G2", labelAr: "زجاج متوسط" },
  { level: "g3", label: "G3", labelAr: "زجاج كثيف" },
];

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && THEMES.some((theme) => theme.name === value);
}

export function isGlassLevel(value: unknown): value is GlassLevel {
  return value === "g1" || value === "g2" || value === "g3";
}
