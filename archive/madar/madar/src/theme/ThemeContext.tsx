import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ThemeName, GlassLevel } from './themes';

interface ThemeContextValue {
  theme: ThemeName;
  glass: GlassLevel;
  rtl: boolean;
  dir: 'rtl' | 'ltr';
  setTheme: (t: ThemeName) => void;
  setGlass: (g: GlassLevel) => void;
  toggleRtl: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('mint');
  const [glass, setGlass] = useState<GlassLevel>('g2');
  const [rtl, setRtl] = useState(false);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    glass,
    rtl,
    dir: rtl ? 'rtl' : 'ltr',
    setTheme,
    setGlass,
    toggleRtl: () => setRtl((v) => !v),
  }), [theme, glass, rtl]);

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={theme}
        data-glass={glass}
        dir={value.dir}
        style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
