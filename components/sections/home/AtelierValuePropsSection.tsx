"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import { atelierValueProps } from "@/data";

export function AtelierValuePropsSection() {
  return (
    <section id="about" className="border-t border-border bg-surface-secondary/20 py-20 sm:py-24 scroll-mt-24">
      <div className="section-container space-y-12">
        {/* Section Header */}
        <MotionFadeIn>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="gold">About Aura Estates</Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Our Guiding Principles
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Providing personalized advisory, trusted discretion, and architectural expertise to clients seeking exceptional properties.
            </p>
          </div>
        </MotionFadeIn>

        {/* 4 Pillars Grid with Stagger Reveal */}
        <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {atelierValueProps.map((prop) => (
            <MotionStaggerItem key={prop.id}>
              <Card
                variant="default"
                className="h-full p-6 sm:p-7 space-y-4 hover:border-brand-gold/50 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Top Row: Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-brand-gold/40 group-hover:text-brand-gold transition-colors">
                    {prop.number}
                  </span>
                  <Badge variant="gold" size="sm">
                    {prop.badge}
                  </Badge>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 relative z-10">
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-brand-gold transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                {/* Decorative Fiduciary Numeral Watermark */}
                <div className="absolute -bottom-5 -right-3 font-mono text-7xl font-black text-foreground/[0.03] select-none pointer-events-none group-hover:text-brand-gold/10 transition-colors">
                  {prop.number}
                </div>
              </Card>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </section>
  );
}
