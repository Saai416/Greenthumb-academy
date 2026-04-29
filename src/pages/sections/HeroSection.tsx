import { WHATSAPP_URL } from "@/lib/constants";
import { ChevronDown, GraduationCap, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

/* ─── Decorative SVG Academic Pattern ─────────────────────────────────────── */
function AcademicPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="academic-grid"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond grid */}
          <path
            d="M40 0 L80 40 L40 80 L0 40 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="40" cy="40" r="3" fill="white" fillOpacity="0.4" />
          <circle cx="0" cy="0" r="2" fill="white" fillOpacity="0.3" />
          <circle cx="80" cy="0" r="2" fill="white" fillOpacity="0.3" />
          <circle cx="80" cy="80" r="2" fill="white" fillOpacity="0.3" />
          <circle cx="0" cy="80" r="2" fill="white" fillOpacity="0.3" />
        </pattern>
        <pattern
          id="academic-dots"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="20" r="1.2" fill="white" fillOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#academic-grid)" />
      <rect width="100%" height="100%" fill="url(#academic-dots)" />
    </svg>
  );
}

/* ─── Bokeh Circles ────────────────────────────────────────────────────────── */
function BokehCircles() {
  const circles = [
    {
      id: "top-right",
      size: 320,
      top: "-8%",
      right: "-5%",
      delay: "0s",
      opacity: 0.08,
    },
    {
      id: "top-left",
      size: 200,
      top: "15%",
      left: "5%",
      delay: "1.2s",
      opacity: 0.06,
    },
    {
      id: "mid-right",
      size: 150,
      bottom: "20%",
      right: "15%",
      delay: "0.6s",
      opacity: 0.07,
    },
    {
      id: "center",
      size: 100,
      top: "55%",
      left: "30%",
      delay: "2s",
      opacity: 0.05,
    },
    {
      id: "bot-left",
      size: 260,
      bottom: "-10%",
      left: "-6%",
      delay: "0.4s",
      opacity: 0.07,
    },
    {
      id: "mid-center",
      size: 80,
      top: "30%",
      right: "30%",
      delay: "1.8s",
      opacity: 0.06,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {circles.map((c) => (
        <div
          key={c.id}
          className="absolute rounded-full blur-3xl animate-pulse-slow"
          style={{
            width: c.size,
            height: c.size,
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            background: `radial-gradient(circle, oklch(0.65 0.2 140 / ${c.opacity}) 0%, transparent 70%)`,
            animationDelay: c.delay,
          }}
        />
      ))}
    </div>
  );
}

import { supabase } from "@/lib/supabase";
import { useState } from "react";

/* ─── Hero Section ─────────────────────────────────────────────────────────── */
export function HeroSection() {
  const [activeBanner, setActiveBanner] = useState<string | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch active banner
    const fetchActiveBanner = async () => {
      const { data } = await supabase
        .from('banners')
        .select('url')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (data) {
        setActiveBanner(data.url);
      }
    };
    fetchActiveBanner();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const elements = [
      badgeRef.current,
      headingRef.current,
      subRef.current,
      btnRef.current,
      statsRef.current,
    ];

    if (prefersReduced) {
      for (const el of elements) {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      }
      return;
    }

    elements.forEach((el, i) => {
      if (!el) return;
      setTimeout(
        () => {
          el.style.opacity = "1";
          el.style.transform = "none";
        },
        120 + i * 160,
      );
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const animBase: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(28px)",
    transition:
      "opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative flex flex-col overflow-hidden bg-[#fafafa] dark:bg-zinc-950 pt-24"
    >
      {/* ── Separate Dynamic Banner at Top ── */}
      {activeBanner && (
        <div className="relative w-full overflow-hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
          <img 
            src={activeBanner} 
            alt="Academy Banner" 
            className="w-full h-auto max-h-[70vh] object-contain mx-auto block"
          />
        </div>
      )}

      {/* ── Background Elements (Now below banner) ── */}
      {!activeBanner && (
        <div
          className="absolute inset-0 h-[600px] transition-opacity duration-1000"
          style={{
            background: "linear-gradient(135deg, oklch(0.20 0.13 142) 0%, oklch(0.24 0.15 160) 35%, oklch(0.19 0.11 175) 65%, oklch(0.16 0.09 190) 100%)",
          }}
        />
      )}

      {/* ── Bokeh & Patterns (Made more subtle) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <AcademicPattern />
        <BokehCircles />
      </div>

      {/* ── Content ── */}
      <div className={`relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center ${activeBanner ? 'pt-16 pb-32' : 'pt-48 pb-32'}`}>
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 dark:bg-primary/10 backdrop-blur-md px-5 py-2 text-sm text-primary mb-8 font-body shadow-sm"
          style={{
            ...animBase,
          }}
        >
          <GraduationCap className="h-4 w-4" />
          <span className="font-bold tracking-tight">Chennai's Premier Multi-Disciplinary Learning Centre</span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          style={animBase}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-zinc-900 dark:text-zinc-100 leading-[1.05] tracking-tight mb-8"
        >
          Build Strong Foundations
          <br />
          <span
            className="relative inline-block mt-2"
            style={{
              background: "linear-gradient(135deg, oklch(0.45 0.18 140), oklch(0.60 0.18 145))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            for a Brighter Future
          </span>
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          style={animBase}
          className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-body max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Nurturing young minds with expert coaching, holistic development, and
          a passion for learning — academics, arts, sports, and life skills
          under one roof.
        </p>

        {/* CTA Buttons */}
        <div
          ref={btnRef}
          style={animBase}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.enroll_button"
            className="group relative px-10 py-4 rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-[0.98] bg-primary text-white"
          >
            <span className="relative z-10">Enroll Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-foreground/10 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.whatsapp_button"
            className="flex items-center gap-2.5 px-10 py-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 font-bold text-base text-zinc-900 dark:text-zinc-100 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-primary/30"
          >
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            WhatsApp Us
          </a>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          style={animBase}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { value: "20+", label: "Years of Excellence" },
            { value: "5,000+", label: "Students Trained" },
            { value: "14+", label: "Programs Offered" },
            { value: "98%", label: "Board Pass Rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center px-4 py-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-transform duration-300 hover:scale-105"
            >
              <p
                className="text-3xl sm:text-4xl font-display font-black text-primary mb-1"
              >
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        type="button"
        onClick={scrollToAbout}
        data-ocid="hero.scroll_down_button"
        aria-label="Scroll to about section"
        className="mt-12 mb-8 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-primary transition-smooth group mx-auto"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
          Explore
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>

  );
}
