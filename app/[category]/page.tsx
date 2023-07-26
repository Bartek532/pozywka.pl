import { notFound } from "next/navigation";

import { FeaturedPost } from "components/blog/posts/featured/FeaturedPost";
import { Posts } from "components/blog/posts/Posts";
import { PostsSlider } from "components/blog/posts/slider/PostsSlider";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchCategories, fetchPosts } from "lib/wordpress";

interface BlogParams {
  params: {
    category: string;
  };
}

// export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogParams) {
  const categories = await fetchCategories();
  const category = categories.find(({ slug }) => slug === params.category);

  if (!category) return DEFAULT_METADATA;

  return getMetadata({
    title: category.name,
  });
}

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map(({ slug }) => ({ category: slug }));
}

const BlogPage = async ({ params }: BlogParams) => {
  const categories = await fetchCategories();
  const category = categories.find(({ slug }) => slug === params.category);

  if (!category) return notFound();

  const { posts } = await fetchPosts({ categories: [params.category], perPage: 11 });
  const { posts: newestPosts, tags } = await fetchPosts({ perPage: 10 });

  return (
    <>
      {posts[0] && <FeaturedPost post={posts[0]} title={category?.name ?? "logo"} />}
      <Posts posts={posts} categories={[category]} />
      <PostsSlider title="Najnowsze" posts={newestPosts} tags={tags} />
    </>
  );
};

export default BlogPage;
