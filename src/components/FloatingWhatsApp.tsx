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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 group animate-float"
    >
      <span className="relative flex h-7 w-7">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40 duration-1000" />
        <MessageCircle className="relative h-7 w-7 fill-white stroke-[#25D366]" />
      </span>
    </a>
  );
}
