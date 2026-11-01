"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Check,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Shield,
  ShieldCheck,
  LogOut,
  Settings,
  Building2,
  Users,
  Compass,
  Command,
  X,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAdminStore } from "@/store/useAdminStore";
import { adminNotificationList, mockProperties, adminRecentInquiries } from "@/data";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    setMobileSidebarOpen,
    unreadNotifications,
    markNotificationsAsRead,
    user,
    logout,
  } = useAdminStore();

  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Handle keyboard shortcut ⌘K / Ctrl+K for search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered search results
  const filteredProperties = React.useMemo(() => {
    if (!searchQuery.trim()) return mockProperties.slice(0, 3);
    return mockProperties.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredInquiries = React.useMemo(() => {
    if (!searchQuery.trim()) return adminRecentInquiries.slice(0, 2);
    return adminRecentInquiries.filter(
      (inq) =>
        inq.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.entityName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Generate breadcrumb path
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbLabels: Record<string, string> = {
    admin: "Aura Portal",
    properties: "Properties Portfolio",
    new: "Deploy New Listing",
    leads: "HNW Inquiries",
    analytics: "Market Intelligence",
    settings: "Security & Governance",
  };

  const breadcrumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/");
    const label =
      breadcrumbLabels[segment] ??
      segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
    const isLast = idx === pathSegments.length - 1;
    return { href, label, isLast };
  });

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push("/admin/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
        {/* Top hairline luxury accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-charcoal via-brand-gold to-brand-olive dark:from-brand-gold/70 dark:via-brand-olive dark:to-brand-gold/40" />

        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-border bg-surface-secondary text-foreground hover:bg-surface-secondary/80 transition-colors"
            aria-label="Open navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
              title="Portal Home"
            >
              <Compass className="h-3.5 w-3.5 text-brand-gold" />
            </Link>

            {breadcrumbs.map((crumb) => (
              <React.Fragment key={crumb.href}>
                <ChevronRight className="h-3 w-3 text-border shrink-0 hidden sm:inline-block" />
                {crumb.isLast ? (
                  <span className="font-semibold text-foreground truncate max-w-[140px] sm:max-w-[200px]">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors truncate max-w-[100px] sm:max-w-none hidden sm:inline-block"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center/Left: Sleek Command Search Trigger Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full h-9 px-3 rounded-control border border-border/80 bg-surface-secondary/40 hover:bg-surface-secondary/80 hover:border-brand-gold/50 text-muted-foreground hover:text-foreground transition-all flex items-center justify-between text-xs group"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 text-brand-gold/80 group-hover:text-brand-gold transition-colors" />
              <span className="truncate">Search estates, investors, escrows...</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground border border-border shadow-2xs">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right: Action Pills, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick External Links (Non-wrapping luxury action pills) */}
          <div className="hidden xl:flex items-center gap-2">
            <Link
              href="/components"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-medium border border-border/80 bg-surface-secondary/30 hover:bg-surface-secondary hover:border-brand-gold/50 text-muted-foreground hover:text-foreground transition-all shrink-0 whitespace-nowrap"
            >
              <Layers className="h-3.5 w-3.5 text-brand-gold" />
              <span>Design System</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-medium border border-border/80 bg-surface-secondary/30 hover:bg-surface-secondary hover:border-brand-gold/50 text-muted-foreground hover:text-foreground transition-all shrink-0 whitespace-nowrap"
            >
              <ExternalLink className="h-3.5 w-3.5 text-brand-gold" />
              <span>Public Showcase</span>
            </Link>
          </div>

          {/* Search Trigger for Mobile/Tablet */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Notification Bell with Concierge Popover */}
          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-control border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold font-mono text-brand-charcoal ring-2 ring-surface shadow-xs">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-80 sm:w-96 p-0 bg-surface border border-border shadow-xl rounded-control animate-fadeIn"
            >
              <div className="flex items-center justify-between p-3.5 border-b border-border bg-surface-secondary/40">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-foreground">
                    Fiduciary Operations Feed
                  </span>
                  <Badge variant="gold" size="sm">
                    {unreadNotifications} Active
                  </Badge>
                </div>

                {unreadNotifications > 0 && (
                  <button
                    type="button"
                    onClick={markNotificationsAsRead}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    <Check className="h-3 w-3" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {adminNotificationList.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3.5 hover:bg-surface-secondary/50 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 border-t border-border bg-surface-secondary/20 text-center">
                <Link
                  href="/admin/leads"
                  onClick={() => setNotificationOpen(false)}
                  className="text-xs text-brand-gold hover:underline font-medium"
                >
                  View Full Acquisition Ledger →
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Mode Toggle */}
          <div className="flex items-center">
            <ThemeToggle variant="icon" />
          </div>

          {/* Interactive Executive Profile Dropdown */}
          <Popover open={profileOpen} onOpenChange={setProfileOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-control  bg-surface hover:bg-surface-secondary hover:border-brand-gold/40 transition-all cursor-pointer group"
                aria-label="Executive account menu"
              >
                {/* Avatar with Online Security Dot */}
                <div className="relative">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-special ${user?.avatarBg ?? "bg-brand-gold text-brand-charcoal"
                      } shadow-xs border border-brand-gold/40`}
                  >
                    {user?.initials ?? "AV"}
                  </div>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success ring-2 ring-surface" />
                </div>


                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:text-foreground hidden sm:block" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-72 p-0 bg-surface border border-border shadow-xl rounded-control animate-fadeIn"
            >
              {/* Profile Card Header */}
              <div className="p-4 border-b border-border bg-surface-secondary/30 space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold font-special ${user?.avatarBg ?? "bg-brand-gold text-brand-charcoal"
                      } shadow-xs border border-brand-gold/40`}
                  >
                    {user?.initials ?? "AV"}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-bold text-foreground truncate">
                      {user?.name ?? "Alexander Vance"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user?.email ?? "a.vance@auraestates.com"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Badge variant="gold" size="sm">
                    {user?.accessLevel ?? "Super Admin"}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    ESCROW: TIER 5
                  </span>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="p-1.5 space-y-0.5 text-xs">
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-control text-foreground hover:bg-surface-secondary transition-colors"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Security &amp; Hardware Key Settings</span>
                </Link>

                <Link
                  href="/admin/properties"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-control text-foreground hover:bg-surface-secondary transition-colors"
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Portfolio Asset Registry</span>
                </Link>

                <Link
                  href="/admin/leads"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-control text-foreground hover:bg-surface-secondary transition-colors"
                >
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>High-Net-Worth Inquiries</span>
                </Link>
              </div>

              {/* Fiduciary Status & Logout */}
              <div className="p-2 border-t border-border bg-surface-secondary/20 space-y-2">
                <div className="flex items-center justify-between px-2 text-[10px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-success" />
                    <span>256-Bit TLS Verified</span>
                  </span>
                  <span>SOC2 Type II</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-control text-xs font-semibold text-error hover:bg-error/10 border border-error/20 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out of Terminal</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Global Quick Command Search Modal Dialog (⌘K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-xl rounded-card border border-border bg-surface shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface-secondary/40">
              <Search className="h-5 w-5 text-brand-gold shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search estates, leads, contracts, or settings..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-control text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs divide-y divide-border">
              {/* Properties Section */}
              <div className="space-y-1.5">
                <div className="px-2 text-[10px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
                  Trophy Estates ({filteredProperties.length})
                </div>
                {filteredProperties.map((prop) => (
                  <Link
                    key={prop.id}
                    href="/admin/properties"
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-2 rounded-control hover:bg-surface-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground font-mono text-[10px]">
                        {prop.code}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground group-hover:text-brand-gold transition-colors block">
                          {prop.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {prop.location} • {prop.type}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-foreground">
                      ${(prop.price / 1000000).toFixed(1)}M
                    </span>
                  </Link>
                ))}
              </div>

              {/* Inquiries Section */}
              <div className="pt-3 space-y-1.5">
                <div className="px-2 text-[10px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
                  HNW Acquisition Leads ({filteredInquiries.length})
                </div>
                {filteredInquiries.map((inq) => (
                  <Link
                    key={inq.id}
                    href="/admin/leads"
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-2 rounded-control hover:bg-surface-secondary transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-foreground group-hover:text-brand-gold transition-colors block">
                        {inq.clientName}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {inq.entityName} • Target: {inq.propertyCode}
                      </span>
                    </div>
                    <Badge variant={inq.statusVariant} size="sm">
                      {inq.statusLabel}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* Quick Navigation Pages */}
              <div className="pt-3 space-y-1.5">
                <div className="px-2 text-[10px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
                  Operations Routes
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    href="/admin/properties/new"
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-control border border-border/80 bg-surface-secondary/30 hover:bg-surface-secondary hover:border-brand-gold/40 text-foreground transition-all flex items-center gap-2"
                  >
                    <Building2 className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Deploy New Listing</span>
                  </Link>
                  <Link
                    href="/admin/analytics"
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-control border border-border/80 bg-surface-secondary/30 hover:bg-surface-secondary hover:border-brand-gold/40 text-foreground transition-all flex items-center gap-2"
                  >
                    <Shield className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Market Intelligence</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface-secondary/40 text-[11px] text-muted-foreground">
              <span>Press <kbd className="font-mono bg-surface px-1 py-0.5 rounded border border-border">ESC</kbd> to close</span>
              <span className="font-mono text-brand-gold">AURA QUICK-SEARCH</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
