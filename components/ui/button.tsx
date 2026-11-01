import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "destructive"
  | "gold"
  | "link";

export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "icon-sm"
  | "icon"
  | "icon-lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:scale-[0.98] focus-visible:ring-ring",
  secondary:
    "border border-border bg-surface text-foreground shadow-xs hover:bg-surface-secondary hover:border-brand-olive/40 active:scale-[0.98] focus-visible:ring-ring",
  accent:
    "bg-accent text-accent-foreground shadow-xs hover:brightness-95 active:scale-[0.98] focus-visible:ring-accent",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground active:scale-[0.98] focus-visible:ring-primary",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-secondary active:scale-[0.98] focus-visible:ring-ring",
  destructive:
    "bg-error text-white shadow-xs hover:opacity-90 active:scale-[0.98] focus-visible:ring-error",
  gold:
    "bg-brand-gold text-brand-charcoal font-semibold shadow-xs hover:opacity-95 active:scale-[0.98] focus-visible:ring-brand-gold",
  link:
    "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium focus-visible:ring-primary shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs rounded-[0.375rem] gap-1.5",
  sm: "h-8.5 px-3.5 text-xs rounded-control gap-1.5",
  md: "h-10 px-5 text-sm rounded-control gap-2",
  lg: "h-12 px-6 text-base rounded-control gap-2.5",
  xl: "h-14 px-8 text-lg rounded-control gap-3 font-semibold",
  "icon-sm": "h-8.5 w-8.5 p-0 rounded-control justify-center",
  icon: "h-10 w-10 p-0 rounded-control justify-center",
  "icon-lg": "h-12 w-12 p-0 rounded-control justify-center",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 select-none whitespace-nowrap",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
