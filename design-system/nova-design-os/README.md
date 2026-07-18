# NOVA Design OS

مرجع تصميم وتطوير معياري، عربي أولًا، يصلح كنقطة انطلاق لأي منتج رقمي ثم يُخصّص حسب سياقه. هدفه أن يعطي المصمم أو وكيل AI قرارات قابلة للتنفيذ بدل قائمة مؤثرات أو صور إلهام مبعثرة.

## نقطة البداية

ابدأ دائمًا من [DESIGN.md](./DESIGN.md). هذا هو الملف المعياري المتوافق مع صيغة Google DESIGN.md، وتوكناته هي الطبقة الملزمة. بعده اقرأ فقط الملفات المتصلة بالمهمة.

| عند العمل على | اقرأ أيضًا |
|---|---|
| هوية أو اتجاه بصري | [01-FOUNDATIONS.md](./01-FOUNDATIONS.md) و[02-TOKENS.md](./02-TOKENS.md) |
| نصوص وخطوط عربية/إنجليزية | [03-TYPOGRAPHY-CONTENT.md](./03-TYPOGRAPHY-CONTENT.md) |
| Layout أو Responsive | [04-LAYOUT-RESPONSIVE.md](./04-LAYOUT-RESPONSIVE.md) |
| Header، Sidebar، Dock، Tabs | [05-NAVIGATION-SHELLS.md](./05-NAVIGATION-SHELLS.md) |
| مكوّنات ونماذج وحالات | [06-COMPONENTS-STATES.md](./06-COMPONENTS-STATES.md) |
| Dashboard، Admin، Charts، Cards | [07-CARDS-DATA-ADMIN.md](./07-CARDS-DATA-ADMIN.md) |
| Motion، Glass، Glow، Gradient | [08-MOTION-MATERIALS.md](./08-MOTION-MATERIALS.md) |
| تجربة جوال وإيماءات | [09-MOBILE-NATIVE.md](./09-MOBILE-NATIVE.md) |
| Accessibility، RTL، i18n | [10-ACCESSIBILITY-I18N.md](./10-ACCESSIBILITY-I18N.md) |
| مراجعة الجودة ومنع AI slop | [11-ANTI-SLOP.md](./11-ANTI-SLOP.md) |
| تسليم المهمة لوكيل AI | [12-AI-AGENT-PROTOCOL.md](./12-AI-AGENT-PROTOCOL.md) |
| معرفة أصل الأفكار وحدود استخدامها | [13-REFERENCE-MAP.md](./13-REFERENCE-MAP.md) |

## الملفات التنفيذية

- [tokens/tokens.css](./tokens/tokens.css): توكنات CSS جاهزة للوضعين النهاري والليلي، مع تفضيلات الحركة والشفافية والتباين.
- [tokens/tokens.json](./tokens/tokens.json): المصدر القابل للقراءة آليًا والتحويل إلى أي stack.
- [templates/PAGE-BRIEF.md](./templates/PAGE-BRIEF.md): قالب تعريف صفحة قبل تصميمها.
- [templates/COMPONENT-SPEC.md](./templates/COMPONENT-SPEC.md): قالب مواصفة مكوّن وحالاته.
- [.impeccable/design.json](./.impeccable/design.json): امتدادات الآلة للحركة والظلال والـbreakpoints.

## مبدأ التشغيل

النظام لا يعني وضع كل الأساليب في الشاشة نفسها. لكل مشروع أو صفحة **Register** واحد أساسي:

1. **Product Register**: هادئ، مباشر، عالي الوضوح لتطبيقات SaaS والإعدادات والعمل اليومي.
2. **Editorial Register**: مساحة ونص وصورة للواجهات التسويقية والقصص والـlanding pages.
3. **Data Register**: كثافة مضبوطة وجداول ورسوم ولوحات Admin.
4. **Immersive Register**: مشهد أو قطعة بصرية واحدة للحظات العرض والتجربة، لا للمهام المتكررة.

يمكن استعارة عنصر ثانوي من Register آخر، لكن بعد إثبات وظيفته. لا يُجمع glass وglow وfoil و3D وgradient وspring في سطح واحد لمجرد أنها متاحة.

## قاعدة الأولوية

عند التعارض اتبع هذا الترتيب:

1. هدف المستخدم وسلامة المهمة.
2. `PRODUCT.md` ومتطلبات المشروع الفعلية.
3. `DESIGN.md` وتوكناته.
4. Page override موثق.
5. Accessibility وRTL وقيود المنصة.
6. هذا المرجع المتخصص.
7. المصادر الخارجية ومكتبات المكوّنات.

## إنشاء تخصيص لمشروع أو صفحة

لا تعدّل القواعد الأساسية لأجل استثناء مؤقت. أنشئ override قصيرًا يتضمن:

```md
# Page Override: Analytics

- Register: Data
- DESIGN_VARIANCE: 5/10
- MOTION_INTENSITY: 3/10
- VISUAL_DENSITY: 8/10
- Dominant task: Compare weekly performance
- Signature moment: One annotated trend chart
- Allowed exception: Compact 36px desktop controls
- Forbidden carry-over: Hero gradients, floating dock, decorative glass
```

## تعريف النجاح

الواجهة الناجحة هنا:

- تبدو مؤلفة خصيصًا للمنتج، لا template مجهولًا.
- تجعل الإجراء الأساسي واضحًا من أول نظرة.
- تحافظ على نموذج ذهني مألوف ثم تضيف لمسة مميزة واحدة.
- تعمل باللمس والكيبورد والقارئ الصوتي وRTL وLTR.
- تبقى مفهومة دون الحركة أو blur أو اللون وحده.
- تملك كودًا قابلًا للصيانة، لا لقطة جميلة فقط.

