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
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22,
        padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 18,
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
          title="Upload Folder — الوجهة التي ترد على ما يصلها"
          note="الغطاء ليس زينة تدور: مغلق حين لا شيء، مفتوح على اتّساعه أثناء الهبوط والسحب فوقه، ومواربٌ بعد الاستقرار. زاوية الغطاء هي حالة المكوّن مرسومة."
        >
          <UploadFolder />
        </Cell>

        <Cell
          title="الفشل ليس نهاية الطريق"
          note="ملف واحد هنا يُرفض عمدًا ليظهر ما يحدث بعده: يتلوّن مساره بلون الخطر، ويظهر زرّ إعادة المحاولة مكان زرّ الإلغاء. الإخفاق حالة لها مخرج، لا رسالة تُقرأ وتُنسى."
        >
          <UploadFolder
            title="أرشيف التسليم"
            meta="جرّب ملفًا بامتداد zip أو أكبر من 8 ميغابايت"
            tabLabel="ARCHIVE"
            upload={failsTheSecondFile}
          />
        </Cell>
      </div>
    </Section>
  );
}
