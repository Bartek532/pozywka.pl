import { Layout } from "components/layout/Layout-old";
import { getPlaiceholder } from "plaiceholder";

import { PostsSliderSection } from "components/section/postsSliderSection/PostsSlider";
import { fetchPosts } from "pages/api/posts";
import { fetchCategories } from "pages/api/posts/categories";
import { InferGetStaticPropsType } from "types";
import { PostsView } from "views/posts/Posts";

import type { GetStaticPropsContext, GetStaticPaths } from "next";

const Posts = ({
  posts,
  category,
  tags,
  newestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title={category.name}>
    <PostsView posts={posts} category={category} />
    <PostsSliderSection title={"Najnowsze"} tags={tags} posts={newestPosts} />
  </Layout>
);

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
    const { posts: newestPosts } = await fetchPosts({});

    const category = categories.find(({ slug }) => slug === params?.category)!;

    if (!posts.length || !category) {
      return {
        notFound: true as const,
      };
    }

    const postsWithBlurredImages = await Promise.all(
      posts
        .filter((post) => post.acf.image)
        .map(async (post) => ({
          ...post,
          blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
        })),
    );

    const newestPostsWithBlurredImages = await Promise.all(
      newestPosts
        .filter((post) => post.acf.image)
        .map(async (post) => ({
          ...post,
          blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
        })),
    );

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
    console.error(e);

    return {
      notFound: true as const,
    };
  }
};

export default Posts;
