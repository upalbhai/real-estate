import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
  suffixText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      prefixText,
      suffixText,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-muted-foreground pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          {prefixText && (
            <span className="absolute left-3.5 text-sm font-medium text-muted-foreground pointer-events-none select-none">
              {prefixText}
            </span>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "w-full rounded-control border bg-input px-4 py-2.5 text-sm text-foreground",
              "outline-none transition-colors duration-200 placeholder:text-muted-foreground",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-error focus-visible:ring-error"
                : "border-border focus-visible:ring-ring hover:border-brand-olive/50",
              leftIcon && "pl-10",
              prefixText && "pl-8",
              rightIcon && "pr-10",
              suffixText && "pr-16",
              className
            )}
            {...props}
          />

          {suffixText && (
            <span className="absolute right-3.5 text-xs font-mono text-muted-foreground pointer-events-none select-none">
              {suffixText}
            </span>
          )}

          {rightIcon && (
            <div className="absolute right-3.5 text-muted-foreground flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-error animate-fadeIn">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
