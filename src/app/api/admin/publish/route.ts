import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import { isAuthenticated } from '@/lib/auth';

export async function POST() {
    try {
        const auth = await isAuthenticated();
        if (!auth.authenticated || !auth.siteId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const site = await Site.findOne({ subdomain: auth.siteId });

        if (!site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        site.isPublished = !site.isPublished;
        await site.save();

        return NextResponse.json({ isPublished: site.isPublished });
    } catch (error) {
        console.error('Error toggling publish:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
