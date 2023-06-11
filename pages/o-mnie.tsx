import { Layout } from "components/layout/Layout";
import dynamic from "next/dynamic";

const AboutMeView = dynamic<any>(
  () => import("views/aboutMe/AboutMe").then((com) => com.AboutMeView),
  {
    ssr: false,
  },
);

import { NewsletterSection } from "components/section/newsletterSection/NewsletterSection";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";
import type { GetStaticPropsContext } from "next";
import { fetchPage } from "utils/api-helpers";
import { fetchPosts } from "pages/api/posts";
import type { InferGetStaticPropsType } from "types";

const AboutMe = ({ page, posts, tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={page.title} head={page.yoast_head_json}>
      <AboutMeView page={page} />
      <PostsSliderSection title="Najnowsze" posts={posts} tags={tags} />
      <NewsletterSection />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const page = await fetchPage("about-me");
    const { posts, tags } = await fetchPosts({});

    return {
      props: {
        page,
        posts,
        tags,
      },
      revalidate: 100,
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true as const,
    };
  }
};
export default AboutMe;
