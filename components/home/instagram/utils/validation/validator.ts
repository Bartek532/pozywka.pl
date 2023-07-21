import {
  instagramPostSchema,
  longLivedAccessTokenResponseSchema,
  tokensSchema,
  userMediaSchema,
} from "./schema";
import { InstagramPost, LongLivedAccessTokenResponse, Tokens, UserMedia } from "./types";

export const isTokens = (maybeTokens: unknown): maybeTokens is Tokens =>
  tokensSchema.safeParse(maybeTokens).success;

export const isLongLivedAccessTokenResponse = (
  maybeLongLivedAccessTokenResponse: unknown,
): maybeLongLivedAccessTokenResponse is LongLivedAccessTokenResponse =>
  longLivedAccessTokenResponseSchema.safeParse(maybeLongLivedAccessTokenResponse).success;

export const isUserMedia = (maybeUserMedia: unknown): maybeUserMedia is UserMedia =>
  userMediaSchema.safeParse(maybeUserMedia).success;

export const isInstagramPost = (maybeInstagramPost: unknown): maybeInstagramPost is InstagramPost =>
  instagramPostSchema.safeParse(maybeInstagramPost).success;
