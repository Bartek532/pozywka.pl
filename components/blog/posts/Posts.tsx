"use client";

import { memo, useState } from "react";

import { EmptyResults } from "components/blog/empty/EmptyResults";
import { PostTile } from "components/blog/posts/tile/PostTile";
import { LoadMore } from "components/common/loadMore/LoadMore";

import styles from "./Posts.module.scss";

import type { Category, PostTile as PostTileType, Tag } from "types";

type PostsProps = {
  readonly posts: PostTileType[];
  readonly categories?: Category[];
  readonly tags?: Tag[];
  readonly query?: string;
};

export const Posts = memo<PostsProps>(({ posts: initialPosts, categories, tags, query }) => {
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
            {...(categories ? { categories: categories.map(({ slug }) => slug) } : {})}
            {...(tags ? { tags: tags.map(({ slug }) => slug) } : {})}
            {...(query ? { query } : {})}
          />
        </div>
      </section>
    </>
  );
});

Posts.displayName = "Posts";
