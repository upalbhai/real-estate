"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  LineChart,
  Settings,
  Shield,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { adminNavSections } from "@/data";
import { useAdminStore } from "@/store/useAdminStore";

const adminIconMap = {
  LayoutDashboard,
  Building2,
  Users,
  LineChart,
  Settings,
  Shield,
  FileText,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    user,
    logout,
  } = useAdminStore();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navContent = (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-surface border-r border-border transition-all duration-300",
        sidebarCollapsed ? "p-3" : "p-4"
      )}
    >
      {/* Branding Header */}
      <div className="space-y-6">
        {sidebarCollapsed ? (
          /* Collapsed Top Header: Stacked & Perfectly Centered with Tooltips */
          <div className="flex flex-col items-center gap-2.5 pb-4 border-b border-border">
            <Tooltip
              content="Aura Portal"
              subtitle="Asset Operations"
              side="right"
              disabled={!sidebarCollapsed}
            >
              <Link
                href="/admin"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary text-primary-foreground shadow-xs border border-brand-gold/30 hover:border-brand-gold transition-colors"
              >
                <Building className="h-5 w-5 text-brand-gold" />
              </Link>
            </Tooltip>

            <Tooltip
              content="Expand Sidebar"
              subtitle="Navigation Menu"
              side="right"
              disabled={!sidebarCollapsed}
            >
              <button
                type="button"
                onClick={toggleSidebar}
                className="h-7 w-7 flex shrink-0 items-center justify-center rounded-control border border-border/80 bg-surface-secondary/60 text-muted-foreground hover:text-brand-gold hover:border-brand-gold/40 hover:bg-brand-gold/10 transition-all shadow-2xs cursor-pointer"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        ) : (
          /* Expanded Top Header: Horizontal Flow */
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 overflow-hidden group"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary text-primary-foreground shadow-xs border border-brand-gold/30 group-hover:border-brand-gold transition-colors">
                <Building className="h-5 w-5 text-brand-gold" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-heading text-lg font-bold tracking-tight text-foreground leading-none">
                  AURA PORTAL
                </span>
                <span className="text-[9px] font-special font-semibold uppercase tracking-[0.2em] text-brand-gold mt-1 leading-none">
                  Asset Operations
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden md:flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-border/80 bg-surface-secondary/50 text-muted-foreground hover:text-brand-gold hover:border-brand-gold/40 hover:bg-brand-gold/10 transition-all shadow-2xs cursor-pointer"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Navigation Sections */}
        <nav className="space-y-6">
          {adminNavSections.map((section) => (
            <div key={section.section} className="space-y-1.5">
              {!sidebarCollapsed && (
                <div className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground font-special">
                  {section.section}
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = adminIconMap[item.iconName];
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <Tooltip
                      key={item.href}
                      content={item.name}
                      subtitle={section.section}
                      badge={
                        item.badge ? (
                          <span className="rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 px-1.5 py-0.2 text-[10px] font-mono font-bold">
                            {item.badge}
                          </span>
                        ) : undefined
                      }
                      side="right"
                      disabled={!sidebarCollapsed}
                      wrapperClassName={sidebarCollapsed ? "w-full justify-center" : "w-full block"}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={cn(
                          "group flex items-center rounded-control transition-all duration-150",
                          sidebarCollapsed
                            ? "justify-center h-10 w-10 mx-auto p-0"
                            : "justify-between px-3 py-2 text-sm",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                            : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center min-w-0",
                            sidebarCollapsed ? "justify-center" : "gap-3 flex-1"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          {!sidebarCollapsed && (
                            <span className="truncate whitespace-nowrap font-medium">
                              {item.name}
                            </span>
                          )}
                        </div>

                        {!sidebarCollapsed && item.badge && (
                          <Badge
                            variant={isActive ? "default" : item.badgeVariant ?? "default"}
                            size="sm"
                            className={cn(
                              "ml-2 shrink-0 whitespace-nowrap font-mono text-[10px]",
                              isActive &&
                              "bg-primary-foreground/20 text-primary-foreground border-transparent"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="pt-4 border-t border-border space-y-3">
        {sidebarCollapsed ? (
          /* Collapsed User Footer: Cleanly Centered Avatar & Logout with Tooltips */
          <div className="flex flex-col items-center gap-2">
            <Tooltip
              content={user?.name ?? "Alexander Vance"}
              subtitle={`${user?.role ?? "Managing Principal"} • Tier 5`}
              side="right"
              disabled={!sidebarCollapsed}
            >
              <div
                className={cn(
                  "h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-bold font-special shadow-xs border border-brand-gold/40 cursor-pointer",
                  user?.avatarBg ?? "bg-brand-gold text-brand-charcoal"
                )}
              >
                {user?.initials ?? "AV"}
              </div>
            </Tooltip>

            <Tooltip
              content="Sign Out"
              subtitle="Terminate Terminal Session"
              side="right"
              disabled={!sidebarCollapsed}
            >
              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 rounded-control text-muted-foreground hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                aria-label="Sign out of admin portal"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        ) : (
          /* Expanded User Footer: Full Card */
          <div className="flex items-center justify-between gap-3 rounded-control p-2 bg-surface-secondary/40 border border-border">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div
                className={cn(
                  "h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold font-special",
                  user?.avatarBg ?? "bg-brand-gold text-brand-charcoal"
                )}
              >
                {user?.initials ?? "AV"}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-foreground truncate">
                  {user?.name ?? "Administrator"}
                </span>
                <span className="text-[10px] text-muted-foreground truncate">
                  {user?.role ?? "Managing Principal"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-control text-muted-foreground hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
              title="Sign Out of Terminal"
              aria-label="Sign out of admin portal"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}

        {!sidebarCollapsed && (
          <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
            <span className="font-mono text-[10px]">ESCROW: SECURE</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden md:block fixed top-0 bottom-0 left-0 z-40 transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-[270px]"
        )}
      >
        {navContent}
      </aside>

      {/* Mobile Slide-Over Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden animate-fadeIn"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Slide-Over Drawer */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 md:hidden transition-transform duration-300 ease-in-out shadow-xl",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent}
      </aside>
    </>
  );
}
