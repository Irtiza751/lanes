import z from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupForm = z.infer<typeof signupFormSchema>;
