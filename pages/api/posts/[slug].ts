import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPosts } from ".";

export const fetchPost = async (slug: string) => {
  const {
    posts: [post],
    categories,
    tags,
  } = await fetchPosts({ slug });
  return { post, categories, tags };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchPost(req.query?.slug as string);

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
