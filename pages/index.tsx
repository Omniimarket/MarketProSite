// pages/index.tsx
// This is your main homepage component, now replicating the Firebase design
// and using local assets (no Firebase Storage URLs), and no Login button in header.
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - Empowering Your Trading Decisions</title>
        {/* Favicon from the original HTML - base64 SVG */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Google Fonts - Inter is already in _app.tsx, but including for standalone HTML context if needed */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header Section - Replicated from Firebase HTML */}
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
              <li><Link href="/blog" className="text-white hover:text-blue-200 transition duration-300">Blog</Link></li>
              {/* Removed About and Contact links as requested previously */}
              {/* Removed Login button as requested */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area - Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <section className="hero-section text-white w-full">
          <div className="container mx-auto text-center px-4 py-16">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
              Empowering Traders with Premium Indicators and Market Insights
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in-up">
              Discover powerful trading indicators and stay informed with our comprehensive blog posts on market analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/marketpulse" className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 text-lg animate-bounce-in">
                  Go to MarketPulse
              </Link>
              <Link href="/blog" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 text-lg animate-fade-in">
                  Read Blog
              </Link>
            </div>
          </div>
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

      {/* Inline styles for custom gradients and animations from original HTML */}
      <style jsx>{`
        .hero-section {
            background: linear-gradient(135deg, #4f46e5, #3b82f6);
            min-height: calc(100vh - 80px); /* Adjust for header height */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        /* Keyframe animations from original HTML */
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
            0% { transform: scale(0.1); opacity: 0; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
        }
        /* Animation application from original HTML */
        .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out 0.5s forwards; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out 1s forwards; }
        .animate-fade-in { animation: fadeInDown 1s ease-out 1.2s forwards; } /* Reusing fadeInDown for 'fade-in' */

        /* Scrollbar styles from original HTML - apply globally if desired, or keep here for mockup */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
            cursor: pointer;
        }
      `}</style>
    </div>
  );
}
