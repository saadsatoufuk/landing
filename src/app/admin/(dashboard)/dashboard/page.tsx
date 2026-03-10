'use client';

import { useSite } from '../layout';
import { Eye, Clock, Globe, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { site, saveSection } = useSite();

    if (!site) return null;

    const sections = [
        { key: 'logosBar', label: 'شريط الشعارات', visible: site.logosBar?.isVisible },
        { key: 'features', label: 'المميزات', visible: site.features?.isVisible },
        { key: 'howItWorks', label: 'كيف يعمل', visible: site.howItWorks?.isVisible },
        { key: 'pricing', label: 'الأسعار', visible: site.pricing?.isVisible },
        { key: 'testimonials', label: 'آراء العملاء', visible: site.testimonials?.isVisible },
        { key: 'faq', label: 'الأسئلة الشائعة', visible: site.faq?.isVisible },
        { key: 'ctaBanner', label: 'شعار الدعوة', visible: site.ctaBanner?.isVisible },
        { key: 'contact', label: 'التواصل', visible: site.contact?.isVisible },
    ];

    const toggleSection = async (sectionKey: string, currentData: Record<string, unknown>) => {
        await saveSection(sectionKey, {
            ...currentData,
            isVisible: !currentData.isVisible,
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="admin-card flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500/10">
                        <Globe size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <div className="text-xs text-[var(--text-muted)]">حالة النشر</div>
                        <div className={`text-sm font-medium ${site.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                            {site.isPublished ? 'منشور' : 'غير منشور'}
                        </div>
                    </div>
                </div>

                <div className="admin-card flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500/10">
                        <Clock size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <div className="text-xs text-[var(--text-muted)]">آخر تحديث</div>
                        <div className="text-sm font-medium">
                            {site.updatedAt ? new Date(site.updatedAt).toLocaleString('ar-SA') : '—'}
                        </div>
                    </div>
                </div>

                <Link href={site?.subdomain ? `/site/${site.subdomain}` : '/'} target="_blank" className="admin-card flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500/10">
                        <Eye size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <div className="text-xs text-[var(--text-muted)]">معاينة</div>
                        <div className="text-sm font-medium text-indigo-400">زيارة الموقع ←</div>
                    </div>
                </Link>
            </div>

            {/* Section Toggles */}
            <h2 className="text-lg font-semibold mb-4">إظهار/إخفاء الأقسام</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {sections.map((sec) => {
                    const sectionData = (site as unknown as Record<string, Record<string, unknown>>)[sec.key];
                    return (
                        <div key={sec.key} className="admin-card flex items-center justify-between">
                            <span className="text-sm">{sec.label}</span>
                            <button
                                onClick={() => sectionData && toggleSection(sec.key, sectionData)}
                                className="transition-colors"
                            >
                                {sec.visible ? (
                                    <ToggleRight size={28} className="text-green-400" />
                                ) : (
                                    <ToggleLeft size={28} className="text-[var(--text-muted)]" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Preview */}
            <h2 className="text-lg font-semibold mb-4">معاينة مباشرة</h2>
            <div className="admin-card p-0 overflow-hidden rounded-2xl" style={{ height: '500px' }}>
                <iframe src={site?.subdomain ? `/site/${site.subdomain}` : '/'} className="w-full h-full border-0" title="Site Preview" />
            </div>
        </div>
    );
}
