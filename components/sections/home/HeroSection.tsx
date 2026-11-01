"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Sparkles,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { startNavigationLoading } from "@/components/navigation/NavigationLoadingBar";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import {
  heroMetrics,
  heroFilterLocations,
  heroFilterPropertyTypes,
  heroFilterPriceRanges,
} from "@/data";

export function HeroSection() {
  const router = useRouter();
  const heroRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked parallax transformations
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [selectedPrice, setSelectedPrice] = React.useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocation !== "all") params.set("location", selectedLocation);
    if (selectedType !== "all") params.set("type", selectedType);
    if (selectedPrice !== "all") params.set("price", selectedPrice);

    const query = params.toString();
    startNavigationLoading();
    router.push(`/properties${query ? `?${query}` : ""}`);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-primary text-white"
    >
      {/* Background Architectural Imagery with Parallax-grade overlay */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Multilayer Luxury Gradient Overlay for flawless contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />
      </motion.div>

      {/* Main Content Area with Scroll Depth Translation */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="section-container relative z-20 pt-20 sm:pt-28 pb-20 sm:pb-24 flex-1 flex flex-col justify-center space-y-8 max-w-5xl will-change-transform"
      >
        {/* Curatorial Pill */}
        <MotionFadeIn delay={0.05}>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/50 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-brand-gold backdrop-blur-md self-start">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-special tracking-wider uppercase text-[11px]">
              Curated Global Architecture
            </span>
          </div>
        </MotionFadeIn>

        {/* Large Display Typography */}
        <MotionFadeIn delay={0.15}>
          <div className="space-y-4">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider leading-[0.95] text-white drop-shadow-md">
              ARCHITECTURAL PROWESS.
              <br />
              <span className="text-brand-gold">UNCOMPROMISING</span> LUXURY.
            </h1>

            <p className="font-body text-base sm:text-xl text-white/85 max-w-2xl leading-relaxed">
              Representing the world&apos;s most significant residential masterworks,
              off-market compounds, and trophy penthouses across premier international capitals.
            </p>
          </div>
        </MotionFadeIn>

        {/* Floating Luxury Filter Bar with High-Opacity Glassmorphism */}
        <MotionFadeIn delay={0.25}>
          <div className="dark p-5 sm:p-6 rounded-card border border-white/20 bg-[#161914]/95 backdrop-blur-xl shadow-2xl space-y-4 relative z-30">
            <div className="flex items-center justify-between text-xs text-white/80 pb-2 border-b border-white/10">
              <span className="font-special text-[11px] uppercase tracking-wider text-brand-gold font-semibold flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" />
                <span>Confidential Portfolio Search</span>
              </span>
              <span className="font-mono text-[11px] text-white/60 hidden sm:inline-block">
                18 Off-Market Dossiers Active
              </span>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/70 font-special font-semibold mb-1 block">
                  Prime Territory
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                  options={heroFilterLocations}
                  className="w-full"
                  triggerClassName="bg-white/10 hover:bg-white/15 border-white/20 text-white font-medium"
                  contentClassName="bg-[#1a1d18] border-white/20 text-white shadow-2xl opacity-100 z-[100]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/70 font-special font-semibold mb-1 block">
                  Classification
                </label>
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                  options={heroFilterPropertyTypes}
                  className="w-full"
                  triggerClassName="bg-white/10 hover:bg-white/15 border-white/20 text-white font-medium"
                  contentClassName="bg-[#1a1d18] border-white/20 text-white shadow-2xl opacity-100 z-[100]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/70 font-special font-semibold mb-1 block">
                  Valuation Tier
                </label>
                <Select
                  value={selectedPrice}
                  onValueChange={setSelectedPrice}
                  options={heroFilterPriceRanges}
                  className="w-full"
                  triggerClassName="bg-white/10 hover:bg-white/15 border-white/20 text-white font-medium"
                  contentClassName="bg-[#1a1d18] border-white/20 text-white shadow-2xl opacity-100 z-[100]"
                />
              </div>

              <div className="flex items-end sm:col-span-3 lg:col-span-1">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  leftIcon={<Search className="h-4 w-4" />}
                  className="w-full justify-center h-10 font-semibold"
                >
                  Explore Portfolio
                </Button>
              </div>
            </form>
          </div>
        </MotionFadeIn>
        {/* Animated Scroll to Explore Prompt */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="hidden sm:flex items-center gap-3 pt-2 text-white/70 pointer-events-none select-none"
        >
          <div className="w-5 h-8 rounded-full border border-brand-gold/60 p-1 flex justify-center items-start">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-brand-gold"
            />
          </div>
          <span className="text-[10px] font-special uppercase tracking-widest text-brand-gold font-semibold">
            Scroll to explore premier architecture
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom Key Metrics Strip with Stagger Reveal */}
      <div className="relative z-10 border-t border-white/15 bg-black/70 backdrop-blur-md">
        <div className="section-container py-6">
          <MotionStaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            {heroMetrics.map((metric) => (
              <MotionStaggerItem key={metric.label} className="space-y-0.5">
                <div className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-brand-gold">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider font-special">
                  {metric.label}
                </div>
                <div className="text-[11px] text-white/60 font-body">
                  {metric.sublabel}
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </div>
      </div>
    </section>
  );
}
