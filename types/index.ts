//Instagram Post
export type InstagramPost = {
  readonly id: string;
  readonly media_url: string;
  readonly caption: string;
  readonly username: string;
  readonly permalink: string;
};

export type PromiseValue<T> = T extends PromiseLike<infer R> ? R : T;
export type InferGetStaticPropsType<T extends (...args: any) => any> =
  PromiseValue<ReturnType<T>> extends infer Temp
    ? Temp extends {
        readonly props: infer P;
      }
      ? P
      : never
    : never;
