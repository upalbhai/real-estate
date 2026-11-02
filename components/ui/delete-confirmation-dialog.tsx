"use client";

import * as React from "react";
import { AlertTriangle, Trash2, X, Loader2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  itemName?: string;
  itemIdentifier?: string;
  requireConfirmationText?: boolean;
  confirmKeyword?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  title = "Confirm Irreversible Deletion",
  description = "This action is permanent and cannot be undone. All associated confidential dossiers, historical comps, and listing asset media will be permanently scrubbed.",
  itemName,
  itemIdentifier,
  requireConfirmationText = false,
  confirmKeyword = "DELETE",
  confirmLabel = "Delete Permanently",
  cancelLabel = "Cancel & Keep",
  variant = "danger",
  onConfirm,
  onCancel,
  isLoading: externalLoading = false,
}: DeleteConfirmationDialogProps) {
  const [internalLoading, setInternalLoading] = React.useState(false);
  const [verificationInput, setVerificationInput] = React.useState("");
  const isLoading = externalLoading || internalLoading;

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !isLoading) {
        onOpenChange(false);
        onCancel?.();
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isLoading, onOpenChange, onCancel]);

  if (!open) return null;

  const isConfirmed = requireConfirmationText
    ? verificationInput.trim().toUpperCase() === confirmKeyword.toUpperCase()
    : true;

  const handleConfirm = async () => {
    if (!isConfirmed || isLoading) return;
    try {
      setInternalLoading(true);
      await onConfirm();
      setVerificationInput("");
      onOpenChange(false);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    setVerificationInput("");
    onOpenChange(false);
    onCancel?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Dialog Surface */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-lg rounded-card border bg-surface p-6 sm:p-7 text-foreground shadow-2xl transition-all z-10 animate-scaleUp my-auto",
          variant === "danger"
            ? "border-error/40 dark:border-error/50 shadow-[0_20px_60px_rgba(239,68,68,0.15)]"
            : "border-brand-gold/40 dark:border-brand-gold/50 shadow-[0_20px_60px_rgba(197,168,120,0.15)]"
        )}
      >
        {/* Top Close Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 z-20 h-7 w-7 p-0 rounded-control text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content Body */}
        <div className="space-y-5">
          {/* Header with Icon Badge */}
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-xs",
                variant === "danger"
                  ? "border-error/30 bg-error/10 text-error"
                  : "border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
              )}
            >
              {variant === "danger" ? (
                <Trash2 className="h-6 w-6" />
              ) : (
                <ShieldAlert className="h-6 w-6" />
              )}
            </div>

            <div className="space-y-1">
              <h3
                id="dialog-title"
                className="font-heading text-xl font-bold tracking-tight text-foreground"
              >
                {title}
              </h3>
              <p
                id="dialog-description"
                className="text-xs text-muted-foreground leading-relaxed"
              >
                {description}
              </p>
            </div>
          </div>

          {/* Item Target Callout Pill */}
          {(itemName || itemIdentifier) && (
            <div className="rounded-control border border-border bg-surface-secondary/50 p-3.5 space-y-1">
              <span className="text-[10px] font-special uppercase tracking-wider text-muted-foreground font-semibold">
                Target Record
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading text-sm font-bold text-foreground truncate">
                  {itemName || "Selected Record"}
                </span>
                {itemIdentifier && (
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold shrink-0">
                    {itemIdentifier}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Type Confirmation Input if Required */}
          {requireConfirmationText && (
            <div className="space-y-2 pt-1">
              <label
                htmlFor="verify-input"
                className="block text-xs font-medium text-foreground"
              >
                To confirm, type{" "}
                <span className="font-mono font-bold text-error bg-error/10 px-1.5 py-0.5 rounded border border-error/20">
                  {confirmKeyword}
                </span>{" "}
                below:
              </label>
              <Input
                id="verify-input"
                type="text"
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                placeholder={`Type ${confirmKeyword} to proceed`}
                disabled={isLoading}
                className={cn(
                  "font-mono text-xs",
                  verificationInput &&
                    (isConfirmed
                      ? "border-success focus:border-success"
                      : "border-error focus:border-error")
                )}
              />
            </div>
          )}

          {/* Fiduciary Warning Box */}
          <div className="flex items-center gap-2 rounded-control bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-[11px] text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>This deletion triggers an immutable audit log entry.</span>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {cancelLabel}
            </Button>

            <Button
              type="button"
              variant={variant === "danger" ? "destructive" : "gold"}
              size="md"
              onClick={handleConfirm}
              disabled={!isConfirmed || isLoading}
              className="w-full sm:w-auto font-bold"
              leftIcon={
                isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )
              }
            >
              {isLoading ? "Executing Deletion..." : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
