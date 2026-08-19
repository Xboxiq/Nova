import { useEffect, useRef } from "react";
import { PiX } from "react-icons/pi";
import type { Locale } from "../i18n";

export type LegalDoc = "terms" | "privacy";

/* anti-slop-ui #29 and #30: the footer carried no terms and no privacy document,
   which the standard treats as mandatory rather than optional. Both are written
   from what this site actually does — three preferences in localStorage, no
   requests to any other origin — so neither claims more than is true.

   The surface is solid rather than glass (#8) and the radius is tight (#9),
   because a legal document is a document, not a product flourish. */

const DOCS: Record<Locale, Record<LegalDoc, { title: string; updated: string; body: string[] }>> = {
  ar: {
    terms: {
      title: "شروط الاستخدام",
      updated: "آخر تحديث: أغسطس 2026",
      body: [
        "ما هذا. مكتبة مكوّنات شخصية تُنشَر للاطّلاع والمرجعية. ليست خدمة مُدارة، ولا حسابات فيها، ولا مقابل ماليّ لأي شيء.",
        "بلا ضمان. يُقدَّم المحتوى والشيفرة كما هما، دون ضمان خلوّهما من الخطأ ولا ضمان صلاحيتهما لغرض معيّن. الاعتماد عليهما في عمل إنتاجي قرارك ومسؤوليتك.",
        "بلا التزام توفّر. الصفحة قد تتغيّر أو تتوقّف أو تُنقَل إلى عنوان آخر بلا إشعار مسبق.",
        "الحقوق. حقوق الشيفرة والتصميم محفوظة لمالك المستودع. النشر العلني ليس منح رخصة: لا يوجد ملفّ LICENSE في المستودع حتى الآن، فالإذن بإعادة الاستعمال يُطلَب صريحًا.",
        "مفردات مستوردة. بعض المكوّنات مبنية على مراجع طرف ثالث، منها 21st.dev، ولكلٍّ شروطه الخاصة التي تسري عليه.",
        "التواصل. المسائل والطلبات تُرفع في مستودع المشروع على GitHub.",
      ],
    },
    privacy: {
      title: "سياسة الخصوصية",
      updated: "آخر تحديث: أغسطس 2026",
      body: [
        "لا جمع بيانات. الموقع صفحة ثابتة بلا خادم تطبيقات وبلا حسابات وبلا نماذج. لا يُرسَل عنك أي بيان إلى أي جهة.",
        "ما يُخزَّن على جهازك. ثلاث تفضيلات في التخزين المحلّي للمتصفّح: nova-theme للحزمة اللونية، وnova-glass لمستوى المادة، وnova-locale للغة. لا تفارق جهازك، ومحو بيانات الموقع من المتصفّح يمحوها.",
        "لا كوكيز ولا قياس زيارات. لا كوكيز، ولا أدوات تحليلات، ولا بصمة متصفّح، ولا إعلانات.",
        "لا طلبات إلى نطاقات أخرى. الخطوط والأيقونات والصور كلّها من داخل الحزمة أو من خطوط النظام، فالصفحة لا تطلب أصلًا من أي نطاق خارجي.",
        "الاستضافة. الموقع مُستضاف على GitHub Pages. وGitHub بوصفه مشغّل الخادم يسجّل بيانات الطلب المعتادة مثل عنوان IP ونوع المتصفّح، وفق بيان الخصوصية الخاصّ به. هذا خارج سيطرة هذا المشروع ولا يصل إليه.",
        "الروابط الخارجية. توجد وصلة إلى 21st.dev. اتّباعها إجراؤك أنت، وسياسة ذلك الموقع هي التي تسري بعدها.",
        "الأطفال. لا يُطلَب سنّ ولا هوية ولا أي بيان شخصي، فلا تُجمَع بيانات عن أي فئة عمرية.",
        "التواصل. أسئلة الخصوصية تُرفع في مستودع المشروع على GitHub.",
      ],
    },
  },
  en: {
    terms: {
      title: "Terms of Use",
      updated: "Last updated: August 2026",
      body: [
        "What this is. A personal component library published for reference. It is not a managed service, there are no accounts, and nothing here is sold.",
        "No warranty. The content and the code are provided as they are, with no guarantee that they are free of defects and no guarantee of fitness for a particular purpose. Relying on them in production work is your decision and your risk.",
        "No availability commitment. This page may change, stop, or move to another address without notice.",
        "Rights. Copyright in the code and the design belongs to the repository owner. Publishing is not a licence: there is no LICENSE file in the repository yet, so permission to reuse has to be asked for explicitly.",
        "Imported vocabulary. Some components are built on third-party references, 21st.dev among them, and each carries its own terms.",
        "Contact. Issues and requests go in the project repository on GitHub.",
      ],
      },
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: August 2026",
      body: [
        "No data collection. This site is a static page with no application server, no accounts, and no forms. Nothing about you is sent anywhere.",
        "What is stored on your device. Three preferences in your browser's local storage: nova-theme for the colour pack, nova-glass for the material level, and nova-locale for the language. They never leave your device, and clearing the site's data in your browser removes them.",
        "No cookies and no analytics. No cookies, no analytics tooling, no fingerprinting, no advertising.",
        "No requests to other origins. Fonts, icons and images all come from the bundle or from system fonts, so the page makes no external requests at all.",
        "Hosting. The site is hosted on GitHub Pages. GitHub, as the server operator, logs ordinary request data such as IP address and user agent under its own privacy statement. That is outside this project's control and does not reach it.",
        "External links. There is one link to 21st.dev. Following it is your action, and that site's policy applies from then on.",
        "Children. No age, identity, or personal detail is ever requested, so no data is collected about any age group.",
        "Contact. Privacy questions go in the project repository on GitHub.",
      ],
    },
  },
};

interface LegalDialogProps {
  doc: LegalDoc | null;
  locale: Locale;
  closeLabel: string;
  onClose: () => void;
}

export default function LegalDialog({ doc, locale, closeLabel, onClose }: LegalDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (doc && !el.open) el.showModal();
    if (!doc && el.open) el.close();
  }, [doc]);

  const content = doc ? DOCS[locale][doc] : null;

  return (
    <dialog
      ref={ref}
      className="legal-dialog"
      aria-labelledby="legal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {content && (
        <article className="legal-surface">
          <header>
            <div>
              <h2 id="legal-title">{content.title}</h2>
              <p>{content.updated}</p>
            </div>
            <button type="button" className="icon-button" aria-label={closeLabel} onClick={onClose}>
              <PiX aria-hidden="true" />
            </button>
          </header>
          <div className="legal-body">
            {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      )}
    </dialog>
  );
}
