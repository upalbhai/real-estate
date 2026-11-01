import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-24">
        <div className="section-container max-w-lg text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/30">
            <Compass className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-special uppercase tracking-widest text-brand-gold font-bold">
              Archived or Private Dossier
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Estate Listing Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              The architectural residence you are seeking has either been moved into confidential private escrow or the identifier has expired.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link href="/properties">
              <Button variant="gold" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Browse Current Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

