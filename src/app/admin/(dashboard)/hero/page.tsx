'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function HeroPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        badge: '', headline: '', headlineHighlight: '', subheadline: '',
        ctaPrimaryText: '', ctaPrimaryHref: '', ctaSecondaryText: '', ctaSecondaryHref: '',
        image: '', imageAlt: '',
        stats: [] as Array<{ value: string; label: string }>,
    });

    useEffect(() => {
        if (site?.hero) {
            setForm({
                badge: site.hero.badge || '',
                headline: site.hero.headline || '',
                headlineHighlight: site.hero.headlineHighlight || '',
                subheadline: site.hero.subheadline || '',
                ctaPrimaryText: site.hero.ctaPrimaryText || '',
                ctaPrimaryHref: site.hero.ctaPrimaryHref || '',
                ctaSecondaryText: site.hero.ctaSecondaryText || '',
                ctaSecondaryHref: site.hero.ctaSecondaryHref || '',
                image: site.hero.image || '',
                imageAlt: site.hero.imageAlt || '',
                stats: site.hero.stats || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('hero', form);

    useEffect(() => {
        const handler = () => handleSave();
        window.addEventListener('admin-save', handler);
        return () => window.removeEventListener('admin-save', handler);
    });

    const updateStat = (i: number, field: string, value: string) => {
        const newStats = [...form.stats];
        newStats[i] = { ...newStats[i], [field]: value };
        setForm({ ...form, stats: newStats });
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">القسم الرئيسي (Hero)</h1>

            <div className="space-y-5">
                <div>
                    <label className="admin-label">شارة (Badge)</label>
                    <input className="admin-input" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="✦ النسخة التجريبية متاحة الآن" />
                    <p className="text-xs text-[var(--text-muted)] mt-1">اتركه فارغاً لإخفائه</p>
                </div>

                <div>
                    <label className="admin-label">العنوان الرئيسي</label>
                    <input className="admin-input" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} />
                </div>

                <div>
                    <label className="admin-label">النص المميز (يظهر بلون مختلف)</label>
                    <input className="admin-input" value={form.headlineHighlight} onChange={e => setForm({ ...form, headlineHighlight: e.target.value })} />
                </div>

                <div>
                    <label className="admin-label">العنوان الفرعي</label>
                    <textarea className="admin-input admin-textarea" value={form.subheadline} onChange={e => setForm({ ...form, subheadline: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="admin-label">نص الزر الرئيسي</label>
                        <input className="admin-input" value={form.ctaPrimaryText} onChange={e => setForm({ ...form, ctaPrimaryText: e.target.value })} />
                    </div>
                    <div>
                        <label className="admin-label">رابط الزر الرئيسي</label>
                        <input className="admin-input" value={form.ctaPrimaryHref} onChange={e => setForm({ ...form, ctaPrimaryHref: e.target.value })} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="admin-label">نص الزر الثانوي</label>
                        <input className="admin-input" value={form.ctaSecondaryText} onChange={e => setForm({ ...form, ctaSecondaryText: e.target.value })} placeholder="اتركه فارغاً للإخفاء" />
                    </div>
                    <div>
                        <label className="admin-label">رابط الزر الثانوي</label>
                        <input className="admin-input" value={form.ctaSecondaryHref} onChange={e => setForm({ ...form, ctaSecondaryHref: e.target.value })} />
                    </div>
                </div>

                <div>
                    <label className="admin-label">رابط صورة البطل</label>
                    <input className="admin-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>

                <div>
                    <label className="admin-label">النص البديل للصورة</label>
                    <input className="admin-input" value={form.imageAlt} onChange={e => setForm({ ...form, imageAlt: e.target.value })} />
                </div>

                {/* Stats */}
                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الإحصائيات</label>
                        <button onClick={() => setForm({ ...form, stats: [...form.stats, { value: '', label: '' }] })} className="flex items-center gap-1 text-xs text-indigo-400">
                            <Plus size={14} /> إضافة
                        </button>
                    </div>
                    <div className="space-y-3">
                        {form.stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <input className="admin-input flex-1" placeholder="10,000+" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} />
                                <input className="admin-input flex-1" placeholder="مستخدم نشط" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} />
                                <button onClick={() => setForm({ ...form, stats: form.stats.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'hero'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'hero' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
