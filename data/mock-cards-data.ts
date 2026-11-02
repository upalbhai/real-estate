import { BadgeVariant } from "@/components/ui/badge";
import { ButtonVariant } from "@/components/ui/button";

export interface PropertyCardData {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: number;
  pricePeriod?: string;
  type: string;
  status: "featured" | "for_sale" | "for_rent" | "exclusive" | "under_contract";
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  garage: number;
  imageUrl: string;
  agent: {
    name: string;
    avatarUrl: string;
    title: string;
  };
  tag?: string;
  isFavorite?: boolean;
}

export const mockPropertyCards: PropertyCardData[] = [
  {
    id: "prop-1",
    slug: "the-glasshouse-sanctuary",
    title: "Modern Glass Villa – Beverly Hills",
    location: "Beverly Hills, CA",
    price: 18500000,
    type: "Modern Villa",
    status: "featured",
    bedrooms: 6,
    bathrooms: 8,
    areaSqft: 9400,
    garage: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Elena Rostova",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      title: "Founding Partner",
    },
    tag: "Infinity Pool",
    isFavorite: true,
  },
  {
    id: "prop-2",
    slug: "tribeca-sky-penthouse",
    title: "Sky Penthouse – Tribeca",
    location: "Tribeca, New York, NY",
    price: 14200000,
    type: "Sky Penthouse",
    status: "exclusive",
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 6100,
    garage: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Marcus Vance",
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      title: "Managing Director",
    },
    tag: "360° Skyline Views",
    isFavorite: false,
  },
  {
    id: "prop-3",
    slug: "biscayne-bay-waterfront-villa",
    title: "Waterfront Estate – Star Island",
    location: "Star Island, Miami Beach, FL",
    price: 24500000,
    type: "Waterfront Estate",
    status: "for_sale",
    bedrooms: 7,
    bathrooms: 9,
    areaSqft: 11800,
    garage: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Sofia Sterling",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      title: "Senior Client Advisor",
    },
    tag: "Private Deepwater Dock",
    isFavorite: false,
  },
  {
    id: "prop-4",
    slug: "red-mountain-alpine-chalet",
    title: "Alpine Chalet – Aspen",
    location: "Aspen, Pitkin County, CO",
    price: 65000,
    pricePeriod: "/ month",
    type: "Ski-in Retreat",
    status: "for_rent",
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 7200,
    garage: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Marcus Vance",
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      title: "Managing Director",
    },
    tag: "Direct Ski Access",
    isFavorite: true,
  },
  {
    id: "prop-5",
    slug: "bel-air-horizon-mansion",
    title: "Horizon Residence – Bel Air",
    location: "Bel Air, Los Angeles, CA",
    price: 28000000,
    type: "Contemporary Estate",
    status: "featured",
    bedrooms: 8,
    bathrooms: 11,
    areaSqft: 14500,
    garage: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Elena Rostova",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      title: "Founding Partner",
    },
    tag: "Ocean & City Views",
    isFavorite: false,
  },
  {
    id: "prop-6",
    slug: "pacific-palisades-ocean-view",
    title: "Coastal Villa – Pacific Palisades",
    location: "Pacific Palisades, CA",
    price: 9800000,
    type: "Coastal Modern",
    status: "for_sale",
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 6800,
    garage: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Elena Rostova",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      title: "Founding Partner",
    },
    tag: "Panoramic Ocean Views",
    isFavorite: false,
  },
];

export interface AgentCardData {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  phone: string;
  email: string;
  specialty: string;
  territory: string;
}

export const mockAgentCards: AgentCardData[] = [
  {
    id: "agent-1",
    name: "Elena Rostova",
    role: "Founding Partner",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    phone: "+1 (310) 880-9200",
    email: "elena@auraestates.com",
    specialty: "Modernist & Architectural Estates",
    territory: "Beverly Hills & Bel Air, CA",
  },
  {
    id: "agent-2",
    name: "Marcus Vance",
    role: "Managing Director",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    phone: "+1 (212) 940-7700",
    email: "marcus@auraestates.com",
    specialty: "Luxury Penthouses & Alpine Chalets",
    territory: "New York & Aspen, CO",
  },
  {
    id: "agent-3",
    name: "Sofia Sterling",
    role: "Senior Client Advisor",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    phone: "+1 (305) 670-3400",
    email: "sofia@auraestates.com",
    specialty: "Waterfront & Coastal Properties",
    territory: "Miami Beach & Star Island, FL",
  },
];

export interface MarketStatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  description: string;
  iconName: "TrendingUp" | "Building" | "DollarSign" | "Users";
}

export const mockStatCards: MarketStatItem[] = [
  {
    id: "stat-1",
    label: "Total Portfolio Value",
    value: "$1.48B",
    change: "+12.4%",
    trend: "up",
    description: "Across 42 active luxury assets",
    iconName: "DollarSign",
  },
  {
    id: "stat-2",
    label: "Average Sale Price",
    value: "$16.8M",
    change: "+8.1%",
    trend: "up",
    description: "Q3 2026 prime residential index",
    iconName: "TrendingUp",
  },
  {
    id: "stat-3",
    label: "Average Days on Market",
    value: "38 Days",
    change: "-14.2%",
    trend: "up",
    description: "Record liquidity for trophy listings",
    iconName: "Building",
  },
  {
    id: "stat-4",
    label: "Verified Global Investors",
    value: "2,840",
    change: "+24.5%",
    trend: "up",
    description: "Vetted family office registry",
    iconName: "Users",
  },
];

export interface CardPrimitiveVariantItem {
  id: string;
  variant: "default" | "interactive" | "gold";
  title: string;
  badge?: {
    text: string;
    variant: BadgeVariant;
  };
  description: string;
  content: string;
  actionText: string;
  actionVariant: ButtonVariant;
  hasActionIcon?: boolean;
}

export const cardPrimitiveVariants: CardPrimitiveVariantItem[] = [
  {
    id: "default",
    variant: "default",
    title: "Default Surface",
    description: "Clean standard card with 1px border and soft shadow.",
    content: "Used across general dashboard and overview sections with balanced contrast.",
    actionText: "Inspect Specs",
    actionVariant: "secondary",
  },
  {
    id: "interactive",
    variant: "interactive",
    title: "Interactive Hover",
    badge: {
      text: "Clickable",
      variant: "available",
    },
    description: "Hover scale micro-interaction with gold highlight border.",
    content: "Engineered for listings, search results, and interactive catalogs.",
    actionText: "Explore Detail",
    actionVariant: "primary",
    hasActionIcon: true,
  },
  {
    id: "gold",
    variant: "gold",
    title: "Gold Accent Card",
    badge: {
      text: "Featured Estate",
      variant: "gold",
    },
    description: "Accented gold border for featured properties and highlights.",
    content: "Reserved for featured architectural estates and key announcements.",
    actionText: "View Featured Estate",
    actionVariant: "gold",
  },
];
