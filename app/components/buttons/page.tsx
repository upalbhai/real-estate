"use client";

import * as React from "react";
import {
  Heart,
  Share2,
  Calendar,
  Phone,
  ArrowRight,
  Download,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  buttonVariantsData,
  buttonSizesData,
  realEstateActionCards,
  themePreviewVariants,
} from "@/data";
import { Button } from "@/components/ui";

export default function ButtonsShowcasePage() {
  const [asyncLoading, setAsyncLoading] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);

  const handleSimulateAsync = () => {
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncLoading(false);
    }, 1500);
  };

  const getActionIcon = (iconName?: string) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "arrow-right":
        return <ArrowRight className="h-4 w-4" />;
      case "external-link":
        return <ExternalLink className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="gold">Interactive Component</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/button
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Button Variants &amp; Interactions
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          High-performance, accessible button system built for the real estate
          design language. Supports 8 variants, 5 sizes, icon slots, and async
          loading states.
        </p>
      </div>

      {/* 1. All Button Variants */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Style Variants
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Carefully calibrated for contrast in both light and dark themes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buttonVariantsData.map((v) => (
            <div
              key={v.name}
              className="rounded-control border border-border bg-surface-secondary/30 p-4 flex flex-col justify-between gap-4"
            >
              <div>
                <span className="text-xs font-mono text-brand-gold font-semibold uppercase">
                  {v.name}
                </span>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {v.desc}
                </p>
              </div>
              <div className="pt-2">
                <Button variant={v.name} fullWidth>
                  {v.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sizes */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Size Progression
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Ranging from compact card action controls to hero banner CTAs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {buttonSizesData.map((s) => (
            <Button key={s.size} size={s.size} variant="primary">
              {s.label}
            </Button>
          ))}
        </div>
      </section>

      {/* 3. Real Estate Action Contexts (Icons & Slots) */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Real Estate Action Patterns
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Common real estate use-cases featuring left/right icons and icon-only
            buttons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mapped Action Pattern Card 1 */}
          <div className="rounded-control border border-border p-5 space-y-3 bg-surface-secondary/30">
            <h3 className="text-sm font-semibold text-foreground">
              {realEstateActionCards[0].title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {realEstateActionCards[0].actions.map((act) => (
                <Button
                  key={act.label}
                  variant={act.variant}
                  leftIcon={act.iconPosition === "left" ? getActionIcon(act.iconName) : undefined}
                  rightIcon={act.iconPosition === "right" ? getActionIcon(act.iconName) : undefined}
                  fullWidth={act.fullWidth}
                >
                  {act.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Interactive Property Engagement Pattern */}
          <div className="rounded-control border border-border p-5 space-y-3 bg-surface-secondary/30">
            <h3 className="text-sm font-semibold text-foreground">
              Property Engagement
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={bookmarked ? "accent" : "secondary"}
                leftIcon={
                  <Heart
                    className={`h-4 w-4 ${bookmarked ? "fill-current text-error" : ""
                      }`}
                  />
                }
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? "Saved to Favorites" : "Save Property"}
              </Button>

              <Button
                variant="secondary"
                size="icon"
                aria-label="Share property"
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                aria-label="Download floor plan"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mapped Action Pattern Card 2 */}
          <div className="rounded-control border border-border p-5 space-y-3 bg-surface-secondary/30">
            <h3 className="text-sm font-semibold text-foreground">
              {realEstateActionCards[1].title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {realEstateActionCards[1].actions.map((act) => (
                <Button
                  key={act.label}
                  variant={act.variant}
                  leftIcon={act.iconPosition === "left" ? getActionIcon(act.iconName) : undefined}
                  rightIcon={act.iconPosition === "right" ? getActionIcon(act.iconName) : undefined}
                  fullWidth={act.fullWidth}
                >
                  {act.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive States (Loading & Disabled) */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Interactive States
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Loading spinners, disabled states, and dynamic status feedback.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            isLoading={asyncLoading}
            onClick={handleSimulateAsync}
          >
            {asyncLoading ? "Submitting Inquiry..." : "Click to Test Async Loading"}
          </Button>

          <Button variant="accent" isLoading>
            Always Loading
          </Button>

          <Button variant="primary" disabled>
            Disabled Primary
          </Button>

          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>

          <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Remove Listing
          </Button>
        </div>
      </section>

      {/* 5. Light vs Dark Theme Preview Comparison */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Dual-Theme Visual Test
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Forced Light Mode box vs Forced Dark Mode box to verify contrast.
            </p>
          </div>
          <Badge variant="available">Contrast Compliant</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forced Light Card */}
          <div className="rounded-card border border-[#E2DED4] bg-[#F5F2EB] text-[#252820] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2DED4] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#68685F]">
                Light Canvas (#F5F2EB)
              </span>
              <span className="text-[11px] font-mono text-[#858B70]">
                charcoal + gold accents
              </span>
            </div>
            <p className="text-xs text-[#68685F]">
              Primary button renders deep Charcoal with white text. Accent button
              renders Gold with dark text.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {themePreviewVariants.map((item) => (
                <Button key={item.variant} variant={item.variant} size="sm">
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Forced Dark Card */}
          <div className="rounded-card border border-[#3A4036] bg-[#171A16] text-[#F5F2EB] p-6 space-y-4 shadow-xs dark">
            <div className="flex items-center justify-between border-b border-[#3A4036] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5C5B9]">
                Dark Canvas (#171A16)
              </span>
              <span className="text-[11px] font-mono text-[#A4AC91]">
                olive + gold accents
              </span>
            </div>
            <p className="text-xs text-[#C5C5B9]">
              Primary button smoothly transitions to Olive with Charcoal text for
              luxurious low-glare visibility.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {themePreviewVariants.map((item) => (
                <Button key={item.variant} variant={item.variant} size="sm">
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
