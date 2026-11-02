export interface HeaderNavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface PortalNavLink {
  id: string;
  label: string;
  shortLabel: string;
  badge: string;
  description: string;
  href: string;
  iconName: "Shield" | "Layers";
}

export const portalNavLinks: PortalNavLink[] = [
  {
    id: "admin",
    label: "Admin Dashboard",
    shortLabel: "Admin CRM",
    badge: "Executive",
    description: "Property CRM, listing inventory, leads & analytics",
    href: "/admin",
    iconName: "Shield",
  },
  {
    id: "components",
    label: "Theme & UI Library",
    shortLabel: "Theme Dash",
    badge: "Design System",
    description: "Component library, design tokens & interactive widgets",
    href: "/components",
    iconName: "Layers",
  },
];

export const headerNavLinks: HeaderNavLink[] = [
  { label: "Featured Properties", href: "/properties" },
  { label: "Locations", href: "/#locations" },
  { label: "About Us", href: "/about" },
  { label: "Meet Our Team", href: "/#team" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const luxuryMarqueeItems: string[] = [
  "Beverly Hills & Bel Air",
  "Tribeca & SoHo Penthouses",
  "Star Island Waterfront Estates",
  "Contemporary Architectural Homes",
  "Aspen Alpine Residences",
  "Distinctive Modern Architecture",
  "Prime Coastal Properties",
  "Miami Beach Waterfront",
];

export interface HeroMetric {
  value: string;
  label: string;
  sublabel: string;
}

export const heroMetrics: HeroMetric[] = [
  {
    value: "Prime Markets",
    label: "Key Destinations",
    sublabel: "Beverly Hills, New York, Miami & Aspen",
  },
  {
    value: "Architectural Focus",
    label: "Curated Estates",
    sublabel: "Modernist, contemporary & historic homes",
  },
  {
    value: "Personalized Service",
    label: "Dedicated Advisors",
    sublabel: "Direct senior advisor guidance throughout",
  },
  {
    value: "Global Network",
    label: "International Reach",
    sublabel: "Connecting qualified buyers and sellers worldwide",
  },
];

export interface SelectOption {
  value: string;
  label: string;
}

export const heroFilterLocations: SelectOption[] = [
  { value: "all", label: "All Locations" },
  { value: "beverly-hills", label: "Beverly Hills & Bel Air, CA" },
  { value: "tribeca", label: "Tribeca & SoHo, New York, NY" },
  { value: "miami", label: "Star Island & Biscayne, Miami, FL" },
  { value: "aspen", label: "Aspen, CO" },
  { value: "austin", label: "Austin, TX" },
];

export const heroFilterPropertyTypes: SelectOption[] = [
  { value: "all", label: "All Property Types" },
  { value: "villa", label: "Modern Villas" },
  { value: "penthouse", label: "Luxury Penthouses" },
  { value: "compound", label: "Waterfront Estates" },
  { value: "modernist", label: "Architectural Residences" },
];

export const heroFilterPriceRanges: SelectOption[] = [
  { value: "all", label: "Any Price Range" },
  { value: "5-10m", label: "$5,000,000 – $10,000,000" },
  { value: "10-20m", label: "$10,000,000 – $20,000,000" },
  { value: "20-50m", label: "$20,000,000 – $50,000,000" },
  { value: "50m+", label: "$50,000,000+" },
];

export const portfolioFilterTabs: { id: string; label: string }[] = [
  { id: "all", label: "All Properties" },
  { id: "beverly-hills", label: "Beverly Hills" },
  { id: "tribeca", label: "New York" },
  { id: "miami", label: "Miami Beach" },
  { id: "austin", label: "Austin" },
];

export const propertySortOptions: SelectOption[] = [
  { value: "featured", label: "Featured First" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "area-desc", label: "Area: Largest First" },
];

export const bedroomFilterOptions: SelectOption[] = [
  { value: "all", label: "All Bedrooms" },
  { value: "3", label: "3+ Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
  { value: "5", label: "5+ Bedrooms" },
  { value: "6", label: "6+ Bedrooms" },
];

export const contactPrincipalTypes: SelectOption[] = [
  { value: "buyer", label: "Prospective Buyer" },
  { value: "seller", label: "Property Owner / Seller" },
  { value: "representative", label: "Advisor / Representative" },
  { value: "other", label: "General Inquiry" },
];

export const contactInquiryTypes: SelectOption[] = [
  { value: "acquisition", label: "Buying a Property" },
  { value: "disposition", label: "Selling a Property" },
  { value: "viewing", label: "Schedule a Private Viewing" },
  { value: "consultation", label: "General Real Estate Advisory" },
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
    tagline: "Modernist architecture and secluded hillside residences.",
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
    tagline: "Historic cast-iron architecture and skyline penthouses.",
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
    tagline: "Private deepwater dockage and waterfront estates.",
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
    tagline: "Alpine chalets with direct ski access and mountain panoramas.",
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
    title: "Complete Discretion",
    description:
      "We respect our clients' privacy, ensuring confidential representation and secure communication at every stage of the transaction.",
    badge: "Confidentiality",
  },
  {
    id: "architectural",
    number: "02",
    title: "Architectural Focus",
    description:
      "Every property in our portfolio is evaluated for exceptional architectural design, quality craftsmanship, and enduring value.",
    badge: "Curated Design",
  },
  {
    id: "expertise",
    number: "03",
    title: "Deep Market Knowledge",
    description:
      "Our advisors offer genuine insight across prime destinations, helping clients navigate the luxury market with confidence.",
    badge: "Market Insight",
  },
  {
    id: "advisory",
    number: "04",
    title: "Personalized Advisory",
    description:
      "Direct, attentive guidance tailored to your specific goals, from property search and viewings to negotiations and closing.",
    badge: "Client Service",
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
      "Aura Estates helped us find an extraordinary home in Bel Air. Their patience, deep knowledge of architecture, and attention to detail made the entire search effortless.",
    principalTitle: "Homeowner",
    transactionContext: "Bel Air Residence",
    year: "2026",
  },
  {
    id: "t2",
    quote:
      "The team provided thoughtful, discreet guidance during our search in Tribeca. They understood exactly what we were looking for from our first conversation.",
    principalTitle: "Private Client",
    transactionContext: "Tribeca Penthouse",
    year: "2026",
  },
  {
    id: "t3",
    quote:
      "Outstanding professionalism and discretion. From the initial private showing through to closing, every detail was handled with genuine care and integrity.",
    principalTitle: "Estate Owner",
    transactionContext: "Miami Beach Waterfront",
    year: "2025",
  },
];

export interface FooterNavColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerNavSections: FooterNavColumn[] = [
  {
    title: "Properties",
    links: [
      { label: "Modern Villas", href: "/properties?type=villa" },
      { label: "Luxury Penthouses", href: "/properties?type=penthouse" },
      { label: "Waterfront Estates", href: "/properties?type=compound" },
      { label: "All Properties", href: "/properties" },
      { label: "Saved Properties", href: "/properties?filter=saved" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Beverly Hills & Bel Air", href: "/properties?location=beverly-hills" },
      { label: "Tribeca & SoHo, New York", href: "/properties?location=tribeca" },
      { label: "Star Island & Biscayne, Miami", href: "/properties?location=miami" },
      { label: "Aspen, Colorado", href: "/properties?location=aspen" },
      { label: "Austin, Texas", href: "/properties?location=austin" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story & Philosophy", href: "/about" },
      { label: "Meet Our Team", href: "/#team" },
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Schedule a Consultation", href: "/contact" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms of Service", href: "/about" },
      { label: "Equal Housing Opportunity", href: "/about" },
      { label: "Accessibility Statement", href: "/about" },
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
    city: "New York",
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
