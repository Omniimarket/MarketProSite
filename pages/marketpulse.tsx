// pages/marketpulse.tsx
// This page integrates TradingView widgets, fetches news from multiple RSS feeds,
// and includes an AI-generated daily market summary using Gemini 2.0 Flash.
// Updated: Precise fix for Advanced Chart dimensions, only two TradingView widgets.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { parseStringPromise } from 'xml2js';

// Define the structure for a news article from the RSS feed
interface RssArticle {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string;
  category?: string;
  sourceName?: string;
}

// Define the structure for an RSS item from xml2js parsing
interface RssItem {
  '#text'?: string; // For cases where content is directly in a text node
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string;
  category?: string;
}


// Define the props for the MarketPulse component
interface MarketPulseProps {
  news: RssArticle[];
  aiSummary: string;
  summaryLastUpdated: string; // New prop for the summary's last updated time
}

export default function MarketPulse({ news, aiSummary, summaryLastUpdated }: MarketPulseProps) {
  // Refs for each TradingView widget container - ONLY TWO WIDGETS
  // These refs will now point to the outermost 'tradingview-widget-container' div
  const tickerTapeRef = useRef<HTMLDivElement>(null);
  const advancedChartRef = useRef<HTMLDivElement>(null);
  // Removed: technicalAnalysisRef, financialsRef, economicCalendarRef, timelineRef

  // State for current page path to fix hydration mismatch
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // This runs only on the client-side after hydration
    if (typeof window !== 'undefined') {
      setCurrentPage(window.location.pathname);
    }
  }, []);

  // State for the floating article panel
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<RssArticle | null>(null);

  // Function to open the article panel
  const openArticlePanel = (article: RssArticle) => {
    setSelectedArticle(article);
    setIsPanelOpen(true);
  };

  // Function to close the article panel
  const closeArticlePanel = () => {
    setIsPanelOpen(false);
    setSelectedArticle(null);
  };

  // Function to load a TradingView widget by appending only the script tag
  // The static HTML structure for the widget container is now in the JSX.
  const loadTradingViewWidget = (containerRef: React.MutableRefObject<HTMLDivElement | null>, scriptSrc: string, config: object, innerContainerId: string) => {
    if (containerRef.current) {
      // Remove any existing script to prevent duplicates on re-renders
      const existingScript = containerRef.current.querySelector(`script[src="${scriptSrc}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      // The TradingView script will find its container by the 'container' property in the config.
      // We ensure the inner div has the correct ID.

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.type = 'text/javascript';

      // Place the JSON configuration directly as the innerHTML of the script tag.
      // IMPORTANT: Add the 'container' property to the config, pointing to the inner div's ID.
      script.innerHTML = JSON.stringify({ ...config, container: innerContainerId });

      // Append the script to the main container div (which holds the inner widget div)
      containerRef.current.appendChild(script);
    }
  };

  // useEffects for TradingView Widgets - ONLY TWO WIDGETS
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
      // Pass the ID of the inner widget div to the load function
      loadTradingViewWidget(tickerTapeRef, "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js", config, "ticker-tape-inner-widget");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = {
        "allow_symbol_change": true, // This is the key property for symbol search
        "calendar": false,
        "details": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": false, // IMPORTANT: Set to false to show the top toolbar with symbol search
        "hide_legend": false,
        "hide_volume": false,
        "hotlist": false,
        "interval": "D",
        "locale": "en",
        "save_image": true,
        "style": "1",
        "symbol": "NASDAQ:AAPL", // Initial symbol
        "theme": "dark",
        "timezone": "Etc/UTC",
        "backgroundColor": "#0F0F0F",
        "gridColor": "rgba(242, 242, 242, 0.06)",
        "watchlist": [],
        "withdateranges": false,
        "compareSymbols": [],
        "studies": [],
        "autosize": true
      };
      // Pass the ID of the inner widget div to the load function
      loadTradingViewWidget(advancedChartRef, "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js", config, "advanced-chart-inner-widget");
    }
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter hide-scrollbar">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MarketEdge Pro - MarketPulse</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
        

      {/* Header Section - Consistent with other pages */}
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
                ${currentPage === '/' ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >Home</Link>
            <Link
              href="/marketpulse"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${currentPage === '/marketpulse' ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >MarketPulse</Link>
            <Link
              href="/indicators"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${currentPage.startsWith('/indicators') ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >Indicators</Link>
            <Link
              href="/blog"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                ${currentPage.startsWith('/blog') ? 'text-white border-b-2 border-white pb-1' : 'hover:text-blue-200'}
              `}
            >Blog</Link>
            {/* Discord Invite Link in Header */}
            <a
              href="https://discord.gg/ubyujKjNkF"
              target="_blank"
              rel="noopener noreferrer"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                hover:text-blue-200
              `}
            >Discord</a>
          </nav>
        </div>
      </header>


      {/* Main Content Area - TradingView Widgets and RSS News */}
      <main className="flex-grow container mx-auto p-6 lg:p-10 flex flex-col items-center">
          {/* TradingView Ticker Tape Widget - Positioned at the very top */}
        <section className="bg-white rounded-xl shadow-md p-2 w-full mb-8">
            {/* Static HTML structure for Ticker Tape Widget */}
            <div className="tradingview-widget-container" ref={tickerTapeRef} style={{ height: 'auto', width: '100%' }}>
              {/* Added ID to the inner widget div */}
              <div id="ticker-tape-inner-widget" className="tradingview-widget-container__widget" style={{ height: '70px', width: '100%' }}></div> {/* Adjust height as needed for ticker tape */}
              <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
              {/* Script will be injected here by useEffect */}
            </div>
        </section>


        {/* AI-Generated Market Summary Section */}
        <section className="bg-white rounded-xl shadow-2xl p-8 w-full mb-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Daily Market Snapshot (AI-Powered)</h2>
            {aiSummary ? (
                <>
                    <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                        {aiSummary}
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-4">
                        Last Updated: {summaryLastUpdated}
                    </p>
                </>
            ) : (
                <p className="text-lg text-gray-500 text-center">Loading today&apos;s market summary...</p>
            )}
        </section>

        

        {/* TradingView Advanced Chart Widget */}
        <section className="bg-white rounded-xl shadow-2xl p-8 w-full h-[800px] mb-8 flex flex-col">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center flex-shrink-0">MarketPulse Live Chart</h2>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-3xl mx-auto flex-shrink-0">
                Track and analyze market movements with this interactive chart, powered by TradingView.
            </p>
            {/* Static HTML structure for Advanced Chart Widget */}
            <div className="tradingview-widget-container flex-grow relative" ref={advancedChartRef} style={{width:'100%', height:'100%'}}>
              {/* Added ID to the inner widget div */}
              <div id="advanced-chart-inner-widget" className="tradingview-widget-container__widget" style={{height:'calc(100% - 32px)', width:'100%'}}></div>
              <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
              {/* Script will be injected here by useEffect */}
            </div>
        </section>

        {/* Removed: Technical Analysis and Financials Widgets section */}
        {/* Removed: Economic Calendar and Timeline Widgets section */}

        {/* Latest Market News Section (from multiple RSS feeds) */}
        <section className="bg-white rounded-xl shadow-2xl p-8 w-full mb-8 mt-8">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Latest Market News</h2>
          {news.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">No news articles found or failed to load.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => {
                const title = article.title || 'No Title';
                const description = article.description || 'No description available.';
                const pubDate = article.pubDate || '';
                const sourceName = article.sourceName || 'Unknown Source';

                const publishedDate = pubDate ? new Date(pubDate).getTime() : 0;
                const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'Date N/A';

                return (
                  <div
                    key={index}
                    onClick={() => openArticlePanel(article)}
                    className="block bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
                  >
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{title}</h3>
                      <p className="text-gray-700 text-sm mb-3 line-clamp-3">{description}</p>
                      <div className="flex justify-between items-center text-gray-600 text-xs">
                        <span>{sourceName}</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Standard Footer Component */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition duration-300">Privacy Policy</Link>
            {/* Discord Invite Link */}
            <a
              href="https://discord.gg/ubyujKjNkF"
              target="_blank"
              rel="noopener noreferrer"
              className={`py-1 transition duration-300
                text-xs sm:text-sm md:text-base lg:text-base
                hover:text-blue-200
              `}
            >Discord</a>
          </div>
          {/* Fix: Escaped apostrophe in the disclaimer text */}
          <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>

      {/* Article Viewer Floating Panel (Centered) */}
      {isPanelOpen && selectedArticle && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      bg-white rounded-xl shadow-2xl p-6 md:p-8 z-50
                      max-w-md w-11/12 md:w-1/2 lg:w-1/3 transition-transform duration-300 ease-in-out
                      ${isPanelOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                      max-h-[90vh] overflow-y-auto`}
        >
          <button
            onClick={closeArticlePanel}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{selectedArticle.title}</h3>
          <p className="text-xs text-gray-600 mb-3">
            Published: {selectedArticle.pubDate ? new Date(selectedArticle.pubDate).toLocaleDateString() : 'Date N/A'}
            {' | '}
            Source: {selectedArticle.sourceName || 'Unknown Source'}
          </p>
          <div className="text-gray-800 leading-relaxed text-sm mb-6">
            <p>{selectedArticle.description}</p>
          </div>
          <a
            href={selectedArticle.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-center text-sm"
          >
            Read Full Article on {selectedArticle.sourceName || 'External Site'}
          </a>
        </div>
      )}

      {/* Inline styles to hide scrollbar specifically for this page's main container */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}

// getServerSideProps to fetch and parse the RSS feeds and generate AI summary on the server
export async function getServerSideProps() {
  let allNews: RssArticle[] = [];
  let aiSummary: string = '';
  let summaryLastUpdated: string = '';

  const rssFeeds = [
    { url: 'https://www.nasdaq.com/feed/rssoutbound?category=Stocks', sourceName: 'Nasdaq.com' },
    { url: 'https://www.investing.com/rss/news_25.rss', sourceName: 'Investing.com' },
  ];

  try {
    const fetchPromises = rssFeeds.map(async (feed) => {
      try {
        const response = await fetch(feed.url);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch RSS feed from ${feed.sourceName}: ${response.status} - ${response.statusText}. Response: ${errorText.substring(0, 200)}`);
          return [];
        }

        const xmlText = await response.text();
        const result = await parseStringPromise(xmlText, {
          explicitArray: false,
          ignoreAttrs: true,
          trim: true,
          charkey: '#text',
        });

        if (result && result.rss && result.rss.channel && Array.isArray(result.rss.channel.item)) {
          return result.rss.channel.item.map((item: RssItem) => ({
            title: item.title || 'No Title',
            link: item.link || '#',
            description: item.description || 'No description available.',
            pubDate: item.pubDate || '',
            sourceName: feed.sourceName,
          }));
        } else {
          console.warn(`RSS feed structure unexpected or no items found for ${feed.sourceName}:`, result);
          return [];
        }
      } catch (error) {
        console.error(`Error fetching or parsing RSS feed from ${feed.sourceName}:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    allNews = results.flat();

    allNews.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    });

    if (allNews.length > 0) {
      const topArticles = allNews.slice(0, 10);
      const newsContentForLLM = topArticles.map(article =>
        `Title: ${article.title}\nDescription: ${article.description}`
      ).join('\n\n');

      const prompt = `Summarize the following stock market news articles into a concise, 2-3 paragraph daily market overview. Focus on key events, major company news and overall market sentiment. Do not include a title for the summary.

      News Articles:
      ${newsContentForLLM}
      `;

      try {
        const chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = process.env.GEMINI_API_KEY || ''; // Read from .env.local

        // --- DEBUGGING LOG ---
        console.log({ geminiApiKeyFromEnv: apiKey });
        // --- END DEBUGGING LOG ---

        if (!apiKey) {
            console.error("GEMINI_API_KEY environment variable is not set!");
            aiSummary = "API key missing. Please set GEMINI_API_KEY in your .env.local file.";
        } else {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            console.log("Attempting to fetch AI summary from Gemini API...");
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            console.log(`Gemini API Response Status: ${response.status} - ${response.statusText}`);
            const result = await response.json();
            console.log("Gemini API Full Response Body:", JSON.stringify(result, null, 2));

            if (response.ok && result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              aiSummary = result.candidates[0].content.parts[0].text;
              console.log("AI summary generated successfully.");
              summaryLastUpdated = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              });
            } else {
              console.error("LLM did not return a valid summary structure or response was not OK.");
              aiSummary = "Could not generate today's market summary. Please check back later.";
            }
        }
      } catch (llmError: unknown) {
        console.error("Error generating AI summary:", llmError);
        if (llmError instanceof Error) {
            console.error("AI Summary Error Message:", llmError.message);
        } else if (typeof llmError === 'object' && llmError !== null && 'message' in llmError) {
            console.error("AI Summary Error Message:", (llmError as { message: string }).message);
        }
        aiSummary = "Failed to generate market summary due to an internal error.";
      }
    } else {
      aiSummary = "No news articles available to generate a summary.";
    }

  } catch (error) {
    console.error("Error in getServerSideProps fetching multiple RSS feeds or generating AI summary:", error);
  }

  return {
    props: {
      news: allNews,
      aiSummary,
      summaryLastUpdated,
    },
  };
}
