import Link from "next/link";
import {
  SquareTerminal,
  TableProperties,
  ListFilter,
  CheckSquare,
  CreditCard,
  ArrowRight,
  Palette,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  overviewComponentsList,
  brandColorsData,
  typographyShowcaseItems,
} from "@/data";

const iconMap = {
  SquareTerminal,
  TableProperties,
  ListFilter,
  CheckSquare,
  CreditCard,
  Maximize2,
};

export default function ComponentsOverviewPage() {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Header */}
      <div className="space-y-4">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Real Estate Component Library
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Crafted specifically for high-end luxury real estate platforms. Every
          component is responsive, accessible, strictly typed, and built with dual
          light &amp; dark mode support.
        </p>
      </div>

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewComponentsList.map((comp) => {
          const Icon = iconMap[comp.iconName];
          return (
            <div
              key={comp.href}
              className="card-base group relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-gold/50 hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-control bg-primary text-primary-foreground group-hover:bg-brand-gold transition-colors duration-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="gold">{comp.badge}</Badge>
                </div>

                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-brand-gold transition-colors">
                    {comp.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs font-medium text-muted-foreground">
                  {comp.count}
                </span>
                <Link href={comp.href}>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    View Component
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Design Tokens Showcase */}
      <div className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <Palette className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Brand Color Tokens
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            Light &amp; Dark Harmonized
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {brandColorsData.map((color) => (
            <div
              key={color.name}
              className="rounded-control border border-border p-3.5 bg-surface-secondary/50 space-y-2.5"
            >
              <div
                className={`h-14 w-full rounded-control ${color.bg} ${color.border ? "border border-border" : ""
                  } flex items-center justify-center shadow-xs`}
              />
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {color.name}
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  {color.hex}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Hierarchy Showcase */}
      <div className="card-base p-6 sm:p-8 space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Typography System
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Google Fonts centrally configured via next/font/google
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {typographyShowcaseItems.map((item) => (
            <div
              key={item.id}
              className="space-y-2 rounded-control bg-surface-secondary/40 p-4 border border-border"
            >
              <span className="text-xs font-special text-brand-gold font-semibold uppercase">
                {item.name}
              </span>
              <div className={item.fontClass}>{item.sampleText}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
