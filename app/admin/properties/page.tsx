"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Eye,
  Trash2,
  Download,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  X,
  Save,
  Maximize2,
  Shield,
} from "lucide-react";
import {
  ImageViewerProvider,
  ImageViewerItem,
} from "@/components/ui/image-viewer";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  mockProperties,
  PropertyRecord,
  PropertyStatus,
  propertyImages,
  defaultPropertyImage,
  propertyStatusSelectOptions,
  propertyTypes,
  luxuryAmenitiesList,
  propertyGalleryMap,
} from "@/data";

interface EditFormData {
  title: string;
  code: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status: PropertyStatus;
}

export default function AdminPropertiesPage() {
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [propertiesList, setPropertiesList] = React.useState<PropertyRecord[]>(mockProperties);

  // Modal states
  const [viewProperty, setViewProperty] = React.useState<PropertyRecord | null>(null);
  const [editProperty, setEditProperty] = React.useState<PropertyRecord | null>(null);
  const [deleteProperty, setDeleteProperty] = React.useState<PropertyRecord | null>(null);

  // Edit form state
  const [editFormData, setEditFormData] = React.useState<EditFormData>({
    title: "",
    code: "",
    type: "villa",
    price: 0,
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 0,
    status: "available",
  });

  // Success toast feedback
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const statusBadgeMap: Record<PropertyStatus, { label: string; variant: BadgeVariant }> = {
    available: { label: "Available", variant: "available" },
    featured: { label: "Featured", variant: "gold" },
    pending: { label: "Under Contract", variant: "pending" },
    sold: { label: "Sold", variant: "sold" },
  };

  const filteredProperties = React.useMemo(() => {
    if (statusFilter === "all") return propertiesList;
    return propertiesList.filter((p) => p.status === statusFilter);
  }, [propertiesList, statusFilter]);

  // Open Edit Modal
  const handleOpenEdit = (prop: PropertyRecord) => {
    setEditFormData({
      title: prop.title,
      code: prop.code,
      type: prop.type,
      price: prop.price,
      location: prop.location,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      areaSqft: prop.areaSqft,
      status: prop.status,
    });
    setEditProperty(prop);
  };

  // Save Edit Changes
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProperty) return;

    setPropertiesList((prev) =>
      prev.map((p) =>
        p.id === editProperty.id
          ? {
              ...p,
              title: editFormData.title,
              code: editFormData.code,
              type: editFormData.type,
              price: Number(editFormData.price),
              location: editFormData.location,
              bedrooms: Number(editFormData.bedrooms),
              bathrooms: Number(editFormData.bathrooms),
              areaSqft: Number(editFormData.areaSqft),
              status: editFormData.status,
            }
          : p
      )
    );

    setToastMessage(`Estate "${editFormData.title}" (${editFormData.code}) updated successfully.`);
    setEditProperty(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteProperty) return;

    setPropertiesList((prev) => prev.filter((p) => p.id !== deleteProperty.id));
    setToastMessage(`Estate "${deleteProperty.title}" (${deleteProperty.code}) was archived.`);
    setDeleteProperty(null);
    setTimeout(() => setToastMessage(null), 4000);
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
        <div className="text-xs text-muted-foreground font-mono whitespace-nowrap">
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
          <span className="text-xs font-medium text-foreground whitespace-nowrap">
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
          <Button
            size="icon-sm"
            variant="ghost"
            title="View Prospectus Details"
            aria-label="View estate details"
            onClick={(e) => {
              e.stopPropagation();
              setViewProperty(row);
            }}
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon-sm"
            variant="ghost"
            title="Edit Estate Parameters"
            aria-label="Edit estate"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(row);
            }}
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon-sm"
            variant="ghost"
            title="Archive from Portfolio"
            aria-label="Archive estate"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteProperty(row);
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
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-control border border-success/30 bg-success/15 text-success text-xs font-medium animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setToastMessage(null)}
            className="h-6 w-6 p-0 rounded hover:bg-success/20 text-success"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Wayfinding Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Executive Desk", href: "/admin", icon: Shield },
          { label: "Portfolio Registry", badge: "Live CRM", isCurrent: true },
        ]}
        separator="chevron"
        variant="gold"
        size="sm"
      />

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
            Audit, price, inspect, and update luxury residential estates across global markets.
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
          { id: "all", label: "All Properties", count: propertiesList.length },
          { id: "available", label: "Available", count: propertiesList.filter((p) => p.status === "available").length },
          { id: "featured", label: "Featured", count: propertiesList.filter((p) => p.status === "featured").length },
          { id: "pending", label: "Under Contract", count: propertiesList.filter((p) => p.status === "pending").length },
          { id: "sold", label: "Sold", count: propertiesList.filter((p) => p.status === "sold").length },
        ].map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={statusFilter === tab.id ? "primary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter(tab.id)}
            className={cn(
              "h-8 gap-2 px-3.5 text-xs font-medium rounded-control",
              statusFilter === tab.id
                ? "shadow-xs font-semibold"
                : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                statusFilter === tab.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-surface-secondary text-muted-foreground"
              )}
            >
              {tab.count}
            </span>
          </Button>
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
        onRowClick={(row) => setViewProperty(row)}
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

      {/* ========================================================
          1. VIEW PROSPECTUS DIALOG
         ======================================================== */}
      <Dialog
        open={!!viewProperty}
        onOpenChange={(open) => !open && setViewProperty(null)}
      >
        {viewProperty && (
          <DialogContent size="lg" className="p-0 overflow-hidden max-h-[90vh] flex flex-col">
            <ImageViewerProvider
              maskOpacity={0.88}
              bannerVisible={true}
            >
              {/* Hero Image Banner with Overlays (Rendered in Common ImageViewer Component) */}
              <ImageViewerItem src={propertyImages[viewProperty.id] || defaultPropertyImage}>
                <div className="relative h-56 sm:h-64 w-full bg-primary shrink-0 group cursor-zoom-in overflow-hidden select-none">
                  <Image
                    src={propertyImages[viewProperty.id] || defaultPropertyImage}
                    alt={viewProperty.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-control bg-black/75 text-brand-gold border border-brand-gold/40 backdrop-blur-xs">
                      {viewProperty.code}
                    </span>
                    <Badge variant={statusBadgeMap[viewProperty.status]?.variant ?? "default"} size="sm">
                      {statusBadgeMap[viewProperty.status]?.label ?? viewProperty.status}
                    </Badge>
                  </div>

                  {/* Zoom Inspection Hint */}
                  <div className="absolute top-4 right-14 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-control bg-black/65 text-white border border-brand-gold/40 backdrop-blur-xs shadow-md pointer-events-none group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-all">
                    <Maximize2 className="h-3 w-3" />
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider">Inspect High-Res</span>
                  </div>

                  {/* Title on image bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[11px] font-special uppercase tracking-wider text-brand-gold">
                      {viewProperty.type}
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-tight drop-shadow-xs">
                      {viewProperty.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                      <span>{viewProperty.location}</span>
                    </div>
                  </div>
                </div>
              </ImageViewerItem>

              {/* Content Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Financial Valuation Banner */}
                <div className="flex items-center justify-between p-4 rounded-control border border-border bg-surface-secondary/40">
                  <div>
                    <span className="text-[10px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
                      Acquisition Valuation
                    </span>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                      {formatCurrency(viewProperty.price)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
                      Calculated Velocity
                    </span>
                    <div className="font-mono text-sm sm:text-base font-bold text-brand-gold">
                      ${Math.round(viewProperty.price / viewProperty.areaSqft).toLocaleString()}
                      <span className="text-xs text-muted-foreground font-normal"> / sqft</span>
                    </div>
                  </div>
                </div>

                {/* 4-Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/20">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Bedrooms</span>
                    <div className="font-heading text-xl font-bold text-foreground mt-0.5">{viewProperty.bedrooms} Beds</div>
                  </div>
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/20">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Bathrooms</span>
                    <div className="font-heading text-xl font-bold text-foreground mt-0.5">{viewProperty.bathrooms} Baths</div>
                  </div>
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/20">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Living Area</span>
                    <div className="font-mono text-xl font-bold text-foreground mt-0.5">{viewProperty.areaSqft.toLocaleString()} sqft</div>
                  </div>
                  <div className="p-3 rounded-control border border-border bg-surface-secondary/20">
                    <span className="text-[10px] uppercase text-muted-foreground font-special">Listed Date</span>
                    <div className="font-mono text-sm font-semibold text-foreground mt-1">{viewProperty.listedDate}</div>
                  </div>
                </div>

                {/* Managing Director & Fiduciary Clearance */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 rounded-control border border-border bg-surface-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs ${viewProperty.agent.avatarBg}`}>
                      {viewProperty.agent.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-foreground block">
                        {viewProperty.agent.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Managing Listing Partner • Fiduciary Assigned
                      </span>
                    </div>
                  </div>

                  <Badge variant="available" size="sm">
                    Title &amp; Escrow Clearance Ready
                  </Badge>
                </div>

                {/* Architectural Gallery Plates */}
                {propertyGalleryMap[viewProperty.id] && propertyGalleryMap[viewProperty.id].length > 1 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
                        Architectural Views &amp; Perspective Dossier
                      </span>
                      <span className="text-[10px] text-brand-gold font-mono">
                        {propertyGalleryMap[viewProperty.id].length} high-res plates • Click to zoom
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2.5">
                      {propertyGalleryMap[viewProperty.id].map((photoUrl, idx) => (
                        <ImageViewerItem key={idx} src={photoUrl}>
                          <div className="relative h-16 sm:h-20 rounded-control overflow-hidden border border-border group cursor-zoom-in bg-surface-secondary">
                            <Image
                              src={photoUrl}
                              alt={`${viewProperty.title} view ${idx + 1}`}
                              fill
                              sizes="(max-width: 640px) 25vw, 150px"
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-md" />
                            </div>
                          </div>
                        </ImageViewerItem>
                      ))}
                    </div>
                  </div>
                )}

                {/* Luxury Amenities Tags */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
                    Verified Property Features
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {luxuryAmenitiesList.map((amenity) => (
                      <Badge key={amenity} variant="gold" size="sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-4 border-t border-border bg-surface-secondary/20 flex items-center justify-between gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewProperty(null)}
                >
                  Close Prospectus
                </Button>

                <Button
                  variant="gold"
                  size="sm"
                  leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                  onClick={() => {
                    const toEdit = viewProperty;
                    setViewProperty(null);
                    handleOpenEdit(toEdit);
                  }}
                >
                  Edit Listing
                </Button>
              </div>
            </ImageViewerProvider>
          </DialogContent>
        )}
      </Dialog>

      {/* ========================================================
          2. EDIT PROPERTY PARAMETERS DIALOG
         ======================================================== */}
      <Dialog
        open={!!editProperty}
        onOpenChange={(open) => !open && setEditProperty(null)}
      >
        {editProperty && (
          <DialogContent size="lg">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="gold">Edit Listing</Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {editProperty.code}
                </span>
              </div>
              <DialogTitle>Update Estate Parameters</DialogTitle>
              <DialogDescription>
                Modify active portfolio data. Changes will reflect in real-time across all investor ledgers.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveEdit} className="space-y-5 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Estate Title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Asset Code"
                    value={editFormData.code}
                    onChange={(e) => setEditFormData({ ...editFormData, code: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Classification"
                  value={editFormData.type}
                  onValueChange={(val) => setEditFormData({ ...editFormData, type: val })}
                  options={propertyTypes}
                />

                <Select
                  label="Listing Status"
                  value={editFormData.status}
                  onValueChange={(val) => setEditFormData({ ...editFormData, status: val as PropertyStatus })}
                  options={propertyStatusSelectOptions}
                />

                <Input
                  label="Valuation Price"
                  type="number"
                  prefixText="$"
                  suffixText="USD"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Location / Community"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  required
                />

                <Input
                  label="Interior Area"
                  type="number"
                  suffixText="sq ft"
                  value={editFormData.areaSqft}
                  onChange={(e) => setEditFormData({ ...editFormData, areaSqft: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                <Input
                  label="Bedrooms"
                  type="number"
                  value={editFormData.bedrooms}
                  onChange={(e) => setEditFormData({ ...editFormData, bedrooms: Number(e.target.value) })}
                  required
                />

                <Input
                  label="Bathrooms"
                  type="number"
                  value={editFormData.bathrooms}
                  onChange={(e) => setEditFormData({ ...editFormData, bathrooms: Number(e.target.value) })}
                  required
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditProperty(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  leftIcon={<Save className="h-3.5 w-3.5" />}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>

      {/* ========================================================
          3. DELETE / ARCHIVE CONFIRMATION DIALOG
         ======================================================== */}
      <Dialog
        open={!!deleteProperty}
        onOpenChange={(open) => !open && setDeleteProperty(null)}
      >
        {deleteProperty && (
          <DialogContent size="sm" className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error/15 text-error border border-error/30 mt-0.5">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-lg">Archive Estate from Portfolio?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to archive{" "}
                  <strong className="text-foreground">{deleteProperty.title}</strong> (
                  <span className="font-mono text-brand-gold">{deleteProperty.code}</span>)?
                  This will immediately withdraw the prospectus from active investor circulation.
                </DialogDescription>
              </div>
            </div>

            {/* Estate Snapshot Card */}
            <div className="p-3 rounded-control border border-border bg-surface-secondary/40 text-xs space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>{deleteProperty.title}</span>
                <span className="font-mono">{formatCurrency(deleteProperty.price)}</span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                {deleteProperty.location} • {deleteProperty.type}
              </p>
            </div>

            <DialogFooter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDeleteProperty(null)}
              >
                Keep Estate
              </Button>
              <Button
                variant="destructive"
                size="sm"
                leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                onClick={handleConfirmDelete}
              >
                Archive Listing
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
