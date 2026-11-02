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
  ShieldCheck,
  LogOut,
  Settings,
  Building2,
  Users,
  Compass,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CommandMenu,
  CommandTrigger,
  CommandGroupDefinition,
} from "@/components/ui/command";
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

  // Structured Command Palette Groups
  const adminCommandGroups: CommandGroupDefinition[] = React.useMemo(() => {
    return [
      {
        heading: "Trophy Architectural Estates",
        items: mockProperties.map((prop) => ({
          id: `prop-${prop.id}`,
          label: prop.title,
          description: `${prop.location} • ${prop.code} • ${prop.type}`,
          badge: `$${(prop.price / 1000000).toFixed(1)}M`,
          icon: Building2,
          href: "/admin/properties",
          onSelect: () => router.push("/admin/properties"),
          keywords: [prop.title, prop.code, prop.location, prop.type, "property", "estate"],
        })),
      },
      {
        heading: "HNW Acquisition Inquiries",
        items: adminRecentInquiries.map((inq) => ({
          id: `inq-${inq.id}`,
          label: inq.clientName,
          description: `${inq.entityName} • Target: ${inq.propertyCode}`,
          badge: inq.statusLabel,
          icon: Users,
          href: "/admin/leads",
          onSelect: () => router.push("/admin/leads"),
          keywords: [inq.clientName, inq.entityName, inq.propertyCode, "lead", "client"],
        })),
      },
      {
        heading: "Operations & Governance Routes",
        items: [
          {
            id: "route-new-prop",
            label: "Deploy New Listing Prospectus",
            description: "Create and publish luxury property specifications",
            icon: Building2,
            badge: "Create",
            shortcut: "⌘N",
            onSelect: () => router.push("/admin/properties/new"),
            keywords: ["create", "add", "new", "listing"],
          },
          {
            id: "route-analytics",
            label: "Market Intelligence & Analytics",
            description: "Review transacted volume, yields, and DOM metrics",
            icon: ShieldCheck,
            badge: "Analytics",
            onSelect: () => router.push("/admin/analytics"),
            keywords: ["analytics", "market", "volume", "charts"],
          },
          {
            id: "route-settings",
            label: "Security & Fiduciary Governance",
            description: "Hardware key authentication & bilateral NDA protocol",
            icon: Settings,
            badge: "Security",
            onSelect: () => router.push("/admin/settings"),
            keywords: ["settings", "security", "nda", "governance"],
          },
          {
            id: "route-components",
            label: "Design System Component Suite",
            description: "Inspect component library and design tokens",
            icon: Layers,
            badge: "Tokens",
            shortcut: "G C",
            onSelect: () => router.push("/components"),
            keywords: ["components", "design system", "tokens"],
          },
          {
            id: "route-home",
            label: "Public Portfolio Showcase",
            description: "View client-facing catalog and editorial dossiers",
            icon: ExternalLink,
            badge: "Public Site",
            shortcut: "G H",
            onSelect: () => router.push("/"),
            keywords: ["home", "public", "portfolio"],
          },
        ],
      },
    ];
  }, [router]);

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
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden shrink-0"
            aria-label="Open navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

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
          <CommandTrigger
            onClick={() => setSearchOpen(true)}
            label="Search estates, investors, escrows..."
            shortcut="⌘K"
          />
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
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            onClick={() => setSearchOpen(true)}
            className="md:hidden"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notification Bell with Concierge Popover */}
          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                className="relative"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold font-mono text-brand-charcoal ring-2 ring-surface shadow-xs">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={markNotificationsAsRead}
                    className="h-auto p-1 text-[11px] font-medium"
                    leftIcon={<Check className="h-3 w-3" />}
                  >
                    Clear all
                  </Button>
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
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-1 sm:px-2.5 sm:py-1.5 rounded-control hover:border-brand-gold/40"
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
              </Button>
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

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  fullWidth
                  onClick={handleLogout}
                  leftIcon={<LogOut className="h-3.5 w-3.5" />}
                  className="font-semibold"
                >
                  Sign Out of Terminal
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Global Command Palette Dialog for Admin (⌘K) */}
      <CommandMenu
        open={searchOpen}
        onOpenChange={setSearchOpen}
        groups={adminCommandGroups}
        placeholder="Search estates, investors, operations, or routes..."
        emptyText="No matching records or actions found."
        footerNote="Aura Executive Portal • Press ESC to dismiss"
      />
    </>
  );
}
