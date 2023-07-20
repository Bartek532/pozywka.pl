import { z } from "zod";

import {
  categorySchema,
  pageSchema,
  postSchema,
  postTileSchema,
  tagSchema,
  wordpressPageSchema,
  wordpressPostSchema,
} from "./schema";

export type Tag = z.infer<typeof tagSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Page = z.infer<typeof pageSchema>;
export type Post = z.infer<typeof postSchema>;
export type PostTile = z.infer<typeof postTileSchema>;

export type WordpressPost = z.infer<typeof wordpressPostSchema>;
export type WordpressPage = z.infer<typeof wordpressPageSchema>;
