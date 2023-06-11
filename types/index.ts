import type { Acf, YoastHead } from "./wordpress";
export * from "./wordpress";

export type Post = {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly date: string;
  readonly excerpt: string;
  readonly content: string;
  readonly categories: Category[];
  readonly tags: Tag[];
  readonly acf: Acf;
  readonly yoast_head_json: YoastHead;
};

export type PostTile = {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly date: string;
  readonly excerpt: string;
  readonly categories: Category[];
  readonly tags: Tag[];
  readonly acf: Acf;
};

export type PostTileWithBlur = PostTile & { blurredImage?: string };
export type PostWithBlur = Post & { blurredImage?: string };

export type Page = {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly acf: Acf;
  readonly yoast_head_json: YoastHead;
};

export type Category = {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
};

export type Tag = {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
};

export type ApiGetPostsResponse = {
  readonly categories: Category[];
  readonly posts: Post[];
  readonly tags: Tag[];
};

export type ApiGetPostsTilesResponse = {
  readonly categories: Category[];
  readonly posts: PostTile[];
  readonly tags: Tag[];
};

export type ApiPostsResponse = ApiGetPostsResponse | ApiGetPostsTilesResponse;

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

export type PromiseValue<T> = T extends PromiseLike<infer R> ? R : T;
export type InferGetStaticPropsType<T extends (...args: any) => any> = PromiseValue<
  ReturnType<T>
> extends infer Temp
  ? Temp extends {
      readonly props: infer P;
    }
    ? P
    : never
  : never;
