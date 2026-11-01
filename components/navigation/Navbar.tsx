"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Menu,
  X,
  Heart,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { headerNavLinks } from "@/data";
import { useFavoriteStore } from "@/store/useFavoriteStore";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { favorites } = useFavoriteStore();

  // Track scroll position for dynamic glassmorphism effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/80 bg-surface/90 backdrop-blur-md shadow-xs"
            : "border-b border-border/40 bg-surface/60 backdrop-blur-xs"
        )}
      >
        {/* Top Hairline Luxury Gold Gradient */}
        <div className="h-[2px] w-full bg-gradient-to-r from-brand-charcoal via-brand-gold to-brand-olive dark:from-brand-gold/70 dark:via-brand-olive dark:to-brand-gold/40" />

        <div className="section-container flex h-18 items-center justify-between gap-4">
          {/* Left: Brand Emblem & Wordmark */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary text-primary-foreground shadow-xs border border-brand-gold/30 group-hover:border-brand-gold transition-colors">
              <Building2 className="h-5 w-5 text-brand-gold" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-none">
                  AURA ESTATES
                </span>
                <span className="rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 px-1.5 py-0.2 text-[9px] font-special font-semibold uppercase tracking-wider hidden sm:inline-block">
                  Atelier
                </span>
              </div>
              <span className="text-[9px] font-special uppercase tracking-[0.22em] text-muted-foreground mt-0.5 leading-none">
                Prime Global Living
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links (Portfolio, About, FAQ, Contact Us) */}
          <nav className="hidden lg:flex items-center gap-8">
            {headerNavLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-xs uppercase tracking-wider font-medium transition-colors relative py-1",
                    isActive
                      ? "text-brand-gold font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Actions, Favorites, Theme, CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Saved Favorites Trigger */}
            <Link
              href="/properties?filter=saved"
              className="relative flex h-9 w-9 items-center justify-center rounded-control border border-border/80 bg-surface-secondary/40 hover:bg-surface-secondary hover:border-brand-gold/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              title="Saved Properties"
              aria-label="View saved favorite properties"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  favorites.length > 0 && "text-error fill-error/20"
                )}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold font-mono text-brand-charcoal ring-2 ring-surface shadow-xs">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <div className="hidden sm:flex items-center">
              <ThemeToggle variant="icon" />
            </div>

            {/* Private Viewing Luxury CTA */}
            <Link href="/contact" className="hidden sm:inline-block">
              <Button
                variant="gold"
                size="sm"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Inquire Privately
              </Button>
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-foreground hover:bg-surface-secondary transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs lg:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-Over Drawer */}
      <aside
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-surface border-l border-border flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="space-y-6">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-control bg-primary text-primary-foreground border border-brand-gold/30">
                <Building2 className="h-4 w-4 text-brand-gold" />
              </div>
              <span className="font-heading text-lg font-bold text-foreground">
                AURA ESTATES
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-control border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-control text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Bottom Footer with Theme & Contact */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Display Theme</span>
            <ThemeToggle variant="segmented" />
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full"
          >
            <Button variant="gold" size="md" className="w-full justify-center">
              Inquire Privately
            </Button>
          </Link>

          <div className="text-[11px] text-muted-foreground text-center font-mono">
            Aura Estates • Confidential Representation
          </div>
        </div>
      </aside>
    </>
  );
}
