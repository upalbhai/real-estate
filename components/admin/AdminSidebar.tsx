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
    <div className="flex h-full flex-col justify-between p-4 bg-surface border-r border-border">
      {/* Branding Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Link
            href="/admin"
            className="flex items-center gap-3 overflow-hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary text-primary-foreground shadow-xs">
              <Building className="h-5 w-5 text-brand-gold" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  AURA PORTAL
                </span>
                <span className="text-[10px] font-special font-semibold uppercase tracking-widest text-brand-gold">
                  Asset Operations
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-control border border-border bg-surface-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar expansion"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

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
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      title={sidebarCollapsed ? item.name : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-control px-3 py-2 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        {!sidebarCollapsed && <span>{item.name}</span>}
                      </div>

                      {!sidebarCollapsed && item.badge && (
                        <Badge
                          variant={item.badgeVariant ?? "default"}
                          size="sm"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="pt-4 border-t border-border space-y-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-control p-2 bg-surface-secondary/40 border border-border",
            sidebarCollapsed ? "justify-center p-1.5" : "justify-between"
          )}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className={cn(
                "h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold font-special",
                user?.avatarBg ?? "bg-brand-gold text-brand-charcoal"
              )}
            >
              {user?.initials ?? "AD"}
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-foreground truncate">
                  {user?.name ?? "Administrator"}
                </span>
                <span className="text-[10px] text-muted-foreground truncate">
                  {user?.role ?? "Managing Principal"}
                </span>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-control text-muted-foreground hover:text-error hover:bg-error/10 transition-colors"
              title="Sign Out"
              aria-label="Sign out of admin portal"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>

        {!sidebarCollapsed && (
          <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-brand-gold" />
              <span>Aura v2.6 Pro</span>
            </span>
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
          sidebarCollapsed ? "w-18" : "w-64"
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
