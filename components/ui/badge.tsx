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
  | "secondary"
  | "exclusive"
  | "destructive";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
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
  exclusive: "bg-brand-charcoal dark:bg-[#1E241A] text-brand-gold border-brand-gold/40 font-semibold",
  destructive: "bg-error/15 text-error border-error/25 font-semibold",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-muted-foreground",
  featured: "bg-accent-foreground",
  available: "bg-success animate-pulse",
  pending: "bg-warning animate-pulse",
  sold: "bg-error",
  outline: "bg-foreground",
  gold: "bg-brand-gold animate-pulse shadow-[0_0_8px_rgba(197,168,120,0.6)]",
  secondary: "bg-secondary-foreground",
  exclusive: "bg-brand-gold animate-pulse",
  destructive: "bg-error animate-pulse",
};

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] leading-tight gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium transition-colors select-none whitespace-nowrap shrink-0",
        sizeClasses[size],
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColors[variant]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

