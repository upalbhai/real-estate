import { ButtonVariant, ButtonSize } from "@/components/ui/button";

export interface ButtonVariantSpec {
  name: ButtonVariant;
  label: string;
  desc: string;
}

export const buttonVariantsData: ButtonVariantSpec[] = [
  {
    name: "primary",
    label: "Primary",
    desc: "Brand charcoal in light mode, brand olive in dark mode.",
  },
  {
    name: "secondary",
    label: "Secondary",
    desc: "Subtle bordered surface for secondary actions.",
  },
  {
    name: "accent",
    label: "Accent",
    desc: "Gold highlight accent for calls to action.",
  },
  {
    name: "gold",
    label: "Luxury Gold",
    desc: "Warm luxury tone for VIP listings and inquiries.",
  },
  {
    name: "outline",
    label: "Outline",
    desc: "Crisp primary outline that inverts on hover.",
  },
  {
    name: "ghost",
    label: "Ghost",
    desc: "Transparent background with clean hover highlight.",
  },
  {
    name: "destructive",
    label: "Destructive",
    desc: "Warning/danger action for removals or cancellations.",
  },
  {
    name: "link",
    label: "Link",
    desc: "Inline link button with underline hover.",
  },
];

export interface ButtonSizeSpec {
  size: ButtonSize;
  label: string;
}

export const buttonSizesData: ButtonSizeSpec[] = [
  { size: "xs", label: "Extra Small (xs)" },
  { size: "sm", label: "Small (sm)" },
  { size: "md", label: "Medium (md - Default)" },
  { size: "lg", label: "Large (lg)" },
  { size: "xl", label: "Extra Large (xl)" },
];

export interface RealEstateActionCard {
  id: string;
  title: string;
  actions: {
    label: string;
    variant: ButtonVariant;
    iconName?: "calendar" | "phone" | "arrow-right" | "external-link";
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
  }[];
}

export const realEstateActionCards: RealEstateActionCard[] = [
  {
    id: "lead-gen",
    title: "Lead Generation & Booking",
    actions: [
      {
        label: "Schedule Private Viewing",
        variant: "gold",
        iconName: "calendar",
        iconPosition: "left",
        fullWidth: true,
      },
      {
        label: "Contact Listing Agent",
        variant: "secondary",
        iconName: "phone",
        iconPosition: "left",
        fullWidth: true,
      },
    ],
  },
  {
    id: "explore-detail",
    title: "Explore & Detail Flows",
    actions: [
      {
        label: "Explore Penthouse Collection",
        variant: "primary",
        iconName: "arrow-right",
        iconPosition: "right",
        fullWidth: true,
      },
      {
        label: "View Architectural Masterplan",
        variant: "link",
        iconName: "external-link",
        iconPosition: "right",
      },
    ],
  },
];

export const themePreviewVariants: { variant: ButtonVariant; label: string }[] = [
  { variant: "primary", label: "Primary" },
  { variant: "accent", label: "Accent (Gold)" },
  { variant: "secondary", label: "Secondary" },
  { variant: "outline", label: "Outline" },
];

