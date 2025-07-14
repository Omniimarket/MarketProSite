// pages/terms-of-service.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Assuming Image is used for the logo

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terms of Service - MarketEdge Pro</title>
        <meta name="description" content="Read the terms of service for MarketEdge Pro." />
        {/* Favicon - Three Bars (ESLint fixed) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/MainLogo2.png"
              alt="MarketProEdge Logo"
              width={350}
              height={70}
              className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto object-contain"
              priority
            />
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-blue-200 transition duration-300">Home</Link>
            <Link href="/marketpulse" className="hover:text-blue-200 transition duration-300">MarketPulse</Link>
            <Link href="/indicators" className="hover:text-blue-200 transition duration-300">Indicators</Link>
            <Link href="/blog" className="hover:text-blue-200 transition duration-300">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-6 lg:px-8 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>

          <div className="prose prose-lg text-gray-700 max-w-none">
            <p>Welcome to MarketEdge Pro! These Terms of Service (the &quot;Terms&quot;) govern your access to and use of the MarketEdge Pro website and its services, including but not limited to the purchase and use of trading indicators and related content. By accessing or using our website, you agree to be bound by these Terms.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using MarketEdge Pro, you signify your acceptance of these Terms. If you do not agree to these Terms, you should not use our services.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. No Investment Advice</h2>
            <p className="font-semibold text-red-700">The information, trading indicators, tools, and strategies provided on MarketEdge Pro are for informational and educational purposes only. They do not constitute financial, investment, trading, or any other form of advice. We are not financial advisors, and nothing on this website should be construed as a recommendation to buy, sell, or hold any security or engage in any investment strategy.</p>
            <p>You are solely responsible for your own trading and investment decisions. Always consult with a qualified financial professional before making any investment decisions.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Risk Warning</h2>
            <p className="font-semibold text-red-700">Trading in financial markets carries a high level of risk, and it is not suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose.</p>
            <p>Past performance is not indicative of future results. Hypothetical or simulated performance results have certain inherent limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, since the trades have not been executed, the results may have under-compensated or over-compensated for the impact, if any, of certain market factors, such as lack of liquidity. Simulated trading programs in general are also subject to the fact that they are designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Digital Product Sales</h2>
            <p>All sales of digital products (e.g., trading indicators, e-books, courses) on MarketEdge Pro are final. Due to the digital nature of these products, we do not offer refunds. Please ensure you have read the product descriptions and are confident in your purchase before completing the transaction.</p>
            <p>Purchases include lifetime access to the purchased indicator and free future updates, unless otherwise specified. Compatibility with specific trading platforms (e.g., Thinkorswim) is generally designed for, but not guaranteed for all versions or future updates of such platforms. Users are responsible for ensuring proper functionality within their trading environment.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content on this website, including but not limited to text, graphics, logos, images, digital downloads, and trading indicators, is the property of MarketEdge Pro or its content suppliers and is protected by international copyright laws. You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the service, use of the service, or access to the service without express written permission from us.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. User Conduct</h2>
            <p>You agree not to use the website for any unlawful purpose or any purpose prohibited by these Terms. You agree not to:</p>
            <ul>
              <li>Engage in any activity that interferes with or disrupts the website or the servers and networks connected to the website.</li>
              <li>Attempt to gain unauthorized access to any portion of the website or any other accounts, computer systems, or networks connected to the website.</li>
              <li>Transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Limitation of Liability</h2>
            <p>In no event shall MarketEdge Pro, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of [Your State/Country, e.g., California, USA], without regard to its conflict of law provisions.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@marketproedge.com" className="text-blue-600 hover:underline">support@marketproedge.com</a>.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="text-white border-b-2 border-white pb-1">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-gray-300 transition duration-300">Privacy Policy</Link>
          </div>
          <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}
