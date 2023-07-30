import dayjs from "dayjs";

import { supabase } from "lib/supabase";

import { InstagramPost } from "../utils/validation/types";
import {
  isInstagramPost,
  isLongLivedAccessTokenResponse,
  isTokens,
  isUserMedia,
} from "../utils/validation/validator";

const access = {
  token: "",
  expires: "",
};

const getLongLivedToken = async () => {
  if (dayjs().isBefore(dayjs(access.expires))) {
    return access.token;
  }

  const { data: tokens } = await supabase
    .from("tokens")
    .select("token")
    .eq("name", "instagram_access_token");

  if (!isTokens(tokens) || !tokens[0]) {
    throw new Error("No token found!");
  }

  const instagramToken = tokens[0].token;

  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instagramToken}`,
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    },
  );

  const data: unknown = await response.json();

  if (!isLongLivedAccessTokenResponse(data)) {
    throw new Error("Invalid token response!");
  }

  await supabase
    .from("tokens")
    .update({ token: data.access_token })
    .eq("name", "instagram_access_token");

  return data.access_token;
};

export const fetchMyLastInstagramPosts = async () => {
  const token = await getLongLivedToken();

  const response = await fetch(
    `https://graph.instagram.com/me?fields=id,media&access_token=${token}`,
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    },
  );

  const data: unknown = await response.json();

  if (!isUserMedia(data)) {
    throw new Error("Invalid user media response!");
  }

  const posts = await Promise.all(
    data.media.data.map(async ({ id }) => {
      const response = await fetch(
        `https://graph.instagram.com/${id}?fields=id,media_url,media_type,username,caption,permalink&access_token=${token}`,
        {
          method: "GET",
          next: {
            revalidate: 60,
          },
        },
      );

      const post: unknown = await response.json();

      if (!isInstagramPost(post)) {
        return null;
      }

      if (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") {
        return post;
      }

      return null;
    }),
  );

  return posts.filter((p): p is InstagramPost => !!p).slice(0, 5);
};
