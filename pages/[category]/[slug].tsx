import { fetchArticles } from "pages/api/posts";
import { fetchArticle } from "pages/api/posts/[slug]";
import type { GetStaticPaths, GetStaticPropsContext } from "next";
import type { InferGetStaticPropsType } from "types";
import { PostView } from "views/post/Post";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import { Layout } from "components/layout/Layout";

const Post = ({ article, tags, categories, newestPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      title={article.title.rendered}
      head={{
        ...article.yoast_head_json,
        og_image: [{ url: article.acf.image }],
      }}
    >
      <PostView post={article} tags={tags} categories={categories} />
      <PostsSliderSection title={"Może Cię też zainteresować"} tags={tags} posts={newestPosts} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { articles } = await fetchArticles();

  return {
    paths: articles.map(({ slug, categories }) => ({
      params: { slug, category: categories[0] as string },
    })),
    fallback: "blocking" as const,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    const { article, tags, categories } = await fetchArticle(params?.slug as string);
    const { articles: newestPosts } = await fetchArticles({ perPage: 11, categories: [params?.category as string] });

    return {
      props: {
        article,
        tags,
        categories,
        newestPosts: newestPosts.filter(({ slug }) => slug !== (params?.slug as string)),
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
