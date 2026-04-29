import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Target, Zap, Heart } from "lucide-react";

const WHY_US_ITEMS = [
    {
        icon: Award,
        number: "01",
        title: "Expert Faculty",
        description: "Experienced and certified educators who are deeply committed to each student's growth — not just academically, but as individuals."
    },
    {
        icon: Target,
        number: "02",
        title: "Proven Results",
        description: "A consistent track record of outstanding board results, competition wins, and holistic student achievement spanning two decades."
    },
    {
        icon: Zap,
        number: "03",
        title: "Innovative Methods",
        description: "Blending time-tested pedagogical wisdom with modern learning tools — abacus, phonics, vedic maths, and technology-assisted classrooms."
    },
    {
        icon: Heart,
        number: "04",
        title: "Nurturing Environment",
        description: "A safe, structured, and inspiring space where discipline meets creative freedom — building confidence alongside knowledge."
    }
];

export function WhyUsSection() {
    const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section id="why-us" className="py-20 lg:py-28 bg-background border-t border-border/40 relative overflow-hidden">
            {/* Subtle background grid */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="reveal-target flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
                    <div>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">
                            <span className="block w-8 h-px bg-primary/60 rounded-full" />
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                            The Green Thumb<br />
                            <span className="text-primary">Difference</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                        We don't just teach – we transform young minds into confident, capable individuals.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {WHY_US_ITEMS.map((item, index) => (
                        <WhyUsCard key={item.title} {...item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyUsCard({ icon: Icon, number, title, description, index }: any) {
    const ref = useScrollReveal<HTMLDivElement>({
        threshold: 0.1,
        delay: index * 90
    });

    return (
        <div
            ref={ref}
            className="reveal-target relative bg-card rounded-2xl border border-border/60 p-7 overflow-hidden group hover:border-primary/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Number watermark */}
            <span className="absolute top-4 right-5 text-6xl font-display font-black text-foreground/[0.04] select-none leading-none">
                {number}
            </span>

            {/* Icon */}
            <div className="w-11 h-11 bg-primary/8 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 className="font-display font-bold text-lg text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
}
