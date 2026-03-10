'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function FeaturesPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, badge: '', title: '', subtitle: '', layout: 'grid',
        items: [] as Array<{ icon: string; title: string; description: string; image: string }>,
    });

    useEffect(() => {
        if (site?.features) {
            setForm({
                isVisible: site.features.isVisible ?? true,
                badge: site.features.badge || '',
                title: site.features.title || '',
                subtitle: site.features.subtitle || '',
                layout: site.features.layout || 'grid',
                items: site.features.items || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('features', form);

    useEffect(() => {
        const handler = () => handleSave();
        window.addEventListener('admin-save', handler);
        return () => window.removeEventListener('admin-save', handler);
    });

    const updateItem = (i: number, field: string, value: string) => {
        const newItems = [...form.items];
        newItems[i] = { ...newItems[i], [field]: value };
        setForm({ ...form, items: newItems });
    };

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { icon: 'Zap', title: '', description: '', image: '' }] });
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">المميزات</h1>
                <button
                    onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}
                >
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="admin-label">الشارة</label>
                    <input className="admin-input" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} />
                </div>
                <div>
                    <label className="admin-label">العنوان</label>
                    <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                    <label className="admin-label">العنوان الفرعي</label>
                    <textarea className="admin-input admin-textarea" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
                </div>

                {/* Layout selector */}
                <div>
                    <label className="admin-label mb-2">التخطيط</label>
                    <div className="flex gap-3">
                        {[{ v: 'grid', l: 'شبكة' }, { v: 'list', l: 'قائمة' }, { v: 'alternating', l: 'متناوب' }].map(o => (
                            <button key={o.v} onClick={() => setForm({ ...form, layout: o.v })}
                                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${form.layout === o.v ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                                {o.l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Items */}
                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">العناصر</label>
                        <button onClick={addItem} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة ميزة</button>
                    </div>
                    <div className="space-y-4">
                        {form.items.map((item, i) => (
                            <div key={i} className="admin-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--text-muted)]">ميزة {i + 1}</span>
                                    <button onClick={() => setForm({ ...form, items: form.items.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={14} /></button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="admin-label">اسم الأيقونة (Lucide)</label>
                                        <input className="admin-input" placeholder="Zap, Shield, Globe..." value={item.icon} onChange={e => updateItem(i, 'icon', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="admin-label">العنوان</label>
                                        <input className="admin-input" value={item.title} onChange={e => updateItem(i, 'title', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="admin-label">الوصف</label>
                                    <textarea className="admin-input admin-textarea" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} />
                                </div>
                                <div>
                                    <label className="admin-label">رابط الصورة (اختياري)</label>
                                    <input className="admin-input" value={item.image} onChange={e => updateItem(i, 'image', e.target.value)} placeholder="https://..." />
                                </div>
                            </div>
                        ))}
                        {form.items.length === 0 && (
                            <div className="text-center py-8 text-sm text-[var(--text-muted)] border border-dashed border-white/10 rounded-xl">
                                لا توجد مميزات. اضغط &quot;إضافة ميزة&quot; لإضافة أول ميزة.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'features'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'features' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
