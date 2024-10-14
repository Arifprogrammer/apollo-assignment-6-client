import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email format is incorrect" }),

  phone: z.string({
    required_error: "Phone number is required",
  }),
  /* .regex(/^\+?[1-9]\d{1,14}$/, {
        message:
          "Invalid phone number format. Please use international format (e.g., +1234567890)",
      }) */ password: z.string({ required_error: "Password is required" }),
  /* .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ) */

  address: z.string({ required_error: "Address is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email format is incorrect" }),
  password: z.string({ required_error: "Password is required" }),
  /* .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ) */
});
