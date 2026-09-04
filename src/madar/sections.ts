import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/* The owner proposed a taxonomy: DESIGN-DIRECTIONS / PATTERNS / COMPONENTS /
   MOTION / COLOR / TYPOGRAPHY / LAYOUTS / REFERENCES / EXPERIMENTS. It is a better
   shelf than the five families it replaces, and the measurement says why: of 39
   sections, `surfaces` held 15. A family that holds forty percent of the library
   is not a family, it is the drawer everything went into.

   Three redundancies in the proposal are resolved rather than copied, because the
   distinction is what makes the shelf usable:

     · `components` are the parts; `patterns` are compositions of parts that have
       a job. A card is a component, a dashboard is a pattern — the proposal had
       `dashboards` under PATTERNS and `cards` under COMPONENTS without saying
       why, and without the rule the two drift.
     · `layouts` are skeletons with no content. A hero layout is a layout; a
       navigation bar is a pattern, because it does something.
     · `color` and `typography` stay separate as the proposal has them, but they
       are foundations rather than categories of pattern, so they sort last.

   `directions` and `experiments` are new axes, not renamed drawers. */
export type MadarFamilyId =
  | "directions"
  | "patterns"
  | "components"
  | "motion"
  | "layouts"
  | "typography"
  | "references"
  | "experiments";

export interface MadarFamily {
  id: MadarFamilyId;
  label: string;
  labelEn: string;
}

export interface MadarSection {
  id: string;
  title: string;
  titleAr: string;
  family: MadarFamilyId;
  description: string;
  descriptionAr: string;
  tags: string[];
  component: LazyExoticComponent<ComponentType>;
  /** Marks a recently added section. Thirty-two tabs open on the first one,
      so without this an addition is invisible to anyone who does not already
      know which tab to click. */
  added?: true;
}

export const madarFamilies: MadarFamily[] = [
  { id: "directions", label: "الاتجاهات", labelEn: "Design Directions" },
  { id: "patterns", label: "الأنماط", labelEn: "Patterns" },
  { id: "components", label: "المكوّنات", labelEn: "Components" },
  { id: "motion", label: "الحركة", labelEn: "Motion" },
  { id: "layouts", label: "التخطيطات", labelEn: "Layouts" },
  /* The proposal had COLOR and TYPOGRAPHY as two top-level shelves. They are one
     here because each holds exactly one section today, and a filter chip that
     reveals a single item is worse than no chip. Split them the day either grows
     past one — the family id is the only thing that has to change. */
  { id: "typography", label: "الخطّ واللون", labelEn: "Type & Color" },
  { id: "references", label: "المراجع", labelEn: "References" },
  { id: "experiments", label: "المختبر", labelEn: "Experiments" },
];

const load = (name: string, importer: () => Promise<Record<string, ComponentType>>) =>
  lazy(async () => ({ default: (await importer())[name] }));

export const madarSections: MadarSection[] = [
  {
    id: "madar-nova-instruments",
    title: "Nova Instruments",
    titleAr: "آلاتُ نوفا",
    family: "motion",
    description: "The first components written here rather than imported. One registered scalar drives every visible fact, so a single interpolation moves an arc's dash, a needle's angle and eleven tick opacities on one timeline. The dash IS the value: pathLength=100. The delta bar draws neither reading but the span between them, ordered by min()/max() in CSS, and its sign is a color-mix, not a class.",
    descriptionAr: "أوّلُ ما كُتِبَ هنا لا استُورِد. خاصّيّةٌ مُسجَّلةٌ واحدةٌ تقودُ كلَّ ما يُرى، فاستبانةٌ واحدةٌ تُحرِّكُ دَشَّ قوسٍ وزاويةَ مِؤشِّرٍ وشفافيّةَ إحدى عشرةَ عَلامةٍ على خطٍّ زمنيٍّ واحد. والدَّشُّ هو القيمةُ نفسُها بـpathLength=100. وشريطُ الفَرقِ لا يرسمُ قراءةً بل المسافةَ بينَ قراءتَين، مُرتَّبةً بـmin() وmax() في الـCSS، وإشارتُه مَزجُ لونٍ لا صنف.",
    tags: ["instrument", "readout", "@property", "pathLength", "آلة", "قراءة", "حركة"],
    component: load("NovaInstruments", () => import("./showcase/sections/NovaInstruments")),
    added: true,
  },
  {
    id: "madar-directions",
    title: "Design Directions",
    titleAr: "اتجاهات التصميم",
    family: "directions",
    description: "The third document axis: one register remaps nineteen shape, scale and pace tokens. No new component, no palette.",
    descriptionAr: "المحور الثالث للمستند: سجلٌّ واحد يعيد ربط تسعةَ عشرَ رمزًا للشكل والمقياس والإيقاع. لا مكوّنَ جديدًا ولا لوحة.",
    tags: ["direction", "register", "radius", "density", "اتجاه", "سجلّ", "كثافة"],
    component: load("Directions", () => import("./showcase/sections/Directions")),
    added: true,
  },
  {
    id: "madar-imported-3",
    title: "Imported III",
    titleAr: "المستورَد III",
    family: "experiments",
    description: "Back to the first batch's remainder. One question recurs: how many elements? The answer is in the CSS every time — in an nth-child, in --i arithmetic, in a dasharray's sum. In one case it was nine for ten, which is a rule nobody wrote.",
    descriptionAr: "العَودةُ إلى ما بقيَ من الدفعةِ الأولى. وسؤالٌ واحدٌ يتكرَّر: كم عنصرًا؟ والجوابُ في الـCSS في كلِّ مرّة — في nth-child، أو في حسابِ --i، أو في مجموعِ شَرطِ التقطيع. وفي واحدةٍ كان الجوابُ «تسعٌ لعشرةٍ»، وذاك قاعدةٌ لم تُكتَب.",
    tags: ["imported", "counting", "nth-child", "مستورَد", "عَدّ"],
    component: load("Imported3", () => import("./showcase/sections/Imported3")),
    added: true,
  },
  {
    id: "madar-imported-2",
    title: "Imported II",
    titleAr: "المستورَد II",
    family: "experiments",
    description: "A batch of forty-five uploads triaged by measurement before any code: six carry no CSS, two are byte-identical, two were already built. The remaining thirty-six are implemented in waves, each wave measured and committed on its own.",
    descriptionAr: "دفعةٌ من خمسٍ وأربعين رفعةً، فُرِزت بالقياس قبل أيِّ كود: ستٌّ بلا CSS، واثنتانِ متطابقتان، واثنتانِ مبنيّتانِ سلفًا. والستُّ والثلاثون الباقيةُ تُبنى في دفعاتٍ، كلُّ دفعةٍ مقيسةٌ ومودَعةٌ وحدَها.",
    tags: ["imported", "triage", "duplicate", "مستورَد", "فرز", "مكرَّر"],
    component: load("Imported2", () => import("./showcase/sections/Imported2")),
    added: true,
  },
  {
    id: "madar-imported",
    title: "Imported",
    titleAr: "المستورَد",
    family: "experiments",
    description: "Reference code implemented against its own requirements: its four dependencies installed, its Tailwind classes kept verbatim, every divergence from this repo's law recorded rather than hidden.",
    descriptionAr: "كودٌ مرجعيّ مُنفَّذٌ بمتطلّباته: تبعيّاتُه الأربع مثبَّتة، وأصنافُ Tailwind حرفيّة، وكلُّ مخالفةٍ لقانوننا مسجَّلةٌ لا مخفيّة.",
    tags: ["imported", "vaul", "drawer", "tailwind", "مستورَد", "درج"],
    component: load("Imported", () => import("./showcase/sections/Imported")),
    added: true,
  },
  {
    id: "madar-matrix",
    title: "Matrix",
    titleAr: "المصفوفة",
    /* Not `directions`: this is not a register, it is the instrument that reads
       all three axes at once. `experiments` was an empty shelf held open for the
       first thing that was an instrument rather than a pattern — and a shelf that
       stops being a promise the moment something real lands on it. */
    family: "experiments",
    description: "A 7x7 contact sheet of every pack against every register, where each of the 49 live cells measures its own contrast in both lenses and marks itself.",
    descriptionAr: "ورقةُ تلامسٍ ٧×٧ لكل حزمةٍ مقابل كل سجلّ، تقيس فيها كلُّ خليّةٍ من التسع والأربعين تباينَها بعدستَين وتحكم على نفسها.",
    tags: ["matrix", "contrast", "apca", "audit", "مصفوفة", "تباين", "مراجعة"],
    component: load("MatrixSection", () => import("./showcase/sections/Matrix")),
    added: true,
  },
  {
    id: "madar-color-tokens",
    title: "Color Tokens",
    titleAr: "توكنز اللون",
    family: "typography",
    description: "Every semantic color role shown across the active theme pack.",
    descriptionAr: "كل دور لوني دلالي معروضًا ضمن حزمة الثيم الفعّالة.",
    tags: ["tokens", "color", "theme", "توكنز", "ألوان"],
    component: load("ColorTokens", () => import("./showcase/sections/ColorTokens")),
  },
  {
    id: "madar-typography",
    title: "Typography",
    titleAr: "الخطوط",
    family: "typography",
    description: "The bilingual type scale and the Arabic and Latin pairing rules.",
    descriptionAr: "سلّم الخط الثنائي وقواعد التزاوج بين العربي واللاتيني.",
    tags: ["type", "scale", "arabic", "خط", "هرمية"],
    component: load("Typography", () => import("./showcase/sections/Typography")),
  },
  {
    id: "madar-icon-lab",
    title: "Icon Lab",
    titleAr: "مختبر الأيقونات",
    family: "components",
    description: "Self-drawing icons, orbit rings, clusters, and animated state glyphs.",
    descriptionAr: "أيقونات ترسم نفسها، حلقات مدارية، عناقيد، ورموز حالة متحركة.",
    tags: ["icons", "svg", "ritual", "أيقونات"],
    component: load("IconLab", () => import("./showcase/sections/IconLab")),
  },
  {
    id: "madar-soft-vocabulary",
    title: "Soft Vocabulary",
    titleAr: "المفردات الناعمة",
    family: "components",
    description: "Squircle tiles, specular orbs, burst seals, and the soft hue set.",
    descriptionAr: "مربّعات دائرية، كرات لامعة، أختام متفجّرة، ومجموعة الألوان الناعمة.",
    tags: ["soft", "squircle", "orb", "ناعم"],
    component: load("SoftVocabulary", () => import("./showcase/sections/SoftVocabulary")),
  },

  {
    id: "madar-buttons",
    title: "Buttons",
    titleAr: "الأزرار",
    family: "components",
    description: "One ink primary per view, with sizes, states, and the single allowed gradient.",
    descriptionAr: "أساسي حبري واحد لكل شاشة، مع الأحجام والحالات والتدرّج المسموح مرة واحدة.",
    tags: ["button", "primary", "states", "أزرار"],
    component: load("Buttons", () => import("./showcase/sections/Buttons")),
  },
  {
    id: "madar-inputs",
    title: "Inputs",
    titleAr: "المدخلات",
    family: "components",
    description: "Fields, selects, toggles, and the focus contract shared by every control.",
    descriptionAr: "الحقول والقوائم والمفاتيح، وعقد التركيز المشترك بين كل الضوابط.",
    tags: ["input", "field", "focus", "مدخلات"],
    component: load("Inputs", () => import("./showcase/sections/Inputs")),
  },
  {
    id: "madar-flow-forms",
    title: "Flow Forms",
    titleAr: "نماذج التدفّق",
    family: "patterns",
    description: "Steppers, type pickers, number fields, autocomplete, and unsaved-change bars.",
    descriptionAr: "خطوات ومنتقيات نوع وحقول رقمية وإكمال تلقائي وشريط تغييرات غير محفوظة.",
    tags: ["form", "stepper", "wizard", "نموذج"],
    component: load("FlowForms", () => import("./showcase/sections/FlowForms")),
  },
  {
    id: "madar-essentials",
    title: "Essentials",
    titleAr: "الأساسيات",
    family: "components",
    description: "Data table, drawer, toast, dropzone, empty state, banner, and range slider.",
    descriptionAr: "جدول بيانات ودرج وإشعار ومنطقة إفلات وحالة فراغ ولافتة ومنزلق نطاق.",
    tags: ["table", "drawer", "toast", "أساسيات"],
    component: load("Essentials", () => import("./showcase/sections/Essentials")),
  },
  {
    id: "madar-data-collections",
    title: "Data Collections",
    titleAr: "مجموعات البيانات",
    family: "patterns",
    description: "Tabs, accordion, pagination, kanban, calendar, tree view, and tag input.",
    descriptionAr: "تبويبات وأكورديون وترقيم وكانبان وتقويم وشجرة وإدخال وسوم.",
    tags: ["tabs", "kanban", "calendar", "مجموعات"],
    component: load("DataCollections", () => import("./showcase/sections/DataCollections")),
  },
  {
    id: "madar-text-lists",
    title: "Text & Lists",
    titleAr: "النص والقوائم",
    family: "components",
    description: "Kinetic headlines, gradient text, list boxes, and activity dropdowns.",
    descriptionAr: "عناوين حركية ونص متدرّج وصناديق قوائم وقوائم نشاط منسدلة.",
    tags: ["text", "list", "dropdown", "نص", "قوائم"],
    component: load("TextLists", () => import("./showcase/sections/TextLists")),
  },
  {
    id: "madar-upload",
    title: "Upload",
    titleAr: "الرفع",
    family: "patterns",
    description: "A destination that opens for what lands in it, with per-file state, cancel, and retry.",
    descriptionAr: "وجهة تفتح غطاءها لما يهبط فيها، وحالة لكل ملف مع إلغاء وإعادة محاولة.",
    tags: ["upload", "file", "progress", "رفع", "ملفات"],
    added: true,
    component: load("Upload", () => import("./showcase/sections/Upload")),
  },

  {
    id: "madar-cards",
    title: "Cards",
    titleAr: "البطاقات",
    family: "components",
    description: "The base card grammar: elevation, inset, media, and action placement.",
    descriptionAr: "قواعد البطاقة الأساسية: الارتفاع والحشو والوسائط وموضع الإجراء.",
    tags: ["card", "elevation", "بطاقة"],
    component: load("Cards", () => import("./showcase/sections/Cards")),
  },
  {
    id: "madar-signature-cards",
    title: "Signature Cards",
    titleAr: "البطاقات المميّزة",
    family: "components",
    description: "Blueprint, aperture, breaker, meter dial, tilted stack, and folder cards.",
    descriptionAr: "بطاقات المخطط والعدسة والقاطع وقرص القياس والمكدّس المائل والمجلّد.",
    tags: ["signature", "hero card", "بطاقات"],
    component: load("SignatureCards", () => import("./showcase/sections/SignatureCards")),
  },
  {
    id: "madar-overlays",
    title: "Overlays",
    titleAr: "الطبقات المنبثقة",
    family: "components",
    description: "Popover, tooltip, dropdown, alert dialog, welcome modal, and message dock.",
    descriptionAr: "منبثق وتلميح وقائمة منسدلة وحوار تنبيه ونافذة ترحيب ورصيف رسائل.",
    tags: ["modal", "popover", "dialog", "منبثق"],
    component: load("Overlays", () => import("./showcase/sections/Overlays")),
  },
  {
    id: "madar-data-display",
    title: "Data Display",
    titleAr: "عرض البيانات",
    family: "patterns",
    description: "Donuts, gauges, heatmaps, rings, sparklines, and log tables.",
    descriptionAr: "دوائر ومقاييس وخرائط حرارية وحلقات ومخططات مصغّرة وجداول سجلّات.",
    tags: ["chart", "gauge", "dataviz", "بيانات"],
    component: load("DataDisplay", () => import("./showcase/sections/DataDisplay")),
  },
  {
    id: "madar-outage",
    title: "Outage",
    titleAr: "الانقطاع والعودة",
    family: "patterns",
    description: "Two series on one axis, where the coincidence is the finding.",
    descriptionAr: "مسارَان على محور واحد، والتقاطع بينهما هو المعلومة.",
    tags: ["outage", "reliability", "compare", "انقطاع", "موثوقية", "مقارنة"],
    added: true,
    component: load("Outage", () => import("./showcase/sections/Outage")),
  },
  {
    id: "madar-dispatch",
    title: "Dispatch",
    titleAr: "التوزيع",
    family: "patterns",
    description: "Several orders, one address, one delivery: grouping, distance bands, customer rates, courier handoff.",
    descriptionAr: "طلبات عدّة وعنوان واحد فتوصيل واحد: التجميع، وبُعد العنوان، ورتبة الزبون، وتحويل الطلب بين المندوبين.",
    tags: ["dispatch", "delivery", "orders", "courier", "توزيع", "توصيل", "مندوب"],
    component: load("Dispatch", () => import("./showcase/sections/Dispatch")),
    added: true,
  },
  {
    id: "madar-schedule",
    title: "Schedule",
    titleAr: "الجدولة الزمنية",
    family: "patterns",
    description: "The day as a counted axis: tariff windows, a clock, and a priced window picker.",
    descriptionAr: "اليوم محورًا معدودًا: نوافذ التسعير، ومينا الساعة، ومنتقي نافذة مُسعَّر.",
    tags: ["time", "tariff", "schedule", "وقت", "تسعير", "جدولة"],
    added: true,
    component: load("Schedule", () => import("./showcase/sections/Schedule")),
  },
  {
    id: "madar-energy",
    title: "Energy",
    titleAr: "الطاقة",
    family: "patterns",
    description: "A meter read as an instrument, consumption against its own normal, the tariff ladder, and a prepaid balance read as days to the top-up.",
    descriptionAr: "عدّاد يُقرأ كجهاز، واستهلاك مقابل معتاده، وسُلّم الشرائح، ورصيدٌ مسبقٌ يُقرأ أيامًا إلى يوم الشحن.",
    tags: ["energy", "meter", "kwh", "tariff", "طاقة", "عدّاد", "استهلاك"],
    added: true,
    component: load("Energy", () => import("./showcase/sections/Energy")),
  },
  {
    id: "madar-library-vault",
    title: "Library Vault",
    titleAr: "خزانة المكتبة",
    family: "references",
    description: "The full export map of the library, grouped by source file.",
    descriptionAr: "خريطة التصدير الكاملة للمكتبة، مجمّعة حسب ملف المصدر.",
    tags: ["index", "exports", "map", "خزانة"],
    component: load("LibraryVault", () => import("./showcase/sections/LibraryVault")),
  },
  {
    id: "madar-pattern-atlas",
    title: "Pattern Atlas",
    titleAr: "أطلس الأنماط",
    family: "layouts",
    description: "The merged pattern compendium drawn from every imported source library.",
    descriptionAr: "موسوعة الأنماط المدموجة من كل مكتبة مصدر مستوردة.",
    tags: ["atlas", "patterns", "أطلس"],
    component: load("PatternAtlas", () => import("./showcase/sections/PatternAtlas")),
  },
  {
    id: "madar-pattern-bank",
    title: "Pattern Bank",
    titleAr: "بنك الأنماط",
    family: "references",
    description: "Reusable content blocks: pricing, bento, masonry, checklists, and footers.",
    descriptionAr: "كتل محتوى قابلة لإعادة الاستخدام: التسعير وبنتو والماسونري وقوائم المهام والتذييل.",
    tags: ["bento", "pricing", "blocks", "بنك"],
    component: load("PatternBank", () => import("./showcase/sections/PatternBank")),
  },
  {
    id: "madar-atelier",
    title: "Atelier",
    titleAr: "الأتيليه",
    family: "references",
    description: "The editorial tier: bezel cards, magnetic CTAs, specular surfaces, display serif.",
    descriptionAr: "الطبقة التحريرية: بطاقات مؤطّرة ونداءات مغناطيسية وأسطح لامعة وخط عرض.",
    tags: ["editorial", "luxury", "bezel", "أتيليه"],
    component: load("Atelier", () => import("./showcase/sections/Atelier")),
  },
  {
    id: "madar-trends-2026",
    title: "Trends 2026",
    titleAr: "اتجاهات 2026",
    family: "references",
    description: "Progressive blur, liquid glass, anticipatory dashboards, and prompt canvases.",
    descriptionAr: "ضبابية تدريجية وزجاج سائل ولوحات استباقية ومساحات أوامر.",
    tags: ["glass", "ai", "trends", "اتجاهات"],
    component: load("Trends2026", () => import("./showcase/sections/Trends2026")),
  },

  {
    id: "madar-hero",
    title: "Hero Showpiece",
    titleAr: "الواجهة الرئيسة",
    family: "layouts",
    description: "The aurora glass hero with nested bezels and a z-axis panel cascade.",
    descriptionAr: "واجهة الزجاج الشفقي بإطارات متداخلة وتتابع ألواح على المحور العمقي.",
    tags: ["hero", "glass", "aurora", "واجهة"],
    component: load("Hero", () => import("./showcase/sections/Hero")),
  },
  {
    id: "madar-hero-layouts",
    title: "Hero Layouts",
    titleAr: "تخطيطات الواجهة",
    family: "layouts",
    description: "Split stats, product, immersive, display word, and gallery scatter heroes.",
    descriptionAr: "واجهات الإحصاءات المقسومة والمنتج والانغماس وكلمة العرض والمعرض المبعثر.",
    tags: ["hero", "landing", "layout", "تخطيط"],
    component: load("HeroLayouts", () => import("./showcase/sections/HeroLayouts")),
  },
  {
    id: "madar-navigation",
    title: "Navigation",
    titleAr: "التنقّل",
    family: "patterns",
    description: "Sidebar, tabs, dock, side rail, breadcrumb, and progressive navbar.",
    descriptionAr: "شريط جانبي وتبويبات ورصيف وسكة ومسار تنقّل وشريط علوي متدرّج.",
    tags: ["nav", "sidebar", "dock", "تنقّل"],
    component: load("Navigation", () => import("./showcase/sections/Navigation")),
  },
  {
    id: "madar-admin-access",
    title: "Admin Access",
    titleAr: "صلاحيات الإدارة",
    family: "patterns",
    description: "A complete admin page: shell, permission matrix, member table, and audit log.",
    descriptionAr: "صفحة إدارة كاملة: صدفة ومصفوفة صلاحيات وجدول أعضاء وسجل تدقيق.",
    tags: ["admin", "permissions", "audit", "إدارة"],
    component: load("AdminAccess", () => import("./showcase/sections/AdminAccess")),
  },

  {
    id: "madar-motion",
    title: "Motion",
    titleAr: "الحركة",
    family: "motion",
    description: "The curve set and the entrance, state, and exit vocabulary built on it.",
    descriptionAr: "مجموعة المنحنيات ومفردات الدخول والحالة والخروج المبنية عليها.",
    tags: ["motion", "easing", "spring", "حركة"],
    component: load("Motion", () => import("./showcase/sections/Motion")),
  },
  {
    id: "madar-physics-lab",
    title: "Physics Lab",
    titleAr: "مختبر الفيزياء",
    family: "motion",
    description: "Magnetic buttons, hold to confirm, slide to unlock, scrubbers, and reordering.",
    descriptionAr: "أزرار مغناطيسية وتأكيد بالضغط المستمر وسحب للفتح ومقابض تمرير وإعادة ترتيب.",
    tags: ["physics", "drag", "haptic", "فيزياء"],
    component: load("PhysicsLab", () => import("./showcase/sections/PhysicsLab")),
  },
  {
    id: "madar-interaction-lab",
    title: "Interaction Lab",
    titleAr: "مختبر التفاعل",
    family: "motion",
    description: "The hover, press, and focus contract applied across control families.",
    descriptionAr: "عقد التمرير والضغط والتركيز مطبّقًا على عائلات الضوابط.",
    tags: ["hover", "press", "focus", "تفاعل"],
    component: load("InteractionLab", () => import("./showcase/sections/InteractionLab")),
  },
  {
    id: "madar-interaction-bank",
    title: "Interaction Bank",
    titleAr: "بنك التفاعلات",
    family: "motion",
    description: "The flow bank imported from the 21st.dev interaction list.",
    descriptionAr: "بنك التدفّقات المستورد من قائمة تفاعلات 21st.dev.",
    tags: ["interactions", "flows", "بنك"],
    component: load("InteractionBank", () => import("./showcase/sections/InteractionBank")),
  },
  {
    id: "madar-kinetics-bank",
    title: "Kinetics Bank",
    titleAr: "بنك الحركيات",
    family: "motion",
    description: "The spring interaction catalog, each entry with its own curve and trigger.",
    descriptionAr: "كتالوج التفاعلات الزنبركية، لكل مدخل منحناه ومحفّزه.",
    tags: ["kinetics", "spring", "حركيات"],
    component: load("KineticsBank", () => import("./showcase/sections/KineticsBank")),
  },
  {
    id: "madar-consequence",
    title: "Consequence",
    titleAr: "الأثر",
    family: "motion",
    description: "Controls that show their own outcome: shredding, printing, stretching, filling.",
    descriptionAr: "ضوابط تُظهر أثرها بنفسها: إتلاف وطباعة ومطّ وامتلاء.",
    tags: ["feedback", "destructive", "progress", "أثر", "تغذية راجعة"],
    component: load("Consequence", () => import("./showcase/sections/Consequence")),
  },
  {
    id: "madar-kinetics-99",
    title: "Kinetics 99",
    titleAr: "حركيات 99",
    family: "motion",
    description: "The completion set: ripples, meters, loaders, glitches, folds, and 3D flips.",
    descriptionAr: "مجموعة الإكمال: تموّجات ومقاييس ومحمّلات وتشويش وطيّات وقلبات ثلاثية الأبعاد.",
    tags: ["kinetics", "loader", "3d", "حركيات"],
    component: load("Kinetics99", () => import("./showcase/sections/Kinetics99")),
  },
  {
    id: "madar-photographed",
    title: "Photographed",
    titleAr: "المُصوَّر",
    family: "references",
    description: "The mesh system carried in unchanged: five turning pools, film grain, one light, a reserved accent.",
    descriptionAr: "نظام الشبكة كما هو: خمس بِرَك تلتفّ، وحَبّ فيلمي، وضوء واحد، ولون تمييز محجوز لما قِيس.",
    tags: ["mesh", "gradient", "grain", "bevel", "شبكة", "تدرّج", "حَبّ"],
    component: load("Photographed", () => import("./showcase/sections/Photographed")),
    added: true,
  },
  {
    id: "madar-boards",
    title: "Boards",
    titleAr: "الألواح",
    family: "patterns",
    description: "The dashboard pieces: dark plate, assistant orb, split donut, counted risk, care overview, palette slide.",
    descriptionAr: "قطع الألواح: لوحة سوداء، وكرة المساعد، ودائرة مقسومة، وخطر معدود، ونظرة رعاية، وشريحة لوحة.",
    tags: ["dashboard", "board", "donut", "table", "لوح", "لوحة قيادة"],
    component: load("Boards", () => import("./showcase/sections/Boards")),
    added: true,
  },
  {
    id: "madar-glasswork",
    title: "Glasswork",
    titleAr: "الزجاجيّات",
    family: "references",
    description: "One stated glass recipe as five tokens, over two grounds: a compliance field and a vitals field.",
    descriptionAr: "وصفةُ زجاجٍ واحدة بخمسة رموز، على حقلَين: حقلُ امتثالٍ وحقلُ قراءات.",
    tags: ["glass", "blur", "recipe", "زجاج", "ضباب", "وصفة"],
    component: load("Glasswork", () => import("./showcase/sections/Glasswork")),
    added: true,
  },
  {
    id: "madar-projectwork",
    title: "Projectwork",
    titleAr: "أعمالُ المشاريع",
    family: "patterns",
    description: "Two project boards, one grammar in two keys: tracks, a hatched remainder, one inverted row.",
    descriptionAr: "لوحا مشاريع، ونحوٌ واحد بمفتاحَين: مسارات، وبقيّةٌ مهشَّرة، وصفٌّ واحد مقلوب.",
    tags: ["project", "gantt", "gauge", "kanban", "مشروع", "جدول", "قرص"],
    component: load("Projectwork", () => import("./showcase/sections/Projectwork")),
    added: true,
  },
];
