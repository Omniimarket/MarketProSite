/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: [
      'cdn.sanity.io',
      // Removed FMP domains as we are no longer using FMP for news
      // Removed Investing.com domain as we are no longer using it for news
      'www.nasdaq.com', // NEW: Added Nasdaq.com image domain
      // Add any other external image domains here if you use them
    ],
  },
};

module.exports = nextConfig;
