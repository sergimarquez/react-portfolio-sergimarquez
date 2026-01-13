import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX is handled manually via next-mdx-remote; no webpack MDX integration.
  images: {
    // Enable image optimization for Netlify
    // Netlify's Next.js plugin handles image optimization automatically
    formats: ["image/avif", "image/webp"],
    // Ensure images from public folder are optimized
    unoptimized: false,
    // Explicitly allow images from the public folder
    remotePatterns: [],
    // Ensure local images work correctly
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
