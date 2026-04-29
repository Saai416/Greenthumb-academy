import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FEATURES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Loader2, ImageOff, BookOpen } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  index: number;
  category?: string;
  imageUrl?: string;
}

function ProgramCard({ title, description, index, imageUrl }: ProgramCardProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: (index % 3) * 80,
  });
  const [imgErrored, setImgErrored] = useState(false);
  const hasImage = imageUrl && imageUrl.trim() !== '' && !imgErrored;

  return (
    <div
      ref={ref}
      data-ocid={`programs.item.${index + 1}`}
      className="reveal-target group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden flex flex-col h-full shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* 1. Image Container (Top) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0 bg-white">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgErrored(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
            <ImageOff className="w-10 h-10" />
          </div>
        )}
      </div>

      {/* 2. Middle Section (Gradient + Title) */}
      <div className="relative bg-gradient-to-r from-[#003399] to-[#0099cc] p-6 text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg sm:text-xl leading-tight uppercase tracking-wide">
              {title}
            </h3>

          </div>
        </div>
      </div>

      {/* 3. Bottom Section (Description + Link) */}
      <div className="flex flex-col p-7 flex-1 bg-white">
        <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-4">
          {description}
        </p>

        <button 
          className="mt-auto flex items-center gap-2 text-[#003399] font-bold text-sm hover:underline group/link"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Enquire about this program
        </button>
      </div>
    </div>
  );
}


function SectionHeader() {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className="reveal-target text-center max-w-2xl mx-auto mb-14 px-4">
      <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4">
        <span className="block w-8 h-px bg-primary/60 rounded-full" aria-hidden="true" />
        Programs &amp; Offerings
        <span className="block w-8 h-px bg-primary/60 rounded-full" aria-hidden="true" />
      </span>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-foreground leading-tight mb-4">
        What We Offer
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
        From board exam coaching to classical arts, sports, and wellness — 14+
        specialised programs designed to unlock every child's true potential.
      </p>
    </div>
  );
}

function CtaStrip() {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.3, delay: 80 });
  return (
    <div ref={ref} className="reveal-target mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
      <p className="text-muted-foreground text-sm sm:text-base">
        Not sure which program fits your child best?
      </p>
      <button
        type="button"
        data-ocid="programs.enroll_cta_button"
        className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-soft hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap"
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      >
        Talk to Us
      </button>
    </div>
  );
}

interface Program {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('[Programs] Fetch error:', error);
      }

      if (data && data.length > 0) {
        setPrograms(data);
      } else {
        // Fallback to static list when DB is empty
        setPrograms(FEATURES.map((f, i) => ({
          id: String(i),
          title: f.title,
          description: f.description,
          image_url: '',
          category: '',
        })));
      }
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  return (
    <section
      id="programs"
      data-ocid="programs.section"
      aria-labelledby="programs-title"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, oklch(0.96 0.020 140) 0%, oklch(0.975 0.010 150) 60%, oklch(0.97 0.014 140) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] w-[600px] h-[600px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, oklch(0.60 0.18 140) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="programs-title" className="sr-only">Our Programs &amp; Offerings</h2>
        <SectionHeader />

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <ul
            data-ocid="programs.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {programs.map((program, index) => (
              <li key={program.id}>
                <ProgramCard
                  title={program.title}
                  description={program.description}
                  index={index}
                  imageUrl={program.image_url}
                />
              </li>
            ))}
          </ul>
        )}

        <CtaStrip />
      </div>
    </section>
  );
}
