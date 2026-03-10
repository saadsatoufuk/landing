'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function LogosPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, label: '',
        logos: [] as Array<{ name: string; image: string }>,
    });

    useEffect(() => {
        if (site?.logosBar) {
            setForm({
                isVisible: site.logosBar.isVisible ?? true,
                label: site.logosBar.label || '',
                logos: site.logosBar.logos || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('logosBar', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    const updateLogo = (i: number, field: string, value: string) => {
        const logos = [...form.logos]; logos[i] = { ...logos[i], [field]: value }; setForm({ ...form, logos });
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">شريط الشعارات</h1>
                <button onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div><label className="admin-label">النص</label><input className="admin-input" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} /></div>

                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الشعارات</label>
                        <button onClick={() => setForm({ ...form, logos: [...form.logos, { name: '', image: '' }] })} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة شعار</button>
                    </div>
                    <div className="space-y-3">
                        {form.logos.map((logo, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <input className="admin-input flex-1" placeholder="الاسم" value={logo.name} onChange={e => updateLogo(i, 'name', e.target.value)} />
                                <input className="admin-input flex-1" placeholder="رابط الصورة" value={logo.image} onChange={e => updateLogo(i, 'image', e.target.value)} />
                                <button onClick={() => setForm({ ...form, logos: form.logos.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'logosBar'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'logosBar' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
