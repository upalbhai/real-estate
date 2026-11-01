"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Badge, BadgeVariant } from "./badge";
import { Button } from "./button";
import { ImageViewerProvider, ImageViewerItem } from "./image-viewer";
import { PropertyCardData } from "@/data/mock-cards-data";

export interface PropertyCardProps {
  property: PropertyCardData;
  variant?: "grid" | "horizontal";
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
}

const statusBadgeConfig: Record<
  PropertyCardData["status"],
  { label: string; variant: BadgeVariant }
> = {
  featured: { label: "Featured Trophy", variant: "featured" },
  for_sale: { label: "For Acquisition", variant: "available" },
  for_rent: { label: "Luxury Lease", variant: "default" },
  exclusive: { label: "Private Dossier", variant: "gold" },
  under_contract: { label: "Under Contract", variant: "pending" },
};

export function PropertyCard({
  property,
  variant = "grid",
  onFavoriteToggle,
  onViewDetails,
  className,
}: PropertyCardProps) {
  const router = useRouter();
  const [isFav, setIsFav] = React.useState(property.isFavorite || false);
  const targetHref = `/properties/${property.slug || property.id}`;

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(property.id);
    } else {
      router.push(targetHref);
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isFav;
    setIsFav(next);
    onFavoriteToggle?.(property.id, next);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const statusInfo = statusBadgeConfig[property.status] || {
    label: property.status,
    variant: "default",
  };

  if (variant === "horizontal") {
    return (
      <Card
        variant="interactive"
        className={cn(
          "group flex flex-col md:flex-row items-stretch overflow-hidden border border-border bg-surface",
          className
        )}
        onClick={handleCardClick}
      >
        {/* Media Column with Interactive ImageViewer */}
        <div
          className="relative w-full md:w-2/5 min-h-[240px] md:min-h-full overflow-hidden bg-muted group/media"
          onClick={(e) => e.stopPropagation()}
        >
          <ImageViewerProvider>
            <ImageViewerItem src={property.imageUrl}>
              <div className="relative h-full w-full min-h-[240px] cursor-zoom-in">
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover/media:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden pointer-events-none" />

                {/* Inspect Zoom Pill Overlay */}
                <div className="absolute bottom-3.5 right-3.5 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-control bg-black/65 hover:bg-brand-gold hover:text-brand-charcoal text-white text-[10px] font-mono border border-white/20 backdrop-blur-xs transition-colors pointer-events-none">
                  <Maximize2 className="h-3 w-3" />
                  <span>Inspect</span>
                </div>
              </div>
            </ImageViewerItem>
          </ImageViewerProvider>

          {/* Badges Overlay */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
            {property.tag && (
              <span className="rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold text-white">
                {property.tag}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={toggleFavorite}
            aria-label={isFav ? "Remove from saved" : "Save property"}
            className={cn(
              "absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 cursor-pointer",
              isFav
                ? "bg-surface text-error shadow-sm"
                : "bg-black/40 text-white hover:bg-black/60"
            )}
          >
            <Heart
              className={cn("h-4 w-4 transition-transform", isFav && "fill-current scale-110")}
            />
          </button>
        </div>

        {/* Content Column */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-special text-brand-gold font-semibold uppercase tracking-wider">
                {property.type}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-bold text-foreground">
                  {formatPrice(property.price)}
                </span>
                {property.pricePeriod && (
                  <span className="text-xs text-muted-foreground font-medium">
                    {property.pricePeriod}
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-brand-gold transition-colors">
              {property.title}
            </h3>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-brand-gold shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-border text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed className="h-3.5 w-3.5 text-foreground" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bath className="h-3.5 w-3.5 text-foreground" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Maximize2 className="h-3.5 w-3.5 text-foreground" />
              <span>{property.areaSqft.toLocaleString()} sqft</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Car className="h-3.5 w-3.5 text-foreground" />
              <span>{property.garage} Garage</span>
            </div>
          </div>

          {/* Agent & Actions Footer */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border">
                <Image
                  src={property.agent.avatarUrl}
                  alt={property.agent.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">
                  {property.agent.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {property.agent.title}
                </span>
              </div>
            </div>

            <Link
              href={targetHref}
              onClick={(e) => {
                if (onViewDetails) {
                  e.preventDefault();
                  onViewDetails(property.id);
                }
              }}
            >
              <Button
                size="sm"
                variant="outline"
                rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                View Dossier
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  // Grid (Vertical Card) Layout
  return (
    <Card
      variant="interactive"
      className={cn("group flex flex-col h-full bg-surface border border-border", className)}
      onClick={handleCardClick}
    >
      {/* Top Image Hero with Interactive ImageViewer */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-muted group/media"
        onClick={(e) => e.stopPropagation()}
      >
        <ImageViewerProvider>
          <ImageViewerItem src={property.imageUrl}>
            <div className="relative h-full w-full cursor-zoom-in">
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover/media:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Inspect Zoom Pill Overlay */}
              <div className="absolute top-3.5 right-14 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-control bg-black/65 hover:bg-brand-gold hover:text-brand-charcoal text-white text-[10px] font-mono border border-white/20 backdrop-blur-xs transition-colors pointer-events-none">
                <Maximize2 className="h-3 w-3" />
                <span>Inspect</span>
              </div>
            </div>
          </ImageViewerItem>
        </ImageViewerProvider>

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          {property.tag && (
            <span className="rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold text-white">
              {property.tag}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFav ? "Remove from saved" : "Save property"}
          className={cn(
            "absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 cursor-pointer",
            isFav
              ? "bg-surface text-error shadow-sm"
              : "bg-black/40 text-white hover:bg-black/60"
          )}
        >
          <Heart
            className={cn("h-4 w-4 transition-transform", isFav && "fill-current scale-110")}
          />
        </button>

        {/* Bottom Image Overlay: Price Tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-baseline justify-between z-10 text-white pointer-events-none">
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-2xl font-bold tracking-tight drop-shadow-sm">
              {formatPrice(property.price)}
            </span>
            {property.pricePeriod && (
              <span className="text-xs font-medium text-white/80">
                {property.pricePeriod}
              </span>
            )}
          </div>
          <span className="text-[11px] font-special uppercase tracking-wider text-brand-gold font-semibold drop-shadow-sm">
            {property.type}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-brand-gold transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground line-clamp-1">
            <MapPin className="h-3.5 w-3.5 text-brand-gold shrink-0" />
            <span>{property.location}</span>
          </p>
        </div>

        {/* Specifications Ribbon */}
        <div className="flex items-center justify-between py-2.5 border-y border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5 text-foreground" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5 text-foreground" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-foreground" />
            <span>{property.areaSqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Agent Info & Action Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-full overflow-hidden border border-border">
              <Image
                src={property.agent.avatarUrl}
                alt={property.agent.name}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-foreground">
              {property.agent.name}
            </span>
          </div>

          <Link
            href={targetHref}
            onClick={(e) => {
              if (onViewDetails) {
                e.preventDefault();
                onViewDetails(property.id);
              }
            }}
          >
            <Button
              size="xs"
              variant="secondary"
              rightIcon={<ArrowUpRight className="h-3 w-3" />}
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

