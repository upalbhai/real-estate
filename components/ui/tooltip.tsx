"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
}

export function Tooltip({
  content,
  subtitle,
  badge,
  side = "right",
  disabled = false,
  className,
  wrapperClassName,
  children,
}: TooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  const sideClasses = {
    right: "left-full ml-3 top-1/2 -translate-y-1/2",
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
    top: "bottom-full mb-2.5 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2.5 left-1/2 -translate-x-1/2",
  };

  const arrowClasses = {
    right: "-left-1 top-1/2 -translate-y-1/2 border-l border-b",
    left: "-right-1 top-1/2 -translate-y-1/2 border-r border-t",
    top: "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b",
    bottom: "-top-1 left-1/2 -translate-x-1/2 border-l border-t",
  };

  return (
    <div className={cn("relative group/tooltip inline-flex", wrapperClassName)}>
      {children}
      <div
        role="tooltip"
        className={cn(
          "absolute hidden group-hover/tooltip:flex flex-col items-start rounded-control border border-brand-gold/30 bg-[#252820] text-[#F5F2EB] dark:bg-[#171A16] dark:border-brand-gold/40 px-3 py-1.5 text-xs shadow-xl pointer-events-none z-50 whitespace-nowrap transition-all duration-150 animate-fadeIn",
          sideClasses[side],
          className
        )}
      >
        {/* Caret arrow pointing toward the trigger */}
        <div
          className={cn(
            "absolute w-2 h-2 rotate-45 bg-[#252820] dark:bg-[#171A16] border-brand-gold/30 dark:border-brand-gold/40",
            arrowClasses[side]
          )}
        />

        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide">{content}</span>
          {badge && <span>{badge}</span>}
        </div>
        {subtitle && (
          <span className="text-[10px] text-[#A4AC91] font-special uppercase tracking-wider mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export default Tooltip;

