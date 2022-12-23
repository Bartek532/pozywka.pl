import { fetchPosts } from "pages/api/posts";
import { fetchPost } from "pages/api/posts/[slug]";
import type { GetStaticPaths, GetStaticPropsContext } from "next";
import type { InferGetStaticPropsType } from "types";
import { PostView } from "views/post/Post";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import { Layout } from "components/layout/Layout";
import { getPlaiceholder } from "plaiceholder";

const Post = ({ post, tags, categories, newestPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      title={post.title}
      head={{
        ...post.yoast_head_json,
        og_image: [{ url: post.acf.image }],
      }}
    >
      <PostView post={post} tags={tags} categories={categories} />
      <PostsSliderSection title={"Może Cię też zainteresować"} tags={tags} posts={newestPosts} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await fetchPosts();

  return {
    paths: posts.map(({ slug, categories }) => ({
      params: { slug, category: categories[0].slug },
    })),
    fallback: "blocking" as const,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    const { post } = await fetchPost(params?.slug as string);
    const {
      posts: newestPosts,
      tags,
      categories,
    } = await fetchPosts({ perPage: 11, categories: [params?.category as string] });

    const newestPostsWithBlurredImages = await Promise.all(
      newestPosts.map(async (post) => {
        const result = await getPlaiceholder(encodeURI(post.acf.image));
        return { ...post, blurredImage: result.base64 };
      }),
    );

    const postWithBlurredImage = {
      ...post,
      blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
    };

    return {
      props: {
        post: postWithBlurredImage,
        tags,
        categories,
        newestPosts: newestPostsWithBlurredImages.filter(({ slug }) => slug !== (params?.slug as string)),
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

export default Post;
