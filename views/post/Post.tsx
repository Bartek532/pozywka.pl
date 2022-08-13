import styles from "./Post.module.scss";
import { memo } from "react";
import type { Tag, WPPost, Category } from "types";
import { Hero } from "components/common/hero/Hero";
import clsx from "clsx";
import { Explore } from "components/explore/Explore";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type PostViewProps = {
  readonly tags: Tag[];
  readonly post: WPPost;
  readonly categories: Category[];
  readonly newestPosts: WPPost[];
};

export const PostView = memo<PostViewProps>(({ tags, categories, post, newestPosts }) => {
  console.log(newestPosts);
  return (
    <>
      <Hero post={post} tags={tags} categories={categories} />
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
      </div>
      <PostsSliderSection
        title={"Może Cię też zainteresować"}
        categories={categories}
        tags={tags}
        posts={newestPosts}
      />
    </>
  );
});

PostView.displayName = "PostView";
