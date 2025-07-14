// lib/sanity.client.js
// This file configures the Sanity client for fetching data.

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,     // Your Sanity dataset (e.g., "production")
  apiVersion: '2023-05-03', // Use a consistent API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster image delivery
};

// Create a Sanity client instance
export const sanityClient = createClient(config);

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
