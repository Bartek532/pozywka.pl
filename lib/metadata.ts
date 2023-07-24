import { Metadata } from "next";

import {
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE_URL,
  HOST,
  SITE_TITLE,
  SITE_TITLE_TEMPLATE,
} from "utils/consts";

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly publishedAt?: string;
  readonly type?: "article" | "website";
}

export const DEFAULT_METADATA: Metadata = {
  title: {
    template: SITE_TITLE_TEMPLATE,
    default: SITE_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    locale: "pl_PL",
    description: DEFAULT_DESCRIPTION,
    images: {
      width: 1000,
      height: 1000,
      alt: SITE_TITLE,
      url: `${HOST}${DEFAULT_IMAGE_URL}`,
    },
    siteName: SITE_TITLE,
  },
  icons: {
    icon: [
      {
        url: "/android-icon-192x192.png",
        sizes: "192x192",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
      },
    ],
    apple: [
      { url: "/regular-apple-icon-57x57.png", sizes: "57x57" },
      { url: "/regular-apple-icon-60x60.png", sizes: "60x60" },
      { url: "/regular-apple-icon-72x72.png", sizes: "72x72" },
      { url: "/regular-apple-icon-76x76.png", sizes: "76x76" },
      { url: "/regular-apple-icon-114x114.png", sizes: "114x114" },
      { url: "/regular-apple-icon-120x120.png", sizes: "120x120" },
      { url: "/regular-apple-icon-144x144.png", sizes: "144x144" },
      { url: "/regular-apple-icon-152x152.png", sizes: "152x152" },
      { url: "/regular-apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  themeColor: "#fcccdc",
};

export const getMetadata = (
  {
    title = SITE_TITLE,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE_URL,
    type = "website",
    publishedAt,
  } = {} as SeoProps,
): Metadata => ({
  title,
  description,
  openGraph: {
    type,
    title,
    locale: "pl_PL",
    description,
    images: {
      width: 1000,
      height: 1000,
      alt: title,
      url: image,
    },
    siteName: SITE_TITLE,
    ...(type === "article" ? { publishedTime: publishedAt, authors: [DEFAULT_AUTHOR] } : {}),
  },
});
