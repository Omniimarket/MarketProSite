    // lib/sanity.portabletext.js
    import { PortableText } from '@portabletext/react';
    import { urlFor } from './sanity.client';
    import Image from 'next/image';

    const components = {
      types: {
        image: ({ value }) => {
          if (!value.asset?._ref) {
            return null;
          }
          return (
            <div className="relative w-full h-96 my-8">
              <Image
                className="rounded-lg object-cover"
                alt={value.alt || ' '}
                src={urlFor(value).width(800).url()}
                fill
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          );
        },
      },
      block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
        normal: ({ children }) => <p className="my-2">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">{children}</blockquote>,
      },
      list: {
        bullet: ({ children }) => <ul className="list-disc list-inside ml-4 my-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside ml-4 my-2">{children}</ol>,
      },
      listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
      },
      marks: {
        em: ({ children }) => <em>{children}</em>,
        strong: ({ children }) => <strong>{children}</strong>,
        link: ({ value, children }) => {
          const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
          return (
            <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-blue-600 hover:underline">
              {children}
            </a>
          );
        },
      },
    };

    export function SanityPortableText({ value }) {
      return <PortableText value={value} components={components} />;
    }
    