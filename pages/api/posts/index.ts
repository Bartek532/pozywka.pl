import type { NextApiRequest, NextApiResponse } from "next";

import { fetcher } from "utils/fetcher";
import type {
  WPPost,
  ApiPostsResponse,
  ApiGetPostsResponse,
  ApiGetPostsTilesResponse,
} from "types";
import { POSTS_PER_PAGE, DEFAULT_CATEGORIES, DEFAULT_TAGS } from "utils/consts";
import { buildQuery } from "utils/functions";
import { mapToPost, mapToPostTile } from "utils/wp-mappers";

import { fetchTags } from "./tags";
import { fetchCategories } from "./categories";

type GetPostsParams = {
  slug?: string;
  categories?: string[];
  tags?: string[];
  query?: string;
  perPage?: number;
  page?: number;
  offset?: number;
};

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

  const posts: WPPost[] = await fetcher(
    `${process.env.WP_API_ENDPOINT}/wp-json/wp/v2/posts?${apiQuery}`,
    {
      method: "GET",
    },
  );

  return {
    posts: posts.map((post) => {
      const categories = post.categories.map((category) => {
        return fetchedCategories.find(({ id }) => category === id)!;
      });
      const tags = post.tags.map((tag) => {
        return fetchedTags.find(({ id }) => tag === id)!;
      });

      const mappedPost = slug ? mapToPost(post) : mapToPostTile(post);

      return { ...mappedPost, categories, tags };
    }),
    categories: fetchedCategories,
    tags: fetchedTags,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchPosts({
      categories: req.query.categories ? (req.query.categories as string).split(" ") : undefined,
      tags: req.query.tags ? (req.query.tags as string).split(" ") : undefined,
      query: req.query.q as string,
      perPage: Number(req.query.per_page) || undefined,
      page: Number(req.query.page) || undefined,
      offset: Number(req.query.offset) || undefined,
    });

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    
return res.status(400).json({ message: "Bad request!" });
  }
}
