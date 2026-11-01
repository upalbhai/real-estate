import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  Building,
  DollarSign,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { MarketStatItem } from "@/data/mock-cards-data";

export interface StatCardProps {
  stat: MarketStatItem;
  className?: string;
}

const iconMap = {
  TrendingUp,
  Building,
  DollarSign,
  Users,
};

export function StatCard({ stat, className }: StatCardProps) {
  const IconComponent = iconMap[stat.iconName] || TrendingUp;

  return (
    <Card
      variant="default"
      className={cn(
        "p-6 bg-surface border border-border flex flex-col justify-between space-y-4 hover:border-brand-gold/40 transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-control bg-brand-gold/15 text-brand-gold">
          <IconComponent className="h-5 w-5" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
            stat.trend === "up"
              ? "bg-success/15 text-success"
              : "bg-error/15 text-error"
          )}
        >
          {stat.trend === "up" ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{stat.change}</span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-special">
          {stat.label}
        </span>
        <div className="font-heading text-3xl font-bold tracking-tight text-foreground">
          {stat.value}
        </div>
      </div>

      <p className="text-xs text-muted-foreground pt-2 border-t border-border/60">
        {stat.description}
      </p>
    </Card>
  );
}

