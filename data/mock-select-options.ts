import { Option } from "@/components/ui/async-select";

export const allNeighborhoods: Option[] = [
  { id: "nh-1", name: "Beverly Hills, CA", city: "Los Angeles", avgPrice: "$12.5M" },
  { id: "nh-2", name: "Tribeca, NY", city: "New York", avgPrice: "$9.8M" },
  { id: "nh-3", name: "Star Island, FL", city: "Miami Beach", avgPrice: "$24.0M" },
  { id: "nh-4", name: "Red Mountain, CO", city: "Aspen", avgPrice: "$16.2M" },
  { id: "nh-5", name: "Bel Air, CA", city: "Los Angeles", avgPrice: "$18.9M" },
  { id: "nh-6", name: "Carbon Beach, CA", city: "Malibu", avgPrice: "$15.4M" },
  { id: "nh-7", name: "SoHo Cast Iron, NY", city: "New York", avgPrice: "$8.4M" },
  { id: "nh-8", name: "Paradise Valley, AZ", city: "Phoenix", avgPrice: "$7.5M" },
  { id: "nh-9", name: "Pacific Palisades, CA", city: "Los Angeles", avgPrice: "$11.0M" },
  { id: "nh-10", name: "Fisher Island, FL", city: "Miami", avgPrice: "$21.5M" },
  { id: "nh-11", name: "Kinnelon Luxury Enclave, NJ", city: "New Jersey", avgPrice: "$4.9M" },
  { id: "nh-12", name: "Lake Austin Waterfront, TX", city: "Austin", avgPrice: "$6.8M" },
  { id: "nh-13", name: "Jackson Hole Valley, WY", city: "Jackson", avgPrice: "$13.2M" },
  { id: "nh-14", name: "Naples Waterfront, FL", city: "Naples", avgPrice: "$14.7M" },
  { id: "nh-15", name: "West Village Brownstones, NY", city: "New York", avgPrice: "$10.5M" },
];

export const initialAmenities: Option[] = [
  { id: "am-1", name: "Private Helipad" },
  { id: "am-2", name: "Infinity Pool & Hot Tub" },
  { id: "am-3", name: "Temperature-Controlled Wine Cellar" },
  { id: "am-4", name: "Smart Home Automation (Control4)" },
  { id: "am-5", name: "Full Wellness Spa & Dry Sauna" },
  { id: "am-6", name: "Championship Tennis Court" },
  { id: "am-7", name: "Direct Ocean / Waterfront Access" },
  { id: "am-8", name: "Dolby Atmos 12-Seat Cinema" },
  { id: "am-9", name: "Subterranean 8-Car Gallery Garage" },
  { id: "am-10", name: "Private Deepwater Yacht Slip" },
];

export interface AsyncSelectHighlight {
  id: string;
  title: string;
  description: string;
}

export const asyncSelectHighlights: AsyncSelectHighlight[] = [
  {
    id: "infinite-scroll",
    title: "IntersectionObserver Infinite Scroll",
    description:
      'Monitors the bottom sentinel element to fetch the next page smoothly without UI lag or manual "Load More" clicking.',
  },
  {
    id: "debounce",
    title: "Automatic Debounced Filtering",
    description:
      "Built-in 300ms debouncing prevents excess network requests while maintaining an ultra-responsive typing experience.",
  },
  {
    id: "framework-agnostic",
    title: "Zero Backend / Framework Agnostic",
    description:
      "Consumes any promise returning { data: [], meta: { pagination: {} } } with full light & dark theme support.",
  },
];

