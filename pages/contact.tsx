// pages/contact.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // 'success', 'error', 'sending'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setStatus(`error: ${errorData.error || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus(`error: ${error.message || 'Network error.'}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Us - MarketEdge Pro</title>
        <meta name="description" content="Get in touch with MarketEdge Pro for support, inquiries, or feedback." />
        {/* Favicon - Three Bars (ESLint fixed) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
       
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
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Contact Us</h1>
          <p className="text-center text-lg text-gray-700 mb-8">Have a question or need support? Send us a message!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="mt-4 text-center text-green-600 font-semibold">Your message has been sent successfully!</p>
            )}
            {status.startsWith('error') && (
              <p className="mt-4 text-center text-red-600 font-semibold">Error: {status.substring(7)}</p>
            )}
          </form>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/contact" className="text-white border-b-2 border-white pb-1">Contact</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition duration-300">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-gray-300 transition duration-300">Privacy Policy</Link>
          </div>
          <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}
