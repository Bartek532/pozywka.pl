import type { GetStaticPropsContext } from "next";
import { Layout } from "components/layout/Layout";
import { HomeView } from "views/home/Home";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { fetchArticles } from "pages/api/posts";
import { fetchPage } from "utils/api-helpers";
import { fetchTags } from "pages/api/posts/tags";
import { fetchCategories } from "pages/api/posts/categories";
import { InferGetStaticPropsType } from "types";

const Home = ({
  instagramPosts,
  tags,
  categories,
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
        categories={categories}
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
    const tags = await fetchTags();
    const categories = await fetchCategories();
    const { articles: placesPosts } = await fetchArticles({ tags: ["miejsca"] });
    const { articles: booksPosts } = await fetchArticles({ tags: ["ksiazki"] });
    const { articles: podcasts } = await fetchArticles({ categories: ["podcasts"] });
    const { articles } = await fetchArticles();
    const aboutPage = await fetchPage("about-me");

    const posts = articles.map((article) => {
      const tag = tags.find((tag) => article.tags[0] === tag.slug)!.name;
      return {
        title: article.title.rendered,
        slug: article.slug,
        excerpt: article.excerpt.rendered,
        tag,
        id: article.id,
        imageUrl: article.acf.image,
      };
    });

    return {
      props: {
        instagramPosts,
        tags,
        categories,
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
