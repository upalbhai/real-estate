import { z } from "zod";

export const adminLeadUpdateSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum([
    "new_inquiry",
    "nda_pending",
    "nda_verified",
    "private_viewing",
    "offer_submitted",
    "in_escrow",
    "closed",
  ]),
  priority: z.enum(["high", "medium", "standard"]),
  privateNotes: z.string().optional(),
});

export type AdminLeadUpdateFormValues = z.infer<typeof adminLeadUpdateSchema>;
