'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function PricingPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, badge: '', title: '', subtitle: '',
        billingToggle: true, annualDiscount: '',
        plans: [] as Array<{ name: string; description: string; monthlyPrice: number; annualPrice: number; currency: string; badge: string; isFeatured: boolean; ctaText: string; ctaHref: string; features: string[] }>,
    });

    useEffect(() => {
        if (site?.pricing) {
            setForm({
                isVisible: site.pricing.isVisible ?? true,
                badge: site.pricing.badge || '',
                title: site.pricing.title || '',
                subtitle: site.pricing.subtitle || '',
                billingToggle: site.pricing.billingToggle ?? true,
                annualDiscount: site.pricing.annualDiscount || '',
                plans: site.pricing.plans || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('pricing', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    const updatePlan = (i: number, field: string, value: unknown) => {
        const p = [...form.plans];
        p[i] = { ...p[i], [field]: value };
        setForm({ ...form, plans: p });
    };

    const addPlan = () => {
        setForm({ ...form, plans: [...form.plans, { name: '', description: '', monthlyPrice: 0, annualPrice: 0, currency: '$', badge: '', isFeatured: false, ctaText: 'ابدأ الآن', ctaHref: '#', features: [] }] });
    };

    const addFeature = (planIndex: number) => {
        const p = [...form.plans];
        p[planIndex] = { ...p[planIndex], features: [...p[planIndex].features, ''] };
        setForm({ ...form, plans: p });
    };

    const updateFeature = (planIndex: number, featIndex: number, value: string) => {
        const p = [...form.plans];
        const f = [...p[planIndex].features];
        f[featIndex] = value;
        p[planIndex] = { ...p[planIndex], features: f };
        setForm({ ...form, plans: p });
    };

    const removeFeature = (planIndex: number, featIndex: number) => {
        const p = [...form.plans];
        p[planIndex] = { ...p[planIndex], features: p[planIndex].features.filter((_, j) => j !== featIndex) };
        setForm({ ...form, plans: p });
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">الأسعار</h1>
                <button onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div><label className="admin-label">الشارة</label><input className="admin-input" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} /></div>
                <div><label className="admin-label">العنوان</label><input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="admin-label">العنوان الفرعي</label><textarea className="admin-input admin-textarea" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={form.billingToggle} onChange={e => setForm({ ...form, billingToggle: e.target.checked })} />
                        إظهار زر التبديل شهري/سنوي
                    </label>
                    {form.billingToggle && (
                        <input className="admin-input w-40" placeholder="وفّر 20%" value={form.annualDiscount} onChange={e => setForm({ ...form, annualDiscount: e.target.value })} />
                    )}
                </div>

                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الخطط</label>
                        <button onClick={addPlan} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة خطة</button>
                    </div>
                    <div className="space-y-6">
                        {form.plans.map((plan, i) => (
                            <div key={i} className="admin-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">{plan.name || `خطة ${i + 1}`}</span>
                                    <div className="flex items-center gap-2">
                                        <label className="flex items-center gap-1 text-xs text-[var(--text-muted)] cursor-pointer">
                                            <input type="checkbox" checked={plan.isFeatured} onChange={e => updatePlan(i, 'isFeatured', e.target.checked)} />
                                            مميزة
                                        </label>
                                        <button onClick={() => setForm({ ...form, plans: form.plans.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="admin-label">اسم الخطة</label><input className="admin-input" value={plan.name} onChange={e => updatePlan(i, 'name', e.target.value)} /></div>
                                    <div><label className="admin-label">الشارة</label><input className="admin-input" placeholder="الأكثر شعبية" value={plan.badge} onChange={e => updatePlan(i, 'badge', e.target.value)} /></div>
                                </div>
                                <div><label className="admin-label">الوصف</label><input className="admin-input" value={plan.description} onChange={e => updatePlan(i, 'description', e.target.value)} /></div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div><label className="admin-label">السعر الشهري</label><input type="number" className="admin-input" value={plan.monthlyPrice} onChange={e => updatePlan(i, 'monthlyPrice', Number(e.target.value))} /></div>
                                    <div><label className="admin-label">السعر السنوي</label><input type="number" className="admin-input" value={plan.annualPrice} onChange={e => updatePlan(i, 'annualPrice', Number(e.target.value))} /></div>
                                    <div><label className="admin-label">العملة</label><input className="admin-input" value={plan.currency} onChange={e => updatePlan(i, 'currency', e.target.value)} /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="admin-label">نص الزر</label><input className="admin-input" value={plan.ctaText} onChange={e => updatePlan(i, 'ctaText', e.target.value)} /></div>
                                    <div><label className="admin-label">رابط الزر</label><input className="admin-input" value={plan.ctaHref} onChange={e => updatePlan(i, 'ctaHref', e.target.value)} /></div>
                                </div>
                                {/* Features */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="admin-label mb-0">المميزات</label>
                                        <button onClick={() => addFeature(i)} className="text-xs text-indigo-400"><Plus size={12} /></button>
                                    </div>
                                    <div className="space-y-2">
                                        {plan.features.map((f, j) => (
                                            <div key={j} className="flex items-center gap-2">
                                                <input className="admin-input flex-1" value={f} onChange={e => updateFeature(i, j, e.target.value)} />
                                                <button onClick={() => removeFeature(i, j)} className="text-red-400"><Trash2 size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'pricing'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'pricing' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
