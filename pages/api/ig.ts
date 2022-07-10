import { supabase } from "lib/supabase";
import type { InstagramPost } from "types";
import type { NextApiRequest, NextApiResponse } from "next";

const refreshLongLivedAccessToken = async () => {
  const { data: tokens } = await supabase
    .from("tokens")
    .select("token")
    .eq("name", "instagram_access_token");
  const instagramToken = tokens![0].token;

  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instagramToken}`
  );
  const data = await response.json();

  await supabase
    .from("tokens")
    .update({ token: data.access_token })
    .eq("name", "instagram_access_token");

  return response;
};

export const fetchMyLastInstagramPosts = async () => {
  await refreshLongLivedAccessToken();

  const { data: tokens } = await supabase
    .from("tokens")
    .select("token")
    .eq("name", "instagram_access_token");
  const instagramToken = tokens![0].token;

  // fetch array with all ids and permalinks of my posts
  const response = await fetch(
    `https://graph.instagram.com/me?fields=id, media&access_token=${instagramToken}`,
    { method: "GET" }
  );

  const { media } = await response.json();

  const posts = await Promise.all(
    media.data.slice(0, 5).map(async (singlePost: InstagramPost) => {
      const postResponse = await fetch(
        `https://graph.instagram.com/${singlePost.id}?fields=id, media_url, username, caption, permalink&access_token=${instagramToken}`,
        {
          method: "GET",
        }
      );

      const post = await postResponse.json();
      return post;
    })
  );

  return posts;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await fetchMyLastInstagramPosts();
    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Bad request!" });
  }
}
