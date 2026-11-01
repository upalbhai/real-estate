import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid corporate or private email address." }),
  phone: z
    .string()
    .min(10, { message: "Direct telephone must include country & area code (min 10 digits)." }),
  principalType: z.string().min(1, { message: "Please select your principal classification." }),
  inquiryType: z.string().min(1, { message: "Please select the engagement category." }),
  preferredTerritory: z.string().optional(),
  budgetTier: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Please provide details regarding your inquiry (minimum 10 characters)." }),
  ndaRequested: z.boolean(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

