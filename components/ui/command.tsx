"use client";

import * as React from "react";
import { Search, X, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ----------------------------------------------------------------------
// Command Context
// ----------------------------------------------------------------------

interface CommandContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  registerItem: (id: string, text: string) => () => void;
  items: Array<{ id: string; text: string }>;
  executeItem: (id: string) => void;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommand() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error("Command subcomponents must be rendered within a Command provider.");
  }
  return context;
}

// ----------------------------------------------------------------------
// 1. Command Root Container
// ----------------------------------------------------------------------

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearchChange?: (search: string) => void;
}

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, children, onSearchChange, ...props }, ref) => {
    const [searchQuery, setSearchQueryState] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [registeredItems, setRegisteredItems] = React.useState<
      Array<{ id: string; text: string }>
    >([]);
    const itemCallbacksRef = React.useRef<Map<string, () => void>>(new Map());

    const setSearchQuery = React.useCallback(
      (q: string) => {
        setSearchQueryState(q);
        setActiveIndex(0);
        onSearchChange?.(q);
      },
      [onSearchChange]
    );

    const registerItem = React.useCallback(
      (id: string, text: string) => {
        setRegisteredItems((prev) => {
          if (prev.some((item) => item.id === id)) return prev;
          return [...prev, { id, text }];
        });

        return () => {
          setRegisteredItems((prev) => prev.filter((item) => item.id !== id));
          itemCallbacksRef.current.delete(id);
        };
      },
      []
    );

    const executeItem = React.useCallback((id: string) => {
      const cb = itemCallbacksRef.current.get(id);
      cb?.();
    }, []);

    // Filtered visible items based on search query
    const visibleItems = React.useMemo(() => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return registeredItems;
      return registeredItems.filter((item) => item.text.toLowerCase().includes(q));
    }, [registeredItems, searchQuery]);

    // Handle keyboard navigation: ArrowUp, ArrowDown, Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (visibleItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % visibleItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + visibleItems.length) % visibleItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = visibleItems[activeIndex];
        if (activeItem) {
          executeItem(activeItem.id);
        }
      }
    };

    return (
      <CommandContext.Provider
        value={{
          searchQuery,
          setSearchQuery,
          activeIndex,
          setActiveIndex,
          registerItem,
          items: visibleItems,
          executeItem,
        }}
      >
        <div
          ref={ref}
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="command-listbox"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex flex-col overflow-hidden rounded-card bg-surface text-foreground border border-border shadow-2xl focus:outline-none transition-all",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);
Command.displayName = "Command";

// ----------------------------------------------------------------------
// 2. CommandDialog (Modal Overlay with ⌘K / ESC Listener)
// ----------------------------------------------------------------------

export interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  listenKeyboardShortcut?: boolean;
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
  className,
  listenKeyboardShortcut = true,
}: CommandDialogProps) {
  // Listen for Meta+K / Ctrl+K
  React.useEffect(() => {
    if (!listenKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [listenKeyboardShortcut, onOpenChange, open]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-4 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative z-10 w-full max-w-2xl overflow-hidden rounded-card border border-border/80 bg-surface/95 dark:bg-[#111612]/95 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.35)] animate-scaleUp",
          className
        )}
      >
        {/* Top Hairline Luxury Gold Gradient */}
        <div className="h-[2px] w-full bg-gradient-to-r from-brand-charcoal via-brand-gold to-brand-olive dark:from-brand-gold/70 dark:via-brand-olive dark:to-brand-gold/40" />
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. CommandInput (Search Input Header)
// ----------------------------------------------------------------------

export interface CommandInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  showClearButton?: boolean;
}

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  (
    {
      className,
      placeholder = "Type a command or search estates...",
      value: controlledValue,
      onValueChange,
      showClearButton = true,
      ...props
    },
    ref
  ) => {
    const context = useCommand();
    const query = controlledValue !== undefined ? controlledValue : context.searchQuery;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      context.setSearchQuery(next);
      onValueChange?.(next);
    };

    const handleClear = () => {
      context.setSearchQuery("");
      onValueChange?.("");
    };

    return (
      <div className="flex h-14 items-center gap-3 border-b border-border/80 px-4">
        <Search className="h-4 w-4 shrink-0 text-brand-gold" />
        <input
          ref={ref}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex h-full w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        {showClearButton && query.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleClear}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}

        <div className="hidden sm:flex items-center gap-1 shrink-0 text-[10px] font-mono text-muted-foreground">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-secondary shadow-xs">
            ESC
          </kbd>
        </div>
      </div>
    );
  }
);
CommandInput.displayName = "CommandInput";

// ----------------------------------------------------------------------
// 4. CommandList & CommandEmpty
// ----------------------------------------------------------------------

export type CommandListProps = React.HTMLAttributes<HTMLDivElement>;

export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="listbox"
        id="command-listbox"
        className={cn(
          "max-h-[380px] overflow-y-auto overflow-x-hidden p-2 space-y-2 select-none focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandList.displayName = "CommandList";

export type CommandEmptyProps = React.HTMLAttributes<HTMLDivElement>;

export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children = "No matching commands or estates found.", ...props }, ref) => {
    const { items, searchQuery } = useCommand();

    // Show empty message only when there is a search query and no visible items
    if (searchQuery.trim() === "" || items.length > 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "py-10 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2 animate-fadeIn",
          className
        )}
        {...props}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-brand-gold border border-brand-gold/30">
          <Search className="h-4 w-4" />
        </div>
        <p className="font-medium text-foreground">{children}</p>
        <span className="text-[11px] text-muted-foreground max-w-xs">
          Try searching by asset title, MLS code, territorial market, or administrative task.
        </span>
      </div>
    );
  }
);
CommandEmpty.displayName = "CommandEmpty";

// ----------------------------------------------------------------------
// 5. CommandGroup & CommandSeparator
// ----------------------------------------------------------------------

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("overflow-hidden p-1 space-y-1", className)} {...props}>
        {heading && (
          <div className="px-2 py-1.5 text-[10px] font-special font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>{heading}</span>
          </div>
        )}
        <div className="space-y-0.5">{children}</div>
      </div>
    );
  }
);
CommandGroup.displayName = "CommandGroup";

export const CommandSeparator = ({ className }: { className?: string }) => (
  <div className={cn("h-[1px] bg-border/60 my-1.5 mx-1", className)} role="separator" />
);
CommandSeparator.displayName = "CommandSeparator";

// ----------------------------------------------------------------------
// 6. CommandItem
// ----------------------------------------------------------------------

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  value?: string;
  onSelect?: () => void;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  keywords?: string[];
}

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  (
    {
      id: explicitId,
      value: explicitValue,
      onSelect,
      disabled = false,
      icon: Icon,
      badge,
      keywords = [],
      children,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const itemId = explicitId || generatedId;
    const context = useCommand();

    // Derived text representation for filtering
    const textRepresentation = React.useMemo(() => {
      const parts = [
        explicitValue || "",
        typeof children === "string" ? children : "",
        ...keywords,
        badge || "",
      ];
      return parts.filter(Boolean).join(" ");
    }, [explicitValue, children, keywords, badge]);

    // Register item with context
    React.useEffect(() => {
      return context.registerItem(itemId, textRepresentation);
    }, [context, itemId, textRepresentation]);

    // Determine visibility based on current search query
    const isVisible = React.useMemo(() => {
      const q = context.searchQuery.toLowerCase().trim();
      if (!q) return true;
      return textRepresentation.toLowerCase().includes(q);
    }, [context.searchQuery, textRepresentation]);

    // Calculate whether this item is currently active
    const itemIndex = context.items.findIndex((item) => item.id === itemId);
    const isActive = itemIndex === context.activeIndex;

    if (!isVisible) return null;

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isActive}
        aria-disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => {
          if (itemIndex >= 0) context.setActiveIndex(itemIndex);
        }}
        className={cn(
          "relative flex items-center justify-between gap-3 px-3 py-2 rounded-control text-xs font-medium cursor-pointer transition-colors duration-150 select-none group",
          isActive
            ? "bg-surface-secondary text-foreground shadow-2xs border border-brand-gold/30"
            : "text-muted-foreground hover:bg-surface-secondary/70 hover:text-foreground",
          disabled && "cursor-not-allowed opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {Icon && (
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-control border transition-colors",
                isActive
                  ? "border-brand-gold/50 bg-brand-gold/15 text-brand-gold"
                  : "border-border/80 bg-surface text-muted-foreground group-hover:text-foreground group-hover:border-brand-gold/40"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
          )}
          <div className="flex flex-col min-w-0 truncate">
            <span className="truncate">{children}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className="rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider font-semibold">
              {badge}
            </span>
          )}
          {isActive && (
            <CornerDownLeft className="h-3 w-3 text-brand-gold shrink-0 opacity-80" />
          )}
        </div>
      </div>
    );
  }
);
CommandItem.displayName = "CommandItem";

// ----------------------------------------------------------------------
// 7. CommandShortcut & CommandTrigger
// ----------------------------------------------------------------------

export const CommandShortcut = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <kbd
      className={cn(
        "ml-auto text-[10px] font-mono tracking-widest text-muted-foreground bg-surface-secondary/80 border border-border px-1.5 py-0.5 rounded shadow-2xs",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
};
CommandShortcut.displayName = "CommandShortcut";

export interface CommandTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
  label?: string;
}

export const CommandTrigger = React.forwardRef<HTMLButtonElement, CommandTriggerProps>(
  (
    {
      shortcut = "⌘K",
      label = "Search portfolio, docs & actions...",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        type="button"
        variant="secondary"
        size="sm"
        onClick={onClick}
        leftIcon={<Search className="h-3.5 w-3.5 text-brand-gold shrink-0" />}
        className={cn(
          "w-full max-w-sm justify-between px-3 text-xs font-normal text-muted-foreground bg-surface-secondary/40 hover:bg-surface-secondary hover:border-brand-gold/50 shadow-2xs h-9 rounded-control transition-all",
          className
        )}
        {...props}
      >
        <span className="truncate">{label}</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.2 font-mono text-[10px] font-medium text-muted-foreground shadow-2xs">
          {shortcut}
        </kbd>
      </Button>
    );
  }
);
CommandTrigger.displayName = "CommandTrigger";

// ----------------------------------------------------------------------
// 8. High-Level Ergonomic CommandMenu
// ----------------------------------------------------------------------

export interface CommandMenuItemDefinition {
  id: string;
  label: string;
  description?: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  shortcut?: string;
  onSelect?: () => void;
  keywords?: string[];
}

export interface CommandGroupDefinition {
  heading: string;
  items: CommandMenuItemDefinition[];
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroupDefinition[];
  placeholder?: string;
  emptyText?: string;
  footerNote?: string;
}

export function CommandMenu({
  open,
  onOpenChange,
  groups,
  placeholder = "Search estates, pages, commands...",
  emptyText = "No matching commands or properties found.",
  footerNote = "Aura Atelier • Press ESC to dismiss",
}: CommandMenuProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyText}</CommandEmpty>
          {groups.map((group, groupIdx) => (
            <React.Fragment key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    id={item.id}
                    value={item.label}
                    keywords={item.keywords}
                    badge={item.badge}
                    icon={item.icon}
                    onSelect={() => {
                      item.onSelect?.();
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-foreground truncate">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-[11px] text-muted-foreground truncate">
                            {item.description}
                          </span>
                        )}
                      </div>
                      {item.shortcut && (
                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {groupIdx < groups.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/80 bg-surface-secondary/40 text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 rounded border border-border bg-surface text-[10px]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 rounded border border-border bg-surface text-[10px]">↵</kbd> Select
            </span>
          </div>
          <span className="text-brand-gold text-[10px] font-special uppercase tracking-wider">
            {footerNote}
          </span>
        </div>
      </Command>
    </CommandDialog>
  );
}
