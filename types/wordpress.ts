//TODO: remove yoast from wp

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

type WPLinks = Record<string, WPLink[]>;

type WPLink = {
  [x: string]: string | number | boolean;
  readonly href: string;
};

export type Acf = Record<string, any>;

export type WPPage = {
  readonly id: number;
  readonly slug: string;
  readonly date: string;
  readonly date_gmt: string;
  readonly guid: {
    readonly rendered: string;
  };
  readonly title: {
    readonly rendered: string;
  };
  readonly modified: string;
  readonly modified_gmt: string;
  readonly status: string;
  readonly type: "page";
  readonly link: string;
  readonly author: number;
  readonly featured_media: number;
  readonly parent: number;
  readonly menu_number: number;
  readonly comment_status: "open" | "closed";
  readonly ping_status: "open" | "closed";
  readonly template: string;
  readonly meta: string[];
  readonly content: {
    readonly rendered: string;
    readonly protected: boolean;
  };
  readonly excerpt: {
    readonly rendered: string;
    readonly protected: boolean;
  };
  readonly acf: Acf;
  readonly yoast_head_json: YoastHead;
  readonly yoast_head: string;
  readonly _links: string;
};

export type WPPost = {
  readonly id: number;
  readonly slug: string;
  readonly date: string;
  readonly date_gmt: string;
  readonly guid: {
    readonly rendered: string;
  };
  readonly modified: string;
  readonly modified_gmt: string;
  readonly status: string;
  readonly type: "post";
  readonly link: string;
  readonly author: number;
  readonly featured_media: number;
  readonly comment_status: "open" | "closed";
  readonly ping_status: "open" | "closed";
  readonly sticky: boolean;
  readonly template: string;
  readonly format: string;
  readonly meta: string[];
  readonly categories: number[];
  readonly tags: number[];
  readonly title: {
    readonly rendered: string;
  };
  readonly content: {
    readonly rendered: string;
    readonly protected: boolean;
  };
  readonly excerpt: {
    readonly rendered: string;
    readonly protected: boolean;
  };
  readonly acf: Acf;
  readonly yoast_head: string;
  readonly yoast_head_json: YoastHead;
  readonly _links: WPLinks;
};

export type WPCategory = {
  readonly id: number;
  readonly count: number;
  readonly description: string;
  readonly link: string;
  readonly name: string;
  readonly slug: string;
  readonly parent: number;
  readonly meta: string[];
  readonly taxonomy: string;
  readonly acf: Acf;
  readonly _links: WPLinks;
};

export type WPTag = {
  readonly id: number;
  readonly count: number;
  readonly description: string;
  readonly link: string;
  readonly name: string;
  readonly slug: string;
  readonly taxonomy: string;
  readonly meta: string[];
  readonly yoast_head: string;
  readonly yoast_head_json: YoastHead;
  readonly _links: WPLinks;
};
