"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import { neighborhoodCollections } from "@/data";

export function NeighborhoodCollectionsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation on scroll for desktop
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="locations" className="scroll-mt-24">
      {/* Desktop & Tablet: Pinned Horizontal Scroll Experience */}
      <div ref={containerRef} className="hidden md:block relative h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Header */}
          <div className="section-container pb-6">
            <MotionFadeIn>
              <div className="flex items-end justify-between gap-4 pb-4 border-b border-border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">Locations</Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      PREMIER DESTINATIONS
                    </span>
                  </div>

                  <h2 className="font-heading text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                    Explore Properties by Location
                  </h2>

                  <p className="text-sm text-muted-foreground max-w-xl">
                    Discover homes in premier destinations known for exceptional architecture and lifestyle.
                  </p>
                </div>

                <Link
                  href="/properties"
                  className="text-xs font-semibold text-brand-gold hover:underline flex items-center gap-1 self-end"
                >
                  <span>View All Locations</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </MotionFadeIn>
          </div>

          {/* Horizontal Track */}
          <div className="pl-[max(1.5rem,calc((100vw-1280px)/2))] overflow-hidden py-4">
            <motion.div style={{ x }} className="flex gap-6 pr-16 will-change-transform">
              {neighborhoodCollections.map((col, index) => (
                <div key={col.id} className="w-[360px] lg:w-[420px] shrink-0">
                  <Link
                    href={`/properties?location=${col.id}`}
                    className="group relative h-[420px] rounded-card overflow-hidden border border-border shadow-md block transition-transform duration-300 hover:-translate-y-2"
                  >
                    {/* Background High-Res Image */}
                    <Image
                      src={col.imageUrl}
                      alt={col.city}
                      fill
                      sizes="420px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono font-bold text-brand-gold border border-brand-gold/30">
                        {col.activeListingsCount} Properties
                      </span>
                      <span className="text-xs font-mono font-bold text-white/60">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-2">
                      <div>
                        <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold font-semibold">
                          {col.region}, {col.country}
                        </span>
                        <h3 className="font-heading text-2xl font-bold leading-tight group-hover:text-brand-gold transition-colors">
                          {col.city}
                        </h3>
                      </div>

                      <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {col.tagline}
                      </p>

                      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                        <span className="text-white/70">Avg. Price:</span>
                        <span className="text-brand-gold font-bold">{col.averagePrice}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Progress Bar Strip */}
          <div className="section-container pt-3 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-brand-gold font-bold text-[11px]">SCROLL TO EXPLORE LOCATIONS</span>
              <span>•</span>
              <span className="text-[11px]">01 / 04 LOCATIONS</span>
            </div>
            <div className="w-48 h-1 rounded-full bg-border overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-brand-gold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Responsive Touch Grid */}
      <div className="block md:hidden section-container py-16 space-y-8">
        <MotionFadeIn>
          <div className="space-y-2 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Locations</Badge>
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Explore Properties by Location
            </h2>
            <p className="text-sm text-muted-foreground">
              Discover homes in premier destinations known for exceptional architecture and lifestyle.
            </p>
          </div>
        </MotionFadeIn>

        <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {neighborhoodCollections.map((col) => (
            <MotionStaggerItem key={col.id}>
              <Link
                href={`/properties?location=${col.id}`}
                className="group relative h-80 rounded-card overflow-hidden border border-border shadow-md block"
              >
                <Image
                  src={col.imageUrl}
                  alt={col.city}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold text-brand-gold border border-brand-gold/30">
                    {col.activeListingsCount} Properties
                  </span>
                  <div className="h-7 w-7 rounded-full bg-black/60 flex items-center justify-center text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-1.5">
                  <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold font-semibold">
                    {col.region}, {col.country}
                  </span>
                  <h3 className="font-heading text-xl font-bold leading-tight">
                    {col.city}
                  </h3>
                  <div className="pt-1.5 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/70">Avg. Price:</span>
                    <span className="text-brand-gold font-bold">{col.averagePrice}</span>
                  </div>
                </div>
              </Link>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </section>
  );
}
