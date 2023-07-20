import { Analytics } from "@vercel/analytics/react";
import "react-multi-carousel/lib/styles.css";

import "../styles/globals.scss";
import "../styles/reset.scss";
import "../styles/content.scss";

import type { AppProps } from "next/app";

import NextNprogress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

const meta = {
  title: "Pożywka - kulturalnie o kulinariach",
  description: "Cześć, tu Dominika! Jestem antropolożką i dziennikarką, opowiadam o jedzeniu.",
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: "website",
          title: meta.title,
          locale: "pl_PL",
          url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}${asPath}`,
          description: meta.description,
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}/logo_lg.png`,
              width: 1000,
              height: 1000,
            },
          ],
          site_name: meta.title,
        }}
      />
      <Head>
        <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#fcccdc"></meta>
      </Head>
      <NextNprogress
        color="#ec5946"
        startPosition={0.3}
        stopDelayMs={200}
        height={3.5}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;