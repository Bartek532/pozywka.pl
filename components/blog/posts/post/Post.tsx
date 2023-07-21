"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { memo, useEffect } from "react";

import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { Explore } from "components/shared/explore/Explore";
import { addViews } from "lib/views";

import styles from "./Post.module.scss";

import type { Tag, PostWithBlur } from "types";

dayjs.extend(customParseFormat);

type PostProps = {
  readonly tags: Tag[];
  readonly post: PostWithBlur;
};

export const Post = memo<PostProps>(({ tags, post }) => {
  //   const { addViews } = useViews();
  const url = window.location.href;
  useEffect(() => {
    //   replaceLinksWithEmbed();
    void addViews(post.slug);
  }, [post.slug]);

  // const replaceLinksWithEmbed = async () => {
  //   const embedLinkMatches = post.content.match(POST_LINK_REGEX);
  //   if (embedLinkMatches) {
  //     await Promise.all(
  //       embedLinkMatches.map(async (match) => {
  //         const [url] = match.match(URL_REGEX)!;
  //         const [protocol, host, category, slug] = url
  //           .split("/")
  //           .filter(Boolean)
  //           .map((x) => x.replace(/['"]+/g, ""));
  //         const { post: embedPost } = await fetcher(`/api/posts/${slug}`, { method: "GET" });

  //         generateEmbedPostsSelectors(slug, category).forEach((selector) => {
  //           const element = document.querySelector(selector);
  //           if (element) {
  //             const root = createRoot(element);
  //             root.render(<EmbedPostTile post={embedPost} />);
  //           }
  //         });
  //       }),
  //     );
  //   }
  // };

  return (
    <>
      <FeaturedPost post={post} isPostView />
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
            {typeof post.acf.read_more === "string" && (
              <div
                className={styles.readmore}
                dangerouslySetInnerHTML={{
                  __html: post.acf.read_more,
                }}
              ></div>
            )}
          </div>
          <Explore tags={tags} />
        </aside>
        <div className={styles.footer}>
          {/* <LikesCounter slug={post.slug} /> */}
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

Post.displayName = "Post";
