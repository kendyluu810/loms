import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/load_board", // what the user types
        destination: "/load_board/create-load", // your real page
      },
    ];
  },
};

export default nextConfig;
