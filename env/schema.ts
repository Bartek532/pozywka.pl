import { z } from "zod";

export const serverSchema = z.object({
  MAILER_LITE_API_KEY: z.string(),
  MAILER_LITE_GROUP_ID: z.string(),

  WP_API_URL: z.string().url(),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_GA_TRACKING_ID: z.string(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_KEY: z.string(),

  NEXT_PUBLIC_HOST: z.string().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,

  NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
};
