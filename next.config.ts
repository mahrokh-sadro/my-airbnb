import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "flagcdn.com",
    ],
  },
  webpack(config) {
    config.resolve.alias["slick-carousel"] = require.resolve("slick-carousel");
    return config;
  },
};

export default nextConfig;
