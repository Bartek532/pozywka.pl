import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { InstagramSection } from "components/section/instagramSection/InstagramSection";
import { Banner } from "components/common/banner/Banner";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { fetchArticles } from "pages/api/posts";
import { fetchTags } from "pages/api/posts/tags";
import { InferGetStaticPropsType } from "types";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Home = ({
  instagramPosts,
  tags,
  placesPosts,
  booksPosts,
  newestPodcast,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <PostsSliderSection title={"Książki"} tags={tags} posts={booksPosts} />
      <Banner
        label="podcast"
        title={newestPodcast.title.rendered}
        link={{ url: `/post/${newestPodcast.slug}`, title: "posłuchaj" }}
        variant="green"
        imageSrc={newestPodcast.acf.image}
      />
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
    const { articles: placesPosts } = await fetchArticles({ tags: ["miejsca"] });
    const { articles: booksPosts } = await fetchArticles({ tags: ["ksiazki"] });
    const { articles: podcasts } = await fetchArticles({ categories: ["mówię"] });

    console.log(podcasts);
    return {
      props: {
        instagramPosts,
        tags,
        placesPosts,
        booksPosts,
        newestPodcast: podcasts[0],
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
