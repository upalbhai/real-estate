import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Administrative email is required" })
    .email({ message: "Please enter a valid administrative email" }),
  password: z
    .string()
    .min(6, { message: "Security key must be at least 6 characters" }),
  rememberMe: z.boolean(),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
