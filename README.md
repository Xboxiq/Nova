# NOVA UI

مكتبة React عربية أولًا تضم 72 نمط واجهة تفاعليًا من NOVA و30 قسمًا من مكتبة **مدار** ضمن نظام تصميم واحد. بُنيت للاستخدام الشخصي الاحترافي، مع RTL افتراضي، وLTR كامل، وسبع حزم ثيم وثلاثة مستويات زجاج، ومكوّنات NOVA أصلية إلى جانب روابط مصادر الإلهام على 21st.dev.

## التشغيل

```bash
npm install
npm run dev
```

يفتح Vite بيئة التطوير المحلية. لإنشاء نسخة إنتاجية:

```bash
npm run typecheck
npm run build
npm run preview
```

## المعاينة من الجوال

وصّل الكمبيوتر والهاتف بالشبكة نفسها، ثم شغّل:

```bash
npm run dev:mobile
```

سيعرض Vite عنوانًا باسم `Network` مثل `http://192.168.1.20:5173`. افتح هذا العنوان في Safari أو Chrome على هاتفك. راجع [MOBILE-PREVIEW.md](./MOBILE-PREVIEW.md) إذا لم يظهر العنوان أو منعه جدار الحماية.

## ما الذي يتضمّنه المشروع؟

- 72 مكوّنًا تفاعليًا موزعة على 8 أقسام، بينها 12 نمطًا أصليًا لـNOVA. يضيف V7 شريط السياق، عدسة الإشارة، كوكبة التدفّق، مكدّس الإشعارات، المفتّش المتكيّف، مؤلّف النطاق، الفراغ الإرشادي، ورُزم الطي.
- مكتبة **مدار** كاملة داخل التطبيق: 30 قسمًا موزّعة على خمس عائلات، تضم أكثر من 130 مكوّنًا مصدَّرًا، من بنك الفيزياء والحركيات إلى صفحة صلاحيات الإدارة الكاملة.
- عائلة **الأثر**: ستة ضوابط تُظهر نتيجتها بنفسها بدل إعلانها في إشعار جانبي، مقتبسة من دفعة Uiverse بعد فرزها في [SOURCES-UIVERSE.md](./design-system/madar/SOURCES-UIVERSE.md).
- سبع حزم ثيم على نظام توكنز واحد: نهاري، ليلي، نعناعي، مرجاني، سماوي، بنفسجي، ونيلي. وثلاثة مستويات زجاج G1 وG2 وG3، تُبدَّل من الشريط العلوي وتُحفَظ محليًا.
- React 19 وTypeScript وVite، مع حزمة إنتاج مجرّبة.
- خطوط Apple النظامية أولًا، ثم IBM Plex Sans Arabic وIBM Plex Sans ذاتية الاستضافة، وGeist Mono للكود فقط.
- React Icons مع عائلة Phosphor فقط عبر `react-icons/pi`.
- بحث فوري، تصفية حسب القسم، تبديل حزمة الثيم ومستوى الزجاج، وتحويل RTL وLTR.
- حالات تحميل وفراغ وخطأ ونجاح وتعطيل ضمن النماذج المناسبة.
- دعم لوحة المفاتيح، تركيز مرئي، `prefers-reduced-motion`، وأهداف لمس مناسبة للموبايل.
- روابط المصدر الأصلي لكل نمط بدل نسخ مخرجات السجل حرفيًا.
- حزمة Impeccable الكاملة داخل `tools/impeccable/` للتدقيق والصقل المستقبلي.

## المعمارية

```text
src/
├── App.tsx                    الغلاف، البحث، التصفية، المظهر واللغة
├── data/catalog.ts            بيانات المكوّنات الـ72 ومصادرها
├── components/Gallery.tsx     بطاقات العرض والتجميع حسب الفئة
├── components/CommandPalette  لوحة الأوامر والانتقال السريع
├── components/HeroPreview     معاينة NOVA المصغّرة
├── components/SystemShowcase  عينة الألوان والخط والمواد والحركة
├── components/PatternStudio   مختبر V7 للأزرار والتنقّل والأيقونات والحركة
├── components/AdvancedPatternLab مختبر البناء المتكيّف والأنماط الأصلية الثمانية
├── components/MobileDock      تنقّل الهاتف السفلي
├── components/MadarLibrary    سطح مدار: عائلاته وأقسامه ومنصّة العرض
├── components/demos/          عروض تفاعلية مقسّمة حسب الوظيفة
├── madar/components/          مكتبة مدار القابلة لإعادة الاستخدام
├── madar/showcase/            أقسام عرض مدار الـ30
├── madar/theme/               سجل حزم الثيم ومستويات الزجاج
├── madar/sections.ts          فهرس أقسام مدار ووصفها الثنائي
├── madar/bridge.css           ربط أسماء توكنز مدار بتوكنز NOVA
├── madar/interactions.css     رِتَل التمرير والضغط والتركيز في مدار
├── madar-library.css          تخطيط سطح مدار داخل قشرة NOVA
├── styles.css                 الغلاف وبنية الصفحة والاستجابة
├── primitives.css             أحجام التحكم، الحالات، وحاويات الأيقونات
├── pattern-studio.css         تركيب وسلوك مختبر القرار V7
├── advanced-lab.css           تركيب وسلوك مختبر البناء المتكيّف
└── demos.css                  حالات وعروض المكوّنات
```

يحمل المعرض نفسه بصورة كسولة عبر `React.lazy`، بينما تبقى وظائف المظهر والبحث والاتجاه في الغلاف الأولي. تستخدم العروض حالة React محلية كي تبقى مستقلة وسهلة التعديل.

## قواعد التصميم

عقد المشروع ومسار القراءة في [DESIGN.md](./DESIGN.md)، والمصدر التصميمي المتكامل في [NOVA Design OS](./design-system/nova-design-os/DESIGN.md)، والتوكنز المحمولة في `design-system/nova-design-os/tokens/`. مرجع مدار التصميمي في [design-system/madar/design.md](./design-system/madar/design.md) وقواعد مكتبته في [design-system/madar/GUIDE.md](./design-system/madar/GUIDE.md). سجل المنتج في [PRODUCT.md](./PRODUCT.md)، واتفاقية العمل في [AGENTS.md](./AGENTS.md). ملف `nova-ui-library.html` نسخة مستقلة قديمة للرجوع فقط، وليس مصدر الحقيقة الحالي. وحزمة تسليم مدار الأصلية محفوظة في `archive/madar/` كمرجع تاريخي لا يُبنى.

للعمل المستقبلي أو إطلاق منصة جديدة، ابدأ من [دليل NOVA Design OS](./design-system/nova-design-os/README.md): مرجع معياري موسع يضم الهوية النهارية والليلية، Typography، Layout، Navigation، Cards، Admin، Charts، Motion، Mobile، Accessibility، RTL، معيار Anti-Slop، وقوالب جاهزة لوكلاء AI.

## النشر على GitHub Pages

المكتبة تُنشر آليًا عند كل دفعة إلى `main` عبر [`.github/workflows/pages.yml`](./.github/workflows/pages.yml)، والعنوان `https://xboxiq.github.io/nova/`.

خطوة واحدة يدوية لمرة واحدة: من **Settings → Pages** في المستودع، اضبط المصدر على **GitHub Actions**. بدونها يبني الـworkflow بنجاح ويفشل في خطوة النشر وحدها.

Pages يخدم المشروع من مسار فرعي لا من جذر النطاق، ولهذا `base: "./"` في `vite.config.ts`: بناء واحد يعمل من الجذر ومن أي مسار فرعي معًا. العطل هنا صامت — الصفحة ترجع 200 وتظهر بيضاء — فصار مُقاسًا: `npm run qa:pages` يخدم `dist/` تحت `/nova/` ويفشل على أي طلب 404 أو قسم كسول لا يُرسم. البناء يجري في الـworkflow من المصدر، فلا نسخة `dist/` محفوظة في Git.

## التحقق

راجع [AUDIT.md](./AUDIT.md) لنتيجة الفحص الحالية وحدودها. باختصار: البناء وفحص TypeScript والتدقيق الأمني ناجحة، لا توجد مخالفات من Impeccable أو Axe، ولا overflow أفقي عند 390px، وقد فُحصت تفاعلات V7 الثمانية في Chromium فعليًا.

## المصادر المنهجية

- [21st.dev](https://21st.dev) لمراجع المكوّنات التي قدّمها مالك المشروع.
- [React Icons](https://react-icons.github.io/react-icons/) لبوابة الأيقونات.
- [Laws of UX](https://lawsofux.com/) لقواعد الاختيار، القرب، حجم الهدف، والحمل المعرفي.
- Impeccable وTaste Skill وUI/UX Pro Max كطبقات بحث وتدقيق وصقل.
