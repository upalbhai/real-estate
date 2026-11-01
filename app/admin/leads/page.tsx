"use client";

import * as React from "react";
import {
  ShieldCheck,
  Download,
} from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminRecentInquiries, AdminInquiry } from "@/data";

export default function AdminLeadsPage() {
  const [inquiriesList] = React.useState<AdminInquiry[]>(adminRecentInquiries);
  const [selectedLead, setSelectedLead] = React.useState<AdminInquiry | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const columns: ColumnDef<AdminInquiry>[] = [
    {
      id: "clientName",
      header: "Principal Investor & Entity",
      accessorKey: "clientName",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground hover:text-brand-gold transition-colors">
            {row.clientName}
          </span>
          <span className="text-[11px] text-muted-foreground">{row.entityName}</span>
        </div>
      ),
    },
    {
      id: "propertyTitle",
      header: "Target Property Asset",
      accessorKey: "propertyTitle",
      sortable: true,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold text-brand-gold">
            {row.propertyCode}
          </span>
          <span className="text-xs text-foreground truncate max-w-[160px]">
            {row.propertyTitle}
          </span>
        </div>
      ),
    },
    {
      id: "targetBudget",
      header: "Liquid Allocation",
      accessorKey: "targetBudget",
      sortable: true,
      cell: ({ value }) => (
        <span className="font-mono font-bold text-xs text-foreground">
          {formatCurrency(Number(value))}
        </span>
      ),
    },
    {
      id: "ndaSigned",
      header: "NDA Status",
      accessorKey: "ndaSigned",
      align: "center",
      cell: ({ value }) => (
        <Badge variant={value ? "available" : "outline"} size="sm">
          {value ? "Verified Active" : "Pending Signature"}
        </Badge>
      ),
    },
    {
      id: "status",
      header: "Pipeline Stage",
      accessorKey: "status",
      sortable: true,
      align: "center",
      cell: ({ row }) => (
        <Badge variant={row.statusVariant} size="sm">
          {row.statusLabel}
        </Badge>
      ),
    },
    {
      id: "assignedDirector",
      header: "Advisory Lead",
      accessorKey: "assignedDirector",
      cell: ({ value }) => (
        <span className="text-xs text-muted-foreground font-medium">
          {String(value)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      width: "110px",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            size="xs"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLead(row);
            }}
          >
            Prospectus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Fiduciary Pipeline</Badge>
            <span className="text-xs text-muted-foreground font-mono">
              CLIENTS://HNW-LEDGER
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Ultra-High-Net-Worth Inquiries
          </h1>
          <p className="text-sm text-muted-foreground">
            Vetted family offices, sovereign trusts, and private clients executing acquisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() => alert("Downloading encrypted investor ledger...")}
          >
            Export Dossier List
          </Button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-base p-5 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            Total Pipeline Value
          </span>
          <div className="font-special text-2xl font-bold text-foreground">
            $78.4M
          </div>
          <span className="text-[11px] text-success font-mono">+18.5% this quarter</span>
        </div>

        <div className="card-base p-5 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            Average Liquid Budget
          </span>
          <div className="font-special text-2xl font-bold text-foreground">
            $15.7M
          </div>
          <span className="text-[11px] text-muted-foreground">Across active inquiries</span>
        </div>

        <div className="card-base p-5 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            NDA Clearance Rate
          </span>
          <div className="font-special text-2xl font-bold text-brand-gold">
            100% Verified
          </div>
          <span className="text-[11px] text-muted-foreground">Dual-fiduciary clearance</span>
        </div>
      </div>

      {/* Selected Prospectus Modal / Banner */}
      {selectedLead && (
        <div className="rounded-card border border-brand-gold/50 bg-brand-gold/10 p-5 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-gold" />
              <span className="font-heading text-sm font-bold text-foreground">
                Inspecting Confidential Dossier: {selectedLead.clientName}
              </span>
            </div>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setSelectedLead(null)}
            >
              Dismiss
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-1">
            <div>
              <span className="text-muted-foreground block text-[11px]">Entity Trust</span>
              <strong className="text-foreground">{selectedLead.entityName}</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Target Asset</span>
              <strong className="text-brand-gold">{selectedLead.propertyCode} ({selectedLead.propertyTitle})</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Allocated Budget</span>
              <strong className="font-mono text-foreground">{formatCurrency(selectedLead.targetBudget)}</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Assigned Partner</span>
              <strong className="text-foreground">{selectedLead.assignedDirector}</strong>
            </div>
          </div>
        </div>
      )}

      {/* The Live DataTable Instance */}
      <DataTable
        title="Active Acquisition Inquiries"
        description="Encrypted fiduciary pipeline with NDA status and target investment allocations"
        data={inquiriesList}
        columns={columns}
        searchKey="clientName"
        searchPlaceholder="Filter by investor name, entity, or asset code..."
        pageSize={6}
        pageSizeOptions={[6, 12]}
        enableRowSelection
        onRowClick={(row) => setSelectedLead(row)}
      />
    </div>
  );
}
