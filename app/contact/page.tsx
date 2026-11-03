"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Lock,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand-gold selection:text-brand-charcoal">
      {/* Ambient subtle warm gold & olive lighting accents that blend smoothly in light and dark modes */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-brand-gold/10 blur-[130px] dark:bg-brand-gold/[0.07]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-brand-gold/5 blur-[150px] dark:bg-brand-gold/[0.05]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-40 left-1/4 h-[380px] w-[380px] rounded-full bg-brand-olive/10 blur-[140px] dark:bg-brand-olive/[0.05]"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10 flex-1 py-12 sm:py-16">
        <div className="section-container space-y-12">
          {/* Top Breadcrumb */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact Us", isCurrent: true },
            ]}
            separator="chevron"
            variant="gold"
            size="sm"
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold text-brand-gold backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse shadow-[0_0_8px_var(--color-brand-gold)]" />
              <span className="font-special text-[11px] uppercase tracking-wider">
                Get in Touch
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
              Schedule a{" "}
              <span className="">
                Consultation
              </span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
              Whether you are interested in acquiring an architectural property, listing an existing residence, or speaking with our advisors, we welcome your inquiry.
            </p>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                <span>Confidential Guidance</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground shadow-2xs">
                <Lock className="h-3.5 w-3.5 text-brand-gold" />
                <span>Direct Advisor Representation</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground shadow-2xs">
                <Clock className="h-3.5 w-3.5 text-brand-gold" />
                <span>Prompt Response</span>
              </div>
            </div>
          </motion.div>

          {/* Form & Office Information Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="relative rounded-card border border-border bg-surface shadow-xl p-6 sm:p-9 space-y-6 overflow-hidden">
                {/* Top Gold Metallic Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />

                {submittedData ? (
                  <div className="p-8 text-center space-y-5 animate-fadeIn bg-surface-secondary/50 rounded-control border border-success/30">
                    <div className="h-14 w-14 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        Inquiry Received
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-body">
                        Thank you, <strong className="text-foreground">{submittedData.fullName}</strong>.
                        Your message has been received and our team will get in touch with you shortly.
                      </p>
                    </div>

                    <div className="p-3 rounded-control bg-surface border border-border text-xs font-mono text-muted-foreground max-w-sm mx-auto shadow-2xs">
                      Reference #{submittedData.refId}
                    </div>

                    <Button variant="gold" size="sm" onClick={() => setSubmittedData(null)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div className="flex items-center gap-2 text-xs font-special uppercase text-brand-gold font-semibold tracking-wider">
                        <Lock className="h-4 w-4" />
                        <span>Consultation Request Form</span>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                        <span>Secure Submission</span>
                      </span>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Full Name"
                        placeholder="e.g. Alexander Vance"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="a.vance@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    {/* Phone & Principal Type Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number"
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
                              label="I am a"
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
                              label="Inquiry Type"
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
                              label="Preferred Location"
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
                            label="Price Range"
                            value={field.value ?? "10-20m"}
                            onValueChange={field.onChange}
                            options={heroFilterPriceRanges}
                          />
                        )}
                      />
                    </div>

                    {/* Message Details */}
                    <Textarea
                      label="Message / Property Preferences"
                      placeholder="Share any specific locations, requirements, or questions you have..."
                      rows={4}
                      error={errors.message?.message}
                      {...register("message")}
                    />

                    {/* NDA Request Highlight Box */}
                    <div className="p-4 rounded-control border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-xs">
                      <Controller
                        name="ndaRequested"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            label="Request confidential handling for this inquiry"
                            description="All shared requirements and contact information will be kept strictly private."
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
                        className="w-full justify-center shadow-md hover:shadow-lg font-bold text-sm tracking-wider"
                      >
                        {isSubmitting
                          ? "Sending Message..."
                          : "Submit Request"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right: Direct Desk & Global Hubs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Direct Hotline Card */}
              <div className="relative rounded-card border border-border bg-surface p-6 sm:p-7 space-y-5 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-special text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                      Direct Contact
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/10 px-2 py-0.5 text-[10px] font-mono text-brand-gold border border-brand-gold/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                      Advisors Available
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Direct Assistance
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-body">
                    Speak directly with an advisor regarding property acquisitions, private showings, or listing inquiries.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <a
                    href="tel:+13108809200"
                    className="p-3.5 rounded-control border border-border bg-surface-secondary/40 flex items-center justify-between group hover:border-brand-gold/50 hover:bg-surface-secondary transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-control bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30 group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-special uppercase tracking-wider text-muted-foreground">Telephone (Direct)</div>
                        <div className="font-mono text-sm font-bold text-foreground group-hover:text-brand-gold transition-colors">
                          +1 (310) 880-9200
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="mailto:contact@auraestates.com"
                    className="p-3.5 rounded-control border border-border bg-surface-secondary/40 flex items-center justify-between group hover:border-brand-gold/50 hover:bg-surface-secondary transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-control bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30 group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-special uppercase tracking-wider text-muted-foreground">Email</div>
                        <div className="text-xs font-mono font-bold text-foreground group-hover:text-brand-gold transition-colors">
                          contact@auraestates.com
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-brand-gold shrink-0" />
                  <span className="text-[11px] font-body">Monday through Saturday, 9am - 7pm</span>
                </div>
              </div>

              {/* Global Office Cards */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-special text-[11px] uppercase tracking-wider text-brand-gold font-bold">
                    Office Locations
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    4 Regional Offices
                  </span>
                </div>

                <div className="space-y-3">
                  {globalOffices.map((office) => (
                    <div
                      key={office.city}
                      className="p-4 rounded-control border border-border bg-surface hover:border-brand-gold/50 transition-all duration-200 space-y-2 shadow-xs group hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-base font-bold text-foreground group-hover:text-brand-gold transition-colors">
                          {office.city}
                        </span>
                        <span className="text-[10px] font-mono text-brand-gold border border-brand-gold/30 bg-brand-gold/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Office Location
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-body">
                        {office.address}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span>{office.phone}</span>
                        <span className="text-brand-gold hover:underline cursor-pointer">{office.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
