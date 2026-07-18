# 10. Accessibility, RTL, and Internationalization

## Standard

الهدف الأدنى WCAG 2.2 AA، لكنه ليس checklist تباين فقط. يجب أن تبقى المهمة قابلة للإنجاز بالكيبورد، اللمس، القارئ الصوتي، zoom، reduced motion، وRTL/LTR.

## Contrast

- body text: 4.5:1 minimum.
- large text: 3:1 عندما يحقق تعريف الحجم/الوزن.
- controls، focus indicators، chart marks الضرورية: 3:1 مع المحيط.
- disabled state لا تحتاج contrast كاملًا إذا غير تفاعلية، لكن label يجب أن تبقى مفهومة عند الحاجة.
- placeholder لا يحمل معلومة وحيدة، ويظل مقروءًا.
- اختبر glass/gradient/image عند أسوأ background محتمل، لا screenshot واحدة.

## Focus

- لا `outline:none` بلا replacement.
- ring 2px + offset 2px عادة.
- focus visible فوق كل themes/surfaces.
- لا يُقص بـoverflow.
- عند فتح dialog: focus لأول عنصر منطقي أو title/container بحسب المهمة.
- عند الإغلاق: يعود إلى trigger.
- عند حذف row focused: ينتقل إلى row منطقي أو heading مع announcement.
- skip link أول عنصر keyboard في shells الثقيلة.

## Keyboard

### Global

- Tab/Shift+Tab يتبع DOM وreading order.
- Enter/Space حسب semantic element.
- Escape يغلق transient layer أو يلغي state المناسبة.
- لا traps خارج modal.
- shortcuts لا تتعارض مع browser/assistive tech، ويمكن اكتشافها وتعطيلها.

### Pattern behavior

| Pattern | Keys |
|---|---|
| Tabs | Arrows للتنقل، Home/End، activation حسب model |
| Menu | Arrows، Enter/Space، Escape، typeahead |
| Listbox | Arrows، typeahead، Enter/Space select |
| Combobox | typing + arrows + Escape + Enter |
| Dialog | Tab cycle داخل modal، Escape عند السماح |
| Slider | arrows، PageUp/Down optional، Home/End |
| Grid/table interactive | model موثق، لا مئات tab stops عبثية |

استخدم native elements أو primitives مجربة بدل إعادة بناء keyboard model من الصفر.

## Touch and pointer

- 44×44px minimum للأفعال الأساسية.
- 8px gap بين targets المتجاورة عند الإمكان.
- hover لا يكشف content/action وحيدًا.
- pointer target لا يساوي visual icon الصغير؛ وسّع hit area.
- drag/swipe له alternative.
- tooltips لا تعتمد hover فقط وتغلق بـEscape.

## Screen readers and semantics

- landmarks: header/nav/main/aside/footer مع labels عند التعدد.
- heading order منطقي دون قفزات لأجل الشكل.
- buttons للأفعال، links للتنقل.
- form label مرتبط بـinput؛ fieldset/legend للمجموعات.
- status messages: `role=status` أو polite live region.
- urgent destructive errors فقط assertive، وباقتصاد.
- icon زخرفي `aria-hidden=true`، icon-only button باسم واضح.
- SVG chart له title/desc وsummary/table بديل.
- hidden content لا يبقى focusable.

## Motion, transparency, and contrast preferences

### Reduced motion

- توقف loops/parallax/marquees.
- springs/slides تصبح crossfade أو instant.
- المحتوى يبقى ظاهرًا.
- live visualization تملك pause.

### Reduced transparency

- glass يصبح opaque surface.
- لا يعتمد hierarchy على رؤية ما خلف الطبقة.

### More contrast

- surfaces أقرب إلى solid.
- border/focus أقوى.
- subtle metadata تقترب من secondary text.
- shadows لا تعوض الحدود.

## Zoom and text scaling

- web يعمل عند 200% zoom دون فقد الوظيفة.
- النص لا يُقفل بـpx heights.
- `rem/em` للخطوط والمسافات المرتبطة بالنص.
- لا تقص labels داخل bottom nav/buttons؛ اسم أقصر أو layout متكيف.
- full-screen dialogs لا تعتمد viewport ثابتة.

## Color vision

- status = icon/shape/label + color.
- chart series = dash/marker/label + color.
- success/error لا يُفهمان من green/red border فقط.
- لا red/green heatmap دون pattern أو labels.
- selected state لا يعتمد tint منخفضة contrast وحدها.

## Cognitive accessibility

- لغة مباشرة، خطوة واحدة واضحة.
- consistent labels/placements.
- progressive disclosure بلا إخفاء المطلوب.
- errors قابلة للإصلاح ولا تمسح data.
- timeout قابل للتمديد في المهام غير الأمنية.
- destructive action يشرح النتيجة والتراجع.
- animation لا تشتت عن القراءة.
- لا dark patterns، fake urgency، أو opt-out مخفي.

## RTL architecture

### CSS

- `margin-inline`, `padding-inline`, `inset-inline`, `border-inline`.
- `text-align:start/end`.
- flex/grid order يظل semantic؛ لا `row-reverse` عام لقلب كل شيء.
- selectors `[dir="rtl"]` للاستثناءات الاتجاهية فقط.

### Directionality classes

| عنصر | السلوك في RTL |
|---|---|
| Back/forward/chevron | ينعكس |
| Previous/next في reading sequence | ينعكس حسب اللغة |
| Undo/redo | قد ينعكس إذا glyph اتجاهية |
| Play، pause، search، check، plus | لا ينعكس |
| Chart time axis | يقرر حسب data convention والجمهور، ويوثق |
| Map compass/direction | لا يُقلب تلقائيًا |
| Logo/brand | لا يُقلب |

### Mixed content

- `bdi` للأسماء/القيم مجهولة الاتجاه.
- `dir=ltr` للبريد، URL، code، IDs، phone عند الحاجة.
- لا تضع punctuation خارج isolated span فتقفز بصريًا.
- الأرقام يمكن أن تبقى LTR داخل sentence RTL.

## Localization

- لا concatenate fragments؛ استخدم message كاملًا مع placeholders.
- دعم plural rules العربية.
- dates/currency/units عبر `Intl`.
- timezone وcalendar system واضحان عند التأثير.
- text expansion 30–50% متوقع.
- labels لا تُختصر ترجمةً لتناسب fixed width.
- assets/screenshots ذات النص تحتاج نسخة محلية أو text-free.
- search يراعي normalization العربية عند المنتج المناسب: همزات/تشكيل/ياء وألف مقصورة بسياسة واضحة.

## Arabic numerals policy

يحدد المشروع preference:

- `latn`: 0–9 لمنتج تقني عالمي أو بيانات مختلطة.
- `arab`: ٠–٩ لمنتج محلي يفضله جمهوره.

لا تخلط النظامين داخل table أو metric group. IDs والcode قد تبقى Latin حتى في locale عربي.

## Forms accessibility

- label، required indicator نصيًا أو semantically.
- helper قبل error ويظل مرتبطًا بـ`aria-describedby`.
- error summary للـforms الطويلة مع anchors.
- focus على أول error بعد submit، مع الحفاظ على data.
- password rules قبل الإدخال وstatus غير معتمد على checkmarks الخضراء فقط.
- OTP يدعم paste/autofill.
- date picker له direct input عند الإمكان.

## Media and illustrations

- alt يصف الوظيفة/المعلومة، لا “صورة جميلة”.
- decorative art `alt=""` أو hidden.
- video captions/transcript.
- autoplay muted فقط إذا زخرفي وممكن الإيقاف، مع reduced-motion stop.
- animation/Canvas/WebGL لها fallback meaningful.

## Testing matrix

### Automated

- axe/Lighthouse كتنبيه أولي، لا إثبات كامل.
- TypeScript/ESLint.
- tests بـrole/label queries.
- color contrast على token pairs.

### Manual

- keyboard only.
- VoiceOver على iOS/macOS أو NVDA على Windows على الأقل.
- 200% zoom + large text.
- RTL وLTR.
- light/dark/high contrast.
- reduced motion/transparency.
- touch on 390px.
- errors، timeouts، offline، slow network.

## Release gate

- [ ] المهمة الأساسية تعمل دون mouse.
- [ ] كل control له name/role/state.
- [ ] focus ظاهر وغير مقصوص.
- [ ] contrast token pairs ناجحة.
- [ ] no color/motion/hover-only meaning.
- [ ] 44px touch targets في المسار المحمول.
- [ ] dialogs تدير focus وتعيده.
- [ ] charts لها summary/table.
- [ ] العربية الطويلة وmixed direction مختبرة.
- [ ] reduced preferences لها بدائل.

