import { Section } from '../SectionHeader';
import { SpecShelf } from '../SpecRow';
import {
  AtelierEyebrow, BezelCard, MagneticCTA, RevealOnView, SpecularCard, EditorialFigure, DisplaySerif,
} from '../../components';

/* ATELIER — a signature Editorial-Luxury moment on a Z-Axis cascade,
   built from the atelier primitives. Grain, macro-whitespace, Didone display,
   machined double-bezel cards, magnetic CTA, heavy scroll-reveals. */
export function Atelier() {
  return (
    <Section label="Atelier" maxWidth={1240} padding="120px 32px 40px">
      <div style={{ position: 'relative' }}>
        {/* film-grain wash for a physical, printed feel */}
        <span aria-hidden style={{ position: 'absolute', inset: '-40px', pointerEvents: 'none', opacity: 0.5, mixBlendMode: 'overlay', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.32'/%3E%3C/svg%3E\")" }} />

        {/* Editorial split header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)', gap: 32, alignItems: 'end', marginBottom: 64 }}>
          <RevealOnView>
            <AtelierEyebrow>Atelier · الطبقة الفاخرة</AtelierEyebrow>
            <h2 style={{ margin: '18px 0 0' }}>
              <DisplaySerif style={{ display: 'block' }}>Crafted to the</DisplaySerif>
              <DisplaySerif style={{ display: 'block', fontStyle: 'italic', color: 'var(--accent)' }}>last micron.</DisplaySerif>
            </h2>
          </RevealOnView>
          <RevealOnView delay={120}>
            <p style={{ fontSize: 16, lineHeight: '26px', color: 'var(--text-2)', maxWidth: '40ch', margin: '0 0 22px' }}>
              كل سطح مُصنَّع كقطعة عتاد: حاوية داخل حاوية، إضاءة محفورة، ولمعة تتبع يدك. حركة لها وزنٌ فيزيائي حقيقي.
            </p>
            <MagneticCTA label="اكتشف الحرفية" tone="ink" />
          </RevealOnView>
        </div>

        {/* Z-Axis cascade of machined cards */}
        <SpecShelf bare rhythm={[5, 4, 3]}>
          <RevealOnView delay={0} style={{ transform: 'rotate(-1.4deg)' }}>
            <SpecularCard style={{ height: '100%' }}>
              <div style={{ padding: 26, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <EditorialFigure value="99" eyebrow="Kinetics" label="حركة فيزيائية" sub="كتالوج كامل من التفاعلات الزنبركية، لا مؤقتات ثابتة." />
              </div>
            </SpecularCard>
          </RevealOnView>

          <RevealOnView delay={110} style={{ transform: 'translateY(18px)' }}>
            <SpecularCard style={{ height: '100%' }} maxTilt={9}>
              <div style={{ padding: 26, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <EditorialFigure value="5" eyebrow="Themes" label="سمات · مستويات زجاج" sub="oklch، إعادة تلوين فورية، RTL و LTR بلا استثناءات." />
              </div>
            </SpecularCard>
          </RevealOnView>

          <RevealOnView delay={220} style={{ transform: 'rotate(1.4deg)' }}>
            <SpecularCard style={{ height: '100%' }}>
              <div style={{ padding: 26, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <EditorialFigure value="170" eyebrow="Components" label="مكوّن مُوثّق" sub="من الأزرار إلى لوحات الأدمن، بمعيار وكالة." />
              </div>
            </SpecularCard>
          </RevealOnView>
        </SpecShelf>

        {/* Double-Bezel feature plate + island CTA */}
        <RevealOnView delay={80} style={{ marginTop: 32 }}>
          <BezelCard radius={34} inset={7}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)', gap: 28, alignItems: 'center', padding: 'clamp(28px, 5vw, 56px)' }}>
              <div>
                <DisplaySerif size="clamp(30px, 4vw, 52px)" style={{ display: 'block' }}>The machined</DisplaySerif>
                <DisplaySerif size="clamp(30px, 4vw, 52px)" style={{ display: 'block', fontStyle: 'italic' }}>surface.</DisplaySerif>
                <p style={{ fontSize: 14.5, lineHeight: '23px', color: 'var(--text-2)', maxWidth: '38ch', margin: '16px 0 24px' }}>
                  غلاف خارجي مثل صينية ألمنيوم، ونواة زجاجية بأنصاف أقطار متراكزة وإضاءة داخلية. هذا ما يفصل «قالب بخط جميل» عن «بناء بمئة ألف دولار».
                </p>
                <MagneticCTA label="ابنِ عليه" tone="accent" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <BezelCard radius={20} inset={5} style={{ background: 'var(--ink)' }} innerStyle={{ background: 'var(--ink)' }}>
                  <div style={{ padding: '18px 20px', color: 'var(--on-ink)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13.5, opacity: 0.7 }}>Concentric radii</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.9 }}>34 → 27 → 20</span>
                  </div>
                </BezelCard>
                <BezelCard radius={20} inset={5}>
                  <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Inset highlight</span>
                    <span style={{ width: 46, height: 22, borderRadius: 6, background: 'linear-gradient(180deg, color-mix(in srgb, white 60%, transparent), transparent), var(--surface-2)', boxShadow: 'inset 0 1px 0 color-mix(in srgb, white 70%, transparent)' }} />
                  </div>
                </BezelCard>
              </div>
            </div>
          </BezelCard>
        </RevealOnView>
      </div>
    </Section>
  );
}
