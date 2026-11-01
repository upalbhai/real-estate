"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function usePopover() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) {
    throw new Error("usePopover must be used within a Popover");
  }
  return ctx;
}

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  modal?: boolean;
}

export function Popover({
  open: controlledOpen,
  onOpenChange,
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block w-full">{children}</div>
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export function PopoverTrigger({ asChild, children }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopover();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler;
      "aria-expanded"?: boolean;
      "aria-haspopup"?: string;
    }>;

    return (
      <div ref={triggerRef} className="w-full">
        {React.cloneElement(child, {
          onClick: (e: React.MouseEvent) => {
            child.props.onClick?.(e);
            handleClick(e);
          },
          "aria-expanded": open,
          "aria-haspopup": "dialog",
        })}
      </div>
    );
  }

  return (
    <div ref={triggerRef} onClick={handleClick} className="w-full">
      {children}
    </div>
  );
}

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
}

export function PopoverContent({
  className,
  children,
  align = "start",
  ...props
}: PopoverContentProps) {
  const { open, setOpen, triggerRef } = usePopover();
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  // Click outside & Escape key listeners
  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
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
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 mt-1.5 w-full rounded-control border border-border bg-surface p-1 shadow-lg",
        "origin-top transition-all duration-150",
        align === "end"
          ? "right-0"
          : align === "center"
          ? "left-1/2 -translate-x-1/2"
          : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

