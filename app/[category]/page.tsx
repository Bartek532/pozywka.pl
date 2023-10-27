import { notFound } from "next/navigation";

import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { Posts } from "components/blog/posts/Posts";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchCategories, fetchPosts } from "lib/wordpress";

import { CategoryParams } from "./layout";

export async function generateMetadata({ params }: CategoryParams) {
  const categories = await fetchCategories();
  const category = categories.find(({ slug }) => slug === params.category);

  if (!category) return DEFAULT_METADATA;

  return getMetadata({
    title: category.name,
  });
}

const BlogPage = async ({ params }: CategoryParams) => {
  const categories = await fetchCategories();
  const category = categories.find(({ slug }) => slug === params.category);

  if (!category) return notFound();

  const [{ posts }, { posts: newestPosts, tags }] = await Promise.all([
    fetchPosts({ categories: [params.category], perPage: 11 }),
    fetchPosts({ perPage: 10 }),
  ]);

  return (
    <>
      {posts[0] && <FeaturedPost post={posts[0]} title={category?.name ?? "logo"} />}
      <Posts posts={posts} categories={[category]} />
      <PostsSlider title="Najnowsze" posts={newestPosts} tags={tags} />
    </>
  );
};

export default BlogPage;
