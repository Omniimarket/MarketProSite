// pages/blog/[slug].js
// Dynamic route for individual blog posts, fetching content from Sanity, with Firebase-like design.
// Now includes auto-generated Table of Contents embedded within the post content, minimized by default.
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { sanityClient, urlFor } from '../../lib/sanity.client';
import { SanityPortableText } from '../../lib/sanity.portabletext'; // Import PortableText component
import { useEffect, useState } from 'react'; // For TOC active state, smooth scroll, and toggle
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // For toggle icons

// Helper function to slugify text for IDs
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
};

export default function BlogPost({ post }) {
  // State for active heading in TOC (for highlighting)
  const [activeHeadingId, setActiveHeadingId] = useState('');
  // State for TOC expanded/collapsed - set to false to be minimized by default
  const [isTocExpanded, setIsTocExpanded] = useState(false);

  // Destructure width and height from mainImage metadata for responsive layout
  const featuredImageWidth = post.mainImage?.asset?.metadata?.dimensions?.width;
  const featuredImageHeight = post.mainImage?.asset?.metadata?.dimensions?.height;

  // Extract headings for Table of Contents
  const headings = post.body
    .filter((block) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style))
    .map((block) => {
      const text = block.children
        .filter((child) => child._type === 'span')
        .map((span) => span.text)
        .join('');
      return {
        style: block.style,
        text: text,
        id: slugify(text), // Generate slug for ID
      };
    });

  // Custom components for SanityPortableText to add IDs to headings
  const customPortableTextComponents = {
    block: {
      h1: ({ children }) => <h1 id={slugify(children[0])} className="text-4xl font-extrabold my-6">{children}</h1>,
      h2: ({ children }) => <h2 id={slugify(children[0])} className="text-3xl font-bold my-5">{children}</h2>,
      h3: ({ children }) => <h3 id={slugify(children[0])} className="text-2xl font-semibold my-4">{children}</h3>,
      h4: ({ children }) => <h4 id={slugify(children[0])} className="text-xl font-semibold my-3">{children}</h4>,
      h5: ({ children }) => <h5 id={slugify(children[0])} className="text-lg font-semibold my-2">{children}</h5>,
      h6: ({ children }) => <h6 id={slugify(children[0])} className="text-base font-semibold my-1">{children}</h6>,
      normal: ({ children }) => <p className="text-lg leading-relaxed my-4">{children}</p>,
      blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic my-4">{children}</blockquote>,
    },
  };

  // Effect for scroll spy to highlight active TOC item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // Trigger when heading is in the middle of the viewport
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]); // Re-run if headings change

  // Smooth scroll to heading
  const scrollToHeading = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Post Not Found</title>
          <link rel="icon" href="/favicon.png" type="image/png" />
          
        </Head>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            &larr; Back to Blog
        </Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{post.title} - MarketEdge Pro Blog</title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect x=%2210%22 y=%2230%22 width=%2220%22 height=%2260%22 fill=%22%234f46e5%22/><rect x=%2240%22 y=%2220%22 width=%2220%22 height=%2270%22 fill=%22%233b82f6%22/><rect x=%2270%22 y=%2240%22 width=%2220%22 height=%2250%22 fill=%22%234f46e5%22/></svg>" />
        
        {/* Custom styles to override prose for images */}
        <style jsx>{`
          .prose img {
            width: 100% !important; /* Force images to take full width of their container */
            max-width: 100% !important; /* Ensure they don't exceed it */
            margin-left: auto !important; /* Center images if they don't fill 100% due to aspect ratio */
            margin-right: auto !important;
            height: auto !important; /* Maintain aspect ratio */
          }
          /* This specific override ensures images within prose are not constrained by prose's default max-width */
          .prose :where(img):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
            margin-top: 2em; /* Add some vertical spacing */
            margin-bottom: 2em;
          }
        `}</style>
      </Head>

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg p-4">
        <div className="container mx-auto flex items-center">
          <Image
            src="/MainLogo2.png"
            alt="MarketProEdge Logo"
            width={350}
            height={70}
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto object-contain"
            priority
          />
          <nav className="ml-auto">
            <ul className="flex space-x-6 items-center">
              <li><Link href="/" className="text-white hover:text-blue-200 transition duration-300">Home</Link></li>
              <li><Link href="/marketpulse" className="text-white hover:text-blue-200 transition duration-300">MarketPulse</Link></li>
              <li><Link href="/indicators" className="text-white hover:text-blue-200 transition duration-300">Indicators</Link></li>
              <li><Link href="/blog" className="text-white font-semibold border-b-2 border-white pb-1">Blog</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 lg:p-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 text-center">{post.title}</h1>
        <p className="text-gray-700 text-base mb-2">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <p className="text-gray-700 text-base">Author: {post.author}</p>
        <Link href="/blog" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mt-6">
          &larr; Back to Blog
        </Link>

        {/* Main blog post content area, centered and constrained */}
        <section className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
          {post.mainImage && featuredImageWidth && featuredImageHeight ? (
            <div className="relative w-full mb-8">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt || post.title}
                width={featuredImageWidth}
                height={featuredImageHeight}
                layout="responsive"
                objectFit="cover"
                className="rounded-lg shadow-md"
                priority
              />
            </div>
          ) : (
            <div className="relative w-full aspect-w-16 aspect-h-9 mb-8 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <span className="text-gray-500 text-lg">No Featured Image</span>
            </div>
          )}

          {/* Table of Contents - Now integrated directly within the content section, minimized by default */}
          {headings.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 mt-4">
              <div
                className="flex justify-between items-center cursor-pointer text-gray-900 hover:text-blue-600 transition-colors"
                onClick={() => setIsTocExpanded(!isTocExpanded)}
              >
                <h3 className="text-xl font-bold">Table of Contents</h3>
                {isTocExpanded ? (
                  <ChevronUpIcon className="w-6 h-6 text-blue-600" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isTocExpanded ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <nav>
                  <ul className="space-y-2">
                    {headings.map((heading) => (
                      <li key={heading.id} className={`${heading.style}Level`}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToHeading(heading.id);
                            // Optionally collapse TOC after clicking a link
                            // setIsTocExpanded(false);
                          }}
                          className={`block text-gray-700 hover:text-blue-600 transition-colors ${
                            activeHeadingId === heading.id ? 'font-semibold text-blue-700' : ''
                          } ${
                            heading.style === 'h2' ? 'ml-0' :
                            heading.style === 'h3' ? 'ml-4 text-sm' :
                            heading.style === 'h4' ? 'ml-6 text-sm' :
                            'ml-8 text-xs'
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          {/* Prose content wrapper */}
          <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
            <SanityPortableText value={post.body} components={customPortableTextComponents} />
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MarketEdge Pro. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-white transition duration-300">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link>
          </div>
          <p className="text-xs mt-2 text-gray-400">Disclaimer: Trading insights are for informational purposes only and not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await sanityClient.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    publishedAt,
    author,
    description,
    mainImage {
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
    body[]{
      ...,
      _type == "image" => {
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
      }
    }
  }`, { slug: params.slug });

  if (!post) {
    return {
      notFound: true,
      revalidate: 60
    };
  }

  return {
    props: { post },
    revalidate: 60
  };
}
