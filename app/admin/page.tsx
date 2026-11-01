"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  Plus,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Search,
  Lock,
  BadgeDollarSign,
  Key,
  FileCheck,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  adminDashboardStats,
  adminRecentInquiries,
  adminActivityAuditLog,
  adminQuickActions,
  adminRegionalMetrics,
} from "@/data";
import { useAdminStore } from "@/store/useAdminStore";

const kpiIconMap = {
  TrendingUp,
  Building2,
  DollarSign,
  Users,
};

const activityIconMap = {
  Lock,
  BadgeDollarSign,
  Key,
  FileCheck,
  Eye,
};

const quickActionIconMap = {
  Plus,
  FileSpreadsheet,
  ShieldCheck,
  Search,
};

export default function AdminDashboardPage() {
  const { user } = useAdminStore();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Executive Top Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Fiduciary Dashboard</Badge>
            <span className="text-xs text-muted-foreground font-mono">
              PORTAL://OVERVIEW
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Welcome back, {user?.name?.split(" ")[0] ?? "Alexander"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Portfolio overview, active escrows, and ultra-high-net-worth acquisitions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/properties/new">
            <Button
              variant="gold"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              List New Estate
            </Button>
          </Link>
          <Link href="/admin/properties">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Building2 className="h-4 w-4" />}
            >
              Manage Assets
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Performance Indicators (KPIs) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminDashboardStats.map((stat) => {
          const Icon = kpiIconMap[stat.iconName];
          return (
            <div
              key={stat.id}
              className="card-base p-5 space-y-3 relative overflow-hidden group hover:border-brand-gold/40 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-special">
                  {stat.title}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-control bg-surface-secondary text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div>
                <div className="font-special text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-success font-mono">
                    {stat.change}
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {stat.caption}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                <Badge variant="default" size="sm">
                  {stat.badgeText}
                </Badge>
                <span className="text-muted-foreground font-mono">Q3 ACTIVE</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Main Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Recent Inquiries Ledger */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-base p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-gold" />
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    High-Net-Worth Acquisition Inquiries
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verified buyer dossiers requiring executive action or viewing clearance.
                </p>
              </div>

              <Link href="/admin/leads">
                <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="h-3 w-3" />}>
                  View All ({adminRecentInquiries.length})
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground font-special">
                    <th className="pb-3 font-semibold">Investor &amp; Entity</th>
                    <th className="pb-3 font-semibold">Target Asset</th>
                    <th className="pb-3 font-semibold">Budget</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Director</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  {adminRecentInquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      className="hover:bg-surface-secondary/40 transition-colors group cursor-pointer"
                      onClick={() => alert(`Reviewing confidential dossier for ${inq.clientName}`)}
                    >
                      <td className="py-3.5 pr-3">
                        <div className="font-semibold text-foreground group-hover:text-brand-gold transition-colors">
                          {inq.clientName}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {inq.entityName}
                        </div>
                      </td>
                      <td className="py-3.5 pr-3">
                        <span className="font-mono text-brand-gold font-semibold">
                          {inq.propertyCode}
                        </span>
                        <div className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                          {inq.propertyTitle}
                        </div>
                      </td>
                      <td className="py-3.5 pr-3 font-mono font-semibold text-foreground">
                        {formatCurrency(inq.targetBudget)}
                      </td>
                      <td className="py-3.5 pr-3">
                        <Badge variant={inq.statusVariant} size="sm">
                          {inq.statusLabel}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-right text-muted-foreground font-medium">
                        {inq.assignedDirector}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Market Dominance Bar Distribution */}
          <div className="card-base p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Regional Asset Dominance
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Portfolio market value and average price per square foot by territory.
                </p>
              </div>
              <Badge variant="gold">Prime Territories</Badge>
            </div>

            <div className="space-y-4">
              {adminRegionalMetrics.map((reg) => (
                <div key={reg.region} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      {reg.region}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-brand-gold font-bold">{reg.activeValue}</span>
                      <span className="text-muted-foreground">({reg.avgPriceSqft}/sqft)</span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="h-2 w-full rounded-full bg-surface-secondary overflow-hidden">
                    <div
                      className="h-full bg-brand-gold transition-all duration-500 rounded-full"
                      style={{ width: `${reg.dominancePct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Quick Actions & Activity Feed */}
        <div className="space-y-6">
          {/* Executive Quick Actions */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-heading text-base font-bold text-foreground pb-2 border-b border-border">
              Executive Actions
            </h3>

            <div className="space-y-2.5">
              {adminQuickActions.map((qa) => {
                const Icon = quickActionIconMap[qa.iconName];
                return (
                  <Link key={qa.id} href={qa.href} className="block group">
                    <div className="rounded-control border border-border p-3.5 bg-surface-secondary/40 hover:border-brand-gold/50 hover:bg-surface-secondary transition-all flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-primary text-primary-foreground group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground group-hover:text-brand-gold transition-colors">
                            {qa.title}
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {qa.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Fiduciary Activity Timeline */}
          <div className="card-base p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-heading text-base font-bold text-foreground">
                Audit &amp; Escrow Timeline
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground">
                REALTIME
              </span>
            </div>

            <div className="space-y-4">
              {adminActivityAuditLog.map((act) => {
                const Icon = activityIconMap[act.iconName];
                return (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-secondary border border-border mt-0.5">
                      <Icon className={`h-3.5 w-3.5 ${act.accentColor}`} />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-foreground">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        {act.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border text-center">
              <Button
                variant="outline"
                size="xs"
                fullWidth
                onClick={() => alert("Downloading full cryptographic audit log (CSV/PDF)...")}
              >
                Export Audit Ledger
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
