'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function HowItWorksPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, title: '', subtitle: '',
        steps: [] as Array<{ number: string; title: string; description: string }>,
    });

    useEffect(() => {
        if (site?.howItWorks) {
            setForm({
                isVisible: site.howItWorks.isVisible ?? true,
                title: site.howItWorks.title || '',
                subtitle: site.howItWorks.subtitle || '',
                steps: site.howItWorks.steps || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('howItWorks', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    const updateStep = (i: number, field: string, value: string) => {
        const steps = [...form.steps]; steps[i] = { ...steps[i], [field]: value }; setForm({ ...form, steps });
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">كيف يعمل</h1>
                <button onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div><label className="admin-label">العنوان</label><input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="admin-label">العنوان الفرعي</label><textarea className="admin-input admin-textarea" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>

                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الخطوات</label>
                        <button onClick={() => setForm({ ...form, steps: [...form.steps, { number: String(form.steps.length + 1).padStart(2, '0'), title: '', description: '' }] })} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة خطوة</button>
                    </div>
                    <div className="space-y-4">
                        {form.steps.map((step, i) => (
                            <div key={i} className="admin-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--text-muted)]">خطوة {i + 1}</span>
                                    <button onClick={() => setForm({ ...form, steps: form.steps.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={14} /></button>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    <div><label className="admin-label">الرقم</label><input className="admin-input" value={step.number} onChange={e => updateStep(i, 'number', e.target.value)} /></div>
                                    <div className="col-span-3"><label className="admin-label">العنوان</label><input className="admin-input" value={step.title} onChange={e => updateStep(i, 'title', e.target.value)} /></div>
                                </div>
                                <div><label className="admin-label">الوصف</label><textarea className="admin-input admin-textarea" value={step.description} onChange={e => updateStep(i, 'description', e.target.value)} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'howItWorks'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'howItWorks' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
