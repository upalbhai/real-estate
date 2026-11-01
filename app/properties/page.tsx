"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Heart,
  Compass,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PropertyCard } from "@/components/ui/property-card";
import {
  MotionFadeIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import {
  mockPropertyCards,
  heroFilterLocations,
  heroFilterPropertyTypes,
  heroFilterPriceRanges,
  propertySortOptions,
  bedroomFilterOptions,
} from "@/data";
import { useFavoriteStore } from "@/store/useFavoriteStore";

function PropertiesCatalogContent() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get("location") || "all";
  const initialType = searchParams.get("type") || "all";
  const initialPrice = searchParams.get("price") || "all";
  const initialFilter = searchParams.get("filter") || "all";

  // Filter States
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState(initialLocation);
  const [selectedType, setSelectedType] = React.useState(initialType);
  const [selectedPrice, setSelectedPrice] = React.useState(initialPrice);
  const [selectedBedrooms, setSelectedBedrooms] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("featured");
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "horizontal">("grid");
  const [showSavedOnly, setShowSavedOnly] = React.useState(initialFilter === "saved");

  const { toggleFavorite, isFavorite, favorites } = useFavoriteStore();

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedType("all");
    setSelectedPrice("all");
    setSelectedBedrooms("all");
    setSortBy("featured");
    setShowSavedOnly(false);
  };

  // Filter & Sort Logic
  const filteredProperties = React.useMemo(() => {
    let list = [...mockPropertyCards];

    // Filter by saved favorites
    if (showSavedOnly) {
      list = list.filter((p) => favorites.includes(p.id));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }

    // Filter by Location
    if (selectedLocation !== "all") {
      const locKey = selectedLocation.toLowerCase();
      list = list.filter((p) => {
        const pLoc = p.location.toLowerCase();
        if (locKey === "beverly-hills") return pLoc.includes("beverly");
        if (locKey === "tribeca") return pLoc.includes("tribeca") || pLoc.includes("new york");
        if (locKey === "miami") return pLoc.includes("miami");
        if (locKey === "aspen") return pLoc.includes("aspen");
        if (locKey === "austin") return pLoc.includes("austin");
        return true;
      });
    }

    // Filter by Property Type
    if (selectedType !== "all") {
      list = list.filter((p) => p.type.toLowerCase().includes(selectedType));
    }

    // Filter by Price Range
    if (selectedPrice !== "all") {
      if (selectedPrice === "5-10m") list = list.filter((p) => p.price >= 5000000 && p.price <= 10000000);
      else if (selectedPrice === "10-20m") list = list.filter((p) => p.price >= 10000000 && p.price <= 20000000);
      else if (selectedPrice === "20-50m") list = list.filter((p) => p.price >= 20000000 && p.price <= 50000000);
      else if (selectedPrice === "50m+") list = list.filter((p) => p.price > 50000000);
    }

    // Filter by Bedrooms
    if (selectedBedrooms !== "all") {
      const minBeds = parseInt(selectedBedrooms, 10);
      list = list.filter((p) => p.bedrooms >= minBeds);
    }

    // Sorting
    if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "area-desc") {
      list.sort((a, b) => b.areaSqft - a.areaSqft);
    }

    return list;
  }, [
    searchQuery,
    selectedLocation,
    selectedType,
    selectedPrice,
    selectedBedrooms,
    sortBy,
    showSavedOnly,
    favorites,
  ]);

  const activeFiltersCount = [
    searchQuery.trim() !== "",
    selectedLocation !== "all",
    selectedType !== "all",
    selectedPrice !== "all",
    selectedBedrooms !== "all",
    showSavedOnly,
  ].filter(Boolean).length;

  return (
    <div className="section-container py-12 sm:py-16 space-y-10 animate-fadeIn">
      {/* Header & Breadcrumb */}
      <MotionFadeIn>
        <div className="space-y-3 pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              Aura Estates
            </Link>
            <span>/</span>
            <span className="text-brand-gold font-semibold">Active Portfolio Catalog</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                The Architectural Portfolio
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mt-1">
                Curated luxury properties across Beverly Hills, Tribeca, Miami Beach, Aspen, and Austin.
                Each estate meets strict architectural scrutiny and title readiness.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowSavedOnly((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-medium border transition-all cursor-pointer ${
                  showSavedOnly
                    ? "bg-error/15 text-error border-error/40 font-bold"
                    : "bg-surface-secondary/40 text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${showSavedOnly ? "fill-current" : ""}`} />
                <span>Saved Only ({favorites.length})</span>
              </button>
            </div>
          </div>
        </div>
      </MotionFadeIn>

      {/* Multi-Facet Filter Panel */}
      <MotionFadeIn delay={0.1}>
        <div className="p-5 rounded-card border border-border bg-surface shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
            <div className="flex items-center gap-2 font-special font-semibold uppercase text-brand-gold">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Portfolio Search Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="gold" size="sm">
                  {activeFiltersCount} Active
                </Badge>
              )}
            </div>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-error transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Filter Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Keyword Search */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Input
                placeholder="Search estates or streets..."
                leftIcon={<Search className="h-4 w-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
                options={heroFilterLocations}
              />
            </div>

            {/* Property Classification */}
            <div>
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
                options={heroFilterPropertyTypes}
              />
            </div>

            {/* Price Range */}
            <div>
              <Select
                value={selectedPrice}
                onValueChange={setSelectedPrice}
                options={heroFilterPriceRanges}
              />
            </div>

            {/* Bedrooms */}
            <div>
              <Select
                value={selectedBedrooms}
                onValueChange={setSelectedBedrooms}
                options={bedroomFilterOptions}
              />
            </div>
          </div>
        </div>
      </MotionFadeIn>

      {/* Results Header: Count, Sorting, View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground font-mono font-bold">
            {filteredProperties.length}
          </strong>{" "}
          of <span className="font-mono">{mockPropertyCards.length}</span> prime residences
        </div>

        <div className="flex items-center gap-3">
          {/* Sort By Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline-block">Sort:</span>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
              options={propertySortOptions}
              className="w-48 text-xs"
            />
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-control bg-surface-secondary/60 border border-border">
            <button
              type="button"
              onClick={() => setLayoutMode("grid")}
              className={`p-1.5 rounded-control transition-all cursor-pointer ${
                layoutMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
              aria-label="Grid layout"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode("horizontal")}
              className={`p-1.5 rounded-control transition-all cursor-pointer ${
                layoutMode === "horizontal"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List View"
              aria-label="List layout"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Display with Stagger Motion */}
      {filteredProperties.length > 0 ? (
        <MotionStaggerContainer
          key={`${sortBy}-${layoutMode}-${filteredProperties.length}`}
          className={
            layoutMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {filteredProperties.map((prop) => (
            <MotionStaggerItem key={prop.id}>
              <PropertyCard
                property={{
                  ...prop,
                  isFavorite: isFavorite(prop.id),
                }}
                variant={layoutMode}
                onFavoriteToggle={(id) => toggleFavorite(id)}
              />
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-card border border-dashed border-border text-center space-y-4 max-w-lg mx-auto bg-surface-secondary/20">
          <div className="h-12 w-12 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto">
            <Compass className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold text-foreground">
              No Properties Match Current Criteria
            </h3>
            <p className="text-xs text-muted-foreground">
              Adjust your location, classification, or valuation filters to browse other estates.
            </p>
          </div>
          <Button variant="gold" size="sm" onClick={handleResetFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />
      <main className="flex-1">
        <React.Suspense
          fallback={
            <div className="section-container py-24 text-center text-muted-foreground">
              Loading Portfolio Catalog...
            </div>
          }
        >
          <PropertiesCatalogContent />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
