import { notFound } from "next/navigation";
import { Suspense } from "react";

import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { Posts } from "components/blog/posts/Posts";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { getPlaceholders } from "lib/images";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchCategories, fetchPosts } from "lib/wordpress";

interface BlogParams {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: BlogParams) {
  const categories = await fetchCategories();
  const category = categories.find(({ slug }) => slug === params.category);

  if (!category) return DEFAULT_METADATA;

  return getMetadata({
    title: category.name,
  });
}

const Blog = async ({ params }: BlogParams) => {
  console.time("start");
  console.log("start");
  const categories = await fetchCategories();
  const category = categories.find(({ slug }) => slug === params.category);

  if (!category) return notFound();

  console.log("category");

  const [{ posts }, { posts: newestPosts, tags }] = await Promise.all([
    fetchPosts({ categories: [params.category], perPage: 11 }),
    fetchPosts({ perPage: 10 }),
  ]);

  console.log("posts");

  const [postsWithPlaceholders, newestPostsWithPlaceholders] = await Promise.all([
    getPlaceholders(posts),
    getPlaceholders(newestPosts),
  ]);

  console.log("placeholders");
  console.timeEnd("start");

  return (
    <>
      {postsWithPlaceholders[0] && (
        <FeaturedPost post={postsWithPlaceholders[0]} title={category?.name ?? "logo"} />
      )}
      <Posts posts={postsWithPlaceholders} categories={[category]} />
      <PostsSlider title="Najnowsze" posts={newestPostsWithPlaceholders} tags={tags} />
    </>
  );
};

const BlogPage = ({ params }: BlogParams) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Blog params={params} />
  </Suspense>
);

export default BlogPage;
