"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AgentCard } from "@/components/ui/agent-card";
import {
  MotionFadeIn,
  MotionScale,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import {
  atelierValueProps,
  globalOffices,
  mockAgentCards,
  heroMetrics,
} from "@/data";

export function AboutContent() {
  return (
    <div className="space-y-20 py-12 sm:py-16 animate-fadeIn">
      {/* Hero Section */}
      <MotionFadeIn>
        <div className="section-container space-y-6 max-w-4xl text-center mx-auto">
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
            Distinctive Architecture. Exceptional Living.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
            Aura Estates was founded with a singular purpose: to provide refined, personalized real estate advisory for exceptional properties. We represent distinctive residential architecture across premier global destinations.
          </p>
        </div>
      </MotionFadeIn>

      {/* Hero Architectural Image Banner with Scale Motion */}
      <div className="section-container">
        <MotionScale initialScale={0.97}>
          <div className="relative h-72 sm:h-96 lg:h-[450px] w-full rounded-card overflow-hidden border border-border shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85"
              alt="Aura Estates Architecture"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold font-semibold">
                  Curated Architecture
                </span>
                <h3 className="font-heading text-2xl font-bold">
                  Exceptional Living Across Key Destinations
                </h3>
              </div>
              <div className="font-mono text-xs text-white/80">
                Beverly Hills • New York • Miami • London
              </div>
            </div>
          </div>
        </MotionScale>
      </div>

      {/* Core Metrics Strip */}
      <div className="border-y border-border bg-surface-secondary/30 py-10">
        <div className="section-container">
          <MotionStaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            {heroMetrics.map((metric) => (
              <MotionStaggerItem key={metric.label} className="space-y-1">
                <div className="font-heading text-3xl font-bold text-brand-gold">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-special">
                  {metric.label}
                </div>
                <div className="text-[11px] text-muted-foreground font-body">
                  {metric.sublabel}
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </div>
      </div>

      {/* 4 Pillars of Representation */}
      <div className="section-container space-y-10">
        <MotionFadeIn>
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <Badge variant="gold">Our Approach</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Four Principles of Our Advisory
            </h2>
            <p className="text-sm text-muted-foreground">
              How our advisors ensure personalized guidance and complete discretion across every transaction.
            </p>
          </div>
        </MotionFadeIn>

        <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {atelierValueProps.map((prop) => (
            <MotionStaggerItem key={prop.id}>
              <Card className="h-full p-6 sm:p-7 space-y-3 bg-surface border border-border hover:border-brand-gold/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-brand-gold">
                    {prop.number}
                  </span>
                  <Badge variant="gold" size="sm">
                    {prop.badge}
                  </Badge>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {prop.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </Card>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>

      {/* Senior Leadership & Team */}
      <div className="section-container space-y-8">
        <MotionFadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-4 border-b border-border">
            <div>
              <Badge variant="gold">Our Advisors</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-1">
                Leadership &amp; Advisors
              </h2>
            </div>
            <Link href="/contact">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Contact Our Team
              </Button>
            </Link>
          </div>
        </MotionFadeIn>

        <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockAgentCards.map((agent) => (
            <MotionStaggerItem key={agent.id}>
              <AgentCard agent={agent} />
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>

      {/* Global Locations */}
      <div className="section-container space-y-8 pb-10">
        <MotionFadeIn>
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <Badge variant="gold">Locations</Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Our Office Locations
            </h2>
            <p className="text-xs text-muted-foreground">
              Local market authority backed by global client connections.
            </p>
          </div>
        </MotionFadeIn>

        <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {globalOffices.map((office) => (
            <MotionStaggerItem key={office.city}>
              <div className="h-full p-5 rounded-control border border-border bg-surface space-y-2 hover:border-brand-gold/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-foreground">
                    {office.city}
                  </span>
                  <Globe2 className="h-4 w-4 text-brand-gold" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {office.address}
                </p>
                <div className="pt-2 border-t border-border/80 flex flex-col text-[11px] font-mono text-muted-foreground space-y-0.5">
                  <span>{office.phone}</span>
                  <span className="text-brand-gold">{office.email}</span>
                </div>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </div>
  );
}

