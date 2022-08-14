import "react-multi-carousel/lib/styles.css";
import "../styles/globals.scss";
import "../styles/reset.scss";
import "../styles/content.scss";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

const meta = {
  title: "Pożywka - kulturalnie o kulinariach",
  description: "Cześć, tu Dominika! Jestem antropolożką i dziennikarką, opowiadam o jedzeniu.",
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="#ec5946"
        startPosition={0.3}
        stopDelayMs={200}
        height={3.5}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
