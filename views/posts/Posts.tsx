import styles from "./Posts.module.scss";
import { memo, useState, useEffect } from "react";
import type { Post, Category, Tag } from "types";
import { Hero } from "components/common/hero/Hero";
import { LoadMore } from "components/common/loadMore/LoadMore";
import { PostTile } from "components/tile/postTile/PostTile";
import { EmptyResults } from "components/emptyResults/EmptyResults";

type PostsViewProps = {
  readonly posts: Post[];
  readonly category?: Category;
  readonly title?: string;
};

export const PostsView = memo<PostsViewProps>(({ posts: initialPosts, category, title }) => {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
    console.log(posts);
  }, [initialPosts]);

  if (!posts.length) {
    return <EmptyResults />;
  }

  return (
    <>
      <Hero post={posts[0]} title={title || category?.name} />
      <section className={styles.posts}>
        {posts.slice(1).map((post) => {
          return <PostTile post={post} key={post.id} />;
        })}
        <div className={styles.load}>
          <LoadMore posts={posts} setPosts={setPosts} category={category?.slug} />
        </div>
      </section>
    </>
  );
});

PostsView.displayName = "PostsView";
