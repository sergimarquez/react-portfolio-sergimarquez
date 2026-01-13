import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX is handled manually via next-mdx-remote; no webpack MDX integration.
  images: {
    // Disable image optimization for Netlify compatibility
    // The /_next/image endpoint doesn't work reliably on Netlify
    // Images will be served directly from /public folder
    unoptimized: true,
  },
};

export default nextConfig;
