"use client";

import * as React from "react";
import Image from "next/image";
import {
  Compass,
  Copy,
  Check,
  Code2,
  Sliders,
  Sparkles,
  Layers,
  Home,
  Shield,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
  BreadcrumbSeparatorType,
  BreadcrumbVariant,
  BreadcrumbSize,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  breadcrumbShowcasePresets,
  breadcrumbSeparatorOptions,
  breadcrumbVariantOptions,
  breadcrumbSizeOptions,
  breadcrumbPropsDocs,
  breadcrumbUsageSnippets,
} from "@/data";

export default function BreadcrumbsShowcasePage() {
  // Live Playground State
  const [selectedPresetId, setSelectedPresetId] = React.useState<string>(
    breadcrumbShowcasePresets[0].id
  );
  const [selectedSeparator, setSelectedSeparator] =
    React.useState<BreadcrumbSeparatorType>("chevron");
  const [selectedVariant, setSelectedVariant] =
    React.useState<BreadcrumbVariant>("gold");
  const [selectedSize, setSelectedSize] = React.useState<BreadcrumbSize>("md");
  const [showIcons, setShowIcons] = React.useState<boolean>(true);
  const [limitMaxItems, setLimitMaxItems] = React.useState<boolean>(false);

  // Snippet Copy State
  const [activeSnippetId, setActiveSnippetId] = React.useState<string>(
    breadcrumbUsageSnippets[0].id
  );
  const [copied, setCopied] = React.useState<boolean>(false);

  const activePreset =
    breadcrumbShowcasePresets.find((p) => p.id === selectedPresetId) ??
    breadcrumbShowcasePresets[0];

  const activeSnippet =
    breadcrumbUsageSnippets.find((s) => s.id === activeSnippetId) ??
    breadcrumbUsageSnippets[0];

  // Prepare items based on showIcons flag
  const playgroundItems = React.useMemo(() => {
    return activePreset.items.map((item) => ({
      ...item,
      icon: showIcons ? item.icon : undefined,
    }));
  }, [activePreset, showIcons]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">UI Navigation Component</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/breadcrumb
          </span>
          <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
            WAI-ARIA Compliant
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Breadcrumbs &amp; Wayfinding Navigation
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl font-body leading-relaxed">
          Structured hierarchical path trails for architectural portfolios, multi-tier CRM asset registries, and editorial neighborhood directories with responsive ellipsis collapsing.
        </p>
      </div>

      {/* 1. Interactive Live Playground */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
          <div className="flex items-center gap-2.5">
            <Sliders className="h-5 w-5 text-brand-gold" />
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Interactive Breadcrumb Sandbox
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Customize hierarchical presets, separators, typography scales, and token styling in real time.
              </p>
            </div>
          </div>
          <Badge variant="outline" size="sm">
            Live Preview
          </Badge>
        </div>

        {/* Live Preview Display Box */}
        <div
          className={cn(
            "rounded-card border p-6 sm:p-8 transition-all min-h-[140px] flex flex-col justify-center",
            selectedVariant === "glass"
              ? "relative overflow-hidden bg-brand-charcoal text-white border-brand-gold/30"
              : "bg-surface-secondary/40 border-border"
          )}
        >
          {selectedVariant === "glass" && (
            <div className="absolute inset-0 z-0 opacity-25">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Background"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>
          )}

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span className="uppercase tracking-wider">
                Preset: {activePreset.name}
              </span>
              <span>
                Separator: <strong className="text-brand-gold capitalize">{selectedSeparator}</strong> • Variant: <strong className="text-brand-gold capitalize">{selectedVariant}</strong>
              </span>
            </div>

            {/* The Live Breadcrumbs Instance */}
            <Breadcrumbs
              items={playgroundItems}
              separator={selectedSeparator}
              variant={selectedVariant}
              size={selectedSize}
              maxItems={limitMaxItems ? 3 : undefined}
            />
          </div>
        </div>

        {/* Playground Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Preset Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Select Preset Trail:
            </label>
            <div className="space-y-1.5">
              {breadcrumbShowcasePresets.map((preset) => (
                <Button
                  key={preset.id}
                  type="button"
                  size="xs"
                  variant={selectedPresetId === preset.id ? "primary" : "ghost"}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={cn(
                    "w-full justify-start text-xs font-medium h-auto py-2 px-3 rounded-control border transition-all text-left",
                    selectedPresetId === preset.id
                      ? "border-brand-gold/50 shadow-xs font-semibold"
                      : "border-border/60 text-muted-foreground hover:bg-surface-secondary"
                  )}
                >
                  <div className="truncate">
                    <div className="truncate">{preset.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground truncate">
                      {preset.category}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Separator Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Separator Symbol:
            </label>
            <div className="space-y-1.5">
              {breadcrumbSeparatorOptions.map((sep) => (
                <Button
                  key={sep.id}
                  type="button"
                  size="xs"
                  variant={selectedSeparator === sep.id ? "primary" : "ghost"}
                  onClick={() => setSelectedSeparator(sep.id)}
                  className={cn(
                    "w-full justify-between text-xs font-medium h-auto py-2 px-3 rounded-control border transition-all",
                    selectedSeparator === sep.id
                      ? "border-brand-gold/50 shadow-xs font-semibold"
                      : "border-border/60 text-muted-foreground hover:bg-surface-secondary"
                  )}
                >
                  <span>{sep.label}</span>
                  <span className="font-mono text-xs text-brand-gold font-bold px-1.5 py-0.5 rounded bg-surface-secondary">
                    {sep.symbol}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Token Style Variant:
            </label>
            <div className="space-y-1.5">
              {breadcrumbVariantOptions.map((varOpt) => (
                <Button
                  key={varOpt.id}
                  type="button"
                  size="xs"
                  variant={selectedVariant === varOpt.id ? "primary" : "ghost"}
                  onClick={() => setSelectedVariant(varOpt.id)}
                  className={cn(
                    "w-full justify-between text-xs font-medium h-auto py-2 px-3 rounded-control border transition-all",
                    selectedVariant === varOpt.id
                      ? "border-brand-gold/50 shadow-xs font-semibold"
                      : "border-border/60 text-muted-foreground hover:bg-surface-secondary"
                  )}
                >
                  <span>{varOpt.label}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface-secondary text-brand-gold">
                    {varOpt.badge}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Sizing & Feature Toggles */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Scale Size:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {breadcrumbSizeOptions.map((sz) => (
                  <Button
                    key={sz.id}
                    type="button"
                    size="xs"
                    variant={selectedSize === sz.id ? "gold" : "outline"}
                    onClick={() => setSelectedSize(sz.id)}
                    className={cn(
                      "text-xs font-mono uppercase h-8",
                      selectedSize === sz.id ? "font-bold" : "text-muted-foreground"
                    )}
                  >
                    {sz.id}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-border">
              <label className="text-xs font-semibold text-foreground">
                Options:
              </label>
              <Checkbox
                checked={showIcons}
                onCheckedChange={(c) => setShowIcons(!!c)}
                label="Show Leading Icons"
                description="Include category iconography"
              />
              <Checkbox
                checked={limitMaxItems}
                onCheckedChange={(c) => setLimitMaxItems(!!c)}
                label="Enforce maxItems={3}"
                description="Collapses intermediate crumbs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Separators Matrix Showcase */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Separator Delimiters
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Engineered with aria-hidden=&quot;true&quot; presentations so screen readers gracefully skip decorative delimiters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breadcrumbSeparatorOptions.map((sep) => (
            <div
              key={sep.id}
              className="rounded-control border border-border bg-surface-secondary/30 p-4 space-y-3 hover:border-brand-gold/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-brand-gold font-bold h-6 w-6 rounded bg-brand-gold/15 flex items-center justify-center">
                    {sep.symbol}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {sep.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  separator=&quot;{sep.id}&quot;
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {sep.description}
              </p>
              <div className="pt-2 border-t border-border/60">
                <Breadcrumbs
                  items={[
                    { label: "Atelier", href: "/", icon: Home },
                    { label: "Portfolio", href: "/properties" },
                    { label: "Sanctuary #402", isCurrent: true },
                  ]}
                  separator={sep.id}
                  variant="gold"
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Composable Subcomponents vs Props-Driven Pattern */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Compositional Flexibility
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Use the declarative &lt;Breadcrumbs items=&#123;...&#125; /&gt; for standard arrays, or compose atomic subcomponents for tailored layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Props Showcase */}
          <div className="rounded-control border border-border bg-surface-secondary/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                1. High-Level Declarative Array
              </span>
              <Badge variant="gold" size="sm">Recommended</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Best for standard listings, dynamic route params, and auto-collapsing trails.
            </p>
            <div className="p-3.5 rounded-control bg-surface border border-border">
              <Breadcrumbs
                items={[
                  { label: "Executive Desk", href: "/admin", icon: Shield },
                  { label: "Registry", href: "/admin/properties" },
                  { label: "Trophy Penthouses", badge: "Exclusive", isCurrent: true },
                ]}
                variant="gold"
                separator="chevron"
              />
            </div>
            <pre className="text-[11px] font-mono p-3 rounded-control bg-surface-secondary text-foreground overflow-x-auto border border-border">
              {`<Breadcrumbs
  items={[
    { label: "Executive Desk", href: "/admin", icon: Shield },
    { label: "Registry", href: "/admin/properties" },
    { label: "Trophy Penthouses", badge: "Exclusive", isCurrent: true },
  ]}
  variant="gold"
  separator="chevron"
/>`}
            </pre>
          </div>

          {/* Semantic Composition Showcase */}
          <div className="rounded-control border border-border bg-surface-secondary/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                2. Semantic Composable Subcomponents
              </span>
              <Badge variant="outline" size="sm">W3C Strict</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Best when inserting custom popovers, buttons, tooltips, or dynamic React slots.
            </p>
            <div className="p-3.5 rounded-control bg-surface border border-border">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex items-center gap-1.5">
                      <Home className="h-3.5 w-3.5 text-brand-gold" />
                      <span>Atelier</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator type="slash" />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/properties">Portfolio</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator type="slash" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-brand-gold">
                      Penthouse 88
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <pre className="text-[11px] font-mono p-3 rounded-control bg-surface-secondary text-foreground overflow-x-auto border border-border">
              {`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Atelier</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator type="slash" />
    <BreadcrumbItem>
      <BreadcrumbPage>Penthouse 88</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Component Props Documentation Table */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Component Properties &amp; API
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Complete TypeScript prop definitions for the &lt;Breadcrumbs /&gt; component.
          </p>
        </div>

        <div className="overflow-x-auto border border-border rounded-control">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary/70 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-4 font-mono">Prop</th>
                <th className="py-2.5 px-4 font-mono">Type</th>
                <th className="py-2.5 px-4 font-mono">Default</th>
                <th className="py-2.5 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {breadcrumbPropsDocs.map((doc) => (
                <tr key={doc.name} className="hover:bg-surface-secondary/40 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-semibold text-brand-gold">
                    {doc.name}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground">
                    {doc.type}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs text-foreground">
                    {doc.default}
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground">
                    {doc.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Implementation Usage Snippets */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Implementation Usage Examples
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Production-ready examples ready to copy-paste into property dossiers, CRM routes, and photo headers.
            </p>
          </div>
          <Badge variant="gold">Copyable Code</Badge>
        </div>

        {/* Snippet Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {breadcrumbUsageSnippets.map((snippet) => (
            <Button
              key={snippet.id}
              type="button"
              size="sm"
              variant={activeSnippetId === snippet.id ? "primary" : "ghost"}
              onClick={() => setActiveSnippetId(snippet.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-control text-xs font-mono font-medium h-auto",
                activeSnippetId === snippet.id
                  ? "shadow-xs font-bold"
                  : "bg-surface-secondary/40 text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
              )}
            >
              {snippet.title}
            </Button>
          ))}
        </div>

        {/* Active Snippet Code Block */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{activeSnippet.description}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(activeSnippet.code)}
              leftIcon={
                copied ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )
              }
              className="gap-1.5 text-xs font-medium"
            >
              {copied ? "Copied to Clipboard" : "Copy Snippet"}
            </Button>
          </div>

          <div className="relative">
            <pre className="p-4 sm:p-5 rounded-control bg-surface-secondary/70 border border-border text-xs font-mono text-foreground overflow-x-auto leading-relaxed">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
