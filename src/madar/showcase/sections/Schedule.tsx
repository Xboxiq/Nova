import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { DayStrip, DutyCycle, TariffClock, WindowPicker } from '../../components/schedule';
import { MiniBarChart } from '../../components/charts';


export function Schedule() {
  return (
    <Section label="Schedule">
      <SectionHeader eyebrow="33 · SCHEDULE" title="اليوم كمحور، والنوافذ التي تسعّره">
        الكهرباء ليست بسعر واحد. والسؤال العملي ليس «كم استهلكت» بل «متى تشغّله»، وهذا سؤال عن محور لا عن رقم. هذه العائلة تبني المحور مرّة وتقرأه أربع قراءات: شريطًا يُعَدّ، ودائرة تُظهر شكل الخطّة، ونافذة تُسعَّر وتُقارَن بأرخص منها، وسجلًّا يقول كيف اشتغلت الآلة.
      </SectionHeader>

      <SpecList>

      <SpecRow name="Day Strip: أربع وعشرون خانة تُعَدّ" specimen={<DayStrip />}>
        شريطٌ واحد طويل يجيب «كم»، وأربع وعشرون خانة تجيب «متى» ويمكن للقارئ أن يشير إلى ساعة. والساعات التي لم تأتِ بعد مخطَّطة لأنها ليست قراءة، والساعة الحالية غائرة في الشريط لا مرسومة عليه — وهذا كل ما تبقّى من العمق بعد أن ذهبت الظلال.
      </SpecRow>

      <SpecRow name="Tariff Clock: اليوم مغلقًا في دائرة" specimen={<TariffClock />}>
        اليوم دورة، والشريط يقطعه عند منتصف الليل. على المينا تقع الذروة مقابل ساعات الهدوء فيُقرأ شكل الخطّة بنظرة. مرسومة بالحدود لا بالتعبئة، فسُمك الحلقة هو الجسم، واليد التي تعبرها هي التراكب.
      </SpecRow>

      <SpecRow name="Duty Cycle: كيف اشتغلت الآلة" specimen={<DutyCycle />}>
        الأعمدة تجيب «كم في كل ساعة»، وهذا يجيب «كيف اشتغل»: طول العلامة مدّة، وإزاحتها الرأسية حالة. كتلة واحدة طويلة آلةٌ استقرّت، وسياجٌ من القصيرات آلةٌ لم تستطع — فالعيب شكلٌ يُرى قبل أن تُقرأ جملته. والدورة التي بدأت قبل النافذة مقطوعة الحرف لا مُتلاشية.
      </SpecRow>

      <SpecRow
        name="Edge Reading: القراءة حرفٌ لا كتلة"
        specimen={(
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
        )}
      >
        في المرجع يُضاء رأس العمود ويتلاشى جسمه. أخذنا الادّعاء ورفضنا التدرّج: الحرف مصمت لأنه القراءة، والجسم مخطَّط لأنه المساحة التي تقف فيها القراءة لا القراءة نفسها — وهو المعنى الذي أعطاه §15-ب للتخطيط أصلًا.
      </SpecRow>

      <SpecRow name="Window Picker: متى تشغّله، وبكم" specimen={<WindowPicker />}>
        يعرض الشريط نفسه لا نسخة ثانية من الهندسة: محور واحد وسلوكان. اضغط ساعة البداية ثم النهاية، فيُسعَّر الاختيار ساعةً ساعةً عبر الخطّة — ثم يُقارَن بأرخص نافذة بالطول نفسه، حتى يكون للرقم مرجعٌ لا يقف وحده.
      </SpecRow>
      </SpecList>
    </Section>
  );
}
