"use client";

import * as React from "react";
import { Tag, Copy, Check, Code2, Sliders } from "lucide-react";
import { Badge, BadgeVariant, BadgeSize } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  statusBadgesData,
  badgeSizesData,
  badgePropsDocs,
  badgeUsageSnippet,
} from "@/data";

export default function BadgesShowcasePage() {
  const [pulseDot, setPulseDot] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [customText, setCustomText] = React.useState("Private Vault");
  const [selectedVariant, setSelectedVariant] = React.useState<BadgeVariant>("gold");
  const [selectedSize, setSelectedSize] = React.useState<BadgeSize>("md");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(badgeUsageSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">UI Token Component</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/badge
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Badges &amp; Status Indicators
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl font-body leading-relaxed">
          Curated status indicators, off-market security labels, and interactive pulse dots tailored for luxury real estate cards, data tables, and modal banners.
        </p>
      </div>

      {/* 1. Real Estate Status Taxonomy Matrix */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Real Estate Status Taxonomy
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Engineered for contrast compliance across ivory light canvas and deep obsidian dark themes.
            </p>
          </div>
          <Checkbox
            checked={pulseDot}
            onCheckedChange={(c) => setPulseDot(!!c)}
            label="Enable Pulse Dot"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusBadgesData.map((item) => (
            <div
              key={item.variant}
              className="rounded-control border border-border bg-surface-secondary/30 p-4 flex flex-col justify-between gap-4 hover:border-brand-gold/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-gold font-semibold uppercase">
                    {item.variant}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Token
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-start">
                <Badge variant={item.variant} dot={item.dot && pulseDot} size="md">
                  {item.label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive Badge Sandbox */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Interactive Badge Customizer
            </h2>
          </div>
          <Badge variant="gold">Sandbox</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-4 rounded-control border border-border bg-surface-secondary/30 p-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Label Text
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-3 py-1.5 rounded-control border border-border bg-surface text-xs text-foreground focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Select Variant
              </label>
              <div className="flex flex-wrap gap-1.5">
                {statusBadgesData.map((b) => (
                  <Button
                    key={b.variant}
                    type="button"
                    size="xs"
                    variant={selectedVariant === b.variant ? "primary" : "outline"}
                    onClick={() => setSelectedVariant(b.variant)}
                    className={cn(
                      "px-2.5 py-1 rounded-control text-xs font-mono h-auto",
                      selectedVariant === b.variant
                        ? "font-bold"
                        : "text-muted-foreground hover:bg-surface"
                    )}
                  >
                    {b.variant}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Scale Size
              </label>
              <div className="flex gap-2">
                {(["sm", "md", "lg"] as BadgeSize[]).map((s) => (
                  <Button
                    key={s}
                    type="button"
                    size="xs"
                    variant={selectedSize === s ? "gold" : "outline"}
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      "px-3 py-1 rounded-control text-xs font-mono uppercase h-auto",
                      selectedSize === s
                        ? "font-bold"
                        : "text-muted-foreground hover:bg-surface"
                    )}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="lg:col-span-6 p-8 rounded-control border border-border bg-surface flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
            <span className="text-[11px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
              Live Preview
            </span>
            <div className="p-4 rounded-control border border-border/80 bg-surface-secondary/40 shadow-xs">
              <Badge
                variant={selectedVariant}
                size={selectedSize}
                dot={pulseDot}
              >
                {customText || "Badge Label"}
              </Badge>
            </div>
            <code className="text-[11px] font-mono text-muted-foreground">
              {`<Badge variant="${selectedVariant}" size="${selectedSize}" dot={${pulseDot}}>`}
            </code>
          </div>
        </div>
      </section>

      {/* 3. Scale Sizes Comparison */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Scale Size Specifications
          </h2>
          <p className="text-xs text-muted-foreground">
            Three calibrated responsive scale options designed for card overlays, listings, and headers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badgeSizesData.map((demo) => (
            <div
              key={demo.size}
              className="p-5 rounded-control border border-border bg-surface-secondary/20 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-foreground">
                  {demo.label}
                </span>
                <span className="font-mono text-xs text-brand-gold">
                  size=&quot;{demo.size}&quot;
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {demo.recommendedFor}
              </p>
              <div className="pt-2">
                <Badge variant="gold" size={demo.size} dot>
                  Star Island Dossier
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Developer Code Usage Guide */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                How to Use in Your Components
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Import and use status tags directly in PropertyCard, Dossier views, or custom CRM widgets.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            leftIcon={
              copied ? (
                <Check className="h-3.5 w-3.5 text-success" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )
            }
            className="font-mono text-xs"
          >
            {copied ? "Copied!" : "Copy Snippet"}
          </Button>
        </div>

        <div className="relative rounded-card border border-border bg-[#141712] p-5 overflow-x-auto text-xs font-mono text-gray-200 shadow-md">
          <pre className="leading-relaxed">
            <code>{badgeUsageSnippet}</code>
          </pre>
        </div>
      </section>

      {/* 5. Props API Reference Table */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Badge Props API Reference
          </h2>
          <p className="text-xs text-muted-foreground">
            Complete TypeScript props specifications for the Badge primitive.
          </p>
        </div>

        <div className="overflow-x-auto rounded-control border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-special uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-3 px-4">Prop</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Default</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-body">
              {badgePropsDocs.map((row) => (
                <tr key={row.name} className="hover:bg-surface-secondary/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-brand-gold">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-muted-foreground">
                    {row.type}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">
                    {row.defaultVal}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground leading-relaxed">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
