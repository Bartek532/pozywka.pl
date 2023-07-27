import { z } from "zod";

export const longLivedAccessTokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export const userMediaSchema = z.object({
  media: z.object({
    data: z.array(
      z.object({
        id: z.string(),
      }),
    ),
  }),
});

export const instagramPostSchema = z.object({
  id: z.string(),
  media_url: z.string(),
  media_type: z.string(),
  username: z.string(),
  caption: z.string(),
  permalink: z.string(),
});

export const tokensSchema = z.array(
  z.object({
    token: z.string(),
  }),
);
