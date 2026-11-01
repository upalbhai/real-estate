"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function startNavigationLoading() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("navigation:start"));
  }
}

export function finishNavigationLoading() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("navigation:done"));
  }
}

function NavigationLoadingBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const completeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Start the loading animation
  const startLoading = React.useCallback(() => {
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setIsVisible(true);
    setIsLoading(true);
    setProgress(18);

    // Incrementally creep progress to simulate route compilation & data loading
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 45) return prev + 12;
        if (prev < 70) return prev + 6;
        if (prev < 88) return prev + 2;
        return prev;
      });
    }, 140);
  }, []);

  // Complete the loading animation
  const completeLoading = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setProgress(100);

    completeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      completeTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
    }, 180);
  }, []);

  // Complete loading asynchronously when pathname or searchParams change
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      completeLoading();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams, completeLoading]);

  // Global click & event interceptors
  React.useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Don't intercept right clicks or modifier clicks
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }

      // Check if target is inside an anchor
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      // Skip external links or target=_blank
      if (!href || targetAttr === "_blank" || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      // Skip same-page pure hash navigation (#collections, #flagship, etc.)
      if (href.startsWith("#")) {
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Same origin only
        if (url.origin !== currentUrl.origin) {
          return;
        }

        // Skip if exact same pathname and search query
        if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
          return;
        }

        // Genuine route transition!
        startLoading();
      } catch {
        // Ignore malformed URLs
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    const onStart = () => startLoading();
    const onDone = () => completeLoading();

    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("navigation:start", onStart);
    window.addEventListener("navigation:done", onDone);

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("navigation:start", onStart);
      window.removeEventListener("navigation:done", onDone);
      if (timerRef.current) clearInterval(timerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [startLoading, completeLoading]);

  if (!isVisible && !isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Background Track (Subtle Hairline) */}
      <div className="relative h-[2.5px] w-full bg-transparent overflow-hidden">
        {/* Animated Progress Fill with Gold Gradient & Luxury Glow */}
        <div
          className="h-full bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold transition-all duration-200 ease-out relative shadow-[0_0_12px_rgba(202,160,86,0.95)]"
          style={{ width: `${progress}%` }}
        >
          {/* Glowing Lead Spark */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-white/95 shadow-[0_0_10px_#fff]" />
        </div>
      </div>
    </div>
  );
}

export function NavigationLoadingBar() {
  return (
    <React.Suspense fallback={null}>
      <NavigationLoadingBarInner />
    </React.Suspense>
  );
}
