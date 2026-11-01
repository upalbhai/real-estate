export interface HeaderNavLink {
  label: string;
  href: string;
  badge?: string;
}

export const headerNavLinks: HeaderNavLink[] = [
  { label: "Portfolio", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const luxuryMarqueeItems: string[] = [
  "Beverly Hills & Bel Air",
  "Tribeca & SoHo Penthouse Sanctuaries",
  "$4.8B+ Private Transacted Assets",
  "Star Island Waterfront Compounds",
  "Cantilevered Modernist Masterworks",
  "100% Off-Market Bilateral NDA Protocol",
  "Red Mountain Alpine Estates",
  "Institutional Title & Escrow Clearance",
  "Mayfair & Côte d'Azur Private Representation",
];

export interface HeroMetric {
  value: string;
  label: string;
  sublabel: string;
}

export const heroMetrics: HeroMetric[] = [
  {
    value: "$4.8B+",
    label: "Private Assets Transacted",
    sublabel: "Across prime global markets",
  },
  {
    value: "18",
    label: "Off-Market Dossiers",
    sublabel: "Strictly confidential inventory",
  },
  {
    value: "100%",
    label: "Escrow & Title Clearance",
    sublabel: "Institutional fiduciary standard",
  },
  {
    value: "4 Hubs",
    label: "Global Atelier Presence",
    sublabel: "LA • NY • London • Dubai",
  },
];

export interface SelectOption {
  value: string;
  label: string;
}

export const heroFilterLocations: SelectOption[] = [
  { value: "all", label: "All Prime Territories" },
  { value: "beverly-hills", label: "Beverly Hills & Bel Air, CA" },
  { value: "tribeca", label: "Tribeca & SoHo, New York, NY" },
  { value: "miami", label: "Star Island & Biscayne, Miami, FL" },
  { value: "aspen", label: "Red Mountain, Aspen, CO" },
  { value: "austin", label: "Lake Austin Hill Country, TX" },
];

export const heroFilterPropertyTypes: SelectOption[] = [
  { value: "all", label: "All Architectural Types" },
  { value: "villa", label: "Ultra-Modern Villas" },
  { value: "penthouse", label: "Duplex & Triplex Penthouses" },
  { value: "compound", label: "Waterfront Compounds" },
  { value: "modernist", label: "Architectural Sculptures" },
];

export const heroFilterPriceRanges: SelectOption[] = [
  { value: "all", label: "Any Valuation Tier" },
  { value: "5-10m", label: "$5,000,000 – $10,000,000" },
  { value: "10-20m", label: "$10,000,000 – $20,000,000" },
  { value: "20-50m", label: "$20,000,000 – $50,000,000" },
  { value: "50m+", label: "$50,000,000+ Trophy Assets" },
];

export const portfolioFilterTabs: { id: string; label: string }[] = [
  { id: "all", label: "All Acquisitions" },
  { id: "beverly-hills", label: "Beverly Hills" },
  { id: "tribeca", label: "Tribeca & NY" },
  { id: "miami", label: "Miami Beach" },
  { id: "austin", label: "Austin" },
];

export const propertySortOptions: SelectOption[] = [
  { value: "featured", label: "Curated / Featured First" },
  { value: "price-desc", label: "Valuation: High to Low" },
  { value: "price-asc", label: "Valuation: Low to High" },
  { value: "area-desc", label: "Interior Area: Largest First" },
];

export const bedroomFilterOptions: SelectOption[] = [
  { value: "all", label: "All Bedrooms" },
  { value: "3", label: "3+ Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
  { value: "5", label: "5+ Bedrooms" },
  { value: "6", label: "6+ Bedrooms" },
];

export const contactPrincipalTypes: SelectOption[] = [
  { value: "individual", label: "Private Individual / Principal" },
  { value: "family_office", label: "Single / Multi-Family Office" },
  { value: "investment_fund", label: "Private Equity / Investment Fund" },
  { value: "fiduciary_advisor", label: "Legal / Fiduciary Representative" },
];

export const contactInquiryTypes: SelectOption[] = [
  { value: "acquisition", label: "Confidential Estate Acquisition" },
  { value: "disposition", label: "Off-Market Estate Disposition / Sale" },
  { value: "viewing", label: "Private Architectural Viewing Appointment" },
  { value: "vault_access", label: "Request Access to Off-Market Vault" },
];




export interface NeighborhoodCollection {
  id: string;
  city: string;
  region: string;
  country: string;
  activeListingsCount: number;
  averagePrice: string;
  imageUrl: string;
  tagline: string;
}

export const neighborhoodCollections: NeighborhoodCollection[] = [
  {
    id: "beverly-hills",
    city: "Beverly Hills & Bel Air",
    region: "California",
    country: "United States",
    activeListingsCount: 14,
    averagePrice: "$22.4M",
    imageUrl:
      "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1200&q=80",
    tagline: "Cantilevered Modernism & Secluded Hillside Enclaves",
  },
  {
    id: "tribeca",
    city: "Tribeca & SoHo",
    region: "New York",
    country: "United States",
    activeListingsCount: 9,
    averagePrice: "$16.8M",
    imageUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    tagline: "Historic Cast-Iron Facades & Triplex Sky Sanctuaries",
  },
  {
    id: "miami",
    city: "Star Island & Biscayne",
    region: "Florida",
    country: "United States",
    activeListingsCount: 11,
    averagePrice: "$28.5M",
    imageUrl:
      "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1200&q=80",
    tagline: "Private Deepwater Docks & Ultra-Contemporary Villas",
  },
  {
    id: "aspen",
    city: "Red Mountain & Downtown",
    region: "Colorado",
    country: "United States",
    activeListingsCount: 7,
    averagePrice: "$34.2M",
    imageUrl:
      "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Ski-In/Ski-Out Alpine Compounds with Panoramic Peaks",
  },
];

export interface AtelierValueProp {
  id: string;
  number: string;
  title: string;
  description: string;
  badge: string;
}

export const atelierValueProps: AtelierValueProp[] = [
  {
    id: "discretion",
    number: "01",
    title: "Off-Market Discretion",
    description:
      "Over 40% of our ultra-prime transactions conclude without public syndication, safeguarding institutional privacy and principal anonymity.",
    badge: "Confidentiality",
  },
  {
    id: "architectural",
    number: "02",
    title: "Architectural Pedigree",
    description:
      "Every property undergoes an exhaustive curatorial review evaluating structural provenance, materials authenticity, and long-term capital resilience.",
    badge: "Curated Standards",
  },
  {
    id: "fiduciary",
    number: "03",
    title: "Institutional Escrow Governance",
    description:
      "Our fiduciary desk liaises directly with global family offices, private wealth banks, and sovereign advisors to streamline cross-border closings.",
    badge: "Fiduciary Security",
  },
  {
    id: "global",
    number: "04",
    title: "Private Global Concierge",
    description:
      "Direct personal representation by senior equity partners across Los Angeles, New York, London, Zurich, and Dubai.",
    badge: "Bespoke Advisory",
  },
];

export interface ClientTestimonial {
  id: string;
  quote: string;
  principalTitle: string;
  transactionContext: string;
  year: string;
}

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: "t1",
    quote:
      "Aura secured our Trousdale architectural off-market within twelve days. Their discretion and fiduciary rigor match that of top-tier private investment banks.",
    principalTitle: "Managing Principal • Global Technology Fund",
    transactionContext: "$24.5M Bel Air Acquisition",
    year: "2026",
  },
  {
    id: "t2",
    quote:
      "The architectural dossier provided by Aura was peerless. Every mechanical detail, historical permit, and acoustic specification was verified prior to escrow.",
    principalTitle: "CIO • Geneva Single Family Office",
    transactionContext: "$18.2M Tribeca Penthouse Conveyance",
    year: "2026",
  },
  {
    id: "t3",
    quote:
      "In luxury real estate, true discretion is rare. Aura handled our oceanfront estate sale completely off public records with absolute integrity.",
    principalTitle: "Founder & Chairman • Venture Group",
    transactionContext: "$31.0M Biscayne Bay Compound",
    year: "2025",
  },
];

export interface FooterNavColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerNavSections: FooterNavColumn[] = [
  {
    title: "Curated Portfolios",
    links: [
      { label: "Trophy Architectural Villas", href: "/properties?type=villa" },
      { label: "Duplex & Triplex Penthouses", href: "/properties?type=penthouse" },
      { label: "Deepwater Waterfront Estates", href: "/properties?type=waterfront" },
      { label: "Alpine Ski Compounds", href: "/properties?type=alpine" },
      { label: "Private Off-Market Vault", href: "/contact" },
    ],
  },
  {
    title: "Territories",
    links: [
      { label: "Beverly Hills & Bel Air", href: "/properties?location=beverly-hills" },
      { label: "Tribeca & SoHo, New York", href: "/properties?location=tribeca" },
      { label: "Star Island & Biscayne, Miami", href: "/properties?location=miami" },
      { label: "Red Mountain, Aspen", href: "/properties?location=aspen" },
      { label: "Mayfair & Knightsbridge, London", href: "/properties?location=london" },
    ],
  },
  {
    title: "The Atelier",
    links: [
      { label: "Atelier Heritage & Philosophy", href: "/about" },
      { label: "Senior Listing Partners", href: "/#advisors" },
      { label: "Component Design System", href: "/components" },
      { label: "Executive Terminal (Admin)", href: "/admin" },
      { label: "Private Client Desk", href: "/contact" },
    ],
  },
  {
    title: "Governance & Escrow",
    links: [
      { label: "Fiduciary Standards", href: "/about" },
      { label: "Anti-Money Laundering Protocols", href: "/about" },
      { label: "Equal Housing Opportunity", href: "/about" },
      { label: "Confidentiality & NDA Policy", href: "/about" },
      { label: "Terms of Representation", href: "/about" },
    ],
  },
];

export interface GlobalOfficeItem {
  city: string;
  address: string;
  phone: string;
  email: string;
}

export const globalOffices: GlobalOfficeItem[] = [
  {
    city: "Beverly Hills",
    address: "9450 Wilshire Boulevard, Suite 800, Beverly Hills, CA 90212",
    phone: "+1 (310) 880-9200",
    email: "beverlyhills@auraestates.com",
  },
  {
    city: "New York (Tribeca)",
    address: "68 Franklin Street, Penthouse Studio, New York, NY 10013",
    phone: "+1 (212) 940-7700",
    email: "newyork@auraestates.com",
  },
  {
    city: "Miami",
    address: "1111 Lincoln Road, Suite 750, Miami Beach, FL 33139",
    phone: "+1 (305) 670-3400",
    email: "miami@auraestates.com",
  },
  {
    city: "London",
    address: "24 Berkeley Square, Mayfair, London W1J 6HE, United Kingdom",
    phone: "+44 20 7946 0991",
    email: "london@auraestates.com",
  },
];
