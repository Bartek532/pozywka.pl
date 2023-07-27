import { z } from "zod";

export const collaborationHeroAcfSchema = z.object({
  personal_info_title: z.string(),
  personal_info: z.string(),
  image: z.string(),
  newsletter_label: z.string(),
});

export const collaborationBannerAcfSchema = z.object({
  collaboration_banner_text: z.string(),
  collaboration_banner_image: z.string(),
});

export const thingSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

export const thingsAcfSchema = z.object({
  things_i_do: z.record(z.string(), thingSchema),
});
