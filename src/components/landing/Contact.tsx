'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
    data: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        email: string;
        phone: string;
        showForm: boolean;
        formFields: Array<{
            label: string;
            type: string;
            placeholder: string;
            required: boolean;
        }>;
    };
    subdomain?: string;
}

export default function Contact({ data, subdomain }: ContactProps) {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!data.isVisible) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ siteSubdomain: subdomain || 'default', fields: formData }),
            });
            setSubmitted(true);
        } catch (err) {
            console.error('Submit error:', err);
        }
        setLoading(false);
    };

    return (
        <section id="contact" className="py-20 md:py-28 bg-[var(--bg-surface)]">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h2>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">{data.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {data.email && (
                            <div className="flex items-center gap-4 glass rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
                                    <Mail size={20} style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <div>
                                    <div className="text-xs text-[var(--text-muted)] mb-1">البريد الإلكتروني</div>
                                    <a href={`mailto:${data.email}`} className="text-sm hover:underline">{data.email}</a>
                                </div>
                            </div>
                        )}
                        {data.phone && (
                            <div className="flex items-center gap-4 glass rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
                                    <Phone size={20} style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <div>
                                    <div className="text-xs text-[var(--text-muted)] mb-1">رقم الهاتف</div>
                                    <a href={`tel:${data.phone}`} className="text-sm hover:underline" dir="ltr">{data.phone}</a>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Contact Form */}
                    {data.showForm && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="glass rounded-2xl p-10 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.1 }}
                                        >
                                            <CheckCircle size={56} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">تم إرسال رسالتك بنجاح!</h3>
                                        <p className="text-sm text-[var(--text-muted)]">سنرد عليك في أقرب وقت ممكن.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="glass rounded-2xl p-6 md:p-8 space-y-4"
                                    >
                                        {data.formFields.map((field, i) => (
                                            <div key={i}>
                                                <label className="block text-sm text-[var(--text-muted)] mb-1.5">
                                                    {field.label} {field.required && <span style={{ color: 'var(--color-primary)' }}>*</span>}
                                                </label>
                                                {field.type === 'textarea' ? (
                                                    <textarea
                                                        placeholder={field.placeholder}
                                                        required={field.required}
                                                        rows={4}
                                                        onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                                                    />
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        required={field.required}
                                                        onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90 disabled:opacity-50"
                                            style={{ backgroundColor: 'var(--color-primary)' }}
                                        >
                                            <Send size={16} />
                                            {loading ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
