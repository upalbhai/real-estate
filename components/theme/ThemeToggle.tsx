"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore, Theme } from "@/store/useThemeStore";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "segmented";
  className?: string;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ variant = "segmented", className }: ThemeToggleProps) {
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const theme = useThemeStore((state) => state.theme);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  if (!isMounted) {
    return (
      <div
        className={cn(
          variant === "icon"
            ? "h-9 w-9 rounded-control border border-border bg-surface"
            : "h-9 w-24 rounded-control border border-border bg-surface",
          className
        )}
      />
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-all duration-200 hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95",
          className
        )}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        title={`Current mode: ${resolvedTheme}. Click to toggle.`}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4 w-4 transition-transform duration-200 rotate-0" />
        ) : (
          <Sun className="h-4 w-4 transition-transform duration-200 rotate-0" />
        )}
      </button>
    );
  }

  const options: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "Auto", icon: Monitor },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-control border border-border bg-surface-secondary p-1 shadow-xs",
        className
      )}
      role="radiogroup"
      aria-label="Theme selector"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-[0.45rem] px-2.5 py-1 text-xs font-medium transition-all duration-200",
              isActive
                ? "bg-surface text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            role="radio"
            aria-checked={isActive}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
