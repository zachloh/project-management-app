import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserOrgSchema = z.object({
  org: z.string().trim().min(1),
  position: z.string().trim().min(1),
  role: z.enum(['admin', 'project manager', 'member']),
});

export const updateUserProfileSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  position: z.string().trim().min(1),
});
