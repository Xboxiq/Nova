# Uiverse triage — ما أُضيف وما رُفض ولماذا

مصدر الدفعة: 16 ملفًا تضم نحو 60 كتلة CSS/HTML من [Uiverse.io](https://uiverse.io).

القاعدة المطبَّقة هي الدرجة الثانية من سلّم ponytail: **هل هو موجود في هذا المستودع أصلًا؟** المكتبة تضم 281 تصديرًا، فالجرد سبق أي كتابة. القاعدة الثانية من `AGENTS.md`: تُكيَّف الأفكار الخارجية إلى مكوّنات وتوكنز NOVA، ولا يُنسخ ناتج السجل حرفيًا. لذلك لم يُنقل أي سطر CSS كما هو: الفكرة فقط، معادًا بناؤها على التوكنز.

## ما أُضيف: ستة أنماط (`src/madar/components/consequence.tsx`)

تجمعها أطروحة واحدة: نتيجة الفعل تخصّ الضابط الذي سبّبه.

| المكوّن | الفكرة المأخوذة | الكتلة | المؤلف على Uiverse | ما تغيّر في النقل |
|---|---|---:|---|---|
| `ShredConfirm` | الحذف يُظهر الإتلاف بدل وصفه | 108 | dexter-st | أُضيفت نافذة تراجع وحالة `role="status"`؛ الألوان صارت `--danger` و`--surface`؛ الحركة transform وopacity فقط |
| `ReceiptPrinter` | الإجراء يُخرج الأثر الملموس | 109 | dexter-st | حُذفت صورة base64 للجهاز والخطوط الخارجية؛ الورقة تُقصّ بـ`clip-path` بدل تحريك `top` |
| `DotMatrixReadout` | قراءة حالة من خلايا مضيئة | 63 | Cobp | صارت مصفوفة مدفوعة بالحالة في React بدل 7 كتل CSS متكررة؛ تحترم `prefers-reduced-motion` بإيقاف المؤقّت |
| `ElasticSwitch` | المقبض يمطّ تحت الضغط قبل تغيّر الحالة | 59 | _2944 | أُزيل التدرّج المكتوب يدويًا و`@media (prefers-color-scheme)` لأن حزم الثيم تتكفّل بذلك؛ الاتجاه عبر `--dir-sign` |
| `PerimeterProgress` | التقدّم يدور على حدّ الضابط نفسه | 69 | zaby_4213 | التقدّم صار حقيقيًا مربوطًا بـ`requestAnimationFrame` بدل دوران زخرفي لا نهائي؛ حُذف الوميض والـglitch |
| `MarqueeFrame` | الأركان تحطّ ثم تصل الحواف بينها | 107 | dexter-st | الحواف تُرسم بـ`scaleX`/`scaleY` بدل تحريك `width`؛ منشأ الرسم من `--underline-origin` فينعكس في RTL |

## ما رُفض: مغطّى أصلًا

| فكرة الكتل | الكتل | يغطّيها في المستودع |
|---|---|---|
| مفاتيح وتبديل | 59 (الشكل)، 76، 83، 87، 88، 104، 116 | `BouncyToggle`، `CinematicThemeSwitch`، `ToggleChips`، `GlassSegmented`، `EqualizerBars`، وأنماط `bouncy-toggle` و`glow-toggle` و`theme-switcher` و`md3-switch` في كتالوج NOVA |
| محمّلات ومؤشرات انتظار | 62، 65، 77، 99، 102 | `AiLoader`، `FluxLoader`، `WaveLoader`، `PulseRadar`، `LogoTraceLoader`، `SegmentLoader` |
| هياكل تحميل | 57، 119 | `SkeletonToContent` |
| تقييم بالنجوم | 72 | `StarRating` |
| إعجاب وحفظ | 64، 115 | `ReactionBar`، `BookmarkToggle` |
| مجلّدات وملفات | 55، 56، 67، 114 | `FolderCard`، `FileCard`، `WorkflowSteps` |
| أزرار ميكانيكية ومفاتيح لوحة | 58، 94، 97 | `KeycapButton`، `PushButton`، `SquishButton` |
| بطاقات ثلاثية الأبعاد وإمالة | 82، 85، 117 | `TiltedStack3D`، `CubeRotate3D`، `FlipCard`، `SpecularCard` |
| أسطح زجاجية | 84 | `LiquidGlassCard`، `ProgressiveBlur` |
| تموّج عند النقر | 70 | `RippleButton` |
| إرسال ينتهي بتأكيد داخل الزر | 80، 100 | نمط `publish` في كتالوج NOVA |
| حالة «متاح / محدود» | 60، 93 | `StatusStrip` مع `ToggleChips` |
| أزرار حذف وتحرير وأرشفة | 71، 81، 90، 105، 106، 118 | مفردات الأزرار في `buttons.tsx` وحالة destructive في مختبر الإجراءات |
| شريط تقدّم | 89 | `RangeBar`، `MetricRing`، `ProgressCircle` |
| بحث يتمدّد | 110 | نمط `search-dock` في كتالوج NOVA |
| بريق وجسيمات | 101، 111 | `Ignite`، `SlidingGradientButton`، `BurstSeal` |
| بطاقة ترتيب تتوسّع | 78، 79 | `BigStatRow` مع `SplitCard` |
| بطاقة طقس بخلفية متحركة | 68 | `GlanceableTile`، `AnticipatoryDashboard` |
| زرّ GitHub | 95 | زرّ ثانوي بأيقونة، لا يستحق مكوّنًا |
| زرّ معطّل يهتزّ | 92 | حالة `disabled` في مفردات الأزرار |

## ما رُفض لأسباب أخرى

- **حقل النجوم الخلفي (73)**: نحو ألفَي سطر من `box-shadow` لتوليد نجوم. زخرفة خالصة بلا وظيفة، وتخالف بند مكافحة الحشو في `design.md` §11. البديل الموجود: `AuroraMeshHero` و`NoiseDotCard`.
- **مفتاح المصباح الفيزيائي (113)**: نحو 600 سطر لمفتاح واحد. الفكرة (مادة ثقيلة ذات وزن) مغطّاة بـ`PhysicsLab`، والتكلفة لا تبرّرها.
- **زرّ «Generate Idea» بالشعلة (98)**: مكتوب بـTailwind، والمشروع لا يستخدمه، وإعادة بنائه تعطي `GenerateButton` الموجود.
- **مفتاح الرموز التعبيرية (104)**: يعتمد على إيموجي كحالة، وهو ما يمنعه معيار الوصول في `10-ACCESSIBILITY-I18N.md` لأن قارئ الشاشة يقرأ «علامة صح» بدل الحالة.

## قاعدة النقل

كل ما يدخل من مصدر خارجي يمرّ بهذه الشروط قبل قبوله:

1. لا لون خامّ. التوكنز فقط، فيعمل النمط في حزم الثيم السبع.
2. الحركة على `transform` و`opacity` و`filter` و`clip-path`، والـkeyframes في `src/madar/bridge.css` لا داخل المكوّن.
3. تخطيط منطقي الاتجاه يعمل في RTL بلا استثناءات.
4. حالة معلنة لقارئ الشاشة حين يتغيّر شيء، وهدف لمس لا يقلّ عن 44px للضوابط الأساسية.
5. صفر مخالفات Axe على القسم في حزم الثيم والقياسات، مثبتة بـ`npm run qa:madar`.
