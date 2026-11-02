export interface OverviewComponentItem {
  title: string;
  description: string;
  href: string;
  iconName: "SquareTerminal" | "TableProperties" | "ListFilter" | "CheckSquare" | "CreditCard" | "Maximize2" | "AlertTriangle" | "Tag" | "Compass" | "Command";
  count: string;
  badge: string;
}

export const overviewComponentsList: OverviewComponentItem[] = [
  {
    title: "Command Palette",
    description:
      "Spotlight command menu with ⌘K keyboard navigation, fuzzy property search, operational quick actions, and embedded inline modes.",
    href: "/components/command",
    iconName: "Command",
    count: "Keyboard ⌘K",
    badge: "Spotlight",
  },
  {
    title: "Breadcrumbs",
    description:
      "Hierarchical wayfinding trails, delimiter variants (chevron, slash, arrow, dot), responsive ellipsis collapsing, and photo hero glassmorphic badges.",
    href: "/components/breadcrumbs",
    iconName: "Compass",
    count: "4 Delimiters",
    badge: "Wayfinding",
  },
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
    title: "Dialogs & Modals",
    description:
      "Delete confirmation dialogs with irreversible typed verification, bilateral NDA modals, and compound dialog primitives.",
    href: "/components/dialogs",
    iconName: "AlertTriangle",
    count: "Confirmation UI",
    badge: "Interactive",
  },
  {
    title: "Badges & Tags",
    description:
      "Curated real estate status badges (Exclusive, Under Contract, Available, Sold) with live animated pulse dots and gold foil.",
    href: "/components/badges",
    iconName: "Tag",
    count: "9 Variants",
    badge: "Design Tokens",
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
  {
    title: "Image Viewer",
    description:
      "Interactive lightbox photo viewer with multi-plate architectural galleries, pinch-to-zoom, pan, rotation, and custom overlays.",
    href: "/components/image-viewer",
    iconName: "Maximize2",
    count: "Lightbox UI",
    badge: "New",
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
    sampleText: "Distinctive Architectural Residences",
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
  iconName: "Layers" | "SquareTerminal" | "TableProperties" | "ListFilter" | "CheckSquare" | "CreditCard" | "Shield" | "Maximize2" | "AlertTriangle" | "Tag" | "Compass" | "Command";
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
        name: "Command Palette",
        href: "/components/command",
        iconName: "Command",
        badge: "Spotlight",
        isNew: true,
      },
      {
        name: "Breadcrumbs",
        href: "/components/breadcrumbs",
        iconName: "Compass",
        badge: "Wayfinding",
        isNew: true,
      },
      {
        name: "Dialogs & Modals",
        href: "/components/dialogs",
        iconName: "AlertTriangle",
        badge: "Interactive",
        isNew: true,
      },
      {
        name: "Badges & Tags",
        href: "/components/badges",
        iconName: "Tag",
        badge: "Tokens",
        isNew: true,
      },
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
      {
        name: "Image Viewer",
        href: "/components/image-viewer",
        iconName: "Maximize2",
        badge: "Lightbox",
        isNew: true,
      },
    ],
  },
];

export interface ImageViewerShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  src: string;
  aspectRatio: "wide" | "video" | "square";
}

export const imageViewerShowcaseItems: ImageViewerShowcaseItem[] = [
  {
    id: "glasshouse",
    title: "The Glasshouse Sanctuary",
    subtitle: "Ultra-Modern Villa",
    location: "Beverly Hills, CA",
    price: "$18,500,000",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "wide",
  },
  {
    id: "tribeca",
    title: "Tribeca Sky Penthouse",
    subtitle: "Duplex Penthouse",
    location: "Tribeca, New York, NY",
    price: "$14,200,000",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "video",
  },
  {
    id: "malibu",
    title: "Malibu Cliffside Modernist",
    subtitle: "Oceanfront Compound",
    location: "Malibu, CA",
    price: "$27,000,000",
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "video",
  },
];

export interface GalleryPlateItem {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export const imageViewerGalleryPlates: GalleryPlateItem[] = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    alt: "Exterior Modernist Facade",
    title: "Primary South-Facing Elevation",
    caption: "Cantilevered travertine framing with floor-to-ceiling tempered glass curtain walls.",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    alt: "Grand Living Salon",
    title: "Double-Height Great Room",
    caption: "Bookmatched Calacatta marble fireplace with automated pocketing Fleetwood sliders.",
  },
  {
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
    alt: "Infinity Pool & Terrace",
    title: "Zero-Edge Heated Saltwater Pool",
    caption: "Panoramic canyon-to-ocean vistas with integrated Baja tanning shelf and fire pit.",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    alt: "Culinary Suite",
    title: "Chef's Kitchen by Boffi",
    caption: "Dual waterfall marble islands outfitted with Gaggenau 400 Series appliances.",
  },
];

export interface ImageViewerFeatureCard {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export const imageViewerFeatureCards: ImageViewerFeatureCard[] = [
  {
    id: "touch",
    title: "Fluid Touch & Gesture Controls",
    description:
      "Supports natural pinch-to-zoom on mobile and touchpad, wheel zooming, and drag panning across any resolution.",
    badge: "Gestures",
  },
  {
    id: "rotation",
    title: "90° Rotation & Flip Controls",
    description:
      "Built-in toolbar controls allow rotating architectural plans, elevations, and vertical dossiers on demand.",
    badge: "Orientation",
  },
  {
    id: "carousel",
    title: "Multi-Plate Navigation",
    description:
      "Seamless left/right keyboard arrows, swipe navigation, and slide indicators across estate image sets.",
    badge: "Slideshow",
  },
  {
    id: "isolation",
    title: "Zero Prop Bleed & Isolation",
    description:
      "Propagations are cleanly handled so card clicks, favorites, and actions do not inadvertently trigger the viewer.",
    badge: "Event Safety",
  },
];


