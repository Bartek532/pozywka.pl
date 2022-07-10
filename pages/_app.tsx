import "../styles/globals.css";
import type { AppProps } from "next/app";

const meta = {
  title: "Pożywka - kulturalnie o kulinariach",
  description: "Cześć, tu Dominika! Jestem antropolożką i dziennikarką, opowiadam o jedzeniu.",
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
