import { z } from "zod";

export const adminPropertySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Property title must be at least 3 characters" })
    .max(120, { message: "Title cannot exceed 120 characters" }),
  code: z
    .string()
    .min(3, { message: "Asset code is required (e.g. EST-900)" }),
  type: z.string().min(1, { message: "Please select a property classification" }),
  status: z.enum(["available", "featured", "pending", "sold", "exclusive"], {
    error: "Select a valid status",
  }),
  price: z
    .number({ error: "Target price must be a valid number" })
    .min(100000, { message: "Price must be at least $100,000" }),
  location: z.string().min(3, { message: "Location / Community is required" }),
  bedrooms: z.number().min(1, { message: "Minimum 1 bedroom" }),
  bathrooms: z.number().min(1, { message: "Minimum 1 bathroom" }),
  areaSqft: z.number().min(500, { message: "Area must be at least 500 sq ft" }),
  lotSize: z.string().optional(),
  yearBuilt: z.number().min(1800).max(2030).optional(),
  description: z
    .string()
    .min(20, { message: "Description must provide at least 20 characters of detail" }),
  assignedAgent: z.string().min(1, { message: "Assign a managing agent" }),
  isPrivateListing: z.boolean(),
  verifiedEscrowReady: z.boolean(),
  amenities: z.array(z.string()),
});

export type AdminPropertyFormValues = z.infer<typeof adminPropertySchema>;
