"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Lock,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MotionFadeIn,
  MotionSlideIn,
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/ui/motion";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/schemas/contact.schema";
import {
  globalOffices,
  contactPrincipalTypes,
  contactInquiryTypes,
  heroFilterLocations,
  heroFilterPriceRanges,
} from "@/data";

interface SubmittedPayload extends ContactFormValues {
  refId: string;
}

let counter = 849200;
function getNextReferenceId(): string {
  counter += 1;
  return `CONF-${counter}`;
}

export default function ContactPage() {
  const [submittedData, setSubmittedData] = React.useState<SubmittedPayload | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      principalType: "individual",
      inquiryType: "acquisition",
      preferredTerritory: "beverly-hills",
      budgetTier: "10-20m",
      message: "",
      ndaRequested: true,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Simulate discrete async transmission
    await new Promise((resolve) => setTimeout(resolve, 800));
    const refId = getNextReferenceId();
    setSubmittedData({ ...values, refId });
    reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="section-container space-y-12">
          {/* Header */}
          <MotionFadeIn>
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="gold">Private Advisory Desk</Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  CONFIDENTIAL ENGAGEMENT PROTOCOL
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Confidential Client Consultation
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Every inquiry is reviewed directly by our senior equity partners under institutional
                non-disclosure standards. Please indicate your engagement parameters below.
              </p>
            </div>
          </MotionFadeIn>

          {/* Form & Office Information Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Form */}
            <MotionSlideIn direction="left" distance={30} className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-card border border-border bg-surface shadow-md space-y-6">
                {submittedData ? (
                  <div className="p-8 text-center space-y-5 animate-fadeIn bg-surface-secondary/30 rounded-control border border-success/30">
                    <div className="h-14 w-14 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        Inquiry Received &amp; Encrypted
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-foreground">{submittedData.fullName}</strong>.
                        Your confidential brief has been assigned to a senior managing partner.
                        A secure communication will follow within four business hours.
                      </p>
                    </div>

                    <div className="p-3 rounded-control bg-surface border border-border text-xs font-mono text-muted-foreground max-w-sm mx-auto">
                      Reference ID: #{submittedData.refId} • NDA:{" "}
                      {submittedData.ndaRequested ? "Active" : "Standard"}
                    </div>

                    <Button variant="gold" size="sm" onClick={() => setSubmittedData(null)}>
                      Submit Another Brief
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-border text-xs font-special uppercase text-brand-gold font-semibold">
                      <Lock className="h-4 w-4" />
                      <span>Confidential Engagement Form</span>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Principal / Entity Name"
                        placeholder="e.g. Alexander Vance"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                      />

                      <Input
                        label="Direct Corporate / Private Email"
                        type="email"
                        placeholder="a.vance@familyoffice.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    {/* Phone & Principal Type Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Direct Telephone (with Country Code)"
                        placeholder="+1 (310) 555-0199"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />

                      <div>
                        <Controller
                          name="principalType"
                          control={control}
                          render={({ field }) => (
                            <Select
                              label="Principal Classification"
                              value={field.value}
                              onValueChange={field.onChange}
                              options={contactPrincipalTypes}
                              error={errors.principalType?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Inquiry Type & Territory Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Controller
                          name="inquiryType"
                          control={control}
                          render={({ field }) => (
                            <Select
                              label="Engagement Category"
                              value={field.value}
                              onValueChange={field.onChange}
                              options={contactInquiryTypes}
                              error={errors.inquiryType?.message}
                            />
                          )}
                        />
                      </div>

                      <div>
                        <Controller
                          name="preferredTerritory"
                          control={control}
                          render={({ field }) => (
                            <Select
                              label="Target Market Territory"
                              value={field.value ?? "beverly-hills"}
                              onValueChange={field.onChange}
                              options={heroFilterLocations}
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Budget Tier */}
                    <div>
                      <Controller
                        name="budgetTier"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Target Valuation Tier"
                            value={field.value ?? "10-20m"}
                            onValueChange={field.onChange}
                            options={heroFilterPriceRanges}
                          />
                        )}
                      />
                    </div>

                    {/* Message Details */}
                    <Textarea
                      label="Confidential Brief &amp; Architectural Specifications"
                      placeholder="Outline specific property parameters, privacy criteria, off-market targets, or preferred closing timeline..."
                      rows={4}
                      error={errors.message?.message}
                      {...register("message")}
                    />

                    {/* NDA Request Checkbox */}
                    <div className="pt-1">
                      <Controller
                        name="ndaRequested"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            label="Require Bilateral Non-Disclosure Agreement (NDA) prior to detailed disclosures"
                            description="Our legal desk will transmit our institutional mutual NDA for digital execution."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        isLoading={isSubmitting}
                        rightIcon={<ArrowRight className="h-4 w-4" />}
                        className="w-full justify-center"
                      >
                        {isSubmitting
                          ? "Encrypting & Transmitting..."
                          : "Transmit Confidential Brief"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </MotionSlideIn>

            {/* Right: Direct Desk & Global Hubs */}
            <MotionSlideIn direction="right" distance={30} delay={0.1} className="lg:col-span-5 space-y-6">
              {/* Direct Hotline Card */}
              <div className="p-6 rounded-card border border-border bg-surface-secondary/40 space-y-4">
                <div className="space-y-1">
                  <span className="font-special text-[10px] uppercase tracking-wider text-brand-gold font-semibold">
                    Direct Partner Desk
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Immediate Fiduciary Hotline
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For urgent off-market acquisitions or time-sensitive escrows, contact our managing partner desk directly.
                  </p>
                </div>

                <div className="p-4 rounded-control bg-surface border border-border space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-brand-gold shrink-0" />
                    <span className="font-mono text-sm font-bold text-foreground">
                      +1 (310) 880-9200
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-brand-gold shrink-0" />
                    <span className="text-xs text-brand-gold hover:underline cursor-pointer">
                      desk@auraestates.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>24/7 Monitoring for Institutional Clients</span>
                  </div>
                </div>
              </div>

              {/* Global Office Cards */}
              <div className="space-y-3">
                <span className="font-special text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Global Physical Presence
                </span>

                <MotionStaggerContainer staggerDelay={0.08} className="space-y-2.5">
                  {globalOffices.map((office) => (
                    <MotionStaggerItem key={office.city}>
                      <div className="p-3.5 rounded-control border border-border bg-surface text-xs space-y-1 hover:border-brand-gold/40 transition-colors">
                        <div className="flex items-center justify-between font-semibold text-foreground">
                          <span>{office.city}</span>
                          <span className="text-[10px] font-mono text-brand-gold">Hub</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                          {office.address}
                        </p>
                      </div>
                    </MotionStaggerItem>
                  ))}
                </MotionStaggerContainer>
              </div>
            </MotionSlideIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
