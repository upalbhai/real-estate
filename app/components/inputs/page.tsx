"use client";

import * as React from "react";
import {
  Search,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  propertyTypes,
  priceRanges,
  bedroomOptions,
  featureCheckboxes,
  listingTypeOptions,
  jurisdictionOptions,
} from "@/data/mock-form-data";

export default function InputsShowcasePage() {
  // Input states
  const [showPassword, setShowPassword] = React.useState(false);
  const [priceInput, setPriceInput] = React.useState("14500000");

  // Checkbox states
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([
    "pool",
    "wine",
  ]);

  // Radio states
  const [listingType, setListingType] = React.useState("sale");
  const [selectedBeds, setSelectedBeds] = React.useState("4+");

  // Switch states
  const [furnished, setFurnished] = React.useState(true);
  const [verifiedBuyer, setVerifiedBuyer] = React.useState(false);

  // Form submission preview
  const [submitted, setSubmitted] = React.useState(false);

  const toggleFeature = (id: string, checked: boolean) => {
    setSelectedFeatures((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const isAllFeatures = selectedFeatures.length === featureCheckboxes.length;
  const isSomeFeatures =
    selectedFeatures.length > 0 && selectedFeatures.length < featureCheckboxes.length;

  const toggleAllFeatures = (checked: boolean) => {
    setSelectedFeatures(checked ? featureCheckboxes.map((f) => f.id) : []);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="gold">Form Controls UI</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/input, checkbox, radio, select, switch
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Inputs &amp; Form Architecture
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Production-grade form controls styled in harmony with the real estate design
          tokens. Includes labeled inputs, prefix/suffix units, custom checkboxes,
          card-based radios, switches, and native selects.
        </p>
      </div>

      {/* 1. Text Inputs Matrix */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Text &amp; Numeric Inputs
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Supports labels, icons, prefix / suffix units, and validation states.
            </p>
          </div>
          <Badge variant="available">8 Variations</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Standard Input with Icon */}
          <Input
            label="Estate Search"
            placeholder="Search by community or architect..."
            leftIcon={<Search className="h-4 w-4" />}
            helperText="e.g. Bel Air, Aspen, or Zaha Hadid"
          />

          {/* Email Input */}
          <Input
            label="Client Email Address"
            type="email"
            placeholder="investor@familyoffice.com"
            leftIcon={<Mail className="h-4 w-4" />}
          />

          {/* Currency Prefix & Suffix */}
          <Input
            label="Target Offer Price"
            prefixText="$"
            suffixText="USD"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            helperText="Formatted with currency tokens"
          />

          {/* Area Metric Suffix */}
          <Input
            label="Minimum Lot Area"
            placeholder="7,500"
            suffixText="sq ft"
            defaultValue="8,200"
          />

          {/* Password with Eye Toggle */}
          <Input
            label="Vault Access Key"
            type={showPassword ? "text" : "password"}
            placeholder="Enter secure passcode"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowPassword(!showPassword)}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            }
          />

          {/* Error State */}
          <Input
            label="MLS Registration ID"
            defaultValue="INVALID-99"
            error="MLS Reference Number was not found in registry."
          />

          {/* Disabled State */}
          <Input
            label="Escrow Account ID"
            defaultValue="ESC-9948-HOLDING"
            disabled
            helperText="Locked by Title &amp; Trust officer"
          />
        </div>
      </section>

      {/* 2. Textarea with Live Counter */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Textarea &amp; Multi-line Description
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Includes character counter, validation display, and expandable height.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textarea
            label="Property Architectural Narrative"
            placeholder="Describe the architectural ethos, finishings, and unique structural attributes..."
            rows={4}
            maxLength={250}
            showCount
            defaultValue="Cantilevered modernist residence featuring limestone surfaces, floor-to-ceiling Schuco glass, and private subterranean gallery."
            helperText="Public MLS buyer overview (max 250 characters)"
          />

          <Textarea
            label="Confidential Offer Terms"
            placeholder="Detail any escrow contingencies or closing timeline terms..."
            rows={4}
            error="Earnest money deposit terms must be specified."
          />
        </div>
      </section>

      {/* 3. Checkboxes & Multi-Toggles */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Checkboxes &amp; Card Selectors
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Supports standard inline checkboxes, indeterminate states, and card-style toggles.
            </p>
          </div>
          <Badge variant="gold">Interactive</Badge>
        </div>

        {/* Master Select All Bar */}
        <div className="rounded-control bg-surface-secondary/40 p-4 border border-border flex items-center justify-between">
          <Checkbox
            label="Select All Featured Amenities"
            description="Toggle all luxury items for MLS export"
            checked={isAllFeatures}
            indeterminate={isSomeFeatures}
            onCheckedChange={toggleAllFeatures}
          />
          <span className="text-xs font-mono text-brand-gold font-semibold">
            {selectedFeatures.length} of {featureCheckboxes.length} selected
          </span>
        </div>

        {/* Card Style Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featureCheckboxes.map((item) => {
            const isChecked = selectedFeatures.includes(item.id);
            return (
              <Checkbox
                key={item.id}
                variant="card"
                label={item.label}
                description={item.description}
                checked={isChecked}
                onCheckedChange={(c) => toggleFeature(item.id, c)}
              />
            );
          })}
        </div>
      </section>

      {/* 4. Radio Group & Card Radios */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Radio Groups
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Single-selection controls with custom dot indicators and card variants.
          </p>
        </div>

        {/* Card Radios for Listing Types */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Acquisition Structure (Card Radio)
          </label>
          <RadioGroup value={listingType} onValueChange={setListingType}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {listingTypeOptions.map((opt) => (
                <RadioGroupItem
                  key={opt.value}
                  value={opt.value}
                  variant="card"
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-foreground">{opt.title}</span>
                    </div>
                  }
                  description={
                    <div className="space-y-2 mt-1">
                      <p>{opt.description}</p>
                      <Badge variant={opt.value === "exclusive" ? "gold" : "default"} size="sm">
                        {opt.badge}
                      </Badge>
                    </div>
                  }
                />
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Standard Horizontal Radio List */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Bedroom Configuration
          </label>
          <RadioGroup
            value={selectedBeds}
            onValueChange={setSelectedBeds}
            className="flex flex-wrap gap-6"
          >
            {bedroomOptions.map((b) => (
              <RadioGroupItem
                key={b.value}
                value={b.value}
                label={b.label}
              />
            ))}
          </RadioGroup>
        </div>
      </section>

      {/* 5. Switches & Native Select Dropdowns */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Switches &amp; Selects
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Toggle switches and styled native select dropdowns with custom chevron arrows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Switches Column */}
          <div className="space-y-5 rounded-control bg-surface-secondary/30 p-5 border border-border">
            <h3 className="text-sm font-semibold text-foreground">
              Filter Switches
            </h3>

            <Switch
              label="Turnkey Furnished"
              description="Include designer furniture and curated art collection"
              checked={furnished}
              onCheckedChange={setFurnished}
            />

            <Switch
              label="Verified Buyer Priority"
              description="Only receive vetted bids with verified bank guarantee letters"
              checked={verifiedBuyer}
              onCheckedChange={setVerifiedBuyer}
            />

            <Switch
              label="Direct Ocean Access"
              description="Unrestricted private deepwater dockage"
              disabled
            />
          </div>

          {/* Selects Column */}
          <div className="space-y-4 rounded-control bg-surface-secondary/30 p-5 border border-border">
            <h3 className="text-sm font-semibold text-foreground">
              Custom Animated Selects
            </h3>

            <Select
              label="Property Classification"
              defaultValue="villa"
              options={propertyTypes}
            />

            <Select
              label="Price Bracket"
              defaultValue="10m-20m"
              options={priceRanges}
            />

            <Select
              label="Title Jurisdiction"
              defaultValue=""
              placeholder="Select escrow jurisdiction..."
              error="Jurisdiction must be assigned before contract generation."
            >
              {jurisdictionOptions.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  description={item.description}
                >
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </section>

      {/* 6. Complete Real Estate Inquiry Sandbox */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Integrated Acquisition Request Form
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">Live Form Sandbox</span>
        </div>

        {submitted ? (
          <div className="rounded-control border border-success/30 bg-success/10 p-6 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="h-8 w-8 text-success mx-auto" />
            <h3 className="font-heading text-xl font-bold text-foreground">
              Acquisition Dossier Received
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your confidential inquiry has been routed to our private wealth division.
              Our managing director will contact you within 2 hours.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmitted(false)}
            >
              Reset Sandbox
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Legal Name"
                placeholder="Lord / Lady / Investor Name"
                required
              />
              <Input
                label="Direct Phone / WhatsApp"
                placeholder="+1 (310) 555-0199"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Preferred Property Type"
                defaultValue="penthouse"
                options={propertyTypes}
              />
              <Input
                label="Target Investment Capital"
                prefixText="$"
                suffixText="USD"
                defaultValue="25,000,000"
              />
            </div>

            <Textarea
              label="Specific Spatial or Security Requirements"
              placeholder="e.g. Helipad, staff quarters, bullet-resistant glass, secure art storage..."
              rows={3}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="nda"
                  label="Execute Mutual Non-Disclosure Agreement"
                  defaultChecked
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="md"
                rightIcon={<Send className="h-4 w-4" />}
              >
                Transmit Acquisition Inquiry
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
