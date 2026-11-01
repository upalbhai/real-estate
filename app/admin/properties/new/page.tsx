"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
  MapPin,
  Layers,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AsyncSelect, { Option } from "@/components/ui/async-select";
import {
  adminPropertySchema,
  AdminPropertyFormValues,
} from "@/schemas/admin-property.schema";
import {
  propertyTypes,
  initialAmenities,
} from "@/data";

export default function AdminNewPropertyPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedSuccess, setSubmittedSuccess] = React.useState(false);
  const [selectedAmenities, setSelectedAmenities] = React.useState<Option | Option[] | null>([
    initialAmenities[1],
    initialAmenities[2],
  ]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AdminPropertyFormValues>({
    resolver: zodResolver(adminPropertySchema),
    defaultValues: {
      title: "",
      code: "EST-895",
      type: "villa",
      status: "available",
      price: 18500000,
      location: "Beverly Hills, CA",
      bedrooms: 5,
      bathrooms: 7,
      areaSqft: 8500,
      lotSize: "0.85 Acres",
      yearBuilt: 2025,
      description: "",
      assignedAgent: "Elena Rostova",
      isPrivateListing: false,
      verifiedEscrowReady: true,
      amenities: ["am-2", "am-3"],
    },
  });

  const onSubmit = async (_values: AdminPropertyFormValues) => {
    setIsSubmitting(true);
    // Simulate ledger commit
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmittedSuccess(true);
  };

  const handleAutofillSample = () => {
    setValue("title", "The Solarium Residence", { shouldValidate: true });
    setValue("code", "EST-890", { shouldValidate: true });
    setValue("type", "villa", { shouldValidate: true });
    setValue("status", "featured", { shouldValidate: true });
    setValue("price", 22500000, { shouldValidate: true });
    setValue("location", "Carbon Beach, Malibu, CA", { shouldValidate: true });
    setValue("bedrooms", 6, { shouldValidate: true });
    setValue("bathrooms", 8, { shouldValidate: true });
    setValue("areaSqft", 10200, { shouldValidate: true });
    setValue("lotSize", "1.1 Acres Waterfront", { shouldValidate: true });
    setValue("yearBuilt", 2026, { shouldValidate: true });
    setValue(
      "description",
      "Striking organic modernist coastal compound designed by Olson Kundig, featuring 120 feet of private deepwater shoreline and solar cantilever architecture.",
      { shouldValidate: true }
    );
    setValue("assignedAgent", "Elena Rostova", { shouldValidate: true });
    setValue("isPrivateListing", true, { shouldValidate: true });
  };

  // Amenities Async Loader
  const loadAmenities = async ({ search = "" }: { search?: string }) => {
    await new Promise((res) => setTimeout(res, 200));
    const filtered = initialAmenities.filter((a) =>
      String(a.name).toLowerCase().includes(search.toLowerCase())
    );
    return { data: filtered };
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-1">
          <Link
            href="/admin/properties"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Properties Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="gold">Architectural Dossier</Badge>
            <span className="text-xs text-muted-foreground font-mono">
              FORM://ESTATE-CREATE
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Deploy New Estate Prospectus
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete the fiduciary asset specifications to publish to the private investment catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<Sparkles className="h-3.5 w-3.5 text-brand-gold" />}
            onClick={handleAutofillSample}
          >
            Autofill Sample Villa
          </Button>
        </div>
      </div>

      {submittedSuccess ? (
        <div className="card-base p-10 text-center space-y-5 animate-fadeIn border-brand-gold/40">
          <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Estate Prospectus Published Successfully
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              The asset record has been committed to the private fiduciary ledger and is now visible to vetted investors.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <Link href="/admin/properties">
              <Button variant="gold" size="md">
                Return to Portfolio
              </Button>
            </Link>
            <Button
              variant="outline"
              size="md"
              onClick={() => setSubmittedSuccess(false)}
            >
              Create Another Estate
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Core Identity & Pricing */}
          <div className="card-base p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border">
              <Building2 className="h-5 w-5 text-brand-gold" />
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  1. Core Identity &amp; Valuation
                </h2>
                <p className="text-xs text-muted-foreground">
                  Asset naming, classification, and target acquisition pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <Input
                  label="Architectural Estate Title"
                  placeholder="e.g. The Glasshouse Sanctuary"
                  required
                  error={errors.title?.message}
                  {...register("title")}
                />
              </div>

              <div>
                <Input
                  label="Asset Code"
                  placeholder="EST-801"
                  required
                  error={errors.code?.message}
                  {...register("code")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Property Classification"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={propertyTypes}
                  />
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Listing Status"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "available", label: "Available for Acquisition" },
                      { value: "featured", label: "Featured Trophy Asset" },
                      { value: "pending", label: "Under Contract / Escrow" },
                      { value: "sold", label: "Conveyed & Closed" },
                      { value: "exclusive", label: "Confidential Off-Market" },
                    ]}
                  />
                )}
              />

              <div>
                <Input
                  label="Target Valuation"
                  type="number"
                  prefixText="$"
                  suffixText="USD"
                  required
                  error={errors.price?.message}
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Spatial & Physical Specifications */}
          <div className="card-base p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border">
              <Layers className="h-5 w-5 text-brand-gold" />
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  2. Spatial &amp; Physical Specifications
                </h2>
                <p className="text-xs text-muted-foreground">
                  Dimensions, bed/bath composition, and community location.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Community / Territory Location"
                placeholder="Beverly Hills, CA"
                leftIcon={<MapPin className="h-4 w-4" />}
                required
                error={errors.location?.message}
                {...register("location")}
              />

              <Input
                label="Total Interior Living Area"
                type="number"
                suffixText="sq ft"
                required
                error={errors.areaSqft?.message}
                {...register("areaSqft", { valueAsNumber: true })}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <Input
                label="Bedrooms"
                type="number"
                error={errors.bedrooms?.message}
                {...register("bedrooms", { valueAsNumber: true })}
              />

              <Input
                label="Bathrooms"
                type="number"
                error={errors.bathrooms?.message}
                {...register("bathrooms", { valueAsNumber: true })}
              />

              <Input
                label="Lot Area / Grounds"
                placeholder="0.75 AC"
                {...register("lotSize")}
              />

              <Input
                label="Year Constructed"
                type="number"
                placeholder="2025"
                {...register("yearBuilt", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Verified Luxury Amenities &amp; Features
              </label>
              <AsyncSelect
                value={selectedAmenities}
                onChange={setSelectedAmenities}
                loadOptions={loadAmenities}
                multi
                placeholder="Search amenities (Infinity Pool, Helipad, Wine Vault)..."
                labelKey="name"
                idKey="id"
              />
            </div>

            <Textarea
              label="Architectural Narrative & Executive Summary"
              placeholder="Detail the materials, design philosophy, security wings, panoramic sightlines, and smart-estate infrastructure..."
              rows={4}
              required
              error={errors.description?.message}
              {...register("description")}
            />
          </div>

          {/* Section 3: Governance, Fiduciary & Compliance */}
          <div className="card-base p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border">
              <Shield className="h-5 w-5 text-brand-gold" />
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  3. Fiduciary Governance &amp; Escrow
                </h2>
                <p className="text-xs text-muted-foreground">
                  Lead advisory assignment, confidentiality tiers, and verification.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Controller
                name="assignedAgent"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Assigned Lead Director"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "Elena Rostova", label: "Elena Rostova (Senior Partner)" },
                      { value: "Marcus Vance", label: "Marcus Vance (Managing Director)" },
                      { value: "Sofia Sterling", label: "Sofia Sterling (Private Wealth Advisor)" },
                      { value: "Alexander Vance", label: "Alexander Vance (Principal)" },
                    ]}
                  />
                )}
              />

              <div className="space-y-4 pt-1">
                <Controller
                  name="isPrivateListing"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      label="Confidential Off-Market Listing"
                      description="Requires verified NDA before prospectus and address disclosure"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  name="verifiedEscrowReady"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      label="Escrow Wire Guarantee Ready"
                      description="Pre-verified title insurance and sovereign trust transfer documentation"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Checkbox
                id="auditAgreement"
                label="I certify all architectural metrics and deeds are verified accurate under penalty of fiduciary censure."
                defaultChecked
              />

              <div className="flex items-center gap-3">
                <Link href="/admin/properties">
                  <Button type="button" variant="secondary" size="md">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  isLoading={isSubmitting}
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  Publish Estate Dossier
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
