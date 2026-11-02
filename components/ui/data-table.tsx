"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Download,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export interface ColumnDef<TData, TValue = unknown> {
  id: string;
  header: string | React.ReactNode;
  accessorKey?: keyof TData;
  cell?: (info: { row: TData; value: TValue; index: number }) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  searchKey?: keyof TData;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  enableRowSelection?: boolean;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  title?: string;
  description?: string;
  batchActions?: (selectedRows: TData[], clearSelection: () => void) => React.ReactNode;
  toolbarActions?: React.ReactNode;
  className?: string;
}

export function DataTable<TData>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search records...",
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  enableRowSelection = false,
  onRowClick,
  isLoading = false,
  emptyMessage = "No records found.",
  title,
  description,
  batchActions,
  toolbarActions,
  className,
}: DataTableProps<TData>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize);
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(columns.map((c) => c.id))
  );
  const [showColumnToggle, setShowColumnToggle] = React.useState(false);

  // Filtered data
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase().trim();
    return data.filter((item) => {
      const record = item as Record<string, unknown>;
      if (searchKey) {
        const val = record[searchKey as string];
        return val ? String(val).toLowerCase().includes(query) : false;
      }
      return Object.values(record).some((val) =>
        val !== null && val !== undefined
          ? String(val).toLowerCase().includes(query)
          : false
      );
    });
  }, [data, searchQuery, searchKey]);

  // Sorted data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;

    const column = columns.find((c) => c.id === sortColumn);
    if (!column || !column.accessorKey) return filteredData;

    const key = column.accessorKey as string;
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[key];
      const bVal = (b as Record<string, unknown>)[key];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedData = React.useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, safePage, pageSize]);

  // Sorting handler
  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortColumn(null);
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allPageIndices = new Set(
        paginatedData.map((_, idx) => (safePage - 1) * pageSize + idx)
      );
      setSelectedIds(allPageIndices);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (index: number) => {
    const updated = new Set(selectedIds);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedIds(updated);
  };

  const clearSelection = () => setSelectedIds(new Set());

  const selectedRows = React.useMemo(() => {
    return Array.from(selectedIds).map((idx) => sortedData[idx]).filter(Boolean);
  }, [selectedIds, sortedData]);

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, idx) =>
      selectedIds.has((safePage - 1) * pageSize + idx)
    );

  const isSomeSelected =
    paginatedData.some((_, idx) =>
      selectedIds.has((safePage - 1) * pageSize + idx)
    ) && !isAllSelected;

  const activeColumns = columns.filter((col) => visibleColumns.has(col.id));

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Title & Header if provided */}
      {(title || description) && (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {toolbarActions && (
            <div className="flex items-center gap-2 mt-2 sm:mt-0">{toolbarActions}</div>
          )}
        </div>
      )}

      {/* Toolbar: Search, Filters, Column Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Column Visibility Menu */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
              onClick={() => setShowColumnToggle(!showColumnToggle)}
            >
              Columns
            </Button>

            {showColumnToggle && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowColumnToggle(false)}
                />
                <div className="absolute right-0 mt-2 z-30 w-48 rounded-control border border-border bg-surface p-2 shadow-lg">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1 mb-1 border-b border-border/50">
                    Toggle Columns
                  </div>
                  <div className="space-y-1">
                    {columns.map((col) => {
                      const isChecked = visibleColumns.has(col.id);
                      return (
                        <label
                          key={col.id}
                          className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-foreground hover:bg-surface-secondary cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const next = new Set(visibleColumns);
                              if (e.target.checked) {
                                next.add(col.id);
                              } else {
                                if (next.size > 1) next.delete(col.id);
                              }
                              setVisibleColumns(next);
                            }}
                            className="rounded border-border text-brand-olive focus:ring-ring"
                          />
                          <span className="truncate">
                            {typeof col.header === "string" ? col.header : col.id}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Batch Selection Banner */}
      {enableRowSelection && selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-control border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm text-foreground animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-gold">
              {selectedIds.size}
            </span>{" "}
            row{selectedIds.size > 1 ? "s" : ""} selected
          </div>
          <div className="flex items-center gap-2">
            {batchActions ? (
              batchActions(selectedRows, clearSelection)
            ) : (
              <>
                <Button
                  size="xs"
                  variant="outline"
                  leftIcon={<Download className="h-3 w-3" />}
                  onClick={() => alert(`Exporting ${selectedIds.size} items`)}
                >
                  Export
                </Button>
                <Button
                  size="xs"
                  variant="destructive"
                  leftIcon={<Trash2 className="h-3 w-3" />}
                  onClick={() => {
                    alert(`Deleting ${selectedIds.size} items`);
                    clearSelection();
                  }}
                >
                  Delete
                </Button>
              </>
            )}
            <Button size="xs" variant="ghost" onClick={clearSelection}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="card-base overflow-hidden border border-border shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-secondary/60">
                {enableRowSelection && (
                  <th className="w-12 px-4 py-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected;
                      }}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-border text-brand-olive focus:ring-ring cursor-pointer"
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {activeColumns.map((col) => {
                  const isSorted = sortColumn === col.id;
                  return (
                    <th
                      key={col.id}
                      style={{ width: col.width }}
                      className={cn(
                        "px-4 py-3.5 text-xs font-semibold tracking-wider uppercase text-muted-foreground select-none",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.sortable && "cursor-pointer hover:text-foreground"
                      )}
                      onClick={() => col.sortable && handleSort(col.id)}
                    >
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          col.align === "right" && "justify-end",
                          col.align === "center" && "justify-center"
                        )}
                      >
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-muted-foreground/80">
                            {isSorted ? (
                              sortDirection === "asc" ? (
                                <ChevronUp className="h-3.5 w-3.5 text-brand-gold" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5 text-brand-gold" />
                              )
                            ) : (
                              <ChevronsUpDown className="h-3.5 w-3.5 opacity-40 hover:opacity-100" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                // Skeleton loading rows
                Array.from({ length: pageSize }).map((_, rIdx) => (
                  <tr key={`skeleton-${rIdx}`} className="animate-pulse">
                    {enableRowSelection && (
                      <td className="px-4 py-4 text-center">
                        <div className="h-4 w-4 mx-auto rounded bg-muted/60" />
                      </td>
                    )}
                    {activeColumns.map((c) => (
                      <td key={`col-${c.id}`} className="px-4 py-4">
                        <div className="h-4 rounded bg-muted/60 w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeColumns.length + (enableRowSelection ? 1 : 0)}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center justify-center">
                      <div className="mb-3 rounded-full bg-surface-secondary p-3 text-muted-foreground">
                        <Search className="h-6 w-6" />
                      </div>
                      <p className="text-base font-medium text-foreground">
                        {emptyMessage}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Try adjusting your search query or reset your filters.
                      </p>
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-3"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rIdx) => {
                  const globalIdx = (safePage - 1) * pageSize + rIdx;
                  const isSelected = selectedIds.has(globalIdx);
                  const record = row as Record<string, unknown>;

                  return (
                    <tr
                      key={String(record.id ?? `row-${globalIdx}`)}
                      onClick={() => onRowClick && onRowClick(row)}
                      className={cn(
                        "transition-colors duration-150",
                        isSelected
                          ? "bg-brand-gold/5"
                          : "hover:bg-surface-secondary/50",
                        onRowClick && "cursor-pointer"
                      )}
                    >
                      {enableRowSelection && (
                        <td
                          className="w-12 px-4 py-3.5 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(globalIdx)}
                            className="h-4 w-4 rounded border-border text-brand-olive focus:ring-ring cursor-pointer"
                            aria-label={`Select row ${globalIdx + 1}`}
                          />
                        </td>
                      )}
                      {activeColumns.map((col) => {
                        const cellValue = col.accessorKey
                          ? record[col.accessorKey as string]
                          : undefined;

                        return (
                          <td
                            key={col.id}
                            className={cn(
                              "px-4 py-3.5 text-foreground align-middle",
                              col.align === "right" && "text-right",
                              col.align === "center" && "text-center"
                            )}
                          >
                            {col.cell
                              ? col.cell({
                                  row,
                                  value: cellValue,
                                  index: globalIdx,
                                })
                              : String(cellValue ?? "-")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground">
                {sortedData.length === 0
                  ? 0
                  : (safePage - 1) * pageSize + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-foreground">
                {Math.min(safePage * pageSize, sortedData.length)}
              </strong>{" "}
              of <strong className="text-foreground">{sortedData.length}</strong>{" "}
              entries
            </span>

            <div className="flex items-center gap-1.5 ml-2">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded border border-border bg-input px-2 py-1 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-ring"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <Button
              variant="outline"
              size="xs"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
              leftIcon={<ChevronLeft className="h-3.5 w-3.5" />}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber = i + 1;
                if (totalPages > 5 && safePage > 3) {
                  pageNumber = safePage - 2 + i;
                  if (pageNumber > totalPages) {
                    pageNumber = totalPages - 4 + i;
                  }
                }
                const isActive = safePage === pageNumber;

                return (
                  <Button
                    key={pageNumber}
                    type="button"
                    variant={isActive ? "primary" : "ghost"}
                    size="icon-sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={cn(
                      "h-7 w-7 text-xs font-medium",
                      isActive
                        ? "font-semibold"
                        : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                    )}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="xs"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
              rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
