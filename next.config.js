/** @type {import('next').NextConfig} */
const withReactSvg = require("next-react-svg");
const withPWA = require("next-pwa");
const path = require("path");

module.exports = withPWA(
  withReactSvg({
    include: path.resolve(__dirname, "public/svg"),
    webpack(config, options) {
      return config;
    },
    reactStrictMode: true,
    images: {
      domains: ["admin.pozywka.pl"],
    },
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
    i18n: {
      locales: ["pl"],
      defaultLocale: "pl",
    },
  }),
);
