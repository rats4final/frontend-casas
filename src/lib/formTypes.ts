import { z } from "zod";
import { propertyStatusSchema } from "./definitions";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  remember: z.boolean().optional().default(false)
});
export type TLoginSchema = z.infer<typeof loginSchema>;

export const propertyStatusSchemaForm = propertyStatusSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export type TpropertyStatusSchemaForm = z.infer<typeof propertyStatusSchemaForm>;
