// pages/blog.js
// Blog listing page, fetching posts from Sanity.
import Head from 'next/head';
import Link from 'next/link';
import { sanityClient, urlFor } from '../lib/sanity.client'; // Import sanityClient

export default function Blog({ posts }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Head>
        <title>MarketEdge Pro - Blog</title>
        <meta name="description" content="Latest market insights and trading articles." />
      </Head>

      <header className="w-full max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-lg text-gray-700">Stay updated with our latest articles and market analysis.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        {posts.length === 0 ? (
          <p className="text-gray-600">No blog posts found. Add some in Sanity Studio!</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.map((post) => (
              <li key={post.slug.current} className="p-4 border border-gray-200 rounded-md">
                <Link href={`/blog/${post.slug.current}`} className="block">
                  {post.mainImage && (
                    <img
                      src={urlFor(post.mainImage).width(400).height(200).url()}
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-xl font-medium text-blue-600 hover:underline mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                  <p className="text-gray-700 mt-2">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12">
        <p className="text-gray-600">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    description,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`);
  return {
    props: { posts },
    revalidate: 60 // Re-generate page every 60 seconds
  };
}
