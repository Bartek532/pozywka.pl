import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { HomeView } from "views/home/Home";
import { fetchPosts } from "pages/api/posts";
import { fetchPage } from "utils/api-helpers";
import { InferGetStaticPropsType } from "types";
import { getPlaiceholder } from "plaiceholder";

const Home = ({
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
    const [{ posts, tags }, { posts: placesPosts }, { posts: booksPosts }, { posts: podcasts }] = await Promise.all([
      fetchPosts({ perPage: 5 }),
      fetchPosts({ tags: ["miejsca"] }),
      fetchPosts({ tags: ["ksiazki"] }),
      fetchPosts({ categories: ["podcasts"], perPage: 1 }),
    ]);
    const aboutPage = await fetchPage("about-me");

    const placesPostsWithBlurredImages = await Promise.all(
      placesPosts.map(async (post) => {
        const result = await getPlaiceholder(encodeURI(post.acf.image));
        return { ...post, blurredImage: result.base64 };
      }),
    );

    const booksPostsWithBlurredImages = await Promise.all(
      booksPosts.map(async (post) => {
        const result = await getPlaiceholder(encodeURI(post.acf.image));
        return { ...post, blurredImage: result.base64 };
      }),
    );

    const postsWithBlurredImages = await Promise.all(
      posts.map(async (post) => {
        const result = await getPlaiceholder(encodeURI(post.acf.image));
        return { ...post, blurredImage: result.base64 };
      }),
    );

    return {
      props: {
        tags,
        placesPosts: placesPostsWithBlurredImages,
        booksPosts: booksPostsWithBlurredImages,
        newestPodcast: podcasts[0],
        about: { excerpt: aboutPage.excerpt, image: aboutPage.acf.profile_image },
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
