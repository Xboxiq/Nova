import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { AnimatedDrawer } from '../../components/imported/animated-drawer';

export function Imported() {
  return (
    <Section label="Imported">
      <SectionHeader eyebrow="42 · IMPORTED" title="كودٌ مستورَد، مُنفَّذٌ بمتطلّباته لا بمتطلّباتنا">
        أرسل المالك كودًا مرجعيًّا وأمر أن يُنفَّذ <b>كما تنصّ متطلّباته</b>، بلا تقييدٍ بشروط هذا المستودع. فثُبِّتت تبعيّاتُه الأربع — <code>vaul</code> و<code>react-use-measure</code> و<code>motion</code> و<code>lucide-react</code> — وثُبِّت Tailwind، وبُقيَت أصنافُه ونصفُ أقطارِه وألوانُه <b>حرفيًّا</b> كما هي، حتى حيث تخالف قانونَنا. والمخالفاتُ مسجَّلةٌ في <code>design-system/IMPORTED.md</code> لا مخفيّة.
      </SectionHeader>

      <SpecList>
        <SpecRow name="AnimatedDrawer: الارتفاعُ يتحرّك إلى المشهد" bare specimen={
          <div className="flex w-full justify-center py-4">
            <AnimatedDrawer />
          </div>
        }>
          الملفُّ المرفوع كان تحويلَ نصٍّ غنيّ إلى markdown، والمحوِّلُ أكلَ <b>كلَّ وسمِ JSX</b> كأنه HTML: لا <code>Drawer.Root</code>، ولا <code>button</code>، ولا <code>h2</code>. فالبنيةُ أُعيد بناؤها من الخصائص الباقية — <b>وليست تخمينًا</b>: اجتماعُ <code>h-64</code> على المحتوى، و<code>useMeasure</code> على العنصر الداخليّ، و<code>motion</code> مستوردةً، و<code>Drawer.Content asChild</code> يُهجّي ميكانيكيّةً واحدةً بالضبط — <b>ارتفاعُ الدرج يتحرّك إلى الارتفاع المقيس للمشهد الظاهر</b>. و<code>h-64</code> ارتفاعُ السكون، و<code>asChild</code> يسلّم العنصرَ لـ<code>motion.div</code>. وذاك سببُ استيراد <code>useMeasure</code> أصلًا.
        </SpecRow>

        <SpecRow name="ما بقي حرفيًّا، وما أُضيف" specimen={
          <div className="grid w-full gap-2 text-[12.5px]">
            {[
              ['أصنافُ Tailwind', 'حرفيًّا', 'هي هندسةُ المكوّن لا زينته'],
              ['rounded-[36px] · rounded-3xl', 'حرفيًّا', 'يخالف سُلَّمَنا'],
              ['bg-red-50 / text-red-600', 'حرفيًّا', 'زوجُ حالةٍ بصبغةٍ واحدة'],
              ['bg-sky-400', 'حرفيًّا', 'لونٌ خارج الرموز'],
              ['المفتاح "pharse"', 'حرفيًّا', 'مُعرِّفٌ داخليّ، وتصحيحُه صمتًا إعادةُ كتابة'],
              ['Drawer.Title / Description', 'أُضيف', 'vaul يطلب اسمًا للحوار'],
              ['aria-label على الإغلاق', 'أُضيف', 'زرٌّ محتواه أيقونةٌ بلا اسم'],
              ['العودة إلى default عند الإغلاق', 'أُضيف', 'درجٌ يتذكّر قرارًا تُرك'],
            ].map(([what, how, why]) => (
              <div key={what} className="grid grid-cols-[1.4fr_0.6fr_1.4fr] gap-2 border-b border-neutral-200 pb-1.5 dark:border-neutral-800">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{what}</span>
                <span className={how === 'حرفيًّا' ? 'text-neutral-600 dark:text-neutral-400' : 'text-sky-700 dark:text-sky-400'}>{how}</span>
                <span className="text-neutral-600 dark:text-neutral-400">{why}</span>
              </div>
            ))}
          </div>
        }>
          الفرقُ بين <b>تنفيذٍ</b> و<b>إعادةِ كتابة</b> هو هذا الجدول. ما بقي حرفيًّا بقي حتى حيث يخالف — لأن المطلوب كان تنفيذَ متطلّباته لا متطلّباتنا. وما أُضيف <b>لا يغيّر تصميمًا</b>: كلُّه الفرقُ بين أن يعمل وألّا يعمل. و<b>لم يُنزَع شيء</b>.
        </SpecRow>
      </SpecList>
    </Section>
  );
}
