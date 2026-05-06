import { WHATSAPP_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

/* ─── Hero Section ─────────────────────────────────────────────────────────── */
export function HeroSection() {
  const [activeBanner, setActiveBanner] = useState<string | null>(null);

  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  /* ── Fetch active banner ── */
  useEffect(() => {
    const fetchActiveBanner = async () => {
      const { data } = await supabase
        .from("banners")
        .select("url")
        .eq("is_active", true)
        .limit(1)
        .single();
      if (data) setActiveBanner(data.url);
    };
    fetchActiveBanner();
  }, []);

  /* ── Staggered entrance animations for the text content below ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const entries: [React.RefObject<HTMLElement | null>, number][] = [
      [taglineRef, 200],
      [headingRef, 380],
      [subRef, 540],
      [btnRef, 700],
    ];

    if (prefersReduced) {
      for (const [ref] of entries) {
        if (ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "none";
        }
      }
      return;
    }

    for (const [ref, delay] of entries) {
      const el = ref.current;
      if (!el) continue;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, delay);
    }
  }, []);

  const animBase: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(20px)",
    transition:
      "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — Banner Image (full, no overlay, no text)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        data-ocid="hero.section"
        aria-label="Hero banner image"
        style={{
          width: "100%",
          lineHeight: 0, /* removes phantom space below img */
          overflow: "hidden",
          background: "#f5f5f5",
        }}
      >
        {activeBanner ? (
          <img
            src={activeBanner}
            alt="Green Thumb Academy"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        ) : (
          /* Placeholder while banner loads */
          <div
            style={{
              width: "100%",
              height: "60vh",
              background: "linear-gradient(135deg, #0a2e18, #1a5c35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px",
              }}
            >
              Loading banner…
            </span>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — Content Block (white bg, below the image)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        data-ocid="hero.content"
        aria-label="Hero content"
        style={{
          background: "#ffffff",
          padding: "clamp(48px, 7vw, 88px) clamp(20px, 5vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Pill Badge */}
        <div
          ref={taglineRef}
          style={{
            ...animBase,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(45,134,89,0.08)",
            border: "1.5px solid rgba(45,134,89,0.25)",
            borderRadius: "999px",
            padding: "7px 18px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.04em",
              color: "#2D8659",
            }}
          >
            Chennai's Premier Multi-Disciplinary Learning Centre
          </span>
        </div>

        {/* Main Headline */}
        <h1
          ref={headingRef}
          style={{
            ...animBase,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(30px, 5vw, 58px)",
            lineHeight: 1.12,
            letterSpacing: "-1px",
            color: "#111111",
            margin: "0 0 20px 0",
            maxWidth: "780px",
          }}
        >
          Build Strong Foundations
          <br />
          <span style={{ color: "#2D8659" }}>for a Brighter Future</span>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          style={{
            ...animBase,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.8vw, 18px)",
            lineHeight: 1.7,
            color: "#555555",
            maxWidth: "560px",
            margin: "0 0 36px 0",
          }}
        >
          Nurturing young minds with expert coaching, holistic development, and
          a passion for learning — academics, arts, sports, and life skills
          under one roof.
        </p>

        {/* CTA Buttons */}
        <div
          ref={btnRef}
          style={{
            ...animBase,
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            justifyContent: "center",
          }}
        >
          {/* Primary */}
          <button
            type="button"
            data-ocid="hero.enroll_button"
            onClick={() =>
              document
                .getElementById("programs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "#2D8659",
              color: "#ffffff",
              border: "none",
              padding: "16px 40px",
              borderRadius: "8px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              transition:
                "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              minHeight: "52px",
              minWidth: "180px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#1f6343";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 20px rgba(45,134,89,0.35)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#2D8659";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLButtonElement).style.outline =
                "3px solid #2D8659";
              (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLButtonElement).style.outline = "none";
            }}
          >
            Explore Programs
          </button>

          {/* Secondary — WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.whatsapp_button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "#25D366",
              color: "#ffffff",
              border: "none",
              padding: "16px 36px",
              borderRadius: "8px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              textDecoration: "none",
              transition:
                "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              minHeight: "52px",
              minWidth: "180px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#20c05c";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 20px rgba(37,211,102,0.35)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#25D366";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.outline =
                "3px solid #25D366";
              (e.currentTarget as HTMLAnchorElement).style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.outline = "none";
            }}
          >
            <SiWhatsapp style={{ width: "20px", height: "20px", flexShrink: 0 }} />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
