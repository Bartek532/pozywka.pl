import { Post, PostTile } from "utils/validation/types";

export * from "utils/validation/types";

export type PostTileWithBlur = PostTile & { blurredImage?: string };
export type PostWithBlur = Post & { blurredImage?: string };

export type InstagramPost = {
  readonly id: string;
  readonly media_url: string;
  readonly caption: string;
  readonly username: string;
  readonly permalink: string;
};

export type ThingIDo = {
  readonly title: string;
  readonly description: string;
  readonly image: string;
};
