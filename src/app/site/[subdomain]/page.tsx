import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import LandingPage from '@/components/landing/LandingPage';
import { hexToRgb } from '@/lib/auth';
import { notFound } from 'next/navigation';

export const revalidate = 30;

export async function generateStaticParams() {
    try {
        await dbConnect();
        const sites = await Site.find({ isPublished: true }).select('subdomain').lean();
        return sites.map((site) => ({ subdomain: site.subdomain }));
    } catch {
        return [];
    }
}

export default async function SitePage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params;

    await dbConnect();
    const siteDoc = await Site.findOne({ subdomain, isPublished: true }).lean();

    if (!siteDoc) {
        notFound();
    }

    const site = JSON.parse(JSON.stringify(siteDoc));

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
          :root {
            --color-primary: ${site.global?.primaryColor || '#6366F1'};
            --color-primary-rgb: ${hexToRgb(site.global?.primaryColor || '#6366F1')};
            --font-heading: '${site.global?.fontHeading || 'Sora'}', sans-serif;
            --font-body: '${site.global?.fontBody || 'Inter'}', sans-serif;
          }
          body { font-family: var(--font-body); }
          h1, h2, h3 { font-family: var(--font-heading); }
        `
            }} />
            <LandingPage site={site} />
        </>
    );
}
