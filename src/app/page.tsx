import dbConnect from '@/lib/db';
import Site from '@/lib/models/Site';
import Link from 'next/link';

export const revalidate = 30;

export default async function HomePage() {
  await dbConnect();
  const sites = await Site.find({ isPublished: true })
    .select('subdomain global.siteName global.primaryColor')
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6" dir="rtl">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 gradient-text">المواقع المتاحة</h1>
          <p className="text-[var(--text-muted)]">اختر الموقع الذي تريد زيارته</p>
        </div>

        {sites.length === 0 ? (
          <div className="text-center">
            <p className="text-[var(--text-muted)] mb-4">لا توجد مواقع منشورة حالياً</p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#6366F1' }}
            >
              إنشاء موقع جديد ←
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sites.map((site) => {
              const s = JSON.parse(JSON.stringify(site));
              return (
                <Link
                  key={s._id}
                  href={`/site/${s.subdomain}`}
                  className="group block p-5 rounded-2xl border border-[var(--border-color)] bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: s.global?.primaryColor || '#6366F1' }}
                    >
                      {(s.global?.siteName || s.subdomain)?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-semibold group-hover:text-indigo-400 transition-colors">
                        {s.global?.siteName || s.subdomain}
                      </h2>
                      <p className="text-xs text-[var(--text-muted)]">/{s.subdomain}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/admin"
            className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
          >
            لوحة التحكم ←
          </Link>
        </div>
      </div>
    </div>
  );
}
