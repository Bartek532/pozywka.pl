import styles from "./Post.module.scss";
import { memo, useEffect, useState } from "react";
import type { Tag, WPPost, Category } from "types";
import { Hero } from "components/common/hero/Hero";
import clsx from "clsx";
import { useViews } from "lib/hooks/useViews";
import { Explore } from "components/explore/Explore";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type PostViewProps = {
  readonly tags: Tag[];
  readonly post: WPPost;
  readonly categories: Category[];
};

export const PostView = memo<PostViewProps>(({ tags, post }) => {
  const { addViews } = useViews();
  const [url, setUrl] = useState("");
  useEffect(() => {
    addViews(post.slug);
    setUrl(window.location.href);
  }, []);
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
