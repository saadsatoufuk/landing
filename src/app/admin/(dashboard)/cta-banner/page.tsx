'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save } from 'lucide-react';

export default function CtaBannerPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, headline: '', subheadline: '', buttonText: '', buttonHref: '', backgroundStyle: 'gradient',
    });

    useEffect(() => {
        if (site?.ctaBanner) {
            setForm({
                isVisible: site.ctaBanner.isVisible ?? true,
                headline: site.ctaBanner.headline || '',
                subheadline: site.ctaBanner.subheadline || '',
                buttonText: site.ctaBanner.buttonText || '',
                buttonHref: site.ctaBanner.buttonHref || '',
                backgroundStyle: site.ctaBanner.backgroundStyle || 'gradient',
            });
        }
    }, [site]);

    const handleSave = () => saveSection('ctaBanner', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">شعار الدعوة (CTA Banner)</h1>
                <button onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div><label className="admin-label">العنوان</label><input className="admin-input" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} /></div>
                <div><label className="admin-label">العنوان الفرعي</label><textarea className="admin-input admin-textarea" value={form.subheadline} onChange={e => setForm({ ...form, subheadline: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                    <div><label className="admin-label">نص الزر</label><input className="admin-input" value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} /></div>
                    <div><label className="admin-label">رابط الزر</label><input className="admin-input" value={form.buttonHref} onChange={e => setForm({ ...form, buttonHref: e.target.value })} /></div>
                </div>
                <div>
                    <label className="admin-label mb-2">نمط الخلفية</label>
                    <div className="flex gap-3">
                        {[{ v: 'gradient', l: 'تدرج' }, { v: 'solid', l: 'صلب' }].map(o => (
                            <button key={o.v} onClick={() => setForm({ ...form, backgroundStyle: o.v })}
                                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${form.backgroundStyle === o.v ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                                {o.l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'ctaBanner'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'ctaBanner' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
