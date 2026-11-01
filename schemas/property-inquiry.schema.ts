import { z } from "zod";

export const propertyInquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Principal or representative name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid corporate or private email address." }),
  phone: z
    .string()
    .min(10, { message: "Telephone must include area code (minimum 10 digits)." }),
  preferredDate: z.string().min(1, { message: "Please indicate a preferred viewing date." }),
  ndaRequired: z.boolean(),
  notes: z.string().optional(),
});

export type PropertyInquiryValues = z.infer<typeof propertyInquirySchema>;

