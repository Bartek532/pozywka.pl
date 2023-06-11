import { fetcher } from "utils/fetcher";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WPCategory } from "types";
import { mapToCategory } from "utils/wp-mappers";

export const fetchCategories = async () => {
  const categories: WPCategory[] = await fetcher(
    `${process.env.WP_API_ENDPOINT}/wp-json/wp/v2/categories`,
    {
      method: "GET",
    },
  );

  return categories.map((category) => mapToCategory(category));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await fetchCategories();

    return res.status(200).json({ categories });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
