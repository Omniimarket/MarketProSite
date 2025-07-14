// lib/sanity.portabletext.js
// This file configures the Portable Text React component for rendering Sanity content.
// It now allows merging custom components passed from parent components (like blog/[slug].js).

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from './sanity.client';

// Define default components for Portable Text rendering
const defaultComponents = {
  types: {
    image: ({ value }) => {
      if (!value || !value.asset || !value.asset.metadata || !value.asset.metadata.dimensions) {
        return null;
      }

      const { width, height } = value.asset.metadata.dimensions;
      const imageUrl = urlFor(value).url();

      return (
        <div className="my-8 relative w-full h-auto" style={{ paddingBottom: `${(height / width) * 100}%` }}>
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-md"
            priority={false}
          />
        </div>
      );
    },
  },
  block: {
    // Default block rendering (can be overridden by passed components)
    h1: ({ children }) => <h1 className="text-4xl font-extrabold my-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold my-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-3">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-semibold my-2">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-semibold my-1">{children}</h6>,
    normal: ({ children }) => <p className="text-lg leading-relaxed my-4">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic my-4">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside ml-4 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside ml-4 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

// Export SanityPortableText component that merges default and custom components
export function SanityPortableText({ value, components: customComponents = {} }) {
  // Merge default components with any custom components passed in
  const mergedComponents = {
    ...defaultComponents,
    types: {
      ...defaultComponents.types,
      ...customComponents.types,
    },
    block: {
      ...defaultComponents.block,
      ...customComponents.block,
    },
    list: {
      ...defaultComponents.list,
      ...customComponents.list,
    },
    listItem: {
      ...defaultComponents.listItem,
      ...customComponents.listItem,
    },
    marks: {
      ...defaultComponents.marks,
      ...customComponents.marks,
    },
  };

  return <PortableText value={value} components={mergedComponents} />;
}
