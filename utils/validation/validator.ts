import {
  categorySchema,
  pageSchema,
  postSchema,
  tagSchema,
  wordpressPageSchema,
  wordpressPostSchema,
} from "./schema";
import { Category, Tag, WordpressPost, Post, Page, WordpressPage } from "./types";

export const isTag = (maybeTag: unknown): maybeTag is Tag => tagSchema.safeParse(maybeTag).success;
export const isCategory = (maybeCategory: unknown): maybeCategory is Category =>
  categorySchema.safeParse(maybeCategory).success;
export const isPage = (maybePage: unknown): maybePage is Page =>
  pageSchema.safeParse(maybePage).success;
export const isPost = (maybePost: unknown): maybePost is Post =>
  postSchema.safeParse(maybePost).success;

export const isWordpressPost = (maybePost: unknown): maybePost is WordpressPost =>
  wordpressPostSchema.safeParse(maybePost).success;
export const isWordpressPage = (maybePage: unknown): maybePage is WordpressPage =>
  wordpressPageSchema.safeParse(maybePage).success;
