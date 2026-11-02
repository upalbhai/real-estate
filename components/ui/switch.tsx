"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "translate-x-4",
  },
  md: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-5",
  },
  lg: {
    track: "h-7 w-14",
    thumb: "h-6 w-6",
    translate: "translate-x-7",
  },
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      size = "md",
      disabled = false,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
    };

    const cfg = sizeConfig[size];

    return (
      <div className={cn("flex items-start gap-3 select-none", className)}>
        <Button
          id={switchId}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={toggle}
          variant="ghost"
          size="xs"
          className={cn(
            "!relative !inline-flex !shrink-0 cursor-pointer !rounded-full !border-2 !border-transparent !p-0 !min-w-0 !gap-0 !shadow-none",
            "transition-colors duration-250 ease-out active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50 mt-0.5",
            cfg.track,
            isChecked
              ? "!bg-brand-gold !border-brand-gold shadow-xs"
              : "!bg-surface-secondary !border-border hover:!border-brand-olive/50"
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none flex items-center justify-center rounded-full transition-transform duration-250 ease-out shadow-sm",
              cfg.thumb,
              isChecked
                ? cn(cfg.translate, "bg-brand-charcoal text-brand-gold")
                : "translate-x-0 bg-surface border border-border/80"
            )}
          >
            {isChecked && (
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-fadeIn" />
            )}
          </span>
        </Button>

        {(label || description) && (
          <label
            htmlFor={switchId}
            onClick={toggle}
            className={cn(
              "flex flex-col gap-0.5",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            )}
          >
            {label && (
              <span className="text-sm font-medium text-foreground leading-snug">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
