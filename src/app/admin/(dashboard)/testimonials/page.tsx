'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2, Star } from 'lucide-react';

export default function TestimonialsPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, badge: '', title: '', subtitle: '',
        items: [] as Array<{ avatar: string; name: string; role: string; company: string; rating: number; quote: string }>,
    });

    useEffect(() => {
        if (site?.testimonials) {
            setForm({
                isVisible: site.testimonials.isVisible ?? true,
                badge: site.testimonials.badge || '',
                title: site.testimonials.title || '',
                subtitle: site.testimonials.subtitle || '',
                items: site.testimonials.items || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('testimonials', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    const updateItem = (i: number, field: string, value: unknown) => {
        const items = [...form.items]; items[i] = { ...items[i], [field]: value }; setForm({ ...form, items });
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">آراء العملاء</h1>
                <button onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div><label className="admin-label">الشارة</label><input className="admin-input" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} /></div>
                <div><label className="admin-label">العنوان</label><input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="admin-label">العنوان الفرعي</label><textarea className="admin-input admin-textarea" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>

                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الشهادات</label>
                        <button onClick={() => setForm({ ...form, items: [...form.items, { avatar: '', name: '', role: '', company: '', rating: 5, quote: '' }] })} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة</button>
                    </div>
                    <div className="space-y-4">
                        {form.items.map((item, i) => (
                            <div key={i} className="admin-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">{item.name || `شهادة ${i + 1}`}</span>
                                    <button onClick={() => setForm({ ...form, items: form.items.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={14} /></button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="admin-label">الاسم</label><input className="admin-input" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)} /></div>
                                    <div><label className="admin-label">المنصب</label><input className="admin-input" value={item.role} onChange={e => updateItem(i, 'role', e.target.value)} /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="admin-label">الشركة</label><input className="admin-input" value={item.company} onChange={e => updateItem(i, 'company', e.target.value)} /></div>
                                    <div><label className="admin-label">رابط الصورة</label><input className="admin-input" value={item.avatar} onChange={e => updateItem(i, 'avatar', e.target.value)} /></div>
                                </div>
                                <div>
                                    <label className="admin-label">التقييم</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button key={n} onClick={() => updateItem(i, 'rating', n)}>
                                                <Star size={20} className={n <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div><label className="admin-label">الاقتباس</label><textarea className="admin-input admin-textarea" value={item.quote} onChange={e => updateItem(i, 'quote', e.target.value)} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'testimonials'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'testimonials' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
