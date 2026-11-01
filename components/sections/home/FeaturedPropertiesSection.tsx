"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutGrid,
  List,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/ui/property-card";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import { mockPropertyCards, portfolioFilterTabs } from "@/data";
import { useFavoriteStore } from "@/store/useFavoriteStore";

export function FeaturedPropertiesSection() {
  const [activeTab, setActiveTab] = React.useState("all");
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "horizontal">("grid");
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  const filteredProperties = React.useMemo(() => {
    if (activeTab === "all") return mockPropertyCards.slice(0, 6);
    return mockPropertyCards.filter((p) => {
      const loc = p.location.toLowerCase();
      if (activeTab === "beverly-hills") return loc.includes("beverly");
      if (activeTab === "tribeca") return loc.includes("tribeca") || loc.includes("new york");
      if (activeTab === "miami") return loc.includes("miami");
      if (activeTab === "austin") return loc.includes("austin");
      return true;
    });
  }, [activeTab]);

  return (
    <section id="portfolio" className="section-container py-20 sm:py-24 space-y-10 scroll-mt-24">
      {/* Section Header with Category & Layout Controls */}
      <MotionFadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-4 border-b border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Trophy Inventory</Badge>
              <span className="text-xs text-muted-foreground font-mono">
                CURATED RESIDENTIAL ASSETS
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Featured Trophy Acquisitions
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Each estate represents uncompromised architectural integrity, certified title provenance,
              and immediate escrow availability.
            </p>
          </div>

          {/* View Mode Controls (Grid vs Horizontal) */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="flex items-center gap-1 p-1 rounded-control bg-surface-secondary/70 border border-border">
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className={`p-1.5 rounded-control transition-all cursor-pointer ${
                  layoutMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid Layout"
                aria-label="Grid layout"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("horizontal")}
                className={`p-1.5 rounded-control transition-all cursor-pointer ${
                  layoutMode === "horizontal"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Horizontal Row Layout"
                aria-label="Horizontal layout"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Link href="/properties">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Full Catalog
              </Button>
            </Link>
          </div>
        </div>
      </MotionFadeIn>

      {/* Filter Tabs */}
      <MotionFadeIn delay={0.1}>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {portfolioFilterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground font-bold shadow-xs border border-brand-gold/40"
                  : "bg-surface-secondary/50 text-muted-foreground hover:text-foreground hover:bg-surface-secondary border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </MotionFadeIn>

      {/* Properties Output (Grid or Horizontal) with Stagger Motion */}
      <MotionStaggerContainer
        key={`${activeTab}-${layoutMode}`}
        className={
          layoutMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {filteredProperties.map((prop) => (
          <MotionStaggerItem key={prop.id}>
            <PropertyCard
              property={{
                ...prop,
                isFavorite: isFavorite(prop.id),
              }}
              variant={layoutMode}
              onFavoriteToggle={(id) => toggleFavorite(id)}
            />
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>

      {/* Bottom CTA Banner */}
      <MotionFadeIn delay={0.15}>
        <div className="p-6 rounded-card border border-border bg-surface-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-heading text-lg font-bold text-foreground block">
              Seeking an Unlisted Off-Market Dossier?
            </span>
            <span className="text-xs text-muted-foreground">
              Our private acquisitions desk holds 18 undisclosed trophy residences protected by strict NDAs.
            </span>
          </div>

          <Link href="/contact" className="shrink-0">
            <Button variant="gold" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Request Private Dossier
            </Button>
          </Link>
        </div>
      </MotionFadeIn>
    </section>
  );
}
