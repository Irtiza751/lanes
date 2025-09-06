import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric, and use hyphens for spaces"
    ),
});

export type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>;
