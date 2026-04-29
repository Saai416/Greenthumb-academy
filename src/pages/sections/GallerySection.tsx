import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, ImageOff, Image as ImageIcon } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

const CATEGORIES = [
  { id: "learning", label: "Learning Space", dbValue: "Learning Space" },
  { id: "academy", label: "Academy", dbValue: "Academy" },
  { id: "celebrations", label: "Celebrations", dbValue: "Celebrations" },
];

export function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeTab, setActiveTab] = useState<string>(CATEGORIES[0].id);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setFetchError(null);
      const { data, error } = await supabase
        .from('gallery')
        .select('id, url, category')
        .order('created_at', { ascending: false });

      console.log('[Gallery] Public fetch result:', { data, error });

      if (error) {
        console.error('[Gallery] Fetch error:', error);
        setFetchError(error.message);
        setImages([]);
      } else {
        setImages(data ?? []);
      }
      setLoading(false);
    };
    fetchGallery();
  }, []);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab);
  const activeImages = images.filter(img => img.category === activeCategory?.dbValue);

  const galleryReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-[#f8fafc] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <TabSwitcher
          tabs={CATEGORIES}
          activeId={activeTab}
          onChange={setActiveTab}
        />

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : fetchError ? (
          <div className="h-40 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm border-2 border-dashed rounded-2xl bg-white">
            <ImageOff className="w-8 h-8 opacity-40" />
            <p>Gallery unavailable. Please try again later.</p>
          </div>
        ) : (
          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar scroll-smooth"
            >
              {activeImages.map((img, i) => (
                <BentoCard
                  key={img.id}
                  src={img.url}
                  categoryLabel={activeCategory?.label || ''}
                  index={i}
                  isFeatured={i === 0 && activeTab === 'learning'} // Mock featured for first image
                />
              ))}
              {activeImages.length === 0 && (
                <div className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 bg-white/50 italic">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                  <p>No photos in this category yet.</p>
                </div>
              )}
            </div>

            {/* Scroll Progress Bar (Matches User Screenshot) */}
            {activeImages.length > 0 && (
              <div className="absolute bottom-4 left-0 right-0 h-1 bg-slate-100 rounded-full overflow-hidden max-w-[200px] mx-auto hidden sm:block">
                <div className="h-full bg-emerald-600/40 w-1/3 rounded-full animate-pulse" />
              </div>
            )}

            <p className="mt-2 text-[11px] text-slate-400 font-medium text-center sm:hidden">
              Swipe to explore Gallery →
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function BentoCard({
  src,
  categoryLabel,
  index,
  isFeatured
}: {
  src: string;
  categoryLabel: string;
  index: number;
  isFeatured?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0 snap-start",
        "transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
        "w-[300px] sm:w-[400px] h-[260px]"
      )}
    >
      {errored ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-50">
          <ImageOff className="w-8 h-8 opacity-20" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">Broken Link</span>
        </div>
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setErrored(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="text-white text-[10px] font-bold tracking-wider uppercase bg-emerald-600/90 backdrop-blur px-2.5 py-1 rounded shadow-sm">
          {categoryLabel}
        </span>
        {isFeatured && (
          <span className="text-white text-[10px] font-bold tracking-wider uppercase bg-black/40 backdrop-blur px-2.5 py-1 rounded shadow-sm border border-white/10">
            Featured
          </span>
        )}
      </div>
    </div>
  );
}

function SectionHeader() {
  const revealRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div ref={revealRef} className="reveal-target text-center mb-12">
      <span className="inline-block text-primary font-body text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full bg-primary/8 border border-primary/15">
        Photo Gallery
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
        Our Gallery
      </h2>
      <div className="flex items-center justify-center gap-2 mb-5">
        <div className="h-1 w-16 rounded-full bg-primary" />
        <div className="h-1 w-4 rounded-full bg-primary/40" />
      </div>
      <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto font-body leading-relaxed">
        Glimpses of our vibrant learning community — classrooms, celebrations,
        and everything in between.
      </p>
    </div>
  );
}

function TabSwitcher({
  tabs,
  activeId,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-6 py-2 rounded-full font-body font-medium text-sm transition-all duration-300",
            activeId === tab.id
              ? "bg-primary text-primary-foreground shadow-soft"
              : "bg-card border border-border text-muted-foreground hover:bg-primary/5 hover:text-primary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
