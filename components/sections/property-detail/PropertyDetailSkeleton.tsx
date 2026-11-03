import * as React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";

export function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="section-container space-y-10 animate-pulse">
          {/* Top Breadcrumb & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="h-5 w-64 bg-surface-secondary/70 rounded-md" />
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 bg-surface-secondary/70 rounded-md" />
              <div className="h-9 w-20 bg-surface-secondary/70 rounded-md" />
            </div>
          </div>

          {/* Heading & Price Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-3 flex-1">
              <div className="h-6 w-32 bg-brand-gold/20 rounded-full" />
              <div className="h-10 sm:h-12 w-3/4 max-w-xl bg-surface-secondary/80 rounded-md" />
              <div className="h-5 w-60 bg-surface-secondary/60 rounded-md" />
            </div>
            <div className="flex flex-col lg:items-end space-y-2">
              <div className="h-4 w-28 bg-surface-secondary/50 rounded-md" />
              <div className="h-10 w-48 bg-surface-secondary/90 rounded-md" />
            </div>
          </div>

          {/* Gallery Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 aspect-[16/10] bg-surface-secondary/60 rounded-card border border-border" />
            <div className="hidden lg:grid grid-cols-1 gap-4">
              <div className="aspect-[16/10] bg-surface-secondary/50 rounded-card border border-border" />
              <div className="aspect-[16/10] bg-surface-secondary/50 rounded-card border border-border" />
            </div>
          </div>

          {/* Core Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-card bg-surface-secondary/30 border border-border">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 bg-surface-secondary/60 rounded" />
                <div className="h-6 w-24 bg-surface-secondary/80 rounded" />
              </div>
            ))}
          </div>

          {/* Main Grid: Description & Contact Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <div className="h-6 w-40 bg-surface-secondary/70 rounded" />
                <div className="h-4 w-full bg-surface-secondary/40 rounded" />
                <div className="h-4 w-5/6 bg-surface-secondary/40 rounded" />
                <div className="h-4 w-4/6 bg-surface-secondary/40 rounded" />
              </div>

              {/* Amenities placeholder */}
              <div className="space-y-4">
                <div className="h-6 w-36 bg-surface-secondary/70 rounded" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-surface-secondary/40 rounded-card border border-border/60" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Consultation Card */}
            <div className="lg:col-span-4">
              <div className="h-96 rounded-card bg-surface-secondary/40 border border-border p-6 space-y-4" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

