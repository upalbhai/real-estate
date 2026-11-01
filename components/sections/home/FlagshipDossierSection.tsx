"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageGalleryViewer } from "@/components/ui/image-viewer";
import {
  MotionFadeIn,
  MotionSlideIn,
} from "@/components/ui/motion";
import { imageViewerGalleryPlates, luxuryAmenitiesList } from "@/data";

export function FlagshipDossierSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const specsY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <section
      ref={sectionRef}
      id="flagship"
      className="border-y border-border bg-surface-secondary/20 py-20 sm:py-24 scroll-mt-24 overflow-hidden"
    >
      <div className="section-container space-y-12">
        {/* Section Header */}
        <MotionFadeIn>
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Flagship Dossier</Badge>
              <span className="text-xs text-muted-foreground font-mono">
                CURATED ARCHITECTURAL SPOTLIGHT
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              The Glasshouse Sanctuary
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A milestone in modernist residential engineering. Cantilevered Roman travertine framing,
              motorized Fleetwood glass envelopes, and uninterrupted vistas across the Los Angeles basin.
            </p>
          </div>
        </MotionFadeIn>

        {/* Gallery & Specs Split with Framer Motion SlideIn */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Multi-Plate Architectural Gallery Viewer */}
          <div className="lg:col-span-7">
            <MotionSlideIn direction="left" distance={30}>
              <ImageGalleryViewer
                images={imageViewerGalleryPlates}
                heroHeight="h-72 sm:h-96"
                thumbnailColumns={4}
                className="p-1"
              />
            </MotionSlideIn>
          </div>

          {/* Right: Architectural Dossier Specifications Card with Parallax Depth */}
          <div className="lg:col-span-5">
            <motion.div style={{ y: specsY }} className="will-change-transform">
              <MotionSlideIn direction="right" distance={30}>
                <div className="p-6 sm:p-7 rounded-card border border-border bg-surface space-y-6 shadow-sm">
                {/* Title & Valuation */}
                <div className="pb-4 border-b border-border space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-special text-[11px] uppercase tracking-wider text-brand-gold font-semibold">
                      Asset Code: EST-801
                    </span>
                    <Badge variant="gold" size="sm">
                      Exclusive Representation
                    </Badge>
                  </div>

                  <div className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
                    $18,500,000
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Trousdale Estates, Beverly Hills, CA 90210</span>
                  </div>
                </div>

                {/* 4-Stat Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/40">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Bedrooms</span>
                    <div className="font-heading text-lg font-bold text-foreground">6 Beds</div>
                  </div>
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/40">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Bathrooms</span>
                    <div className="font-heading text-lg font-bold text-foreground">8 Baths</div>
                  </div>
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/40">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Interior</span>
                    <div className="font-mono text-sm font-bold text-foreground">9,400 sqft</div>
                  </div>
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/40">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Velocity</span>
                    <div className="font-mono text-xs font-bold text-brand-gold mt-0.5">$1,968/sqft</div>
                  </div>
                </div>

                {/* Verified Architectural Highlights */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
                    Verified Architectural Amenities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {luxuryAmenitiesList.map((amenity) => (
                      <Badge key={amenity} variant="gold" size="sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Fiduciary Clearance & Action */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-brand-gold shrink-0" />
                    <span>Full architectural blueprint dossier &amp; escrow title cleared.</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <Link href="/properties/the-glasshouse-sanctuary" className="flex-1">
                      <Button variant="gold" size="md" className="w-full justify-center">
                        Inspect Complete Dossier
                      </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button variant="outline" size="md" className="w-full justify-center">
                        Schedule Viewing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </MotionSlideIn>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
