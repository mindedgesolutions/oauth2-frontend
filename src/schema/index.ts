import { z } from 'zod';

export const signinSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  client_id: z.string().optional(),
  redirect_uri: z.string().optional(),
  scope: z.string().optional(),
  code_challenge: z.string().optional(),
  code_verifier: z.string().optional(),
});
export type SigninSchema = z.infer<typeof signinSchema>;
