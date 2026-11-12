import type { NextConfig } from "next";

const publicPage = [
  { key: "Cache-Control", value: "public, max-age=300, stale-while-revalidate=600" },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return ["/", "/about", "/practice", "/work", "/inquire"].map((source) => ({
      source,
      headers: publicPage,
    }));
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
