import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function createToken(siteId: string): Promise<string> {
    return new SignJWT({ role: 'admin', siteId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ valid: boolean; siteId?: string }> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return { valid: true, siteId: payload.siteId as string | undefined };
    } catch {
        return { valid: false };
    }
}

export async function isAuthenticated(): Promise<{ authenticated: boolean; siteId?: string }> {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return { authenticated: false };
    const result = await verifyToken(token);
    return { authenticated: result.valid, siteId: result.siteId };
}

export function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '99, 102, 241';
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
