import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isString } from "lodash";
import React from "react";

import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { Explore } from "components/shared/explore/Explore";
import { addViews } from "lib/views";
import { HOST } from "utils/consts";

import { LikesCounter } from "../likes/LikesCounter";

import styles from "./Post.module.scss";

import type { Tag, PostWithPlaceholder } from "types";

dayjs.extend(customParseFormat);

type PostProps = {
  readonly tags: Tag[];
  readonly post: PostWithPlaceholder;
};

export const Post = async ({ tags, post }: PostProps) => {
  await addViews(post.slug);

  const url = `${HOST}/${post.categories[0]?.slug}/${post.slug}`;

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
            {isString(post.acf.read_more) && (
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
                /\+/g,
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
};
