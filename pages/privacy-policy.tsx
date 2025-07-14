// pages/privacy-policy.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-8">
      <Head>
        <title>Privacy Policy - MarketEdge Pro</title>
        <meta name="description" content="Understand how MarketEdge Pro collects, uses, and protects your personal data." />
      </Head>

      <header className="w-full max-w-5xl mx-auto py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-4 drop-shadow-md">Privacy Policy</h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-2xl mx-auto">Your privacy is important to us. Learn how we handle your data.</p>
        <Link href="/" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
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

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12 bg-white bg-opacity-70 rounded-t-lg shadow-inner">
        <p className="text-gray-700">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}
