import { Section, SectionHeader } from '../SectionHeader';
import { DayStrip, DutyCycle, TariffClock, WindowPicker } from '../../components/schedule';
import { MiniBarChart } from '../../components/charts';

function Cell({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 18,
      }}
    >
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
        <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-2)' }}>{note}</p>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>{children}</div>
    </div>
  );
}

export function Schedule() {
  return (
    <Section label="Schedule">
      <SectionHeader eyebrow="33 · SCHEDULE" title="اليوم كمحور، والنوافذ التي تسعّره">
        الكهرباء ليست بسعر واحد. والسؤال العملي ليس «كم استهلكت» بل «متى تشغّله»، وهذا سؤال عن محور لا عن رقم. هذه العائلة تبني المحور مرّة وتقرأه ثلاث قراءات: شريطًا يُعَدّ، ودائرة تُظهر شكل الخطّة، ونافذة تُسعَّر وتُقارَن بأرخص منها.
      </SectionHeader>

      <div style={{ display: 'grid', gap: 20 }}>
        <Cell
          title="Day Strip: أربع وعشرون خانة تُعَدّ"
          note="شريطٌ واحد طويل يجيب «كم»، وأربع وعشرون خانة تجيب «متى» ويمكن للقارئ أن يشير إلى ساعة. والساعات التي لم تأتِ بعد مخطَّطة لأنها ليست قراءة، والساعة الحالية غائرة في الشريط لا مرسومة عليه — وهذا كل ما تبقّى من العمق بعد أن ذهبت الظلال."
        >
          <DayStrip />
        </Cell>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
          <Cell
            title="Tariff Clock: اليوم مغلقًا في دائرة"
            note="اليوم دورة، والشريط يقطعه عند منتصف الليل. على المينا تقع الذروة مقابل ساعات الهدوء فيُقرأ شكل الخطّة بنظرة. مرسومة بالحدود لا بالتعبئة، فسُمك الحلقة هو الجسم، واليد التي تعبرها هي التراكب."
          >
            <TariffClock />
          </Cell>

          <Cell
            title="Duty Cycle: كيف اشتغلت الآلة"
            note="الأعمدة تجيب «كم في كل ساعة»، وهذا يجيب «كيف اشتغل»: طول العلامة مدّة، وإزاحتها الرأسية حالة. كتلة واحدة طويلة آلةٌ استقرّت، وسياجٌ من القصيرات آلةٌ لم تستطع — فالعيب شكلٌ يُرى قبل أن تُقرأ جملته. والدورة التي بدأت قبل النافذة مقطوعة الحرف لا مُتلاشية: حافّةٌ تقول «أكمل خلفي» معلومة، والتلاشي جوّ."
          >
            <DutyCycle />
          </Cell>

          <Cell
            title="Edge Reading: القراءة حرفٌ لا كتلة"
            note="في المرجع يُضاء رأس العمود ويتلاشى جسمه. أخذنا الادّعاء ورفضنا التدرّج: الحرف مصمت لأنه القراءة، والجسم مخطَّط لأنه المساحة التي تقف فيها القراءة لا القراءة نفسها — وهو المعنى الذي أعطاه §15-ب للتخطيط أصلًا."
          >
            <div style={{ width: '100%', maxWidth: 340 }}>
              <MiniBarChart
                height={120}
                reading="edge"
                target={{ value: 400, label: '400 ك.و.س', tone: 'var(--danger)' }}
                data={[
                  { label: 'يناير', value: 318 },
                  { label: 'فبراير', value: 296 },
                  { label: 'مارس', value: 344 },
                  { label: 'أبريل', value: 402 },
                  { label: 'مايو', value: 468 },
                  { label: 'يونيو', value: 412 },
                ]}
              />
            </div>
          </Cell>

          <Cell
            title="Window Picker: متى تشغّله، وبكم"
            note="يعرض الشريط نفسه لا نسخة ثانية من الهندسة: محور واحد وسلوكان. اضغط ساعة البداية ثم النهاية، فيُسعَّر الاختيار ساعةً ساعةً عبر الخطّة — ثم يُقارَن بأرخص نافذة بالطول نفسه، حتى يكون للرقم مرجعٌ لا يقف وحده."
          >
            <WindowPicker />
          </Cell>
        </div>
      </div>
    </Section>
  );
}
