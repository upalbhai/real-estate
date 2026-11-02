"use client";

import * as React from "react";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useThemeStore((state) => state.setTheme);

  React.useEffect(() => {
    // Only listen for OS system preference changes if user selected "system" mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (useThemeStore.getState().theme === "system") {
        setTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  return <>{children}</>;
}

