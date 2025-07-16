// pages/index.tsx
// This is the main landing page for MarketEdge Pro.
// Updated: Standardized header and footer for site consistency and mobile responsiveness.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - Unlock Your Trading Edge</title>
        <meta name="description" content="Discover powerful trading indicators and insights to elevate your market performance with MarketEdge Pro." />
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

      <main className="flex-grow container mx-auto p-6 lg:p-10 text-center">
        <section className="py-16 bg-white rounded-xl shadow-2xl mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 drop-shadow-md">
            MarketEdge Pro
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
            Unlock your trading edge with cutting-edge indicators and insightful market analysis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/indicators" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 text-lg">
              Explore Indicators
            </Link>
            <Link href="/marketpulse" className="inline-flex items-center px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 text-lg">
              View MarketPulse
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Advanced Indicators</h2>
            <p className="text-lg text-gray-700 mb-6">
              Gain a competitive advantage with our meticulously crafted trading indicators, designed for precision and clarity.
            </p>
            <Link href="/indicators" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300">
              Learn More &rarr;
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Real-time MarketPulse</h2>
            <p className="text-lg text-gray-700 mb-6">
              Stay informed with live market data, charts, and economic calendars, all in one place.
            </p>
            <Link href="/marketpulse" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300">
              Explore MarketPulse &rarr;
            </Link>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-12 rounded-xl shadow-2xl mb-12">
          <h2 className="text-4xl font-extrabold mb-6">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive insights, new indicator releases, and market updates.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              aria-label="Email for newsletter subscription"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
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
