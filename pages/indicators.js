// pages/indicators.js
// Indicators listing page, fetching products from Sanity.
import Head from 'next/head';
import Link from 'next/link';
import { sanityClient, urlFor } from '../lib/sanity.client'; // Import sanityClient

export default function Indicators({ indicators }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Head>
        <title>MarketEdge Pro - Indicators</title>
        <meta name="description" content="Explore our powerful trading indicators." />
      </Head>

      <header className="w-full max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Indicators</h1>
        <p className="text-lg text-gray-700">Discover tools to enhance your trading strategy.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        {indicators.length === 0 ? (
          <p className="text-gray-600">No indicators found. Add some in Sanity Studio!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indicators.map((indicator) => (
              <div key={indicator.slug.current} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col">
                {indicator.coverImage && (
                  <img
                    src={urlFor(indicator.coverImage).width(300).height(200).url()}
                    alt={indicator.coverImage.alt || indicator.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{indicator.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{indicator.shortDescription}</p>
                <Link href={`/indicators/${indicator.slug.current}`} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-center">
                    View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12">
        <p className="text-gray-600">&copy; 2025 MarketEdge Pro</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const indicators = await sanityClient.fetch(`*[_type == "indicator"] {
    name,
    slug,
    shortDescription,
    price,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`);
  return {
    props: { indicators },
    revalidate: 60
  };
}
