import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      // Transliterated URLs rewrite to English routes
      { source: '/torti', destination: '/cakes' },
      { source: '/torti/:slug*', destination: '/cakes/:slug*' },
      { source: '/koshnitsa', destination: '/cart' },
      { source: '/sladkishi', destination: '/sweets' },
      { source: '/sladkishi/:slug*', destination: '/sweets/:slug*' },
      { source: '/shokolad', destination: '/chocolate' },
      { source: '/shokolad/:slug*', destination: '/chocolate/:slug*' },
      { source: '/ketering', destination: '/ketering' },
    ];
  },
  async redirects() {
    return [
      {
        source: '/menu.html',
        destination: '/torti',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;