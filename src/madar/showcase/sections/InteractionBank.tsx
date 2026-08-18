import { Section, SectionHeader } from '../SectionHeader';
import { useTheme } from '../../theme/ThemeContext';
import { ToolbarDock, ToggleChips, Fieldset, Field, MiniBarChart } from '../../components';

const TOOLS = [
  { label: 'Cursor', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 8-6.5 1.5L9 19 5 3z" /></svg> },
  { label: 'Text', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5h12M12 5v14M9 19h6" /></svg> },
  { label: 'Shapes', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8.5" cy="8.5" r="4" /><rect x="12" y="12" width="8" height="8" rx="1.5" /></svg> },
  { label: 'Pen', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6-10 10H4v-6L14 4z" /></svg> },
  { label: 'Comment', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 1 0-3.6 6.7L20 20l-1-3.6A8 8 0 0 0 20 12z" /></svg> },
];

export function InteractionBank() {
  const { rtl } = useTheme();
  return (
    <Section label="Interaction bank">
      <SectionHeader eyebrow="17 · INTERACTION BANK" title="The 21st.dev imports: completed">
        The last four patterns from the import list (design.md §18), as reusable components: the editor toolbar dock, HeroUI toggle chips and fieldset, and the bar variant of the mini chart. The other 27 live in sections 04–16 — all importable from <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/components</code>.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Toolbar dock — pill glides and stretches between tools</div>
          <div style={{ display: 'grid', placeItems: 'center', padding: '26px 12px', borderRadius: 16, background: 'repeating-linear-gradient(45deg, var(--accent-soft) 0 10px, transparent 10px 20px), var(--bg-deep)', border: '1px solid var(--border)' }}>
            <ToolbarDock tools={TOOLS} rtl={rtl} />
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 12 }}>Editors and canvases · active tool absorbs its label · glide 400ms</div>
          <div style={{ height: 1, background: 'var(--border)', margin: '18px 0' }} />
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Toggle chips — filters, multi-select tags</div>
          <ToggleChips options={['توصيل سريع', 'Cash on delivery', 'Vegan', 'حلال', 'Gluten-free']} defaultValue={[0, 2]} />
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Fieldset — legend rides the border as a chip</div>
          <Fieldset legend="SHIPPING · الشحن">
            <Field label="Street address" placeholder="شارع العليا، الرياض" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="City" placeholder="Riyadh" />
              <Field label="Postal code" placeholder="12211" style={{ fontVariantNumeric: 'tabular-nums' }} />
            </div>
          </Fieldset>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Mini bar chart — grows once, staggered 120ms, hover for values</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>WEEKLY ORDERS</div>
              <div style={{ fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', marginTop: 2 }}>417</div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 999, background: 'var(--success-soft)', color: 'var(--success)', fontSize: 12, fontWeight: 600 }}>↑ 8.2%</span>
          </div>
          <MiniBarChart data={[
            { label: 'Sat', value: 34 }, { label: 'Sun', value: 58 }, { label: 'Mon', value: 46 },
            { label: 'Tue', value: 72 }, { label: 'Wed', value: 64 }, { label: 'Thu', value: 92 }, { label: 'Fri', value: 51 },
          ]} />
        </div>
      </div>
    </Section>
  );
}
