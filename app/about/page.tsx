import * as React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutContent } from "@/components/sections/about/AboutContent";

export const metadata = {
  title: "About Us | Aura Estates",
  description:
    "Learn about Aura Estates, our approach to luxury real estate advisory, and our team representing distinctive architectural properties across premier global destinations.",
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
