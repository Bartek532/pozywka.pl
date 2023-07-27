import type { Post, Tag, Category, Page, WordpressPost, PostTile, WordpressPage } from "types";

export const toPost = <T extends WordpressPost>({
  id,
  title,
  slug,
  excerpt,
  content,
  acf,
  date,
}: T): Omit<Post, "categories" | "tags"> => ({
  id,
  title: title.rendered,
  date,
  slug,
  excerpt: excerpt.rendered,
  content: content.rendered,
  acf,
});

export const toPostTile = <T extends WordpressPost>({
  id,
  title,
  slug,
  excerpt,
  acf,
  date,
}: T): Omit<PostTile, "categories" | "tags"> => ({
  id,
  title: title.rendered,
  date,
  slug,
  excerpt: excerpt.rendered,
  acf,
});

export const toTag = <T extends Tag>({ id, slug, name }: T): Tag => ({
  id,
  slug,
  name,
});

export const toCategory = <T extends Category>({ id, slug, name }: T): Category => ({
  id,
  slug,
  name,
});

export const toPage = <T extends WordpressPage>({
  id,
  slug,
  title,
  excerpt,
  content,
  acf,
}: T): Page => ({
  id,
  slug,
  title: title.rendered,
  content: content.rendered,
  acf,
  excerpt: excerpt.rendered,
});
