'use client';

import { motion } from 'framer-motion';

interface HeroProps {
    data: {
        badge: string;
        headline: string;
        headlineHighlight: string;
        subheadline: string;
        ctaPrimaryText: string;
        ctaPrimaryHref: string;
        ctaSecondaryText: string;
        ctaSecondaryHref: string;
        image: string;
        imageAlt: string;
        stats: Array<{ value: string; label: string }>;
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 hero-gradient noise-overlay overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                {data.badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/5"
                            style={{ boxShadow: '0 0 20px rgba(var(--color-primary-rgb), 0.15)' }}>
                            {data.badge}
                        </span>
                    </motion.div>
                )}

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    {data.headline}{' '}
                    <span className="gradient-text">{data.headlineHighlight}</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {data.subheadline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
                >
                    <a
                        href={data.ctaPrimaryHref}
                        className="px-8 py-3.5 rounded-full text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            boxShadow: '0 0 30px rgba(var(--color-primary-rgb), 0.3)',
                        }}
                    >
                        {data.ctaPrimaryText}
                    </a>
                    {data.ctaSecondaryText && (
                        <a
                            href={data.ctaSecondaryHref}
                            className="px-8 py-3.5 rounded-full text-base font-medium text-white border border-white/15 hover:bg-white/5 transition-all"
                        >
                            {data.ctaSecondaryText}
                        </a>
                    )}
                </motion.div>

                {/* Stats */}
                {data.stats.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center justify-center gap-8 sm:gap-12 mb-16"
                    >
                        {data.stats.map((stat, i) => (
                            <div key={i} className="text-center relative">
                                {i > 0 && (
                                    <div className="absolute right-[-1rem] sm:right-[-1.5rem] top-1/2 -translate-y-1/2 w-px h-10 bg-white/10" />
                                )}
                                <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Hero Image */}
                {data.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative max-w-4xl mx-auto"
                    >
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[var(--bg-surface)]"
                            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(var(--color-primary-rgb), 0.1)' }}>
                            {/* Browser mockup */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-xs text-[var(--text-muted)] bg-white/5 px-4 py-1 rounded-md">
                                        intilaq.app
                                    </span>
                                </div>
                            </div>
                            <img
                                src={data.image}
                                alt={data.imageAlt}
                                className="w-full"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
