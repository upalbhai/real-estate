import { BadgeVariant } from "@/components/ui/badge";
import { ButtonVariant } from "@/components/ui/button";

export interface PropertyCardData {
  id: string;
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
    title: "The Glasshouse Sanctuary",
    location: "Beverly Hills, Los Angeles, CA",
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
      title: "Senior Partner",
    },
    tag: "Architectural Trophy",
    isFavorite: true,
  },
  {
    id: "prop-2",
    title: "Tribeca Sky Penthouse",
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
    title: "Biscayne Bay Waterfront Villa",
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
      title: "Private Client Advisor",
    },
    tag: "Private Deepwater Dock",
    isFavorite: false,
  },
  {
    id: "prop-4",
    title: "Red Mountain Alpine Chalet",
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
];

export interface AgentCardData {
  id: string;
  name: string;
  role: string;
  license: string;
  avatarUrl: string;
  activeListings: number;
  salesVolume: string;
  rating: number;
  phone: string;
  email: string;
  specialty: string;
}

export const mockAgentCards: AgentCardData[] = [
  {
    id: "agent-1",
    name: "Elena Rostova",
    role: "Founding Partner & Luxury Director",
    license: "CA DRE #02194821",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    activeListings: 18,
    salesVolume: "$480M+",
    rating: 4.98,
    phone: "+1 (310) 555-0182",
    email: "elena@auraestates.com",
    specialty: "Bel Air & Beverly Hills Estates",
  },
  {
    id: "agent-2",
    name: "Marcus Vance",
    role: "Managing Director - Penthouses",
    license: "NY RE #10401298",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    activeListings: 12,
    salesVolume: "$340M+",
    rating: 4.95,
    phone: "+1 (212) 555-0199",
    email: "marcus@auraestates.com",
    specialty: "Manhattan & Aspen Chalets",
  },
  {
    id: "agent-3",
    name: "Sofia Sterling",
    role: "Private Client Wealth Advisor",
    license: "FL BK #3398412",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    activeListings: 15,
    salesVolume: "$410M+",
    rating: 4.99,
    phone: "+1 (305) 555-0144",
    email: "sofia@auraestates.com",
    specialty: "Miami Coastal & Waterfront",
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
    title: "Gold VIP Dossier",
    badge: {
      text: "Trophy Asset",
      variant: "gold",
    },
    description: "Accented gold perimeter for private off-market estates.",
    content: "Reserved for exclusive high-net-worth acquisitions and marquee announcements.",
    actionText: "Request Private Access",
    actionVariant: "gold",
  },
];
