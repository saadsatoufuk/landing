import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import { isAuthenticated } from '@/lib/auth';
import { getDefaultSiteData } from '@/lib/defaultSiteData';

export async function GET() {
    try {
        const auth = await isAuthenticated();
        if (!auth.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const sites = await Site.find({})
            .select('subdomain global.siteName isPublished updatedAt createdAt')
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(sites);
    } catch (error) {
        console.error('Error fetching sites:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const auth = await isAuthenticated();
        if (!auth.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { subdomain, siteName } = await request.json();

        if (!subdomain || !subdomain.trim()) {
            return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
        }

        // Validate subdomain format (alphanumeric and hyphens only)
        const subdomainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
        if (subdomain.length < 2 || !subdomainRegex.test(subdomain)) {
            return NextResponse.json({
                error: 'الرابط يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط (حرفين على الأقل)'
            }, { status: 400 });
        }

        // Check for duplicates
        const existing = await Site.findOne({ subdomain });
        if (existing) {
            return NextResponse.json({ error: 'هذا الرابط مستخدم بالفعل' }, { status: 409 });
        }

        const siteData = getDefaultSiteData(subdomain);
        if (siteName) {
            siteData.global.siteName = siteName;
            siteData.navbar.logo = siteName;
            siteData.footer.logo = siteName;
        }

        const site = await Site.create(siteData);

        return NextResponse.json({
            _id: site._id,
            subdomain: site.subdomain,
            global: { siteName: site.global.siteName },
            isPublished: site.isPublished
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating site:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
