"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onValueChange?: (val: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("RadioGroupItem must be used within a RadioGroup");
  }
  return ctx;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

export function RadioGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  children,
  ...props
}: RadioGroupProps) {
  const generatedName = React.useId();
  const groupName = name || generatedName;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (nextVal: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextVal);
      }
      onValueChange?.(nextVal);
    },
    [isControlled, onValueChange]
  );

  return (
    <RadioGroupContext.Provider
      value={{
        name: groupName,
        value,
        onValueChange: handleValueChange,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        className={cn("space-y-2", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "card";
  icon?: React.ReactNode;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      className,
      value: itemValue,
      label,
      description,
      variant = "default",
      icon,
      disabled: itemDisabled,
      id,
      ...props
    },
    ref
  ) => {
    const { name, value: selectedValue, onValueChange, disabled: groupDisabled } = useRadioGroup();
    const generatedId = React.useId();
    const itemId = id || generatedId;

    const isChecked = selectedValue === itemValue;
    const isDisabled = groupDisabled || itemDisabled;
    const isCard = variant === "card";

    return (
      <label
        htmlFor={itemId}
        className={cn(
          "relative flex items-start gap-3 select-none transition-all duration-200",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          isCard && [
            "rounded-control border p-4",
            isChecked
              ? "border-brand-gold bg-brand-gold/5 shadow-xs"
              : "border-border bg-surface hover:bg-surface-secondary/50 hover:border-brand-olive/40",
          ],
          className
        )}
      >
        <div className="relative flex items-center pt-0.5">
          <input
            id={itemId}
            ref={ref}
            type="radio"
            name={name}
            value={itemValue}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => onValueChange?.(itemValue)}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-all duration-150",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
              isChecked
                ? "border-brand-gold bg-surface"
                : "border-border bg-surface hover:border-brand-olive/60"
            )}
          >
            {isChecked && (
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-fadeIn" />
            )}
          </div>
        </div>

        {icon && <div className="text-brand-gold shrink-0 mt-0.5">{icon}</div>}

        {(label || description) && (
          <div className="flex flex-col gap-0.5 flex-1">
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

RadioGroupItem.displayName = "RadioGroupItem";

