import { supabase } from "lib/supabase";
import { fetchPost } from "pages/api/posts/[slug]";

export const fetchMostViewedPosts = async () => {
  const { data } = await supabase
    .from("views")
    .select("*")
    .limit(10)
    .order("count", { ascending: false });

  const posts = await Promise.all(data!.map(({ slug }) => fetchPost(slug)));

  return { posts: posts.map(({ post }) => post) };
};
