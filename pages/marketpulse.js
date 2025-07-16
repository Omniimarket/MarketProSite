// pages/marketpulse.tsx
// This page replicates the Firebase MarketPulse HTML design,
// integrating TradingView widgets within a Next.js component.
// Updated: Integrated the standard responsive header and footer for consistency across the site.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef

export default function MarketPulse() {
  // Refs for each TradingView widget container
  const tickerTapeRef = useRef(null);
  const advancedChartRef = useRef(null);
  const technicalAnalysisRef = useRef(null);
  const financialsRef = useRef(null);
  const economicCalendarRef = useRef(null);
  const timelineRef = useRef(null);

  // Function to load a TradingView widget
  const loadTradingViewWidget = (containerRef, scriptSrc, config) => {
    if (containerRef.current) {
      // Clear any existing widget to prevent duplicates on re-renders
      containerRef.current.innerHTML = '';

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.type = 'text/javascript';
      // Use a data attribute to store the config, then the widget script can read it
      // This is a more robust way than innerHTML for script contents
      script.setAttribute('data-config', JSON.stringify(config));

      // Append the script to the widget container
      containerRef.current.appendChild(script);
    }
  };

  // useEffect for Ticker Tape Widget
  useEffect(() => {
    const config = {
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "description": "Microsoft", "proName": "NASDAQ:MSFT" },
        { "description": "Apple", "proName": "NASDAQ:AAPL" },
        { "description": "NVIDIA", "proName": "NASDAQ:NVDA" },
        { "description": "Amazon", "proName": "NASDAQ:AMZN" },
        { "description": "Meta", "proName": "NASDAQ:META" },
        { "description": "Alphabet (Google)", "proName": "NASDAQ:GOOGL" },
        { "description": "Tesla", "proName": "NASDAQ:TSLA" },
        { "description": "Berkshire Hathaway", "proName": "NYSE:BRK.B" },
        { "description": "JPMorgan Chase", "proName": "NYSE:JPM" },
        { "description": "Visa", "proName": "NYSE:V" },
        { "description": "UnitedHealth", "proName": "NYSE:UNH" },
        { "description": "Johnson & Johnson", "proName": "NYSE:JNJ" },
        { "description": "Walmart", "proName": "NYSE:WMT" },
        { "description": "Mastercard", "proName": "NYSE:MA" },
        { "description": "Home Depot", "proName": "NYSE:HD" },
        { "description": "Procter & Gamble", "proName": "NYSE:PG" },
        { "description": "Bank of America", "proName": "NYSE:BAC" },
        { "description": "Exxon Mobil", "proName": "NYSE:XOM" },
        { "description": "Chevron", "proName": "NYSE:CVX" },
        { "description": "Coca-Cola", "proName": "NYSE:KO" },
        { "description": "PepsiCo", "proName": "NASDAQ:PEP" },
        { "description": "Adobe", "proName": "NASDAQ:ADBE" },
        { "description": "Netflix", "proName": "NASDAQ:NFLX" },
        { "description": "Salesforce", "proName": "NYSE:CRM" },
        { "description": "Intel", "proName": "NASDAQ:INTC" }
      ],
      "showSymbolLogo": true,
      "isTransparent": false,
      "displayMode": "adaptive",
      "colorTheme": "light",
      "locale": "en"
    };
    loadTradingViewWidget(tickerTapeRef, "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js", config);
  }, []);

  // useEffect for Advanced Chart Widget
  useEffect(() => {
    const config = {
      "autosize": true,
      "symbol": "NASDAQ:TSLA",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "withdateranges": true,
      "allow_symbol_change": true,
      "details": true,
      "studies": [
        "STD;Bollinger_Bands",
        "STD;Momentum",
        "STD;Money_Flow",
        "STD;SMA",
        "STD;Performance",
        "STD;Pivot%1Points%1High%1Low",
        "STD;Zig_Zag"
      ],
      "support_host": "https://www.tradingview.com"
    };
    loadTradingViewWidget(advancedChartRef, "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js", config);
  }, []);

  // useEffect for Technical Analysis Widget
  useEffect(() => {
    const config = {
      "interval": "1m",
      "width": "100%",
      "isTransparent": false,
      "height": 450,
      "symbol": "NASDAQ:TSLA",
      "showIntervalTabs": true,
      "displayMode": "single",
      "locale": "en",
      "colorTheme": "light"
    };
    loadTradingViewWidget(technicalAnalysisRef, "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js", config);
  }, []);

  // useEffect for Financials Widget
  useEffect(() => {
    const config = {
      "isTransparent": false,
      "largeChartUrl": "",
      "displayMode": "regular",
      "width": "100%",
      "height": 550,
      "colorTheme": "light",
      "symbol": "NASDAQ:TSLA",
      "locale": "en"
    };
    loadTradingViewWidget(financialsRef, "https://s3.tradingview.com/external-embedding/embed-widget-financials.js", config);
  }, []);

  // useEffect for Economic Calendar Widget
  useEffect(() => {
    const config = {
      "colorTheme": "light",
      "isTransparent": false,
      "width": "100%",
      "height": "550",
      "locale": "en",
      "importanceFilter": "-1,0,1",
      "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
    };
    loadTradingViewWidget(economicCalendarRef, "https://s3.tradingview.com/external-embedding/embed-widget-events.js", config);
  }, []);

  // useEffect for Timeline Widget
  useEffect(() => {
    const config = {
      "feedMode": "all_symbols",
      "isTransparent": false,
      "displayMode": "regular",
      "width": "100%",
      "height": "550",
      "colorTheme": "light",
      "locale": "en"
    };
    loadTradingViewWidget(timelineRef, "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js", config);
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - MarketPulse</title>
        {/* Favicon - Three Bars (from original HTML) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Font link removed from here, now in _document.js */}
      </Head>

      {/* Standard Header Component */}
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
          {/* Note: The original nav used <ul><li>, so we adapt the classes for that structure */}
          <nav className="flex flex-nowrap overflow-x-auto whitespace-nowrap -mx-2 px-2 md:space-x-4">
            <ul className="flex space-x-2 md:space-x-4 items-center"> {/* Added space-x-2 for smaller mobile gap */}
              <li><Link href="/" className="px-2 py-1 text-white hover:text-blue-200 transition duration-300 text-sm md:text-base">Home</Link></li>
              <li><Link href="/marketpulse" className="px-2 py-1 text-white font-semibold border-b-2 border-white pb-1 text-sm md:text-base">MarketPulse</Link></li> {/* Highlight current page */}
              <li><Link href="/indicators" className="px-2 py-1 text-white hover:text-blue-200 transition duration-300 text-sm md:text-base">Indicators</Link></li>
              <li><Link href="/blog" className="px-2 py-1 text-white hover:text-blue-200 transition duration-300 text-sm md:text-base">Blog</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area - TradingView Widgets */}
      <main className="flex-grow container mx-auto p-6 lg:p-10 flex flex-col items-center">
        {/* TradingView Ticker Tape Widget */}
        <section className="bg-white rounded-xl shadow-md p-2 w-full mb-8">
            <div className="tradingview-widget-container" ref={tickerTapeRef}>
                {/* Widget will be injected here by useEffect */}
            </div>
        </section>

        {/* TradingView Advanced Chart Widget */}
        <section className="bg-white rounded-xl shadow-2xl p-8 w-full h-[800px] mb-8 flex flex-col">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center flex-shrink-0">MarketPulse Live Chart</h2>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-3xl mx-auto flex-shrink-0">
                Track and analyze market movements with this interactive chart, powered by TradingView.
            </p>
            <div className="tradingview-widget-container flex-grow relative" style={{width:'100%'}} ref={advancedChartRef}>
                {/* Widget will be injected here by useEffect */}
            </div>
        </section>

        {/* Technical Analysis and Financials Widgets */}
        <section className="bg-white rounded-xl shadow-2xl p-8 w-full mb-8 mt-8 flex flex-col md:flex-row justify-around gap-8">
            {/* TradingView Technical Analysis Widget */}
            <div className="tradingview-widget-container flex-1 min-w-[300px] max-w-[425px]" ref={technicalAnalysisRef}>
                {/* Widget will be injected here by useEffect */}
            </div>

            {/* TradingView Financials Widget */}
            <div className="tradingview-widget-container flex-1 min-w-[300px] max-w-[400px]" ref={financialsRef}>
                {/* Widget will be injected here by useEffect */}
            </div>
        </section>

        {/* Economic Calendar and Timeline Widgets */}
        <section className="bg-white rounded-xl shadow-2xl p-8 w-full mb-8 mt-8 flex flex-col md:flex-row justify-around gap-8">
            {/* TradingView Economic Calendar Widget */}
            <div className="tradingview-widget-container flex-1 min-w-[300px] max-w-[400px]" ref={economicCalendarRef}>
                {/* Widget will be injected here by useEffect */}
            </div>

            {/* TradingView Timeline Widget */}
            <div className="tradingview-widget-container flex-1 min-w-[300px] max-w-[400px]" ref={timelineRef}>
                {/* Widget will be injected here by useEffect */}
            </div>
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

      {/* Inline styles from original HTML (excluding scrollbar and message-box which should be global) */}
      <style jsx>{`
        /* Custom scrollbar for better aesthetics - if not already in globals.css */
        /* If these are already in styles/globals.css, you can remove them here */
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
