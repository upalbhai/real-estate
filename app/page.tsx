import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/components/navigation/BackToTopButton";
import { ScrollProgressIndicator, ScrollVelocityMarquee } from "@/components/ui/motion";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { FeaturedPropertiesSection } from "@/components/sections/home/FeaturedPropertiesSection";
import { NeighborhoodCollectionsSection } from "@/components/sections/home/NeighborhoodCollectionsSection";
import { AtelierValuePropsSection } from "@/components/sections/home/AtelierValuePropsSection";
import { AdvisorsSection } from "@/components/sections/home/AdvisorsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CtaBannerSection } from "@/components/sections/home/CtaBannerSection";
import { luxuryMarqueeItems } from "@/data";

export const metadata = {
  title: "Aura Estates | Luxury Real Estate & Architectural Residences",
  description:
    "Discover exceptional luxury properties, modern architectural estates, and penthouses across premier destinations.",
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
        {/* 1. Hero Section with Interactive Property Search & Parallax Depth */}
        <HeroSection />

        {/* 2. Scroll-Linked Luxury Ticker Marquee */}
        <div className="border-y border-border bg-surface-secondary/30 py-3.5 overflow-hidden">
          <ScrollVelocityMarquee items={luxuryMarqueeItems} speed={32} />
        </div>

        {/* 3. Featured Properties */}
        <FeaturedPropertiesSection />

        {/* 4. Explore Properties by Location */}
        <NeighborhoodCollectionsSection />

        {/* 5. About the Agency / Our Approach */}
        <AtelierValuePropsSection />

        {/* 6. Meet Our Team */}
        <AdvisorsSection />

        {/* 7. Client Testimonials */}
        <TestimonialsSection />

        {/* 8. Consultation CTA Banner */}
        <CtaBannerSection />
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
