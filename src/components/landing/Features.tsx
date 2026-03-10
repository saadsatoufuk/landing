'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeaturesProps {
    data: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
        layout: string;
        items: Array<{
            icon: string;
            title: string;
            description: string;
            image: string;
        }>;
    };
}

function getIcon(name: string): LucideIcon {
    const icons = LucideIcons as Record<string, LucideIcon>;
    return icons[name] || LucideIcons.Sparkles;
}

export default function Features({ data }: FeaturesProps) {
    if (!data.isVisible) return null;

    return (
        <section id="features" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    {data.badge && (
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 mb-4"
                            style={{ color: 'var(--color-primary)' }}>
                            {data.badge}
                        </span>
                    )}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h2>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">{data.subtitle}</p>
                </motion.div>

                {/* Grid Layout */}
                {data.layout === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.items.map((item, i) => {
                            const Icon = getIcon(item.icon);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className="glass glass-hover rounded-2xl p-6 md:p-8 group cursor-default"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                        style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
                                        <Icon size={24} style={{ color: 'var(--color-primary)' }} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* List Layout */}
                {data.layout === 'list' && (
                    <div className="space-y-8">
                        {data.items.map((item, i) => {
                            const Icon = getIcon(item.icon);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex flex-col md:flex-row gap-6 items-start glass rounded-2xl p-6 md:p-8"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
                                                <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                                            </div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                        </div>
                                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                    {item.image && (
                                        <div className="md:w-1/3 rounded-xl overflow-hidden border border-white/10">
                                            <img src={item.image} alt={item.title} className="w-full" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Alternating Layout */}
                {data.layout === 'alternating' && (
                    <div className="space-y-20">
                        {data.items.map((item, i) => {
                            const Icon = getIcon(item.icon);
                            const isReversed = i % 2 !== 0;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
                                >
                                    <div className="flex-1">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                            style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
                                            <Icon size={24} style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                        <p className="text-[var(--text-muted)] text-base leading-relaxed">{item.description}</p>
                                    </div>
                                    {item.image && (
                                        <div className="flex-1 rounded-2xl overflow-hidden border border-white/10"
                                            style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
                                            <img src={item.image} alt={item.title} className="w-full" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
