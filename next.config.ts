/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Uncomment if you want to enable SWC minification
  images: {
    domains: [
      'cdn.sanity.io',
      'www.nasdaq.com', // Added Nasdaq.com image domain
      // Add any other external image domains here if you use them
    ],
  },
  // Ensure Next.js doesn't try to treat /pages/api files as pages for static export
  // This is the default behavior, but explicitly setting it can prevent issues
  // if other configurations were overriding it.
  // This is generally not needed if the file is correctly in `pages/api/`
  // but serves as a conceptual reminder that API routes are not static pages.
  // If you ever use `output: 'export'`, you'd need to exclude API routes.
};

export default nextConfig; // Use 'export default' for .ts config files
