import { Post, PostTile } from "utils/validation/types";

export * from "utils/validation/types";

export type PostTileWithPlaceholder = PostTile & { placeholder?: string };
export type PostWithPlaceholder = Post & { placeholder?: string };
