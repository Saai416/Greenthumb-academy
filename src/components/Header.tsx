import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ACADEMY_NAME,
  NAV_LINKS,
  PHONE_NUMBER,
  WHATSAPP_URL,
} from "@/lib/constants";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "#ffffff",
        borderBottom: "1px solid #e8e8e8",
        boxShadow: scrolled
          ? "0 2px 16px rgba(0,0,0,0.08)"
          : "0 1px 0 #ebebeb",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 32px)",
          display: "flex",
          height: "72px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* ── Logo ── */}
        <button
          type="button"
          onClick={() => scrollTo("#home")}
          data-ocid="header.logo_link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 1.5vw, 10px)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        >
          {/* Logo circle */}
          <div
            style={{
              width: "clamp(40px, 8vw, 56px)",
              height: "clamp(40px, 8vw, 56px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #e0e0e0",
              flexShrink: 0,
              background: "#f5f5f5",
            }}
          >
            <img
              src="/gallery/logo.jpeg"
              alt={ACADEMY_NAME}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Logo text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(18px, 4vw, 26px)",
                letterSpacing: "0.5px",
                color: "#2D8659", // Bright primary green
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Green Thumb
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px, 2.5vw, 13px)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#555555",
                marginTop: "4px",
              }}
            >
              Academy
            </span>
          </div>
        </button>

        {/* ── Desktop Nav (center) ── */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex"
          style={{
            alignItems: "center",
            gap: "2px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              data-ocid={`header.nav_${link.label.toLowerCase()}_link`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#333333",
                textDecoration: "none",
                padding: "7px 14px",
                borderRadius: "6px",
                transition: "color 0.2s ease, background 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#2D8659";
                el.style.background = "rgba(45,134,89,0.07)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#333333";
                el.style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop Actions (right) ── */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "10px", flexShrink: 0 }}
        >
          {/* Phone */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            data-ocid="header.call_button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: "13.5px",
              color: "#444444",
              textDecoration: "none",
              padding: "7px 10px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              transition: "color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#2D8659";
              el.style.background = "rgba(45,134,89,0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#444444";
              el.style.background = "transparent";
            }}
          >
            <Phone
              style={{ width: "15px", height: "15px", flexShrink: 0, color: "#2D8659" }}
            />
            <span className="hidden xl:inline">{PHONE_NUMBER}</span>
            <span className="xl:hidden">Call</span>
          </a>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="header.whatsapp_button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "#25D366",
              color: "#ffffff",
              border: "none",
              padding: "9px 20px",
              borderRadius: "8px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition:
                "background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#20c05c";
              el.style.boxShadow = "0 4px 14px rgba(37,211,102,0.40)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#25D366";
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            <SiWhatsapp style={{ width: "16px", height: "16px", flexShrink: 0 }} />
            WhatsApp
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              data-ocid="header.mobile_menu_button"
              aria-label="Open menu"
              style={{ color: "#333333" }}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 pt-12"
            style={{
              background: "#ffffff",
              border: "none",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  data-ocid={`mobile_nav.${link.label.toLowerCase()}_link`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "13px 16px",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#333333",
                    transition: "color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "#2D8659";
                    el.style.background = "rgba(45,134,89,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "#333333";
                    el.style.background = "transparent";
                  }}
                >
                  {link.label}
                </button>
              ))}

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "0 8px",
                }}
              >
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 16px",
                    borderRadius: "8px",
                    border: "1.5px solid #e0e0e0",
                    color: "#333333",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                >
                  <Phone style={{ width: "16px", height: "16px", color: "#2D8659" }} />
                  {PHONE_NUMBER}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="mobile_nav.whatsapp_button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 16px",
                    borderRadius: "8px",
                    background: "#25D366",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  <SiWhatsapp style={{ width: "16px", height: "16px" }} />
                  WhatsApp Us
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
