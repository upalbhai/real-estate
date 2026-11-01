"use client";

import * as React from "react";
import {
  MapPin,
  Tag,
  Users,
  CheckCircle,
} from "lucide-react";
import { AsyncSelect, Option, LoadOptionsResult } from "@/components/ui/async-select";
import { Badge } from "@/components/ui/badge";
import {
  allNeighborhoods,
  initialAmenities,
  asyncSelectHighlights,
} from "@/data";

export default function AsyncSelectShowcasePage() {
  const [selectedNeighborhood, setSelectedNeighborhood] = React.useState<Option | Option[] | null>(null);
  const [selectedAmenities, setSelectedAmenities] = React.useState<Option | Option[] | null>([
    initialAmenities[1],
    initialAmenities[2],
  ]);
  const [selectedTags, setSelectedTags] = React.useState<Option | Option[] | null>(null);

  // Simulated Async Paginated Loader for Neighborhoods
  const loadNeighborhoods = async ({
    page,
    page_size,
    search = "",
  }: {
    page: number;
    page_size: number;
    search?: string;
  }): Promise<LoadOptionsResult> => {
    // Artificial 400ms network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const filtered = allNeighborhoods.filter((item) =>
      String(item.name).toLowerCase().includes(search.toLowerCase())
    );

    const start = (page - 1) * page_size;
    const paginated = filtered.slice(start, start + page_size);
    const totalPages = Math.ceil(filtered.length / page_size) || 1;

    return {
      data: paginated,
      meta: {
        pagination: {
          page,
          page_size,
          total: filtered.length,
          totalPages,
        },
      },
    };
  };

  // Simulated Loader for Amenities
  const loadAmenities = async ({
    page,
    page_size,
    search = "",
  }: {
    page: number;
    page_size: number;
    search?: string;
  }): Promise<LoadOptionsResult> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const filtered = initialAmenities.filter((item) =>
      String(item.name).toLowerCase().includes(search.toLowerCase())
    );

    const start = (page - 1) * page_size;
    const paginated = filtered.slice(start, start + page_size);

    return {
      data: paginated,
      meta: {
        pagination: {
          page,
          page_size,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / page_size) || 1,
        },
      },
    };
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="gold">Async Component</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/async-select
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Infinite Async Select
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          High-performance select component engineered for large remote datasets.
          Features infinite scroll pagination with IntersectionObserver,
          debounced search, multi-tag selection, and creatable options.
        </p>
      </div>

      {/* Grid of Interactive Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Example 1: Single Async Select with Infinite Scroll */}
        <div className="card-base p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-gold" />
              <h2 className="font-heading text-lg font-bold text-foreground">
                Prime Neighborhood (Single Select)
              </h2>
            </div>
            <Badge variant="available">Paginated 5 / page</Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            Loads records page-by-page as you scroll inside the dropdown list.
            Try typing to trigger live debounced remote searching.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Destination
            </label>
            <AsyncSelect
              value={selectedNeighborhood}
              onChange={setSelectedNeighborhood}
              loadOptions={loadNeighborhoods}
              pageSize={5}
              placeholder="Search luxury enclaves (e.g. Beverly Hills)..."
              labelKey="name"
              idKey="id"
            />
          </div>

          <div className="rounded-control bg-surface-secondary/40 p-3 text-xs space-y-1 border border-border">
            <span className="font-semibold text-foreground">Selected Value:</span>
            <pre className="text-[11px] font-mono text-muted-foreground overflow-x-auto">
              {selectedNeighborhood
                ? JSON.stringify(selectedNeighborhood, null, 2)
                : "null (No selection)"}
            </pre>
          </div>
        </div>

        {/* Example 2: Multi-Select with Removable Badges */}
        <div className="card-base p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <Badge variant="featured">Multi Tag</Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            Select multiple amenities with removable badges, checkmark state, and
            tag deletion controls.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Required Luxury Features
            </label>
            <AsyncSelect
              value={selectedAmenities}
              onChange={setSelectedAmenities}
              loadOptions={loadAmenities}
              multi
              pageSize={6}
              placeholder="Select amenities..."
              labelKey="name"
              idKey="id"
            />
          </div>

          <div className="rounded-control bg-surface-secondary/40 p-3 text-xs space-y-1 border border-border">
            <span className="font-semibold text-foreground">
              Selected Tags ({Array.isArray(selectedAmenities) ? selectedAmenities.length : 0}):
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Array.isArray(selectedAmenities) && selectedAmenities.length > 0 ? (
                selectedAmenities.map((a) => (
                  <Badge key={String(a.id)} variant="gold" size="sm">
                    {String(a.name)}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground text-xs">No amenities chosen</span>
              )}
            </div>
          </div>
        </div>

        {/* Example 3: Creatable Option Mode */}
        <div className="card-base p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-brand-gold" />
              <h2 className="font-heading text-lg font-bold text-foreground">
                Custom Architectural Tags (Creatable)
              </h2>
            </div>
            <Badge variant="gold">Creatable: true</Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            Type any custom feature or label (e.g. &quot;Sub-Zero Refrigeration&quot; or &quot;LEED Platinum Certified&quot;) to create and select it dynamically.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Add or Search Custom Tags
            </label>
            <AsyncSelect
              value={selectedTags}
              onChange={setSelectedTags}
              loadOptions={loadAmenities}
              creatable
              multi
              placeholder="Type to create new tags..."
              labelKey="name"
              idKey="id"
            />
          </div>
        </div>

        {/* Example 4: Disabled State */}
        <div className="card-base p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-heading text-lg font-bold text-foreground">
                Disabled State
              </h2>
            </div>
            <Badge variant="outline">Disabled</Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            Demonstrates non-interactive locked input with dimmed styling.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Locked Selection
            </label>
            <AsyncSelect
              value={{ id: "locked", name: "Restricted Portfolio Access Only" }}
              loadOptions={loadNeighborhoods}
              disabled
              placeholder="Locked field..."
            />
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Component Highlights
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Engineered for high performance and zero dependency overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {asyncSelectHighlights.map((item) => (
            <div
              key={item.id}
              className="space-y-2 rounded-control bg-surface-secondary/40 p-4 border border-border"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
