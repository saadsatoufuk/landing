'use client';

import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
    data: {
        logo: string;
        tagline: string;
        columns: Array<{
            title: string;
            links: Array<{ label: string; href: string }>;
        }>;
        socialLinks: Array<{ platform: string; url: string }>;
        bottomText: string;
        paymentIcons: boolean;
    };
}

const socialIcons: Record<string, React.ElementType> = {
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
};

export default function Footer({ data }: FooterProps) {
    return (
        <footer className="border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="text-xl font-bold gradient-text mb-3">{data.logo}</div>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{data.tagline}</p>

                        {/* Social */}
                        {data.socialLinks.length > 0 && (
                            <div className="flex gap-3 mt-5">
                                {data.socialLinks.map((link, i) => {
                                    const Icon = socialIcons[link.platform] || Twitter;
                                    return (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/8 text-[var(--text-muted)] hover:text-white hover:border-white/15 transition-all"
                                        >
                                            <Icon size={16} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Columns */}
                    {data.columns.map((col, i) => (
                        <div key={i}>
                            <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
                            <ul className="space-y-2.5">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a href={link.href} className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--text-muted)]">{data.bottomText}</p>

                    {data.paymentIcons && (
                        <div className="flex items-center gap-3 text-[var(--text-muted)]">
                            <span className="text-xs px-2 py-1 border border-white/10 rounded text-[10px] font-medium">VISA</span>
                            <span className="text-xs px-2 py-1 border border-white/10 rounded text-[10px] font-medium">MC</span>
                            <span className="text-xs px-2 py-1 border border-white/10 rounded text-[10px] font-medium">MADA</span>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
