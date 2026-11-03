"use client";

import * as React from "react";
import { ChevronDown, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input as InputPrimitive } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export type Option = {
  _id?: string;
  id?: string | number;
  name?: string;
  label?: string;
  [k: string]: unknown;
};

export type LoadOptionsResult = {
  data: Option[];
  meta?: {
    pagination?: {
      page: number;
      page_size: number;
      total: number;
      totalPages: number;
    };
  };
};

export interface AsyncSelectProps {
  value?: Option | Option[] | null;
  onChange?: (val: Option | Option[] | null) => void;
  loadOptions: (params: { page: number; page_size: number; search?: string }) => Promise<LoadOptionsResult>;
  multi?: boolean;
  searchable?: boolean;
  pageSize?: number;
  placeholder?: string;
  creatable?: boolean;
  className?: string;
  idKey?: string;
  labelKey?: string;
  queryKey?: string;
  disabled?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function AsyncSelect({
  value,
  onChange,
  loadOptions,
  multi = false,
  searchable = true,
  pageSize = 10,
  placeholder = "Select...",
  creatable = false,
  className = "",
  idKey = "_id",
  labelKey = "name",
  disabled = false,
}: AsyncSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const debouncedSearch = useDebounce(q, 300);
  const [localItems, setLocalItems] = React.useState<Option[]>([]);

  // Internal Infinite State
  const [pages, setPages] = React.useState<Option[][]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);

  const listEndRef = React.useRef<HTMLDivElement | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  // Controlled open change handler
  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) return;
    setOpen(nextOpen);
    if (nextOpen) {
      setIsLoading(true);
    } else {
      setQ("");
    }
  };

  const handleSearchChange = (val: string) => {
    setQ(val);
    setIsLoading(true);
  };

  // Focus search input on open
  React.useEffect(() => {
    if (!open || !searchable) return;
    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [open, searchable]);

  // Initial & search-based fetch effect
  React.useEffect(() => {
    if (!open) return;
    let isCurrent = true;

    loadOptions({
      page: 1,
      page_size: pageSize,
      search: debouncedSearch,
    })
      .then((result) => {
        if (!isCurrent) return;
        const fetchedItems = result.data || [];
        const calculatedTotalPages =
          result.meta?.pagination?.totalPages ??
          (fetchedItems.length < pageSize ? 1 : 2);

        setPages([fetchedItems]);
        setCurrentPage(1);
        setTotalPages(calculatedTotalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isCurrent) return;
        console.error("Failed to load options in AsyncSelect:", err);
        setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [open, debouncedSearch, loadOptions, pageSize]);

  // Subsequent page fetching
  const fetchNextPage = React.useCallback(
    async (nextPageNumber: number) => {
      setIsFetching(true);
      try {
        const result = await loadOptions({
          page: nextPageNumber,
          page_size: pageSize,
          search: debouncedSearch,
        });

        const fetchedItems = result.data || [];
        const calculatedTotalPages =
          result.meta?.pagination?.totalPages ??
          (fetchedItems.length < pageSize ? nextPageNumber : nextPageNumber + 1);

        setPages((prev) => [...prev, fetchedItems]);
        setCurrentPage(nextPageNumber);
        setTotalPages(calculatedTotalPages);
      } catch (err) {
        console.error("Failed to fetch next page in AsyncSelect:", err);
      } finally {
        setIsFetching(false);
      }
    },
    [loadOptions, pageSize, debouncedSearch]
  );

  // Flatten items
  const items = React.useMemo(() => {
    const flattened = pages.flat().map((d) => {
      const idVal = d[idKey] ?? d.id ?? d._id;
      const labelVal = d[labelKey] ?? d.name ?? d.label;
      return {
        ...d,
        id: idVal as string | number,
        label: labelVal as string,
      };
    });

    return [...localItems, ...flattened];
  }, [pages, idKey, labelKey, localItems]);

  const hasNextPage = currentPage < totalPages;

  // Infinite scroll trigger via IntersectionObserver
  React.useEffect(() => {
    const el = listEndRef.current;
    if (!el || !open) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetching && !isLoading) {
          fetchNextPage(currentPage + 1);
        }
      });
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasNextPage, isFetching, isLoading, currentPage, fetchNextPage, open]);

  // Selection detection
  const isSelected = (opt: Option) => {
    const optId = opt.id ?? opt._id;
    if (multi) {
      return (
        Array.isArray(value) &&
        (value as Option[]).some((v) => (v.id ?? v._id) === optId)
      );
    }
    if (!value) return false;
    const singleVal = value as Option;
    return (singleVal.id ?? singleVal._id) === optId;
  };

  function handleSelect(opt: Option) {
    if (multi) {
      const arr = Array.isArray(value) ? [...(value as Option[])] : [];
      const optId = opt.id ?? opt._id;
      const existsIndex = arr.findIndex((a) => (a.id ?? a._id) === optId);
      if (existsIndex >= 0) {
        arr.splice(existsIndex, 1);
      } else {
        arr.push(opt);
      }
      onChange?.(arr);
    } else {
      onChange?.(opt);
      setOpen(false);
    }
  }

  function handleRemoveItem(e: React.MouseEvent, opt: Option) {
    e.stopPropagation();
    if (multi && Array.isArray(value)) {
      const optId = opt.id ?? opt._id;
      const arr = (value as Option[]).filter((v) => (v.id ?? v._id) !== optId);
      onChange?.(arr);
    }
  }

  function handleCreateLabel(label: string) {
    if (!creatable || !label.trim()) return;
    const newOpt: Option = {
      id: `new_${Date.now()}`,
      label: label.trim(),
      name: label.trim(),
    };
    setLocalItems((s) => [newOpt, ...s]);

    if (multi) {
      const arr = Array.isArray(value) ? [...(value as Option[])] : [];
      arr.push(newOpt);
      onChange?.(arr);
    } else {
      onChange?.(newOpt);
      setOpen(false);
    }
    setQ("");
  }

  const getOptionLabel = (opt: Option | undefined | null): string => {
    if (!opt) return "";
    return String(opt[labelKey] ?? opt.label ?? opt.name ?? "");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={disabled ? false : open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            rightIcon={
              <ChevronDown
                className={cn(
                  "h-4 w-4 opacity-60 shrink-0 text-muted-foreground group-hover:text-foreground transition-transform duration-200",
                  open && "rotate-180 opacity-100 text-foreground"
                )}
              />
            }
            className={cn(
              "w-full h-auto min-h-10 px-3.5 py-2 flex items-center justify-between gap-2.5 group",
              "bg-surface text-foreground border-border hover:bg-surface-secondary hover:text-foreground hover:border-brand-olive/50 text-left font-normal shadow-xs",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              !value && "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex-1 truncate block text-left">
              {multi ? (
                <span className="flex flex-wrap gap-1.5 py-0.5">
                  {Array.isArray(value) && (value as Option[]).length ? (
                    (value as Option[]).map((v) => (
                      <span
                        key={String(v.id ?? v._id)}
                        className="inline-flex items-center gap-1.5 text-xs bg-brand-gold/15 text-brand-charcoal dark:text-brand-gold pl-2.5 pr-1.5 py-0.5 rounded-control border border-brand-gold/30 font-medium shadow-2xs"
                      >
                        <span className="truncate max-w-[150px]">{getOptionLabel(v)}</span>
                        <span
                          role="button"
                          tabIndex={0}
                          className="cursor-pointer p-0.5 rounded-full hover:bg-brand-gold/30 text-brand-charcoal/70 hover:text-brand-charcoal dark:text-brand-gold/70 dark:hover:text-brand-gold transition-colors"
                          onClick={(e) => handleRemoveItem(e, v)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleRemoveItem(e as unknown as React.MouseEvent, v);
                            }
                          }}
                        >
                          <X className="h-3 w-3" />
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {placeholder}
                    </span>
                  )}
                </span>
              ) : (
                <span className={cn("truncate", !value && "text-muted-foreground group-hover:text-foreground transition-colors")}>
                  {value ? getOptionLabel(value as Option) : placeholder}
                </span>
              )}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full min-w-[280px] p-1.5 bg-surface border border-border shadow-md rounded-card z-50">
          {searchable && (
            <div className="p-2 border-b border-border">
              <InputPrimitive
                ref={searchInputRef}
                value={q}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search options..."
                className="h-8 w-full rounded-control border border-border bg-input px-3 py-1 text-xs text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          )}

          <div
            className="max-h-[260px] overflow-y-auto overflow-x-hidden p-1 space-y-0.5"
            onWheel={(e) => e.stopPropagation()}
          >
            {items.map((opt) => {
              const active = isSelected(opt);
              const label = getOptionLabel(opt);

              return (
                <div
                  key={String(opt.id ?? opt._id)}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-control py-2 px-3 text-xs sm:text-sm outline-none transition-colors",
                    active
                      ? "bg-brand-gold/20 text-brand-charcoal dark:text-brand-gold font-semibold border border-brand-gold/30 hover:bg-brand-gold/30"
                      : "text-foreground hover:bg-surface-secondary hover:text-foreground"
                  )}
                >
                  <span className="truncate pr-6">{label}</span>
                  {active && (
                    <span className="absolute right-3 flex h-4 w-4 items-center justify-center">
                      <Check className="h-4 w-4 text-brand-charcoal dark:text-brand-gold stroke-[2.5]" />
                    </span>
                  )}
                </div>
              );
            })}

            {creatable &&
              q.trim() &&
              !items.some(
                (i) => getOptionLabel(i).toLowerCase() === q.trim().toLowerCase()
              ) && (
                <div
                  onClick={() => handleCreateLabel(q)}
                  className="relative flex w-full cursor-pointer select-none items-center rounded-control py-2 px-3 text-xs sm:text-sm text-brand-gold font-semibold mt-1 border-t border-border hover:bg-surface-secondary hover:text-brand-gold transition-colors"
                >
                  Create &quot;{q.trim()}&quot;
                </div>
              )}

            <div ref={listEndRef} className="h-1" />

            {isLoading && items.length === 0 && (
              <div className="space-y-1.5 p-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-control" />
                ))}
              </div>
            )}

            {!isLoading && items.length === 0 && (
              <div className="p-5 text-center text-xs text-muted-foreground">
                No matching options found.
              </div>
            )}

            {isFetching && items.length > 0 && (
              <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground border-t border-border">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-gold" />
                <span>Loading more records...</span>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AsyncSelect;
