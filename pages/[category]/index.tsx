import { Layout } from "components/layout/Layout";
import { fetchArticles } from "pages/api/posts";
import { fetchCategories } from "pages/api/posts/categories";
import type { GetStaticPropsContext, GetStaticPaths } from "next";
import { InferGetStaticPropsType } from "types";
import { PostsView } from "views/posts/Posts";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Posts = ({
  articles,
  category,
  categories,
  tags,
  newestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={category.name}>
      <PostsView posts={articles} category={category} tags={tags} />
      <PostsSliderSection title={"Najnowsze"} categories={categories} tags={tags} posts={newestPosts} />
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
    const { articles, categories, tags } = await fetchArticles({
      categories: [params!.category! as string],
      perPage: 11,
    });
    const { articles: newestPosts } = await fetchArticles();

    const category = categories.find(({ slug }) => slug === params?.category)!;

    if (!articles.length || !category) {
      return {
        notFound: true as const,
      };
    }

    /*
    const articlesWithBlurredImages = await Promise.all(
      articles.map(async article => {
        const result = await getPlaiceholder(encodeURI(article.acf.image));
        return { ...article, blurredImage: result.base64 };
      })
    );
    */

    return {
      props: {
        articles,
        category,
        categories,
        tags,
        newestPosts,
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
