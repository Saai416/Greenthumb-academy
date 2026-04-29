import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutSection } from "@/pages/sections/AboutSection";
import { ContactSection } from "@/pages/sections/ContactSection";
import { GallerySection } from "@/pages/sections/GallerySection";
import { HeroSection } from "@/pages/sections/HeroSection";
import { ProgramsSection } from "@/pages/sections/ProgramsSection";
import { ReviewsSection } from "@/pages/sections/ReviewsSection";
import { WhyUsSection } from "@/pages/sections/WhyUsSection";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" richColors closeButton />
      <Header />
      <main>
        <HeroSection />
        <WhyUsSection />
        <ProgramsSection />
        <GallerySection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
