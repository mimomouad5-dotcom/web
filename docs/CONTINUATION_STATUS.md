# DEXTER – حالة التقدم ومكان الاستمرار

## ملخص سريع
هذا المستودع يمثّل مشروع DEXTER، وهو منصة بحثية ذكية لتحويل الموضوع إلى عرض تقديمي (PowerPoint) مستند إلى مصادر موثقة. تم توثيق المشروع بشكل واضح في:

- `docs/DECISIONS.md` — قرارات التصميم التقنية
- `docs/ARCHITECTURE.md` — المعمارية العامة للنظام
- `README.md` — نقطة دخول أساسية

تم الوصول إلى حالة المشروع الحالية، ووضعنا نقطة بداية واضحة للاستمرار من هنا.

## ما تم توثيقه فعلاً
- المشروع مبني على Next.js + TypeScript + Tailwind + shadcn/ui
- قاعدة البيانات الأساسية: PostgreSQL
- Redis + BullMQ للمهام غير المتزامنة
- OpenRouter كطبقة توجيه AI
- استراتيجية بحث متعددة المزودات (Tavily + Academic APIs)
- Presentation JSON كوسيط مركزي بين الذكاء الاصطناعي والتصدير
- PptxGenJS للتصدير النهائي إلى PowerPoint
- LangChain / LangGraph للتنظيم والتنسيق
- دعم RTL و i18n من البداية
- فصل Jobs / Workers عن تطبيق الويب

## ما الذي يجب إكماله الآن
### 1) بناء هيكل التطبيق الأساسي
- إعداد تطبيق Next.js مع التهيئة الكاملة
- إنشاء layout أساسي
- إنشاء صفحات dashboard، projects، preview، export
- إعداد routing و auth structure

### 2) قاعدة البيانات والبيانات
- تصميم Prisma schema
- نموذج users / projects / deck versions / sources / jobs
- إعداد migrations
- إضافة إعدادات env

### 3) نظام الذكاء الاصطناعي والبحث
- إنشاء abstraction layer للمزودات
- توحيد OpenRouter + Tavily + Semantic Scholar + Crossref + arXiv
- إعداد source normalization و citation mapping
- بناء pipeline لبحث المصادر

### 4) نظام المهام غير المتزامنة
- إعداد BullMQ workers
- إدارة job lifecycle (pending / running / failed / completed)
- مراقبة التقدم والنتائج
- ربط الواجهة الأمامية بتحديثات progress

### 5) توليد العرض التقديمي
- إنشاء Presentation JSON schema
- بناء slide generation pipeline
- ربط الأوامر بنموذج AI
- التحقق من الحقائق (source-grounded)
- إعداد preview renderer
- إعداد PPTX export باستخدام PptxGenJS

### 6) تجربة المستخدم والعالمية
- RTL/LTR logic
- دعم العربية والإنجليزية والفرنسية
- تصميم UI للمحرر ومعاينة الشرائح
- إعداد النسخ والعودة إلى الإصدارات السابقة

### 7) النشر والتشغيل
- إعداد Docker / deployment
- إعداد object storage
- إعداد monitoring و logs
- إعداد environment variables كاملة

## نقطة البداية الموصى بها
البدء من الملفات التالية بالترتيب:

1. `docs/ARCHITECTURE.md`
2. `docs/DECISIONS.md`
3. `package.json`
4. `src/` 구조
5. `prisma/`
6. app endpoints and jobs

## رابط الاستمرار المخصص
للاستمرار باستخدام أداة أو نموذج آخر، استخدم هذا الرابط:

https://github.com/mimomouad5-dotcom/web/blob/main/docs/CONTINUATION_STATUS.md

هذا الملف يعتبر نقطة دخول واضحة لتحديد مكان التوقف وموضع الاستمرار.

## ملف نقطة الانطلاق البديلة
إذا رغبت في البدء من نقطة أكثر تنظيمًا، يمكن استخدام الملف:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/CONTINUATION_STATUS.md`

## ملاحظة مهمة
إذا أردت، يمكن في الخطوة التالية أن أبدأ فعلياً في تنفيذ أحد الأقسام التالية داخل المستودع:

1. إعداد هيكل Next.js الحقيقي داخل `src/`
2. إنشاء Prisma schema و models
3. إعداد API routes للـ projects
4. بناء worker jobs مع BullMQ
5. إنشاء صفحة Dashboard / Home
6. إعداد preview/export pipeline

## نقطة التوقف الحالية
التوقف الحالي تم توثيقه هنا: `docs/CONTINUATION_STATUS.md`.
يمكن لأي أداة لاحقة أن تستأنف من هذا الملف مباشرة دون الحاجة إلى إعادة اكتشاف المشروع.
