"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { adminLoginSchema, AdminLoginFormValues } from "@/schemas/admin-auth.schema";
import { adminDemoAccounts, AdminDemoAccount } from "@/data";
import { useAdminStore } from "@/store/useAdminStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "a.vance@auraestates.com",
      password: "securepassword",
      rememberMe: true,
    },
  });

  const onSubmit = async (values: AdminLoginFormValues) => {
    setIsLoading(true);
    // Simulate private encryption handshake
    await new Promise((resolve) => setTimeout(resolve, 800));
    login(values.email, "Managing Principal", "Alexander Vance");
    setIsLoading(false);
    router.push("/admin");
  };

  const handleFillDemo = (account: AdminDemoAccount) => {
    setValue("email", account.email, { shouldValidate: true });
    setValue("password", "supersecurekey123", { shouldValidate: true });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground">
      {/* Left Column: Visual Architectural Showcase */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-primary text-primary-foreground">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
            alt="Aura Estates Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        </div>

        {/* Top Branding Crest */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-control bg-brand-gold text-brand-charcoal shadow-md">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                AURA ESTATES
              </span>
              <span className="ml-2 rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-special font-semibold uppercase tracking-widest text-brand-gold">
                PRIVATE OPERATIONS
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Public Site</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Bottom Hero Pitch */}
        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/15 px-3 py-1 text-xs font-semibold text-brand-gold backdrop-blur-xs">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Encrypted Portfolio Governance</span>
          </div>

          <h2 className="font-heading text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Global Asset Operations for Premier Brokerages.
          </h2>

          <p className="text-sm xl:text-base text-white/80 leading-relaxed font-body">
            Direct access to private off-market listings, institutional buyer escrows,
            and fiduciary transaction management.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs text-white/60 font-mono">
            <span>AUDIT: SOC2 COMPLIANT</span>
            <span>•</span>
            <span>256-BIT TLS HANDSHAKE</span>
          </div>
        </div>
      </div>

      {/* Right Column: Portal Sign-In Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-24 bg-surface">
        {/* Top Header Utilities */}
        <div className="flex items-center justify-between">
          <div className="flex lg:hidden items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-control bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5 text-brand-gold" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              AURA PORTAL
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle variant="icon" />
          </div>
        </div>

        {/* Center Card */}
        <div className="max-w-md w-full mx-auto my-auto py-8 space-y-8 animate-fadeIn">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Executive Terminal</Badge>
              <span className="text-xs text-muted-foreground font-mono">
                AUTH://SECURE-GATEWAY
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Portal Authentication
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter authorized fiduciaries credentials to access the central asset ledger.
            </p>
          </div>

          {/* Form with React Hook Form & Zod */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Administrative Email"
              type="email"
              placeholder="director@auraestates.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="space-y-1.5">
              <Input
                label="Security Key / Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter authorized key"
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label="Toggle password view"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <Checkbox
                id="rememberMe"
                label="Remember terminal session"
                defaultChecked
                onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
              />
              <button
                type="button"
                onClick={() => alert("Please contact corporate security to reset hardware keys.")}
                className="text-xs text-brand-gold hover:underline font-medium"
              >
                Reset hardware key?
              </button>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Authenticate &amp; Enter Portal
            </Button>
          </form>

          {/* Demo One-Click Fill Options */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 font-special uppercase tracking-wider">
                <KeyRound className="h-3.5 w-3.5 text-brand-gold" />
                <span>Demo Executive Profiles</span>
              </span>
              <span className="text-[11px] text-muted-foreground">Click to Autofill</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {adminDemoAccounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => handleFillDemo(account)}
                  className="w-full text-left rounded-control border border-border bg-surface-secondary/40 p-3 hover:border-brand-gold/50 hover:bg-surface-secondary transition-all group flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground group-hover:text-brand-gold transition-colors">
                        {account.name}
                      </span>
                      <Badge variant="outline" size="sm">
                        {account.badge}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {account.role} • {account.email}
                    </p>
                  </div>
                  <Sparkles className="h-4 w-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          <p>© 2026 Aura Estates Capital Group. All fiduciaries transactions logged &amp; encrypted.</p>
        </div>
      </div>
    </div>
  );
}

