"use client";

import * as React from "react";
import {
  LayoutGrid,
  List,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PropertyCard } from "@/components/ui/property-card";
import { AgentCard } from "@/components/ui/agent-card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockPropertyCards,
  mockAgentCards,
  mockStatCards,
  cardPrimitiveVariants,
} from "@/data";

export default function CardsShowcasePage() {
  const [propertyLayout, setPropertyLayout] = React.useState<"grid" | "horizontal">("grid");
  const [activePropertyId, setActivePropertyId] = React.useState<string | null>(null);

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="gold">Component Architecture</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/card, property-card, agent-card, stat-card
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Luxury Card Architecture
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Comprehensive card system designed specifically for prime real estate.
          Includes modular Card primitives, responsive Property Cards (Grid &amp; Horizontal),
          luxury Agent Profiles, and Market Stat metrics.
        </p>
      </div>

      {/* 1. Market Statistics Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Market Performance Metrics
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">StatCard Component</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStatCards.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* 2. Property Cards System (Interactive Grid vs Horizontal Switcher) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Prime Property Cards
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Supports image hover zoom, status badges, specifications, interactive favorites, and responsive dual layouts.
            </p>
          </div>

          {/* Layout Toggle Buttons */}
          <div className="flex items-center gap-1.5 rounded-control border border-border bg-surface-secondary p-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPropertyLayout("grid")}
              className={`flex items-center gap-1.5 rounded-[0.45rem] px-3 py-1.5 text-xs font-medium transition-all ${
                propertyLayout === "grid"
                  ? "bg-surface text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid View</span>
            </button>
            <button
              type="button"
              onClick={() => setPropertyLayout("horizontal")}
              className={`flex items-center gap-1.5 rounded-[0.45rem] px-3 py-1.5 text-xs font-medium transition-all ${
                propertyLayout === "horizontal"
                  ? "bg-surface text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Horizontal List</span>
            </button>
          </div>
        </div>

        {/* Selected Dossier Feedback */}
        {activePropertyId && (
          <div className="rounded-control border border-brand-gold/40 bg-brand-gold/10 p-3.5 flex items-center justify-between text-xs text-foreground animate-fadeIn">
            <span>
              Inspecting detailed prospectus for ID:{" "}
              <strong className="text-brand-gold font-mono">{activePropertyId}</strong>
            </span>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setActivePropertyId(null)}
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Cards Presentation */}
        {propertyLayout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPropertyCards.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                variant="grid"
                onViewDetails={(id) => setActivePropertyId(id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockPropertyCards.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                variant="horizontal"
                onViewDetails={(id) => setActivePropertyId(id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. Base Card Primitive Variants */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Card Primitives System
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Standard modular components: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardPrimitiveVariants.map((item) => (
            <Card key={item.id} variant={item.variant}>
              <CardHeader border>
                <div className="flex items-center justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  {item.badge && (
                    <Badge variant={item.badge.variant}>{item.badge.text}</Badge>
                  )}
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-2 text-xs text-muted-foreground">
                <p>{item.content}</p>
              </CardContent>
              <CardFooter border>
                <Button
                  size="xs"
                  variant={item.actionVariant}
                  rightIcon={item.hasActionIcon ? <ArrowRight className="h-3 w-3" /> : undefined}
                >
                  {item.actionText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Luxury Agent Cards */}
      <section className="space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Listing Directors &amp; Partners
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            AgentCard components featuring career track records, ratings, and direct outreach actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgentCards.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onContact={(id) => alert(`Connecting with broker ID: ${id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
