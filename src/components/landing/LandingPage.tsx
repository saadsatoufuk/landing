'use client';

import { ISite } from '@/lib/models/Site';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import LogosBar from '@/components/landing/LogosBar';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import Faq from '@/components/landing/Faq';
import CtaBanner from '@/components/landing/CtaBanner';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

interface LandingPageProps {
    site: ISite;
}

const sectionComponents: Record<string, React.FC<{ data: unknown; subdomain?: string }>> = {
    hero: ({ data }) => <Hero data={data as LandingPageProps['site']['hero']} />,
    logosBar: ({ data }) => <LogosBar data={data as LandingPageProps['site']['logosBar']} />,
    features: ({ data }) => <Features data={data as LandingPageProps['site']['features']} />,
    howItWorks: ({ data }) => <HowItWorks data={data as LandingPageProps['site']['howItWorks']} />,
    pricing: ({ data }) => <Pricing data={data as LandingPageProps['site']['pricing']} />,
    testimonials: ({ data }) => <Testimonials data={data as LandingPageProps['site']['testimonials']} />,
    faq: ({ data }) => <Faq data={data as LandingPageProps['site']['faq']} />,
    ctaBanner: ({ data }) => <CtaBanner data={data as LandingPageProps['site']['ctaBanner']} />,
    contact: ({ data, subdomain }) => <Contact data={data as LandingPageProps['site']['contact']} subdomain={subdomain} />,
};

export default function LandingPage({ site }: LandingPageProps) {
    const sectionOrder = site.sectionOrder || [
        'hero', 'logosBar', 'features', 'howItWorks',
        'pricing', 'testimonials', 'faq', 'ctaBanner', 'contact'
    ];

    return (
        <main>
            <Navbar data={site.navbar} />

            {sectionOrder.map((sectionKey) => {
                const Component = sectionComponents[sectionKey];
                const data = (site as unknown as Record<string, unknown>)[sectionKey];
                if (!Component || !data) return null;
                return <Component key={sectionKey} data={data} subdomain={site.subdomain} />;
            })}

            <Footer data={site.footer} />
        </main>
    );
}
