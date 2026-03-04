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
      // Bulgarian URLs rewrite to English routes
      // торти main page
      { source: '/%D1%82%D0%BE%D1%80%D1%82%D0%B8', destination: '/cakes' },
      // торти/:slug - pass any slug (category or cake) to the dynamic route
      { source: '/%D1%82%D0%BE%D1%80%D1%82%D0%B8/:slug*', destination: '/cakes/:slug*' },
      // кошница
      { source: '/%D0%BA%D0%BE%D1%88%D0%BD%D0%B8%D1%86%D0%B0', destination: '/cart' },
      // сладкиши
      { source: '/%D1%81%D0%BB%D0%B0%D0%B4%D0%BA%D0%B8%D1%88%D0%B8', destination: '/sweets' },
      // шоколад
      { source: '/%D1%88%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4', destination: '/chocolate' },
      // кетъринг
      { source: '/%D0%BA%D0%B5%D1%82%D1%8A%D1%80%D0%B8%D0%BD%D0%B3', destination: '/ketering' },
    ];
  },
  async redirects() {
    return [
      {
        source: '/menu.html',
        destination: '/торти',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;