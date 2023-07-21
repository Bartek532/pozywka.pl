import { z } from "zod";

export const aboutAcfSchema = z.object({
  profile_image: z.string(),
  image: z.string(),
  first_paragraph: z.object({
    image: z.string(),
    text: z.string(),
  }),
  second_paragraph: z.object({
    image: z.string(),
    text: z.string(),
  }),
  third_paragraph: z.object({
    image: z.string(),
    text: z.string(),
  }),
});
