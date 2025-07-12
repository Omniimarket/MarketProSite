// pages/blog/[slug].js
// Dynamic route for individual blog posts.
import Head from 'next/head';
import Link from 'next/link';
import { sanityClient, urlFor } from '../../lib/sanity.client'; // Import sanityClient
import { SanityPortableText } from '../../lib/sanity.portabletext'; // Import PortableText component

export default function BlogPost({ post }) {
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Head><title>Post Not Found</title></Head>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Head>
        <title>{post.title} - MarketEdge Pro Blog</title>
        <meta name="description" content={post.description} />
      </Head>

      <header className="w-full max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <p className="text-gray-600 text-sm">Author: {post.author}</p>
        <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Blog
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg prose prose-blue max-w-none">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.mainImage.alt || post.title}
            className="w-full h-auto rounded-lg shadow-md mb-8"
          />
        )}
        <SanityPortableText value={post.body} />
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t border-gray-200 mt-12">
        <p className="text-gray-600">&copy; 2025 MarketEdge Pro</p>
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
        url
      },
      alt
    },
    body
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
