import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import ContactSubmission from '@/lib/models/ContactSubmission';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { siteSubdomain, fields } = await request.json();

        const site = await Site.findOne({ subdomain: siteSubdomain || 'default' });
        if (!site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        const submission = await ContactSubmission.create({
            siteId: site._id,
            fields,
        });

        return NextResponse.json({ success: true, id: submission._id });
    } catch (error) {
        console.error('Contact submission error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
