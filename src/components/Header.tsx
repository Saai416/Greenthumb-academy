import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ACADEMY_NAME,
  NAV_LINKS,
  PHONE_NUMBER,
  WHATSAPP_URL,
} from "@/lib/constants";
import { Leaf, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
        ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50 py-1"
        : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md shadow-sm py-2"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            data-ocid="header.logo_link"
            className="flex items-center gap-2.5 transition-smooth group"
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-white shadow-sm group-hover:border-primary/40 transition-all duration-300">
              <img 
                src="/gallery/logo.jpeg" 
                alt={ACADEMY_NAME} 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span
                className="font-display font-extrabold tracking-tight uppercase bg-gradient-to-r from-primary via-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-sm text-base sm:text-lg"
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Green Thumb
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 font-display font-semibold text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-0.5">
                Academy
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                data-ocid={`header.nav_${link.label.toLowerCase()}_link`}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-primary/10 ${scrolled ? 'text-foreground/70 hover:text-primary' : 'text-foreground/80 dark:text-white/80 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-white/10'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              data-ocid="header.call_button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${scrolled ? 'text-foreground/80 hover:text-primary hover:bg-primary/5' : 'text-foreground/90 dark:text-white/90 hover:bg-primary/5 dark:hover:bg-white/10'
                }`}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{PHONE_NUMBER}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="header.whatsapp_button"
            >
              <Button
                size="sm"
                className="bg-[#25D366] hover:bg-[#20c05c] text-white gap-2 border-0 shadow-lg hover:shadow-xl transition-all rounded-full px-5"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>

          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                data-ocid="header.mobile_menu_button"
                aria-label="Open menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`mobile_nav.${link.label.toLowerCase()}_link`}
                    className="w-full text-left px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/5 transition-smooth font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-4 flex flex-col gap-2 px-2">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      data-ocid="mobile_nav.call_button"
                    >
                      <Phone className="h-4 w-4" /> {PHONE_NUMBER}
                    </Button>
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      className="w-full gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white border-0"
                      data-ocid="mobile_nav.whatsapp_button"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </Button>
                  </a>

                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
