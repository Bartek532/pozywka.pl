import { z } from "zod";

export const serverSchema = z.object({
  MAILER_LITE_API_KEY: z.string(),
  MAILER_LITE_GROUP_ID: z.string(),

  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string(),

  WP_API_URL: z.string().url(),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_GA_TRACKING_ID: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
};