import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { HomeView } from "views/home/Home";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { fetchPosts } from "pages/api/posts";
import { fetchPage } from "utils/api-helpers";
import { InferGetStaticPropsType } from "types";

const Home = ({
  instagramPosts,
  tags,
  placesPosts,
  booksPosts,
  newestPodcast,
  about,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <HomeView
        instagramPosts={instagramPosts}
        tags={tags}
        placesPosts={placesPosts}
        booksPosts={booksPosts}
        newestPodcast={newestPodcast}
        about={about}
        posts={posts}
      />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const instagramPosts = await fetchMyLastInstagramPosts();
    const { posts: placesPosts } = await fetchPosts({ tags: ["miejsca"] });
    const { posts: booksPosts } = await fetchPosts({ tags: ["ksiazki"] });
    const { posts: podcasts } = await fetchPosts({ categories: ["podcasts"] });
    const { posts, tags } = await fetchPosts();
    const aboutPage = await fetchPage("about-me");

    return {
      props: {
        instagramPosts,
        tags,
        placesPosts,
        booksPosts,
        newestPodcast: podcasts[0],
        about: { excerpt: aboutPage.excerpt.rendered, image: aboutPage.acf.profile_image },
        posts,
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
