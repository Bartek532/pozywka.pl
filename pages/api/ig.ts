import { supabase } from "lib/supabase";
import type { InstagramPost } from "types";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "utils/fetcher";

const refreshLongLivedAccessToken = async () => {
  const { data: tokens } = await supabase.from("tokens").select("token").eq("name", "instagram_access_token");
  const instagramToken = tokens![0].token;

  const data = await fetcher(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instagramToken}`,
    { method: "GET" },
  );

  await supabase.from("tokens").update({ token: data.access_token }).eq("name", "instagram_access_token");

  return data;
};

export const fetchMyLastInstagramPosts = async () => {
  await refreshLongLivedAccessToken();

  const { data: tokens } = await supabase.from("tokens").select("token").eq("name", "instagram_access_token");
  const instagramToken = tokens![0].token;

  // fetch array with all ids and permalinks of my posts
  const { media } = await fetcher(`https://graph.instagram.com/me?fields=id, media&access_token=${instagramToken}`, {
    method: "GET",
  });

  const posts = await Promise.all(
    media.data.map(async (singlePost: InstagramPost) => {
      const post = await fetcher(
        `https://graph.instagram.com/${singlePost.id}?fields=id, media_url, media_type, username, caption, permalink&access_token=${instagramToken}`,
        {
          method: "GET",
        },
      );

      if (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") {
        return post;
      }
    }),
  );

  return posts.filter(Boolean).slice(0, 5);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await fetchMyLastInstagramPosts();
    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
