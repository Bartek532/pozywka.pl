import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { memo, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { LikesCounter } from "components/blog/likesCounter/LikesCounter";
import { Hero } from "components/common/hero/Hero";
import { Explore } from "components/shared/explore/Explore";
import { EmbedPostTile } from "components/tile/embedPostTile/EmbedPostTile";
import { useViews } from "hooks/useViews";
import { POST_LINK_REGEX, URL_REGEX } from "utils/consts";
import { fetcher } from "utils/fetcher";
import { generateEmbedPostsSelectors } from "utils/functions";

import styles from "./Post.module.scss";

import type { Tag, Post, Category } from "types";

dayjs.extend(customParseFormat);

type PostViewProps = {
  readonly tags: Tag[];
  readonly post: Post & { blurredImage?: string };
  readonly categories: Category[];
};

export const PostView = memo<PostViewProps>(({ tags, post }) => {
  const { addViews } = useViews();
  const [url, setUrl] = useState("");
  useEffect(() => {
    replaceLinksWithEmbed();
    addViews(post.slug);
    setUrl(window.location.href);
  }, []);

  const replaceLinksWithEmbed = async () => {
    const embedLinkMatches = post.content.match(POST_LINK_REGEX);
    if (embedLinkMatches) {
      await Promise.all(
        embedLinkMatches.map(async (match) => {
          const [url] = match.match(URL_REGEX)!;
          const [protocol, host, category, slug] = url
            .split("/")
            .filter(Boolean)
            .map((x) => x.replace(/['"]+/g, ""));
          const { post: embedPost } = await fetcher(`/api/posts/${slug}`, { method: "GET" });

          generateEmbedPostsSelectors(slug, category).forEach((selector) => {
            const element = document.querySelector(selector);
            if (element) {
              const root = createRoot(element);
              root.render(<EmbedPostTile post={embedPost} />);
            }
          });
        }),
      );
    }
  };

  return (
    <>
      <Hero post={post} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div
            className={clsx(styles.content, "content")}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
        <aside className={styles.aside}>
          <div className={styles.info}>
            <span className={styles.date}>
              OPUBLIKOWANO <time>{dayjs(post.date).format("DD.MM.YYYY")}</time>
            </span>
            <hr className={styles.line} />
            <div
              className={styles.readmore}
              dangerouslySetInnerHTML={{
                __html: post.acf.read_more,
              }}
            ></div>
          </div>
          <Explore tags={tags} />
        </aside>
        <div className={styles.footer}>
          <LikesCounter slug={post.slug} />
          <div className={styles.share}>
            <p className={styles.description}>Udostępnij: </p>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/share?url=${post.title.replace(
                "+",
                "%2B",
              )} - ${url}%0A %0A&hashtags=pozywka`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

PostView.displayName = "PostView";
