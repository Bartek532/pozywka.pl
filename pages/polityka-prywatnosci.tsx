import type { GetStaticPropsContext } from "next";

import { Layout } from "components/layout/Layout";
import { PrivacyPolicyView } from "views/privacyPolicy/PrivacyPolicy";
import { fetchPage } from "utils/api-helpers";
import type { InferGetStaticPropsType } from "types";

const AboutMe = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={page.title} head={page.yoast_head_json}>
      <PrivacyPolicyView page={page} />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const page = await fetchPage("privacy-policy");

    return {
      props: {
        page,
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
export default AboutMe;
