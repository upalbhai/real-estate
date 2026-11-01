export interface OverviewComponentItem {
  title: string;
  description: string;
  href: string;
  iconName: "SquareTerminal" | "TableProperties" | "ListFilter" | "CheckSquare" | "CreditCard";
  count: string;
  badge: string;
}

export const overviewComponentsList: OverviewComponentItem[] = [
  {
    title: "Buttons",
    description:
      "Luxury real estate button variants with primary, secondary, gold accent, outline, ghost, loading states, and icon slots.",
    href: "/components/buttons",
    iconName: "SquareTerminal",
    count: "8 Variants",
    badge: "Core UI",
  },
  {
    title: "Data Table",
    description:
      "Pro data table with generic typing, column sorting, global search filtering, row selection, pagination, and column visibility.",
    href: "/components/data-table",
    iconName: "TableProperties",
    count: "Pro Component",
    badge: "New",
  },
  {
    title: "Async Select",
    description:
      "Infinite scrolling async select with IntersectionObserver, debounced remote search, multi-tag badges, and creatable options.",
    href: "/components/async-select",
    iconName: "ListFilter",
    count: "Infinite Scroll",
    badge: "New",
  },
  {
    title: "Inputs & Forms",
    description:
      "Complete suite of form controls: labeled inputs, prefixes/suffixes, custom checkboxes, card radios, switches, and selects.",
    href: "/components/inputs",
    iconName: "CheckSquare",
    count: "6 Primitives",
    badge: "Form UI",
  },
  {
    title: "Cards Architecture",
    description:
      "Luxury property cards (grid & horizontal), agent director profiles, market stats, and base card primitives.",
    href: "/components/cards",
    iconName: "CreditCard",
    count: "4 Components",
    badge: "Showcase",
  },
];

export interface BrandColorToken {
  name: string;
  hex: string;
  bg: string;
  text: string;
  border?: boolean;
}

export const brandColorsData: BrandColorToken[] = [
  { name: "Charcoal", hex: "#252820", bg: "bg-[#252820]", text: "text-white" },
  { name: "Olive", hex: "#858B70", bg: "bg-[#858B70]", text: "text-white" },
  { name: "Gold", hex: "#C5A878", bg: "bg-[#C5A878]", text: "text-black" },
  { name: "Ivory", hex: "#F5F2EB", bg: "bg-[#F5F2EB]", text: "text-black", border: true },
  { name: "Beige", hex: "#E6E0D5", bg: "bg-[#E6E0D5]", text: "text-black" },
];

export interface TypographyShowcaseItem {
  id: string;
  name: string;
  fontClass: string;
  sampleText: string;
  description?: string;
  containerClass?: string;
}

export const typographyShowcaseItems: TypographyShowcaseItem[] = [
  {
    id: "bebas-neue",
    name: "Bebas Neue Display",
    fontClass: "font-display text-4xl tracking-wide text-foreground",
    sampleText: "LUXURY WATERFRONT RESIDENCES",
  },
  {
    id: "oswald",
    name: "Oswald Section Headings",
    fontClass: "font-heading text-3xl font-bold text-foreground",
    sampleText: "Curated Architectural Masterpieces",
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk Body & Controls",
    fontClass: "font-body text-sm text-muted-foreground leading-relaxed",
    sampleText:
      "Space Grotesk serves as our primary body typeface, engineered for optimal readability in property specifications, pricing, and interactive controls.",
  },
  {
    id: "orbitron",
    name: "Orbitron Futuristic Accents",
    fontClass: "font-special text-lg tracking-widest text-foreground font-semibold",
    sampleText: "SQFT: 8,450 // LOT: 0.65 AC // ID: #AE-9082",
  },
];

export interface HomeFeatureHighlight {
  id: string;
  title: string;
  description: string;
  iconName: "Layers" | "SquareTerminal" | "TableProperties";
  iconBgClass: string;
}

export const homeFeatureHighlights: HomeFeatureHighlight[] = [
  {
    id: "architecture",
    title: "Feature-Driven Architecture",
    description:
      "Clean separation across UI primitives, feature layouts, and typed state management with zero backend dependencies.",
    iconName: "Layers",
    iconBgClass: "bg-primary text-primary-foreground",
  },
  {
    id: "buttons",
    title: "8 Button Variants & States",
    description:
      "Primary, secondary, gold accent, outline, ghost, loading spinners, and left/right slots designed for luxury conversion.",
    iconName: "SquareTerminal",
    iconBgClass: "bg-accent text-accent-foreground",
  },
  {
    id: "datatable",
    title: "Generic DataTable",
    description:
      "Sortable columns, global text search, column visibility toggles, batch selection, and animated skeleton loaders.",
    iconName: "TableProperties",
    iconBgClass: "bg-brand-olive text-white",
  },
];

export interface SidebarNavItem {
  name: string;
  href: string;
  iconName: "Layers" | "SquareTerminal" | "TableProperties" | "ListFilter" | "CheckSquare" | "CreditCard" | "Shield";
  badge?: string;
  isNew?: boolean;
}

export interface SidebarNavSection {
  section: string;
  items: SidebarNavItem[];
}

export const sidebarNavSections: SidebarNavSection[] = [
  {
    section: "Getting Started",
    items: [
      {
        name: "Overview",
        href: "/components",
        iconName: "Layers",
      },
    ],
  },
  {
    section: "Executive Portal",
    items: [
      {
        name: "Admin Dashboard",
        href: "/admin",
        iconName: "Shield",
        badge: "Portal",
        isNew: true,
      },
    ],
  },
  {
    section: "UI Components",
    items: [
      {
        name: "Buttons",
        href: "/components/buttons",
        iconName: "SquareTerminal",
        badge: "8 Variants",
      },
      {
        name: "Data Table",
        href: "/components/data-table",
        iconName: "TableProperties",
        badge: "Pro",
        isNew: true,
      },
      {
        name: "Async Select",
        href: "/components/async-select",
        iconName: "ListFilter",
        badge: "Infinite",
        isNew: true,
      },
      {
        name: "Inputs & Forms",
        href: "/components/inputs",
        iconName: "CheckSquare",
        badge: "Complete",
        isNew: true,
      },
      {
        name: "Cards",
        href: "/components/cards",
        iconName: "CreditCard",
        badge: "Properties",
        isNew: true,
      },
    ],
  },
];

