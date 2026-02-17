import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Add the redirects function here
  async redirects() {
    return [
      {
        source: '/menu.html',
        destination: '/cakes',
        permanent: true, // This is a 301 redirect, which is best for SEO
      },
    ];
  },
};

export default nextConfig;