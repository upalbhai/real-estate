import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqContent } from "@/components/sections/faq/FaqContent";

export const metadata: Metadata = {
  title: "Fiduciary Protocols & FAQ | Aura Estates",
  description:
    "Authoritative guidance regarding bilateral non-disclosure standards, private off-market vault access, international capital settlement, and architectural representation protocols.",
  keywords: [
    "Aura Estates FAQ",
    "luxury real estate NDA",
    "off-market acquisitions protocol",
    "fiduciary real estate standards",
    "family office real estate advisory",
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

