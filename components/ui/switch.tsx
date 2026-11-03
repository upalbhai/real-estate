"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card";
}

const sizeConfig = {
  sm: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "translate-x-4",
    dot: "h-1.5 w-1.5",
  },
  md: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-5",
    dot: "h-2 w-2",
  },
  lg: {
    track: "h-7 w-14",
    thumb: "h-6 w-6",
    translate: "translate-x-7",
    dot: "h-2.5 w-2.5",
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
      variant = "default",
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
    const isCard = variant === "card";

    const switchButton = (
      <button
        id={switchId}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={(e) => {
          if (isCard) e.stopPropagation();
          toggle();
        }}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full box-border p-0 border-2 leading-none select-none transition-colors duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !isCard && "mt-0.5",
          cfg.track,
          isChecked
            ? "bg-brand-gold border-brand-gold shadow-[0_0_10px_rgba(197,168,120,0.35)]"
            : "bg-[#D8D2C6] dark:bg-[#252C21] border-[#D8D2C6] dark:border-[#252C21] hover:border-brand-gold/60"
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-flex items-center justify-center rounded-full transition-transform duration-200 ease-in-out shrink-0 shadow-sm",
            cfg.thumb,
            isChecked
              ? cn(cfg.translate, "bg-[#181C15] text-brand-gold")
              : "translate-x-0 bg-white dark:bg-[#EDE9E1] border border-black/5"
          )}
        >
          {isChecked && (
            <span
              className={cn(
                "rounded-full bg-brand-gold shrink-0 pointer-events-none",
                cfg.dot
              )}
            />
          )}
        </span>
      </button>
    );

    return (
      <div
        className={cn(
          "flex select-none transition-all duration-200",
          isCard
            ? [
                "rounded-control border p-4 items-center justify-between gap-4 cursor-pointer",
                isChecked
                  ? "border-brand-gold bg-brand-gold/10 shadow-xs"
                  : "border-border bg-surface hover:bg-surface-secondary/50 hover:border-brand-olive/40",
                disabled && "cursor-not-allowed opacity-50",
              ]
            : "items-start gap-3",
          className
        )}
        onClick={isCard ? toggle : undefined}
      >
        {isCard ? (
          <>
            {(label || description) && (
              <div className="flex flex-col gap-0.5 flex-1 pr-2">
                {label && (
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {label}
                  </span>
                )}
                {description && (
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </span>
                )}
              </div>
            )}
            {switchButton}
          </>
        ) : (
          <>
            {switchButton}
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
          </>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
