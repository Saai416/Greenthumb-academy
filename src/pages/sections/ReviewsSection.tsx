import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TESTIMONIALS } from "@/lib/constants";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Gold star rating — always 5 stars
function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-[oklch(0.78_0.18_80)] text-[oklch(0.78_0.18_80)]"
        />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  avatar: string;
  isActive: boolean;
  index: number;
}

function TestimonialCard({
  text,
  name,
  role,
  avatar,
  isActive,
  index,
}: TestimonialCardProps) {
  return (
    <div
      data-ocid={`reviews.item.${index + 1}`}
      className={[
        "relative flex flex-col bg-card rounded-2xl shadow-card border border-border",
        "overflow-hidden select-none flex-shrink-0",
        "w-[min(90vw,360px)] sm:w-[340px] md:w-[380px]",
        "transition-all duration-500",
        isActive
          ? "scale-100 opacity-100"
          : "scale-95 opacity-50 pointer-events-none",
      ].join(" ")}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-primary" />

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
        {/* Decorative quote icon */}
        <Quote className="h-8 w-8 text-primary/20 -mb-2" aria-hidden="true" />

        {/* Stars */}
        <StarRating />

        {/* Text */}
        <p className="text-foreground/80 text-sm sm:text-base leading-relaxed font-body flex-1">
          &ldquo;{text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-border/60">
          <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center font-display font-bold text-primary text-xs flex-shrink-0">
            {avatar}
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-foreground text-sm truncate">
              {name}
            </p>
            <p className="text-muted-foreground text-xs font-body truncate">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  const prev = useCallback(
    () => setActive((a) => (a - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  // Auto-advance every 3.5 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Scroll track to center active card
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[active] as HTMLElement | undefined;
    if (!card) return;
    const trackCenter = track.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    track.scrollTo({ left: cardCenter - trackCenter, behavior: "smooth" });
  }, [active]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="reviews"
      data-ocid="reviews.section"
      className="py-20 lg:py-28 bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={sectionRef}
          className="reveal-target text-center mb-12 lg:mb-16"
        >
          <Badge
            variant="secondary"
            className="mb-3 font-body text-primary border-primary/20 bg-primary/8"
          >
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
            What Parents &amp; Students Say
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto font-body">
            Hundreds of families in Chennai trust Green Thumb Academy. Here is
            what they say about their experience.
          </p>
        </div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-ocid="reviews.carousel"
          className="relative"
        >
          {/* Cards track — horizontally scrollable, snap */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.name}
                text={t.text}
                name={t.name}
                role={t.role}
                avatar={t.avatar}
                isActive={i === active}
                index={i}
              />
            ))}
          </div>

          {/* Desktop prev/next arrows */}
          <button
            type="button"
            onClick={prev}
            data-ocid="reviews.pagination_prev"
            aria-label="Previous review"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-card border border-border shadow-card hover:border-primary hover:text-primary items-center justify-center transition-smooth z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            data-ocid="reviews.pagination_next"
            aria-label="Next review"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-card border border-border shadow-card hover:border-primary hover:text-primary items-center justify-center transition-smooth z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators + mobile arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Mobile prev */}
          <button
            type="button"
            onClick={prev}
            data-ocid="reviews.mobile_prev"
            aria-label="Previous review"
            className="md:hidden w-9 h-9 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-smooth"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div
            className="flex items-center gap-2"
            data-ocid="reviews.dot_indicators"
          >
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                data-ocid={`reviews.dot.${i + 1}`}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === active
                    ? "bg-primary w-7"
                    : "bg-border w-2 hover:bg-primary/40",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Mobile next */}
          <button
            type="button"
            onClick={next}
            data-ocid="reviews.mobile_next"
            aria-label="Next review"
            className="md:hidden w-9 h-9 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-smooth"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4 max-w-xs mx-auto h-0.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
