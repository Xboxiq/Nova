import { Section, SectionHeader } from '../SectionHeader';
import { DiaText, Ignite, SkillsShowcase, ListBox, ActivityDropdown, EventCard } from '../../components';

export function TextLists() {
  return (
    <Section label="Text and lists">
      <SectionHeader eyebrow="15 · TEXT & LISTS" title="Expressive text, listboxes & events">
        Dia text ignites on hover, skill chips wrap, listboxes describe themselves, and the event card composes live status — all from <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/components</code>.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        {/* dia text + skills */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 26, }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Dia text — key words ignite (hover them)</div>
          <DiaText>
            We build <Ignite>calm platforms</Ignite> where every surface speaks <Ignite shift={-1}>two languages</Ignite> from birth.
          </DiaText>
          <div style={{ height: 1, background: 'var(--border)', margin: '22px 0 18px' }} />
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Skills showcase — wrapping chip cloud</div>
          <SkillsShowcase skills={['تصميم واجهات', 'Design systems', 'RTL', 'Motion', 'Prototyping']} more={6} />
        </div>

        {/* listbox + activity dropdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Listbox — icon tile + title + description (click)</div>
          <ListBox options={[
            { title: 'Public', description: 'Anyone with the link can view', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" /></svg> },
            { title: 'Team only', description: 'Members of this workspace', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg> },
            { title: 'Private', description: 'Only you', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg> },
          ]} />
          <div style={{ height: 1, background: 'var(--border)', margin: '18px 0' }} />
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Activity dropdown</div>
          <ActivityDropdown items={[
            { content: <><b>سارة</b> approved your request</>, initials: 'سع', tint: 'accent', time: '2m', unread: true },
            { content: <><b style={{ color: 'var(--text)' }}>Yousef</b> commented on the plan</>, initials: 'YH', tint: 'info', time: '1h' },
          ]} />
        </div>

        {/* event manager */}
        <EventCard
          title="درس الفيزياء: مجموعة ب"
          status={{ label: 'Open', tone: 'success' }}
          details={[
            { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>, text: 'Sun & Tue & Thu · 4:30–6:00 PM' },
            { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>, text: 'قاعة 204 · مبنى العلوم' },
            { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg>, text: '18 / 24 seats filled' },
          ]}
          capacity={0.75}
        />
      </div>
    </Section>
  );
}
