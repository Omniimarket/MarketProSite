// pages/about.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-8">
      <Head>
        <title>About Us - MarketEdge Pro</title>
        <meta name="description" content="Learn more about MarketEdge Pro, our mission, and our team." />
      </Head>

      <header className="w-full max-w-5xl mx-auto py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-4 drop-shadow-md">About MarketEdge Pro</h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-2xl mx-auto">Our commitment to empowering traders with superior tools and knowledge.</p>
        <Link href="/" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
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

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12 bg-white bg-opacity-70 rounded-t-lg shadow-inner">
        <p className="text-gray-700">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}
