'use client';

import { motion } from 'framer-motion';

interface CtaBannerProps {
    data: {
        isVisible: boolean;
        headline: string;
        subheadline: string;
        buttonText: string;
        buttonHref: string;
        backgroundStyle: string;
    };
}

export default function CtaBanner({ data }: CtaBannerProps) {
    if (!data.isVisible) return null;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
                    style={{
                        background: data.backgroundStyle === 'gradient'
                            ? `linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2) 0%, rgba(var(--color-primary-rgb), 0.05) 50%, transparent 100%)`
                            : 'var(--bg-surface)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20"
                        style={{ backgroundColor: 'var(--color-primary)' }} />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.headline}</h2>
                        <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto mb-8">{data.subheadline}</p>
                        <a
                            href={data.buttonHref}
                            className="inline-block px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-105"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                boxShadow: '0 0 30px rgba(var(--color-primary-rgb), 0.3)',
                            }}
                        >
                            {data.buttonText}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
