// pages/privacy-policy.tsx
// Updated: Integrated the standard responsive header and footer for consistency across the site.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter"> {/* Changed background for consistency */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Privacy Policy - MarketEdge Pro</title>
        <meta name="description" content="Understand how MarketEdge Pro collects, uses, and protects your personal data." />
        {/* Custom Favicon from /public directory (PNG) */}
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
          <nav className="flex flex-nowrap overflow-x-auto whitespace-nowrap -mx-2 px-2 md:space-x-4">
            <Link href="/" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Home</Link>
            <Link href="/marketpulse" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">MarketPulse</Link>
            <Link href="/indicators" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Indicators</Link>
            <Link href="/blog" className="px-2 py-1 hover:text-blue-200 transition duration-300 text-sm md:text-base">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed mt-12"> {/* Added mt-12 for spacing */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-8 drop-shadow-md">Privacy Policy</h1> {/* Adjusted h1 size */}
        <p className="text-lg md:text-xl text-gray-800 mb-6 text-center max-w-2xl mx-auto">Your privacy is important to us. Learn how we handle your data.</p>
        
        {/* Original content of the Privacy Policy page */}
        <h2>1. Information We Collect</h2>
        <p>We collect various types of information in connection with the services we provide, including:</p>
        <ul>
          <li><strong>Personal Data:</strong> Email address, name, and payment information when you make a purchase.</li>
          <li><strong>Usage Data:</strong> Information on how the Service is accessed and used (e.g., IP address, browser type, pages visited).</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <p>MarketEdge Pro uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service.</li>
          <li>To notify you about changes to our Service.</li>
          <li>To provide customer support.</li>
          <li>To detect, prevent and address technical issues.</li>
          <li>To process your purchases and deliver products.</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>The security of your data is important to us. We strive to use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.</p>

        <h2>4. Disclosure of Data</h2>
        <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
        <ul>
          <li>Comply with a legal obligation.</li>
          <li>Protect and defend the rights or property of MarketEdge Pro.</li>
          <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
          <li>Protect the personal safety of users of the Service or the public.</li>
          <li>Protect against legal liability.</li>
        </ul>

        <h2>5. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have the following data protection rights:</p>
        <ul>
          <li>The right to access, update or to delete the information we have on you.</li>
          <li>The right to rectify your information.</li>
          <li>The right to object to our processing of your Personal Data.</li>
          <li>The right to request the restriction of the processing of your personal information.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent.</li>
        </ul>
        <p>Please note that we may ask you to verify your identity before responding to such requests.</p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at [your contact email, e.g., privacy@marketedgepro.com].</p>
      </main>

      {/* Standard Footer Component */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition duration-300">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-white border-b-2 border-white pb-1">Privacy Policy</Link> {/* Highlight current page */}
          </div>
          <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}
