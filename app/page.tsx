import Link from "next/link";
import {
  Building2,
  ArrowRight,
  Sparkles,
  Layers,
  SquareTerminal,
  TableProperties,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { homeFeatureHighlights } from "@/data";

const homeIconMap = {
  Layers,
  SquareTerminal,
  TableProperties,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Navigation Bar */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="section-container flex h-18 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-control bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                AURA ESTATES
              </span>
              <span className="ml-2 rounded-full bg-brand-gold/15 px-2 py-0.5 text-[10px] font-semibold text-brand-gold">
                LUXURY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/components">
              <Button variant="secondary" size="sm">
                Components
              </Button>
            </Link>
            <ThemeToggle variant="segmented" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="section-container flex-1 flex flex-col justify-center py-16 sm:py-24">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1.5 text-xs font-semibold text-brand-gold">
            <Sparkles className="h-4 w-4" />
            <span>Modern Real Estate Template &amp; Component System</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
            Architectural Precision for Luxury Living.
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-body">
            Welcome to the Aura Estates frontend. Explore our modular design system
            built with reusable button variants, interactive data tables, and dual
            light/dark themes.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/components">
              <Button
                variant="gold"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Components System
              </Button>
            </Link>
            <Link href="/components/buttons">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<SquareTerminal className="h-4 w-4" />}
              >
                Buttons Showcase
              </Button>
            </Link>
            <Link href="/components/data-table">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<TableProperties className="h-4 w-4" />}
              >
                Data Table Pro
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-border">
          {homeFeatureHighlights.map((feat) => {
            const Icon = homeIconMap[feat.iconName];
            return (
              <div key={feat.id} className="card-base p-6 space-y-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-control ${feat.iconBgClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-6">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Aura Estates. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/components" className="hover:text-foreground transition-colors">
              Components Route
            </Link>
            <Link href="/components/buttons" className="hover:text-foreground transition-colors">
              Buttons
            </Link>
            <Link href="/components/data-table" className="hover:text-foreground transition-colors">
              Data Table
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
