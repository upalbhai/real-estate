import { BadgeVariant, BadgeSize } from "@/components/ui/badge";

export interface StatusBadgeDemo {
  variant: BadgeVariant;
  label: string;
  description: string;
  dot?: boolean;
}

export const statusBadgesData: StatusBadgeDemo[] = [
  {
    variant: "gold",
    label: "Private Vault",
    description: "Strict bilateral NDA protocol, off-market inventory only.",
    dot: true,
  },
  {
    variant: "exclusive",
    label: "Exclusive Mandate",
    description: "Directly represented by Aura Estates Senior Listing Partners.",
    dot: true,
  },
  {
    variant: "available",
    label: "Available Immediately",
    description: "Clear institutional title ready for rapid escrow closing.",
    dot: true,
  },
  {
    variant: "pending",
    label: "Under Contract",
    description: "Accepted earnest deposit, pending fiduciary title inspection.",
    dot: false,
  },
  {
    variant: "sold",
    label: "Transacted & Closed",
    description: "Completed private transfer, historical benchmark record.",
    dot: false,
  },
  {
    variant: "destructive",
    label: "Offer Expired",
    description: "Bilateral acquisition deadline lapsed without execution.",
    dot: false,
  },
  {
    variant: "outline",
    label: "Bespoke Request",
    description: "Unlisted architectural acquisition parameter search.",
    dot: false,
  },
  {
    variant: "secondary",
    label: "Alpine Compound",
    description: "Territory / Architectural taxonomy tag.",
    dot: false,
  },
];

export interface BadgeSizeDemo {
  size: BadgeSize;
  label: string;
  recommendedFor: string;
}

export const badgeSizesData: BadgeSizeDemo[] = [
  {
    size: "sm",
    label: "Compact Tag (sm)",
    recommendedFor: "Property card image overlays, table row indicators, dense lists",
  },
  {
    size: "md",
    label: "Default Badge (md)",
    recommendedFor: "Property detail headers, filter chips, category markers",
  },
  {
    size: "lg",
    label: "Prominent Badge (lg)",
    recommendedFor: "Hero section pills, modal banners, certification headers",
  },
];

export interface BadgePropDoc {
  name: string;
  type: string;
  defaultVal: string;
  description: string;
}

export const badgePropsDocs: BadgePropDoc[] = [
  {
    name: "variant",
    type: "'default' | 'secondary' | 'gold' | 'available' | 'pending' | 'exclusive' | 'sold' | 'destructive' | 'outline'",
    defaultVal: "'default'",
    description: "Visual design language variant with curated theme contrast.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    defaultVal: "'md'",
    description: "Scale and padding dimension of the badge pill.",
  },
  {
    name: "dot",
    type: "boolean",
    defaultVal: "false",
    description: "Renders an animated pulse status dot indicator inside the badge.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    defaultVal: "required",
    description: "Label text or inner elements rendered inside the badge.",
  },
  {
    name: "className",
    type: "string",
    defaultVal: "undefined",
    description: "Additional Tailwind CSS classes for custom overrides.",
  },
];

export const badgeUsageSnippet = `import { Badge } from "@/components/ui/badge";

export function PropertyStatusTag({ status }) {
  return (
    <div className="flex items-center gap-2">
      {/* 24K Luxury Gold Badge with Live Pulse Dot */}
      <Badge variant="gold" size="sm" dot>
        Private Vault
      </Badge>

      {/* Available Indicator */}
      <Badge variant="available" size="sm" dot>
        Available for Escrow
      </Badge>

      {/* Under Contract */}
      <Badge variant="pending" size="sm">
        Under Contract
      </Badge>
    </div>
  );
}`;

