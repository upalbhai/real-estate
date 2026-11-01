import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const [charCount, setCharCount] = React.useState<number>(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={textareaId}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none"
            >
              {label}
            </label>
            {showCount && maxLength && (
              <span className="text-[11px] font-mono text-muted-foreground">
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          className={cn(
            "w-full rounded-control border bg-input px-4 py-3 text-sm text-foreground outline-none",
            "transition-colors duration-200 placeholder:text-muted-foreground",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] resize-y",
            error
              ? "border-error focus-visible:ring-error"
              : "border-border focus-visible:ring-ring hover:border-brand-olive/50",
            className
          )}
          {...props}
        />

        {error && (
          <p id={`${textareaId}-error`} className="text-xs font-medium text-error animate-fadeIn">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

