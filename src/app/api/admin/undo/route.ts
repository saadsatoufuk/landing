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

        if (!site.previousVersion) {
            return NextResponse.json({ error: 'No previous version to undo' }, { status: 400 });
        }

        const prev = site.previousVersion as { section: string; data: unknown };
        const updateData: Record<string, unknown> = {};
        updateData[prev.section] = prev.data;
        updateData.previousVersion = null;

        const updated = await Site.findOneAndUpdate(
            { subdomain: auth.siteId },
            { $set: updateData },
            { new: true }
        ).lean();

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error undoing:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
