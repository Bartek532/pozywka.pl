import type { WPPost, Post, WPTag, Tag, WPCategory, Category, WPPage, Page } from "types";

export const mapToPost = ({
  id,
  title,
  slug,
  excerpt,
  content,
  acf,
  date,
  yoast_head_json,
}: WPPost): Omit<Post, "categories" | "tags"> => {
  return {
    id,
    title: title.rendered,
    date,
    slug,
    excerpt: excerpt.rendered,
    content: content.rendered,
    acf,
    yoast_head_json: yoast_head_json || {},
  };
};

export const mapToTag = ({ id, slug, name }: WPTag): Tag => {
  return {
    id,
    slug,
    name,
  };
};

export const mapToCategory = ({ id, slug, name }: WPCategory): Category => {
  return {
    id,
    slug,
    name,
  };
};

export const mapToPage = ({ id, slug, title, excerpt, content, acf, yoast_head_json }: WPPage): Page => {
  return {
    id,
    slug,
    title: title.rendered,
    content: content.rendered,
    acf,
    excerpt: excerpt.rendered,
    yoast_head_json: yoast_head_json || {},
  };
};
