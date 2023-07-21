"use client";

import { memo, useState } from "react";

import { EmptyResults } from "components/blog/empty/EmptyResults";
import { PostTile } from "components/blog/posts/tile/PostTile";
import { LoadMore } from "components/common/loadMore/LoadMore";

import styles from "./Posts.module.scss";

import type { Category, PostTile as PostTileType } from "types";

type PostsProps = {
  readonly posts: PostTileType[];
  readonly category: Category;
};

export const Posts = memo<PostsProps>(({ posts: initialPosts, category }) => {
  const [posts, setPosts] = useState(initialPosts);

  if (!posts.length) {
    return <EmptyResults />;
  }

  return (
    <>
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

Posts.displayName = "Posts";
