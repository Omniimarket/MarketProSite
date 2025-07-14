// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //swcMinify: true,
  images: {
    domains: ['cdn.sanity.io'], // Add Sanity's image CDN hostname here
  },
}

module.exports = nextConfig
