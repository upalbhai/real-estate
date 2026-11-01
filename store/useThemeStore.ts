import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeToDOM = (resolved: "light" | "dark") => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",
      setTheme: (theme: Theme) => {
        const resolved = theme === "system" ? getSystemTheme() : theme;
        applyThemeToDOM(resolved);
        set({ theme, resolvedTheme: resolved });
      },
      toggleTheme: () => {
        const current = get().resolvedTheme;
        const next = current === "dark" ? "light" : "dark";
        applyThemeToDOM(next);
        set({ theme: next, resolvedTheme: next });
      },
    }),
    {
      name: "real-estate-theme",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const resolved = state.theme === "system" ? getSystemTheme() : state.theme;
        applyThemeToDOM(resolved);
        state.resolvedTheme = resolved;
      },
    }
  )
);

