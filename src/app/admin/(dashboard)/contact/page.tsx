'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function ContactEditorPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        isVisible: true, title: '', subtitle: '', email: '', phone: '', showForm: true,
        formFields: [] as Array<{ label: string; type: string; placeholder: string; required: boolean }>,
    });

    useEffect(() => {
        if (site?.contact) {
            setForm({
                isVisible: site.contact.isVisible ?? true,
                title: site.contact.title || '',
                subtitle: site.contact.subtitle || '',
                email: site.contact.email || '',
                phone: site.contact.phone || '',
                showForm: site.contact.showForm ?? true,
                formFields: site.contact.formFields || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('contact', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    const updateField = (i: number, key: string, value: unknown) => {
        const fields = [...form.formFields]; fields[i] = { ...fields[i], [key]: value }; setForm({ ...form, formFields: fields });
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">التواصل</h1>
                <button onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
                    className={`px-3 py-1.5 rounded-lg text-xs border ${form.isVisible ? 'border-green-500/30 text-green-400' : 'border-white/10 text-[var(--text-muted)]'}`}>
                    {form.isVisible ? 'مرئي ✓' : 'مخفي'}
                </button>
            </div>

            <div className="space-y-5">
                <div><label className="admin-label">العنوان</label><input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="admin-label">العنوان الفرعي</label><textarea className="admin-input admin-textarea" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                    <div><label className="admin-label">البريد الإلكتروني</label><input className="admin-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                    <div><label className="admin-label">رقم الهاتف</label><input className="admin-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.showForm} onChange={e => setForm({ ...form, showForm: e.target.checked })} />
                    إظهار نموذج التواصل
                </label>

                {form.showForm && (
                    <div className="border-t border-[var(--border-color)] pt-5">
                        <div className="flex items-center justify-between mb-3">
                            <label className="admin-label mb-0">حقول النموذج</label>
                            <button onClick={() => setForm({ ...form, formFields: [...form.formFields, { label: '', type: 'text', placeholder: '', required: false }] })} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة حقل</button>
                        </div>
                        <div className="space-y-3">
                            {form.formFields.map((field, i) => (
                                <div key={i} className="admin-card space-y-2">
                                    <div className="grid grid-cols-3 gap-2">
                                        <input className="admin-input" placeholder="العنوان" value={field.label} onChange={e => updateField(i, 'label', e.target.value)} />
                                        <select className="admin-input" value={field.type} onChange={e => updateField(i, 'type', e.target.value)}>
                                            <option value="text">نص</option>
                                            <option value="email">بريد إلكتروني</option>
                                            <option value="textarea">نص طويل</option>
                                        </select>
                                        <input className="admin-input" placeholder="النص التوضيحي" value={field.placeholder} onChange={e => updateField(i, 'placeholder', e.target.value)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-xs text-[var(--text-muted)] cursor-pointer">
                                            <input type="checkbox" checked={field.required} onChange={e => updateField(i, 'required', e.target.checked)} />
                                            مطلوب
                                        </label>
                                        <button onClick={() => setForm({ ...form, formFields: form.formFields.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'contact'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'contact' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
