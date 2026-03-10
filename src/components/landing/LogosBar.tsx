'use client';

interface LogosBarProps {
    data: {
        isVisible: boolean;
        label: string;
        logos: Array<{ name: string; image: string }>;
    };
}

export default function LogosBar({ data }: LogosBarProps) {
    if (!data.isVisible || data.logos.length === 0) return null;

    // Duplicate logos for seamless infinite scroll
    const allLogos = [...data.logos, ...data.logos];

    return (
        <section className="py-12 md:py-16 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <p className="text-sm text-[var(--text-muted)] text-center">{data.label}</p>
            </div>
            <div className="relative overflow-hidden">
                <div className="marquee-track flex items-center gap-12 md:gap-16" style={{ width: 'max-content' }}>
                    {allLogos.map((logo, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                        >
                            {logo.image ? (
                                <img src={logo.image} alt={logo.name} className="h-8 md:h-10 object-contain" />
                            ) : (
                                <span className="text-lg md:text-xl font-semibold text-white/50 hover:text-white whitespace-nowrap">
                                    {logo.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
