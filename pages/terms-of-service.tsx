// pages/terms-of-service.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-8">
      <Head>
        <title>Terms of Service - MarketEdge Pro</title>
        <meta name="description" content="Read the terms and conditions for using MarketEdge Pro services." />
      </Head>

      <header className="w-full max-w-5xl mx-auto py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-4 drop-shadow-md">Terms of Service</h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-2xl mx-auto">Please read these terms carefully before using our services.</p>
        <Link href="/" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the services provided by MarketEdge Pro (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>

        <h2>2. Use of Service</h2>
        <p>The Service is provided for your personal and non-commercial use. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content, trademarks, service marks, trade names, logos, and icons are proprietary to MarketEdge Pro. Nothing contained herein should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark displayed on this website without the written permission of MarketEdge Pro or such third party that may own the trademarks displayed on this website.</p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. MarketEdge Pro makes no representations or warranties of any kind, express or implied, as to the operation of their Service or the information, content or materials included therein.</p>

        <h2>5. Limitation of Liability</h2>
        <p>In no event shall MarketEdge Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

        <h2>6. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at [your contact email, e.g., support@marketedgepro.com].</p>
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12 bg-white bg-opacity-70 rounded-t-lg shadow-inner">
        <p className="text-gray-700">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}
