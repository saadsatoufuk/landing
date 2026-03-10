'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Settings, Palette, Navigation, Rocket,
    Image, Zap, ListOrdered, CreditCard, MessageSquareQuote,
    HelpCircle, Megaphone, Mail, FootprintsIcon, Eye, Power,
    LogOut, Menu, X, ChevronLeft
} from 'lucide-react';
import { ISite } from '@/lib/models/Site';

interface SiteContextType {
    site: ISite | null;
    setSite: (site: ISite | null) => void;
    loading: boolean;
    savingSection: string | null;
    saveSection: (section: string, data: unknown) => Promise<void>;
    refreshSite: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function useSite() {
    const ctx = useContext(SiteContext);
    if (!ctx) throw new Error('useSite must be used within SiteProvider');
    return ctx;
}

const sidebarItems = [
    { label: 'لوحة التحكم', href: '/admin/dashboard', icon: LayoutDashboard },
    { type: 'divider' as const },
    { label: 'إعدادات الموقع', href: '/admin/settings', icon: Settings },
    { label: 'التصميم والألوان', href: '/admin/design', icon: Palette },
    { type: 'divider' as const },
    { label: 'شريط التنقل', href: '/admin/navbar', icon: Navigation },
    { label: 'القسم الرئيسي', href: '/admin/hero', icon: Rocket },
    { label: 'شريط الشعارات', href: '/admin/logos', icon: Image },
    { label: 'المميزات', href: '/admin/features', icon: Zap },
    { label: 'كيف يعمل', href: '/admin/how-it-works', icon: ListOrdered },
    { label: 'الأسعار', href: '/admin/pricing', icon: CreditCard },
    { label: 'آراء العملاء', href: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'الأسئلة الشائعة', href: '/admin/faq', icon: HelpCircle },
    { label: 'شعار الدعوة', href: '/admin/cta-banner', icon: Megaphone },
    { label: 'التواصل', href: '/admin/contact', icon: Mail },
    { label: 'التذييل', href: '/admin/footer', icon: FootprintsIcon },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [site, setSite] = useState<ISite | null>(null);
    const [loading, setLoading] = useState(true);
    const [savingSection, setSavingSection] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const fetchSite = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/site');
            if (res.status === 401) {
                router.push('/admin');
                return;
            }
            const data = await res.json();
            setSite(data);
        } catch (err) {
            console.error('Fetch error:', err);
        }
        setLoading(false);
    }, [router]);

    useEffect(() => {
        fetchSite();
    }, [fetchSite]);

    const saveSection = useCallback(async (section: string, data: unknown) => {
        setSavingSection(section);
        try {
            const res = await fetch('/api/admin/site', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, data }),
            });
            if (res.ok) {
                const updated = await res.json();
                setSite(updated);
            }
        } catch (err) {
            console.error('Save error:', err);
        }
        setSavingSection(null);
    }, []);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin');
    };

    const handlePublishToggle = async () => {
        const res = await fetch('/api/admin/publish', { method: 'POST' });
        if (res.ok) {
            const { isPublished } = await res.json();
            setSite(prev => prev ? { ...prev, isPublished } as ISite : null);
        }
    };

    // Listen for Cmd+S
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                // Dispatch custom event for section editors to listen to
                window.dispatchEvent(new CustomEvent('admin-save'));
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center" dir="rtl">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-[var(--text-muted)]">جارٍ التحميل...</p>
                </div>
            </div>
        );
    }

    return (
        <SiteContext.Provider value={{ site, setSite, loading, savingSection, saveSection, refreshSite: fetchSite }}>
            <div className="min-h-screen bg-[#0A0A0A] flex" dir="rtl">
                {/* Sidebar */}
                <aside className={`fixed md:static inset-y-0 right-0 z-50 w-64 bg-[#0d0d0d] border-l border-[var(--border-color)] flex flex-col transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                    }`}>
                    {/* Logo */}
                    <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between">
                        <div>
                            <span className="text-lg font-bold gradient-text">لوحة التحكم</span>
                            {site?.subdomain && (
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">/{site.subdomain}</p>
                            )}
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-[var(--text-muted)]">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 overflow-y-auto py-3 px-3">
                        {sidebarItems.map((item, i) => {
                            if ('type' in item && item.type === 'divider') {
                                return <div key={i} className="my-2 border-t border-[var(--border-color)]" />;
                            }
                            if (!('href' in item)) return null;
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400'
                                        : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom actions */}
                    <div className="p-3 border-t border-[var(--border-color)] space-y-1.5">
                        <Link
                            href={site?.subdomain ? `/site/${site.subdomain}` : '/'}
                            target="_blank"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <Eye size={18} />
                            معاينة الموقع
                        </Link>
                        <button
                            onClick={handlePublishToggle}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${site?.isPublished
                                ? 'text-green-400 hover:bg-green-400/10'
                                : 'text-yellow-400 hover:bg-yellow-400/10'
                                }`}
                        >
                            <Power size={18} />
                            {site?.isPublished ? 'منشور ✓' : 'غير منشور — انشر'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                            <LogOut size={18} />
                            تسجيل الخروج
                        </button>
                    </div>
                </aside>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main content */}
                <div className="flex-1 min-h-screen flex flex-col">
                    {/* Top bar */}
                    <header className="h-14 border-b border-[var(--border-color)] flex items-center justify-between px-5">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[var(--text-muted)]">
                            <Menu size={22} />
                        </button>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                            <ChevronLeft size={14} />
                            {sidebarItems.find(item => 'href' in item && item.href === pathname)?.label || 'لوحة التحكم'}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                            {site?.updatedAt && `آخر تحديث: ${new Date(site.updatedAt).toLocaleString('ar-SA')}`}
                        </div>
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
        </SiteContext.Provider>
    );
}
