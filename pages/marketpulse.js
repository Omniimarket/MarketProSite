// pages/marketpulse.tsx
// This page replicates the Firebase MarketPulse HTML design,
// integrating TradingView widgets within a Next.js component.
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
      script.innerHTML = JSON.stringify(config); // Pass config as innerHTML

      // Append the script to the widget container
      containerRef.current.appendChild(script);

      // Removed the manual appending of the copyright div.
      // TradingView widgets typically inject their own copyright notice.
      // const copyrightDiv = document.createElement('div');
      // copyrightDiv.className = 'tradingview-widget-copyright';
      // copyrightDiv.style.position = 'absolute';
      // copyrightDiv.style.bottom = '0';
      // copyrightDiv.style.right = '0';
      // copyrightDiv.style.fontSize = '11px';
      // copyrightDiv.style.color = '#95989A';
      // copyrightDiv.style.margin = '0 0 1px 0';
      // copyrightDiv.style.padding = '0 4px';
      // copyrightDiv.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
      // containerRef.current.appendChild(copyrightDiv);
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
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Base background and flex column for footer */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - MarketPulse</title>
        {/* Favicon - Three Bars (from original HTML) */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect x=%2210%22 y=%2230%22 width=%2220%22 height=%2260%22 fill=%22%234f46e5%22/><rect x=%2240%22 y=%2220%22 width=%2220%22 height=%2270%22 fill=%22%233b82f6%22/><rect x=%2270%22 y=%2240%22 width=%2220%22 height=%2250%22 fill=%22%234f46e5%22/></svg>" />
        {/* Google Fonts - Inter is already in _app.tsx, but useful for standalone HTML context */}
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
              <li><Link href="/marketpulse" className="text-white font-semibold border-b-2 border-white pb-1">MarketPulse</Link></li>
              <li><Link href="/indicators" className="text-white hover:text-blue-200 transition duration-300">Indicators</Link></li>
              <li><Link href="/blog" className="text-white hover:text-blue-200 transition duration-300">Blog</Link></li>
              {/* Auth links - simplified for visual mockup */}
              <li id="authLinks">
                  <Link href="/auth" className="bg-white text-blue-700 py-1 px-3 rounded-full text-sm font-semibold hover:bg-blue-100 transition duration-300 mr-2">Login</Link>
              </li>
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
