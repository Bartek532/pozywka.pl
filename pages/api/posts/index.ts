import { fetcher } from "utils/fetcher";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WPPost, APIArticlesResponse } from "types";
import { fetchCategories } from "./categories";
import { ARTICLES_PER_PAGE, DEFAULT_CATEGORIES, DEFAULT_TAGS } from "utils/consts";
import { fetchTags } from "./tags";
import { buildQuery } from "utils/functions";

export const fetchArticles = async ({
  categories = [] as string[],
  tags = [] as string[],
  query = "",
  perPage = ARTICLES_PER_PAGE,
  page = 1,
  slug = "",
} = {}): Promise<APIArticlesResponse> => {
  const fetchedCategories = (await fetchCategories()) || DEFAULT_CATEGORIES;
  const fetchedTags = (await fetchTags()) || DEFAULT_TAGS;

  const formattedCategories = categories
    .map((category) => fetchedCategories.find(({ slug }) => category === slug)?.id)
    .join(",");

  const formattedTags = tags.map((tag) => fetchedTags.find(({ slug }) => tag === slug)?.id).join(",");

  const apiQuery = buildQuery([
    { key: "page", value: page },
    { key: "per_page", value: perPage },
    { key: "slug", value: slug },
    { key: "search", value: query },
    { key: "categories", value: categories.length && formattedCategories },
    { key: "tags", value: tags.length && formattedTags },
  ]);

  const articles: (Omit<WPPost, "categories" & "tags"> & {
    categories: number[];
    tags: number[];
  })[] = await fetcher(`${process.env.WP_API_ENDPOINT}/wp-json/wp/v2/posts?${apiQuery}`, { method: "GET" });

  return {
    articles: articles.map((article) => {
      const categories = article.categories.map((category) => {
        return fetchedCategories.find(({ id }) => category === id)?.slug || category;
      });
      const tags = article.tags.map((tag) => {
        return fetchedTags.find(({ id }) => tag === id)?.slug || tag;
      });
      return { ...article, categories, tags };
    }),
    categories: fetchedCategories,
    tags: fetchedTags,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchArticles({
      categories: req.query.categories ? (req.query.categories as string).split(" ") : undefined,
      tags: req.query.tags ? (req.query.tags as string).split(" ") : undefined,
      query: req.query.q as string,
      perPage: Number(req.query.per_page) || undefined,
      page: Number(req.query.page) || undefined,
    });

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
