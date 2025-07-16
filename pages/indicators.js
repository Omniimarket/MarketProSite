// pages/indicators.js
// Displays a list of trading indicators fetched from Sanity.
// Updated: Header and footer are now consistent with other main pages for mobile responsiveness.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '../lib/sanity.client'; // Path is correct if indicators.js is directly in pages/

export default function Indicators({ indicators }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Our Trading Indicators - MarketEdge Pro</title>
        <meta name="description" content="Explore MarketEdge Pro's powerful trading indicators designed for various platforms." />
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
              // ADJUSTED: Even smaller logo on sm/md for more nav space
              className="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[350px] h-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation - Adjusted for aggressive scaling to fit on one line */}
          {/* Removed overflow-x-auto and whitespace-nowrap to avoid scrollbar */}
          <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4"> {/* Tighter spacing */}
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

      <main className="container mx-auto py-12 px-6 lg:px-8 flex-grow">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 leading-tight">
          Unlock Your Edge with Our <span className="text-blue-600">Trading Indicators</span>
        </h1>

        {indicators.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No indicators available at the moment. Please check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {indicators.map((indicator) => (
              <div key={indicator.slug.current} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col">
                <Link href={`/indicators/${indicator.slug.current}`} className="block relative h-60 w-full overflow-hidden">
                  {indicator.galleryImages && indicator.galleryImages.length > 0 ? (
                    <Image
                      src={urlFor(indicator.galleryImages[0]).width(800).height(450).url()} // Increased resolution for card images
                      alt={indicator.galleryImages[0].alt || indicator.name}
                      layout="fill"
                      objectFit="cover" // Ensure image covers the area without stretching
                      className="transition-opacity duration-300 hover:opacity-90"
                      priority={true} // Prioritize loading for initial view
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                      No Image Available
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{indicator.name}</h2>
                  <p className="text-gray-700 text-sm mb-4 flex-grow">{indicator.shortDescription}</p>
                  <p className="text-3xl font-extrabold text-indigo-700 mb-4">{indicator.price}</p>
                  <Link href={`/indicators/${indicator.slug.current}`} className="block w-full bg-blue-600 text-white font-semibold rounded-lg py-3 text-center hover:bg-blue-700 transition duration-300 shadow-md">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
  const indicators = await sanityClient.fetch(`
    *[_type == "indicator"] | order(_createdAt desc) {
      name,
      slug,
      shortDescription,
      price,
      galleryImages[]{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `);

  return {
    props: {
      indicators,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
