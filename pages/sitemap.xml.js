// pages/sitemap.xml.js
// This file dynamically generates the sitemap.xml for your Next.js application.
// It uses getServerSideProps to serve the XML content directly.
// FIX: Ensured no leading whitespace/characters before XML declaration by recreating the file.

// Define your static pages here.
// For a real-world app, you might fetch dynamic routes (e.g., blog posts) from a CMS or database.
const staticPages = [
  '/',
  '/marketpulse',
  '/indicators',
  '/blog',
  '/about',
  '/contact',
  '/terms-of-service',
];

// Function to generate the XML string for the sitemap
function generateSiteMap(baseUrl) {
  // IMPORTANT: Ensure no leading whitespace/newlines before <?xml
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((path) => {
      return `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${path === '/' ? '1.0' : '0.7'}</priority>
    </url>
  `;
    })
    .join('')}
</urlset>
`;
}

// getServerSideProps is used here to generate the sitemap on each request
// and serve it with the correct XML content type.
export async function getServerSideProps({ res, req }) {
  // Determine the base URL dynamically based on the request host
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const sitemap = generateSiteMap(baseUrl);

  res.setHeader('Content-Type', 'text/xml');
  // We send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {}, // No props needed as the response is handled directly
  };
}

// A default export is required for Next.js pages, even if it's not rendered.
export default function Sitemap() {
  return null;
}
