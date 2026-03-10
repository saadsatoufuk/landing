import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ subdomain: string }> }
) {
    try {
        await dbConnect();
        const { subdomain } = await params;
        const site = await Site.findOne({ subdomain }).lean();

        if (!site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        return NextResponse.json(site);
    } catch (error) {
        console.error('Error fetching site:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
