"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronRight,
  MoreHorizontal,
  Slash,
  ArrowRight,
  Dot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ----------------------------------------------------------------------
// Low-Level Composable Subcomponents (WAI-ARIA Compliant)
// ----------------------------------------------------------------------

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("w-full overflow-x-auto py-1", className)}
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5 sm:gap-2", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, href, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors duration-200 text-muted-foreground hover:text-brand-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-xs",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(
      "font-semibold text-foreground truncate max-w-[200px] sm:max-w-[320px] md:max-w-none",
      className
    )}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<"li"> {
  type?: "chevron" | "slash" | "arrow" | "dot";
}

export const BreadcrumbSeparator = ({
  children,
  className,
  type = "chevron",
  ...props
}: BreadcrumbSeparatorProps) => {
  const renderSeparatorIcon = () => {
    if (children) return children;
    switch (type) {
      case "slash":
        return <Slash className="h-3 w-3 -rotate-12 text-muted-foreground/60" />;
      case "arrow":
        return <ArrowRight className="h-3 w-3 text-muted-foreground/60" />;
      case "dot":
        return <Dot className="h-4 w-4 text-brand-gold" />;
      case "chevron":
      default:
        return <ChevronRight className="h-3 w-3 text-muted-foreground/60" />;
    }
  };

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center text-muted-foreground/60 select-none", className)}
      {...props}
    >
      {renderSeparatorIcon()}
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-6 w-6 items-center justify-center rounded-control text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors cursor-pointer",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-3.5 w-3.5" />
    <span className="sr-only">More intermediate pages</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// ----------------------------------------------------------------------
// High-Level Ergonomic Prop-Driven Component
// ----------------------------------------------------------------------

export interface BreadcrumbItemDefinition {
  label: React.ReactNode;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  isCurrent?: boolean;
}

export type BreadcrumbSeparatorType = "chevron" | "slash" | "arrow" | "dot";
export type BreadcrumbVariant = "default" | "gold" | "subtle" | "glass";
export type BreadcrumbSize = "sm" | "md" | "lg";

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
  items: BreadcrumbItemDefinition[];
  separator?: BreadcrumbSeparatorType | React.ReactNode;
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  maxItems?: number;
}

const variantStyles: Record<BreadcrumbVariant, string> = {
  default: "text-muted-foreground",
  gold: "text-muted-foreground [&_a:hover]:text-brand-gold [&_[aria-current=page]]:text-brand-gold",
  subtle: "text-muted-foreground/80 opacity-90",
  glass:
    "bg-surface/80 dark:bg-black/50 backdrop-blur-md border border-border/80 px-3.5 py-1.5 rounded-full shadow-xs w-fit",
};

const sizeStyles: Record<BreadcrumbSize, { list: string; icon: string; text: string }> = {
  sm: {
    list: "text-[11px] gap-1 sm:gap-1.5",
    icon: "h-3 w-3",
    text: "text-[11px]",
  },
  md: {
    list: "text-xs gap-1.5 sm:gap-2",
    icon: "h-3.5 w-3.5",
    text: "text-xs",
  },
  lg: {
    list: "text-sm gap-2 sm:gap-2.5",
    icon: "h-4 w-4",
    text: "text-sm",
  },
};

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator = "chevron",
      variant = "default",
      size = "md",
      maxItems,
      className,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    if (!items || items.length === 0) {
      return null;
    }

    const sizeConfig = sizeStyles[size];

    // Handle ellipsis collapse when maxItems is specified
    const displayItems = items;
    let hasCollapsed = false;
    let beforeItems: BreadcrumbItemDefinition[] = [];
    let afterItems: BreadcrumbItemDefinition[] = [];

    if (maxItems && items.length > maxItems && !isExpanded) {
      hasCollapsed = true;
      // Show first item, ellipsis, then last (maxItems - 1) items
      beforeItems = items.slice(0, 1);
      afterItems = items.slice(items.length - (maxItems - 1));
    }

    const renderItemContent = (item: BreadcrumbItemDefinition) => {
      const Icon = item.icon;
      return (
        <span className="inline-flex items-center gap-1.5">
          {Icon && <Icon className={cn(sizeConfig.icon, "shrink-0")} />}
          <span className="truncate">{item.label}</span>
          {item.badge && (
            <span className="rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider font-semibold">
              {item.badge}
            </span>
          )}
        </span>
      );
    };

    const separatorElement =
      typeof separator === "string" ? (
        <BreadcrumbSeparator
          type={separator as BreadcrumbSeparatorType}
        />
      ) : (
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
      );

    return (
      <Breadcrumb
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        <BreadcrumbList className={sizeConfig.list}>
          {hasCollapsed ? (
            <>
              {/* First Item */}
              <BreadcrumbItem key={0}>
                {beforeItems[0].href ? (
                  <BreadcrumbLink href={beforeItems[0].href}>
                    {renderItemContent(beforeItems[0])}
                  </BreadcrumbLink>
                ) : (
                  renderItemContent(beforeItems[0])
                )}
              </BreadcrumbItem>

              {separatorElement}

              {/* Collapsed Ellipsis Trigger */}
              <BreadcrumbItem key="ellipsis">
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => setIsExpanded(true)}
                  className="h-6 w-6 p-0 rounded-control inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                  title="Click to show full path"
                  aria-label="Expand hidden trail items"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </BreadcrumbItem>

              {separatorElement}

              {/* Trailing Items */}
              {afterItems.map((item, idx) => {
                const isCurrent =
                  item.isCurrent ?? idx === afterItems.length - 1;
                const isLast = idx === afterItems.length - 1;
                return (
                  <React.Fragment key={idx}>
                    <BreadcrumbItem>
                      {isCurrent || !item.href ? (
                        <BreadcrumbPage>
                          {renderItemContent(item)}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href}>
                          {renderItemContent(item)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && separatorElement}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            displayItems.map((item, idx) => {
              const isCurrent =
                item.isCurrent ?? idx === displayItems.length - 1;
              const isLast = idx === displayItems.length - 1;

              return (
                <React.Fragment key={idx}>
                  <BreadcrumbItem>
                    {isCurrent || !item.href ? (
                      <BreadcrumbPage>
                        {renderItemContent(item)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>
                        {renderItemContent(item)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && separatorElement}
                </React.Fragment>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";
