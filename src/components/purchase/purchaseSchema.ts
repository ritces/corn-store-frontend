import { z } from "zod";

// Define possible statuses if needed elsewhere
export const PurchaseStatuses = ["Delivered"] as const;
export type PurchaseStatus = (typeof PurchaseStatuses)[number];

export const purchaseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }), // Basic E.164 format check
  email: z.string().email({ message: "Invalid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z
    .string()
    .regex(/^\d{4,10}$/, { message: "Invalid postal code format." }), // Simple numeric postal code check
  totalPrice: z.number().positive("Price must be positive").optional(),
  status: z.enum(PurchaseStatuses).optional(),
});

// This inferred type will now correctly reflect that totalPrice and status can be optional initially
export type PurchaseFormValues = z.infer<typeof purchaseSchema>;
