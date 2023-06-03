import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { HomeView } from "views/home/Home";
import { fetchPosts } from "pages/api/posts";
import { fetchMostViewedPosts, fetchPage } from "utils/api-helpers";
import { InferGetStaticPropsType } from "types";
import { getPlaiceholder } from "plaiceholder";

const Home = ({
  tags,
  placesPosts,
  mostViewedPosts,
  newestPodcast,
  about,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <HomeView
        tags={tags}
        placesPosts={placesPosts}
        mostViewedPosts={mostViewedPosts}
        newestPodcast={newestPodcast}
        about={about}
        posts={posts}
      />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const [
      { posts, tags },
      { posts: placesPosts },
      { posts: mostViewedPosts },
      { posts: podcasts },
    ] = await Promise.all([
      fetchPosts({ perPage: 5 }),
      fetchPosts({ tags: ["miejsca"] }),
      fetchMostViewedPosts(),
      fetchPosts({ categories: ["mowie"], perPage: 1 }),
    ]);
    const aboutPage = await fetchPage("about-me");

    const placesPostsWithBlurredImages = await Promise.all(
      placesPosts
        .filter((post) => post.acf.image)
        .map(async (post) => ({
          ...post,
          blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
        })),
    );

    const mostViewedPostsWithBlurredImages = await Promise.all(
      mostViewedPosts
        .filter((post) => post.acf.image)
        .map(async (post) => ({
          ...post,
          blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
        })),
    );

    const postsWithBlurredImages = await Promise.all(
      posts
        .filter((post) => post.acf.image)
        .map(async (post) => ({
          ...post,
          blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
        })),
    );

    return {
      props: {
        tags,
        placesPosts: placesPostsWithBlurredImages,
        mostViewedPosts: mostViewedPostsWithBlurredImages,
        newestPodcast: podcasts[0],
        about: {
          excerpt: aboutPage.excerpt,
          image: aboutPage.acf.profile_image,
        },
        posts: postsWithBlurredImages,
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

export default Home;
