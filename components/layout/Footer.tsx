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

const CURRENT_YEAR = 2026;

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
    <footer className="border-t border-border dark:border-[#282F23] bg-surface dark:bg-[#121511] text-foreground transition-colors relative overflow-hidden">
      {/* Top Hairline Accent Line with Champagne Gold Glow */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent shadow-[0_1px_14px_rgba(197,168,120,0.35)]" />

      {/* Ambient Lighting Orbs for Deep Dark Mode Atmosphere */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-gold/5 blur-[120px] dark:bg-brand-gold/[0.09]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-brand-olive/10 blur-[130px] dark:bg-brand-olive/[0.08]"
        aria-hidden="true"
      />

      {/* Main Footer Container */}
      <div className="section-container relative z-10 py-16 sm:py-20 space-y-16">
        {/* Row 1: Brand Manifesto & Confidential Newsletter Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Brand Manifesto */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group inline-flex">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-primary dark:bg-[#1A2017] text-primary-foreground dark:text-brand-gold border border-brand-gold/40 shadow-xs dark:shadow-[0_0_16px_rgba(197,168,120,0.18)] group-hover:border-brand-gold transition-all duration-300">
                <Building2 className="h-5 w-5 text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold tracking-tight text-foreground leading-none">
                  AURA ESTATES
                </span>
                <span className="text-[10px] font-special uppercase tracking-[0.24em] text-brand-gold mt-1.5 leading-none font-semibold">
                  Atelier &amp; Private Advisory
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground dark:text-[#A4AC9A] max-w-lg leading-relaxed font-body">
              Aura Estates curates world-class modernist architecture, off-market trophy
              residences, and landmark estates for ultra-high-net-worth individuals, family
              offices, and discerning architectural collectors worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Badge variant="gold" size="sm" className="dark:bg-brand-gold/15 dark:border-brand-gold/40 dark:text-brand-gold font-semibold">
                Fiduciary Escrow Certified
              </Badge>
              <Badge variant="default" size="sm" className="dark:bg-[#1A2017] dark:border-[#2C3426] dark:text-[#D5D2C9]">
                Strict Non-Disclosure Protocols
              </Badge>
              <Badge variant="available" size="sm" className="dark:bg-emerald-950/40 dark:border-emerald-600/30 dark:text-emerald-400">
                Global AML Cleared
              </Badge>
            </div>
          </div>

          {/* Confidential Intelligence Dispatch Box */}
          <div className="lg:col-span-6 relative p-6 sm:p-7 rounded-card border border-border dark:border-brand-gold/30 bg-surface-secondary/40 dark:bg-gradient-to-br dark:from-[#1C2119] dark:to-[#141811] space-y-4 shadow-md dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] overflow-hidden">
            {/* Top Gold Card Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-gold" />
                  <span className="font-heading text-lg font-bold text-foreground">
                    Confidential Portfolio Dispatch
                  </span>
                </div>
                <span className="text-[10px] font-special uppercase tracking-wider text-brand-gold bg-brand-gold/10 dark:bg-brand-gold/20 px-2.5 py-0.5 rounded-full border border-brand-gold/40 font-semibold">
                  Quarterly Dossier
                </span>
              </div>
              <p className="text-xs text-muted-foreground dark:text-[#A4AC9A] leading-relaxed font-body">
                Receive discrete quarterly dossiers covering newly released off-market acquisitions,
                architectural provenance studies, and prime territory capital flows.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 rounded-control bg-success/15 border border-success/30 text-success text-xs font-medium animate-fadeIn">
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
                  className="flex-1 dark:bg-[#10130F] dark:border-[#2D3526] dark:focus:border-brand-gold dark:text-[#F5F2EB] dark:placeholder:text-[#788170]"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="shrink-0 font-bold shadow-[0_4px_16px_rgba(197,168,120,0.3)] hover:shadow-[0_6px_24px_rgba(197,168,120,0.5)]"
                >
                  Join Registry
                </Button>
              </form>
            )}

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground dark:text-[#889180] font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-gold shrink-0" />
              <span>Zero spam. Absolute encryption. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Row 2: Global Atelier Hubs */}
        <div className="space-y-4 pt-4 border-t border-border dark:border-[#242A1F]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-brand-gold" />
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground dark:text-brand-gold/90">
                Global Atelier Offices
              </h4>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground dark:text-[#889180]">
              4 Physical Hubs Worldwide
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {globalOffices.map((office) => (
              <div
                key={office.city}
                className="p-4 rounded-control border border-border dark:border-[#2A3125] bg-surface-secondary/30 dark:bg-gradient-to-b dark:from-[#191D16] dark:to-[#131611] space-y-2 hover:border-brand-gold/50 hover:dark:border-brand-gold/50 hover:bg-surface-secondary/70 transition-all duration-300 shadow-2xs dark:shadow-[0_6px_20px_rgba(0,0,0,0.35)] group hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-base font-bold text-foreground group-hover:text-brand-gold transition-colors">
                    {office.city}
                  </span>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider border border-brand-gold/30 bg-brand-gold/10 px-2 py-0.5 rounded-full font-semibold">
                    Office Hub
                  </span>
                </div>
                <p className="text-xs text-muted-foreground dark:text-[#A4AC9A] leading-relaxed font-body">
                  {office.address}
                </p>
                <div className="pt-1 flex flex-col text-[11px] text-muted-foreground dark:text-[#7F8877] font-mono space-y-0.5">
                  <span className="hover:text-foreground dark:hover:text-[#F5F2EB] transition-colors cursor-pointer">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border dark:border-[#242A1F]">
          {footerNavSections.map((column) => (
            <div key={column.title} className="space-y-3">
              <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground dark:text-brand-gold/90">
                {column.title}
              </h5>
              <ul className="space-y-2 text-xs">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground dark:text-[#9EA695] hover:text-brand-gold dark:hover:text-brand-gold hover:translate-x-1 transition-all inline-block py-0.5"
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
        <div className="pt-8 border-t border-border dark:border-[#242A1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground dark:text-[#7F8877]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {CURRENT_YEAR} Aura Estates Atelier Inc. All rights reserved.</span>
            <span className="hidden sm:inline-block text-border dark:text-[#32392D]">•</span>
            <span>Equal Housing Opportunity</span>
            <span className="hidden sm:inline-block text-border dark:text-[#32392D]">•</span>
            <span>Licensed Real Estate Fiduciary</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/about" className="hover:text-foreground dark:hover:text-[#F5F2EB] transition-colors">
              Privacy Notice
            </Link>
            <Link href="/about" className="hover:text-foreground dark:hover:text-[#F5F2EB] transition-colors">
              Terms of Representation
            </Link>
            <Link href="/admin" className="text-brand-gold hover:text-amber-300 font-semibold transition-colors">
              Executive Portal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
