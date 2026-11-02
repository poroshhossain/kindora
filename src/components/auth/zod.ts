import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "At least one uppercase letter required.")
  .regex(/[a-z]/, "At least one lowercase letter required.");

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(50),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address."),

  photoUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.url().safeParse(value).success,
      "Enter a valid photo URL.",
    ),

  password: passwordSchema,
});