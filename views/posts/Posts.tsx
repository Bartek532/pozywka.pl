import styles from "./Posts.module.scss";
import { memo, useState, useEffect } from "react";
import type { WPPost, Category, Tag } from "types";
import { Hero } from "components/common/hero/Hero";
import { LoadMore } from "components/common/loadMore/LoadMore";
import { PostTile } from "components/tile/postTile/PostTile";
import { EmptyResults } from "components/emptyResults/EmptyResults";

type PostsViewProps = {
  readonly posts: WPPost[];
  readonly category?: Category;
  readonly tags: Tag[];
  readonly title?: string;
};

export const PostsView = memo<PostsViewProps>(({ posts: initialPosts, category, tags, title }) => {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  if (!posts.length) {
    return <EmptyResults />;
  }

  return (
    <>
      <Hero post={posts[0]} tags={tags} title={title || category?.name} />
      <section className={styles.posts}>
        {posts.slice(1).map((post) => {
          return <PostTile post={post} key={post.id} tags={tags} />;
        })}
        <div className={styles.load}>
          <LoadMore articles={posts} setArticles={setPosts} category={category?.slug} />
        </div>
      </section>
    </>
  );
});

PostsView.displayName = "PostsView";
