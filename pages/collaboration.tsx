import { Layout } from "components/layout/Layout";
import { CollaborationView } from "views/collaboration/Collaboration";
import type { GetStaticPropsContext } from "next";
import { fetcher } from "utils/fetcher";
import type { InferGetStaticPropsType, WPPost } from "types";
import { fetchPage } from "utils/api-helpers";
import { fetchArticles } from "pages/api/posts";
import { BASIC_API_URL } from "utils/consts";
import { NewsletterSection } from "components/section/newsletterSection/NewsletterSection";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Collaboration = ({ page, thingsIDo, articles, tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={page.title.rendered} head={page.yoast_head_json}>
      <CollaborationView page={page} thingsIDo={thingsIDo} />
      <PostsSliderSection title="Najnowsze" posts={articles} tags={tags} />
      <NewsletterSection />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const page = await fetchPage("collaboration");
    const thingsIDo: WPPost[] = await fetcher(`${BASIC_API_URL}/things_i_do`, {
      method: "GET",
    });
    const { articles, tags } = await fetchArticles();

    return {
      props: {
        page,
        thingsIDo,
        articles,
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
export default Collaboration;
