# 05. Navigation and Shells

## Wayfinding contract

كل شاشة تجيب بلا شرح منفصل:

1. أين أنا؟
2. ما الذي أستطيع فعله هنا؟
3. أين أذهب بعد ذلك؟
4. كيف أرجع أو أخرج؟
5. هل تغيّر شيء أو لم يُحفظ؟

## Information architecture

- أسماء الوجهات محددة: `التقارير` أفضل من `المزيد`، و`أعضاء الفريق` أفضل من `الإدارة` إذا كان هذا المحتوى الفعلي.
- المستوى الأول 4–7 مجموعات في desktop product، و3–5 في mobile bottom navigation.
- العناصر الأقل تكرارًا تنتقل إلى secondary navigation أو search، لا hamburger واحد مجهول لكل شيء.
- لا تغير مكان الوجهة بين الصفحات.
- deep link يحافظ على context وback behavior.

## Marketing top navigation

### Anatomy

- brand/wordmark.
- حتى 5 روابط رئيسية.
- utility اختيارية: language/theme/sign in.
- CTA واحدة.

### Behavior

- 64–72px ارتفاع.
- opaque افتراضيًا؛ translucent فقط عند scroll فوق content بصري.
- active state لا يلزم marketing flat IA، لكن hover/focus واضحان.
- sticky nav تستخدم scroll edge fade بدل divider ثقيل إن كانت material عائمة.
- mobile menu dialog/drawer كامل semantics؛ focus trap، Escape، وclose label.

## Product shell desktop

### Side navigation

- 264px expanded، 72px rail.
- logo/workspace switcher أعلى.
- primary destinations في الوسط.
- help/settings/account أسفل إذا كانت عالمية.
- active = surface + icon/text weight + optional 2px indicator. لا يعتمد على Iris fill كامل لكل row.
- collapsed rail يحافظ على tooltip وaccessible labels ولا يصبح لغز icons.

### Page header

- breadcrumb فقط عند 3 مستويات أو أكثر.
- title + optional description/status.
- primary action في inline-end.
- secondary actions في overflow عند ضيق العرض.
- context مثل workspace/date range يمكن أن يكون في subbar مستقل.

### Command surface

- search أو command launcher في topbar عندما يغطي المنتج أكثر من 3 domains.
- shortcut يظهر بصيغة platform-aware.
- لا يستبدل navigation العادية.

## Mobile bottom navigation

- 3–5 وجهات ثابتة عالية التكرار.
- ارتفاع بصري 64px + safe area.
- icon 24px وlabel 11–12px؛ touch region لا تقل عن 48px.
- active state: icon weight/fill أو background shape + label، وليس اللون وحده.
- center action المرفوع لا يُستخدم إلا إذا كان “create” هو الفعل العالمي فعلًا.
- badges للأعداد المهمة فقط وتُعلن للقارئ الصوتي بصياغة مفهومة.

### Adaptive dock

النمط المستلهم من الـfloating dock يستخدم عندما تكون الوجهات قليلة والسياق بصريًا خفيفًا.

- shell opaque أو glass مضبوط.
- active item يمكن أن يتسع ليكشف label، لكن يبقى العرض الكلي ثابتًا قدر الإمكان.
- الحركة 240–360ms وinterruptible.
- نسخة reduced motion تبدّل الحالة بلا resize متحرك.
- لا يُستخدم فوق جدول أو form طويل إذا غطى المحتوى أو غيّر thumb targets باستمرار.

## Tabs and segmented controls

### Tabs

- للـpeer content داخل نفس الصفحة.
- 2–5 tabs ideal.
- URL/deep link عندما المحتوى مهم أو قابل للمشاركة.
- indicator ينتقل مكانيًا لكن لا يمنع immediate content update.
- overflow: scroll مع edge hint أو menu، ولا تصغّر النص.

### Segmented control

- لاختيار mode واحد من 2–4 داخل نفس context: list/grid، day/week/month.
- ليس navigation عميقة.
- selected state شكل + contrast + semantics `aria-pressed` أو radio group.

## Breadcrumbs

- تظهر عند hierarchy حقيقية 3+.
- آخر عنصر current page غير قابل للنقر.
- في RTL يتجه separator بصريًا بما يناسب القراءة، لكن DOM يبقى من ancestor إلى current.
- mobile يعرض parent back label أو compact trail، لا سلسلة مزدحمة.

## Command palette

### متى تستخدم

- مستخدمون متكررون وkeyboard-heavy.
- أوامر ووجهات قابلة للبحث.
- recent/frequent actions مفيدة.

### المواصفة

- trigger واضح `⌘K`/`Ctrl+K`.
- dialog semantics وcombobox/listbox صحيحة.
- grouping حسب intent، لا حسب فريق داخلي.
- result = icon + primary label + optional path/shortcut.
- arrow keys، Enter، Escape، loop اختياري معلن.
- empty state يقترح صياغة بحث أو direct action.
- async search يعرض progress دون layout jump.

## Search dock

الـexpanding search يبدأ icon-only فقط إذا كانت وظيفة البحث متوقعة ومجاورة للنتائج.

- focus يوسع الحقل فورًا.
- يحتفظ بمكانه حتى لا يزيح action حرجًا.
- Escape يمسح أولًا ثم يغلق، أو يغلق حسب state المعلنة.
- mobile يستخدم full-width search surface أو search screen، لا capsule ضيقة.

## Create menu and floating action menu

- زر Create واحد يفتح 3–7 أنواع إنشاء مترابطة.
- كل item يشرح الناتج، لا icon واسمًا غامضًا.
- العناصر الأكثر شيوعًا أولًا؛ آخر استخدام يمكن أن يصبح default بعد إثباته.
- radial/fan menu مقبول على mobile لحد 3–4 actions وبمسافات لمس كافية؛ list popover أكثر وضوحًا غالبًا.
- لا animation انفجارية في admin.

## Dynamic status island

يُستخدم لحالة مؤقتة ذات بداية ونهاية: upload، recording، connection، timer، أو background task.

- collapsed: icon + essential value.
- expanded: status + progress + one contextual action.
- لا يعرض marketing، ولا يصبح inbox كاملًا.
- لا يعتمد على hover، ويملك live-region rate محدودًا.
- يختفي أو ينتقل إلى activity center بعد اكتمال الحالة.

## Modal system

### Decision table

| Pattern | Use | Avoid when |
|---|---|---|
| Alert dialog | تأكيد خطير أو قرار قصير | content يحتاج scroll/بحث |
| Dialog | task قصيرة أو review | flow متعدد الخطوات على mobile |
| Drawer | parallel details على desktop | يمنع مقارنة لازمة مع المحتوى |
| Bottom sheet | mobile contextual task | content طويل جدًا أو deep navigation |
| Full-screen flow | onboarding/checkout/mobile edit | مجرد اختيارين بسيطين |
| Popover | 3–10 خيارات مرتبطة بالtrigger | touch primary flow أو nested menus كثيرة |

### Anatomy

- title يصف القرار.
- optional description يشرح العواقب.
- content region.
- actions مرتبة حسب locale وplatform convention مع primary واضح.
- close icon لا يحل محل Cancel عندما فقدان البيانات ممكن.
- atmospheric cap اختياري للinstall/onboarding/connection، مع surface content واضحة أسفله.

### Unsaved changes

- إذا كان الحفظ تلقائيًا، اشرح status بدل dialog.
- إذا كانت تغييرات قابلة للفقد: اعرض `حفظ ومغادرة`، `مغادرة دون حفظ`، `البقاء`.
- لا تحذر من تغييرات trivial أو قابلة للاسترجاع بسهولة.
- browser `beforeunload` للحالات الحقيقية فقط.

## Notifications and activity

- Toast للتأكيد العابر، لا لأخطاء تحتاج قرارًا.
- notification center للتاريخ والإجراءات المؤجلة.
- activity dropdown للعمليات الجارية/المكتملة مع timestamps وstatus.
- announcement bar لخبر عالمي واحد قابل للإغلاق، مع حفظ الإغلاق إن كان منطقيًا.
- لا تكرر الرسالة نفسها في badge وtoast وbanner وmodal.

## Navigation accessibility

- `nav` landmarks مسماة عند التعدد.
- current destination تستخدم `aria-current="page"`.
- tab order يتبع DOM والقراءة، لا CSS visual reordering.
- skip link إلى main content.
- focus يعود إلى trigger بعد menus/dialogs.
- touch gaps لا تقل عن 8px عندما تكون الأهداف صغيرة نسبيًا.
- لا keyboard trap إلا داخل modal حقيقي مع طريق واضح للإغلاق.

## Shell QA

- [ ] active/current واضح باللون والشكل والنص.
- [ ] back behavior متوقع ويحافظ على state.
- [ ] mobile nav لا يزيد عن 5 وجهات.
- [ ] dock يحترم safe area ولا يغطي المحتوى.
- [ ] overflow actions قابلة للاكتشاف.
- [ ] كل menu/dialog يعمل بالكيبورد.
- [ ] command palette لا يحتكر الوصول إلى الأوامر.
- [ ] unsaved changes لا يزعج ولا يسمح بفقد غير متوقع.
- [ ] RTL separators، arrows، panel origins صحيحة.

