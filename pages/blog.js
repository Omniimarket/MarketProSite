// pages/blog.js
// Blog listing page, fetching posts from Sanity, with Firebase-like design.
// Corrected to fetch and display 'mainImage' for blog posts.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { sanityClient, urlFor } from '../lib/sanity.client'; // Import sanityClient and urlFor

export default function Blog({ posts }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - Blog</title>
        <meta name="description" content="Latest market insights and trading articles." />
        {/* Favicon - Three Bars (from original HTML) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        
      </Head>

      {/* Header Section - Replicated from Firebase HTML (using local logo) */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg p-4">
        <div className="container mx-auto flex items-center">
          {/* Logo Image - Now using Next.js Image component with local path */}
          <Image
            src="/MainLogo2.png" // Local path in the public directory
            alt="MarketProEdge Logo"
            width={350} // Set a max width for the image for Next/Image optimization
            height={70} // Set an appropriate height based on aspect ratio
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto object-contain"
            priority // Load this image with high priority as it's above the fold
          />
          <nav className="ml-auto">
            <ul className="flex space-x-6 items-center">
              <li><Link href="/" className="text-white hover:text-blue-200 transition duration-300">Home</Link></li>
              <li><Link href="/marketpulse" className="text-white hover:text-blue-200 transition duration-300">MarketPulse</Link></li>
              <li><Link href="/indicators" className="text-white hover:text-blue-200 transition duration-300">Indicators</Link></li>
              <li><Link href="/blog" className="text-white font-semibold border-b-2 border-white pb-1">Blog</Link></li>
              {/* Removed Auth links */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6 lg:p-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 drop-shadow-md text-center">Our Blog</h1>
        <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-3xl text-center">
          Stay updated with our latest articles and in-depth market analysis.
        </p>

        <section className="w-full bg-white shadow-xl rounded-xl p-8">
          {posts.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No blog posts found. Add some in Sanity Studio!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.slug.current} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <Link href={`/blog/${post.slug.current}`} className="block h-full">
                    {post.mainImage && (
                      <div className="relative w-full h-48">
                        <Image
                          src={urlFor(post.mainImage).width(500).height(250).url()}
                          alt={post.mainImage.alt || post.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-xl"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-blue-700 hover:text-blue-900 mb-2 leading-tight">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                      <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
                      <span className="mt-4 inline-block text-blue-600 hover:underline font-medium">Read More &rarr;</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer Section - Replicated from Firebase HTML with new links */}
      <footer className="bg-gray-800 text-white p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-white transition duration-300">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link>
          </div>
          <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
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
    mainImage { // <--- CRITICAL FIX: Fetch mainImage for blog posts
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
