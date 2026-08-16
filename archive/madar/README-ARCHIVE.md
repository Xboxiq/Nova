# أرشيف مدار

هذا المجلد يحفظ حزمة التسليم الأصلية لمشروع **مدار (Madar)** كما وصلت من Claude Design، بعد دمج الكود داخل NOVA UI. المحتوى هنا **مرجع تاريخي فقط**، ولا يُبنى ولا يُستورد من التطبيق.

تاريخ مدار الكامل محفوظ في هذا المستودع: أُدخل عبر `git subtree`، فكل commits مدار الأصلية موجودة في `git log`.

## ما الذي بقي هنا

| المسار | المحتوى |
|---|---|
| `chats/` | نصوص المحادثة الأصلية مع مساعد التصميم، وفيها نيّة المستخدم كما عبّر عنها |
| `project/Showcase.dc.html` | النموذج الأولي الأساسي الذي بُنيت منه المكتبة |
| `project/uploads/` | المكتبات المرجعية المرفوعة: Jahez Pattern Library، Liquid Soft Toolkit، Icons & Cards Lab، وغيرها |
| `project/extracted/` | النسخ المستخرجة من تلك المرفوعات |
| `project/design.md` | نُقل إلى `design-system/madar/design.md` وأصبح مرجعًا حيًّا |
| `project/support.js` | سكربت الحزمة الأصلية |
| `.agents/` | سكِلّات التذوّق المثبّتة وقت بناء مدار |
| `assets/icons.svg` | ملف sprite لم تستخدمه المكتبة؛ مكوّنات مدار ترسم SVG داخليًا |
| `README.md` | تعليمات حزمة التسليم الأصلية الموجّهة لوكيل برمجي |
| `skills-lock.json` | قفل السكِلّات وقت التسليم |

## أين ذهب الباقي

| كان في مدار | صار في NOVA |
|---|---|
| `madar/src/components/` | `src/madar/components/` |
| `madar/src/showcase/` | `src/madar/showcase/` |
| `madar/src/theme/` | `src/madar/theme/` |
| `madar/src/styles/tokens.css` | `src/madar/bridge.css` وحزم الثيم في `design-system/nova-design-os/tokens/theme-packs.css` |
| `madar/src/styles/interactions.css` | `src/madar/interactions.css` |
| `madar/src/App.tsx` وشريط التحكم | استُبدلا بقشرة NOVA و`src/components/MadarLibrary.tsx` |
| `madar/CLAUDE.md` | `design-system/madar/GUIDE.md` |
| `madar/AUDIT.md` | `design-system/madar/AUDIT-LEGACY.md` |
| `project/design.md` | `design-system/madar/design.md` |
