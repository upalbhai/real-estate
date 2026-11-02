import {
  Building2,
  Home,
  Shield,
  Layers,
  Sparkles,
  Plus,
  Key,
  Compass,
  Tag,
  CreditCard,
  Maximize2,
  AlertTriangle,
  Lock,
  FileText,
} from "lucide-react";
import { CommandGroupDefinition } from "@/components/ui/command";

export interface CommandDocItem {
  component: string;
  prop: string;
  type: string;
  default: string;
  description: string;
}

export const commandPropsDocs: CommandDocItem[] = [
  {
    component: "CommandDialog",
    prop: "open",
    type: "boolean",
    default: "false",
    description: "Controls whether the command palette modal overlay is displayed.",
  },
  {
    component: "CommandDialog",
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    description: "Callback invoked when modal opens, closes, ESC is pressed, or backdrop is clicked.",
  },
  {
    component: "CommandDialog",
    prop: "listenKeyboardShortcut",
    type: "boolean",
    default: "true",
    description: "Automatically listens globally to ⌘K (Mac) and Ctrl+K (Windows) to toggle the palette.",
  },
  {
    component: "CommandInput",
    prop: "placeholder",
    type: "string",
    default: "'Type a command...'",
    description: "Placeholder text displayed in the spotlight search field.",
  },
  {
    component: "CommandInput",
    prop: "showClearButton",
    type: "boolean",
    default: "true",
    description: "Displays a quick dismiss 'X' button when text is entered.",
  },
  {
    component: "CommandGroup",
    prop: "heading",
    type: "ReactNode",
    default: "undefined",
    description: "Category header label rendered above grouped command options.",
  },
  {
    component: "CommandItem",
    prop: "onSelect",
    type: "() => void",
    default: "undefined",
    description: "Callback triggered when user clicks or presses Enter on this item.",
  },
  {
    component: "CommandItem",
    prop: "badge",
    type: "string",
    default: "undefined",
    description: "Optional metadata badge tag (e.g. 'Portal', 'Exclusive', '$48M').",
  },
  {
    component: "CommandItem",
    prop: "keywords",
    type: "string[]",
    default: "[]",
    description: "Additional hidden search keywords used to match against queries.",
  },
  {
    component: "CommandTrigger",
    prop: "shortcut",
    type: "string",
    default: "'⌘K'",
    description: "Keyboard shortcut indicator badge displayed on the right edge of the trigger pill.",
  },
];

export const commandShowcaseGroups: CommandGroupDefinition[] = [
  {
    heading: "Executive Portals & Navigation",
    items: [
      {
        id: "nav-portfolio",
        label: "Architectural Portfolio",
        description: "Browse 32+ luxury trophy estates and penthouses",
        href: "/properties",
        icon: Building2,
        badge: "Public Catalog",
        shortcut: "G P",
        keywords: ["homes", "estates", "listings", "mansions", "properties"],
      },
      {
        id: "nav-admin",
        label: "Executive CRM Desk",
        description: "Audit lead inquiries, contracts, and confidential vaults",
        href: "/admin",
        icon: Shield,
        badge: "Admin",
        shortcut: "G A",
        keywords: ["dashboard", "crm", "fiduciary", "admin", "leads"],
      },
      {
        id: "nav-components",
        label: "Real Estate Design System",
        description: "Explore 11+ UI primitives and design tokens",
        href: "/components",
        icon: Layers,
        badge: "UI Library",
        shortcut: "G C",
        keywords: ["design system", "components", "tokens", "library"],
      },
      {
        id: "nav-about",
        label: "Atelier Heritage & Protocols",
        description: "Off-market representation and firm background",
        href: "/about",
        icon: Home,
        keywords: ["firm", "story", "founder", "about"],
      },
    ],
  },
  {
    heading: "Trophy Architectural Estates",
    items: [
      {
        id: "prop-bellagio",
        label: "The Bellagio Promontory",
        description: "Bel Air, Los Angeles • 14,200 sq ft • $38.5M",
        href: "/properties/the-bellagio-promontory",
        icon: Key,
        badge: "Trophy Asset",
        keywords: ["bel air", "los angeles", "california", "mansion", "pool"],
      },
      {
        id: "prop-tribeca",
        label: "Tribeca Sky Sanctum Penthouse",
        description: "Tribeca, New York • 7,850 sq ft • $24.8M",
        href: "/properties/tribeca-sky-sanctum",
        icon: Building2,
        badge: "Exclusive",
        keywords: ["new york", "penthouse", "terrace", "manhattan"],
      },
      {
        id: "prop-star-island",
        label: "Star Island Modernist Compound",
        description: "Miami Beach, Florida • 11,400 sq ft • $32.0M",
        href: "/properties/star-island-compound",
        icon: Compass,
        badge: "Waterfront",
        keywords: ["miami", "florida", "dock", "yacht", "waterfront"],
      },
      {
        id: "prop-aspen",
        label: "Red Mountain Alpine Sanctuary",
        description: "Aspen, Colorado • 9,600 sq ft • $29.5M",
        href: "/properties/red-mountain-sanctuary",
        icon: Sparkles,
        badge: "Ski-In/Ski-Out",
        keywords: ["aspen", "colorado", "snow", "chalet", "mountain"],
      },
    ],
  },
  {
    heading: "Fiduciary Actions & Governance",
    items: [
      {
        id: "act-new-property",
        label: "Deploy New Estate Prospectus",
        description: "Author and publish an architectural listing to the global catalog",
        href: "/admin/properties/new",
        icon: Plus,
        badge: "Create",
        shortcut: "⌘N",
        keywords: ["create", "add", "listing", "estate", "publish"],
      },
      {
        id: "act-nda",
        label: "Generate Bilateral NDA Protocol",
        description: "Export cryptographically watermarked non-disclosure agreement",
        icon: Lock,
        badge: "Confidential",
        shortcut: "⌘D",
        keywords: ["legal", "nda", "agreement", "bilateral", "contract"],
      },
      {
        id: "act-escrow",
        label: "Verify Escrow Clearance",
        description: "Audit title deeds and sovereign account clearances",
        icon: FileText,
        badge: "Audit",
        keywords: ["title", "deeds", "clearance", "fiduciary", "bank"],
      },
    ],
  },
  {
    heading: "Design System UI Components",
    items: [
      {
        id: "comp-breadcrumbs",
        label: "Breadcrumbs & Wayfinding",
        description: "Hierarchical path trails with 4 delimiters & glassmorphism",
        href: "/components/breadcrumbs",
        icon: Compass,
        badge: "Wayfinding",
        keywords: ["breadcrumbs", "navigation", "trail", "path"],
      },
      {
        id: "comp-dialogs",
        label: "Dialogs & Delete Modals",
        description: "Typed verification delete confirmation & NDA modals",
        href: "/components/dialogs",
        icon: AlertTriangle,
        badge: "Modals",
        keywords: ["dialog", "modal", "delete", "confirmation", "alert"],
      },
      {
        id: "comp-badges",
        label: "Badges & Status Tags",
        description: "Status indicator tokens with live animated pulse dots",
        href: "/components/badges",
        icon: Tag,
        badge: "Tokens",
        keywords: ["badge", "status", "tag", "pulse", "dot"],
      },
      {
        id: "comp-cards",
        label: "Luxury Property & Agent Cards",
        description: "Horizontal and grid architectural property cards",
        href: "/components/cards",
        icon: CreditCard,
        badge: "Cards",
        keywords: ["cards", "property card", "agent", "stat"],
      },
      {
        id: "comp-image-viewer",
        label: "Interactive Image Lightbox",
        description: "Click-to-zoom high-res estate architectural plates",
        href: "/components/image-viewer",
        icon: Maximize2,
        badge: "Lightbox",
        keywords: ["lightbox", "image", "gallery", "zoom", "photo"],
      },
    ],
  },
];

export interface CommandUsageSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const commandUsageSnippets: CommandUsageSnippet[] = [
  {
    id: "quick-menu",
    title: "High-Level Declarative CommandMenu",
    description: "Render a complete, responsive, keyboard-navigable command palette with ⌘K support",
    code: `import * as React from "react";
import { CommandMenu, CommandTrigger } from "@/components/ui/command";
import { commandShowcaseGroups } from "@/data";

export function GlobalCommandBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Trigger Button inside Navbar or Header */}
      <CommandTrigger
        onClick={() => setOpen(true)}
        label="Search portfolio, docs & actions..."
        shortcut="⌘K"
      />

      {/* Spotlight Command Modal Dialog */}
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        groups={commandShowcaseGroups}
        placeholder="Type a command or search estates..."
      />
    </>
  );
}`,
  },
  {
    id: "composable-primitives",
    title: "Composable Primitives API",
    description: "Assemble custom inputs, groups, and list items with fine-grained control",
    code: `import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { Building2, Plus, Shield } from "lucide-react";

export function CustomCommandPalette({ open, setOpen }) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Search actions..." />
        <CommandList>
          <CommandEmpty>No matching results.</CommandEmpty>
          
          <CommandGroup heading="Quick Actions">
            <CommandItem
              icon={Plus}
              badge="Create"
              onSelect={() => console.log("New listing clicked")}
            >
              Deploy New Listing
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>

            <CommandItem
              icon={Building2}
              badge="Portfolio"
              onSelect={() => console.log("Portfolio selected")}
            >
              Browse All Trophy Estates
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}`,
  },
  {
    id: "inline-embedded",
    title: "Inline Embedded Search Command",
    description: "Embed the command component directly inside page layouts or sidebars without a modal wrapper",
    code: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Compass, Key } from "lucide-react";

export function InlineSearchBox() {
  return (
    <Command className="border border-border max-w-lg shadow-sm">
      <CommandInput placeholder="Filter global markets..." />
      <CommandList className="max-h-60">
        <CommandEmpty>No markets match your query.</CommandEmpty>
        <CommandGroup heading="Primary Territories">
          <CommandItem icon={Compass} onSelect={() => alert("Beverly Hills selected")}>
            Beverly Hills & Bel Air
          </CommandItem>
          <CommandItem icon={Key} onSelect={() => alert("Tribeca selected")}>
            Tribeca & SoHo Sanctuaries
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`,
  },
];
