// pages/marketpulse.js
// Page for TradingView widgets (formerly tradingview.js).
import Head from 'next/head';
import Link from 'next/link';

export default function MarketPulse() { // Component name changed to MarketPulse
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Head>
        <title>MarketEdge Pro - Market Pulse Widgets</title>
        <meta name="description" content="Integrate your favorite TradingView widgets and market insights." />
      </Head>

      <header className="w-full max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Pulse Widgets</h1>
        <p className="text-lg text-gray-700">A dedicated space for your essential market charts and tools.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Widgets Here</h2>
        <p className="text-gray-600 mb-6">
          You can embed TradingView widgets directly into this page.
          Visit <a href="https://www.tradingview.com/widget/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TradingView Widgets</a> to generate embed codes.
        </p>

        {/* Example TradingView Widget Placeholder */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 text-center text-gray-700">
          <p className="mb-2">
            This is a placeholder for a TradingView widget.
            Replace this div with your actual TradingView embed code.
          </p>
          <div className="tradingview-widget-container" style={{ height: '400px', width: '100%' }}>
            {/* <!-- TradingView Widget BEGIN --> */}
            {/* <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
            {
            "symbol": "FX_IDC:EURUSD",
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "light",
            "is");
            "transparent": false,
            "autosize": true,
            "largeChartUrl": ""
            }
            </script> */}
            {/* <!-- TradingView Widget END --> */}
            <p className="text-sm text-gray-500 mt-2">
              (Example: Mini Symbol Overview for EURUSD)
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12">
        <p className="text-gray-600">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}
