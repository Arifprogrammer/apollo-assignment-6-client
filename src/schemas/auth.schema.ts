import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email format is incorrect" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password must be at least 4 characters long" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email format is incorrect" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password must be at least 4 characters long" }),
});
