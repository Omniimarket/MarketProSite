// pages/index.tsx
// Updated: Enhanced header responsiveness for mobile, preventing cutoff.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/hero-image-1.jpg',
      alt: 'Trading chart with indicators',
      title: 'Unlock Your Trading Potential',
      description: 'Discover powerful indicators and insights for smarter market decisions.',
      buttonText: 'Explore Indicators',
      buttonLink: '/indicators',
    },
    {
      image: '/hero-image-2.jpg',
      alt: 'Financial data analysis',
      title: 'Stay Ahead with MarketPulse',
      description: 'Real-time market analysis and curated news to inform your strategy.',
      buttonText: 'View MarketPulse',
      buttonLink: '/marketpulse',
    },
    {
      image: '/hero-image-3.jpg',
      alt: 'Person analyzing stock market data',
      title: 'Deep Dive into Trading Strategies',
      description: 'Learn from our expert blog on market trends and technical analysis.',
      buttonText: 'Read Our Blog',
      buttonLink: '/blog',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - Trading Indicators & Market Analysis</title>
        <meta name="description" content="MarketEdge Pro offers advanced trading indicators, real-time market analysis, and expert insights to help you make smarter trading decisions." />
        {/* Custom Favicon from /public directory (PNG) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Font link removed from here, now in _document.js */}
      </Head>

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-4">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between"> {/* Reduced px for mobile */}
          <Link href="/">
            <Image
              src="/MainLogo2.png"
              alt="MarketProEdge Logo"
              width={350}
              height={70}
              // Adjusted logo width for better mobile scaling
              className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[350px] h-auto object-contain"
              priority
            />
          </Link>
          {/* Mobile-friendly navigation: horizontal scroll if needed, smaller text */}
          <nav className="flex flex-nowrap overflow-x-auto whitespace-nowrap -mx-2 px-2 md:space-x-4">
            <Link href="/" className="px-2 py-1 text-white border-b-2 border-white pb-1 text-sm md:text-base">Home</Link>
            <Link href="/marketpulse" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">MarketPulse</Link>
            <Link href="/indicators" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Indicators</Link>
            <Link href="/blog" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                layout="fill"
                objectFit="cover"
                quality={80}
                priority={index === 0} // Prioritize loading the first slide
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-10">Why Choose MarketEdge Pro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L13.5 21.75l1.5-6.75h-6.75Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Precision Indicators</h3>
                <p className="text-gray-700">Access cutting-edge trading indicators designed for accuracy and clarity in volatile markets.</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.281l-2.28 5.941" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time MarketPulse</h3>
                <p className="text-gray-700">Stay informed with live market analysis, news, and insights to react swiftly to opportunities.</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6.375c0-.621.504-1.125 1.125-1.125H9.75a3 3 0 013-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Educational Blog</h3>
                <p className="text-gray-700">Deepen your trading knowledge with articles, tutorials, and strategy guides from industry experts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-700 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Ready to Elevate Your Trading?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Join MarketEdge Pro today and gain the tools and knowledge you need to navigate the markets with confidence.</p>
            <Link
              href="/indicators"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-xl hover:bg-blue-100 transition duration-300 transform hover:scale-105 inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

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
