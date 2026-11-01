import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "gold" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-surface border-border text-foreground shadow-xs",
  elevated: "bg-surface-elevated border-border/80 text-foreground shadow-md",
  interactive:
    "bg-surface border-border text-foreground shadow-xs hover:border-brand-gold/60 hover:shadow-md active:scale-[0.99] cursor-pointer transition-all duration-300",
  gold: "bg-surface border-brand-gold/40 text-foreground shadow-xs hover:border-brand-gold relative before:absolute before:inset-0 before:rounded-card before:border before:border-brand-gold/20 before:pointer-events-none",
  flat: "bg-surface-secondary/50 border-transparent text-foreground shadow-none",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "none",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card border transition-all duration-200 overflow-hidden",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, border = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        border && "border-b border-border pb-4",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, border = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        border && "border-t border-border pt-4 mt-4",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

