'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FaqProps {
    data: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
}

export default function Faq({ data }: FaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!data.isVisible || data.items.length === 0) return null;

    return (
        <section id="faq" className="py-20 md:py-28">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h2>
                    <p className="text-[var(--text-muted)] text-lg">{data.subtitle}</p>
                </motion.div>

                {/* Accordion */}
                <div className="space-y-3">
                    {data.items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="border border-white/8 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right hover:bg-white/3 transition-colors"
                            >
                                <span className="font-medium text-sm md:text-base">{item.question}</span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    {openIndex === i ? (
                                        <Minus size={18} style={{ color: 'var(--color-primary)' }} />
                                    ) : (
                                        <Plus size={18} className="text-[var(--text-muted)]" />
                                    )}
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-sm text-[var(--text-muted)] leading-relaxed border-t border-white/5 pt-4">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
