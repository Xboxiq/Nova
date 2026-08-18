import { Section, SectionHeader } from '../SectionHeader';
import { UploadFolder, simulatedUpload, type Uploader } from '../../components/upload';

/* One file is made to fail, so the failed state and its retry are shown
   rather than described. Deterministic on purpose: a random failure would
   make the section behave differently on every visit and on every test run. */
const failsTheSecondFile: Uploader = (file, onProgress, signal) => {
  const marked = /\.(zip|rar|exe|dmg)$/i.test(file.name) || file.size > 8 * 1024 * 1024;
  if (!marked) return simulatedUpload(file, onProgress, signal);
  return new Promise((_, reject) => {
    let step = 0;
    const tick = window.setInterval(() => {
      step += 1;
      onProgress(step / 10);
      if (step >= 4) {
        window.clearInterval(tick);
        reject(new Error('rejected by the server'));
      }
    }, 90);
    signal.addEventListener('abort', () => {
      window.clearInterval(tick);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });
};

function Cell({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
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

export function Upload() {
  return (
    <Section label="Upload">
      <SectionHeader eyebrow="31 · UPLOAD" title="الرفع له وجهة، والوجهة تتفاعل">
        شريط تقدّم يعدّ إلى المئة يصف الزمن ولا يصف العمل. هنا للرفع مكان يذهب إليه: مجلّد يفتح غطاءه حين تهبط الملفات ويستقرّ مواربًا بعدها، وكل ملف يحمل حالته الخاصة — في الانتظار، جارٍ، تمّ، أخفق — مع مخرج منها: إلغاء أثناء النقل، وإعادة محاولة بعد الفشل.
      </SectionHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20, alignItems: 'start' }}>
        <Cell
          title="Solid: الجسم المبنيّ"
          note="ليس رسمًا لمجلّد بل مجلّد: ظهر وثلاثة جدران تمنحه سمكًا، وأوراق تتراكم بعدد الملفات، وغطاء على مفصلة حقيقية. كل وجه يأخذ لونه من توكن واحد وسطوعه من زاويته إلى ضوء واحد فوقه — مادة واحدة تُضاء، لا لوحة ألوان ثانية تُدار."
        >
          <UploadFolder variant="solid" />
        </Cell>

        <Cell
          title="Exploded: الجسم يشرح بناءه"
          note="نفس الأوجه تتباعد في العمق كما يفعل التفكيك الهندسي: الظهر، فالأوراق، فالغطاء. نظام التصميم يُظهر تركيبه وهو يعمل، لا في رسم توضيحي منفصل عنه."
        >
          <UploadFolder variant="exploded" title="أرشيف التسليم" meta="ثلاث طبقات: ظهر، أوراق، غطاء" tabLabel="ARCHIVE" />
        </Cell>

        <Cell
          title="Flat: الأصل المرسوم، وقصّة الإخفاق"
          note="الصيغة الأولى محفوظة لا لأنها أضعف، بل لأن الحكم على المجسّم لا يصحّ بلا ما يُقاس عليه — وهي الاختيار الصحيح داخل قائمة كثيفة. وهنا يُرفض ملف عمدًا: يتلوّن مساره بلون الخطر ويظهر زرّ إعادة المحاولة مكان الإلغاء."
        >
          <UploadFolder
            variant="flat"
            title="المسوّدات"
            meta="جرّب ملفًا بامتداد zip أو أكبر من 8 ميغابايت"
            tabLabel="DRAFT"
            upload={failsTheSecondFile}
          />
        </Cell>
      </div>
    </Section>
  );
}
