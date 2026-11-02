"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionScale, ScrollParallax } from "@/components/ui/motion";

export function CtaBannerSection() {
  return (
    <section className="section-container py-20 sm:py-24">
      <MotionScale initialScale={0.96}>
        <div className="relative rounded-card overflow-hidden border border-border shadow-xl">
          {/* Background Image with Luxury Tint & Scroll Parallax */}
          <ScrollParallax offset={35} className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="Private Architectural Estate"
              fill
              sizes="100vw"
              className="object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/70" />
          </ScrollParallax>

          {/* Content Box */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-black/60 px-3.5 py-1 text-xs font-semibold text-brand-gold backdrop-blur-xs">
              <Lock className="h-3.5 w-3.5" />
              <span className="font-special text-[11px] uppercase tracking-wider">
                Personalized Advisory
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Looking for an Exceptional Home?
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed font-body">
              Whether you are looking to acquire a distinctive architectural residence or considering selling your property, our advisors provide personal, confidential guidance at every stage.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact">
                <Button
                  variant="gold"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Schedule a Consultation
                </Button>
              </Link>

              <Link href="/properties">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-black/40 text-white border-white/30 hover:bg-black/60"
                >
                  Explore Properties
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-white/70 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-gold" />
                <span>Confidential Guidance</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-brand-gold" />
                <span>Direct Inquiries: +1 (310) 880-9200</span>
              </span>
            </div>
          </div>
        </div>
      </MotionScale>
    </section>
  );
}
