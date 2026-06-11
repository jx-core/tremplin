import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output → tiny production image (only the server + traced deps are copied).
  output: "standalone",
  // No on-the-fly image optimization: assets are pre-optimized and the 2 GB VPS should not run sharp.
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
