export function getDefaultSiteData(subdomain: string) {
    return {
        subdomain,
        isPublished: true,
        sectionOrder: ['hero', 'logosBar', 'features', 'howItWorks', 'pricing', 'testimonials', 'faq', 'ctaBanner', 'contact'],

        global: {
            siteName: 'إنطلاق',
            favicon: '',
            primaryColor: '#6366F1',
            fontHeading: 'Sora',
            fontBody: 'Inter',
            seo: {
                title: 'إنطلاق - منصة إطلاق المشاريع الناشئة',
                description: 'ابنِ، أطلق، ونمِّ مشروعك مع منصتنا المتكاملة',
                ogImage: '',
            },
        },

        navbar: {
            logo: 'إنطلاق',
            logoType: 'text',
            links: [
                { label: 'المميزات', href: '#features', isButton: false },
                { label: 'كيف يعمل', href: '#how-it-works', isButton: false },
                { label: 'الأسعار', href: '#pricing', isButton: false },
                { label: 'آراء العملاء', href: '#testimonials', isButton: false },
                { label: 'تواصل معنا', href: '#contact', isButton: false },
            ],
            ctaText: 'ابدأ الآن',
            ctaHref: '#pricing',
        },

        hero: {
            badge: '✦ النسخة التجريبية متاحة الآن',
            headline: 'أطلق مشروعك الناشئ',
            headlineHighlight: 'أسرع من أي وقت مضى',
            subheadline: 'ابنِ، أطلق، ونمِّ مشروعك مع منصتنا المتكاملة. كل ما تحتاجه لتحويل فكرتك إلى منتج ناجح يحقق أهدافك.',
            ctaPrimaryText: 'ابدأ مجاناً',
            ctaPrimaryHref: '#pricing',
            ctaSecondaryText: 'شاهد العرض التوضيحي',
            ctaSecondaryHref: '#features',
            image: '',
            imageAlt: 'لقطة شاشة المنتج',
            stats: [
                { value: '10,000+', label: 'مستخدم نشط' },
                { value: '500+', label: 'مشروع ناجح' },
                { value: '99.9%', label: 'وقت التشغيل' },
            ],
        },

        logosBar: {
            isVisible: true,
            label: 'موثوق من قبل فرق العمل في',
            logos: [
                { name: 'شركة الابتكار', image: '' },
                { name: 'تقنية المستقبل', image: '' },
                { name: 'رؤية ديجيتال', image: '' },
                { name: 'بيانات ذكية', image: '' },
                { name: 'حلول سحابية', image: '' },
            ],
        },

        features: {
            isVisible: true,
            badge: 'المميزات',
            title: 'كل ما تحتاجه لبناء منتجك',
            subtitle: 'أدوات قوية ومتكاملة تساعدك على التركيز على ما يهم — بناء منتج رائع يلبي احتياجات عملائك.',
            layout: 'grid',
            items: [
                {
                    icon: 'Zap',
                    title: 'سرعة فائقة',
                    description: 'أداء محسّن يضمن تجربة سلسة لمستخدميك مع أوقات تحميل أقل من ثانية واحدة.',
                    image: '',
                },
                {
                    icon: 'Shield',
                    title: 'أمان متقدم',
                    description: 'حماية بيانات من الدرجة الأولى مع تشفير شامل ومراقبة مستمرة على مدار الساعة.',
                    image: '',
                },
                {
                    icon: 'Globe',
                    title: 'انتشار عالمي',
                    description: 'وصول إلى جمهورك في أي مكان في العالم مع شبكة CDN عالمية وأداء موحّد.',
                    image: '',
                },
                {
                    icon: 'BarChart3',
                    title: 'تحليلات ذكية',
                    description: 'لوحة تحكم متقدمة تعرض كل المقاييس المهمة لنمو مشروعك في مكان واحد.',
                    image: '',
                },
                {
                    icon: 'Puzzle',
                    title: 'تكامل سهل',
                    description: 'تكامل مع أكثر من 100 أداة وخدمة خارجية بنقرة واحدة دون أي برمجة.',
                    image: '',
                },
                {
                    icon: 'HeadphonesIcon',
                    title: 'دعم فني 24/7',
                    description: 'فريق دعم متخصص متاح على مدار الساعة لمساعدتك في أي وقت تحتاجه.',
                    image: '',
                },
            ],
        },

        howItWorks: {
            isVisible: true,
            title: 'كيف يعمل',
            subtitle: 'ثلاث خطوات بسيطة للبدء في بناء مشروعك',
            steps: [
                {
                    number: '01',
                    title: 'سجّل حسابك',
                    description: 'أنشئ حسابك المجاني في أقل من دقيقة واحدة بدون بطاقة ائتمان.',
                },
                {
                    number: '02',
                    title: 'خصّص مشروعك',
                    description: 'اختر من قوالب جاهزة أو ابنِ مشروعك من الصفر باستخدام أدواتنا.',
                },
                {
                    number: '03',
                    title: 'أطلق للعالم',
                    description: 'انشر مشروعك بنقرة واحدة واحصل على رابط مخصص وشهادة SSL مجانية.',
                },
            ],
        },

        pricing: {
            isVisible: true,
            badge: 'الأسعار',
            title: 'خطط تناسب الجميع',
            subtitle: 'ابدأ مجاناً وقم بالترقية حسب نمو مشروعك. بدون رسوم خفية.',
            billingToggle: true,
            annualDiscount: 'وفّر 20%',
            plans: [
                {
                    name: 'المجانية',
                    description: 'مثالية للبدء واستكشاف المنصة',
                    monthlyPrice: 0,
                    annualPrice: 0,
                    currency: '$',
                    badge: '',
                    isFeatured: false,
                    ctaText: 'ابدأ مجاناً',
                    ctaHref: '#',
                    features: [
                        'مشروع واحد',
                        '1,000 زائر شهرياً',
                        'شهادة SSL مجانية',
                        'دعم عبر البريد الإلكتروني',
                    ],
                },
                {
                    name: 'الاحترافية',
                    description: 'للفرق المتنامية والمشاريع الجادة',
                    monthlyPrice: 29,
                    annualPrice: 23,
                    currency: '$',
                    badge: 'الأكثر شعبية',
                    isFeatured: true,
                    ctaText: 'ابدأ تجربة مجانية',
                    ctaHref: '#',
                    features: [
                        'مشاريع غير محدودة',
                        '100,000 زائر شهرياً',
                        'نطاق مخصص',
                        'تحليلات متقدمة',
                        'دعم فني سريع',
                        'تكاملات API',
                    ],
                },
                {
                    name: 'المؤسسات',
                    description: 'للشركات الكبيرة والاحتياجات المتقدمة',
                    monthlyPrice: 99,
                    annualPrice: 79,
                    currency: '$',
                    badge: '',
                    isFeatured: false,
                    ctaText: 'تواصل معنا',
                    ctaHref: '#contact',
                    features: [
                        'كل مميزات الاحترافية',
                        'زوار غير محدودين',
                        'SLA مخصص',
                        'مدير حساب مخصص',
                        'تدريب الفريق',
                        'فواتير مخصصة',
                    ],
                },
            ],
        },

        testimonials: {
            isVisible: true,
            badge: 'آراء العملاء',
            title: 'ماذا يقول عملاؤنا',
            subtitle: 'آلاف الفرق تثق بنا لإدارة مشاريعها وتحقيق أهدافها.',
            items: [
                {
                    avatar: '',
                    name: 'أحمد محمد',
                    role: 'المدير التنفيذي',
                    company: 'شركة الابتكار التقني',
                    rating: 5,
                    quote: 'منصة رائعة ساعدتنا على إطلاق منتجنا في وقت قياسي. الأدوات متكاملة والدعم الفني ممتاز.',
                },
                {
                    avatar: '',
                    name: 'سارة العلي',
                    role: 'مديرة المنتج',
                    company: 'تقنية المستقبل',
                    rating: 5,
                    quote: 'أفضل منصة استخدمتها حتى الآن. واجهة سهلة الاستخدام وأدوات قوية تلبي جميع احتياجاتنا.',
                },
                {
                    avatar: '',
                    name: 'خالد الرشيدي',
                    role: 'مؤسس مشارك',
                    company: 'رؤية ديجيتال',
                    rating: 5,
                    quote: 'وفّرت علينا أشهر من العمل. التكامل مع الأدوات الخارجية سلس جداً والنتائج مبهرة.',
                },
                {
                    avatar: '',
                    name: 'نورة الحربي',
                    role: 'مطورة برمجيات',
                    company: 'بيانات ذكية',
                    rating: 5,
                    quote: 'الأداء ممتاز والسرعة رهيبة. أنصح بها لكل من يريد بناء مشروع احترافي بسرعة.',
                },
            ],
        },

        faq: {
            isVisible: true,
            title: 'الأسئلة الشائعة',
            subtitle: 'إجابات على أكثر الأسئلة شيوعاً حول منصتنا',
            items: [
                {
                    question: 'هل يمكنني تجربة المنصة مجاناً؟',
                    answer: 'نعم! نقدم خطة مجانية يمكنك استخدامها بدون أي رسوم أو بطاقة ائتمان. يمكنك الترقية في أي وقت.',
                },
                {
                    question: 'هل بياناتي آمنة؟',
                    answer: 'بالتأكيد. نستخدم تشفير SSL وتشفير البيانات المتقدم. بياناتك محمية بأعلى معايير الأمان.',
                },
                {
                    question: 'هل يمكنني استخدام نطاقي الخاص؟',
                    answer: 'نعم، في الخطة الاحترافية وما فوق يمكنك ربط نطاقك الخاص بسهولة مع شهادة SSL مجانية.',
                },
                {
                    question: 'كيف يمكنني التواصل مع فريق الدعم؟',
                    answer: 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الدردشة المباشرة. فريقنا متاح على مدار الساعة.',
                },
                {
                    question: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
                    answer: 'نعم، يمكنك إلغاء أو تغيير خطتك في أي وقت بدون أي رسوم إلغاء أو التزامات طويلة المدى.',
                },
            ],
        },

        ctaBanner: {
            isVisible: true,
            headline: 'مستعد لبدء رحلتك؟',
            subheadline: 'انضم إلى أكثر من 10,000 مستخدم يبنون مشاريعهم معنا اليوم.',
            buttonText: 'ابدأ الآن مجاناً',
            buttonHref: '#pricing',
            backgroundStyle: 'gradient',
        },

        contact: {
            isVisible: true,
            title: 'تواصل معنا',
            subtitle: 'نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك خلال 24 ساعة.',
            email: 'info@intilaq.com',
            phone: '+966 50 000 0000',
            showForm: true,
            formFields: [
                { label: 'الاسم الكامل', type: 'text', placeholder: 'أدخل اسمك الكامل', required: true },
                { label: 'البريد الإلكتروني', type: 'email', placeholder: 'example@email.com', required: true },
                { label: 'الرسالة', type: 'textarea', placeholder: 'اكتب رسالتك هنا...', required: true },
            ],
        },

        footer: {
            logo: 'إنطلاق',
            tagline: 'منصة متكاملة لإطلاق المشاريع الناشئة وتسريع نموها.',
            columns: [
                {
                    title: 'المنتج',
                    links: [
                        { label: 'المميزات', href: '#features' },
                        { label: 'الأسعار', href: '#pricing' },
                        { label: 'التحديثات', href: '#' },
                    ],
                },
                {
                    title: 'الشركة',
                    links: [
                        { label: 'من نحن', href: '#' },
                        { label: 'المدونة', href: '#' },
                        { label: 'وظائف', href: '#' },
                    ],
                },
                {
                    title: 'الدعم',
                    links: [
                        { label: 'مركز المساعدة', href: '#' },
                        { label: 'تواصل معنا', href: '#contact' },
                        { label: 'الشروط والأحكام', href: '#' },
                    ],
                },
            ],
            socialLinks: [
                { platform: 'twitter', url: '#' },
                { platform: 'github', url: '#' },
                { platform: 'linkedin', url: '#' },
                { platform: 'instagram', url: '#' },
            ],
            bottomText: '© 2025 إنطلاق. جميع الحقوق محفوظة.',
            paymentIcons: true,
        },
    };
}

// Keep backward compatibility
export const DEFAULT_SITE_DATA = getDefaultSiteData('default');
