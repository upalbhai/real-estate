import { BadgeVariant } from "@/components/ui/badge";

export interface AdminDemoAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  badge: string;
  description: string;
}

export const adminDemoAccounts: AdminDemoAccount[] = [
  {
    id: "demo-principal",
    name: "Alexander Vance",
    email: "a.vance@auraestates.com",
    role: "Managing Principal",
    badge: "Super Admin",
    description: "Full global portfolio authority, escrow approval, and team governance.",
  },
  {
    id: "demo-partner",
    name: "Elena Rostova",
    email: "e.rostova@auraestates.com",
    role: "Senior Partner - West Coast",
    badge: "Director",
    description: "California & Pacific Coast acquisitions, luxury listings, and client advisory.",
  },
  {
    id: "demo-director",
    name: "Marcus Vance",
    email: "m.vance@auraestates.com",
    role: "Head of Acquisitions",
    badge: "Portfolio Lead",
    description: "New York & Miami off-market dossiers, institutional escrows, and investor relations.",
  },
];

export interface AdminNavItem {
  name: string;
  href: string;
  iconName: "LayoutDashboard" | "Building2" | "Users" | "LineChart" | "Settings" | "Shield" | "FileText";
  badge?: string;
  badgeVariant?: BadgeVariant;
}

export interface AdminNavSection {
  section: string;
  items: AdminNavItem[];
}

export const adminNavSections: AdminNavSection[] = [
  {
    section: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        iconName: "LayoutDashboard",
      },
    ],
  },
  {
    section: "Asset Management",
    items: [
      {
        name: "Properties Portfolio",
        href: "/admin/properties",
        iconName: "Building2",
        badge: "8 Active",
        badgeVariant: "gold",
      },
      {
        name: "HNW Inquiries & Leads",
        href: "/admin/leads",
        iconName: "Users",
        badge: "5 New",
        badgeVariant: "available",
      },
      {
        name: "Market Analytics",
        href: "/admin/analytics",
        iconName: "LineChart",
      },
    ],
  },
  {
    section: "Operations",
    items: [
      {
        name: "Portal Settings",
        href: "/admin/settings",
        iconName: "Settings",
      },
    ],
  },
];

export interface AdminDashboardStat {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  caption: string;
  iconName: "TrendingUp" | "Building2" | "DollarSign" | "Users";
  badgeText: string;
}

export const adminDashboardStats: AdminDashboardStat[] = [
  {
    id: "stat-total-assets",
    title: "Total Portfolio Value",
    value: "$148.6M",
    change: "+14.8%",
    trend: "up",
    caption: "Across 8 curated trophy assets",
    iconName: "DollarSign",
    badgeText: "Real-time Valuations",
  },
  {
    id: "stat-active-escrows",
    title: "Active Escrows",
    value: "$42.7M",
    change: "+22.5%",
    trend: "up",
    caption: "3 estates under contract",
    iconName: "Building2",
    badgeText: "High Velocity",
  },
  {
    id: "stat-hnw-inquiries",
    title: "Vetted HNW Pipeline",
    value: "24 Leads",
    change: "+8.3%",
    trend: "up",
    caption: "Average buyer liquid assets $45M+",
    iconName: "Users",
    badgeText: "VIP Registrations",
  },
  {
    id: "stat-transacted-volume",
    title: "Q3 Closed Volume",
    value: "$58.2M",
    change: "+31.2%",
    trend: "up",
    caption: "Exceeding benchmark targets",
    iconName: "TrendingUp",
    badgeText: "Record Quarter",
  },
];

export interface AdminInquiry {
  id: string;
  clientName: string;
  entityName: string;
  propertyCode: string;
  propertyTitle: string;
  targetBudget: number;
  status: "new" | "nda_verified" | "viewing_scheduled" | "in_escrow" | "closed";
  statusLabel: string;
  statusVariant: BadgeVariant;
  dateReceived: string;
  assignedDirector: string;
  ndaSigned: boolean;
}

export const adminRecentInquiries: AdminInquiry[] = [
  {
    id: "inq-901",
    clientName: "Lord Julian Blackwood",
    entityName: "Blackwood Sovereign Trust",
    propertyCode: "EST-801",
    propertyTitle: "The Glasshouse Sanctuary",
    targetBudget: 18500000,
    status: "new",
    statusLabel: "New Dossier",
    statusVariant: "available",
    dateReceived: "Today, 11:42 AM",
    assignedDirector: "Elena Rostova",
    ndaSigned: true,
  },
  {
    id: "inq-902",
    clientName: "Baroness Catherine de Roth",
    entityName: "Roth Capital Family Office",
    propertyCode: "EST-803",
    propertyTitle: "Biscayne Bay Waterfront Villa",
    targetBudget: 24500000,
    status: "viewing_scheduled",
    statusLabel: "Private Tour Booked",
    statusVariant: "gold",
    dateReceived: "Yesterday, 3:15 PM",
    assignedDirector: "Sofia Sterling",
    ndaSigned: true,
  },
  {
    id: "inq-903",
    clientName: "Kenjiro Takahashi",
    entityName: "Takahashi Holdings Ltd.",
    propertyCode: "EST-802",
    propertyTitle: "Tribeca Sky Penthouse",
    targetBudget: 14200000,
    status: "in_escrow",
    statusLabel: "Escrow Deposit Paid",
    statusVariant: "pending",
    dateReceived: "Oct 28, 2026",
    assignedDirector: "Marcus Vance",
    ndaSigned: true,
  },
  {
    id: "inq-904",
    clientName: "Astrid Lindholm",
    entityName: "Nordic Maritime Capital",
    propertyCode: "EST-804",
    propertyTitle: "Red Mountain Alpine Chalet",
    targetBudget: 9800000,
    status: "nda_verified",
    statusLabel: "NDA Verified",
    statusVariant: "secondary",
    dateReceived: "Oct 27, 2026",
    assignedDirector: "Alexander Vance",
    ndaSigned: true,
  },
  {
    id: "inq-905",
    clientName: "Sultan Al-Mansoor",
    entityName: "Emirates Private Wealth",
    propertyCode: "EST-807",
    propertyTitle: "Paradise Valley Desert Compound",
    targetBudget: 11450000,
    status: "closed",
    statusLabel: "Conveyed & Closed",
    statusVariant: "sold",
    dateReceived: "Oct 24, 2026",
    assignedDirector: "Marcus Vance",
    ndaSigned: true,
  },
];

export interface AdminActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: "FileCheck" | "Key" | "Eye" | "Lock" | "BadgeDollarSign";
  accentColor: string;
}

export const adminActivityAuditLog: AdminActivityItem[] = [
  {
    id: "act-1",
    time: "25 mins ago",
    title: "Confidential NDA Executed",
    description: "Lord Julian Blackwood verified credentials for EST-801.",
    iconName: "Lock",
    accentColor: "text-brand-gold",
  },
  {
    id: "act-2",
    time: "1 hour ago",
    title: "Escrow Deposit Confirmed",
    description: "Initial 10% escrow wire of $1.42M received for Tribeca Sky Penthouse.",
    iconName: "BadgeDollarSign",
    accentColor: "text-success",
  },
  {
    id: "act-3",
    time: "3 hours ago",
    title: "Helicopter Viewing Authorized",
    description: "Private aerial inspection booked for Biscayne Bay Waterfront Villa.",
    iconName: "Key",
    accentColor: "text-brand-olive",
  },
  {
    id: "act-4",
    time: "Yesterday",
    title: "Asset Dossier Published",
    description: "EST-808 (Austin Hill Country Modernist) launched to vetted buyers.",
    iconName: "FileCheck",
    accentColor: "text-brand-gold",
  },
];

export interface AdminQuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  iconName: "Plus" | "FileSpreadsheet" | "ShieldCheck" | "Search";
}

export const adminQuickActions: AdminQuickAction[] = [
  {
    id: "qa-add-property",
    title: "List New Estate",
    description: "Deploy a high-resolution architectural prospectus to the private catalog.",
    href: "/admin/properties/new",
    buttonLabel: "Create Listing",
    iconName: "Plus",
  },
  {
    id: "qa-export-leads",
    title: "Investor Registry",
    description: "Manage confidential VIP family office dossiers and escrow NDAs.",
    href: "/admin/leads",
    buttonLabel: "Review Leads",
    iconName: "ShieldCheck",
  },
  {
    id: "qa-view-analytics",
    title: "Market Valuation",
    description: "Examine regional price per square foot velocity and transaction timelines.",
    href: "/admin/analytics",
    buttonLabel: "Open Metrics",
    iconName: "FileSpreadsheet",
  },
];

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "inquiry" | "escrow" | "system";
}

export const adminNotificationList: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New Acquisition Offer Received",
    description: "$18.5M cash offer submitted for The Glasshouse Sanctuary.",
    time: "12m ago",
    read: false,
    type: "inquiry",
  },
  {
    id: "notif-2",
    title: "Escrow Title Clearance",
    description: "Title deed verified for Tribeca Sky Penthouse contract.",
    time: "1h ago",
    read: false,
    type: "escrow",
  },
  {
    id: "notif-3",
    title: "Quarterly Asset Appraisal Ready",
    description: "Autonomous market comparative analysis updated for 8 estates.",
    time: "3h ago",
    read: false,
    type: "system",
  },
];

export interface AdminRegionalMetric {
  region: string;
  activeValue: string;
  listingCount: number;
  avgPriceSqft: string;
  dominancePct: number;
}

export const adminRegionalMetrics: AdminRegionalMetric[] = [
  {
    region: "Los Angeles & Beverly Hills, CA",
    activeValue: "$52.8M",
    listingCount: 3,
    avgPriceSqft: "$1,968",
    dominancePct: 35,
  },
  {
    region: "New York & Tribeca, NY",
    activeValue: "$38.4M",
    listingCount: 2,
    avgPriceSqft: "$2,327",
    dominancePct: 26,
  },
  {
    region: "Miami & Star Island, FL",
    activeValue: "$34.3M",
    listingCount: 2,
    avgPriceSqft: "$2,076",
    dominancePct: 23,
  },
  {
    region: "Aspen & Pitkin County, CO",
    activeValue: "$23.1M",
    listingCount: 1,
    avgPriceSqft: "$2,236",
    dominancePct: 16,
  },
];

