import { memo, useState, useEffect } from "react";

import { EmptyResults } from "components/blog/emptyResults/EmptyResults";
import { Hero } from "components/common/hero/Hero";
import { LoadMore } from "components/common/loadMore/LoadMore";
import { PostTile } from "components/tile/postTile/PostTile";

import styles from "./Posts.module.scss";

import type { Category, PostTile as PostTileType } from "types";

type PostsViewProps = {
  readonly posts: PostTileType[];
  readonly category?: Category;
  readonly title?: string;
};

export const PostsView = memo<PostsViewProps>(({ posts: initialPosts, category, title }) => {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  if (!posts.length) {
    return <EmptyResults />;
  }

  return (
    <>
      <Hero post={posts[0]} title={title || category?.name} />
      <section className={styles.posts}>
        {posts.slice(1).map((post) => (
          <PostTile post={post} key={post.id} />
        ))}
        <div className={styles.load}>
          <LoadMore posts={posts} setPosts={setPosts} category={category?.slug} />
        </div>
      </section>
    </>
  );
});

PostsView.displayName = "PostsView";
