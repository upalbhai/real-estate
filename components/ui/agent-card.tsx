"use client";

import * as React from "react";
import Image from "next/image";
import { Phone, Mail, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Button } from "./button";
import { AgentCardData } from "@/data/mock-cards-data";

export interface AgentCardProps {
  agent: AgentCardData;
  onContact?: (agentId: string) => void;
  className?: string;
}

export function AgentCard({ agent, onContact, className }: AgentCardProps) {
  return (
    <Card
      variant="interactive"
      className={cn(
        "group flex flex-col justify-between p-6 bg-surface border border-border space-y-6",
        className
      )}
    >
      <div className="space-y-4">
        {/* Top Header with Headshot */}
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-18 w-18 rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-xs shrink-0">
            <Image
              src={agent.avatarUrl}
              alt={agent.name}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brand-gold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{agent.rating}</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">
              {agent.license}
            </span>
          </div>
        </div>

        {/* Name & Role */}
        <div className="space-y-1">
          <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-brand-gold transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-muted-foreground font-medium">
            {agent.role}
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[11px] text-brand-gold font-semibold">
            <Award className="h-3.5 w-3.5" />
            <span>{agent.specialty}</span>
          </div>
        </div>
      </div>

      {/* Track Record Metrics */}
      <div className="grid grid-cols-2 gap-3 py-3 border-y border-border bg-surface-secondary/30 rounded-control px-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Sales Volume
          </span>
          <p className="font-heading text-lg font-bold text-foreground">
            {agent.salesVolume}
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Active Portfolios
          </span>
          <p className="font-heading text-lg font-bold text-foreground">
            {agent.activeListings} Properties
          </p>
        </div>
      </div>

      {/* Contact CTAs */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          size="sm"
          variant="gold"
          className="flex-1"
          leftIcon={<Phone className="h-3.5 w-3.5" />}
          onClick={() => onContact?.(agent.id)}
        >
          Call Direct
        </Button>
        <Button
          size="icon-sm"
          variant="secondary"
          title={`Email ${agent.name}`}
          aria-label={`Email ${agent.name}`}
          onClick={() => alert(`Opening email client for ${agent.email}`)}
        >
          <Mail className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
