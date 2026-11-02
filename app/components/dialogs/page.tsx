"use client";

import * as React from "react";
import {
  Trash2,
  FileCheck2,
  Copy,
  Check,
  AlertTriangle,
  Code2,
  Building2,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  sampleDeletionItems,
  deleteDialogPropsDocs,
  dialogUsageSnippets,
  SampleDeletionItem,
} from "@/data";

export default function DialogsShowcasePage() {
  // Live Playground State - Delete Dialog
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<SampleDeletionItem>(
    sampleDeletionItems[0]
  );
  const [requireText, setRequireText] = React.useState(true);
  const [dialogVariant, setDialogVariant] = React.useState<"danger" | "warning">("danger");
  const [deletionStatus, setDeletionStatus] = React.useState<string | null>(null);

  // Live Playground State - Offer Modal
  const [offerDeposit, setOfferDeposit] = React.useState("5,000,000");
  const [offerBank, setOfferBank] = React.useState("J.P. Morgan Private Bank");
  const [offerSuccess, setOfferSuccess] = React.useState(false);

  // Code Tab state
  const [activeSnippetId, setActiveSnippetId] = React.useState(
    dialogUsageSnippets[0].id
  );
  const [copiedSnippetId, setCopiedSnippetId] = React.useState<string | null>(null);

  const activeSnippet =
    dialogUsageSnippets.find((s) => s.id === activeSnippetId) ||
    dialogUsageSnippets[0];

  const handleCopyCode = (snippetId: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedSnippetId(snippetId);
    setTimeout(() => setCopiedSnippetId(null), 2500);
  };

  const handleSimulateDelete = async () => {
    // Simulate real-world network / database latency
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setDeletionStatus(
      `✓ Dossier ${selectedItem.code} (${selectedItem.title}) was permanently scrubbed.`
    );
    setTimeout(() => setDeletionStatus(null), 6000);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">Interactive Component</Badge>
          <Badge variant="exclusive">Fiduciary UX</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/delete-confirmation-dialog
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Dialogs &amp; Confirmation Modals
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl font-body leading-relaxed">
          Mission-critical confirmation dialogues built for irreversible operations, bilateral contract signatures, and confidential client agreements. Features typed keyword safeguards, full keyboard accessibility, and dual-theme styling.
        </p>
      </div>

      {/* 1. Live Interactive Delete Confirmation Demo */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-error" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Delete Confirmation Dialog Playground
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Test live modal triggers with dynamic item parameters, verification safeguards, and async deletion simulation.
            </p>
          </div>
          <Badge variant={dialogVariant === "danger" ? "destructive" : "gold"}>
            {dialogVariant === "danger" ? "Destructive Mode" : "Warning Mode"}
          </Badge>
        </div>

        {/* Status notification toast banner */}
        {deletionStatus && (
          <div className="p-3.5 rounded-control bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono flex items-center justify-between animate-fadeIn">
            <span>{deletionStatus}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeletionStatus(null)}
              className="h-6 px-2 text-xs"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Playground Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* Left Column: Config Panel */}
          <div className="lg:col-span-5 space-y-4 rounded-control border border-border bg-surface-secondary/30 p-4">
            <span className="text-[11px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
              Dialog Configuration
            </span>

            {/* Select Target Property */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Select Target Record:
              </label>
              <div className="space-y-1.5">
                {sampleDeletionItems.map((item) => (
                  <Button
                    key={item.id}
                    type="button"
                    variant="ghost"
                    onClick={() => setSelectedItem(item)}
                    className={cn(
                      "w-full text-left p-2.5 rounded-control border text-xs transition-all flex items-center justify-between h-auto",
                      selectedItem.id === item.id
                        ? "border-brand-gold bg-surface font-semibold shadow-xs"
                        : "border-border bg-surface/50 text-muted-foreground hover:bg-surface"
                    )}
                  >
                    <div className="truncate">
                      <div className="text-foreground truncate">{item.title}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {item.code} • {item.price}
                      </div>
                    </div>
                    {selectedItem.id === item.id && (
                      <span className="h-2 w-2 rounded-full bg-brand-gold shrink-0" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Options Checkbox */}
            <div className="pt-2 border-t border-border space-y-3">
              <Checkbox
                checked={requireText}
                onCheckedChange={(checked) => setRequireText(!!checked)}
                label="Enforce Typed 'DELETE' Keyword"
                description="User must type DELETE to unlock confirmation button"
              />

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-muted-foreground font-medium">Style Theme:</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    size="xs"
                    variant={dialogVariant === "danger" ? "destructive" : "outline"}
                    onClick={() => setDialogVariant("danger")}
                    className={cn(
                      "px-2.5 py-1 rounded-control text-xs font-mono h-auto",
                      dialogVariant === "danger"
                        ? "bg-error text-white font-bold hover:bg-error/90"
                        : "text-muted-foreground"
                    )}
                  >
                    Danger (Red)
                  </Button>
                  <Button
                    type="button"
                    size="xs"
                    variant={dialogVariant === "warning" ? "gold" : "outline"}
                    onClick={() => setDialogVariant("warning")}
                    className={cn(
                      "px-2.5 py-1 rounded-control text-xs font-mono h-auto",
                      dialogVariant === "warning"
                        ? "bg-brand-gold text-brand-charcoal font-bold hover:bg-brand-gold/90"
                        : "text-muted-foreground"
                    )}
                  >
                    Warning (Gold)
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trigger Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-control border border-border bg-surface text-center space-y-6">
            <div className="space-y-2 max-w-md mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error/10 text-error border border-error/20 mx-auto shadow-xs">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Targeted: {selectedItem.title}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                {selectedItem.code} • {selectedItem.location} • {selectedItem.price}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Clicking the button below launches the modal overlay. Try dismissing via Escape, backdrop click, or executing deletion.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant={dialogVariant === "danger" ? "destructive" : "gold"}
                size="lg"
                onClick={() => setDeleteOpen(true)}
                leftIcon={<Trash2 className="h-4 w-4" />}
                className="w-full sm:w-auto font-bold shadow-md"
              >
                Launch Delete Confirmation
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog Instance */}
        <DeleteConfirmationDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Delete Property Dossier"
          description="You are about to permanently purge this asset from the active registry. All private off-market dossiers, comps, and client links will be revoked."
          itemName={selectedItem.title}
          itemIdentifier={selectedItem.code}
          requireConfirmationText={requireText}
          confirmKeyword="DELETE"
          confirmLabel="Execute Permanent Deletion"
          cancelLabel="Cancel & Protect"
          variant={dialogVariant}
          onConfirm={handleSimulateDelete}
        />
      </section>

      {/* 2. Compound Dialog Modal: Offer & Purchase Agreement */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Compound Modal: Bilateral Purchase Agreement
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Custom compound dialog built with primitives: Dialog, Header, Body form fields, and Action Footer.
            </p>
          </div>
          <Badge variant="available">Custom Compound Dialog</Badge>
        </div>

        {offerSuccess && (
          <div className="p-3.5 rounded-control bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-mono flex items-center justify-between">
            <span>✓ Offer agreement submitted with \${offerDeposit} earnest escrow deposit.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOfferSuccess(false)}
              className="h-6 px-2 text-xs"
            >
              Reset
            </Button>
          </div>
        )}

        <div className="rounded-control border border-border bg-surface-secondary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-heading text-base font-bold text-foreground">
              Formal Acquisition Proposal
            </span>
            <p className="text-xs text-muted-foreground">
              Demonstrates compound primitive usage for multi-step financial disclosures and contracts.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="gold"
                size="md"
                leftIcon={<FileCheck2 className="h-4 w-4" />}
                className="font-bold shrink-0"
              >
                Open Acquisition Modal
              </Button>
            </DialogTrigger>

            <DialogContent size="md">
              <DialogHeader>
                <div className="flex items-center gap-2 text-brand-gold text-xs font-special font-semibold uppercase tracking-wider">
                  <Building2 className="h-4 w-4" />
                  <span>Escrow Authorization Protocol</span>
                </div>
                <DialogTitle className="mt-1">
                  Submit Bilateral Purchase Offer
                </DialogTitle>
                <DialogDescription>
                  Review acquisition terms for {selectedItem.title}. Earnest deposit funds are held under institutional title clearance.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Earnest Deposit Amount (USD)
                  </label>
                  <Input
                    value={offerDeposit}
                    onChange={(e) => setOfferDeposit(e.target.value)}
                    placeholder="Enter deposit amount"
                    prefix="$"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Escrow Trust Institution
                  </label>
                  <Input
                    value={offerBank}
                    onChange={(e) => setOfferBank(e.target.value)}
                    placeholder="Escrow bank"
                  />
                </div>

                <div className="p-3 rounded-control bg-surface-secondary border border-border text-[11px] text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-brand-gold shrink-0" />
                  <span>Submitting triggers direct bilateral NDA verification with equity partners.</span>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="md">
                    Dismiss
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => {
                      setOfferSuccess(true);
                      setTimeout(() => setOfferSuccess(false), 6000);
                    }}
                    className="font-bold"
                  >
                    Authorize Escrow Deposit
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 3. Developer Code Usage Guide with Interactive Tabs */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                How to Use in Your Pages &amp; Features
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Copy-paste ready snippets for quick implementation in property listings, CRM admin dashboards, and custom modals.
            </p>
          </div>
          <Badge variant="gold">Copyable Snippets</Badge>
        </div>

        {/* Snippet Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {dialogUsageSnippets.map((snippet) => (
            <Button
              key={snippet.id}
              type="button"
              variant={activeSnippetId === snippet.id ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveSnippetId(snippet.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-control text-xs font-mono font-medium h-auto",
                activeSnippetId === snippet.id
                  ? "shadow-xs font-bold"
                  : "bg-surface-secondary/40 text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
              )}
            >
              {snippet.title}
            </Button>
          ))}
        </div>

        {/* Active Snippet Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{activeSnippet.description}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleCopyCode(activeSnippet.id, activeSnippet.code)
              }
              leftIcon={
                copiedSnippetId === activeSnippet.id ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )
              }
              className="font-mono text-xs"
            >
              {copiedSnippetId === activeSnippet.id ? "Copied!" : "Copy Code"}
            </Button>
          </div>

          <div className="relative rounded-card border border-border bg-[#141712] p-5 overflow-x-auto text-xs font-mono text-gray-200 shadow-md">
            <pre className="leading-relaxed">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Props API Reference Table */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-bold text-foreground">
            DeleteConfirmationDialog Props API Reference
          </h2>
          <p className="text-xs text-muted-foreground">
            Comprehensive TypeScript interface definitions and default parameter values.
          </p>
        </div>

        <div className="overflow-x-auto rounded-control border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-special uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-3 px-4">Prop</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Default</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-body">
              {deleteDialogPropsDocs.map((row) => (
                <tr key={row.name} className="hover:bg-surface-secondary/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-brand-gold">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-muted-foreground">
                    {row.type}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">
                    {row.defaultVal}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground leading-relaxed">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
