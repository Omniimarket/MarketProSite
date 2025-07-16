// pages/blog/index.js
// This page lists all blog posts, fetching data from Sanity, with Firebase-like design.
// Updated: Standardized header and footer for site consistency and mobile responsiveness.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { sanityClient, urlFor } from '../lib/sanity.client';

export default function Blog({ posts }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog - MarketEdge Pro</title>
        <meta name="description" content="Stay updated with the latest market insights, trading strategies, and news from MarketEdge Pro." />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {/* Header Section - Consistent with MarketPulse */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-4">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/MainLogo2.png"
              alt="MarketProEdge Logo"
              width={350}
              height={70}
              className="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[350px] h-auto object-contain"
              priority
            />
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <Link
              href="/"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${typeof window !== 'undefined' && window.location.pathname === '/' ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >Home</Link>
            <Link
              href="/marketpulse"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${typeof window !== 'undefined' && window.location.pathname === '/marketpulse' ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >MarketPulse</Link>
            <Link
              href="/indicators"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${typeof window !== 'undefined' && window.location.pathname.startsWith('/indicators') ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >Indicators</Link>
            <Link
              href="/blog"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${typeof window !== 'undefined' && window.location.pathname.startsWith('/blog') ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >Blog</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 lg:p-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 text-center">Our Blog</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 text-center max-w-3xl mx-auto">
          Stay updated with the latest market insights, trading strategies, and news.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug.current} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link href={`/blog/${post.slug.current}`}>
                {post.mainImage && (
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.mainImage.alt || post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                      priority // Mark as priority for above-the-fold images
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3">{post.description}</p>
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span>By {post.author}</span>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-sm w-full">
                    Read More
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </main>

      {/* Standard Footer Component */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition duration-300">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-gray-300 transition duration-300">Privacy Policy</Link>
          </div>
          <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc){
    title,
    slug,
    publishedAt,
    author,
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
    revalidate: 60, // Revalidate every 60 seconds
  };
}
