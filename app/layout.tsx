import clsx from "clsx";
import localFont from "next/font/local";

import { Analytics } from "components/common/analytics/Analytics";
import { Layout } from "components/layout/Layout";
import { Providers } from "components/shared/providers/Providers";
import { DEFAULT_METADATA } from "lib/metadata";

import "../styles/globals.scss";

export const metadata = DEFAULT_METADATA;

const inconsolata = localFont({
  src: [
    {
      path: "../public/fonts/Inconsolata-Regular.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/Inconsolata-SemiBold.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Inconsolata-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-inconsolata",
});

const jost = localFont({
  src: [
    {
      path: "../public/fonts/Jost-Regular.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/Jost-SemiBold.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Jost-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-jost",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pl-PL"
      dir="ltr"
      itemType="http://schema.org/WebPage"
      className={clsx(inconsolata.variable, jost.variable)}
    >
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
