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
    const { posts: placesPosts } = await fetchPosts({ tags: ["miejsca"] });
    const { posts: booksPosts } = await fetchPosts({ tags: ["ksiazki"] });
    const { posts: podcasts } = await fetchPosts({ categories: ["podcasts"] });
    const { posts, tags } = await fetchPosts();
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
        about: { excerpt: aboutPage.excerpt.rendered, image: aboutPage.acf.profile_image },
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
