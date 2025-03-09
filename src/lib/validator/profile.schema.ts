import { z as zod } from "zod";

export const profileSchema = zod.object({
  username: zod
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),

  firstname: zod
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, "First name can only contain letters"),

  lastname: zod
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, "Last name can only contain letters"),
});

export type ProfileForm = zod.infer<typeof profileSchema>;
