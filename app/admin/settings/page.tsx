"use client";

import * as React from "react";
import {
  Shield,
  User,
  Bell,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminStore } from "@/store/useAdminStore";

export default function AdminSettingsPage() {
  const { user } = useAdminStore();
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  // Settings states
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(true);
  const [sessionTimeout, setSessionTimeout] = React.useState(true);
  const [watermarkDossiers, setWatermarkDossiers] = React.useState(true);
  const [escrowAlerts, setEscrowAlerts] = React.useState(true);
  const [ndaAlerts, setNdaAlerts] = React.useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Terminal Governance</Badge>
            <span className="text-xs text-muted-foreground font-mono">
              CONFIG://SECURITY-PORTAL
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Portal &amp; Security Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage administrative credentials, cryptographic key policies, and notification routes.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-control bg-success/15 border border-success/30 px-3 py-1.5 text-xs text-success font-semibold animate-fadeIn">
            <CheckCircle2 className="h-4 w-4" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Profile Details */}
        <div className="card-base p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border">
            <User className="h-5 w-5 text-brand-gold" />
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Principal Profile &amp; Authority
              </h2>
              <p className="text-xs text-muted-foreground">
                Official credentials associated with all blockchain ledger transactions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Legal Name"
              defaultValue={user?.name ?? "Alexander Vance"}
            />
            <Input
              label="Official Administrative Email"
              type="email"
              defaultValue={user?.email ?? "a.vance@auraestates.com"}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Fiduciary Title"
              defaultValue={user?.role ?? "Managing Principal"}
            />
            <Input
              label="Security Clearance Tier"
              defaultValue="Level 5 (Sovereign Escrow Clearance)"
              disabled
            />
          </div>
        </div>

        {/* Cryptographic Security & Session Governance */}
        <div className="card-base p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border">
            <Shield className="h-5 w-5 text-brand-gold" />
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Cryptographic Security &amp; Compliance
              </h2>
              <p className="text-xs text-muted-foreground">
                Enforce strict SOC2 and bank-grade authentication rules.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <Switch
              label="Hardware Key Two-Factor Authentication (YubiKey / FIDO2)"
              description="Requires hardware token confirmation for escrow releases and buyer contact disclosures"
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />

            <Switch
              label="Enforce 30-Minute Idle Session Termination"
              description="Terminates background sessions when unattended on non-fiduciary networks"
              checked={sessionTimeout}
              onCheckedChange={setSessionTimeout}
            />

            <Switch
              label="Dynamic Digital Watermarking on Exported Prospectuses"
              description="Embeds viewer IP, timestamp, and investor hash into all generated PDF portfolios"
              checked={watermarkDossiers}
              onCheckedChange={setWatermarkDossiers}
            />
          </div>
        </div>

        {/* Operational Notifications */}
        <div className="card-base p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border">
            <Bell className="h-5 w-5 text-brand-gold" />
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Fiduciary Alert Routing
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure immediate dispatches for high-priority pipeline events.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <Switch
              label="Instant Escrow Wire Transfer Notifications"
              description="Dispatch priority encrypted SMS upon confirmation of 10% acquisition deposits"
              checked={escrowAlerts}
              onCheckedChange={setEscrowAlerts}
            />

            <Switch
              label="Confidential NDA Execution Confirmations"
              description="Alert managing director when accredited family offices execute mutual agreements"
              checked={ndaAlerts}
              onCheckedChange={setNdaAlerts}
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button
              type="submit"
              variant="gold"
              size="md"
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Operational Preferences
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
