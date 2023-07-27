import { z } from "zod";

import {
  instagramPostSchema,
  longLivedAccessTokenResponseSchema,
  tokensSchema,
  userMediaSchema,
} from "./schema";

export type LongLivedAccessTokenResponse = z.infer<typeof longLivedAccessTokenResponseSchema>;
export type Tokens = z.infer<typeof tokensSchema>;
export type UserMedia = z.infer<typeof userMediaSchema>;
export type InstagramPost = z.infer<typeof instagramPostSchema>;
