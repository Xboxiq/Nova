export type ThemeName = 'mint' | 'coral' | 'sky' | 'iris' | 'night';
export type GlassLevel = 'g1' | 'g2' | 'g3';

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  labelAr: string;
  swatch: string;
  /** true for dark/navy packs — used for icon-only chrome decisions */
  dark?: boolean;
}

/**
 * Registered theme packs. Colors live in src/styles/tokens.css as CSS custom
 * properties — this list only drives the control-bar UI (swatch + label).
 * To add a new theme pack (per design.md §0.1 color psychology / a project's
 * own brand): add a `[data-theme="name"]` block to tokens.css, then register
 * it here. Nothing else in the app needs to change.
 */
export const THEMES: ThemeMeta[] = [
  { name: 'mint', label: 'Mint', labelAr: 'مدار', swatch: 'oklch(0.72 0.13 172)' },
  { name: 'coral', label: 'Coral', labelAr: 'مرجاني', swatch: 'oklch(0.70 0.15 38)' },
  { name: 'sky', label: 'Sky', labelAr: 'سماوي', swatch: 'oklch(0.66 0.15 245)' },
  { name: 'iris', label: 'Iris', labelAr: 'بنفسجي', swatch: 'oklch(0.62 0.15 293)' },
  { name: 'night', label: 'Night', labelAr: 'ليلي', swatch: 'oklch(0.285 0.048 274)', dark: true },
];

export const GLASS_LEVELS: { level: GlassLevel; label: string }[] = [
  { level: 'g1', label: 'G1' },
  { level: 'g2', label: 'G2' },
  { level: 'g3', label: 'G3' },
];
