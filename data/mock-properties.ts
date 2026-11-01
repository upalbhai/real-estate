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

