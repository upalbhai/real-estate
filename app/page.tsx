import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressIndicator, ScrollVelocityMarquee } from "@/components/ui/motion";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { FeaturedPropertiesSection } from "@/components/sections/home/FeaturedPropertiesSection";
import { FlagshipDossierSection } from "@/components/sections/home/FlagshipDossierSection";
import { NeighborhoodCollectionsSection } from "@/components/sections/home/NeighborhoodCollectionsSection";
import { AtelierValuePropsSection } from "@/components/sections/home/AtelierValuePropsSection";
import { AdvisorsSection } from "@/components/sections/home/AdvisorsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CtaBannerSection } from "@/components/sections/home/CtaBannerSection";
import { luxuryMarqueeItems } from "@/data";

export const metadata = {
  title: "Aura Estates | Curated Luxury Architecture & Off-Market Residences",
  description:
    "Curating the world's most significant modernist architecture, off-market compounds, and trophy penthouses across premier international capitals.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      {/* Scroll-linked Gold Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Public Navigation */}
      <Navbar />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Portfolio Search & Parallax Depth */}
        <HeroSection />

        {/* 2. Scroll-Linked Luxury Ticker Marquee */}
        <div className="border-y border-border bg-surface-secondary/30 py-3.5 overflow-hidden">
          <ScrollVelocityMarquee items={luxuryMarqueeItems} speed={32} />
        </div>

        {/* 3. Featured Trophy Acquisitions (Grid / Horizontal) */}
        <FeaturedPropertiesSection />

        {/* 4. Flagship Architectural Dossier with Multi-Plate Lightbox */}
        <FlagshipDossierSection />

        {/* 5. Curated Regional Collections with Horizontal Scroll Experience */}
        <NeighborhoodCollectionsSection />

        {/* 6. The Atelier Fiduciary Standard */}
        <AtelierValuePropsSection />

        {/* 7. Senior Leadership & Private Advisors */}
        <AdvisorsSection />

        {/* 8. Client & Family Office Testimonials */}
        <TestimonialsSection />

        {/* 9. Confidential Consultation CTA Banner */}
        <CtaBannerSection />
      </main>

      {/* Public Architectural Footer */}
      <Footer />
    </div>
  );
}
