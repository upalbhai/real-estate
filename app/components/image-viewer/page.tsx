"use client";

import * as React from "react";
import {
  Maximize2,
  Layers,
  Image as ImageIcon,
  Sliders,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ImageViewer,
  ImageGalleryViewer,
} from "@/components/ui/image-viewer";
import { PropertyCard } from "@/components/ui/property-card";
import {
  imageViewerShowcaseItems,
  imageViewerGalleryPlates,
  imageViewerFeatureCards,
  mockPropertyCards,
} from "@/data";

export default function ImageViewerShowcasePage() {
  const [selectedAspect, setSelectedAspect] = React.useState<"wide" | "video" | "square">("wide");

  const activeShowcaseItem =
    imageViewerShowcaseItems.find((item) => item.aspectRatio === selectedAspect) ??
    imageViewerShowcaseItems[0];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="gold">Media Architecture</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/image-viewer
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Luxury Image &amp; Gallery Viewer
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          High-performance, gesture-driven photo viewing suite powered by{" "}
          <code className="text-brand-gold font-mono font-semibold">react-photo-view</code>.
          Supports pinch-to-zoom, smooth pan gestures, 90° orientation toggles,
          and multi-plate architectural slideshows for trophy properties.
        </p>
      </div>

      {/* 1. Feature Architecture Pillars */}
      <section className="space-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {imageViewerFeatureCards.map((feat) => (
            <Card key={feat.id} variant="default" className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-foreground">
                  {feat.title}
                </span>
                <Badge variant="gold" size="sm">
                  {feat.badge}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feat.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Standalone ImageViewer Component */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Standalone ImageViewer Component
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Single-image component with responsive aspect ratios, hover zoom badges, and interactive click-to-zoom lightbox.
            </p>
          </div>

          {/* Aspect Ratio Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-control bg-surface-secondary/60 border border-border">
            {(["wide", "video", "square"] as const).map((aspect) => (
              <Button
                key={aspect}
                type="button"
                variant={selectedAspect === aspect ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setSelectedAspect(aspect)}
                className={cn(
                  "px-3 py-1 text-xs font-mono font-medium rounded-control capitalize h-auto",
                  selectedAspect === aspect
                    ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {aspect}
              </Button>
            ))}
          </div>
        </div>

        {/* Live Interactive Preview */}
        <div className="rounded-card border border-border bg-surface p-4 sm:p-6 space-y-4">
          <ImageViewer
            src={activeShowcaseItem.src}
            alt={activeShowcaseItem.title}
            aspectRatio={selectedAspect}
            zoomBadgeText="Inspect High-Res"
          >
            {/* Custom Overlay Details */}
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold">
                  {activeShowcaseItem.subtitle}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold leading-tight drop-shadow-xs">
                  {activeShowcaseItem.title}
                </h3>
                <span className="text-xs text-white/80">{activeShowcaseItem.location}</span>
              </div>
              <div className="font-mono text-lg font-bold text-brand-gold drop-shadow-xs">
                {activeShowcaseItem.price}
              </div>
            </div>
          </ImageViewer>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>Click image to trigger full-screen lightbox inspection</span>
            <span className="text-brand-gold">Aspect: {selectedAspect}</span>
          </div>
        </div>
      </section>

      {/* 3. Multi-Plate Architectural Gallery Viewer */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Multi-Plate Architectural Gallery Viewer
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Complete property dossier viewer rendering the primary perspective alongside interactive thumbnail plates.
          </p>
        </div>

        <div className="rounded-card border border-border bg-surface p-4 sm:p-6">
          <ImageGalleryViewer
            images={imageViewerGalleryPlates}
            heroHeight="h-72 sm:h-96"
            thumbnailColumns={4}
          />
        </div>
      </section>

      {/* 4. Integrated with Luxury PropertyCard */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              PropertyCard Integration (Grid &amp; Horizontal)
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Both horizontal and vertical property cards have built-in image zoom inspection without conflicting with card click routes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grid Card Example */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Vertical Grid Variant</span>
            <PropertyCard property={mockPropertyCards[0]} variant="grid" />
          </div>

          {/* Horizontal Card Example */}
          <div className="lg:col-span-2 space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Horizontal Media Row Variant</span>
            <PropertyCard property={mockPropertyCards[1]} variant="horizontal" />
          </div>
        </div>
      </section>

      {/* 5. Composable Primitives API Documentation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-brand-gold" />
          <h2 className="font-heading text-xl font-bold text-foreground">
            Composable Primitives API
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 space-y-3 bg-surface-secondary/30">
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="sm">Provider</Badge>
              <span className="font-mono text-xs font-bold text-foreground">
                &lt;ImageViewerProvider&gt;
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Provides the React context boundary for a collection of images. Coordinates smooth animations, backdrop mask opacity, toolbar controls, and keyboard navigation.
            </p>
            <div className="p-3 rounded-control bg-primary/10 border border-border text-[11px] font-mono text-foreground space-y-1">
              <div>maskOpacity: number (default: 0.88)</div>
              <div>bannerVisible: boolean (default: true)</div>
              <div>speed: (type: number) =&gt; number</div>
            </div>
          </Card>

          <Card className="p-5 space-y-3 bg-surface-secondary/30">
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="sm">Item</Badge>
              <span className="font-mono text-xs font-bold text-foreground">
                &lt;ImageViewerItem&gt;
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Wraps any visual trigger node (thumbnail, hero container, or icon). Registering with the nearest provider allows it to launch the interactive viewer on click.
            </p>
            <div className="p-3 rounded-control bg-primary/10 border border-border text-[11px] font-mono text-foreground space-y-1">
              <div>src: string (required image URL)</div>
              <div>triggers: (&apos;onClick&apos; | &apos;onDoubleClick&apos;)[]</div>
              <div>children: React.ReactElement</div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
