import { Post, PostTile } from "utils/validation/types";

export * from "utils/validation/types";

export type PostTileWithBlur = PostTile & { blurredImage?: string };
export type PostWithBlur = Post & { blurredImage?: string };
