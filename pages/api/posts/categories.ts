import { fetcher } from "utils/fetcher";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Category } from "types";

export const fetchCategories = async () => {
  const categories: Category[] = await fetcher(`${process.env.WP_API_ENDPOINT}/wp-json/wp/v2/categories`, {
    method: "GET",
  });

  return categories;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await fetchCategories();

    return res.status(200).json({ categories });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
