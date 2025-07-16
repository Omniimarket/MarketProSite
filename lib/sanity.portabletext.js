// lib/sanity.portabletext.js
// This file configures how Sanity Portable Text is rendered in your Next.js app.
// Updated: Added a custom component to render the 'horizontalRule' block type.

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from './sanity.client';

// Custom component to render the horizontal rule
const HorizontalRuleComponent = ({ value }) => {
  const { thickness, color, marginVertical } = value;
  return (
    <hr
      style={{
        border: 'none', // Remove default border
        borderTop: `${thickness || 1}px solid ${color || '#e5e7eb'}`, // Apply custom thickness and color
        margin: `${marginVertical || 24}px auto`, // Apply custom vertical margin, auto for horizontal centering
        width: '100%', // Ensure it spans full width
      }}
      className="max-w-prose mx-auto" // Optional: Add max-width and auto margins for better readability in prose
    />
  );
};

// Define custom components for Portable Text rendering
const components = {
  types: {
    image: ({ value }) => {
      if (!value.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            className="rounded-lg object-contain"
            src={urlFor(value).url()}
            alt={value.alt || 'Blog post image'}
            layout="fill"
            priority
          />
        </div>
      );
    },
    // Register the new horizontalRule component
    horizontalRule: HorizontalRuleComponent,
  },
  // Custom rendering for block styles (h1, h2, normal, blockquote)
  block: {
    h1: ({children}) => <h1 className="text-4xl font-extrabold text-gray-900 my-6">{children}</h1>,
    h2: ({children}) => <h2 className="text-3xl font-bold text-gray-800 my-5">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl font-semibold text-gray-700 my-4">{children}</h3>,
    normal: ({children}) => <p className="text-gray-700 leading-relaxed my-4">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-600">{children}</blockquote>,
  },
  // Custom rendering for lists
  list: {
    bullet: ({children}) => <ul className="list-disc pl-5 my-4 space-y-2">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>,
  },
  // Custom rendering for list items
  listItem: {
    bullet: ({children}) => <li className="text-gray-700">{children}</li>,
    number: ({children}) => <li className="text-gray-700">{children}</li>,
  },
  // Custom rendering for marks (inline formatting like links, bold, italic)
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
  },
};

export function SanityPortableText({ value }) {
  return <PortableText value={value} components={components} />;
}
