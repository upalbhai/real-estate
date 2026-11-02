"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Compass,
  Command as CommandIcon,
  Shield,
  Building2,
  AlertTriangle,
  Tag,
  SquareTerminal,
  TableProperties,
  ListFilter,
  CheckSquare,
  CreditCard,
  Maximize2,
  Moon,
  Sun,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  CommandMenu,
  CommandTrigger,
  CommandGroupDefinition,
} from "@/components/ui/command";
import { useThemeStore } from "@/store/useThemeStore";

export function ComponentsHeader() {
  const router = useRouter();
  const [commandOpen, setCommandOpen] = React.useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const commandGroups: CommandGroupDefinition[] = React.useMemo(() => {
    return [
      {
        heading: "UI Components & Primitives",
        items: [
          {
            id: "comp-breadcrumbs",
            label: "Breadcrumbs & Wayfinding",
            description: "Hierarchical path trails with 4 delimiters & glassmorphism",
            href: "/components/breadcrumbs",
            icon: Compass,
            badge: "New",
            onSelect: () => router.push("/components/breadcrumbs"),
            keywords: ["breadcrumb", "trail", "navigation", "delimiters"],
          },
          {
            id: "comp-command",
            label: "Command Palette & Spotlight Search",
            description: "Raycast-inspired keyboard modal with ⌘K & shortcuts",
            href: "/components/command",
            icon: CommandIcon,
            badge: "Interactive",
            onSelect: () => router.push("/components/command"),
            keywords: ["command", "palette", "spotlight", "cmdk", "search"],
          },
          {
            id: "comp-dialogs",
            label: "Dialogs & Confirmation Modals",
            description: "Typed verification delete confirmation & NDA modals",
            href: "/components/dialogs",
            icon: AlertTriangle,
            badge: "Interactive",
            onSelect: () => router.push("/components/dialogs"),
            keywords: ["dialog", "modal", "delete", "confirmation", "alert"],
          },
          {
            id: "comp-badges",
            label: "Badges & Status Indicators",
            description: "Status indicator tokens with live animated pulse dots",
            href: "/components/badges",
            icon: Tag,
            badge: "Tokens",
            onSelect: () => router.push("/components/badges"),
            keywords: ["badge", "status", "tag", "pulse", "dot"],
          },
          {
            id: "comp-buttons",
            label: "Buttons & Action Controls",
            description: "Luxury real estate button variants with gold foil accents",
            href: "/components/buttons",
            icon: SquareTerminal,
            badge: "8 Variants",
            onSelect: () => router.push("/components/buttons"),
            keywords: ["button", "action", "gold", "primary", "outline"],
          },
          {
            id: "comp-data-table",
            label: "Data Table Pro",
            description: "Typed data table with column sorting, filtering & pagination",
            href: "/components/data-table",
            icon: TableProperties,
            badge: "Pro",
            onSelect: () => router.push("/components/data-table"),
            keywords: ["table", "data table", "sorting", "pagination", "grid"],
          },
          {
            id: "comp-async-select",
            label: "Async Select & Infinite Scroll",
            description: "Debounced remote search with multi-tag badges",
            href: "/components/async-select",
            icon: ListFilter,
            badge: "Infinite",
            onSelect: () => router.push("/components/async-select"),
            keywords: ["select", "combobox", "async", "dropdown", "tags"],
          },
          {
            id: "comp-inputs",
            label: "Inputs & Form Suite",
            description: "Inputs, textareas, checkboxes, radio groups & switches",
            href: "/components/inputs",
            icon: CheckSquare,
            badge: "Complete",
            onSelect: () => router.push("/components/inputs"),
            keywords: ["input", "form", "checkbox", "switch", "radio"],
          },
          {
            id: "comp-cards",
            label: "Property & Agent Cards",
            description: "Responsive dual-layout architectural property cards",
            href: "/components/cards",
            icon: CreditCard,
            badge: "Properties",
            onSelect: () => router.push("/components/cards"),
            keywords: ["cards", "property", "agent", "portfolio"],
          },
          {
            id: "comp-image-viewer",
            label: "Image Viewer & Lightbox",
            description: "Click-to-zoom high-res estate architectural plates",
            href: "/components/image-viewer",
            icon: Maximize2,
            badge: "Lightbox",
            onSelect: () => router.push("/components/image-viewer"),
            keywords: ["lightbox", "image", "viewer", "zoom", "gallery"],
          },
        ],
      },
      {
        heading: "Portals & Environments",
        items: [
          {
            id: "portal-admin",
            label: "Executive CRM Desk",
            description: "Audit lead inquiries, contracts, and confidential vaults",
            href: "/admin",
            icon: Shield,
            badge: "Executive",
            shortcut: "G A",
            onSelect: () => router.push("/admin"),
            keywords: ["admin", "crm", "fiduciary", "dashboard"],
          },
          {
            id: "portal-home",
            label: "Public Portfolio Website",
            description: "Browse curated acquisitions and flagship dossiers",
            href: "/",
            icon: Building2,
            badge: "Live Site",
            shortcut: "G H",
            onSelect: () => router.push("/"),
            keywords: ["home", "public", "portfolio", "properties"],
          },
        ],
      },
      {
        heading: "System Actions",
        items: [
          {
            id: "act-theme",
            label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
            description: "Toggle between ivory canvas and obsidian dark palettes",
            icon: theme === "dark" ? Sun : Moon,
            badge: "Theme",
            shortcut: "⌘T",
            onSelect: () => toggleTheme(),
            keywords: ["theme", "dark", "light", "mode", "toggle"],
          },
        ],
      },
    ];
  }, [router, theme, toggleTheme]);

  return (
    <>
      <header className="hidden md:flex h-16 items-center justify-between border-b border-border bg-surface px-8 sticky top-0 z-20">
        {/* Left: Wayfinding & Back to Site */}
        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Website</span>
          </Link>
          <span className="text-border">/</span>
          <span className="font-semibold text-foreground">Design System</span>
        </div>

        {/* Center: Quick Command Palette Trigger (⌘K) */}
        <div className="flex-1 max-w-md mx-6">
          <CommandTrigger
            onClick={() => setCommandOpen(true)}
            label="Search components, tokens, docs..."
            shortcut="⌘K"
          />
        </div>

        {/* Right: Theme Toggle & Status */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs text-muted-foreground font-mono hidden xl:inline-block">
            Production UI Suite
          </span>
          <ThemeToggle variant="segmented" />
        </div>
      </header>

      {/* Global Command Palette Dialog for Components */}
      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        groups={commandGroups}
        placeholder="Search components, tokens, or jump to portals..."
        emptyText="No matching components or actions found."
        footerNote="Aura Design System • Press ESC to dismiss"
      />
    </>
  );
}
