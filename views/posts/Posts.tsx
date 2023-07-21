import { memo, useState, useEffect } from "react";

import { EmptyResults } from "components/blog/empty/EmptyResults";
import { Hero } from "components/blog/posts/featured/FeaturedPost";
import { PostTile } from "components/blog/posts/tile/PostTile";
import { LoadMore } from "components/common/loadMore/LoadMore";

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
          <LoadMore
            posts={posts}
            setPosts={setPosts}
            {...(category ? { categories: [category.slug] } : {})}
          />
        </div>
      </section>
    </>
  );
});

PostsView.displayName = "PostsView";
