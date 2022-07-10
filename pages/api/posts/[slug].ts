import type { NextApiRequest, NextApiResponse } from "next";
import { fetchArticles } from ".";

export const fetchArticle = async (slug: string) => {
  const {
    articles: [article],
    categories,
    tags,
  } = await fetchArticles({ slug });
  return { article, categories, tags };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchArticle(req.query?.slug as string);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
