/** @type {import('next').NextConfig} */
const withReactSvg = require("next-react-svg");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
});
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
    i18n: {
      locales: ["pl"],
      defaultLocale: "pl",
    },
  }),
);
