import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: "loose",
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["admin.pozywka.pl"],
  },
  // i18n: {
  //   locales: ["pl"],
  //   defaultLocale: "pl",
  // },
};

export default withPWA(nextConfig);
