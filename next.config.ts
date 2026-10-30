import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Video thumbnails on /videos come from YouTube.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
