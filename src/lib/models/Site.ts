import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISite extends Document {
    subdomain: string;
    isPublished: boolean;
    sectionOrder: string[];
    previousVersion?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;

    global: {
        siteName: string;
        favicon: string;
        primaryColor: string;
        fontHeading: string;
        fontBody: string;
        seo: {
            title: string;
            description: string;
            ogImage: string;
        };
    };

    navbar: {
        logo: string;
        logoType: string;
        links: Array<{
            label: string;
            href: string;
            isButton: boolean;
        }>;
        ctaText: string;
        ctaHref: string;
    };

    hero: {
        badge: string;
        headline: string;
        headlineHighlight: string;
        subheadline: string;
        ctaPrimaryText: string;
        ctaPrimaryHref: string;
        ctaSecondaryText: string;
        ctaSecondaryHref: string;
        image: string;
        imageAlt: string;
        stats: Array<{
            value: string;
            label: string;
        }>;
    };

    logosBar: {
        isVisible: boolean;
        label: string;
        logos: Array<{
            name: string;
            image: string;
        }>;
    };

    features: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
        layout: string;
        items: Array<{
            icon: string;
            title: string;
            description: string;
            image: string;
        }>;
    };

    howItWorks: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        steps: Array<{
            number: string;
            title: string;
            description: string;
        }>;
    };

    pricing: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
        billingToggle: boolean;
        annualDiscount: string;
        plans: Array<{
            name: string;
            description: string;
            monthlyPrice: number;
            annualPrice: number;
            currency: string;
            badge: string;
            isFeatured: boolean;
            ctaText: string;
            ctaHref: string;
            features: string[];
        }>;
    };

    testimonials: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
        items: Array<{
            avatar: string;
            name: string;
            role: string;
            company: string;
            rating: number;
            quote: string;
        }>;
    };

    faq: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };

    ctaBanner: {
        isVisible: boolean;
        headline: string;
        subheadline: string;
        buttonText: string;
        buttonHref: string;
        backgroundStyle: string;
    };

    contact: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        email: string;
        phone: string;
        showForm: boolean;
        formFields: Array<{
            label: string;
            type: string;
            placeholder: string;
            required: boolean;
        }>;
    };

    footer: {
        logo: string;
        tagline: string;
        columns: Array<{
            title: string;
            links: Array<{
                label: string;
                href: string;
            }>;
        }>;
        socialLinks: Array<{
            platform: string;
            url: string;
        }>;
        bottomText: string;
        paymentIcons: boolean;
    };
}

const LinkSchema = new Schema({
    label: { type: String, default: '' },
    href: { type: String, default: '' },
    isButton: { type: Boolean, default: false },
}, { _id: false });

const StatSchema = new Schema({
    value: { type: String, default: '' },
    label: { type: String, default: '' },
}, { _id: false });

const LogoSchema = new Schema({
    name: { type: String, default: '' },
    image: { type: String, default: '' },
}, { _id: false });

const FeatureItemSchema = new Schema({
    icon: { type: String, default: 'Zap' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
}, { _id: false });

const StepSchema = new Schema({
    number: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
}, { _id: false });

const PlanSchema = new Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    monthlyPrice: { type: Number, default: 0 },
    annualPrice: { type: Number, default: 0 },
    currency: { type: String, default: '$' },
    badge: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    ctaText: { type: String, default: '' },
    ctaHref: { type: String, default: '#' },
    features: [{ type: String }],
}, { _id: false });

const TestimonialSchema = new Schema({
    avatar: { type: String, default: '' },
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    quote: { type: String, default: '' },
}, { _id: false });

const FaqItemSchema = new Schema({
    question: { type: String, default: '' },
    answer: { type: String, default: '' },
}, { _id: false });

const FormFieldSchema = new Schema({
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
}, { _id: false });

const FooterLinkSchema = new Schema({
    label: { type: String, default: '' },
    href: { type: String, default: '#' },
}, { _id: false });

const FooterColumnSchema = new Schema({
    title: { type: String, default: '' },
    links: [FooterLinkSchema],
}, { _id: false });

const SocialLinkSchema = new Schema({
    platform: { type: String, default: '' },
    url: { type: String, default: '' },
}, { _id: false });

const SiteSchema = new Schema<ISite>({
    subdomain: { type: String, required: true, unique: true, index: true },
    isPublished: { type: Boolean, default: false },
    sectionOrder: { type: [String], default: ['hero', 'logosBar', 'features', 'howItWorks', 'pricing', 'testimonials', 'faq', 'ctaBanner', 'contact'] },
    previousVersion: { type: Schema.Types.Mixed, default: null },

    global: {
        siteName: { type: String, default: 'موقعي' },
        favicon: { type: String, default: '' },
        primaryColor: { type: String, default: '#6366F1' },
        fontHeading: { type: String, default: 'Sora' },
        fontBody: { type: String, default: 'Inter' },
        seo: {
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            ogImage: { type: String, default: '' },
        },
    },

    navbar: {
        logo: { type: String, default: 'إنطلاق' },
        logoType: { type: String, default: 'text' },
        links: { type: [LinkSchema], default: [] },
        ctaText: { type: String, default: 'ابدأ الآن' },
        ctaHref: { type: String, default: '#pricing' },
    },

    hero: {
        badge: { type: String, default: '✦ النسخة التجريبية متاحة الآن' },
        headline: { type: String, default: 'أطلق مشروعك الناشئ' },
        headlineHighlight: { type: String, default: 'أسرع من أي وقت مضى' },
        subheadline: { type: String, default: 'ابنِ، أطلق، ونمِّ مشروعك مع منصتنا المتكاملة. كل ما تحتاجه لتحويل فكرتك إلى منتج ناجح.' },
        ctaPrimaryText: { type: String, default: 'ابدأ مجاناً' },
        ctaPrimaryHref: { type: String, default: '#pricing' },
        ctaSecondaryText: { type: String, default: 'شاهد العرض التوضيحي' },
        ctaSecondaryHref: { type: String, default: '#features' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: 'لقطة شاشة المنتج' },
        stats: { type: [StatSchema], default: [] },
    },

    logosBar: {
        isVisible: { type: Boolean, default: true },
        label: { type: String, default: 'موثوق من قبل فرق العمل في' },
        logos: { type: [LogoSchema], default: [] },
    },

    features: {
        isVisible: { type: Boolean, default: true },
        badge: { type: String, default: 'المميزات' },
        title: { type: String, default: 'كل ما تحتاجه لبناء منتجك' },
        subtitle: { type: String, default: 'أدوات قوية ومتكاملة تساعدك على التركيز على ما يهم — بناء منتج رائع.' },
        layout: { type: String, default: 'grid' },
        items: { type: [FeatureItemSchema], default: [] },
    },

    howItWorks: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: 'كيف يعمل' },
        subtitle: { type: String, default: 'ثلاث خطوات بسيطة للبدء' },
        steps: { type: [StepSchema], default: [] },
    },

    pricing: {
        isVisible: { type: Boolean, default: true },
        badge: { type: String, default: 'الأسعار' },
        title: { type: String, default: 'خطط تناسب الجميع' },
        subtitle: { type: String, default: 'ابدأ مجاناً وقم بالترقية حسب احتياجاتك.' },
        billingToggle: { type: Boolean, default: true },
        annualDiscount: { type: String, default: 'وفّر 20%' },
        plans: { type: [PlanSchema], default: [] },
    },

    testimonials: {
        isVisible: { type: Boolean, default: true },
        badge: { type: String, default: 'آراء العملاء' },
        title: { type: String, default: 'ماذا يقول عملاؤنا' },
        subtitle: { type: String, default: 'آلاف الفرق تثق بنا لإدارة مشاريعها.' },
        items: { type: [TestimonialSchema], default: [] },
    },

    faq: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: 'الأسئلة الشائعة' },
        subtitle: { type: String, default: 'إجابات على أكثر الأسئلة شيوعاً' },
        items: { type: [FaqItemSchema], default: [] },
    },

    ctaBanner: {
        isVisible: { type: Boolean, default: true },
        headline: { type: String, default: 'مستعد لبدء رحلتك؟' },
        subheadline: { type: String, default: 'انضم إلى آلاف المستخدمين الذين يبنون مشاريعهم معنا.' },
        buttonText: { type: String, default: 'ابدأ الآن مجاناً' },
        buttonHref: { type: String, default: '#pricing' },
        backgroundStyle: { type: String, default: 'gradient' },
    },

    contact: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: 'تواصل معنا' },
        subtitle: { type: String, default: 'نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت.' },
        email: { type: String, default: 'info@example.com' },
        phone: { type: String, default: '+966 50 000 0000' },
        showForm: { type: Boolean, default: true },
        formFields: { type: [FormFieldSchema], default: [] },
    },

    footer: {
        logo: { type: String, default: 'إنطلاق' },
        tagline: { type: String, default: 'منصة متكاملة لإطلاق المشاريع الناشئة' },
        columns: { type: [FooterColumnSchema], default: [] },
        socialLinks: { type: [SocialLinkSchema], default: [] },
        bottomText: { type: String, default: '© 2025 إنطلاق. جميع الحقوق محفوظة.' },
        paymentIcons: { type: Boolean, default: false },
    },
}, { timestamps: true });

const Site: Model<ISite> = mongoose.models.Site || mongoose.model<ISite>('Site', SiteSchema);

export default Site;
