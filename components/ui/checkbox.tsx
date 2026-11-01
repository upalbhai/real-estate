"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked" | "defaultChecked"> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "card";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      label,
      description,
      disabled,
      variant = "default",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextChecked = e.target.checked;
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    };

    const isCard = variant === "card";

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "relative flex items-start gap-3 select-none transition-all duration-200",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          isCard && [
            "rounded-control border p-4 active:scale-[0.99]",
            isChecked
              ? "border-brand-gold bg-brand-gold/10 shadow-xs"
              : "border-border bg-surface hover:bg-surface-secondary/50 hover:border-brand-olive/40",
          ],
          className
        )}
      >
        <div className="relative flex items-center pt-0.5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex h-4.5 w-4.5 items-center justify-center rounded-[0.35rem] border transition-all duration-150 active:scale-90",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
              isChecked || indeterminate
                ? "bg-brand-gold text-brand-charcoal border-brand-gold shadow-2xs"
                : "border-border bg-surface hover:border-brand-olive/60"
            )}
          >
            {isChecked && <Check className="h-3 w-3 stroke-[3] animate-fadeIn" />}
            {indeterminate && !isChecked && <Minus className="h-3 w-3 stroke-[3] animate-fadeIn" />}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
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
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
