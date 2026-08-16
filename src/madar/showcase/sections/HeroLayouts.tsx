import { Section, SectionHeader } from '../SectionHeader';
import {
  SplitStatsHero, ProductHero, ImmersiveHero, DisplayWordHero, GalleryScatterHero,
} from '../../components';

/* A labelled frame so each hero reads as one catalogued layout pattern. */
function LayoutCase({ n, name, note, children }: { n: string; name: string; note: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 34 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{n}</span>
        <span style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.01em' }}>{name}</span>
        <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{note}</span>
      </div>
      {children}
    </div>
  );
}

export function HeroLayouts() {
  return (
    <Section label="Hero Layouts">
      <SectionHeader eyebrow="24 · HERO LAYOUTS" title="Five hero compositions, one token system">
        The 2026 hero patterns, rebuilt as reusable components. Split, product, immersive, display-word, and gallery-scatter — each recolors with the theme, mirrors under RTL, and needs zero external assets (the image areas are generative, token-derived visuals you can swap for real art).
      </SectionHeader>

      <LayoutCase n="01" name="Split · stats" note="نص + صورة جنباً إلى جنب، وصفٌّ إحصائي في الأسفل">
        <SplitStatsHero />
      </LayoutCase>

      <LayoutCase n="02" name="Product" note="عنوان + دعوة، ثم لوحة منتج بعرض كامل">
        <ProductHero />
      </LayoutCase>

      <LayoutCase n="03" name="Immersive" note="صورة ملء الإطار، تنقّل معلّق، عنوان وإثبات اجتماعي">
        <ImmersiveHero />
      </LayoutCase>

      <LayoutCase n="04" name="Display word" note="كلمة عملاقة تخترقها صورة بؤرية في المنتصف">
        <DisplayWordHero />
      </LayoutCase>

      <LayoutCase n="05" name="Gallery scatter" note="عنوان مركزي تحيط به بلاطات صور متناثرة">
        <GalleryScatterHero />
      </LayoutCase>
    </Section>
  );
}
