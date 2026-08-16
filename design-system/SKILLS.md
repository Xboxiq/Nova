# السكِلّز — ما ثُبّت ولماذا، وما رُفض ولماذا

القاعدة: سكِل تدخل هذا المستودع لأنها تخدم عملًا يجري فيه فعلًا، لا لأنها متاحة. المستودع يملك أصلًا نظام تصميم مقرّرًا (`nova-design-os` بـ3.6 آلاف سطر، و`design.md` بـ785 سطرًا، وسبع حزم ثيم بتباين مقيس)، فأي سكِل تنافس قرارًا متّخذًا تُرفض.

## المثبَّتة

| السكِل | المصدر | لماذا |
|---|---|---|
| `impeccable` | pbakaus/impeccable v3.9.1 | **كانت محمولة أصلًا في المستودع** تحت `tools/impeccable/` منذ الرفعة الأولى، لكن في مسار لا يقرأ منه Claude Code السكِلّز، وملف `SKILL.md` الخاص بها يشير إلى `.claude/skills/impeccable/`. فلم تعمل مرّة واحدة. نُقلت إلى مكانها الصحيح وتحقّقنا أن `context.mjs` يقرأ `PRODUCT.md` |
| `kill-ai-slop` | yetone/kill-ai-slop | الوحيدة في القائمة التي **تشحن ماسحًا قابلًا للتشغيل** (`scripts/scan.mjs`، Node خالص بلا تبعيات). تحوّل مكافحة الـslop من قيمة معلنة إلى فحص له مخرجات. متاحة عبر `npm run slop` |
| `design-taste-frontend` | Leonxlnx/taste-skill | `AGENTS.md` و`GUIDE.md` يفرضانها بالاسم على أي سطح منتج. كانت نسخة منها محبوسة في `archive/madar/.agents/` غير مرئية للأداة |
| `apple-design` | emilkowalski/skills | `AGENTS.md` يقول «استخدم سكِل `apple-design` المثبّتة» وهي **لم تكن مثبّتة**. هذا يسدّ ادّعاءً في التوثيق |
| `review-animations` | emilkowalski/skills | الحركة عمود هذا المشروع (`motion_level: 10`، بنك فيزياء، 99 حركية). مراجعة الحركة على diff |
| `improve-animations` | emilkowalski/skills | النظير التخطيطي للمراجعة: تدقيق شامل وخطة مرتّبة بالأولوية |
| `animation-vocabulary` | emilkowalski/skills | معجم عكسي يوحّد تسمية الحركات عبر التوثيق العربي والإنجليزي |
| `frontend-design` | anthropics/skills | توجيه الاتجاه البصري حين يكون السطح جديدًا لا مُراجَعًا |
| قانون pols.dev | pols.dev/slop.md | 1599 سطرًا من قانون مكافحة الـslop، محفوظة مرجعًا في `design-system/anti-slop/pols-slop-law.md`. مرجع يُقرأ، لا سكِل تُستدعى |

المثبَّتة سابقًا وتبقى: `ponytail` وعائلتها (ما تبنيه)، و`unlazy` (متى تنتهي).

## المرفوضة

| المصدر | لماذا |
|---|---|
| nextlevelbuilder/ui-ux-pro-max-skill | قيمتها 3.1 ميغابايت من لوحات ألوان ومزاوجات خطوط وإرشادات عامة قابلة للبحث. هذا المستودع لديه نظام **مقرّر** بسبع حزم ثيم مقيسة التباين ومعجم حركة كامل. إضافة مكتبة لوحات عامة إلى نظام مقرّر هي عين الـslop: «قرّر قبل أن تزخرف». `AGENTS.md` كان يفرضها بالاسم وقد صُحّح |
| MengTo/Skills | 143 ميغابايت، وأغلبها سكِلّز خاصة بـCodex ونشر على X وتحويل نص إلى كلام. القليل المتعلّق بالتصميم يكرّر `impeccable` |
| jakubkrehel/skills | `better-typography` و`better-colors` و`better-layout` و`interface-review` تكرّر ما يغطّيه `impeccable` و`nova-design-os` بتفصيل أكبر ومقيس |
| ibelick/ui-skills | `improve-ui` و`fixing-accessibility` و`fixing-motion-performance` تكرّر `impeccable` وفحص `npm run qa:madar` الذي يقيس الوصول فعليًا بـAxe |
| jamiemill/layers-skills | استراتيجية منتج وحاجات مستخدم، لا حرفة واجهة. خارج ما يفعله هذا المستودع الآن |
| ckissi/kinetics | **مستوعبة أصلًا**: 99 حركية منقولة في `src/madar/components/kinetics99.tsx` و`physics.tsx` |
| Shubham0812/SwiftUI-Animations | SwiftUI. هذا المشروع React على الويب |
| Subhan-code/Amicro و`transitions-pro` | يتطلّب `npx` مع حساب لما بعد المجاني، ويضيف تبعية خارجية لحركات المكتبة تملكها أصلًا |
| shadcn/improve | المشروع لا يستخدم shadcn، بل مكوّنات مبنية على توكنز NOVA |
| VoltAgent/awesome-design-md | قائمة مراجع. `AGENTS.md` يعاملها بحثًا مقارنًا لا سكِلًّا تُستدعى |
| metal / beam / orbs (jakubantalik) | مواقع عرض، لا سكِلّز |

## القاعدة للإضافات القادمة

قبل تثبيت أي سكِل: هل تخدم عملًا يجري؟ هل تنافس قرارًا متّخذًا في `nova-design-os`؟ هل تشحن شيئًا قابلًا للتشغيل يمكن أن يصير بوابة؟ الثالثة هي التي رجّحت `kill-ai-slop` على كل ما سواها.
