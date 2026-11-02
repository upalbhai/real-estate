export interface SampleDeletionItem {
  id: string;
  code: string;
  title: string;
  location: string;
  price: string;
  status: string;
}

export const sampleDeletionItems: SampleDeletionItem[] = [
  {
    id: "prop-101",
    code: "AE-BH-90210",
    title: "The Bel-Air Modernist Sanctuary",
    location: "Bel Air, Los Angeles, CA",
    price: "$48,500,000",
    status: "Private Vault",
  },
  {
    id: "prop-102",
    code: "AE-NYC-10013",
    title: "Tribeca Cast-Iron Sky Penthouse VII",
    location: "Tribeca, New York, NY",
    price: "$34,000,000",
    status: "Exclusive",
  },
  {
    id: "prop-103",
    code: "AE-MIA-33139",
    title: "Biscayne Bay Star Island Compound",
    location: "Star Island, Miami Beach, FL",
    price: "$62,000,000",
    status: "Under Contract",
  },
];

export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultVal: string;
  description: string;
}

export const deleteDialogPropsDocs: ComponentPropDoc[] = [
  {
    name: "open",
    type: "boolean",
    defaultVal: "required",
    description: "Controls whether the dialog modal is visible.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultVal: "required",
    description: "Callback invoked when modal opens, closes, or is dismissed.",
  },
  {
    name: "title",
    type: "string",
    defaultVal: "'Confirm Irreversible Deletion'",
    description: "Header title displayed at the top of the dialog.",
  },
  {
    name: "description",
    type: "string",
    defaultVal: "Default warning text",
    description: "Detailed explanatory warning about the irreversible nature of the action.",
  },
  {
    name: "itemName",
    type: "string",
    defaultVal: "undefined",
    description: "Name of the entity being deleted (e.g. property title, lead name).",
  },
  {
    name: "itemIdentifier",
    type: "string",
    defaultVal: "undefined",
    description: "Monospace SKU or reference code (e.g. 'AE-BH-90210').",
  },
  {
    name: "requireConfirmationText",
    type: "boolean",
    defaultVal: "false",
    description: "If true, enforces that the user types a specific keyword (e.g. 'DELETE') to enable confirmation.",
  },
  {
    name: "confirmKeyword",
    type: "string",
    defaultVal: "'DELETE'",
    description: "Exact case-insensitive keyword the user must type to proceed.",
  },
  {
    name: "confirmLabel",
    type: "string",
    defaultVal: "'Delete Permanently'",
    description: "Button text for the primary destructive action.",
  },
  {
    name: "cancelLabel",
    type: "string",
    defaultVal: "'Cancel & Keep'",
    description: "Button text for dismissing the dialog safely.",
  },
  {
    name: "variant",
    type: "'danger' | 'warning'",
    defaultVal: "'danger'",
    description: "Color scheme variant: danger (red glow) or warning (gold/amber).",
  },
  {
    name: "onConfirm",
    type: "() => Promise<void> | void",
    defaultVal: "required",
    description: "Async or synchronous deletion handler executed upon user confirmation.",
  },
];

export interface CodeUsageSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const dialogUsageSnippets: CodeUsageSnippet[] = [
  {
    id: "basic-delete",
    title: "1. Quick Delete Confirmation Dialog",
    description: "Standard destructive dialog with auto-close, async state, and custom item callout.",
    code: `import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { Trash2 } from "lucide-react";

export function PropertyDeleteAction({ property }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    // Call your API or state action
    await api.properties.delete(property.id);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        leftIcon={<Trash2 className="h-4 w-4" />}
        onClick={() => setOpen(true)}
      >
        Delete Dossier
      </Button>

      <DeleteConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Property Dossier"
        itemName={property.title}
        itemIdentifier={property.code}
        onConfirm={handleDelete}
      />
    </>
  );
}`,
  },
  {
    id: "strict-delete",
    title: "2. Strict Deletion with Typed Verification",
    description: "Requires the user to explicitly type 'DELETE' or a custom keyword before the action is unlocked.",
    code: `import { useState } from "react";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

export function StrictAssetScrubModal({ asset, open, setOpen }) {
  const handlePermanentPurge = async () => {
    await archiveAndScrubListing(asset.id);
  };

  return (
    <DeleteConfirmationDialog
      open={open}
      onOpenChange={setOpen}
      title="Scrub Off-Market Acquisition"
      description="All high-resolution architectural assets and bilateral non-disclosure history will be purged."
      itemName={asset.name}
      itemIdentifier={asset.sku}
      requireConfirmationText={true}
      confirmKeyword="DELETE"
      confirmLabel="Confirm Permanent Scrub"
      cancelLabel="Abort & Return"
      variant="danger"
      onConfirm={handlePermanentPurge}
    />
  );
}`,
  },
  {
    id: "compound-dialog",
    title: "3. Compound Modal Primitive Usage",
    description: "Building custom interactive modals (e.g. Offer signing, NDA agreements) with the primitive Dialog compound components.",
    code: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CustomOfferModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="gold">Submit Private Offer</Button>
      </DialogTrigger>

      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Bilateral Purchase Agreement</DialogTitle>
          <DialogDescription>
            Enter your earnest escrow deposit amount and escrow agent bank.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-3">
          {/* Custom form fields go here */}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DialogClose>
          <Button variant="gold">Authorize Escrow Wire</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
  },
];

