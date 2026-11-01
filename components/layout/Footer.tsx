"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { footerNavSections, globalOffices } from "@/data";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="border-t border-border bg-surface text-foreground transition-colors">
      {/* Top Hairline Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-charcoal via-brand-gold to-brand-olive dark:from-brand-gold/70 dark:via-brand-olive dark:to-brand-gold/40" />

      {/* Main Footer Container */}
      <div className="section-container py-16 sm:py-20 space-y-16">
        {/* Row 1: Brand Manifesto & Confidential Newsletter Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Brand Manifesto */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary text-primary-foreground border border-brand-gold/30 group-hover:border-brand-gold transition-colors">
                <Building2 className="h-5 w-5 text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold tracking-tight text-foreground leading-none">
                  AURA ESTATES
                </span>
                <span className="text-[10px] font-special uppercase tracking-[0.22em] text-brand-gold mt-1 leading-none">
                  Atelier &amp; Private Advisory
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-lg leading-relaxed font-body">
              Aura Estates curates world-class modernist architecture, off-market trophy
              residences, and landmark estates for ultra-high-net-worth individuals, family
              offices, and discerning architectural collectors worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Badge variant="gold" size="sm">
                Fiduciary Escrow Certified
              </Badge>
              <Badge variant="default" size="sm">
                Strict Non-Disclosure Protocols
              </Badge>
              <Badge variant="available" size="sm">
                Global AML Cleared
              </Badge>
            </div>
          </div>

          {/* Confidential Intelligence Dispatch Box */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-card border border-border bg-surface-secondary/40 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span className="font-heading text-lg font-bold text-foreground">
                  Confidential Portfolio Dispatch
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive discrete quarterly dossiers covering newly released off-market acquisitions,
                architectural provenance studies, and prime territory capital flows.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-control bg-success/15 border border-success/30 text-success text-xs font-medium animate-fadeIn">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  Thank you. Your address has been added to our confidential advisory registry.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <Input
                  type="email"
                  placeholder="principal@familyoffice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="shrink-0"
                >
                  Join Registry
                </Button>
              </form>
            )}

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
              <span>Zero spam. Absolute encryption. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Row 2: Global Atelier Hubs */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-brand-gold" />
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Global Atelier Offices
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalOffices.map((office) => (
              <div
                key={office.city}
                className="p-4 rounded-control border border-border bg-surface-secondary/20 space-y-1.5 hover:border-brand-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-base font-bold text-foreground">
                    {office.city}
                  </span>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">
                    Office Hub
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {office.address}
                </p>
                <div className="pt-1 flex flex-col text-[11px] text-muted-foreground font-mono space-y-0.5">
                  <span className="hover:text-foreground transition-colors cursor-pointer">
                    {office.phone}
                  </span>
                  <span className="text-brand-gold hover:underline cursor-pointer">
                    {office.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Multi-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-border">
          {footerNavSections.map((column) => (
            <div key={column.title} className="space-y-3">
              <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                {column.title}
              </h5>
              <ul className="space-y-2 text-xs">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Row 4: Regulatory Disclaimers & Copyright */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Aura Estates Atelier Inc. All rights reserved.</span>
            <span className="hidden sm:inline-block text-border">•</span>
            <span>Equal Housing Opportunity</span>
            <span className="hidden sm:inline-block text-border">•</span>
            <span>Licensed Real Estate Fiduciary</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/about" className="hover:text-foreground transition-colors">
              Privacy Notice
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              Terms of Representation
            </Link>
            <Link href="/admin" className="text-brand-gold hover:underline font-semibold">
              Executive Portal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
