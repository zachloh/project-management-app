import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(5),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
