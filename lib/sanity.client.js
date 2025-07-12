    // lib/sanity.client.js
    import { createClient } from 'next-sanity';
    import imageUrlBuilder from '@sanity/image-url';

    export const config = {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Get this from your Sanity project settings
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2023-03-20', // Use a consistent API version
      useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster delivery
    };

    export const sanityClient = createClient(config);

    // Helper function for generating image URLs
    const builder = imageUrlBuilder(sanityClient);

    export function urlFor(source) {
      return builder.image(source);
    }
    