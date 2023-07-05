import type { GetStaticPropsContext } from "next";
import { getPlaiceholder } from "plaiceholder";

import { Layout } from "components/layout/Layout";
import { HomeView } from "views/home/Home";
import { fetchPosts } from "pages/api/posts";
import { fetchMostViewedPosts, fetchPage } from "utils/api-helpers";
import { InferGetStaticPropsType } from "types";

const Home = ({
  tags,
  placesPosts,
  mostViewedPosts,
  podcast,
  about,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <HomeView
      tags={tags}
      placesPosts={placesPosts}
      mostViewedPosts={mostViewedPosts}
      podcast={podcast}
      about={about}
      posts={posts}
    />
  </Layout>
);

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const [
      { posts, tags },
      { posts: placesPosts },
      { posts: mostViewedPosts },
      { posts: podcasts },
      aboutPage,
    ] = await Promise.all([
      fetchPosts({ perPage: 5 }),
      fetchPosts({ tags: ["miejsca"] }),
      fetchMostViewedPosts(),
      fetchPosts({ categories: ["mowie"], perPage: 1 }),
      fetchPage("about-me"),
    ]);

    const [placesPostsWithBlurredImages, mostViewedPostsWithBlurredImages, postsWithBlurredImages] =
      await Promise.all([
        Promise.all(
          placesPosts
            .filter((post) => post.acf.image)
            .map(async (post) => ({
              ...post,
              blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
            })),
        ),
        Promise.all(
          mostViewedPosts
            .filter((post) => post.acf.image)
            .map(async (post) => ({
              ...post,
              blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
            })),
        ),
        Promise.all(
          posts
            .filter((post) => post.acf.image)
            .map(async (post) => ({
              ...post,
              blurredImage: (await getPlaiceholder(encodeURI(post.acf.image))).base64,
            })),
        ),
      ]);

    return {
      props: {
        tags,
        placesPosts: placesPostsWithBlurredImages,
        mostViewedPosts: mostViewedPostsWithBlurredImages,
        podcast: podcasts[0],
        about: {
          excerpt: aboutPage.excerpt,
          image: aboutPage.acf.profile_image,
        },
        posts: postsWithBlurredImages,
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

export default Home;
