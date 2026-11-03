"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  faqCategories,
  mockFaqItems,
  FaqCategory,
} from "@/data/mock-faq-data";

export function FaqContent() {
  const [selectedCategory, setSelectedCategory] = React.useState<FaqCategory["id"]>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openIds, setOpenIds] = React.useState<string[]>(["faq-1", "faq-4"]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = React.useMemo(() => {
    return mockFaqItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="section-container py-12 sm:py-16 space-y-10">
      {/* Top Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ", isCurrent: true },
        ]}
        separator="chevron"
        variant="gold"
        size="sm"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
          Frequently Asked{" "}
          Questions
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
          Helpful answers to common questions about buying, selling, property viewings, and working with Aura Estates.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          type="search"
          placeholder="Search questions or keywords (e.g. viewings, offers, locations)..."
          leftIcon={<Search className="h-4 w-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-xs"
        />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {faqCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <Button
                key={cat.id}
                type="button"
                variant={isSelected ? "primary" : "secondary"}
                size="xs"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "rounded-full uppercase tracking-wider font-medium",
                  isSelected
                    ? "border-brand-gold/50 font-bold shadow-2xs"
                    : "hover:border-brand-gold/40"
                )}
              >
                {cat.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={cn(
                  "rounded-card border transition-all duration-200 bg-surface overflow-hidden shadow-xs",
                  isOpen
                    ? "border-brand-gold/50 shadow-md ring-1 ring-brand-gold/20"
                    : "border-border hover:border-brand-gold/40"
                )}
              >
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  onClick={() => toggleItem(faq.id)}
                  className="p-5 sm:p-6 h-auto text-left justify-between items-center rounded-none hover:bg-transparent whitespace-normal gap-4"
                  aria-expanded={isOpen}
                  rightIcon={
                    <div
                      className={cn(
                        "h-8 w-8 rounded-control border border-border bg-surface-secondary/40 flex items-center justify-center text-muted-foreground transition-transform duration-200 shrink-0",
                        isOpen && "rotate-180 text-brand-gold border-brand-gold/40 bg-brand-gold/10"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  }
                >
                  <div className="space-y-1 text-left flex-1">
                    <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold font-bold">
                      {faq.category}
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                </Button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body border-t border-border/60 pt-4 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-card border border-dashed border-border space-y-3 bg-surface-secondary/20">
            <HelpCircle className="h-8 w-8 text-brand-gold mx-auto" />
            <div className="space-y-1">
              <h4 className="font-heading text-lg font-bold text-foreground">
                No Inquiries Found
              </h4>
              <p className="text-xs text-muted-foreground">
                Try searching for other terms or reset your category filter.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Direct Partner Consultation Card */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-card border border-border bg-surface-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md text-center sm:text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="h-4 w-4 text-brand-gold" />
            <span className="font-special text-xs uppercase tracking-wider text-brand-gold font-bold">
              Unanswered Mandate Question?
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
            Schedule a Confidential Partner Briefing
          </h3>
          <p className="text-xs text-muted-foreground font-body max-w-md leading-relaxed">
            Our senior equity partners provide discrete advisory for bespoke acquisitions, multi-jurisdictional family office structures, and private vault releases.
          </p>
        </div>

        <Link href="/contact" className="shrink-0">
          <Button variant="gold" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Inquire Privately
          </Button>
        </Link>
      </div>
    </div>
  );
}
