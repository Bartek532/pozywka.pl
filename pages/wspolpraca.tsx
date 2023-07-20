import type { GetStaticPropsContext } from "next";

import { Layout } from "components/layout/Layout-old";
import { CollaborationView } from "views/collaboration/Collaboration";
import type { InferGetStaticPropsType, ThingIDo } from "types";
import { fetchPage } from "utils/api-helpers";
import { fetchPosts } from "pages/api/posts";
import { NewsletterSection } from "components/section/newsletterSection/NewsletterSection";
import { PostsSliderSection } from "components/section/postsSliderSection/PostsSliderSection";

const Collaboration = ({
  page,
  thingsIDo,
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={page.title} head={page.yoast_head_json}>
      <CollaborationView page={page} thingsIDo={thingsIDo} />
      <PostsSliderSection title="Najnowsze" posts={posts} tags={tags} />
      <NewsletterSection />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const page = await fetchPage("collaboration");
    const thingsIDo = Object.entries(page.acf.things_i_do).map(([_, value]) => value) as ThingIDo[];
    const { posts, tags } = await fetchPosts({});

    return {
      props: {
        page,
        thingsIDo,
        posts,
        tags,
      },
      revalidate: 100,
    };
  } catch (e) {
    console.error(e);

    return {
      notFound: true as const,
    };
  }
};
export default Collaboration;
