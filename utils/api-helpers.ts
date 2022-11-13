import { BASIC_API_URL } from "utils/consts";
import { fetcher } from "utils/fetcher";
import { mapToPage } from "utils/wp-mappers";
import type { WPPage } from "types";

export const fetchPage = async (slug: string) => {
  const [page]: WPPage[] = await fetcher(`${BASIC_API_URL}/pages?slug=${slug}`, {
    method: "GET",
  });

  return mapToPage(page);
};
