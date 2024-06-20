import { z } from "zod";

export const propertyStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type TpropertyStatusSchema = z.infer<typeof propertyStatusSchema>;

export const agreementTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type TagreementTypeSchema = z.infer<typeof agreementTypeSchema>;