'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../layout';
import { Save } from 'lucide-react';

const colorPresets = [
    '#6366F1', '#8B5CF6', '#EC4899', '#EF4444',
    '#F59E0B', '#10B981', '#06B6D4', '#3B82F6',
    '#14B8A6', '#F97316', '#A855F7', '#D946EF',
];

const headingFonts = ['Sora', 'Inter', 'Playfair Display', 'Cairo', 'Tajawal', 'Almarai'];
const bodyFonts = ['Inter', 'DM Sans', 'Manrope', 'Cairo'];

export default function DesignPage() {
    const { site, saveSection, savingSection } = useSite();
    const [primaryColor, setPrimaryColor] = useState('#6366F1');
    const [fontHeading, setFontHeading] = useState('Sora');
    const [fontBody, setFontBody] = useState('Inter');

    useEffect(() => {
        if (site?.global) {
            setPrimaryColor(site.global.primaryColor || '#6366F1');
            setFontHeading(site.global.fontHeading || 'Sora');
            setFontBody(site.global.fontBody || 'Inter');
        }
    }, [site]);

    const handleSave = () => {
        saveSection('global', { ...site?.global, primaryColor, fontHeading, fontBody });
    };

    useEffect(() => {
        const handler = () => handleSave();
        window.addEventListener('admin-save', handler);
        return () => window.removeEventListener('admin-save', handler);
    });

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">التصميم والألوان</h1>

            {/* Primary Color */}
            <div className="mb-8">
                <label className="admin-label mb-3">اللون الرئيسي</label>
                <div className="grid grid-cols-6 gap-3 mb-4">
                    {colorPresets.map(color => (
                        <button
                            key={color}
                            onClick={() => setPrimaryColor(color)}
                            className={`w-full aspect-square rounded-xl border-2 transition-all ${primaryColor === color ? 'border-white scale-110' : 'border-transparent'
                                }`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={primaryColor}
                        onChange={e => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                    />
                    <input
                        className="admin-input flex-1"
                        value={primaryColor}
                        onChange={e => setPrimaryColor(e.target.value)}
                        placeholder="#6366F1"
                    />
                </div>
                {/* Preview */}
                <div className="mt-4 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: primaryColor }} />
                        <button className="px-4 py-2 rounded-lg text-sm text-white" style={{ backgroundColor: primaryColor }}>
                            معاينة الزر
                        </button>
                        <span className="text-sm" style={{ color: primaryColor }}>نص باللون الرئيسي</span>
                    </div>
                </div>
            </div>

            {/* Heading Font */}
            <div className="mb-6">
                <label className="admin-label mb-3">خط العناوين</label>
                <div className="grid grid-cols-2 gap-3">
                    {headingFonts.map(font => (
                        <button
                            key={font}
                            onClick={() => setFontHeading(font)}
                            className={`p-4 rounded-xl border text-right transition-all ${fontHeading === font
                                    ? 'border-indigo-500 bg-indigo-500/10'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <span className="text-lg font-bold" style={{ fontFamily: font }}>{font}</span>
                            <p className="text-xs text-[var(--text-muted)] mt-1" style={{ fontFamily: font }}>مثال على الخط</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Body Font */}
            <div className="mb-6">
                <label className="admin-label mb-3">خط النص</label>
                <div className="grid grid-cols-2 gap-3">
                    {bodyFonts.map(font => (
                        <button
                            key={font}
                            onClick={() => setFontBody(font)}
                            className={`p-4 rounded-xl border text-right transition-all ${fontBody === font
                                    ? 'border-indigo-500 bg-indigo-500/10'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <span className="text-base" style={{ fontFamily: font }}>{font}</span>
                            <p className="text-xs text-[var(--text-muted)] mt-1" style={{ fontFamily: font }}>هذا مثال على نص باستخدام هذا الخط</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 py-4 bg-[#0A0A0A] border-t border-[var(--border-color)]">
                <button onClick={handleSave} disabled={savingSection === 'global'} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#6366F1' }}>
                    <Save size={16} />
                    {savingSection === 'global' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>
        </div>
    );
}
