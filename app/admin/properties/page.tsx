"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Eye,
  Trash2,
  Download,
} from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { mockProperties, PropertyRecord, PropertyStatus } from "@/data";

export default function AdminPropertiesPage() {
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [propertiesList, setPropertiesList] = React.useState<PropertyRecord[]>(mockProperties);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const statusBadgeMap: Record<PropertyStatus, { label: string; variant: BadgeVariant }> = {
    available: { label: "Available", variant: "available" },
    featured: { label: "Trophy Asset", variant: "gold" },
    pending: { label: "In Escrow", variant: "pending" },
    sold: { label: "Conveyed / Sold", variant: "sold" },
  };

  const filteredProperties = React.useMemo(() => {
    if (statusFilter === "all") return propertiesList;
    return propertiesList.filter((p) => p.status === statusFilter);
  }, [propertiesList, statusFilter]);

  const handleDeleteProperty = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the active portfolio?`)) {
      setPropertiesList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const columns: ColumnDef<PropertyRecord>[] = [
    {
      id: "code",
      header: "Code",
      accessorKey: "code",
      width: "90px",
      cell: ({ value }) => (
        <span className="font-mono text-xs font-bold text-brand-gold">
          {String(value)}
        </span>
      ),
    },
    {
      id: "title",
      header: "Estate Title & Type",
      accessorKey: "title",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground hover:text-brand-gold transition-colors">
            {row.title}
          </span>
          <span className="text-[11px] text-muted-foreground">{row.type}</span>
        </div>
      ),
    },
    {
      id: "location",
      header: "Location",
      accessorKey: "location",
      sortable: true,
      cell: ({ value }) => (
        <span className="text-xs text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      id: "price",
      header: "Valuation",
      accessorKey: "price",
      sortable: true,
      cell: ({ value }) => (
        <span className="font-mono font-bold text-xs text-foreground">
          {formatCurrency(Number(value))}
        </span>
      ),
    },
    {
      id: "specs",
      header: "Specifications",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground font-mono">
          <span>{row.bedrooms}B</span> • <span>{row.bathrooms}BA</span> •{" "}
          <span>{row.areaSqft.toLocaleString()} sqft</span>
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
        const item = statusBadgeMap[value as PropertyStatus] ?? {
          label: String(value),
          variant: "default",
        };
        return <Badge variant={item.variant} size="sm">{item.label}</Badge>;
      },
    },
    {
      id: "agent",
      header: "Assigned Lead",
      accessorKey: "agent",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${row.agent.avatarBg}`}
          >
            {row.agent.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="text-xs font-medium text-foreground">
            {row.agent.name}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      width: "120px",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Link href="/components/cards" title="View Public Prospectus">
            <Button size="icon-sm" variant="ghost" aria-label="View public page">
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href="/admin/properties/new" title="Edit Listing">
            <Button size="icon-sm" variant="ghost" aria-label="Edit listing">
              <Edit3 className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            size="icon-sm"
            variant="ghost"
            title="Archive property"
            aria-label="Archive listing"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProperty(row.id, row.title);
            }}
          >
            <Trash2 className="h-3.5 w-3.5 text-error" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Portfolio Registry</Badge>
            <span className="text-xs text-muted-foreground font-mono">
              ASSETS://MANAGEMENT
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Property Portfolio Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Audit, price, and publish luxury residential estates across global markets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/properties/new">
            <Button
              variant="gold"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add New Estate
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        {[
          { id: "all", label: "All Assets", count: propertiesList.length },
          { id: "available", label: "Active Available", count: propertiesList.filter(p => p.status === "available").length },
          { id: "featured", label: "Trophy Assets", count: propertiesList.filter(p => p.status === "featured").length },
          { id: "pending", label: "In Escrow", count: propertiesList.filter(p => p.status === "pending").length },
          { id: "sold", label: "Conveyed / Sold", count: propertiesList.filter(p => p.status === "sold").length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id)}
            className={`flex items-center gap-2 rounded-control px-3.5 py-1.5 text-xs font-medium transition-all ${
              statusFilter === tab.id
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                statusFilter === tab.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-surface-secondary text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* The Live DataTable Instance */}
      <DataTable
        title="Active Architectural Portfolio"
        description="Showing real-time fiduciaries listings, valuations, and assigned directors"
        data={filteredProperties}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search by estate title, code, or location..."
        pageSize={6}
        pageSizeOptions={[6, 12, 24]}
        enableRowSelection
        onRowClick={(row) => alert(`Selected estate: ${row.title} (${row.code})`)}
        toolbarActions={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Download className="h-3.5 w-3.5" />}
              onClick={() => alert("Exporting current portfolio view to CSV...")}
            >
              Export CSV
            </Button>
            <Link href="/admin/properties/new">
              <Button
                size="sm"
                variant="gold"
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Add Listing
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
