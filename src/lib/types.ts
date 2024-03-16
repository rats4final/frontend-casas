import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
