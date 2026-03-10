'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save } from 'lucide-react';

export default function SettingsPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        siteName: '',
        favicon: '',
        seo: { title: '', description: '', ogImage: '' },
    });

    useEffect(() => {
        if (site?.global) {
            setForm({
                siteName: site.global.siteName || '',
                favicon: site.global.favicon || '',
                seo: {
                    title: site.global.seo?.title || '',
                    description: site.global.seo?.description || '',
                    ogImage: site.global.seo?.ogImage || '',
                },
            });
        }
    }, [site]);

    const handleSave = () => {
        saveSection('global', { ...site?.global, ...form });
    };

    useEffect(() => {
        const handler = () => handleSave();
        window.addEventListener('admin-save', handler);
        return () => window.removeEventListener('admin-save', handler);
    });

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">إعدادات الموقع</h1>

            <div className="space-y-5">
                <div>
                    <label className="admin-label">اسم الموقع</label>
                    <input className="admin-input" value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })} />
                </div>

                <div>
                    <label className="admin-label">أيقونة الموقع (Favicon URL)</label>
                    <input className="admin-input" value={form.favicon} onChange={e => setForm({ ...form, favicon: e.target.value })} placeholder="https://..." />
                </div>

                <div className="border-t border-[var(--border-color)] pt-5 mt-6">
                    <h2 className="text-lg font-semibold mb-4">تحسين محركات البحث (SEO)</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="admin-label">عنوان الصفحة</label>
                            <input className="admin-input" value={form.seo.title} onChange={e => setForm({ ...form, seo: { ...form.seo, title: e.target.value } })} />
                        </div>
                        <div>
                            <label className="admin-label">وصف الصفحة</label>
                            <textarea className="admin-input admin-textarea" value={form.seo.description} onChange={e => setForm({ ...form, seo: { ...form.seo, description: e.target.value } })} />
                        </div>
                        <div>
                            <label className="admin-label">صورة المشاركة (OG Image URL)</label>
                            <input className="admin-input" value={form.seo.ogImage} onChange={e => setForm({ ...form, seo: { ...form.seo, ogImage: e.target.value } })} placeholder="https://..." />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'global'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'global' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
