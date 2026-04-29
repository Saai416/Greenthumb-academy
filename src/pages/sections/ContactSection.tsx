import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ADDRESS,
  EMAIL,
  PHONE_NUMBER,
  WHATSAPP_URL,
  WORKING_HOURS,
} from "@/lib/constants";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.038937498174!2d80.20954905000001!3d13.0852565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52643d8c17b3f3%3A0x3e50a28d6abc42ae!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714199000000!5m2!1sen!2sin";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ContactCard({ icon, title, children }: ContactCardProps) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-soft hover:border-primary/30 transition-smooth group">
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
          {title}
        </p>
        <div className="text-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const leftRef = useScrollReveal<HTMLDivElement>({
    delay: 100,
    threshold: 0.08,
  });
  const rightRef = useScrollReveal<HTMLDivElement>({
    delay: 220,
    threshold: 0.08,
  });
  const quickActionsRef = useScrollReveal<HTMLDivElement>({
    delay: 300,
    threshold: 0.1,
  });

  const telHref = `tel:${PHONE_NUMBER.replace(/[\s-]/g, "")}`;

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 lg:py-28 bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="reveal-target text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            <MapPin size={13} />
            Visit Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Find Us &amp; <span className="text-primary">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto font-body">
            We'd love to meet you. Stop by our campus, call us, or send a
            WhatsApp message — we're always happy to help.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT — Contact Info */}
          <div
            ref={leftRef}
            className="reveal-left space-y-4"
            data-ocid="contact.info_panel"
          >
            {/* Address */}
            <ContactCard icon={<MapPin size={20} />} title="Our Address">
              <p className="font-medium text-foreground">
                Green Thumb Academy, Anna Nagar
              </p>
              <p className="text-muted-foreground">
                {ADDRESS.line1}, {ADDRESS.line2}
              </p>
              <p className="text-muted-foreground">{ADDRESS.state}</p>
            </ContactCard>

            {/* Phone */}
            <ContactCard icon={<Phone size={20} />} title="Phone Number">
              <a
                href={telHref}
                data-ocid="contact.phone_link"
                className="font-semibold text-primary hover:underline underline-offset-2 transition-smooth"
              >
                {PHONE_NUMBER}
              </a>
              <p className="text-muted-foreground text-xs mt-1">
                Tap to call us directly
              </p>
            </ContactCard>

            {/* Working Hours */}
            <ContactCard icon={<Clock size={20} />} title="Working Hours">
              <ul className="space-y-2 mt-0.5">
                {WORKING_HOURS.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex items-center justify-between gap-6 text-sm"
                  >
                    <span className="text-muted-foreground">{slot.days}</span>
                    <span className="font-medium text-foreground whitespace-nowrap">
                      {slot.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </ContactCard>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp_button"
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#18a852] text-white font-semibold text-base shadow-soft hover:shadow-hero hover:scale-[1.01] active:scale-[0.99] transition-smooth group"
            >
              <SiWhatsapp
                size={22}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              Chat on WhatsApp
            </a>
          </div>

          {/* RIGHT — Map + quick actions */}
          <div
            ref={rightRef}
            className="reveal-right space-y-5"
            data-ocid="contact.map_panel"
          >
            {/* Google Maps embed */}
            <div className="overflow-hidden rounded-2xl shadow-soft border border-border">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Green Thumb Academy — Anna Nagar, Chennai"
                data-ocid="contact.map"
              />
            </div>

            {/* Quick-action row */}
            <div
              ref={quickActionsRef}
              className="reveal-target grid grid-cols-3 gap-3"
              data-ocid="contact.quick_actions"
            >
              {/* Phone */}
              <a
                href={telHref}
                data-ocid="contact.quick_phone_button"
                className="flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-smooth group"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  <Phone size={18} />
                </span>
                <span className="text-xs font-semibold text-foreground text-center">
                  Call Us
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.quick_whatsapp_button"
                className="flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl bg-card border border-border hover:border-[#25D366]/50 hover:shadow-soft transition-smooth group"
              >
                <span className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-smooth">
                  <MessageCircle size={18} />
                </span>
                <span className="text-xs font-semibold text-foreground text-center">
                  WhatsApp
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                data-ocid="contact.quick_email_button"
                className="flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-smooth group"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  <Mail size={18} />
                </span>
                <span className="text-xs font-semibold text-foreground text-center">
                  Email Us
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Enrollment CTA Banner */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 sm:p-10 text-center shadow-hero">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground mb-2">
                Ready to Join Our Academy?
              </h3>
              <p className="text-primary-foreground/80 font-body mb-6 max-w-lg mx-auto">
                Admissions open for 2025–26. Enroll now for early-bird benefits
                and a personalised orientation session.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={telHref}
                  data-ocid="cta.call_button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-primary-foreground/90 transition-smooth shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call to Enroll
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="cta.whatsapp_enroll_button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition-smooth"
                >
                  <SiWhatsapp size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
