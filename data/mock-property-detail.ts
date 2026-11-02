export interface PropertyHighlight {
  label: string;
  value: string;
  iconName: string;
}

export interface PropertyAmenityCategory {
  category: string;
  items: string[];
}

export interface PropertyGalleryImage {
  url: string;
  alt: string;
  title: string;
  tag?: string;
  isHero?: boolean;
}

export interface PropertyFloorPlanItem {
  level: string;
  name: string;
  area: string;
  highlights: string[];
  description: string;
}

export interface PropertyFinancialMetrics {
  annualTaxes: string;
  monthlyHoa: string;
  estimatedMortgage: string;
  suggestedEscrowReserve: string;
  transferTaxTier: string;
}

export interface DetailedProperty {
  id: string;
  slug: string;
  code: string;
  title: string;
  tagline: string;
  price: number;
  priceFormatted: string;
  pricePeriod?: string;
  type: string;
  status: "featured" | "for_sale" | "for_rent" | "exclusive" | "under_contract";
  territory: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  lotSize: string;
  yearBuilt: number;
  garage: number;
  architect: string;
  interiorDesigner: string;
  description: string[];
  keyHighlights: PropertyHighlight[];
  amenities: PropertyAmenityCategory[];
  images: PropertyGalleryImage[];
  floorPlans: PropertyFloorPlanItem[];
  financials: PropertyFinancialMetrics;
  agent: {
    name: string;
    role: string;
    avatarUrl: string;
    phone: string;
    email: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const detailedProperties: DetailedProperty[] = [
  {
    id: "prop-1",
    slug: "the-glasshouse-sanctuary",
    code: "EST-801",
    title: "The Glasshouse Sanctuary",
    tagline: "Cantilevered Modernist Masterpiece with Unobstructed City-to-Ocean Panoramas",
    price: 18500000,
    priceFormatted: "$18,500,000",
    type: "Ultra-Modern Architectural Villa",
    status: "featured",
    territory: "Beverly Hills & Bel Air",
    address: "1140 Loma Linda Drive",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    bedrooms: 6,
    bathrooms: 8,
    areaSqft: 9400,
    lotSize: "0.85 Acres / 37,026 sqft",
    yearBuilt: 2024,
    garage: 4,
    architect: "Olson Kundig & Studio K Architecture",
    interiorDesigner: "Christian Liaigre Atelier",
    description: [
      "Perched upon a private promontory in prime Beverly Hills, The Glasshouse Sanctuary represents the pinnacle of contemporary modernist architecture. Conceived by award-winning architects, the residence merges monumental structural steel engineering with seamless floor-to-ceiling Swiss-engineered glass apertures.",
      "The main pavilion unfolds into dramatic 14-foot volume ceilings, French white oak parquetry, and book-matched Silver Travertine slabs sourced directly from Tivoli quarries. Automated motorized pocket doors retract entirely into hidden wall pockets, effortlessly creating 4,200 square feet of continuous indoor-outdoor entertainment loggias.",
      "The primary sanctuary occupies an entire cantilevered wing, featuring dual bespoke dressing pavilions with custom walnut millwork, a private aromatherapy steam spa, and an outdoor rain courtyard overlooking the glistening lights of the Los Angeles basin."
    ],
    keyHighlights: [
      { label: "Architectural Style", value: "Cantilevered Steel Modernist", iconName: "Building2" },
      { label: "Panoramic Views", value: "Downtown LA to Pacific Ocean", iconName: "Eye" },
      { label: "Outdoor Loggias", value: "4,200 sqft Covered Terraces", iconName: "Maximize2" },
      { label: "Private Vault", value: "Temperature-Controlled 800-Bottle Cellar", iconName: "ShieldCheck" },
      { label: "Water Feature", value: "75ft Zero-Edge Travertine Infinity Pool", iconName: "Sparkles" },
      { label: "Security Protocol", value: "24/7 Monitored Biometric Gated Estate", iconName: "Lock" }
    ],
    amenities: [
      {
        category: "Interior Craftsmanship & Technology",
        items: [
          "Bespoke Boffi kitchen with brushed bronze accents",
          "Gaggenau 400 Series culinary suite & prep scullery",
          "Crestron Home OS automated lighting & climate control",
          "Custom book-matched Silver Travertine slabs throughout",
          "Private acoustically decoupled Dolby Atmos screening theater",
          "Elevator servicing all three levels with leather wall paneling"
        ]
      },
      {
        category: "Wellness & Spa Retreat",
        items: [
          "Finnish cedar dry sauna with Himalayan salt wall",
          "Marble cold plunge bath with continuous filtration",
          "Professional TechnoGym fitness pavilion with garden terrace",
          "Dedicated massage and wellness treatment studio",
          "Outdoor Zen meditation garden with ancient Japanese bonsai"
        ]
      },
      {
        category: "Grounds & Outdoor Living",
        items: [
          "75-foot zero-edge heated infinity pool with Baja shelf",
          "Integrated cantilevered spa overlooking city lights",
          "Outdoor kitchen with Wolf grill, Argentine parrilla & pizza oven",
          "Dual sunken fire pits with custom terrazzo seating",
          "Full motor court with turntable and 4-car climate-controlled showroom"
        ]
      },
      {
        category: "Security & Grounds",
        items: [
          "Gated private motor court with security monitoring",
          "Automated keyless entry and exterior property lighting",
          "Commercial-grade backup generator system",
          "Title report and ALTA boundary survey completed"
        ]
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        alt: "The Glasshouse Sanctuary Beverly Hills Exterior Dusk",
        title: "Main Architectural Facade at Twilight",
        tag: "Exterior Dusk",
        isHero: true
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        alt: "Grand Living Room with Travertine Hearth and Retractable Glass",
        title: "Grand Living Pavilion & Terrace Access",
        tag: "Interior"
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        alt: "Zero-Edge Infinity Pool Overlooking Beverly Hills",
        title: "75-Foot Zero-Edge Infinity Knife Pool",
        tag: "Pool & Grounds"
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        alt: "Primary Bedroom Suite with Panoramic Balcony",
        title: "Cantilevered Primary Suite & Balcony",
        tag: "Primary Suite"
      },
      {
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",
        alt: "Minimalist Boffi Culinary Kitchen & Bronze Island",
        title: "Boffi Master Kitchen & Breakfast Bar",
        tag: "Kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85",
        alt: "Spa Bathroom with Free-Standing Tub and Calacatta Marble",
        title: "Primary En-Suite Wellness Sanctuary",
        tag: "Spa Bathroom"
      }
    ],
    floorPlans: [
      {
        level: "Level 1",
        name: "Main Living & Entertainment Pavilion",
        area: "4,600 sqft",
        highlights: ["14ft Ceilings", "Pocket Glass Doors", "Dual Kitchens", "Terrace Loggia"],
        description: "Encompasses the grand entertaining salon, double-island culinary suite, formal dining for 16, and direct zero-barrier transition to the 75-foot infinity pool."
      },
      {
        level: "Level 2",
        name: "Private Primary Sanctuary & Guest Suites",
        area: "3,200 sqft",
        highlights: ["Cantilevered Primary Suite", "Dual Dressing Rooms", "3 En-Suite Bedrooms", "Sky Lounge"],
        description: "Occupies the upper architectural cantilever, providing maximum acoustic separation, panoramic vistas, and private terrace access for all bedroom suites."
      },
      {
        level: "Sub-Level",
        name: "Wellness Spa, Vault & Collector Gallery",
        area: "1,600 sqft",
        highlights: ["800-Bottle Cellar", "Dolby Screening Room", "TechnoGym Spa", "4-Car Showroom"],
        description: "Designed for discrete relaxation and collector storage, featuring the temperature-controlled tasting cellar, screening room, and cold plunge spa."
      }
    ],
    financials: {
      annualTaxes: "$222,000 / year (Est. Los Angeles County 1.2%)",
      monthlyHoa: "$0 (Private Fee-Simple Independent Parcel)",
      estimatedMortgage: "$94,200 / month (Assuming 20% down, 6.25% Jumbo 30Y)",
      suggestedEscrowReserve: "$925,000 (5% Initial Deposit)",
      transferTaxTier: "City of Los Angeles Measure ULA Applicable"
    },
    agent: {
      name: "Elena Rostova",
      role: "Founding Partner & Luxury Director",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (310) 880-9200",
      email: "elena@auraestates.com",
    },
    seo: {
      metaTitle: "The Glasshouse Sanctuary | $18.5M Modern Villa in Beverly Hills, CA",
      metaDescription: "Explore The Glasshouse Sanctuary: a 9,400 sqft cantilevered modernist home in Beverly Hills featuring 6 beds, 8 baths, and zero-edge infinity pool.",
      keywords: ["Beverly Hills luxury real estate", "The Glasshouse Sanctuary", "modern architectural villa", "Beverly Hills 90210 homes for sale", "luxury real estate Los Angeles"]
    }
  },
  {
    id: "prop-2",
    slug: "tribeca-sky-penthouse",
    code: "EST-802",
    title: "Tribeca Sky Penthouse",
    tagline: "Duplex Sky Manor with 360° Manhattan Skyline & Hudson River Terraces",
    price: 14200000,
    priceFormatted: "$14,200,000",
    type: "Duplex Sky Penthouse",
    status: "exclusive",
    territory: "Tribeca & SoHo, New York, NY",
    address: "72 Franklin Street, Penthouse 18",
    city: "New York",
    state: "NY",
    zip: "10013",
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 6100,
    lotSize: "1,850 sqft Private Wrap Terrace",
    yearBuilt: 2023,
    garage: 2,
    architect: "Annabelle Selldorf Architects",
    interiorDesigner: "Yabu Pushelberg",
    description: [
      "Occupying the entire top two levels of a distinguished cast-iron building in landmark Tribeca, this duplex sky penthouse offers an unmatched dialogue between historic New York architectural proportions and modern minimalist luxury.",
      "A private keyed high-speed elevator opens directly into a soaring double-height gallery featuring custom blackened steel staircases, chevron-patterned Belgian oak floors, and 45 linear feet of continuous skyline exposures over Hudson River sunsets and the Empire State Building.",
      "The private landscaped rooftop terrace spans 1,850 square feet and features an outdoor hearth, dining pavilion, and heated cedar soaking tub framed by the Lower Manhattan skyline."
    ],
    keyHighlights: [
      { label: "Skyline Exposures", value: "360° All Four Cardinal Directions", iconName: "Compass" },
      { label: "Private Roof Deck", value: "1,850 sqft Wrap-Around Oasis", iconName: "Maximize2" },
      { label: "Ceiling Heights", value: "Double-Height 22ft Gallery", iconName: "Building2" },
      { label: "Private Parking", value: "2 Deeded Valet Parking Spaces", iconName: "Car" },
      { label: "Elevator Access", value: "Private Keyed Biometric Direct Elevator", iconName: "Lock" },
      { label: "Fireplaces", value: "3 Ventless Ethanol & Wood Hearths", iconName: "Sparkles" }
    ],
    amenities: [
      {
        category: "Interior Architecture",
        items: [
          "22-foot double-height grand gallery with skylight lantern",
          "Custom Poliform kitchen with Grigio Carnico marble slabs",
          "Sub-Zero 48-inch refrigeration & dual Miele wine reserves",
          "Primary suite with dual limestone en-suite baths & radiant heat",
          "Custom sound-dampened acoustic window glazing"
        ]
      },
      {
        category: "Private Rooftop Terraces",
        items: [
          "Outdoor summer kitchen with Kalamazoo gas grill & refrigeration",
          "Custom Japanese cedar soaking tub with city views",
          "Architectural landscaping with automated drip irrigation",
          "Outdoor gas fireplace with basalt stone surround"
        ]
      },
      {
        category: "Building Amenities & Concierge",
        items: [
          "24/7 discrete white-glove doorman & concierge staff",
          "On-site deeded garage with hydraulic parking lift",
          "Cold storage delivery facilities for private provisioning",
          "Full-floor fitness center & private pilates reformer studio"
        ]
      },
      {
        category: "Building Management & Amenities",
        items: [
          "Condominium ownership with full offering plan available",
          "Flexible ownership structures permitted (trusts and LLCs)",
          "Clear title report and board documentation available"
        ]
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        alt: "Tribeca Sky Penthouse Living Room with Skyline Views",
        title: "Double-Height Great Room at Sunset",
        tag: "Great Room",
        isHero: true
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
        alt: "Rooftop Terrace Overlooking Lower Manhattan Skyline",
        title: "1,850 sqft Private Landscaped Roof Oasis",
        tag: "Roof Terrace"
      },
      {
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",
        alt: "Custom Poliform Kitchen with Italian Marble",
        title: "Chef's Culinary Suite & Wine Reserve",
        tag: "Kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85",
        alt: "Primary Bedroom Suite with Manhattan Views",
        title: "Primary Penthouse Sanctuary",
        tag: "Primary Suite"
      }
    ],
    floorPlans: [
      {
        level: "Level 18",
        name: "Grand Salon & Entertaining Gallery",
        area: "3,400 sqft",
        highlights: ["Double-Height 22ft Ceiling", "Formal Dining", "Poliform Kitchen", "Staff Suite"],
        description: "Primary entertaining level centered around the monumental hearth and floor-to-ceiling glass wall opening toward Hudson River breezes."
      },
      {
        level: "Level 19",
        name: "Primary Wing & Private Suites",
        area: "2,700 sqft",
        highlights: ["Primary En-Suite Sanctuary", "3 Secondary Suites", "Sky Library", "Elevator Foyer"],
        description: "Quiet residential sanctuary level featuring the primary suite with private dressing rooms, soaking bath, and library gallery."
      },
      {
        level: "Rooftop",
        name: "Private Landscaped Sky Terrace",
        area: "1,850 sqft",
        highlights: ["Cedar Soaking Tub", "Kalamazoo Kitchen", "Fireplace", "360° Views"],
        description: "Open-air landscaped sky terrace equipped with private lounge, kitchen, and panoramic skyline seating."
      }
    ],
    financials: {
      annualTaxes: "$148,000 / year (NYC Real Property Tax)",
      monthlyHoa: "$5,850 / month (Common Charges & Building Staff)",
      estimatedMortgage: "$72,300 / month (Assuming 20% down, 6.25% Jumbo 30Y)",
      suggestedEscrowReserve: "$710,000 (5% Initial Deposit)",
      transferTaxTier: "NYS & NYC Real Property Transfer Tax Applicable"
    },
    agent: {
      name: "Marcus Vance",
      role: "Managing Director - Penthouses",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (212) 940-7700",
      email: "marcus@auraestates.com",
    },
    seo: {
      metaTitle: "Tribeca Sky Penthouse | $14.2M Duplex Penthouse in Tribeca, NYC",
      metaDescription: "Discover Tribeca Sky Penthouse: 6,100 sqft duplex residence in landmark Tribeca featuring 4 beds, 5 baths, and 1,850 sqft private landscaped roof terrace.",
      keywords: ["Tribeca penthouse for sale", "luxury real estate NYC", "Tribeca sky penthouse", "Manhattan duplex penthouse", "SoHo luxury condo"]
    }
  },
  {
    id: "prop-3",
    slug: "biscayne-bay-waterfront-villa",
    code: "EST-803",
    title: "Biscayne Bay Waterfront Villa",
    tagline: "Deepwater Modernist Compound with 120ft Superyacht Berth on Star Island",
    price: 24500000,
    priceFormatted: "$24,500,000",
    type: "Deepwater Waterfront Estate",
    status: "for_sale",
    territory: "Star Island & Biscayne, Miami, FL",
    address: "44 Star Island Drive",
    city: "Miami Beach",
    state: "FL",
    zip: "33139",
    bedrooms: 7,
    bathrooms: 9,
    areaSqft: 11800,
    lotSize: "1.1 Acres / 47,916 sqft",
    yearBuilt: 2025,
    garage: 6,
    architect: "SAOTA Architecture & Design",
    interiorDesigner: "Studio Liaigre Miami",
    description: [
      "Commanding 160 linear feet of private deepwater frontage on world-renowned Star Island, this newly completed architectural compound represents the ultimate expression of tropical modernist living.",
      "Crafted by internationally celebrated SAOTA, the residence utilizes cantilevered concrete canopies, ipe wood louvers, and reflection waterways that flow seamlessly between the interior galleries and the turquoise waters of Biscayne Bay.",
      "The private deepwater concrete dock accommodates motor yachts up to 120 feet with direct ocean access and no fixed bridges to Government Cut and the open Atlantic."
    ],
    keyHighlights: [
      { label: "Water Frontage", value: "160 Linear Feet on Biscayne Bay", iconName: "Compass" },
      { label: "Yacht Dockage", value: "120ft Superyacht Deepwater Berth", iconName: "Anchor" },
      { label: "Lot Dimension", value: "1.1 Acres Private Gated Compound", iconName: "Maximize2" },
      { label: "Collector Garage", value: "6-Car Air-Conditioned Showroom", iconName: "Car" },
      { label: "Guest Residence", value: "2-Bedroom Separate Waterfront Pavilion", iconName: "Building2" },
      { label: "Island Security", value: "24/7 Guard-Gated Police Checkpoint", iconName: "ShieldCheck" }
    ],
    amenities: [
      {
        category: "Waterfront Living & Marine Specs",
        items: [
          "Private 120-foot heavy-duty concrete yacht dock with dual 100-amp power",
          "Direct ocean access with zero fixed bridges",
          "Dual personal watercraft floating lifts & kayak launch pad",
          "Private waterside sunset lounge with fire feature"
        ]
      },
      {
        category: "Estate Architecture & Finishes",
        items: [
          "Over 11,800 square feet of air-conditioned interior living",
          "Hurricane category-5 floor-to-ceiling impact glazing",
          "Custom Italian Molteni&C kitchen with double marble islands",
          "1,200-bottle glass wine display tower",
          "Two-bedroom detached guest house with private plunge pool"
        ]
      },
      {
        category: "Resort Pools & Grounds",
        items: [
          "100-foot resort lagoon pool with floating sun loungers",
          "Separate heated saltwater lap pool and cold plunge",
          "Lush tropical botanical landscaping with 80+ mature royal palms",
          "Covered outdoor summer kitchen and cabana with wet bar"
        ]
      },
      {
        category: "Security & Waterfront Access",
        items: [
          "Star Island private 24/7 guardhouse and security monitoring",
          "Private deepwater dockage with 120ft vessel slip",
          "Clean title report and environmental survey completed"
        ]
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
        alt: "Biscayne Bay Waterfront Villa on Star Island Miami",
        title: "Waterfront Facade & 100ft Lagoon Pool",
        tag: "Waterfront Facade",
        isHero: true
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        alt: "Open Concept Living Pavilion with Bay Vistas",
        title: "Grand Water View Pavilion",
        tag: "Great Room"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        alt: "Private Superyacht Dock on Star Island",
        title: "120ft Deepwater Yacht Berth",
        tag: "Yacht Dock"
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        alt: "Primary Balcony Overlooking Biscayne Bay",
        title: "Upper Terrace Sunset View",
        tag: "Sunset Terrace"
      }
    ],
    floorPlans: [
      {
        level: "Main Villa Ground Level",
        name: "Grand Salon, Culinary & Waterfront Loggia",
        area: "6,200 sqft",
        highlights: ["16ft Ceilings", "Wine Tower", "Molteni Kitchen", "Outdoor Dining"],
        description: "Expansive open plan framed by floor-to-ceiling glass walls leading onto the 100-foot resort lagoon pool and yacht dock."
      },
      {
        level: "Main Villa Upper Level",
        name: "Primary Suite & Family Quarters",
        area: "4,100 sqft",
        highlights: ["Grand Master Suite", "Private Gym", "4 En-Suite Bedrooms", "Wrap Terrace"],
        description: "Upper level commanding panoramic views of downtown Miami skyline lights and bay breezes."
      },
      {
        level: "Detached Pavilion",
        name: "Two-Bedroom Waterfront Guest House",
        area: "1,500 sqft",
        highlights: ["2 Suites", "Private Kitchenette", "Separate Plunge Pool"],
        description: "Independent luxury guest villa ensuring complete privacy for long-term visiting principals or staff."
      }
    ],
    financials: {
      annualTaxes: "$294,000 / year (Miami-Dade County)",
      monthlyHoa: "$1,250 / month (Star Island Homeowners Security Association)",
      estimatedMortgage: "$124,500 / month (Assuming 20% down, 6.25% Jumbo 30Y)",
      suggestedEscrowReserve: "$1,225,000 (5% Initial Deposit)",
      transferTaxTier: "Florida Documentary Stamp Tax on Deeds Applicable"
    },
    agent: {
      name: "Sofia Sterling",
      role: "Private Client Wealth Advisor",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (305) 670-3400",
      email: "sofia@auraestates.com",
    },
    seo: {
      metaTitle: "Biscayne Bay Waterfront Villa | $24.5M Star Island Estate in Miami Beach",
      metaDescription: "Experience Biscayne Bay Waterfront Villa on Star Island: 11,800 sqft tropical modernist compound with 120ft yacht dock, 7 beds, and 9 baths.",
      keywords: ["Star Island Miami Beach homes", "luxury waterfront real estate Miami", "Biscayne Bay waterfront villa", "yacht dock mansion Miami", "Star Island estate for sale"]
    }
  },
  {
    id: "prop-4",
    slug: "red-mountain-alpine-chalet",
    code: "EST-804",
    title: "Red Mountain Alpine Chalet",
    tagline: "Direct Ski-in / Ski-out Masterwork with Panoramic Views of Aspen Mountain",
    price: 65000,
    priceFormatted: "$65,000",
    pricePeriod: "/ month",
    type: "Ski-in / Ski-out Alpine Chalet",
    status: "for_rent",
    territory: "Red Mountain, Aspen, CO",
    address: "820 Red Mountain Road",
    city: "Aspen",
    state: "CO",
    zip: "81611",
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 7200,
    lotSize: "2.4 Acres Private Forest",
    yearBuilt: 2024,
    garage: 3,
    architect: "Charles Cunniffe Architects",
    interiorDesigner: "Rowland+Broughton Studio",
    description: [
      "Nestled on the prestigious flanks of Aspen's Red Mountain, this newly constructed alpine masterpiece redefines mountain living with direct private ski access and unobstructed panoramic vistas of Aspen Mountain and Independence Pass.",
      "Hand-hewn timber beams, blackened steel framing, and local Colorado fieldstone blend effortlessly with Scandinavian minimalism. The great room centers around a monumental two-story stone hearth with floor-to-ceiling glass walls capturing alpine sunrises.",
      "The lower level features an equipped ski lounge with heated boot dryers, direct mountain trail access, a cedar barrel sauna, and a heated outdoor stone hydrotherapy spa under the Colorado stars."
    ],
    keyHighlights: [
      { label: "Ski Access", value: "Private Groomed Trail Ski-in / Ski-out", iconName: "Compass" },
      { label: "Parcel Size", value: "2.4 Acres Private Aspen Pine Forest", iconName: "Maximize2" },
      { label: "Hearths", value: "4 Custom Wood & Gas Stone Fireplaces", iconName: "Sparkles" },
      { label: "Ski Lounge", value: "Heated Boot Warmers & Equipment Locker", iconName: "Building2" },
      { label: "Outdoor Spa", value: "12-Person Heated Alpine Hydrotherapy Pool", iconName: "Eye" },
      { label: "Garage", value: "3-Car Heated Collector Garage", iconName: "Car" }
    ],
    amenities: [
      {
        category: "Alpine Luxury & Ski Amenities",
        items: [
          "Direct ski-in / ski-out access to private groomed mountain trails",
          "Dedicated heated equipment room with individual boot warmers",
          "Expansive timber beam great room with 24-foot vaulted ceilings",
          "Chef's kitchen with La Cornue range and Sub-Zero refrigeration",
          "Custom reclaimed barnwood wine tasting room"
        ]
      },
      {
        category: "Wellness & Recovery",
        items: [
          "Custom outdoor 12-person stone hydrotherapy hot tub",
          "Indoor Finnish dry sauna and eucalyptus steam shower",
          "Dedicated fitness and yoga room overlooking alpine pines",
          "Massage and treatment suite"
        ]
      },
      {
        category: "Lease Inclusions & Private Staffing",
        items: [
          "Daily executive housekeeping and concierge service included",
          "Snow clearing and heated driveway/walkways maintained 24/7",
          "Private chef on-call for seasonal residency periods",
          "Full high-speed Starlink satellite mesh internet"
        ]
      },
      {
        category: "Security & Estate Access",
        items: [
          "Private gated mountain road with heated sensor entry",
          "Executive lease agreement with seasonal renewal options",
          "Professional owner representation and local property management"
        ]
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85",
        alt: "Red Mountain Alpine Chalet Aspen Exterior in Winter",
        title: "Alpine Chalet Exterior with Snow Covered Pines",
        tag: "Winter Facade",
        isHero: true
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        alt: "Great Room with Stone Fireplace and Aspen Mountain Views",
        title: "Two-Story Great Room with Timber Beams",
        tag: "Great Room"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        alt: "Outdoor Heated Hot Tub with Mountain Views",
        title: "Heated Hydrotherapy Spa Under Stars",
        tag: "Alpine Spa"
      },
      {
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",
        alt: "Gourmet Kitchen with Mountain Wood Accents",
        title: "Alpine Culinary Center & Hearth",
        tag: "Kitchen"
      }
    ],
    floorPlans: [
      {
        level: "Main Level",
        name: "Great Room, Dining & Culinary Center",
        area: "3,800 sqft",
        highlights: ["24ft Timber Ceilings", "Two-Sided Hearth", "Chef Kitchen", "Wrap Sun Deck"],
        description: "Heart of the alpine chalet featuring the two-story stone hearth and dramatic mountain panorama windows."
      },
      {
        level: "Upper Sanctuary",
        name: "Primary Suite & Guest Wings",
        area: "2,200 sqft",
        highlights: ["Primary Fireplace", "Private Balcony", "Steam Spa", "2 Guest En-Suites"],
        description: "Secluded top floor primary sanctuary with private fireplace and balcony looking out across Aspen Valley."
      },
      {
        level: "Ski Level",
        name: "Ski Lounge, Spa & Bunk Suite",
        area: "1,200 sqft",
        highlights: ["Ski-in/Ski-out Locker", "Boot Dryers", "Sauna", "Hot Tub Access"],
        description: "Ground floor entry designed for slope return, equipped with ski lockers, sauna, and hot tub deck."
      }
    ],
    financials: {
      annualTaxes: "Included in Lease Valuation",
      monthlyHoa: "None / Private Mountain Road Maintenance Included",
      estimatedMortgage: "N/A - Prime Luxury Rental Offering",
      suggestedEscrowReserve: "$130,000 (Two Months Security Deposit)",
      transferTaxTier: "City of Aspen Short/Long-Term Lodging Registration Compliant"
    },
    agent: {
      name: "Marcus Vance",
      role: "Managing Director - Penthouses & Alpine",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (212) 940-7700",
      email: "marcus@auraestates.com",
    },
    seo: {
      metaTitle: "Red Mountain Alpine Chalet | $65,000/mo Luxury Ski Chalet in Aspen, CO",
      metaDescription: "Rent Red Mountain Alpine Chalet in Aspen, Colorado: 7,200 sqft ski-in/ski-out lodge with 5 bedrooms, stone hearths, and private forest acreage.",
      keywords: ["Aspen luxury ski chalet rental", "Red Mountain Aspen homes for rent", "ski-in ski-out Aspen", "luxury mountain retreat Colorado", "Aspen executive rental"]
    }
  },
  {
    id: "prop-5",
    slug: "bel-air-horizon-mansion",
    code: "EST-805",
    title: "Bel Air Horizon Mansion",
    tagline: "Promontory Estate with 300° Pacific Ocean & City Basin Panoramas",
    price: 28000000,
    priceFormatted: "$28,000,000",
    type: "Contemporary Promontory Estate",
    status: "featured",
    territory: "Beverly Hills & Bel Air, Los Angeles, CA",
    address: "10771 Bellagio Road",
    city: "Bel Air",
    state: "CA",
    zip: "90077",
    bedrooms: 8,
    bathrooms: 11,
    areaSqft: 14500,
    lotSize: "1.4 Acres / 60,984 sqft",
    yearBuilt: 2025,
    garage: 8,
    architect: "Paul McClean Design",
    interiorDesigner: "Studio McClean Modernist",
    description: [
      "Rising majestically above the prestigious East Gate of Bel Air, this monumental 14,500-square-foot architectural promontory provides unparalleled 300-degree vistas sweeping from downtown Los Angeles across Century City to Catalina Island and the Pacific Ocean.",
      "Designed by acclaimed master Paul McClean, the estate seamlessly incorporates water features, bridges, and reflecting pools. Dramatic sliding glass panels disappear into the walls, leading to vast travertine entertainment pavilions and a 90-foot curved infinity pool suspended over the canyon.",
      "Additional luxuries include a commercial-grade catering prep kitchen, 1,500-bottle glass wine gallery, 20-seat private cinema, and complete wellness spa with dual plunge pools."
    ],
    keyHighlights: [
      { label: "Promontory Views", value: "300° Ocean, City & Canyon Panorama", iconName: "Eye" },
      { label: "Infinity Pool", value: "90ft Curved Suspended Knife-Edge Pool", iconName: "Sparkles" },
      { label: "Private Cinema", value: "20-Seat 4K Laser Projection Theater", iconName: "Building2" },
      { label: "Collector Garage", value: "8-Car subterranean showroom gallery", iconName: "Car" },
      { label: "Wine Gallery", value: "1,500-Bottle Climate-Controlled Showcase", iconName: "ShieldCheck" },
      { label: "Acreage", value: "1.4 Acres Flat Pad on Exclusive Ridgeway", iconName: "Maximize2" }
    ],
    amenities: [
      {
        category: "Architectural Grandeur & Entertaining",
        items: [
          "Monolithic double-height foyer with floating water bridge entry",
          "Dual Italian Poliform kitchens: display chef island & commercial prep",
          "1,500-bottle temperature-controlled architectural wine gallery",
          "20-seat soundproof cinema with bespoke velvet tiered seating",
          "Executive boardroom suite with private conference facility"
        ]
      },
      {
        category: "Private Spa & Wellness Pavilion",
        items: [
          "Full subterranean wellness wing with steam room and sauna",
          "Dual hydrotherapy cold & warm vitality plunge pools",
          "Dedicated hair salon & aesthetician suite",
          "Professional TechnoGym center with glass canyon views"
        ]
      },
      {
        category: "Grounds & Vehicle Gallery",
        items: [
          "90-foot curved infinity edge pool with integrated fire bowls",
          "Subterranean 8-car gallery with glass viewing window into lounge",
          "Outdoor kitchen with teppanyaki grill and wood-fired pizza oven",
          "Over 6,000 square feet of level lawn and manicured olive groves"
        ]
      },
      {
        category: "Security & Sovereign Governance",
        items: [
          "Bel Air Association 24/7 armed patrol security area",
          "Reinforced private safe room with independent HVAC and telecom",
          "Institutional title package fully prepared for rapid escrow closing"
        ]
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        alt: "Bel Air Horizon Mansion Promontory View",
        title: "Monumental Modernist Promontory Facade",
        tag: "Exterior Dusk",
        isHero: true
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        alt: "Suspended Infinity Pool Overlooking Los Angeles",
        title: "90ft Suspended Infinity Edge Pool",
        tag: "Pool & Views"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        alt: "Grand Great Room with Travertine & Panoramic Glass",
        title: "Grand Horizon Great Room",
        tag: "Great Room"
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        alt: "Primary Suite Balcony with Century City Views",
        title: "Primary Suite Overlook",
        tag: "Primary Suite"
      }
    ],
    floorPlans: [
      {
        level: "Main Level",
        name: "Grand Reception & Great Room Pavilion",
        area: "6,500 sqft",
        highlights: ["18ft Ceilings", "Dual Kitchens", "Executive Office", "Wine Room"],
        description: "Grand reception spaces opening to the 90-foot infinity pool, offering sweeping city and ocean perspectives."
      },
      {
        level: "Upper Level",
        name: "Primary Wing & Family Suites",
        area: "4,800 sqft",
        highlights: ["2,500 sqft Master Suite", "Dual Bathrooms", "4 En-Suite Bedrooms"],
        description: "The primary suite occupies its own private wing with two wardrobe showrooms, private spa baths, and wrap-around viewing terrace."
      },
      {
        level: "Subterranean Level",
        name: "Wellness Spa, Cinema & Auto Gallery",
        area: "3,200 sqft",
        highlights: ["20-Seat Theater", "8-Car Showroom", "Dual Plunges", "Gym"],
        description: "World-class recreation level featuring the private cinema, collector vehicle viewing gallery, and spa complex."
      }
    ],
    financials: {
      annualTaxes: "$336,000 / year (Los Angeles County)",
      monthlyHoa: "$650 / month (Bel Air Association)",
      estimatedMortgage: "$142,500 / month (Assuming 20% down, 6.25% Jumbo 30Y)",
      suggestedEscrowReserve: "$1,400,000 (5% Initial Deposit)",
      transferTaxTier: "City of Los Angeles Measure ULA Applicable"
    },
    agent: {
      name: "Elena Rostova",
      role: "Founding Partner & Luxury Director",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (310) 880-9200",
      email: "elena@auraestates.com",
    },
    seo: {
      metaTitle: "Bel Air Horizon Mansion | $28M Promontory Estate in Bel Air, CA",
      metaDescription: "Tour Bel Air Horizon Mansion: 14,500 sqft Paul McClean contemporary estate with 8 beds, 11 baths, 90ft infinity pool, and 300-degree panoramic ocean views.",
      keywords: ["Bel Air mansion for sale", "Paul McClean architecture", "luxury real estate Bel Air", "Bel Air promontory estate", "ultra luxury homes Los Angeles"]
    }
  },
  {
    id: "prop-6",
    slug: "pacific-palisades-ocean-view",
    code: "EST-806",
    title: "Pacific Palisades Ocean View",
    tagline: "Warm Modernist Cliffside Sanctuary Overlooking Santa Monica Bay",
    price: 9800000,
    priceFormatted: "$9,800,000",
    type: "Coastal Modern Residence",
    status: "for_sale",
    territory: "Pacific Palisades, CA",
    address: "14850 Corona Del Mar",
    city: "Pacific Palisades",
    state: "CA",
    zip: "90272",
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 6800,
    lotSize: "0.65 Acres / 28,314 sqft",
    yearBuilt: 2023,
    garage: 3,
    architect: "Marmol Radziner",
    interiorDesigner: "Amber Interiors Studio",
    description: [
      "Nestled along the bluffs of Pacific Palisades, this warm modern sanctuary by Marmol Radziner harmonizes rich cedar siding, charcoal board-formed concrete, and native coastal flora.",
      "Every room is oriented to frame the tranquil rhythm of the Pacific ocean breakers below. The light-filled open plan offers custom oak millwork, quartzite slab counters, and seamless glass corners that open to lush ocean-view lawns and an outdoor coastal fire lounge.",
      "The primary suite captures morning sea breezes and sunset colors over Point Dume, complete with a private oceanfront soaking balcony."
    ],
    keyHighlights: [
      { label: "Coastal Exposure", value: "Panoramic Santa Monica Bay to Point Dume", iconName: "Compass" },
      { label: "Architectural Blend", value: "Warm Organic Modernism & Board-Formed Concrete", iconName: "Building2" },
      { label: "Beach Proximity", value: "Moments to Will Rogers & Malibu Coves", iconName: "Sparkles" },
      { label: "Private Lawn", value: "Level Cliffside Oceanview Lawn & Spa", iconName: "Maximize2" },
      { label: "Solar Technology", value: "Integrated Tesla Solar Roof & Powerwalls", iconName: "ShieldCheck" },
      { label: "Garage", value: "3-Car Direct Access Garage with EV Fast Chargers", iconName: "Car" }
    ],
    amenities: [
      {
        category: "Interior Warm Modernism",
        items: [
          "Custom rift-sawn white oak millwork and hidden storage cabinetry",
          "Chef's kitchen with Taj Mahal quartzite countertops & Dornbracht fixtures",
          "Miele MasterCool refrigeration suite & integrated wine columns",
          "Sonos architectural sound zoned throughout interior and grounds",
          "Automated Lutron motorized shades on all ocean-facing glass"
        ]
      },
      {
        category: "Coastal Grounds & Wellness",
        items: [
          "Heated saltwater plunge pool and integrated hydrotherapy spa",
          "Custom limestone gas fire terrace overlooking coastal surf",
          "Outdoor hot water surf shower and equipment rinse station",
          "Drought-tolerant native coastal sage and olive tree landscaping"
        ]
      },
      {
        category: "Green Technology & Efficiency",
        items: [
          "Tesla Solar glass roof tile system with 3 Powerwall battery reserves",
          "Dual Level-2 electric vehicle fast charging stations",
          "High-efficiency variable-speed multi-zone heat pump HVAC"
        ]
      },
      {
        category: "Security & Property Boundaries",
        items: [
          "Private gated driveway with security monitoring",
          "Geological slope study and boundary survey completed"
        ]
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        alt: "Pacific Palisades Ocean View Residence Exterior",
        title: "Warm Modernist Bluffside Facade",
        tag: "Coastal Facade",
        isHero: true
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        alt: "Great Room with Ocean View Sliding Glass",
        title: "Oceanfront Living Room with Horizon Views",
        tag: "Living Room"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        alt: "Cliffside Pool and Lawn Overlooking Pacific Ocean",
        title: "Saltwater Plunge Pool & Ocean Lawn",
        tag: "Pool & Lawn"
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        alt: "Primary Bedroom with Point Dume Sunset Balcony",
        title: "Oceanview Primary Bedroom Suite",
        tag: "Primary Suite"
      }
    ],
    floorPlans: [
      {
        level: "Main Level",
        name: "Coastal Living Pavilion & Terrace",
        area: "4,200 sqft",
        highlights: ["Disappearing Glass Walls", "Quartzite Kitchen", "Guest Suite", "Surf Lounge"],
        description: "Open coastal plan merging the great room and gourmet kitchen with the lawn and fire terrace."
      },
      {
        level: "Upper Level",
        name: "Primary Suite & Family Bedrooms",
        area: "2,600 sqft",
        highlights: ["Primary Ocean Suite", "3 En-Suite Bedrooms", "Family Den", "Sunset Balcony"],
        description: "Four ocean-facing bedroom suites including the primary suite with private terrace and soaking tub."
      }
    ],
    financials: {
      annualTaxes: "$118,000 / year (Los Angeles County)",
      monthlyHoa: "$0 (Private Parcel)",
      estimatedMortgage: "$49,800 / month (Assuming 20% down, 6.25% Jumbo 30Y)",
      suggestedEscrowReserve: "$490,000 (5% Initial Deposit)",
      transferTaxTier: "City of Los Angeles Measure ULA Applicable"
    },
    agent: {
      name: "Elena Rostova",
      role: "Founding Partner & Luxury Director",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (310) 880-9200",
      email: "elena@auraestates.com",
    },
    seo: {
      metaTitle: "Pacific Palisades Ocean View | $9.8M Coastal Modern Residence",
      metaDescription: "Tour Pacific Palisades Ocean View: 6,800 sqft Marmol Radziner warm modernist coastal home with 5 beds, 6 baths, and panoramic ocean vistas.",
      keywords: ["Pacific Palisades homes for sale", "Marmol Radziner architecture", "luxury ocean view real estate", "coastal modern home Los Angeles", "Pacific Palisades luxury"]
    }
  }
];

export function getPropertyBySlug(slug: string): DetailedProperty | undefined {
  return detailedProperties.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase()
  );
}

export function getAllPropertySlugs(): string[] {
  return detailedProperties.map((p) => p.slug);
}

export function getSimilarProperties(currentSlug: string, limit = 3): DetailedProperty[] {
  return detailedProperties.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
