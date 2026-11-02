"use client";

import * as React from "react";
import { Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import { clientTestimonials } from "@/data";

export function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-surface-secondary/30 py-20 sm:py-24">
      <div className="section-container space-y-12">
        {/* Section Header */}
        <MotionFadeIn>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="gold">Testimonials</Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              What Our Clients Say
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Reflections from clients who trusted Aura Estates with finding or selling their architectural residences.
            </p>
          </div>
        </MotionFadeIn>

        {/* Testimonials 3-Card Grid with Stagger Reveal */}
        <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientTestimonials.map((t) => (
            <MotionStaggerItem key={t.id}>
              <Card
                variant="default"
                className="h-full p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-surface border border-border hover:border-brand-gold/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-brand-gold">
                    <Quote className="h-6 w-6 opacity-75" />
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-1">
                  <span className="text-xs font-semibold text-foreground block">
                    {t.principalTitle}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>{t.transactionContext}</span>
                    <span className="text-brand-gold">{t.year}</span>
                  </div>
                </div>
              </Card>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </section>
  );
}
