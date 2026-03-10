'use client';

import { motion } from 'framer-motion';

interface HowItWorksProps {
    data: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        steps: Array<{
            number: string;
            title: string;
            description: string;
        }>;
    };
}

export default function HowItWorks({ data }: HowItWorksProps) {
    if (!data.isVisible || data.steps.length === 0) return null;

    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-[var(--bg-surface)]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h2>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">{data.subtitle}</p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
                    {/* Connection line (desktop) */}
                    <div className="hidden md:block absolute top-16 right-[16%] left-[16%] h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />

                    {data.steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="relative text-center"
                        >
                            {/* Step Number */}
                            <div className="relative z-10 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-xl font-bold border-2"
                                style={{
                                    borderColor: 'var(--color-primary)',
                                    backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                                    color: 'var(--color-primary)',
                                    boxShadow: '0 0 20px rgba(var(--color-primary-rgb), 0.2)',
                                }}>
                                {step.number}
                            </div>

                            {/* Mobile connector */}
                            {i < data.steps.length - 1 && (
                                <div className="md:hidden absolute left-1/2 top-16 bottom-[-2rem] w-px bg-white/10 -translate-x-1/2" />
                            )}

                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
