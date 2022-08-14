import styles from "./Posts.module.scss";
import { memo } from "react";
import type { WPPost, Category, Tag } from "types";
import { Hero } from "components/common/hero/Hero";
import { PostTile } from "components/tile/postTile/PostTile";

type PostsViewProps = {
  readonly posts: WPPost[];
  readonly category: Category;
  readonly tags: Tag[];
  readonly categories: Category[];
};

export const PostsView = memo<PostsViewProps>(({ posts, category, categories, tags }) => {
  return (
    <>
      <Hero post={posts[0]} tags={tags} categories={categories} title={category.name} />
      <section className={styles.posts}>
        {posts.slice(1).map((post) => {
          const tag = tags.find(({ slug }) => slug === post.tags[0]);
          return (
            <PostTile
              excerpt={post.excerpt.rendered}
              title={post.title.rendered}
              slug={post.slug}
              imageUrl={post.acf.image}
              category={category}
              tag={tag!.name}
            />
          );
        })}
      </section>
    </>
  );
});

PostsView.displayName = "PostsView";
