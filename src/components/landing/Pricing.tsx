'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingProps {
    data: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
        billingToggle: boolean;
        annualDiscount: string;
        plans: Array<{
            name: string;
            description: string;
            monthlyPrice: number;
            annualPrice: number;
            currency: string;
            badge: string;
            isFeatured: boolean;
            ctaText: string;
            ctaHref: string;
            features: string[];
        }>;
    };
}

export default function Pricing({ data }: PricingProps) {
    const [isAnnual, setIsAnnual] = useState(false);

    if (!data.isVisible) return null;

    return (
        <section id="pricing" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
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

                {/* Billing Toggle */}
                {data.billingToggle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-12"
                    >
                        <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[var(--text-muted)]'}`}>شهري</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? '' : 'bg-[var(--border-color)]'
                                }`}
                            style={isAnnual ? { backgroundColor: 'var(--color-primary)' } : {}}
                        >
                            <span
                                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${isAnnual ? 'right-1' : 'right-8'
                                    }`}
                            />
                        </button>
                        <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                            سنوي
                        </span>
                        {data.annualDiscount && isAnnual && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                                style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.15)', color: 'var(--color-primary)' }}>
                                {data.annualDiscount}
                            </span>
                        )}
                    </motion.div>
                )}

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {data.plans.map((plan, i) => {
                        const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`relative rounded-2xl p-6 md:p-8 border ${plan.isFeatured
                                        ? 'border-[var(--color-primary)]/50 scale-105'
                                        : 'border-white/10'
                                    }`}
                                style={{
                                    background: plan.isFeatured
                                        ? 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.08), transparent)'
                                        : 'rgba(255,255,255,0.02)',
                                    ...(plan.isFeatured ? { boxShadow: '0 0 40px rgba(var(--color-primary-rgb), 0.15)' } : {}),
                                }}
                            >
                                {plan.badge && (
                                    <span className="absolute -top-3 right-1/2 translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium text-white"
                                        style={{ backgroundColor: 'var(--color-primary)' }}>
                                        {plan.badge}
                                    </span>
                                )}

                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-[var(--text-muted)] mb-6">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold">
                                        {plan.currency}{price}
                                    </span>
                                    <span className="text-[var(--text-muted)] text-sm mr-1">/شهرياً</span>
                                    {isAnnual && plan.annualPrice > 0 && (
                                        <p className="text-xs text-[var(--text-muted)] mt-1">
                                            يُدفع سنوياً
                                        </p>
                                    )}
                                </div>

                                <a
                                    href={plan.ctaHref}
                                    className={`block w-full text-center py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90 mb-6 ${plan.isFeatured
                                            ? 'text-white'
                                            : 'border border-white/15 text-white hover:bg-white/5'
                                        }`}
                                    style={plan.isFeatured ? { backgroundColor: 'var(--color-primary)' } : {}}
                                >
                                    {plan.ctaText}
                                </a>

                                <ul className="space-y-3">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                                            <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
