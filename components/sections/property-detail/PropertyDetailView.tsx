"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  Heart,
  Share2,
  Printer,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Eye,
  Compass,
  Anchor,
  FileText,
  Check,
  Layers,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageViewerProvider, ImageViewerItem } from "@/components/ui/image-viewer";
import { PropertyCard } from "@/components/ui/property-card";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import {
  DetailedProperty,
  getSimilarProperties,
} from "@/data/mock-property-detail";
import {
  propertyInquirySchema,
  PropertyInquiryValues,
} from "@/schemas/property-inquiry.schema";

interface PropertyDetailViewProps {
  property: DetailedProperty;
}

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const isSaved = isFavorite(property.id);

  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = React.useState(0);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [inquirySubmitted, setInquirySubmitted] = React.useState(false);

  const similarProperties = React.useMemo(
    () => getSimilarProperties(property.slug, 3),
    [property.slug]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyInquiryValues>({
    resolver: zodResolver(propertyInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "",
      ndaRequired: true,
      notes: "",
    },
  });

  const onInquirySubmit = async (values: PropertyInquiryValues) => {
    // Simulate discrete encrypted partner assignment
    void values;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setInquirySubmitted(true);
    reset();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Icon resolver for highlights
  const renderHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="h-4 w-4 text-brand-gold" />;
      case "Eye":
        return <Eye className="h-4 w-4 text-brand-gold" />;
      case "Maximize2":
        return <Maximize2 className="h-4 w-4 text-brand-gold" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-4 w-4 text-brand-gold" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4 text-brand-gold" />;
      case "Lock":
        return <Lock className="h-4 w-4 text-brand-gold" />;
      case "Compass":
        return <Compass className="h-4 w-4 text-brand-gold" />;
      case "Anchor":
        return <Anchor className="h-4 w-4 text-brand-gold" />;
      case "Car":
        return <Car className="h-4 w-4 text-brand-gold" />;
      default:
        return <Sparkles className="h-4 w-4 text-brand-gold" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="section-container space-y-10">
          {/* Top Breadcrumb & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <Breadcrumbs
              items={[
                { label: "Portfolio", href: "/properties", icon: Building2 },
                { label: property.territory, href: `/properties?territory=${encodeURIComponent(property.territory)}` },
                { label: property.title, badge: property.code, isCurrent: true },
              ]}
              separator="chevron"
              variant="gold"
              size="sm"
            />

            {/* Quick Action Tools */}
            <div className="flex items-center gap-2">
              <Button
                variant={isSaved ? "gold" : "outline"}
                size="sm"
                onClick={() => toggleFavorite(property.id)}
                leftIcon={
                  <Heart
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isSaved && "fill-current scale-110"
                    )}
                  />
                }
              >
                {isSaved ? "Saved to Portfolio" : "Save Estate"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                leftIcon={copiedLink ? <Check className="h-3.5 w-3.5 text-success" /> : <Share2 className="h-3.5 w-3.5" />}
              >
                {copiedLink ? "Link Copied!" : "Share"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="hidden md:inline-flex"
                leftIcon={<Printer className="h-3.5 w-3.5" />}
              >
                Tear Sheet
              </Button>
            </div>
          </div>

          {/* Property Title & Main Pricing Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="gold" size="sm">
                {property.status === "featured"
                  ? "Featured Property"
                  : property.status === "exclusive"
                    ? "Exclusive Listing"
                    : property.status === "for_rent"
                      ? "For Rent"
                      : "For Sale"}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {property.type}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-brand-gold" />
                Verified Listing
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                  {property.title}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed">
                  {property.tagline}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground pt-1">
                  <MapPin className="h-4 w-4 text-brand-gold shrink-0" />
                  <span>
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </span>
                </div>
              </div>

              {/* Price Callout */}
              <div className="flex flex-col sm:items-end p-4 rounded-card border border-border bg-surface-secondary/40 shrink-0">
                <span className="text-[10px] font-special uppercase tracking-wider text-muted-foreground">
                  Guide Price
                </span>
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                    {property.priceFormatted}
                  </span>
                  {property.pricePeriod && (
                    <span className="text-sm text-muted-foreground font-medium">
                      {property.pricePeriod}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-brand-gold mt-1">
                  Available Now
                </span>
              </div>
            </div>
          </motion.div>

          {/* Immersive Photo Gallery (Bento Multi-Grid with Fullscreen Lightbox) */}
          <div className="space-y-3">
            <ImageViewerProvider>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 h-auto lg:h-[540px]">
                {/* Hero Primary Image (Left 7 Cols) */}
                {property.images[0] && (
                  <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-full relative rounded-card overflow-hidden border border-border group">
                    <ImageViewerItem src={property.images[0].url}>
                      <div className="relative h-full w-full cursor-zoom-in">
                        <Image
                          src={property.images[0].url}
                          alt={property.images[0].alt}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                          <span className="text-xs font-medium font-body bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                            {property.images[0].title}
                          </span>
                          <span className="text-[11px] font-mono bg-brand-gold text-brand-charcoal font-bold px-2.5 py-0.5 rounded-full">
                            Primary Facade
                          </span>
                        </div>
                      </div>
                    </ImageViewerItem>
                  </div>
                )}

                {/* 2x2 Grid of Secondary High-Res Photos (Right 5 Cols) */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 h-[240px] sm:h-[300px] lg:h-full">
                  {property.images.slice(1, 5).map((img) => (
                    <div
                      key={img.url}
                      className="relative rounded-card border border-border group"
                    >
                      <ImageViewerItem src={img.url}>
                        <div className="relative h-full w-full cursor-zoom-in min-h-[110px] sm:min-h-[140px]">
                          <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 1024px) 50vw, 20vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] truncate pointer-events-none font-medium">
                            {img.tag || img.title}
                          </div>
                        </div>
                      </ImageViewerItem>
                    </div>
                  ))}
                </div>
              </div>
            </ImageViewerProvider>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="font-mono text-[11px]">
                High-Resolution Architectural Photography ({property.images.length} Curated Plates)
              </span>
              <span className="text-brand-gold text-[11px] font-semibold">
                Click any plate to inspect full-screen high-fidelity zoom
              </span>
            </div>
          </div>

          {/* Quick Specification Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 sm:p-5 rounded-card border border-border bg-surface shadow-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-special uppercase text-muted-foreground">Bedrooms</span>
              <div className="font-heading text-xl font-bold text-foreground flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-brand-gold" />
                <span>{property.bedrooms} Suites</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-special uppercase text-muted-foreground">Bathrooms</span>
              <div className="font-heading text-xl font-bold text-foreground flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-brand-gold" />
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-special uppercase text-muted-foreground">Interior Living</span>
              <div className="font-heading text-xl font-bold text-foreground flex items-center gap-1.5">
                <Maximize2 className="h-4 w-4 text-brand-gold" />
                <span>{property.areaSqft.toLocaleString()} sqft</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-special uppercase text-muted-foreground">Lot Dimension</span>
              <div className="font-heading text-lg font-bold text-foreground flex items-center gap-1.5 truncate">
                <Compass className="h-4 w-4 text-brand-gold shrink-0" />
                <span className="truncate">{property.lotSize}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-special uppercase text-muted-foreground">Garage Berths</span>
              <div className="font-heading text-xl font-bold text-foreground flex items-center gap-1.5">
                <Car className="h-4 w-4 text-brand-gold" />
                <span>{property.garage} Vehicles</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-special uppercase text-muted-foreground">Completed</span>
              <div className="font-heading text-xl font-bold text-foreground flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-brand-gold" />
                <span>Year {property.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Main 2-Column Split: Detailed Architectural Dossier & Sticky Consultation Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Dossier Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Section 1: Key Architectural Highlights Grid */}
              <div className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {property.keyHighlights.map((hl) => (
                    <div
                      key={hl.label}
                      className="p-4 rounded-control border border-border bg-surface space-y-1 shadow-2xs hover:border-brand-gold/40 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {renderHighlightIcon(hl.iconName)}
                        <span className="text-[11px] font-special uppercase tracking-wider text-muted-foreground">
                          {hl.label}
                        </span>
                      </div>
                      <div className="font-heading text-base font-bold text-foreground pt-0.5">
                        {hl.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Property Overview */}
              <div className="space-y-4 p-6 sm:p-8 rounded-card border border-border bg-surface shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                    Property Overview
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <FileText className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Listing #{property.code}</span>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
                  {property.description.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-special uppercase text-muted-foreground tracking-wider">
                      Architect
                    </span>
                    <div className="font-semibold text-foreground font-body text-sm">
                      {property.architect}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-special uppercase text-muted-foreground tracking-wider">
                      Interior Designer
                    </span>
                    <div className="font-semibold text-foreground font-body text-sm">
                      {property.interiorDesigner}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Amenities & Features */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-brand-gold" />
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                      Features &amp; Amenities
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {property.amenities.reduce((acc, cat) => acc + cat.items.length, 0)} Features
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.amenities.map((category) => (
                    <div
                      key={category.category}
                      className="p-5 sm:p-6 rounded-card border border-border bg-surface space-y-3.5 shadow-2xs"
                    >
                      <h4 className="font-heading text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                        <span>{category.category}</span>
                      </h4>

                      <ul className="space-y-2.5 text-xs text-muted-foreground font-body">
                        {category.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 leading-snug">
                            <Check className="h-3.5 w-3.5 text-brand-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Architectural Floor Plan Explorer */}
              <div className="p-6 sm:p-8 rounded-card border border-border bg-surface space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-brand-gold" />
                      <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                        Floor Plans
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">
                      Spatial layouts and room configurations across all levels.
                    </p>
                  </div>

                  {/* Level Switcher Tabs */}
                  <div className="flex items-center gap-1.5 bg-surface-secondary/50 p-1 rounded-control border border-border">
                    {property.floorPlans.map((fp, idx) => (
                      <Button
                        key={fp.level}
                        type="button"
                        variant={activeFloorPlanIndex === idx ? "primary" : "ghost"}
                        size="xs"
                        onClick={() => setActiveFloorPlanIndex(idx)}
                        className={cn(
                          "text-xs font-semibold rounded-control transition-all",
                          activeFloorPlanIndex === idx
                            ? "shadow-2xs"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {fp.level}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Active Floor Plan Details */}
                {property.floorPlans[activeFloorPlanIndex] && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-control bg-surface-secondary/40 border border-border">
                      <div>
                        <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold font-bold">
                          {property.floorPlans[activeFloorPlanIndex].level}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-foreground">
                          {property.floorPlans[activeFloorPlanIndex].name}
                        </h4>
                      </div>
                      <div className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                        {property.floorPlans[activeFloorPlanIndex].area}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                      {property.floorPlans[activeFloorPlanIndex].description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {property.floorPlans[activeFloorPlanIndex].highlights.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-control border border-border bg-surface text-xs text-muted-foreground font-mono"
                        >
                          • {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 5: Estimated Carrying Costs */}
              <div className="p-6 sm:p-8 rounded-card border border-border bg-surface-secondary/30 space-y-5">
                <div className="space-y-1 pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-brand-gold" />
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                      Estimated Property Expenses
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    Estimated annual holding costs, property taxes, and assessments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-control border border-border bg-surface space-y-1">
                    <span className="text-muted-foreground text-[10px] uppercase font-special">Annual Real Property Tax</span>
                    <div className="font-bold text-foreground text-sm">{property.financials.annualTaxes}</div>
                  </div>

                  <div className="p-3.5 rounded-control border border-border bg-surface space-y-1">
                    <span className="text-muted-foreground text-[10px] uppercase font-special">Association / HOA Assessments</span>
                    <div className="font-bold text-foreground text-sm">{property.financials.monthlyHoa}</div>
                  </div>

                  <div className="p-3.5 rounded-control border border-border bg-surface space-y-1">
                    <span className="text-muted-foreground text-[10px] uppercase font-special">Estimated Debt Service</span>
                    <div className="font-bold text-foreground text-sm">{property.financials.estimatedMortgage}</div>
                  </div>

                  <div className="p-3.5 rounded-control border border-border bg-surface space-y-1">
                    <span className="text-muted-foreground text-[10px] uppercase font-special">Recommended Escrow Reserve</span>
                    <div className="font-bold text-brand-gold text-sm">{property.financials.suggestedEscrowReserve}</div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground italic font-body">
                  * Figures are provided as indicative estimates for prospective buyers. Final tax calculations and escrow instructions are confirmed upon contract review.
                </p>
              </div>
            </div>

            {/* Right Column: Sticky Consultation & Lead Generation Sidebar (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              {/* Private Viewing Appointment Card */}
              <div className="relative rounded-card border border-border bg-surface p-6 sm:p-7 space-y-6 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

                {/* Listing Advisor Summary */}
                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-special text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                      Listing Advisor
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/10 px-2 py-0.5 text-[10px] font-mono text-brand-gold border border-brand-gold/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                      Advisor
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-brand-gold/30 shrink-0">
                      <Image
                        src={property.agent.avatarUrl}
                        alt={property.agent.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="font-heading text-lg font-bold text-foreground truncate">
                        {property.agent.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-body truncate">
                        {property.agent.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form or Confirmation */}
                {inquirySubmitted ? (
                  <div className="p-6 text-center space-y-4 bg-surface-secondary/50 rounded-control border border-success/30 animate-fadeIn">
                    <div className="h-12 w-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading text-xl font-bold text-foreground">
                        Viewing Request Sent
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-body">
                        Your viewing request for{" "}
                        <strong className="text-foreground">{property.title}</strong> has been received by{" "}
                        <strong className="text-foreground">{property.agent.name}</strong>. We will get in touch shortly.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setInquirySubmitted(false)}>
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onInquirySubmit)} className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-heading text-lg font-bold text-foreground">
                        Schedule a Private Viewing
                      </h4>
                      <p className="text-xs text-muted-foreground font-body">
                        Connect directly with our advisor to arrange a viewing.
                      </p>
                    </div>

                    <Input
                      label="Your Name"
                      placeholder="e.g. Katherine Vance"
                      error={errors.fullName?.message}
                      {...register("fullName")}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="k.vance@example.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />

                    <Input
                      label="Phone Number"
                      placeholder="+1 (310) 555-0199"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />

                    <Input
                      label="Preferred Viewing Date"
                      type="date"
                      error={errors.preferredDate?.message}
                      {...register("preferredDate")}
                    />

                    <Textarea
                      label="Message / Inquiries"
                      placeholder="Specify timing, questions, or specific preferences..."
                      rows={2}
                      {...register("notes")}
                    />

                    <div className="p-3 rounded-control border border-brand-gold/30 bg-brand-gold/5">
                      <Controller
                        name="ndaRequired"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            label="Request Confidential Treatment"
                            description="All communications and inquiries are kept strictly confidential."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      size="md"
                      isLoading={isSubmitting}
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      className="w-full justify-center font-bold tracking-wider"
                    >
                      {isSubmitting ? "Sending Request..." : "Request a Private Viewing"}
                    </Button>
                  </form>
                )}

                {/* Direct Telephone & Email Hotlines */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="p-3 rounded-control border border-border bg-surface-secondary/40 flex items-center justify-between group hover:border-brand-gold/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 text-brand-gold" />
                      <span className="text-xs font-mono font-bold text-foreground group-hover:text-brand-gold transition-colors">
                        {property.agent.phone}
                      </span>
                    </div>
                    <span className="text-[10px] font-special uppercase text-muted-foreground">Call Direct</span>
                  </a>

                  <a
                    href={`mailto:${property.agent.email}`}
                    className="p-3 rounded-control border border-border bg-surface-secondary/40 flex items-center justify-between group hover:border-brand-gold/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Mail className="h-4 w-4 text-brand-gold shrink-0" />
                      <span className="text-xs font-mono font-bold text-foreground group-hover:text-brand-gold transition-colors truncate">
                        {property.agent.email}
                      </span>
                    </div>
                    <span className="text-[10px] font-special uppercase text-muted-foreground shrink-0">Email Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Curated Companion Acquisitions (Similar Properties) */}
          {similarProperties.length > 0 && (
            <div className="space-y-8 pt-12 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <Badge variant="gold">Comparable Portfolio</Badge>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Curated Companion Acquisitions
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-body">
                    Additional architectural masterworks currently available within our global vault.
                  </p>
                </div>

                <Link href="/properties">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    View All Portfolio
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((simProp) => (
                  <PropertyCard
                    key={simProp.id}
                    property={{
                      id: simProp.id,
                      slug: simProp.slug,
                      title: simProp.title,
                      location: `${simProp.city}, ${simProp.state}`,
                      price: simProp.price,
                      pricePeriod: simProp.pricePeriod,
                      type: simProp.type,
                      status: simProp.status,
                      bedrooms: simProp.bedrooms,
                      bathrooms: simProp.bathrooms,
                      areaSqft: simProp.areaSqft,
                      garage: simProp.garage,
                      imageUrl: simProp.images[0]?.url || "",
                      agent: {
                        name: simProp.agent.name,
                        avatarUrl: simProp.agent.avatarUrl,
                        title: simProp.agent.role,
                      },
                      tag: simProp.keyHighlights[0]?.value,
                      isFavorite: isFavorite(simProp.id),
                    }}
                    onFavoriteToggle={(id) => toggleFavorite(id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
