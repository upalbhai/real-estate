"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/ui/agent-card";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import { mockAgentCards } from "@/data";

export function AdvisorsSection() {
  return (
    <section id="team" className="section-container py-20 sm:py-24 space-y-10 scroll-mt-24">
      {/* Section Header */}
      <MotionFadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Our Advisors</Badge>
              <span className="text-xs text-muted-foreground font-mono">
                EXPERIENCED PROFESSIONALS
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Meet Our Team
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Dedicated advisors offering personalized guidance, deep local market knowledge, and attentive service across every transaction.
            </p>
          </div>

          <Link href="/contact" className="self-start sm:self-end">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Contact Our Team
            </Button>
          </Link>
        </div>
      </MotionFadeIn>

      {/* Agents Cards Grid with Staggered Scroll Animation */}
      <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgentCards.map((agent) => (
          <MotionStaggerItem key={agent.id}>
            <AgentCard agent={agent} />
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    </section>
  );
}
