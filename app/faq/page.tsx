import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqContent } from "@/components/sections/faq/FaqContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Aura Estates",
  description:
    "Find answers to common questions about buying, selling, and scheduling private viewings for luxury homes and architectural estates with Aura Estates.",
  keywords: [
    "Aura Estates FAQ",
    "luxury real estate questions",
    "buying luxury homes",
    "private property viewings",
    "architectural estates advisory",
  ],
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />
      <main className="flex-1">
        <FaqContent />
      </main>
      <Footer />
    </div>
  );
}

