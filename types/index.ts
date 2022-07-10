//WP
//Yoast Head

export type YoastHead = {
  readonly robots: {
    readonly index: string;
    readonly follow: string;
    readonly "max-snippet": string;
    readonly "max-image-preview": string;
    readonly "max-video-preview": string;
  };

  readonly canonical: string;
  readonly og_locale: string;
  readonly og_type: string;
  readonly og_title: string;
  readonly og_description: string;
  readonly og_url: string;
  readonly og_site_name: string;
  readonly article_published_time: string;
  readonly article_modified_time: string;
  readonly og_image: { url: string }[];
  readonly twitter_card: string;
};

//Article from WP
export type WPPost = {
  readonly id: number;
  readonly slug: string;
  readonly date: string;
  readonly title: {
    readonly rendered: string;
  };
  readonly content: {
    readonly rendered: string;
  };
  readonly excerpt: {
    readonly rendered: string;
  };
  readonly acf: {
    readonly image: string;
  };
  readonly categories: (number | string)[];
  readonly tags: (number | string)[];
  readonly yoast_head_json: YoastHead;
};

//Category from WP
export type Category = { id: number; name: string; slug: string };

//Tag from WP
export type Tag = { id: number; name: string; slug: string };

//Page from WP
export type WPPage = {
  readonly slug: string;
  readonly title: {
    readonly rendered: string;
  };

  readonly content: {
    readonly rendered: string;
  };
  readonly excerpt: {
    readonly rendered: string;
  };
  readonly acf: any;
  readonly yoast_head_json: YoastHead;
};

//API with articles response
export type APIArticlesResponse = {
  readonly categories: Category[];
  readonly articles: WPPost[];
  readonly tags: Tag[];
};

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
