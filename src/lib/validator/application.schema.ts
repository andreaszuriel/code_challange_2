import { z as zod } from "zod";

export const applicationSchema = zod.object({
  firstName: zod
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: zod
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  preferredName: zod
    .string()
    .max(50, "Preferred name must not exceed 50 characters")
    .optional(),

  email: zod.string().email("Invalid email format"),

  phone: zod
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?\d+$/, "Phone number can only contain numbers and an optional '+'"),

  birthDate: zod.string().min(1, "Birth date is required"),

  city: zod
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must not exceed 100 characters"),

  address: zod
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),

  postcode: zod
    .string()
    .min(4, "Postcode must be at least 4 characters")
    .max(10, "Postcode must not exceed 10 characters"),

  country: zod
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must not exceed 100 characters"),
});

export type ApplicationFormValues = zod.infer<typeof applicationSchema>;
