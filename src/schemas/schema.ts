import { z } from "zod";

export const signUpSchema = z.object({
  firstname: z
    .string()
    .min(3, "First name must be at least 3 characters long."),
  lastname: z.string().min(3, "Last name must be at least 3 characters long."),
  email: z.string().email({ message: "Please enter a valid email address." }),
  username: z.string().min(6, "Username must be at least 6 characters long."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});
