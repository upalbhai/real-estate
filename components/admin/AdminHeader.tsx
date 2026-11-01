"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAdminStore } from "@/store/useAdminStore";
import { adminNotificationList } from "@/data";

export function AdminHeader() {
  const pathname = usePathname();
  const {
    setMobileSidebarOpen,
    unreadNotifications,
    markNotificationsAsRead,
    user,
  } = useAdminStore();

  const [notificationOpen, setNotificationOpen] = React.useState(false);

  // Generate breadcrumb path
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/");
    const label =
      segment === "admin"
        ? "Portal"
        : segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
    const isLast = idx === pathSegments.length - 1;
    return { href, label, isLast };
  });

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface-secondary text-foreground hover:bg-surface-secondary/80 transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              {idx > 0 && <span className="text-border">/</span>}
              {crumb.isLast ? (
                <span className="font-semibold text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Actions, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Links */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/components">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              UI Library
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              Public Site
            </Button>
          </Link>
        </div>

        {/* Notification Bell with Popover */}
        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold text-brand-charcoal animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-80 sm:w-96 p-0 bg-surface border border-border shadow-lg rounded-control"
          >
            <div className="flex items-center justify-between p-3.5 border-b border-border bg-surface-secondary/40">
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-bold text-foreground">
                  Operations Feed
                </span>
                <Badge variant="gold" size="sm">
                  {unreadNotifications} New
                </Badge>
              </div>

              {unreadNotifications > 0 && (
                <button
                  type="button"
                  onClick={markNotificationsAsRead}
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Check className="h-3 w-3" />
                  <span>Mark all read</span>
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
                View Full Acquisition Ledger
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme Mode Toggle */}
        <ThemeToggle variant="icon" />

        {/* User Mini Avatar Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-special ${
              user?.avatarBg ?? "bg-brand-gold text-brand-charcoal"
            }`}
          >
            {user?.initials ?? "AV"}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-none">
              {user?.name?.split(" ")[0] ?? "Admin"}
            </span>
            <span className="text-[10px] text-brand-gold font-mono leading-tight">
              VIP Escrow
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
