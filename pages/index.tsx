import type { NextPage, GetStaticPropsContext } from "next";
import Head from "next/head";
import { Layout } from "components/layout/Layout";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";
import { InstagramSection } from "components/section/instagramSection/InstagramSection";
import { fetchMyLastInstagramPosts } from "pages/api/ig";
import { InferGetStaticPropsType } from "types";

const Home = ({ instagramPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <QuoteSection />
      <InstagramSection posts={instagramPosts} />
    </Layout>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const instagramPosts = await fetchMyLastInstagramPosts();
    return {
      props: {
        instagramPosts,
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
