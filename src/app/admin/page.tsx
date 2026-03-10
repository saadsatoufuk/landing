'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Globe, Plus, ArrowRight } from 'lucide-react';

interface SiteItem {
    _id: string;
    subdomain: string;
    global?: { siteName?: string };
    isPublished: boolean;
}

export default function AdminLoginPage() {
    const [step, setStep] = useState<'select' | 'login'>('select');
    const [sites, setSites] = useState<SiteItem[]>([]);
    const [selectedSite, setSelectedSite] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingSites, setLoadingSites] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [newSubdomain, setNewSubdomain] = useState('');
    const [newSiteName, setNewSiteName] = useState('');
    const [creating, setCreating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = async () => {
        setLoadingSites(true);
        try {
            const res = await fetch('/api/admin/sites');
            if (res.ok) {
                const data = await res.json();
                setSites(data);
            }
        } catch (err) {
            console.error('Error fetching sites:', err);
        }
        setLoadingSites(false);
    };

    const handleSelectSite = (subdomain: string) => {
        setSelectedSite(subdomain);
        setStep('login');
        setError('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, siteId: selectedSite }),
            });

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                const data = await res.json();
                setError(data.error || 'خطأ في تسجيل الدخول');
            }
        } catch {
            setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
        }
        setLoading(false);
    };

    const handleCreateSite = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setError('');

        try {
            const res = await fetch('/api/admin/sites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subdomain: newSubdomain.toLowerCase(), siteName: newSiteName }),
            });

            if (res.ok) {
                setNewSubdomain('');
                setNewSiteName('');
                setShowCreate(false);
                await fetchSites();
            } else {
                const data = await res.json();
                setError(data.error || 'حدث خطأ في إنشاء الموقع');
            }
        } catch {
            setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
        }
        setCreating(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6" dir="rtl">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                        {step === 'select' ? (
                            <Globe size={28} className="text-indigo-400" />
                        ) : (
                            <Lock size={28} className="text-indigo-400" />
                        )}
                    </div>
                    <h1 className="text-2xl font-bold mb-2">
                        {step === 'select' ? 'اختر الموقع' : 'تسجيل الدخول'}
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm">
                        {step === 'select'
                            ? 'اختر الموقع الذي تريد إدارته'
                            : `إدارة موقع: ${selectedSite}`
                        }
                    </p>
                </div>

                {step === 'select' ? (
                    <div className="space-y-3">
                        {loadingSites ? (
                            <div className="text-center py-8">
                                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                <p className="text-xs text-[var(--text-muted)]">جارٍ التحميل...</p>
                            </div>
                        ) : (
                            <>
                                {sites.map((site) => (
                                    <button
                                        key={site._id}
                                        onClick={() => handleSelectSite(site.subdomain)}
                                        className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all text-right"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                                                style={{ backgroundColor: '#6366F1' }}>
                                                {(site.global?.siteName || site.subdomain)?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{site.global?.siteName || site.subdomain}</div>
                                                <div className="text-xs text-[var(--text-muted)]">/{site.subdomain}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${site.isPublished ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                                                {site.isPublished ? 'منشور' : 'مسودة'}
                                            </span>
                                            <ArrowRight size={16} className="text-[var(--text-muted)]" />
                                        </div>
                                    </button>
                                ))}

                                {sites.length === 0 && !showCreate && (
                                    <p className="text-center text-sm text-[var(--text-muted)] py-4">لا توجد مواقع بعد</p>
                                )}

                                {!showCreate ? (
                                    <button
                                        onClick={() => setShowCreate(true)}
                                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-[var(--border-color)] text-sm text-[var(--text-muted)] hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                                    >
                                        <Plus size={16} />
                                        إنشاء موقع جديد
                                    </button>
                                ) : (
                                    <form onSubmit={handleCreateSite} className="p-4 rounded-xl border border-[var(--border-color)] bg-white/[0.02] space-y-3">
                                        <div>
                                            <label className="text-xs text-[var(--text-muted)] mb-1 block">اسم الموقع</label>
                                            <input
                                                className="admin-input"
                                                value={newSiteName}
                                                onChange={(e) => setNewSiteName(e.target.value)}
                                                placeholder="موقعي الجديد"
                                                autoFocus
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[var(--text-muted)] mb-1 block">الرابط (بالإنجليزية)</label>
                                            <input
                                                className="admin-input"
                                                value={newSubdomain}
                                                onChange={(e) => setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                placeholder="my-site"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={creating || !newSubdomain}
                                                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40"
                                                style={{ backgroundColor: '#6366F1' }}
                                            >
                                                {creating ? 'جارٍ الإنشاء...' : 'إنشاء'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setShowCreate(false); setError(''); }}
                                                className="px-4 py-2.5 rounded-xl text-sm text-[var(--text-muted)] hover:bg-white/5 transition-colors"
                                            >
                                                إلغاء
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}

                        {error && (
                            <p className="text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="كلمة المرور"
                                className="admin-input pl-10"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full py-3 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
                            style={{ backgroundColor: '#6366F1' }}
                        >
                            {loading ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setStep('select'); setError(''); setPassword(''); }}
                            className="w-full py-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                        >
                            ← اختيار موقع آخر
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
