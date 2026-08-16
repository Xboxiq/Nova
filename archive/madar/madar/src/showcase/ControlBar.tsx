import { useTheme } from '../theme/ThemeContext';
import { THEMES, GLASS_LEVELS } from '../theme/themes';

export function ControlBar() {
  const { theme, glass, rtl, setTheme, setGlass, toggleRtl } = useTheme();

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 60, padding: '12px 16px', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', maxWidth: 1160, width: '100%',
          padding: '10px 18px', borderRadius: 999, background: 'var(--glass)',
          backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-2), inset 0 1px 0 var(--glass-hl)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginInlineEnd: 'auto' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'conic-gradient(from 210deg, var(--accent), var(--accent-soft), var(--accent))', boxShadow: 'var(--shadow-1)' }} />
          <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>Madar <span style={{ color: 'var(--text-3)', fontWeight: 500 }}>مدار</span></div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)', border: '1px solid var(--border)', borderRadius: 999, padding: '2px 8px' }}>V1.0</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {THEMES.map((t) => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className="i-lift i-press-96"
              style={{
                display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 10px', borderRadius: 999,
                border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)',
                fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: t.swatch, display: 'inline-block', border: t.dark ? '1px solid oklch(0.5 0.05 274)' : undefined }} />
              {t.label}
              {theme === t.name && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {GLASS_LEVELS.map((g) => (
            <button
              key={g.level}
              onClick={() => setGlass(g.level)}
              className="i-soft-text"
              style={{
                display: 'flex', alignItems: 'center', gap: 5, height: 32, padding: '0 10px', borderRadius: 999,
                border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)',
                fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {g.label}
              {glass === g.level && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />}
            </button>
          ))}
          <button
            onClick={toggleRtl}
            className="i-soft i-press-96"
            style={{
              display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999,
              border: '1px solid var(--border-strong)', background: 'var(--surface-2)', color: 'var(--text)',
              fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
            }}
          >
            عربي RTL
            {rtl && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />}
          </button>
        </div>
      </div>
    </div>
  );
}
