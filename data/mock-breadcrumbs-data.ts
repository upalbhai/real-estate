import {
  Home,
  Building2,
  MapPin,
  Shield,
  Layers,
  Compass,
  Key,
} from "lucide-react";
import {
  BreadcrumbItemDefinition,
  BreadcrumbSeparatorType,
  BreadcrumbVariant,
  BreadcrumbSize,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbPreset {
  id: string;
  name: string;
  description: string;
  category: "Property Listing" | "Executive Admin" | "Neighborhood Collections" | "Deep Hierarchy";
  items: BreadcrumbItemDefinition[];
}

export const breadcrumbShowcasePresets: BreadcrumbPreset[] = [
  {
    id: "property-listing",
    name: "Luxury Estate Listing",
    description: "Standard hierarchical trail for luxury residential listings",
    category: "Property Listing",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Properties", href: "/properties", icon: Building2 },
      { label: "Beverly Hills", href: "/properties?location=beverly-hills", icon: MapPin },
      { label: "The Bellagio Promontory", badge: "Exclusive", isCurrent: true },
    ],
  },
  {
    id: "admin-registry",
    name: "Property Management Registry",
    description: "Multi-tier administrative navigation inside the property manager",
    category: "Executive Admin",
    items: [
      { label: "Dashboard", href: "/admin", icon: Shield },
      { label: "Properties", href: "/admin/properties", icon: Layers },
      { label: "Featured Penthouses", href: "/admin/properties?filter=featured" },
      { label: "Property #AE-9021", badge: "Review", isCurrent: true },
    ],
  },
  {
    id: "curated-collections",
    name: "Coastal Waterfront Residence",
    description: "Location-based property navigation trail",
    category: "Neighborhood Collections",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Locations", href: "/#locations", icon: Compass },
      { label: "Coastal Properties", href: "/properties?category=coastal" },
      { label: "Star Island Compound", badge: "Available", isCurrent: true },
    ],
  },
  {
    id: "deep-hierarchy",
    name: "Multi-Level Global Regional Trail",
    description: "Deep international tree demonstrating automatic ellipsis collapsing",
    category: "Deep Hierarchy",
    items: [
      { label: "Global HQ", href: "/", icon: Home },
      { label: "Americas Division", href: "/properties?region=americas" },
      { label: "United States", href: "/properties?country=us" },
      { label: "Southern California", href: "/properties?state=ca" },
      { label: "Los Angeles Basin", href: "/properties?market=la" },
      { label: "Bel Air Enclave", href: "/properties?sub=bel-air", icon: Key },
      { label: "Villa Solaris Promontory", badge: "$48.5M", isCurrent: true },
    ],
  },
];

export interface BreadcrumbSeparatorOption {
  id: BreadcrumbSeparatorType;
  label: string;
  symbol: string;
  description: string;
}

export const breadcrumbSeparatorOptions: BreadcrumbSeparatorOption[] = [
  {
    id: "chevron",
    label: "Chevron Right",
    symbol: "›",
    description: "Standard subtle directional arrow for editorial wayfinding",
  },
  {
    id: "slash",
    label: "Angled Slash",
    symbol: "/",
    description: "Monospace architectural slash popular in luxury portfolios",
  },
  {
    id: "arrow",
    label: "Linear Arrow",
    symbol: "→",
    description: "Explicit forward progression for transaction workflows",
  },
  {
    id: "dot",
    label: "Gold Dot",
    symbol: "•",
    description: "Refined jewelry-inspired punctuation for high-contrast cards",
  },
];

export interface BreadcrumbVariantOption {
  id: BreadcrumbVariant;
  label: string;
  badge: string;
  description: string;
}

export const breadcrumbVariantOptions: BreadcrumbVariantOption[] = [
  {
    id: "default",
    label: "Default Charcoal",
    badge: "Balanced",
    description: "Adaptive muted foreground with clean hover transitions",
  },
  {
    id: "gold",
    label: "Atelier Gold Accent",
    badge: "Signature",
    description: "Brand gold highlights on active items and interactive hover states",
  },
  {
    id: "glass",
    label: "Glassmorphic Floating Pill",
    badge: "Overlay",
    description: "Translucent backdrop-blur container designed for photo overlays",
  },
  {
    id: "subtle",
    label: "Subtle Monochromatic",
    badge: "Minimal",
    description: "Soft low-contrast styling for crowded metadata headers",
  },
];

export interface BreadcrumbSizeOption {
  id: BreadcrumbSize;
  label: string;
  fontSize: string;
  description: string;
}

export const breadcrumbSizeOptions: BreadcrumbSizeOption[] = [
  {
    id: "sm",
    label: "Compact (11px)",
    fontSize: "text-[11px]",
    description: "Ideal for card headers, modal dialogs, and tight viewports",
  },
  {
    id: "md",
    label: "Default (12px)",
    fontSize: "text-xs",
    description: "Standard proportion for page headers and dossier banners",
  },
  {
    id: "lg",
    label: "Prominent (14px)",
    fontSize: "text-sm",
    description: "Large editorial breadcrumb for showcase hero sections",
  },
];

export interface BreadcrumbPropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
}

export const breadcrumbPropsDocs: BreadcrumbPropDoc[] = [
  {
    name: "items",
    type: "BreadcrumbItemDefinition[]",
    default: "[]",
    description: "Array of waypoint objects defining label, href, icon, badge, and isCurrent state.",
  },
  {
    name: "separator",
    type: "'chevron' | 'slash' | 'arrow' | 'dot' | ReactNode",
    default: "'chevron'",
    description: "Separator delimiter rendered between sequential breadcrumb waypoints.",
  },
  {
    name: "variant",
    type: "'default' | 'gold' | 'glass' | 'subtle'",
    default: "'default'",
    description: "Visual styling token variant engineered for dual light/dark themes and overlays.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Typography scale and icon bounding box sizing.",
  },
  {
    name: "maxItems",
    type: "number",
    default: "undefined",
    description: "Threshold above which intermediate path nodes collapse into an interactive ellipsis.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Optional Tailwind CSS classes applied directly to the root <nav> wrapper.",
  },
];

export interface BreadcrumbUsageSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const breadcrumbUsageSnippets: BreadcrumbUsageSnippet[] = [
  {
    id: "quick-props",
    title: "Quick Props-Driven API",
    description: "Render a complete, responsive, and accessible breadcrumb with a single declarative array",
    code: `import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Home, Building2, MapPin } from "lucide-react";

export function PropertyHeader() {
  const trail = [
    { label: "Home", href: "/", icon: Home },
    { label: "Portfolio", href: "/properties", icon: Building2 },
    { label: "Beverly Hills", href: "/properties?location=beverly-hills", icon: MapPin },
    { label: "The Bellagio Promontory", badge: "Exclusive", isCurrent: true },
  ];

  return (
    <Breadcrumbs
      items={trail}
      separator="chevron"
      variant="gold"
      size="md"
    />
  );
}`,
  },
  {
    id: "composable-primitives",
    title: "Composable Primitives API",
    description: "Full semantic JSX composition conforming strictly to W3C ARIA breadcrumb patterns",
    code: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export function CustomBreadcrumbTrail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1.5">
            <Home className="h-3.5 w-3.5" />
            <span>Atelier</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator type="slash" />

        <BreadcrumbItem>
          <BreadcrumbLink href="/properties">Portfolio</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator type="slash" />

        <BreadcrumbItem>
          <BreadcrumbPage>Star Island Waterfront</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  },
  {
    id: "collapsed-long-trail",
    title: "Automatic Ellipsis Collapsing",
    description: "Compress long regional trees down with maxItems; users click the ellipsis to expand the trail",
    code: `import { Breadcrumbs } from "@/components/ui/breadcrumb";

export function DeepRegionalPath() {
  const globalPath = [
    { label: "Global HQ", href: "/" },
    { label: "Americas", href: "/regions/americas" },
    { label: "United States", href: "/regions/us" },
    { label: "California", href: "/regions/ca" },
    { label: "Bel Air", href: "/regions/bel-air" },
    { label: "Villa Solaris", isCurrent: true },
  ];

  // Only displays: Global HQ > [...] > Bel Air > Villa Solaris
  return (
    <Breadcrumbs
      items={globalPath}
      maxItems={3}
      separator="chevron"
      variant="default"
    />
  );
}`,
  },
  {
    id: "glassmorphic-overlay",
    title: "Glassmorphic Photo Overlay",
    description: "Floating pill with backdrop blur for overlaying directly on high-resolution estate hero photos",
    code: `import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Building2 } from "lucide-react";

export function HeroPhotoOverlay() {
  return (
    <div className="relative h-96 w-full bg-cover bg-center rounded-card p-6 flex flex-col justify-between">
      {/* Floating Glassmorphic Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Acquisitions", href: "/properties", icon: Building2 },
          { label: "Tribeca Penthouse", isCurrent: true },
        ]}
        variant="glass"
        size="sm"
        separator="dot"
      />
      <h1 className="text-3xl font-heading font-bold text-white">Tribeca Sky Sanctum</h1>
    </div>
  );
}`,
  },
];

