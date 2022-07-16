import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { InstagramSection } from "components/section/instagramSection/InstagramSection";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { fetchArticles } from "pages/api/posts";
import { fetchTags } from "pages/api/posts/tags";
import { InferGetStaticPropsType } from "types";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Home = ({ instagramPosts, tags, postsBySliderTag }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <QuoteSection />
      <InstagramSection posts={instagramPosts} />
      <PostsSliderSection title={"Miejsca"} tags={tags} posts={postsBySliderTag} />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const instagramPosts = await fetchMyLastInstagramPosts();
    const tags = await fetchTags();
    const postsBySliderTag = await fetchArticles({ tags: ["miejsca"] });
    return {
      props: {
        instagramPosts,
        tags,
        postsBySliderTag: postsBySliderTag.articles,
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
