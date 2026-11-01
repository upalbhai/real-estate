"use client";

import * as React from "react";
import {
  Eye,
  MoreVertical,
  Plus,
  Filter,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import {
  mockProperties,
  type PropertyRecord,
  dataTableArchitectureCards,
} from "@/data";

export default function DataTableShowcasePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [enableSelection, setEnableSelection] = React.useState(true);
  const [showEmptyState, setShowEmptyState] = React.useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
    available: { label: "Available", variant: "available" },
    featured: { label: "Featured", variant: "featured" },
    pending: { label: "Under Contract", variant: "pending" },
    sold: { label: "Closed / Sold", variant: "sold" },
  };

  const columns: ColumnDef<PropertyRecord>[] = [
    {
      id: "code",
      header: "Ref Code",
      accessorKey: "code",
      sortable: true,
      width: "120px",
      cell: ({ value }) => (
        <span className="font-special text-xs font-semibold text-brand-gold">
          {String(value)}
        </span>
      ),
    },
    {
      id: "title",
      header: "Property Name & Location",
      accessorKey: "title",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground hover:text-brand-gold transition-colors">
            {row.title}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <MapPin className="h-3 w-3 text-muted-foreground/80 shrink-0" />
            {row.location}
          </span>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      sortable: true,
      cell: ({ value }) => (
        <span className="text-xs text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      id: "price",
      header: "List Price",
      accessorKey: "price",
      sortable: true,
      align: "right",
      cell: ({ value }) => (
        <span className="font-heading text-base font-bold text-foreground">
          {formatCurrency(Number(value))}
        </span>
      ),
    },
    {
      id: "specs",
      header: "Bed / Bath / Area",
      sortable: false,
      cell: ({ row }) => (
        <div className="text-xs text-foreground space-y-0.5">
          <div className="font-medium">
            {row.bedrooms} Beds • {row.bathrooms} Baths
          </div>
          <div className="text-muted-foreground">
            {row.areaSqft.toLocaleString()} sq ft
          </div>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      sortable: true,
      align: "center",
      cell: ({ value }) => {
        const strVal = String(value);
        const item = statusMap[strVal] || { label: strVal, variant: "default" };
        return <Badge variant={item.variant}>{item.label}</Badge>;
      },
    },
    {
      id: "agent",
      header: "Listing Agent",
      accessorKey: "agent",
      cell: ({ row }) => {
        const initials = row.agent.name
          .split(" ")
          .map((n) => n[0])
          .join("");
        return (
          <div className="flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold ${row.agent.avatarBg}`}
            >
              {initials}
            </div>
            <span className="text-xs font-medium text-foreground">
              {row.agent.name}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      width: "100px",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            size="icon-sm"
            variant="ghost"
            title="Quick view"
            aria-label="View property details"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              alert(`Viewing details for: ${row.title}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            title="More actions"
            aria-label="More actions"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              alert(`Options menu for: ${row.title}`);
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const tableData = showEmptyState ? [] : mockProperties;

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="gold">Reusable Core Component</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/data-table
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Generic Data Table
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          A fully customizable, type-safe data table component designed for
          portfolios, MLS listings, lead registries, and client management.
          Includes column sorting, live filtering, row selection, column
          visibility, and pagination.
        </p>
      </div>

      {/* Control Switchboard Bar */}
      <div className="card-base p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Filter className="h-4 w-4 text-brand-gold" />
          <span>Interactive Demos:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="sm"
            variant={enableSelection ? "primary" : "secondary"}
            onClick={() => setEnableSelection(!enableSelection)}
          >
            {enableSelection ? "Disable Checkboxes" : "Enable Checkboxes"}
          </Button>

          <Button
            size="sm"
            variant={isLoading ? "accent" : "secondary"}
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? "Turn Off Skeleton" : "Simulate Skeleton Loader"}
          </Button>

          <Button
            size="sm"
            variant={showEmptyState ? "destructive" : "secondary"}
            onClick={() => setShowEmptyState(!showEmptyState)}
          >
            {showEmptyState ? "Restore Data" : "Test Empty State"}
          </Button>
        </div>
      </div>

      {/* The Live DataTable Instance */}
      <DataTable
        title="Luxury Property Portfolio"
        description="Showing active global listings, statuses, and pricing"
        data={tableData}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Filter by estate name, location, or type..."
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        enableRowSelection={enableSelection}
        isLoading={isLoading}
        onRowClick={(row) => console.log("Clicked row:", row.title)}
        toolbarActions={
          <Button
            size="sm"
            variant="gold"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => alert("Add new property listing triggered")}
          >
            Add Property
          </Button>
        }
      />

      {/* Technical Specifications & Code Snippet */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Architecture &amp; Features
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Built following Clean Architecture principles without heavy external
            dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataTableArchitectureCards.map((card) => (
            <div
              key={card.id}
              className="space-y-2 rounded-control bg-surface-secondary/40 p-4 border border-border"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{card.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
