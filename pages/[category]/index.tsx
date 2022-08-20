import { Layout } from "components/layout/Layout";
import { fetchPosts } from "pages/api/posts";
import { fetchCategories } from "pages/api/posts/categories";
import type { GetStaticPropsContext, GetStaticPaths } from "next";
import { InferGetStaticPropsType } from "types";
import { PostsView } from "views/posts/Posts";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import { getPostsWithBlurredImages } from "utils/functions";

const Posts = ({ posts, category, tags, newestPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={category.name}>
      <PostsView posts={posts} category={category} tags={tags} />
      <PostsSliderSection title={"Najnowsze"} tags={tags} posts={newestPosts} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchCategories();

  return {
    paths: categories.map(({ slug }) => ({ params: { category: slug } })),
    fallback: "blocking" as const,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    const { posts, categories, tags } = await fetchPosts({
      categories: [params!.category! as string],
      perPage: 11,
    });
    const { posts: newestPosts } = await fetchPosts();

    const category = categories.find(({ slug }) => slug === params?.category)!;

    if (!posts.length || !category) {
      return {
        notFound: true as const,
      };
    }

    const postsWithBlurredImages = await getPostsWithBlurredImages(posts);
    const newestPostsWithBlurredImages = await getPostsWithBlurredImages(newestPosts);

    return {
      props: {
        posts: postsWithBlurredImages,
        category,
        tags,
        newestPosts: newestPostsWithBlurredImages,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true as const,
    };
  }
};

export default Posts;
