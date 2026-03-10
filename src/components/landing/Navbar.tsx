'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    data: {
        logo: string;
        logoType: string;
        links: Array<{ label: string; href: string; isButton: boolean }>;
        ctaText: string;
        ctaHref: string;
    };
}

export default function Navbar({ data }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a href="/" className="text-xl md:text-2xl font-bold tracking-tight">
                        {data.logoType === 'image' && data.logo ? (
                            <img src={data.logo} alt="Logo" className="h-8 md:h-10" />
                        ) : (
                            <span className="gradient-text">{data.logo}</span>
                        )}
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {data.links.map((link, i) =>
                            link.isButton ? null : (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            )
                        )}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {data.ctaText && (
                            <a
                                href={data.ctaHref}
                                className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                {data.ctaText}
                            </a>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden text-white p-2"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
                    >
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-5 left-5 text-white p-2"
                        >
                            <X size={28} />
                        </button>

                        {data.links.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="text-2xl font-medium text-white hover:text-[var(--color-primary)] transition-colors"
                            >
                                {link.label}
                            </motion.a>
                        ))}

                        {data.ctaText && (
                            <motion.a
                                href={data.ctaHref}
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: data.links.length * 0.08 }}
                                className="mt-4 px-8 py-3 rounded-full text-lg font-medium text-white"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                {data.ctaText}
                            </motion.a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
