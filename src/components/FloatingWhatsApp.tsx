import { WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="floating_whatsapp.button"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:shadow-xl transition-smooth hover:scale-105 active:scale-95 group"
    >
      <span className="relative flex h-5 w-5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-30" />
        <MessageCircle className="relative h-5 w-5 fill-white stroke-[#25D366]" />
      </span>
      <span className="text-sm font-semibold tracking-wide hidden sm:inline font-body">
        Chat on WhatsApp
      </span>
    </a>
  );
}
