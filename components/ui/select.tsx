"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectContextValue {
  value?: string;
  onValueChange: (val: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  listboxId: string;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select compound components must be used within <Select>");
  }
  return ctx;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options?: SelectOption[];
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  label,
  error,
  helperText,
  placeholder = "Select an option...",
  options,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const selectId = React.useId();
  const listboxId = React.useId();

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (nextVal: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextVal);
      }
      onValueChange?.(nextVal);
      setOpen(false);
    },
    [isControlled, onValueChange]
  );

  // Close on click outside or escape key
  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Derive display label when using `options` prop
  const selectedOption = React.useMemo(() => {
    if (!options) return null;
    return options.find((opt) => opt.value === value) || null;
  }, [options, value]);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        triggerRef,
        listboxId,
        disabled,
      }}
    >
      <div ref={containerRef} className={cn("relative w-full space-y-1.5", open && "z-50", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none"
          >
            {label}
          </label>
        )}

        {/* If options array is provided, render out-of-the-box trigger & content */}
        {options ? (
          <>
            <button
              id={selectId}
              ref={triggerRef}
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-controls={open ? listboxId : undefined}
              aria-haspopup="listbox"
              disabled={disabled}
              onClick={() => !disabled && setOpen(!open)}
              className={cn(
                "w-full h-10 px-4 py-2 flex items-center justify-between gap-2.5 rounded-control border bg-input text-sm text-foreground",
                "outline-none transition-all duration-200 cursor-pointer select-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                open && "ring-2 ring-ring border-transparent",
                error
                  ? "border-error focus-visible:ring-error"
                  : "border-border hover:border-brand-olive/50 hover:bg-surface-secondary/40",
                !value && "text-muted-foreground",
                triggerClassName
              )}
            >
              <div className="flex items-center gap-2 truncate">
                {selectedOption?.icon && (
                  <span className="shrink-0 text-brand-gold">{selectedOption.icon}</span>
                )}
                <span className="truncate">
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 opacity-60 text-muted-foreground transition-transform duration-200 shrink-0",
                  open && "rotate-180 opacity-100 text-foreground"
                )}
              />
            </button>

            {open && (
              <div
                id={listboxId}
                role="listbox"
                className={cn(
                  "absolute left-0 z-[100] mt-1.5 w-full rounded-card border border-border bg-surface p-1.5 shadow-2xl opacity-100",
                  "max-h-60 overflow-y-auto space-y-0.5",
                  "origin-top animate-fadeIn transition-all duration-150",
                  contentClassName
                )}
              >
                {options.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <div
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => !opt.disabled && handleValueChange(opt.value)}
                      className={cn(
                        "relative flex w-full items-center justify-between rounded-control py-2 px-3 text-xs sm:text-sm select-none transition-all duration-150 outline-none",
                        opt.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer",
                        isSelected
                          ? "bg-brand-gold/15 text-brand-charcoal dark:text-brand-gold font-semibold border border-brand-gold/30 shadow-2xs"
                          : "text-foreground hover:bg-surface-secondary hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate pr-4">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <div className="flex flex-col truncate">
                          <span className="truncate">{opt.label}</span>
                          {opt.description && (
                            <span className="text-[11px] text-muted-foreground font-normal leading-snug">
                              {opt.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {opt.badge && (
                          <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {opt.badge}
                          </span>
                        )}
                        {isSelected && (
                          <Check className="h-4 w-4 text-brand-charcoal dark:text-brand-gold stroke-[2.5]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Composable children pattern */
          children
        )}

        {error && (
          <p className="text-xs font-medium text-error animate-fadeIn">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    </SelectContext.Provider>
  );
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

export function SelectTrigger({
  className,
  children,
  placeholder = "Select...",
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, value, triggerRef, listboxId, disabled } = useSelect();

  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-controls={open ? listboxId : undefined}
      aria-haspopup="listbox"
      disabled={disabled}
      onClick={() => !disabled && setOpen(!open)}
      className={cn(
        "w-full h-10 px-4 py-2 flex items-center justify-between gap-2.5 rounded-control border border-border bg-input text-sm text-foreground",
        "outline-none transition-all duration-200 cursor-pointer select-none shadow-xs",
        "hover:bg-surface-secondary/40 hover:border-brand-olive/50",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        open && "ring-2 ring-ring border-transparent",
        !value && "text-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="truncate">{children || placeholder}</div>
      <ChevronDown
        className={cn(
          "h-4 w-4 opacity-60 text-muted-foreground transition-transform duration-200 shrink-0",
          open && "rotate-180 opacity-100 text-foreground"
        )}
      />
    </button>
  );
}

export type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SelectContent({
  className,
  children,
  ...props
}: SelectContentProps) {
  const { open, listboxId } = useSelect();

  if (!open) return null;

  return (
    <div
      id={listboxId}
      role="listbox"
      className={cn(
        "absolute left-0 z-50 mt-1.5 w-full rounded-card border border-border bg-surface p-1.5 shadow-lg",
        "max-h-60 overflow-y-auto space-y-0.5",
        "origin-top animate-fadeIn transition-all duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SelectItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  value: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function SelectItem({
  className,
  value: itemValue,
  description,
  badge,
  icon,
  disabled = false,
  children,
  ...props
}: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useSelect();
  const isSelected = selectedValue === itemValue;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => !disabled && onValueChange(itemValue)}
      className={cn(
        "relative flex w-full items-center justify-between rounded-control py-2 px-3 text-xs sm:text-sm select-none transition-all duration-150 outline-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        isSelected
          ? "bg-brand-gold/15 text-brand-charcoal dark:text-brand-gold font-semibold border border-brand-gold/30 shadow-2xs"
          : "text-foreground hover:bg-surface-secondary hover:text-foreground",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 truncate pr-4">
        {icon && <span className="shrink-0 text-brand-gold">{icon}</span>}
        <div className="flex flex-col truncate">
          <span className="truncate">{children}</span>
          {description && (
            <span className="text-[11px] text-muted-foreground font-normal leading-snug">
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {badge && (
          <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {badge}
          </span>
        )}
        {isSelected && (
          <Check className="h-4 w-4 text-brand-charcoal dark:text-brand-gold stroke-[2.5]" />
        )}
      </div>
    </div>
  );
}
