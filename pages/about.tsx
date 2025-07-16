// pages/about.tsx
// Updated: Integrated the standard responsive header for consistency across the site.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter"> {/* Changed background for consistency */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About Us - MarketEdge Pro</title>
        <meta name="description" content="Learn more about MarketEdge Pro, our mission, and our team." />
        {/* Custom Favicon from /public directory (PNG) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Font link removed from here, now in _document.js */}
      </Head>

      {/* Standard Header Component - Copied from other pages (e.g., index.tsx, blog.js) */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-4">
        {/* UPDATED: Reduced px for mobile, kept flex items-center justify-between */}
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/MainLogo2.png"
              alt="MarketProEdge Logo"
              width={350}
              height={70}
              // UPDATED: Adjusted logo width for better mobile scaling
              className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[350px] h-auto object-contain"
              priority
            />
          </Link>
          {/* UPDATED: Mobile-friendly navigation: horizontal scroll if needed, smaller text */}
          <nav className="flex flex-nowrap overflow-x-auto whitespace-nowrap -mx-2 px-2 md:space-x-4">
            <Link href="/" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Home</Link>
            <Link href="/marketpulse" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">MarketPulse</Link>
            <Link href="/indicators" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Indicators</Link>
            <Link href="/blog" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed mt-12"> {/* Added mt-12 for spacing */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-8 drop-shadow-md">About MarketEdge Pro</h1> {/* Adjusted h1 size */}
        <p className="text-lg md:text-xl text-gray-800 mb-6 text-center max-w-2xl mx-auto">Our commitment to empowering traders with superior tools and knowledge.</p>
        
        {/* Original content of the About page */}
        <h2>Our Mission</h2>
        <p>At MarketEdge Pro, our mission is to equip traders of all levels with the advanced tools and insights necessary to navigate the complexities of financial markets successfully. We believe that informed decisions lead to better outcomes, and our indicators are designed to cut through the noise and highlight true market opportunities.</p>

        <h2>Who We Are</h2>
        <p>We are a team of passionate traders, developers, and market analysts with years of combined experience in various financial instruments. Our expertise spans technical analysis, quantitative methods, and software development, allowing us to create robust, reliable, and user-friendly trading indicators.</p>

        <h2>What We Offer</h2>
        <ul>
          <li><strong>Premium Trading Indicators:</strong> Developed with precision and rigorously tested to provide actionable signals and comprehensive market understanding.</li>
          <li><strong>Insightful Blog:</strong> A resource hub featuring in-depth articles, market analysis, trading strategies, and educational content to enhance your trading knowledge.</li>
          <li><strong>Community Focus:</strong> We are committed to fostering a community where traders can learn, share, and grow together.</li>
        </ul>

        <h2>Our Vision</h2>
        <p>To be the leading provider of innovative trading solutions, continuously evolving our products and content to meet the dynamic needs of the global trading community. We strive to empower every trader to achieve their financial goals with confidence and clarity.</p>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12"> {/* Standard footer */}
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link href="/about" className="text-white border-b-2 border-white pb-1">About</Link> {/* Highlight current page */}
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
