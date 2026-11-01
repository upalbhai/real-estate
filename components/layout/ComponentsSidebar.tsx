"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquareTerminal,
  TableProperties,
  ListFilter,
  CheckSquare,
  CreditCard,
  Menu,
  X,
  Building2,
  Layers,
  Shield,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { sidebarNavSections } from "@/data";

const navIconMap = {
  Layers,
  SquareTerminal,
  TableProperties,
  ListFilter,
  CheckSquare,
  CreditCard,
  Shield,
  Maximize2,
};

export function ComponentsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-surface border-r border-border p-4">
      {/* Top Branding */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Link
            href="/components"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-control bg-primary text-primary-foreground group-hover:bg-brand-gold transition-colors duration-200">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  AURA
                </span>
                <span className="rounded-full bg-brand-gold/15 px-1.5 py-0.2 text-[10px] font-semibold text-brand-gold">
                  UI KIT
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Real Estate Design System
              </p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden rounded-control p-1.5 text-muted-foreground hover:bg-surface-secondary"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-6">
          {sidebarNavSections.map((group) => (
            <div key={group.section} className="space-y-1.5">
              <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-special">
                {group.section}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = navIconMap[item.iconName];

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "group flex items-center justify-between rounded-control px-3 py-2 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide",
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : item.isNew
                                ? "bg-brand-gold/20 text-brand-gold font-bold"
                                : "bg-surface-secondary text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Footer & Theme Toggle */}
      <div className="pt-4 border-t border-border space-y-3">


        <div className="rounded-control bg-surface-secondary p-3">
          <p className="mt-1 text-[11px] text-muted-foreground">
            Strictly styled with Charcoal, Olive, Ivory &amp; Gold tokens.
          </p>
        </div>
      </div>
    </div >
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-surface px-4 md:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-control p-2 text-foreground hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-gold" />
            <span className="font-heading font-bold text-foreground">
              AURA UI
            </span>
          </div>
        </div>
        <ThemeToggle variant="icon" />
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col md:sticky md:top-0 md:h-screen">
        {sidebarContent}
      </aside>
    </>
  );
}
