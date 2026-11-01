import * as React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutContent } from "@/components/sections/about/AboutContent";

export const metadata = {
  title: "Atelier Heritage & Philosophy | Aura Estates",
  description:
    "Operating at the nexus of private investment banking and architectural connoisseurship. Learn about Aura Estates' heritage and fiduciary standard.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
