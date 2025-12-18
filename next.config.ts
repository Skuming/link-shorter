import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  generateBuildId: async () => {
    return "link-shortener-v1";
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["ntgrd.link", "localhost:3000"],
    },
  },
  output: "standalone",
};

export default nextConfig;
