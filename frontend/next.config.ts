import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.topengine.ae",
      },
      {
        protocol: "https",
        hostname: "topengine.ae",
      },
    ],
  },
};

export default nextConfig;
