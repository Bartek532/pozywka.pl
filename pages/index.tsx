import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { InstagramSection } from "components/section/instagramSection/InstagramSection";
import { Banner } from "components/common/banner/Banner";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { fetchArticles } from "pages/api/posts";
import { fetchPage } from "utils/api-helpers";
import { fetchTags } from "pages/api/posts/tags";
import { InferGetStaticPropsType } from "types";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Home = ({
  instagramPosts,
  tags,
  placesPosts,
  booksPosts,
  newestPodcast,
  about,
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
      <Banner
        label="cześć"
        title="O mnie"
        link={{ url: `/about-me`, title: "więcej o mnie" }}
        variant="red"
        imageSrc={about.image}
        description={about.excerpt}
        reverse
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
    const page = await fetchPage("about-me");

    console.log(page);
    return {
      props: {
        instagramPosts,
        tags,
        placesPosts,
        booksPosts,
        newestPodcast: podcasts[0],
        about: { excerpt: page.excerpt.rendered, image: page.acf.profile_image },
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
