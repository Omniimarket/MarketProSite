// pages/indicators/[slug].js
// Dynamic route for individual indicator detail pages, fetching content from Sanity.
// Fixed: Thumbnail images are now square and sharp. Main image is sharp with robust zoom.

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '../../lib/sanity.client';
import { SanityPortableText } from '../../lib/sanity.portabletext';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function IndicatorDetail({ indicator }) {
    // State for collapsible full details - set to true to be open by default
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
    // State for collapsible disclosures - remains false to be closed by default
    const [isDisclosuresExpanded, setIsDisclosuresExpanded] = useState(false);

    // State for image gallery
    const [mainImageSrc, setMainImageSrc] = useState('');
    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

    // State for zoom functionality
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const zoomLevel = 2; // How much to zoom in (e.g., 2x magnification)

    // Set initial main image and active thumbnail when component mounts or indicator changes
    useEffect(() => {
        if (indicator?.galleryImages?.length > 0) {
            // Use a higher resolution for the main display image
            const initialImageUrl = urlFor(indicator.galleryImages[0]).width(1600).url(); // Increased resolution
            setMainImageSrc(initialImageUrl);
            setActiveThumbnailIndex(0);
        } else {
            setMainImageSrc('');
            setActiveThumbnailIndex(-1);
        }
    }, [indicator]);

    // Handle case where indicator data is not found
    if (!indicator) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 font-inter">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Indicator Not Found - MarketEdge Pro</title>
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

    // Function to handle thumbnail clicks, updating the main image and active index
    const handleThumbnailClick = (img, index) => {
        // Fetch a high-resolution version for the main display when a thumbnail is clicked
        const newImageUrl = urlFor(img).width(1600).url(); // Increased resolution
        setMainImageSrc(newImageUrl);
        setActiveThumbnailIndex(index);
        setIsZoomed(false); // Reset zoom when changing image
    };

    // Handle mouse movement for zoom
    const handleMouseMove = (e) => {
        if (!mainImageSrc) return; // Only zoom if there's an image

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.pageX - left) / width;
        const y = (e.pageY - top) / height;

        setZoomPosition({ x, y });
        // Only set zoomed to true if the mouse is over the image (handled by onMouseLeave)
    };

    // Handle mouse entering the image container
    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    // Handle mouse leaving the image container
    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    // Get the currently active image object to derive its dimensions for the main image container
    const currentMainImageObject = indicator.galleryImages?.[activeThumbnailIndex];
    const imageWidth = currentMainImageObject?.asset?.metadata?.dimensions?.width;
    const imageHeight = currentMainImageObject?.asset?.metadata?.dimensions?.height;
    // Calculate padding-bottom for aspect ratio. Default to 4:3 (75%) if dimensions are missing.
    const aspectRatioPadding = (imageHeight && imageWidth) ? (imageHeight / imageWidth) * 100 : 75;

    // Calculate transform for zoom effect
    const transformStyle = {
        transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
        transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
        transition: 'transform 0.1s ease-out', // Smooth transition for zoom
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{indicator.name} - MarketEdge Pro</title>
                <meta name="description" content={indicator.shortDescription} />
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect x=%2210%22 y=%2230%22 width=%2220%22 height=%2260%22 fill=%22%234f46e5%22/><rect x=%2240%22 y=%2220%22 width=%2220%22 height=%2270%22 fill=%22%233b82f6%22/><rect x=%2270%22 y=%2240%22 width=%2220%22 height=%2250%22 fill=%22%234f46e5%22/></svg>" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>

            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-4">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Image
                        src="/MainLogo2.png"
                        alt="MarketProEdge Logo"
                        width={350}
                        height={70}
                        className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto object-contain"
                        priority
                    />
                    <nav className="space-x-4">
                        <Link href="/" className="hover:text-blue-200 transition duration-300">Home</Link>
                        <Link href="/marketpulse" className="hover:text-blue-200 transition duration-300">MarketPulse</Link>
                        <Link href="/indicators" className="text-white border-b-2 border-white pb-1">Indicators</Link>
                        <Link href="/blog" className="hover:text-blue-200 transition duration-300">Blog</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto py-12 px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/indicators" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                        <ChevronDownIcon className="w-5 h-5 mr-1 rotate-90" />
                        Back to All Indicators
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-xl">
                    <section>
                        {/* Main Display Image Container with Zoom */}
                        <div className="relative w-full rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200 group"
                             onMouseMove={handleMouseMove}
                             onMouseEnter={handleMouseEnter} // Trigger zoom on mouse enter
                             onMouseLeave={handleMouseLeave} // Disable zoom on mouse leave
                             style={{ paddingBottom: imageWidth && imageHeight ? `${(imageHeight / imageWidth) * 100}%` : '75%' }}
                        >
                            {mainImageSrc ? (
                                <Image
                                    src={mainImageSrc}
                                    alt={indicator.name + ' screenshot'}
                                    layout="fill"
                                    objectFit="contain" // Keep 'contain' for main image to prevent stretching/cropping
                                    className="rounded-lg cursor-zoom-in"
                                    priority
                                    style={transformStyle} // Apply zoom transform
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full w-full absolute top-0 left-0 text-gray-500">No Image Available</div>
                            )}
                        </div>
                        {/* Thumbnail Images */}
                        {indicator?.galleryImages?.length > 1 && (
                            <div className="mt-4 grid grid-cols-4 gap-2">
                                {indicator.galleryImages.map((img, index) => (
                                    <div
                                        key={img.asset._ref}
                                        className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                                            activeThumbnailIndex === index ? 'border-blue-500' : 'border-transparent hover:border-blue-300'
                                        } bg-white`}
                                        onClick={() => handleThumbnailClick(img, index)}
                                    >
                                        <Image
                                            src={urlFor(img).width(400).height(400).url()} // Increased resolution for thumbnails
                                            alt={img.alt || `Thumbnail ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover" // Changed to 'cover' for thumbnails to fill the square space
                                            className="rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{indicator.name}</h1>
                            <p className="text-lg text-gray-700 mb-6">{indicator.shortDescription}</p>

                            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-blue-700 mb-2">Key Information</h2>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li><strong>Access:</strong> Lifetime access included</li>
                                    <li><strong>Updates:</strong> Free future updates</li>
                                    <li><strong>Compatibility:</strong> Designed for popular trading platforms (e.g., Thinkorswim)</li>
                                    <li><strong>Delivery:</strong> Instant digital download available in your dashboard after purchase</li>
                                </ul>
                            </div>

                            {indicator.fullDetails && (
                                <div className="mb-8">
                                    <h2
                                        className="text-2xl font-bold text-gray-800 cursor-pointer flex items-center justify-between py-2 border-b border-gray-200 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                                    >
                                        Full Details
                                        {isDetailsExpanded ? <ChevronUpIcon className="w-6 h-6 text-blue-600" /> : <ChevronDownIcon className="w-6 h-6 text-blue-600" />}
                                    </h2>
                                    <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isDetailsExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                        <div className="prose prose-lg text-gray-700 max-w-none">
                                            <SanityPortableText value={indicator.fullDetails} />
                                        </div>
                                        {!isDetailsExpanded && (
                                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-3xl font-extrabold text-indigo-700 mb-4">Price: {indicator.price}</p>
                            {indicator.lemonSqueezyProductUrl ? (
                                <a
                                    href={indicator.lemonSqueezyProductUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-lg py-4 text-center text-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                                >
                                    Purchase Now
                                </a>
                            ) : (
                                <button
                                    className="block w-full bg-gray-400 text-white font-semibold rounded-lg py-4 text-center text-xl cursor-not-allowed shadow-md"
                                    disabled
                                >
                                    Purchase Link Unavailable
                                </button>
                            )}
                        </div>
                    </section>
                </div>

                <section className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-md">
                    <h2
                        className="text-2xl font-bold text-yellow-800 cursor-pointer flex items-center justify-between py-2 border-b border-yellow-200 hover:text-yellow-900 transition-colors"
                        onClick={() => setIsDisclosuresExpanded(!isDisclosuresExpanded)}
                    >
                        Important Notes & Disclosures
                        {isDisclosuresExpanded ? <ChevronUpIcon className="w-6 h-6 text-yellow-800" /> : <ChevronDownIcon className="w-6 h-6 text-yellow-800" />}
                    </h2>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDisclosuresExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <div className="text-gray-700 text-sm prose prose-sm max-w-none">
                            <p className="font-semibold mb-3">
                                <strong>Note:</strong> All purchases provide lifetime access and include future updates. Compatibility with popular trading platforms. Download available instantly after purchase.
                            </p>

                            <h3 className="text-lg font-semibold text-red-700 mt-4 mb-2">Legal Disclaimer & Risk Warning</h3>
                            <ul className="list-disc list-inside space-y-2 font-semibold">
                                <li><strong>No Investment Advice:</strong> The indicators, tools, and strategies provided are for informational and educational purposes only and do not constitute financial, investment, or trading advice. You are solely responsible for your trading and investment decisions.</li>
                                <li><strong>No Guarantee of Performance:</strong> Past performance is not indicative of future results. Trading in financial markets involves substantial risk, including the potential loss of capital. There are no guarantees or assurances that any indicator, strategy, or tool will result in profits or avoid losses.</li>
                                <li><strong>Hypothetical & Simulated Results:</strong> Any performance results displayed (backtests, examples, or hypothetical scenarios) may not reflect actual trading conditions and do not account for slippage, fees, or other real-world factors. Hypothetical performance has inherent limitations and should not be relied upon as a predictor of future success.</li>
                                <li><strong>No Liability:</strong> By purchasing and using these indicators, you agree that the seller, creator, and affiliates are not liable for any losses, damages, or claims arising from the use (or misuse) of these tools. You assume all risks associated with trading.</li>
                                <li><strong>No Refund Policy:</strong> Due to the digital nature of the product, all sales are final. No refunds will be issued.</li>
                                <li><strong>Compatibility Note:</strong> While the indicators are designed for popular platforms like Thinkorswim, compatibility is not guaranteed for all versions or future updates. Users are responsible for ensuring proper functionality within their trading environment.</li>
                                <li><strong>Consult a Professional:</strong> Before making any financial decisions, consult a licensed financial advisor or conduct your own due diligence.</li>
                            </ul>
                            <p className="mt-4 font-semibold text-gray-800">By purchasing, you acknowledge that you have read, understood, and agreed to this disclaimer in full.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
                    <div className="mt-2 space-x-4 text-sm">
                        <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
                        <Link href="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
                        <Link href="/terms-of-service" className="hover:text-gray-300 transition duration-300">Terms of Service</Link>
                        <Link href="/privacy-policy" className="hover:text-gray-300 transition duration-300">Privacy Policy</Link>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
                </div>
            </footer>
        </div>
    );
}

// getStaticPaths and getStaticProps remain the same as they handle data fetching
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
        lemonSqueezyProductUrl, // Ensure this is fetched for Lemon Squeezy integration
        galleryImages[] {
            asset->{
                _id,
                url,
                metadata{
                    dimensions{
                        width,
                        height
                    }
                }
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
