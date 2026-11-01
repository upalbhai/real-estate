export interface PropertyAgent {
  name: string;
  avatarBg: string;
}

export type PropertyStatus = "available" | "featured" | "pending" | "sold";

export interface PropertyRecord {
  id: string;
  code: string;
  title: string;
  type: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status: PropertyStatus;
  agent: PropertyAgent;
  listedDate: string;
}

export const mockProperties: PropertyRecord[] = [
  {
    id: "1",
    code: "EST-801",
    title: "The Glasshouse Sanctuary",
    type: "Ultra-Modern Villa",
    location: "Beverly Hills, CA",
    price: 18500000,
    bedrooms: 6,
    bathrooms: 8,
    areaSqft: 9400,
    status: "featured",
    agent: { name: "Elena Rostova", avatarBg: "bg-brand-olive text-white" },
    listedDate: "2026-10-14",
  },
  {
    id: "2",
    code: "EST-802",
    title: "Tribeca Sky Penthouse",
    type: "Duplex Penthouse",
    location: "Tribeca, New York, NY",
    price: 14200000,
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 6100,
    status: "available",
    agent: { name: "Marcus Vance", avatarBg: "bg-brand-gold text-brand-charcoal" },
    listedDate: "2026-10-19",
  },
  {
    id: "3",
    code: "EST-803",
    title: "Biscayne Bay Waterfront Villa",
    type: "Waterfront Estate",
    location: "Miami Beach, FL",
    price: 22750000,
    bedrooms: 7,
    bathrooms: 9,
    areaSqft: 11200,
    status: "available",
    agent: { name: "Sofia Sterling", avatarBg: "bg-brand-charcoal text-white" },
    listedDate: "2026-09-28",
  },
  {
    id: "4",
    code: "EST-804",
    title: "Aspen Alpine Chalet",
    type: "Mountain Retreat",
    location: "Aspen, CO",
    price: 12900000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 7500,
    status: "pending",
    agent: { name: "Elena Rostova", avatarBg: "bg-brand-olive text-white" },
    listedDate: "2026-10-02",
  },
  {
    id: "5",
    code: "EST-805",
    title: "Bel Air Horizon Mansion",
    type: "Contemporary Estate",
    location: "Bel Air, Los Angeles, CA",
    price: 28000000,
    bedrooms: 8,
    bathrooms: 11,
    areaSqft: 14500,
    status: "featured",
    agent: { name: "Marcus Vance", avatarBg: "bg-brand-gold text-brand-charcoal" },
    listedDate: "2026-10-22",
  },
  {
    id: "6",
    code: "EST-806",
    title: "Pacific Palisades Ocean View",
    type: "Coastal Residence",
    location: "Pacific Palisades, CA",
    price: 9800000,
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqft: 5200,
    status: "sold",
    agent: { name: "Sofia Sterling", avatarBg: "bg-brand-charcoal text-white" },
    listedDate: "2026-08-15",
  },
  {
    id: "7",
    code: "EST-807",
    title: "Paradise Valley Desert Compound",
    type: "Luxury Compound",
    location: "Paradise Valley, AZ",
    price: 11450000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 8100,
    status: "available",
    agent: { name: "Marcus Vance", avatarBg: "bg-brand-gold text-brand-charcoal" },
    listedDate: "2026-10-11",
  },
  {
    id: "8",
    code: "EST-808",
    title: "Austin Hill Country Modernist",
    type: "Architectural Villa",
    location: "Austin, TX",
    price: 7600000,
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 5800,
    status: "available",
    agent: { name: "Elena Rostova", avatarBg: "bg-brand-olive text-white" },
    listedDate: "2026-10-25",
  },
];

export interface DataTableArchitectureCard {
  id: string;
  title: string;
  description: string;
}

export const dataTableArchitectureCards: DataTableArchitectureCard[] = [
  {
    id: "generics",
    title: "Type-Safe Generics",
    description:
      "Accepts any generic record type `DataTable<TData>` with full type inference on accessor keys, sorting, and cell render callbacks.",
  },
  {
    id: "columns",
    title: "Column Visibility Toggle",
    description:
      "Users can customize shown or hidden columns on the fly without breaking responsive table layout or pagination state.",
  },
  {
    id: "selection",
    title: "Multi-select & Batch Actions",
    description:
      "Select all on page, select individual rows, and execute batch exports or deletions with a floating batch notification ribbon.",
  },
];

export const propertyImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "2": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "3": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "4": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "5": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
  "6": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "7": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "8": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
};

export const defaultPropertyImage =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

export const propertyStatusSelectOptions: { value: PropertyStatus; label: string }[] = [
  { value: "available", label: "Available for Acquisition" },
  { value: "featured", label: "Trophy Asset (Featured)" },
  { value: "pending", label: "Under Contract / In Escrow" },
  { value: "sold", label: "Conveyed & Closed" },
];

export const luxuryAmenitiesList: string[] = [
  "Private Helipad",
  "Infinity Saltwater Pool",
  "Sommelier Wine Cellar",
  "Sub-Zero Culinary Suite",
  "Dolby Atmos Cinema",
  "Gated Security Enclave",
];

export const propertyGalleryMap: Record<string, string[]> = {
  "1": [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  ],
  "2": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
  ],
  "3": [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
  ],
  "4": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
  ],
  "5": [
    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
  ],
  "6": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
  ],
  "7": [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85",
  ],
  "8": [
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
  ],
};



