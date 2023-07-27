import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

export const categorySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

export const postTileSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  excerpt: z.string(),
  categories: z.array(categorySchema),
  tags: z.array(tagSchema),
  acf: z.record(z.string(), z.any()),
});

export const postSchema = postTileSchema.extend({
  content: z.string(),
});

export const wordpressPostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  date: z.string(),
  excerpt: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }),
  title: z.object({
    rendered: z.string(),
  }),
  acf: z.record(z.string(), z.any()),
  categories: z.array(z.number()),
  tags: z.array(z.number()),
});

export const pageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  acf: z.record(z.string(), z.any()),
});

export const wordpressPageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  excerpt: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }),
  acf: z.record(z.string(), z.any()),
});
