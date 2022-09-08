import styles from "./Post.module.scss";
import React, { memo, useEffect, useState } from "react";
import type { Tag, WPPost, Category } from "types";
import { Hero } from "components/common/hero/Hero";
import clsx from "clsx";
import { useViews } from "lib/hooks/useViews";
import { Explore } from "components/explore/Explore";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LikesCounter } from "components/likesCounter/LikesCounter";
import { POST_LINK_REGEX } from "utils/consts";
import { EmbedPostTile } from "components/tile/embedPostTile/EmbedPostTile";
import { fetcher } from "utils/fetcher";
import { createRoot } from "react-dom/client";

dayjs.extend(customParseFormat);

type PostViewProps = {
  readonly tags: Tag[];
  readonly post: WPPost & { blurredImage?: string };
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
    const embedLinkMatches = post.content.rendered.match(POST_LINK_REGEX);
    if (embedLinkMatches) {
      await Promise.all(
        embedLinkMatches.map(async (match) => {
          const slug = match.split("/").filter(Boolean)[3];
          const { post: embedPost } = await fetcher(`/api/posts/${slug}`, { method: "GET" });

          const root = createRoot(document.querySelector(`a[href^="https://www.pozywka.pl/post/${slug}"]`)!);
          root.render(<EmbedPostTile post={embedPost} />);
        }),
      );
    }
  };

  return (
    <>
      <Hero post={post} tags={tags} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div
            className={clsx(styles.content, "content")}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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
              href={`https://twitter.com/share?url=${post.title.rendered.replace(
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
