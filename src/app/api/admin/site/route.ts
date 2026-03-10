import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
    try {
        const auth = await isAuthenticated();
        if (!auth.authenticated || !auth.siteId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const site = await Site.findOne({ subdomain: auth.siteId }).lean();

        if (!site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        return NextResponse.json(site);
    } catch (error) {
        console.error('Error fetching site:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const auth = await isAuthenticated();
        if (!auth.authenticated || !auth.siteId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { section, data } = await request.json();

        // Get current site before update (for undo)
        const currentSite = await Site.findOne({ subdomain: auth.siteId }).lean();
        if (!currentSite) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        // Store previous version for undo
        const updateData: Record<string, unknown> = {};

        if (section === 'sectionOrder') {
            updateData.sectionOrder = data;
        } else {
            updateData[section] = data;
        }

        // Save previous version of just the section being changed
        updateData.previousVersion = {
            section,
            data: (currentSite as unknown as Record<string, unknown>)[section]
        };
        updateData.updatedAt = new Date();

        const site = await Site.findOneAndUpdate(
            { subdomain: auth.siteId },
            { $set: updateData },
            { new: true }
        ).lean();

        return NextResponse.json(site);
    } catch (error) {
        console.error('Error updating site:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
