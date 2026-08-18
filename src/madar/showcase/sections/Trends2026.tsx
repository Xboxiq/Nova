import { Section, SectionHeader } from '../SectionHeader';
import {
  ProgressiveBlur, LiquidGlassCard, GlassSegmented,
  AnticipatoryDashboard, PromptCanvas, GlanceableTile,
} from '../../components';

/* A vivid aurora stage so the glass actually reads (glass needs content
   behind it — the #1 lesson from the 2026 trends research). */
function GlassStage({ children, minHeight = 260 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', minHeight, padding: 24, border: '1px solid rgba(255,255,255,0.08)', background: 'radial-gradient(120% 100% at 20% 0%, oklch(from var(--accent) 0.5 0.2 h), oklch(0.2 0.06 274) 55%, oklch(0.14 0.05 274))' }}>
      <span aria-hidden style={{ position: 'absolute', top: '-20%', insetInlineEnd: '-6%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, oklch(from var(--accent) 0.62 0.2 calc(h + 40) / 0.8), transparent 62%)', filter: 'blur(60px)', animation: 'auroraDrift 20s ease-in-out infinite' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}

export function Trends2026() {
  return (
    <Section label="Trends 2026">
      <SectionHeader eyebrow="22 · TRENDS 2026" title="The modern vocabulary: glass, generative, glanceable">
        Built from the X trends research: progressive blur, reactive liquid glass, anticipatory AI dashboards, prompt-first canvases, and glanceable AR tiles. Every source tweet is mapped in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>TRENDS.md</code>.
      </SectionHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20, alignItems: 'start' }}>
        {/* liquid glass + glass segmented over aurora */}
        <GlassStage minHeight={320}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Liquid glass · reactive</div>
          <GlassSegmented options={['يومي', 'أسبوعي', 'شهري']} defaultIndex={1} />
          <div style={{ marginTop: 16 }}>
            <LiquidGlassCard>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', opacity: 0.7 }}>MONTHLY REVENUE</div>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', margin: '6px 0 2px', fontVariantNumeric: 'tabular-nums' }}>84,120 <span style={{ fontSize: 14, opacity: 0.7 }}>SAR</span></div>
              <div style={{ fontSize: 12.5, opacity: 0.7 }}>حرّك المؤشّر — الظل واللمعة يتفاعلان</div>
            </LiquidGlassCard>
          </div>
        </GlassStage>

        {/* progressive blur over content */}
        <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)', maxHeight: 320 }}>
          <div style={{ padding: 20, paddingBottom: 90, height: 320, overflow: 'hidden' }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-2)', marginBottom: 12 }}>Progressive blur — يتدرّج نحو الحافة</div>
            {['طلب #8842 · سارة العلي', 'طلب #8841 · Omar Khalid', 'طلب #8840 · ريم القحطاني', 'طلب #8839 · Adam Darwish', 'طلب #8838 · لينا عزيز', 'طلب #8837 · Yousef', 'طلب #8836 · نورة'].map((r, i) => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 12px', borderRadius: 6, background: i % 2 ? 'var(--surface-2)' : 'transparent', fontSize: 13 }}>
                <span>{r}</span><span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-3)' }}>{199 - i * 7} SAR</span>
              </div>
            ))}
          </div>
          <ProgressiveBlur side="bottom" height={100} />
          <div style={{ position: 'absolute', insetInline: 0, bottom: 0, display: 'grid', placeItems: 'center', height: 70, zIndex: 4 }}>
            <button className="i-lift i-press-97" style={{ height: 38, padding: '0 20px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', }}>عرض الكل</button>
          </div>
        </div>

        {/* anticipatory AI dashboard */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20, }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-2)', marginBottom: 14 }}>Anticipatory AI — أين أنت / الناقص / التالي / لماذا</div>
          <AnticipatoryDashboard
            status={{ label: 'أين أنت', value: '68%', detail: 'اكتمال إعداد المتجر' }}
            gap={{ label: 'الناقص', value: 'الدفع الإلكتروني', detail: 'مطلوب لاستقبال الطلبات', tone: 'warning' }}
            next={{ label: 'فعّل مدى + Apple Pay في 3 دقائق', action: 'ابدأ' }}
            why="المتاجر التي تفعّل الدفع الإلكتروني ترفع معدل إتمام الطلب بنسبة ملموسة خلال أول أسبوع."
          />
        </div>

        {/* prompt-first canvas */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20, }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-2)', marginBottom: 14 }}>Prompt-first canvas — الواجهة تتولّد</div>
          <PromptCanvas />
        </div>
      </div>

      {/* glanceable AR tiles over a dark stage */}
      <div style={{ marginTop: 20 }}>
        <GlassStage minHeight={150}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>Glanceable AR tiles · Glimmer-style</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <GlanceableTile icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V9M10 19V5M16 19v-8M21 19H3" /></svg>} metric="12.4%" label="النمو الشهري" />
            <GlanceableTile icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16V6a1 1 0 0 1 1-1h9v11M13 8h4l3 4v4M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>} metric="18 min" label="وصول الطلب" accent="oklch(0.7 0.15 245)" />
            <GlanceableTile icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>} metric="الرياض" label="أقرب فرع · 2 كم" accent="oklch(0.75 0.16 158)" />
          </div>
        </GlassStage>
      </div>
    </Section>
  );
}
