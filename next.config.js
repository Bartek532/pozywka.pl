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
      domains: [
        "scontent-waw1-1.cdninstagram.com",
        "scontent-frt3-2.cdninstagram.com",
        "scontent-frx5-1.cdninstagram.com",
        "scontent-frt3-1.cdninstagram.com",
        "admin.pozywka.pl",
      ],
    },
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
  }),
);
