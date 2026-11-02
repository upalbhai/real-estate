"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore, Theme } from "@/store/useThemeStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        onClick={toggleTheme}
        className={cn(
          "hover:border-brand-gold hover:text-brand-gold",
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
      </Button>
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
          <Button
            key={value}
            type="button"
            variant={isActive ? "primary" : "ghost"}
            size="xs"
            onClick={() => setTheme(value)}
            className={cn(
              "h-7 rounded-[0.45rem] px-2.5 py-1 text-xs gap-1.5",
              isActive
                ? "bg-surface text-foreground shadow-xs border border-border/60 hover:bg-surface"
                : "text-muted-foreground hover:text-foreground"
            )}
            role="radio"
            aria-checked={isActive}
            leftIcon={<Icon className="h-3.5 w-3.5" />}
          >
            <span className="hidden sm:inline">{label}</span>
          </Button>
        );
      })}
    </div>
  );
}
