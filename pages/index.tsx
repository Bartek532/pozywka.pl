import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { InstagramSection } from "components/section/instagramSection/InstagramSection";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { fetchArticles } from "pages/api/posts";
import { fetchTags } from "pages/api/posts/tags";
import { InferGetStaticPropsType } from "types";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Home = ({ instagramPosts, tags, placesPosts, booksPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <PostsSliderSection title={"Książki"} tags={tags} posts={booksPosts} />
      <QuoteSection />
      <InstagramSection posts={instagramPosts} />
      <PostsSliderSection title={"Miejsca"} tags={tags} posts={placesPosts} />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const instagramPosts = await fetchMyLastInstagramPosts();
    const tags = await fetchTags();
    const placesPosts = await fetchArticles({ tags: ["miejsca"] });
    const booksPosts = await fetchArticles({ tags: ["ksiazki"] });
    return {
      props: {
        instagramPosts,
        tags,
        placesPosts: placesPosts.articles,
        booksPosts: booksPosts.articles,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true as const,
    };
  }
};

export default Home;
