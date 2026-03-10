'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function FooterEditorPage() {
    const { site, saveSection, savingSection } = useSite();
    const [form, setForm] = useState({
        logo: '', tagline: '', bottomText: '', paymentIcons: false,
        columns: [] as Array<{ title: string; links: Array<{ label: string; href: string }> }>,
        socialLinks: [] as Array<{ platform: string; url: string }>,
    });

    useEffect(() => {
        if (site?.footer) {
            setForm({
                logo: site.footer.logo || '',
                tagline: site.footer.tagline || '',
                bottomText: site.footer.bottomText || '',
                paymentIcons: site.footer.paymentIcons ?? false,
                columns: site.footer.columns || [],
                socialLinks: site.footer.socialLinks || [],
            });
        }
    }, [site]);

    const handleSave = () => saveSection('footer', form);
    useEffect(() => { const h = () => handleSave(); window.addEventListener('admin-save', h); return () => window.removeEventListener('admin-save', h); });

    const addColumn = () => {
        setForm({ ...form, columns: [...form.columns, { title: '', links: [] }] });
    };

    const updateColumnTitle = (i: number, title: string) => {
        const cols = [...form.columns]; cols[i] = { ...cols[i], title }; setForm({ ...form, columns: cols });
    };

    const addColumnLink = (colIndex: number) => {
        const cols = [...form.columns];
        cols[colIndex] = { ...cols[colIndex], links: [...cols[colIndex].links, { label: '', href: '#' }] };
        setForm({ ...form, columns: cols });
    };

    const updateColumnLink = (colIndex: number, linkIndex: number, field: string, value: string) => {
        const cols = [...form.columns];
        const links = [...cols[colIndex].links];
        links[linkIndex] = { ...links[linkIndex], [field]: value };
        cols[colIndex] = { ...cols[colIndex], links };
        setForm({ ...form, columns: cols });
    };

    const removeColumnLink = (colIndex: number, linkIndex: number) => {
        const cols = [...form.columns];
        cols[colIndex] = { ...cols[colIndex], links: cols[colIndex].links.filter((_, j) => j !== linkIndex) };
        setForm({ ...form, columns: cols });
    };

    const updateSocial = (i: number, field: string, value: string) => {
        const sl = [...form.socialLinks]; sl[i] = { ...sl[i], [field]: value }; setForm({ ...form, socialLinks: sl });
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">التذييل</h1>

            <div className="space-y-5">
                <div><label className="admin-label">الشعار</label><input className="admin-input" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} /></div>
                <div><label className="admin-label">الوصف</label><textarea className="admin-input admin-textarea" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} /></div>
                <div><label className="admin-label">نص الحقوق</label><input className="admin-input" value={form.bottomText} onChange={e => setForm({ ...form, bottomText: e.target.value })} /></div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.paymentIcons} onChange={e => setForm({ ...form, paymentIcons: e.target.checked })} />
                    إظهار أيقونات الدفع
                </label>

                {/* Columns */}
                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">الأعمدة</label>
                        <button onClick={addColumn} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة عمود</button>
                    </div>
                    <div className="space-y-4">
                        {form.columns.map((col, i) => (
                            <div key={i} className="admin-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <input className="admin-input w-48" placeholder="عنوان العمود" value={col.title} onChange={e => updateColumnTitle(i, e.target.value)} />
                                    <button onClick={() => setForm({ ...form, columns: form.columns.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={14} /></button>
                                </div>
                                <div className="space-y-2">
                                    {col.links.map((link, j) => (
                                        <div key={j} className="flex items-center gap-2">
                                            <input className="admin-input flex-1" placeholder="العنوان" value={link.label} onChange={e => updateColumnLink(i, j, 'label', e.target.value)} />
                                            <input className="admin-input flex-1" placeholder="الرابط" value={link.href} onChange={e => updateColumnLink(i, j, 'href', e.target.value)} />
                                            <button onClick={() => removeColumnLink(i, j)} className="text-red-400"><Trash2 size={14} /></button>
                                        </div>
                                    ))}
                                    <button onClick={() => addColumnLink(i)} className="text-xs text-indigo-400"><Plus size={12} /> إضافة رابط</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="admin-label mb-0">روابط التواصل الاجتماعي</label>
                        <button onClick={() => setForm({ ...form, socialLinks: [...form.socialLinks, { platform: 'twitter', url: '' }] })} className="flex items-center gap-1 text-xs text-indigo-400"><Plus size={14} /> إضافة</button>
                    </div>
                    <div className="space-y-3">
                        {form.socialLinks.map((link, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <select className="admin-input w-40" value={link.platform} onChange={e => updateSocial(i, 'platform', e.target.value)}>
                                    <option value="twitter">Twitter</option>
                                    <option value="github">GitHub</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="instagram">Instagram</option>
                                </select>
                                <input className="admin-input flex-1" placeholder="الرابط" value={link.url} onChange={e => updateSocial(i, 'url', e.target.value)} />
                                <button onClick={() => setForm({ ...form, socialLinks: form.socialLinks.filter((_, j) => j !== i) })} className="text-red-400"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'footer'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'footer' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
