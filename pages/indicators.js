// pages/indicators.js
// Indicators listing page, fetching products from Sanity, with Firebase-like design.
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { sanityClient, urlFor } from '../lib/sanity.client'; // Import sanityClient

export default function Indicators({ indicators }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - Indicators</title>
        <meta name="description" content="Explore our powerful trading indicators." />
        {/* Favicon - Three Bars (from original HTML) */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect x=%2210%22 y=%2230%22 width=%2220%22 height=%2260%22 fill=%22%234f46e5%22/><rect x=%2240%22 y=%2220%22 width=%2220%22 height=%2270%22 fill=%22%233b82f6%22/><rect x=%2270%22 y=%2240%22 width=%2220%22 height=%2250%22 fill=%22%234f46e5%22/></svg>" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
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
              <li><Link href="/indicators" className="text-white font-semibold border-b-2 border-white pb-1">Indicators</Link></li>
              <li><Link href="/blog" className="text-white hover:text-blue-200 transition duration-300">Blog</Link></li>
              <li id="authLinks">
                  <Link href="/auth" className="bg-white text-blue-700 py-1 px-3 rounded-full text-sm font-semibold hover:bg-blue-100 transition duration-300 mr-2">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6 lg:p-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 drop-shadow-md text-center">Our Indicators</h1>
        <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-3xl text-center">
          Discover powerful trading indicators designed to give you an edge in the market.
        </p>

        <section className="w-full bg-white shadow-xl rounded-xl p-8">
          {indicators.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No indicators found. Add some in Sanity Studio!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {indicators.map((indicator) => (
                <div key={indicator.slug.current} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
                  {indicator.coverImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={urlFor(indicator.coverImage).width(400).height(250).url()}
                        alt={indicator.coverImage.alt || indicator.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-xl"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-2 leading-tight">{indicator.name}</h3>
                    <p className="text-gray-700 text-base mb-4 flex-grow line-clamp-3">{indicator.shortDescription}</p>
                    <p className="text-xl font-bold text-green-600 mb-4">{indicator.price}</p>
                    <Link href={`/indicators/${indicator.slug.current}`} className="mt-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out text-center transform hover:scale-105">
                        View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer Section - Replicated from Firebase HTML with new links */}
      <footer className="bg-gray-800 text-white p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2025 MarketEdge Pro. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-white transition duration-300">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link>
          </div>
          <p className="text-xs mt-2 text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const indicators = await sanityClient.fetch(`*[_type == "indicator"] {
    name,
    slug,
    shortDescription,
    price,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`);
  return {
    props: { indicators },
    revalidate: 60
  };
}
