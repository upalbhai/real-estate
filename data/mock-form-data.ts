export interface FormSelectOption {
  value: string;
  label: string;
}

export const propertyTypes: FormSelectOption[] = [
  { value: "villa", label: "Modern Architectural Villa" },
  { value: "penthouse", label: "Duplex Sky Penthouse" },
  { value: "waterfront", label: "Coastal / Waterfront Estate" },
  { value: "chalet", label: "Alpine Mountain Chalet" },
  { value: "compound", label: "Private Gated Compound" },
  { value: "mansion", label: "Historic Heritage Mansion" },
];

export const priceRanges: FormSelectOption[] = [
  { value: "all", label: "Any Price Range" },
  { value: "2m-5m", label: "$2,000,000 – $5,000,000" },
  { value: "5m-10m", label: "$5,000,000 – $10,000,000" },
  { value: "10m-20m", label: "$10,000,000 – $20,000,000" },
  { value: "20m+", label: "$20,000,000+" },
];

export const bedroomOptions: FormSelectOption[] = [
  { value: "any", label: "Any Bedrooms" },
  { value: "3+", label: "3+ Bedrooms" },
  { value: "4+", label: "4+ Bedrooms" },
  { value: "5+", label: "5+ Bedrooms" },
  { value: "6+", label: "6+ Bedrooms" },
];

export interface AmenityCheckboxItem {
  id: string;
  label: string;
  description: string;
}

export const featureCheckboxes: AmenityCheckboxItem[] = [
  {
    id: "pool",
    label: "Infinity Edge Pool",
    description: "Heated salt-water infinity pool with panoramic views",
  },
  {
    id: "helipad",
    label: "Private Helipad",
    description: "FAA-approved private landing pad on estate grounds",
  },
  {
    id: "wine",
    label: "Sommelier Wine Vault",
    description: "Dual-zone temperature and humidity controlled cellar",
  },
  {
    id: "spa",
    label: "Nordic Spa & Sauna",
    description: "Dedicated wellness wing with steam room and plunge pool",
  },
];

export interface ListingTypeOption {
  value: string;
  title: string;
  description: string;
  badge: string;
}

export const listingTypeOptions: ListingTypeOption[] = [
  {
    value: "sale",
    title: "Outright Acquisition (For Sale)",
    description: "Full fee-simple ownership with global title transfer.",
    badge: "Most Common",
  },
  {
    value: "lease",
    title: "Luxury Long-Term Lease",
    description: "Furnished executive tenancy with concierge maintenance.",
    badge: "Annual Lease",
  },
  {
    value: "exclusive",
    title: "Private Off-Market Dossier",
    description: "Confidential private sale with NDA required prior to viewing.",
    badge: "VIP Exclusive",
  },
];


export interface JurisdictionOption {
  value: string;
  label: string;
  description: string;
}

export const jurisdictionOptions: JurisdictionOption[] = [
  {
    value: "ca",
    label: "California Superior Trust",
    description: "Superior Trust & Escrow Division",
  },
  {
    value: "ny",
    label: "New York Commercial Real Estate",
    description: "Commercial & Mixed-Use Title Office",
  },
  {
    value: "fl",
    label: "Florida Coastal Homestead",
    description: "Coastal Homestead & Asset Protection",
  },
  {
    value: "tx",
    label: "Texas Sovereignty & Mineral Trust",
    description: "Ranch & Mineral Rights Conveyance",
  },
];
