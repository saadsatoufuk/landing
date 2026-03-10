'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';

export default function NavbarPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        logo: '', logoType: 'text',
        links: [] as Array<{ label: string; href: string; isButton: boolean }>,
        ctaText: '', ctaHref: '',
    });

    useEffect(() => {
        if (site?.navbar) {
            setForm({
                logo: site.navbar.logo || '',
                logoType: site.navbar.logoType || 'text',
                links: site.navbar.links || [],
                ctaText: site.navbar.ctaText || '',
                ctaHref: site.navbar.ctaHref || '',
            });
        }
    }, [site]);

    const updateLink = (index: number, field: string, value: string | boolean) => {
        const newLinks = [...form.links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setForm({ ...form, links: newLinks });
    };

    const addLink = () => {
        setForm({ ...form, links: [...form.links, { label: '', href: '#', isButton: false }] });
    };

    const removeLink = (index: number) => {
        setForm({ ...form, links: form.links.filter((_, i) => i !== index) });
    };

    const handleSave = () => saveSection('navbar', form);

    useEffect(() => {
        const handler = () => handleSave();
        window.addEventListener('admin-save', handler);
        return () => window.removeEventListener('admin-save', handler);
    });

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">شريط التنقل</h1>

            <div className="space-y-5">
                {/* Logo Type */}
                <div>
                    <label className="admin-label mb-2">نوع الشعار</label>
                    <div className="flex gap-3">
                        {['text', 'image'].map(type => (
                            <button
                                key={type}
                                onClick={() => setForm({ ...form, logoType: type })}
                                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${form.logoType === type ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/10 text-[var(--text-muted)]'
                                    }`}
                            >
                                {type === 'text' ? 'نص' : 'صورة'}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="admin-label">{form.logoType === 'text' ? 'نص الشعار' : 'رابط صورة الشعار'}</label>
                    <input className="admin-input" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} />
                </div>

                {/* Links */}
                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الروابط</label>
                        <button onClick={addLink} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                            <Plus size={14} /> إضافة رابط
                        </button>
                    </div>

                    <div className="space-y-3">
                        {form.links.map((link, i) => (
                            <div key={i} className="admin-card flex items-start gap-3">
                                <GripVertical size={16} className="mt-3 text-[var(--text-muted)] cursor-grab" />
                                <div className="flex-1 space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <input className="admin-input" placeholder="العنوان" value={link.label} onChange={e => updateLink(i, 'label', e.target.value)} />
                                        <input className="admin-input" placeholder="#section" value={link.href} onChange={e => updateLink(i, 'href', e.target.value)} />
                                    </div>
                                    <label className="flex items-center gap-2 text-xs text-[var(--text-muted)] cursor-pointer">
                                        <input type="checkbox" checked={link.isButton} onChange={e => updateLink(i, 'isButton', e.target.checked)} className="rounded" />
                                        عرض كزر
                                    </label>
                                </div>
                                <button onClick={() => removeLink(i)} className="mt-3 text-red-400 hover:text-red-300">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {form.links.length === 0 && (
                            <div className="text-center py-8 text-sm text-[var(--text-muted)] border border-dashed border-white/10 rounded-xl">
                                لا توجد روابط. اضغط &quot;إضافة رابط&quot; لإضافة أول رابط.
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="border-t border-[var(--border-color)] pt-5">
                    <h3 className="text-sm font-semibold mb-3">زر الدعوة (CTA)</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="admin-label">نص الزر</label>
                            <input className="admin-input" value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} />
                        </div>
                        <div>
                            <label className="admin-label">الرابط</label>
                            <input className="admin-input" value={form.ctaHref} onChange={e => setForm({ ...form, ctaHref: e.target.value })} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'navbar'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'navbar' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
