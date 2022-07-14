import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "components/layout/Layout";
import { QuoteSection } from "components/section/quoteSection/QuoteSection";

const Home: NextPage = () => {
  return (
    <Layout>
      <QuoteSection />
    </Layout>
  );
};

export default Home;
