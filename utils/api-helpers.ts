import { BASIC_API_URL } from "utils/consts";
import { fetcher } from "utils/fetcher";
import { mapToPage } from "utils/wp-mappers";
import type { WPPage } from "types";
import { supabase } from "lib/supabase";
import { fetchPost } from "pages/api/posts/[slug]";

export const fetchPage = async (slug: string) => {
  const [page]: WPPage[] = await fetcher(`${BASIC_API_URL}/pages?slug=${slug}`, {
    method: "GET",
  });

  return mapToPage(page);
};

export const fetchMostViewedPosts = async () => {
  const { data } = await supabase.from("views").select("*").limit(10).order("count", { ascending: false });

  const posts = await Promise.all(data!.map(({ slug }) => fetchPost(slug)));

  return { posts: posts.map(({ post }) => post) };
};
