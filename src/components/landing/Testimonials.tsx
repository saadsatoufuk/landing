'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialsProps {
    data: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
        items: Array<{
            avatar: string;
            name: string;
            role: string;
            company: string;
            rating: number;
            quote: string;
        }>;
    };
}

export default function Testimonials({ data }: TestimonialsProps) {
    if (!data.isVisible || data.items.length === 0) return null;

    return (
        <section id="testimonials" className="py-20 md:py-28 bg-[var(--bg-surface)]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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

                {/* Testimonials Grid */}
                <div className={`grid gap-6 ${data.items.length <= 4
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                    {data.items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="glass rounded-2xl p-6 md:p-8"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star
                                        key={j}
                                        size={16}
                                        className={j < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                                &quot;{item.quote}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                {item.avatar ? (
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                        style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.2)', color: 'var(--color-primary)' }}>
                                        {item.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-medium">{item.name}</div>
                                    <div className="text-xs text-[var(--text-muted)]">
                                        {item.role}{item.company ? ` — ${item.company}` : ''}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
