"use client";

import * as React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Award } from "lucide-react";
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
        {/* Top Header with Headshot & Territory */}
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-xs shrink-0">
            <Image
              src={agent.avatarUrl}
              alt={agent.name}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-surface-secondary px-3 py-1 text-xs text-muted-foreground border border-border">
            <MapPin className="h-3 w-3 text-brand-gold shrink-0" />
            <span className="font-medium text-[11px] truncate max-w-[130px]">
              {agent.territory}
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
          <div className="flex items-center gap-1.5 pt-2 text-xs text-brand-gold font-semibold">
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span>{agent.specialty}</span>
          </div>
        </div>
      </div>

      {/* Direct Contact CTAs */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <a href={`tel:${agent.phone}`} className="flex-1">
          <Button
            size="sm"
            variant="gold"
            className="w-full justify-center"
            leftIcon={<Phone className="h-3.5 w-3.5" />}
            onClick={() => onContact?.(agent.id)}
          >
            Call Direct
          </Button>
        </a>
        <a
          href={`mailto:${agent.email}`}
          title={`Email ${agent.name}`}
          aria-label={`Email ${agent.name}`}
        >
          <Button
            size="icon-sm"
            variant="secondary"
            aria-label={`Email ${agent.name}`}
          >
            <Mail className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </Card>
  );
}
