import {
  ACADEMY_NAME,
  ADDRESS,
  EMAIL,
  NAV_LINKS,
  PHONE_NUMBER,
  WHATSAPP_URL,
  WORKING_HOURS,
} from "@/lib/constants";
import { Clock, Leaf, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const year = new Date().getFullYear();
const hostname =
  typeof window !== "undefined"
    ? window.location.hostname
    : "greenthumbacademy.in";

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-card border-t border-border" id="footer">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="relative h-12 w-auto overflow-hidden">
                <img 
                  src="/gallery/logo.jpeg" 
                  alt={ACADEMY_NAME} 
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Nurturing young minds in Chennai since 2005. A premier
              multi-disciplinary learning centre for holistic child development.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.whatsapp_button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#20c05c] transition-smooth"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`footer.nav_${link.label.toLowerCase()}_link`}
                    className="text-muted-foreground hover:text-primary text-sm transition-smooth text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  data-ocid="footer.phone_link"
                  className="flex items-start gap-2.5 text-muted-foreground hover:text-primary text-sm transition-smooth"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  data-ocid="footer.email_link"
                  className="flex items-start gap-2.5 text-muted-foreground hover:text-primary text-sm transition-smooth"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>
                  {ADDRESS.line1}, {ADDRESS.line2}, {ADDRESS.state}
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Working Hours
            </h4>
            <ul className="space-y-3">
              {WORKING_HOURS.map((slot) => (
                <li key={slot.days} className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {slot.days}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {slot.hours}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            © {year} {ACADEMY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
