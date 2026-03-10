import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import ContactSubmission from '@/lib/models/ContactSubmission';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
    try {
        const auth = await isAuthenticated();
        if (!auth.authenticated || !auth.siteId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Find the site to get its ObjectId for filtering contacts
        const site = await Site.findOne({ subdomain: auth.siteId });
        if (!site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        const submissions = await ContactSubmission.find({ siteId: site._id })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
