"use client";

import * as React from "react";
import {
  Download,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminRegionalMetrics } from "@/data";

export default function AdminAnalyticsPage() {
  const demographicBreakdown = [
    { label: "Single Family Offices & Private Trusts", pct: 46, amount: "$68.3M" },
    { label: "Sovereign Wealth & Institutional Funds", pct: 28, amount: "$41.6M" },
    { label: "Tech Founders & UHNW Entrepreneurs", pct: 18, amount: "$26.7M" },
    { label: "Private Equity Principals", pct: 8, amount: "$12.0M" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Market Intelligence</Badge>
            <span className="text-xs text-muted-foreground font-mono">
              ANALYTICS://VALUATION-INDEX
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Market Analytics &amp; Capital Velocity
          </h1>
          <p className="text-sm text-muted-foreground">
            Regional valuation indexes, buyer demographics, and liquidity velocity benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() => alert("Generating Q3 Comprehensive Valuation Dossier (PDF)...")}
          >
            Export Market Report
          </Button>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-base p-5 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            Average Price / Sq Ft
          </span>
          <div className="font-special text-3xl font-bold text-foreground">
            $2,154
          </div>
          <span className="text-xs font-semibold text-success font-mono">
            +9.2% YoY Appreciation
          </span>
        </div>

        <div className="card-base p-5 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            Days on Private Market
          </span>
          <div className="font-special text-3xl font-bold text-foreground">
            34 Days
          </div>
          <span className="text-xs font-semibold text-success font-mono">
            -18% Faster Escrows
          </span>
        </div>

        <div className="card-base p-5 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            Offer-to-List Ratio
          </span>
          <div className="font-special text-3xl font-bold text-brand-gold">
            97.8%
          </div>
          <span className="text-xs text-muted-foreground">Minimal discounting</span>
        </div>

        <div className="card-base p-5 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
            All-Cash Escrow Share
          </span>
          <div className="font-special text-3xl font-bold text-foreground">
            84.5%
          </div>
          <span className="text-xs text-muted-foreground">Zero appraisal contingency</span>
        </div>
      </div>

      {/* Analytics Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regional Price Benchmarks */}
        <div className="card-base p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Territory Price / Sq Ft Benchmarks
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Comparative luxury residential valuations across key operating zones.
              </p>
            </div>
            <Badge variant="gold">Prime Index</Badge>
          </div>

          <div className="space-y-5">
            {adminRegionalMetrics.map((reg) => (
              <div key={reg.region} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">
                      {reg.region}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {reg.listingCount} Trophy Listings Active
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-brand-gold text-sm block">
                      {reg.avgPriceSqft}
                      <span className="text-[10px] text-muted-foreground font-normal"> / sqft</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {reg.activeValue} Total
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full rounded-full bg-surface-secondary overflow-hidden">
                  <div
                    className="h-full bg-brand-gold rounded-full transition-all duration-500"
                    style={{ width: `${reg.dominancePct * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Capital Allocation Demographics */}
        <div className="card-base p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Acquisition Capital Sources
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Vetted institutional and private family office capital distribution.
              </p>
            </div>
            <Badge variant="available">Vetted Capital</Badge>
          </div>

          <div className="space-y-4">
            {demographicBreakdown.map((item) => (
              <div
                key={item.label}
                className="p-3.5 rounded-control bg-surface-secondary/40 border border-border space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="font-mono font-bold text-foreground">
                    {item.pct}% ({item.amount})
                  </span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-surface-secondary overflow-hidden">
                  <div
                    className="h-full bg-brand-gold/80 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-control bg-brand-gold/10 border border-brand-gold/30 text-xs text-foreground space-y-1">
            <span className="font-semibold text-brand-gold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Executive Market Insight</span>
            </span>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Family offices are aggressively redeploying institutional treasury reserves into
              coastal and alpine trophy assets to hedge global liquidity fluctuations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
