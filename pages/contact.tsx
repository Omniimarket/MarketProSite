// pages/contact.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'idle', 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // This is a placeholder for your Firebase Cloud Function API endpoint
      // You would replace '/api/email/send-contact-email' with the actual path
      // if you decide to implement a backend email sending service.
      // For now, this will just simulate a successful submission.
      const response = await fetch('/api/email/send-contact-email', {
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
        setStatus('error');
        console.error('Contact form submission failed:', errorData.error);
      }
    } catch (error) {
      setStatus('error');
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-8">
      <Head>
        <title>Contact Us - MarketEdge Pro</title>
        <meta name="description" content="Get in touch with MarketEdge Pro for support, inquiries, or feedback." />
      </Head>

      <header className="w-full max-w-5xl mx-auto py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-4 drop-shadow-md">Contact Us</h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-2xl mx-auto">We'd love to hear from you! Reach out with any questions, feedback, or support inquiries.</p>
        <Link href="/" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center mt-4">Your message has been sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-4">Failed to send message. Please try again later.</p>
          )}
        </form>
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12 bg-white bg-opacity-70 rounded-t-lg shadow-inner">
        <p className="text-gray-700">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}
