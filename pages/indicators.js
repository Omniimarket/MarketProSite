// pages/indicators.js
// This page lists all trading indicators, fetching data from Sanity.
// Updated: Standardized header and footer for site consistency and mobile responsiveness.
// FIXED: Corrected path for sanity.client import.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '../lib/sanity.client'; // <-- CHANGED: Adjusted path from '../../lib/sanity.client'

export default function Indicators({ indicators }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Our Indicators - MarketEdge Pro</title>
        <meta name="description" content="Explore MarketEdge Pro's powerful trading indicators designed for various market conditions." />
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
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 text-center">Our Indicators</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 text-center max-w-3xl mx-auto">
          Discover our suite of powerful trading indicators designed to give you an edge in the markets.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator) => (
            <div key={indicator.slug.current} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link href={`/indicators/${indicator.slug.current}`}>
                {indicator.mainImage && (
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={urlFor(indicator.mainImage).url()}
                      alt={indicator.mainImage.alt || indicator.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                      priority // Mark as priority for above-the-fold images
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{indicator.name}</h2>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3">{indicator.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-indigo-700">{indicator.price}</span>
                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-sm">
                      View Details
                    </button>
                  </div>
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
  const indicators = await sanityClient.fetch(`*[_type == "indicator"]{
    name,
    slug,
    shortDescription,
    price,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`);

  return {
    props: { indicators },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
