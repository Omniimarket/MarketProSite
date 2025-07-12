// pages/indicators/[slug].js
// Dynamic route for individual indicator detail pages, fetching content from Sanity, with Firebase-like design.
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { sanityClient, urlFor } from '../../lib/sanity.client';
import { SanityPortableText } from '../../lib/sanity.portabletext';

export default function IndicatorDetail({ indicator }) {
  if (!indicator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Indicator Not Found</title>
          {/* Favicon - Three Bars (from original HTML) */}
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect x=%2210%22 y=%2230%22 width=%2220%22 height=%2260%22 fill=%22%234f46e5%22/><rect x=%2240%22 y=%2220%22 width=%2220%22 height=%2270%22 fill=%22%233b82f6%22/><rect x=%2270%22 y=%2240%22 width=%2220%22 height=%2250%22 fill=%22%234f46e5%22/></svg>" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        </Head>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Indicator Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">The indicator you are looking for does not exist.</p>
        <Link href="/indicators" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            &larr; Back to Indicators
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{indicator.name} - MarketEdge Pro</title>
        <meta name="description" content={indicator.shortDescription} />
        {/* Favicon - Three Bars (from original HTML) */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect x=%2210%22 y=%2230%22 width=%2220%22 height=%2260%22 fill=%22%234f46e5%22/><rect x=%2240%22 y=%2220%22 width=%2220%22 height=%2270%22 fill=%22%233b82f6%22/><rect x=%2270%22 y=%2240%22 width=%2220%22 height=%2250%22 fill=%22%234f46e5%22/></svg>" />
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
              <li><Link href="/marketpulse" className="text-white hover:text-blue-200 transition duration-300">MarketPulse</Link></li>
              <li><Link href="/indicators" className="text-white font-semibold border-b-2 border-white pb-1">Indicators</Link></li>
              <li><Link href="/blog" className="text-white hover:text-blue-200 transition duration-300">Blog</Link></li>
              <li id="authLinks">
                  <Link href="/auth" className="bg-white text-blue-700 py-1 px-3 rounded-full text-sm font-semibold hover:bg-blue-100 transition duration-300 mr-2">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6 lg:p-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center">{indicator.name}</h1>
        <Link href="/indicators" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mt-6">
          &larr; Back to All Indicators
        </Link>

        <section className="w-full bg-white shadow-xl rounded-xl p-8 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="md:col-span-1">
              {indicator.coverImage && (
                <div className="relative w-full aspect-video rounded-xl shadow-lg overflow-hidden">
                  <Image
                    src={urlFor(indicator.coverImage).width(800).url()}
                    alt={indicator.coverImage.alt || indicator.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-1 text-left">
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{indicator.shortDescription}</p>
              {indicator.fullDetails && (
                <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed mb-8">
                  <SanityPortableText value={indicator.fullDetails} />
                </div>
              )}

              <p className="text-3xl font-extrabold text-green-700 mb-6">Price: {indicator.price}</p>
              {indicator.stripePaymentLinkUrl ? (
                <a
                  href={indicator.stripePaymentLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300 ease-in-out transform hover:scale-105 inline-block text-center focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Purchase Now
                </a>
              ) : (
                <button className="w-full px-8 py-4 bg-gray-400 text-white font-bold rounded-xl cursor-not-allowed shadow-md">
                  Purchase Link Not Set
                </button>
              )}
            </div>
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
    </div>
  );
}

export async function getStaticPaths() {
  const indicators = await sanityClient.fetch(`*[_type == "indicator"]{ "slug": slug.current }`);
  const paths = indicators.map((indicator) => ({ params: { slug: indicator.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const indicator = await sanityClient.fetch(`*[_type == "indicator" && slug.current == $slug][0]{
    name,
    slug,
    shortDescription,
    price,
    stripePaymentLinkUrl,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    fullDetails
  }`, { slug: params.slug });

  if (!indicator) {
    return {
      notFound: true,
      revalidate: 60
    };
  }

  return {
    props: { indicator },
    revalidate: 60
  };
}
