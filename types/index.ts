import type { Acf } from "./wordpress";
export * from "./wordpress";

export type Post = {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly categories: Category[];
  readonly tags: Tag[];
};

export type Page = {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly acf: Acf;
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

export type APIPostsResponse = {
  readonly categories: Category[];
  readonly posts: Post[];
  readonly tags: Tag[];
};

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
export type InferGetStaticPropsType<T extends (...args: any) => any> = PromiseValue<ReturnType<T>> extends infer Temp
  ? Temp extends {
      readonly props: infer P;
    }
    ? P
    : never
  : never;
