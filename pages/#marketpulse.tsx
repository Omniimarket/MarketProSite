// pages/marketpulse.tsx
// This page replicates the Firebase MarketPulse HTML design,
// integrating TradingView widgets within a Next.js component.
// Updated: Uses the reusable Header component with simplified import path.

import Head from 'next/head';
import Link from 'next/link'; // Keep Link for internal page links in main content/footer
import Image from 'next/image'; // Keep Image for any images in main content/footer
import React, { useEffect, useRef } from 'react';

// Import the reusable Header component - simplified path
import Header from '../components/Header'; // <-- Changed from '../components/Header.tsx' to '../components/Header'

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
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - MarketPulse</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {/* Reusable Header Component */}
      <Header />

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
    </div>
  );
}
