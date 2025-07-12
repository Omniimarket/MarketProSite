// pages/index.tsx
// This is your main homepage component for Next.js.
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <Head>
        <title>MarketEdge Pro - Home</title>
        <meta name="description" content="Welcome to MarketEdge Pro - Your destination for trading indicators and market insights." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center py-12">
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 drop-shadow-lg animate-fade-in-down">
          Welcome to <span className="text-blue-900">MarketEdge Pro</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-800 mb-10 max-w-3xl leading-relaxed animate-fade-in-up">
          Unlock unparalleled market insights with our cutting-edge trading indicators and stay ahead of the curve with our expertly curated blog.
        </p>

        <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-6">
          <Link href="/blog" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Read Our Blog
          </Link>
          <Link href="/indicators" className="px-10 py-4 border-2 border-blue-600 text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
              View Indicators
          </Link>
          <Link href="/marketpulse" className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300">
              Market Pulse Widgets
          </Link>
        </div>
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12 bg-white bg-opacity-70 rounded-t-lg shadow-inner">
        <a
          className="flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2 filter grayscale hover:grayscale-0 transition-all duration-200" />
        </a>
      </footer>

      {/* Basic CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 0.3s; /* Delay for a staggered effect */
        }
      `}</style>
    </div>
  );
}
