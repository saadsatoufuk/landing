import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';

export async function POST(request: Request) {
    try {
        const { password, siteId } = await request.json();

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
        }

        if (!siteId) {
            return NextResponse.json({ error: 'يرجى اختيار الموقع' }, { status: 400 });
        }

        // Verify the site exists
        await dbConnect();
        const site = await Site.findOne({ subdomain: siteId });
        if (!site) {
            return NextResponse.json({ error: 'الموقع غير موجود' }, { status: 404 });
        }

        const token = await createToken(siteId);
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return NextResponse.json({ success: true, siteId });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
