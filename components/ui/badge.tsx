import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "featured"
  | "available"
  | "pending"
  | "sold"
  | "outline"
  | "gold"
  | "secondary";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-surface-secondary text-foreground border-border",
  featured: "bg-accent text-accent-foreground font-semibold border-transparent",
  available: "bg-success/15 text-success border-success/20",
  pending: "bg-warning/15 text-warning border-warning/20",
  sold: "bg-error/15 text-error border-error/20",
  outline: "bg-transparent text-foreground border-border",
  gold: "bg-brand-gold/20 text-brand-gold border-brand-gold/30 font-semibold",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
};

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-colors select-none",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

