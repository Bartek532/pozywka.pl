import { fetcher } from "utils/fetcher";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WPTag } from "types";
import { mapToTag } from "utils/wp-mappers";

export const fetchTags = async () => {
  const tags: WPTag[] = await fetcher(`${process.env.WP_API_ENDPOINT}/wp-json/wp/v2/tags`, {
    method: "GET",
  });

  return tags.map((tag) => mapToTag(tag));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tags = await fetchTags();

    return res.status(200).json({ tags });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
