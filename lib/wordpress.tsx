"use server";

import { omit } from "lodash";

import { EmbedPostTile } from "components/blog/posts/embed/EmbedPostTile";
import { env } from "env/server";
import { Category, Post, PostTile, Tag } from "types";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_TAGS,
  POSTS_PER_PAGE,
  POST_LINK_REGEX,
  URL_REGEX,
} from "utils/consts";
import { buildQuery } from "utils/functions";
import { toCategory, toPage, toPost, toPostTile, toTag } from "utils/mappers";
import { isCategory, isTag, isWordpressPage, isWordpressPost } from "utils/validation/validator";

type GetPostsParams = {
  slug?: string;
  categories?: string[];
  tags?: string[];
  query?: string;
  perPage?: number;
  page?: number;
  offset?: number;
};

type ApiGetPostsResponse = {
  readonly categories: Category[];
  readonly posts: Post[];
  readonly tags: Tag[];
};

type ApiGetPostsTilesResponse = {
  readonly categories: Category[];
  readonly posts: PostTile[];
  readonly tags: Tag[];
};

type ApiPostsResponse = ApiGetPostsResponse | ApiGetPostsTilesResponse;

export const fetchTags = async () => {
  const response = await fetch(`${env.WP_API_URL}/wp-json/wp/v2/tags`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const tags: unknown = await response.json();

  if (Array.isArray(tags) && tags.every(isTag)) {
    return tags.map(toTag);
  }

  return [];
};

export const fetchCategories = async () => {
  const response = await fetch(`${env.WP_API_URL}/wp-json/wp/v2/categories`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const categories: unknown = await response.json();

  if (Array.isArray(categories) && categories.every(isCategory)) {
    return categories.map(toCategory);
  }

  return [];
};

let counter = 0;

export async function fetchPosts({
  slug,
}: Pick<GetPostsParams, "slug">): Promise<ApiGetPostsResponse>;
export async function fetchPosts({
  categories,
  tags,
  query,
  perPage,
  page,
}: Omit<GetPostsParams, "slug">): Promise<ApiGetPostsTilesResponse>;
export async function fetchPosts({
  categories = [],
  tags = [],
  query = "",
  perPage = POSTS_PER_PAGE,
  page = 1,
  slug = "",
  offset = 0,
}: GetPostsParams): Promise<ApiPostsResponse> {
  console.time(`fetchPosts ${++counter}`);
  const fetchedCategories = (await fetchCategories()) || DEFAULT_CATEGORIES;
  const fetchedTags = (await fetchTags()) || DEFAULT_TAGS;

  const formattedCategories = categories
    .map((category) => fetchedCategories.find(({ slug }) => category === slug)?.id)
    .join(",");

  const formattedTags = tags
    .map((tag) => fetchedTags.find(({ slug }) => tag === slug)?.id)
    .join(",");

  const apiQuery = buildQuery([
    { key: "page", value: page },
    { key: "per_page", value: perPage },
    { key: "slug", value: slug },
    { key: "search", value: query },
    { key: "categories", value: categories.length && formattedCategories },
    { key: "tags", value: tags.length && formattedTags },
    { key: "offset", value: offset },
  ]);

  const response = await fetch(`${env.WP_API_URL}/wp-json/wp/v2/posts?${apiQuery}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const posts: unknown = await response.json();

  if (Array.isArray(posts) && posts.every(isWordpressPost)) {
    return {
      posts: posts.map((post) => {
        const categories = post.categories.map((category) =>
          fetchedCategories.find(({ id }) => category === id),
        );

        const tags = post.tags.map((tag) => fetchedTags.find(({ id }) => tag === id));

        const mappedPost = slug ? toPost(post) : toPostTile(post);

        return { ...mappedPost, categories, tags };
      }),
      categories: fetchedCategories,
      tags: fetchedTags,
    } as ApiPostsResponse;
  }

  console.timeEnd(`fetchPosts ${counter}`);

  return {
    posts: [],
    categories: fetchedCategories,
    tags: fetchedTags,
  };
}

export const fetchPostTile = async (slug: string) => {
  const {
    posts: [post],
    categories,
    tags,
  } = await fetchPosts({ slug });

  return { post: post ? omit(post, ["content"]) : post, categories, tags };
};

export const fetchPost = async (slug: string) => {
  const {
    posts: [post],
    categories,
    tags,
  } = await fetchPosts({ slug });

  if (!post) {
    return { post, categories, tags };
  }

  const ReactDOMServer = (await import("react-dom/server")).default;
  const embedLinkMatches = post.content.match(POST_LINK_REGEX);

  if (!embedLinkMatches) return { post, categories, tags };

  const embedPosts = await Promise.all(
    embedLinkMatches.map(async (match) => {
      const url = match.match(URL_REGEX);
      if (!url || !url[0]) return;

      const [, , category, slug] = url[0]
        .split("/")
        .filter(Boolean)
        .map((x) => x.replace(/['"]+/g, ""));
      if (!slug || !category) return;

      const { post: embedPost } = await fetchPostTile(slug);
      if (!embedPost) return;

      const embedPostTile = ReactDOMServer.renderToString(<EmbedPostTile post={embedPost} />);

      return { match, embedPostTile };
    }),
  );

  const replacedContent = embedPosts
    .filter((x): x is { match: string; embedPostTile: string } => !!x)
    .reduce(
      (content, { match, embedPostTile }) => content.replace(match, embedPostTile),
      post.content,
    );

  return { post: { ...post, content: replacedContent }, categories, tags };
};

export const fetchPage = async (slug: string) => {
  const response = await fetch(`${env.WP_API_URL}/wp-json/wp/v2/pages?slug=${slug}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const pages: unknown = await response.json();

  if (Array.isArray(pages)) {
    const page: unknown = pages[0];

    if (isWordpressPage(page)) {
      return toPage(page);
    }

    return null;
  }

  return null;
};
