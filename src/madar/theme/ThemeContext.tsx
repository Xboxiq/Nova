import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { GlassLevel, ThemeName } from "./themes";

interface ThemeContextValue {
  theme: ThemeName;
  glass: GlassLevel;
  rtl: boolean;
  dir: "rtl" | "ltr";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  theme: ThemeName;
  glass: GlassLevel;
  rtl: boolean;
  children: ReactNode;
}

/**
 * Read-only view of the shell's theme state for the Madar library.
 *
 * The app owns theme, glass level, and direction, and applies them once on the
 * document element (`data-theme`, `data-glass`, `dir`). This provider exists so
 * Madar sections that branch on direction or glass level keep working and stay
 * subscribed to changes; it never sets state of its own and never re-declares
 * colors.
 */
export function ThemeProvider({ theme, glass, rtl, children }: ThemeProviderProps) {
  const value = useMemo<ThemeContextValue>(
    () => ({ theme, glass, rtl, dir: rtl ? "rtl" : "ltr" }),
    [theme, glass, rtl],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
