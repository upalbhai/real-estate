"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Layers, ChevronRight, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { portalNavLinks } from "@/data";

const iconMap = {
  Shield,
  Layers,
};

const emptySubscribe = () => () => {};

export function PublicPortalsFloatingDock() {
  const pathname = usePathname();
  const [minimized, setMinimized] = React.useState(false);
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Do not render floating dock on admin or internal component library pages
  if (!isMounted || pathname.startsWith("/admin") || pathname.startsWith("/components")) {
    return null;
  }

  if (minimized) {
    return (
      <div className="fixed bottom-5 left-5 z-40 animate-fadeIn">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setMinimized(false)}
          className="rounded-full border-brand-gold/50 bg-surface/90 backdrop-blur-md shadow-lg hover:border-brand-gold hover:shadow-[0_0_15px_rgba(197,168,120,0.3)] gap-2 px-3"
          title="Expand Portals Quick Switcher (Admin & Theme Dash)"
          aria-label="Expand Dashboards Quick Dock"
          leftIcon={<Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />}
          rightIcon={<ChevronRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />}
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-brand-gold">
            Portals
          </span>
        </Button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Public Portals Switcher"
      className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full border border-border/80 dark:border-brand-gold/40 bg-surface/95 dark:bg-[#141812]/95 backdrop-blur-md shadow-xl transition-all duration-300 animate-slideUp"
    >
      {/* Label Badge */}
      <div className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 text-[11px] font-special font-semibold uppercase tracking-wider text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
        <span>Portals</span>
      </div>

      <div className="h-4 w-[1px] bg-border dark:bg-border/60" />

      {/* Dynamic Portal Links (Admin CRM & Theme Dash) */}
      <div className="flex items-center gap-1">
        {portalNavLinks.map((portal) => {
          const IconComponent = iconMap[portal.iconName] || Shield;
          return (
            <Link
              key={portal.id}
              href={portal.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer",
                portal.id === "admin"
                  ? "bg-brand-charcoal dark:bg-[#1C2218] text-white hover:text-brand-gold border border-brand-gold/30 hover:border-brand-gold hover:shadow-xs"
                  : "bg-surface-secondary/70 hover:bg-surface-secondary text-foreground hover:text-brand-gold border border-border hover:border-brand-gold/40"
              )}
            >
              <IconComponent className="h-3.5 w-3.5 text-brand-gold shrink-0" />
              <span>{portal.shortLabel}</span>
            </Link>
          );
        })}
      </div>

      {/* Minimize Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setMinimized(true)}
        className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground ml-1"
        title="Minimize dock"
        aria-label="Minimize portals dock"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </aside>
  );
}
