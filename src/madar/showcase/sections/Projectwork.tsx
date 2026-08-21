import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { ArcGauge, COURSES, LaneBoard, LearnHub, TaskCard, TaskLane, TimeSheet, TrackGantt, UploadFeed, bandLegend } from '../../components/projectwork';
import { PaletteSlide, SplitDonut, type Swatch } from '../../components/boards';

/* The light slide's own palette, from the reference. Passed rather than built in,
   because a palette is the one thing on a palette slide that must be the
   caller's. */
const LAVENDER: Swatch[] = [
  { hex: '#365FF0', from: '#93aefb', mid: '#365ff0', to: '#2246bd' },
  { hex: '#FE6331', from: '#ffa887', mid: '#fe6331', to: '#c8451c' },
  { hex: '#D856DE', from: '#eda3f0', mid: '#d856de', to: '#a936af' },
  { hex: '#1D1C20', from: '#55545c', mid: '#2c2b31', to: '#1d1c20' },
  { hex: '#FFFFFF', from: '#fff', mid: '#fff', to: '#dcdae8' },
];

const SAMPLE = {
  id: 'demo',
  title: 'Enhance Visual Feedback',
  due: 'Jun 14',
  who: ['GW', 'AM'],
  priority: 'Medium' as const,
  subtasks: ['Hover states', 'Focus ring'],
  file: 'feedback.fig',
  band: 'progress' as const,
  progress: 62,
};

export function Projectwork() {
  return (
    <Section label="Projectwork">
      <SectionHeader eyebrow="39 · PROJECTWORK" title="لوحان يبدوان منتجَين، وهما نحوٌ واحد بمفتاحَين">
        في الدفعة لوحُ هندسةٍ بنفسجيّ داكن ومركزُ تعلُّمٍ فاتح، ويبدوان منتجَين مختلفَين حتى تُقاس بنيتهما: كلاهما يعدّ العمل <b>مساراتٍ</b>، وكلاهما يرسم ما بُلِغ منها مصمتًا وما بقي <b>مهشَّرًا</b>، وكلاهما يقلب لونَ صفٍّ واحدٍ بالضبط ليقول «هذا الذي أنت عليه»، وكلاهما يشتقّ النسبة من عدّادَين لا يطبعها. فمِلَفٌّ واحد ومفتاحان مسمّيان، وكلُّ مكوّنٍ يأخذ المفتاح لا اللون — حتى لا ينزلق التوأم الفاتح إلى لوحةٍ ثالثة كما فعلت البِيَض الإحدى عشر في الدفعة الماضية.
      </SectionHeader>

      <SpecList>
        <SpecRow name="TimeSheet: الصدارة لِمَن قاسته الأرقام" specimen={<TimeSheet />}>
          الصفّ الأول يجلس في لوحةِ لون التمييز — <b>لكن حين تكون القائمة مرتّبةً بالساعات فقط</b>. رتّبها بالاسم فالأول ليس المتصدّر، ولوحةٌ تبقى في مكانها تكون قد زيّنت الشخص الخطأ. ومُبدِّل الفترة يضرب الأرقام فعلًا: الشهر ليس أسبوعًا بتعليقٍ آخر. والشريط الصغير حصّةُ كلٍّ من ساعات المتصدّر، وهو ما يجعل القائمة لوحَ صدارةٍ لا أربع جُمَل.
        </SpecRow>

        <SpecRow name="ArcGauge: ٨٧٫٢٩ و٢٤٪ على قرصٍ واحد" specimen={(
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <ArcGauge />
            <ArcGauge tone="light" />
          </div>
        )}>
          يطبع المرجع رقمَين على قرصٍ واحد، والطريقة الوحيدة لانتمائهما معًا أن تكون النسبة <b>حصّةَ نطاقٍ من المجموع</b>. فالمجموع مجموعُ النطاقات والقراءة <code>النطاق ÷ المجموع</code> — انتقِ نطاقًا آخر يتحرّك الإبراز والنسبة معًا. ومرورُ أيٍّ منهما كخاصيّة يسمح للقرص أن يخالف نفسه. والقوس مرسومٌ دائرةً لكل نطاق بإزاحة شَرْطة، فلا حسابَ مسارات، والفجوة بين نطاقَين هي فجوةُ الشَرْطة نفسها. {bandLegend()}
        </SpecRow>

        <SpecRow name="TaskCard: «مهمّتان فرعيّتان» عدّادٌ يَنقص" specimen={(
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: 280 }}><TaskCard task={SAMPLE} /></div>
            <div style={{ width: 280 }}><TaskCard task={SAMPLE} tone="light" active /></div>
          </div>
        )}>
          رقاقةُ «مهمّتان فرعيّتان» في المرجع عدد. وهي هنا عددُ ما <b>بقي</b>، فتأشيرُ واحدةٍ يغيّره — ورقاقةٌ تطبع المجموع تكون وسمًا يتنكّر في هيئة قراءة. والراية الملوّنة أولويّةٌ بثلاث درجات لكلٍّ صبغتها، ورقاقة الملفّ تحمل مربّعًا صغيرًا بلون النطاق نفسه المستخدَم في القرص والمسارات: ذاك الاقتصادُ اللونيّ هو ما يجعل الأشياء تُقرأ منتجًا واحدًا.
        </SpecRow>

        <SpecRow name="LaneBoard: البطاقة تنتقل، والمسار الفارغ مهشَّر" fill specimen={(
          <div style={{ display: 'grid', gap: 14, width: '100%' }}>
            <LaneBoard />
            <LaneBoard tone="light" />
          </div>
        )}>
          والمفتاحان كلاهما على الصفحة، لا الداكن وحده: لوحٌ يقبل مفتاحًا لا يُعرَض به هو ادّعاءٌ لا يقيسه شيء — وقد ثبت ذلك بالتجربة، إذ لم يلتقط المقياسُ عطبًا زرعتُه في حبر الرؤوس الفاتحة لأن الفاتح لم يكن معروضًا. ولمَ لوحٌ جديد ولدينا <code>KanbanBoard</code>؟ ليس جديدًا: اللوح هنا ثلاثةُ أعمدةٍ برؤوسٍ ملوّنة والبطاقةُ هي الجديد. لكن البطاقات <b>تنتقل فعلًا</b> — اضغط السهم فتصعد إلى المسار التالي والعدّاد في رأسه يتبعها. والمسار الفارغ مهشَّرٌ لا خالٍ: §١٥-ب، عُدَّ ولم يتحقّق. عمودٌ فارغٌ مرسومٌ خاليًا يبدو عمودًا غير موجود.
        </SpecRow>

        <SpecRow name="UploadFeed: ٤٣٪ حالةٌ لا لقطة" specimen={<UploadFeed />}>
          يُظهر المرجع ٤٣٪ مجمَّدةً في لقطة، وعيّنةٌ تتحرّك من تلقاء نفسها شيءٌ لا يستطيع القارئ فحصه — فالخطوة زرٌّ، وما بعد الشريط مهشَّرٌ بنفس المعنى. والشريط <code>progressbar</code> بقيمةٍ حقيقية لا <code>div</code> ملوّن، فالقارئ الصوتيّ يسمع الرقم. وحدُّه معلَنٌ في الملفّ: لا شيء هنا يخاطب شبكة.
        </SpecRow>

        <SpecRow name="SplitDonut: لا دائرةَ تقدُّمٍ ثانية" specimen={(
          <SplitDonut slices={[{ label: 'Completed', value: 72, kind: 'solid' }, { label: 'In progress', value: 19, kind: 'hatch' }, { label: 'Pending', value: 9, kind: 'accent' }]} />
        )}>
          دائرة «My Progress ٧٢٪» في مركز التعلُّم لها قطاعٌ <b>مهشَّر</b> لِـ«قيد التنفيذ». وهذه <code>SplitDonut</code> كما هي: صيغةُ قطاعها <code>hatch</code> تعني منذ الدفعة الماضية ما يعنيه هذا القطاع بالضبط. فلم يُكتب مكوّنٌ ثانٍ — رُفِض، وهذا سببُ الرفض مكتوبًا.
        </SpecRow>

        <SpecRow name="TrackGantt + CourseCard: الدورة تقود الجدول" fill specimen={<LearnHub />}>
          بطاقاتُ الدورات تدرُّجاتٌ تحمل <b>لوحةً داكنة في جوفها</b> — وهي ما يجعل القراءة مقروءةً على أرضيةٍ مشبَعة بدل أن تصارعها. ونسبتُها <code>المنجَز ÷ الكلّ</code> فلا يمكن للسطرَين أن يتخالفا. والجدول تحتها ليس صورةً: انتقِ دورةً يتبعها صفُّها، وانتقِ صفًّا تتبعه البطاقة — رابطةٌ في الاتجاهين لأن ذلك هو ما يجعل الاثنين لوحًا واحدًا. والمسار الفارغ مهشَّرٌ ثمانيةَ أسابيع.
        </SpecRow>

        <SpecRow name="TaskLane: بطاقةٌ واحدةٌ مقلوبة" specimen={(
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <TaskLane />
            <div style={{ width: 280 }}>
              <TrackGantt courses={COURSES.slice(0, 2)} weeks={6} />
            </div>
          </div>
        )}>
          واحدةٌ بالضبط مقلوبةٌ إلى الداكن، وهي <b>التي انتقيتَها</b> — لا الأولى دائمًا. هذا هو الفرق بين حالةٍ وأسلوب: أسلوبٌ يقلب البطاقة الأولى ويسمّيها «النشطة» يكذب في اللحظة التي ينتقي فيها القارئ غيرها.
        </SpecRow>

        <SpecRow name="PaletteSlide: التوأم الفاتح تسع أسطر" bare specimen={<PaletteSlide tone="light" swatches={LAVENDER} face="Neue Montreal" />}>
          نفس الشريحة على حقلٍ خُزاميّ. وهذا <b>مفتاحٌ لا مكوّن</b>: الخطّ والأقراص والكريّات وسلوك النسخ والمنطقة الحيّة كلّها كما هي، والمتغيّر الحقل وجهةُ الحبر فقط. فكان الثمن تسع أسطر — وبناؤها مرّتين هو كيف تنتهي المكتبة بشريحتَين تتباعدان. والألوان الخمسة تُمرَّر من العَرض، لأن اللوحة هي الشيء الوحيد على شريحة لوحةٍ الذي يجب أن يكون للمستدعي.
        </SpecRow>
      </SpecList>
    </Section>
  );
}
