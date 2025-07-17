// pages/api/market-data.ts
// This API route consolidates fetching RSS news and generating an AI summary using Gemini.
// It is called client-side to provide all necessary market data.

import type { NextApiRequest, NextApiResponse } from 'next';
import { parseStringPromise } from 'xml2js';

// Define the structure for a news article from the RSS feed
interface RssArticle {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string;
  category?: string;
  sourceName?: string;
}

// Define the structure for an RSS item from xml2js parsing
interface RssItem {
  '#text'?: string;
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string;
  category?: string;
}

interface ApiResponse {
  news: RssArticle[];
  aiSummary: string;
  summaryLastUpdated: string;
  error?: string; // Optional error message for partial failures
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method !== 'GET') { // This API route will be a GET request from the client
    return res.status(405).json({ error: 'Method Not Allowed. This API route only accepts GET requests.' });
  }

  let allNews: RssArticle[] = [];
  let aiSummary: string = '';
  let summaryLastUpdated: string = '';
  let apiRouteError: string | undefined;

  const rssFeeds = [
    { url: 'https://www.nasdaq.com/feed/rssoutbound?category=Stocks', sourceName: 'Nasdaq.com' },
    { url: 'https://www.investing.com/rss/news_25.rss', sourceName: 'Investing.com' },
  ];

  const FETCH_TIMEOUT_MS = 10000; // 10 seconds timeout for RSS fetches and Gemini API call

  // --- Step 1: Fetch RSS Feeds (Server-to-Server) ---
  try {
    console.log("API Route (market-data): Starting RSS news fetch...");
    const fetchPromises = rssFeeds.map(async (feed) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.warn(`API Route (market-data): Fetch to ${feed.sourceName} timed out, aborting.`);
        controller.abort();
      }, FETCH_TIMEOUT_MS);

      try {
        const response = await fetch(feed.url, { signal: controller.signal });
        clearTimeout(timeoutId);
        console.log(`API Route (market-data): Response status for ${feed.sourceName}: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Route (market-data): Failed to fetch RSS feed from ${feed.sourceName}: ${response.status} - ${response.statusText}. Response: ${errorText.substring(0, 200)}`);
          return [];
        }

        const xmlText = await response.text();
        const result = await parseStringPromise(xmlText, {
          explicitArray: false,
          ignoreAttrs: true,
          trim: true,
          charkey: '#text',
        });

        if (result && result.rss && result.rss.channel && Array.isArray(result.rss.channel.item)) {
          return result.rss.channel.item.map((item: RssItem) => ({
            title: item.title || 'No Title',
            link: item.link || '#',
            description: item.description || 'No description available.',
            pubDate: item.pubDate || '',
            sourceName: feed.sourceName,
          }));
        } else {
          console.warn(`API Route (market-data): RSS feed structure unexpected or no items found for ${feed.sourceName}:`, result);
          return [];
        }
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
          console.error(`API Route (market-data): Fetch to ${feed.sourceName} timed out after ${FETCH_TIMEOUT_MS / 1000} seconds.`);
        } else if (error instanceof Error) {
          console.error(`API Route (market-data): Error fetching or parsing RSS feed from ${feed.sourceName}:`, error.message);
        } else {
          console.error(`API Route (market-data): An unknown error occurred fetching or parsing RSS feed from ${feed.sourceName}:`, error);
        }
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    allNews = results.flat();
    allNews.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    });
    console.log(`API Route (market-data): Total news articles fetched: ${allNews.length}`);

  } catch (error: unknown) {
    console.error("API Route (market-data): Top-level error during RSS fetching:", error);
    if (error instanceof Error) {
      apiRouteError = `Failed to fetch news: ${error.message}`;
    } else {
      apiRouteError = "Failed to fetch news due to an unknown error.";
    }
    allNews = []; // Ensure news is empty if there's a top-level error
  }

  // --- Step 2: Generate AI Summary (if news is available) ---
  if (allNews.length > 0) {
    try {
      console.log("API Route (market-data): Starting AI summary generation...");
      const topArticles = allNews.slice(0, 10);
      const newsContentForLLM = topArticles.map(article =>
        `Title: ${article.title || 'No Title'}\nDescription: ${article.description || 'No description available.'}`
      ).join('\n\n');

      const prompt = `Summarize the following stock market news articles into a concise, 2-3 paragraph daily market overview. Focus on key events, major company news and overall market sentiment. Do not include a title for the summary.

      News Articles:
      ${newsContentForLLM}
      `;

      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = process.env.GEMINI_API_KEY || ''; // Read from .env.local

      // --- TEMPORARY DEBUGGING LOG: THIS WILL SHOW IN VERCEL FUNCTION LOGS ---
      console.log(`DEBUG: API Key (first 5 chars): ${apiKey.substring(0, 5)}...`);
      // --- END TEMPORARY DEBUGGING LOG ---

      if (!apiKey) {
          console.error("API Route (market-data): GEMINI_API_KEY environment variable is not set!");
          apiRouteError = apiRouteError ? `${apiRouteError} | GEMINI_API_KEY is missing.` : "GEMINI_API_KEY environment variable is not set on the server. Please configure it in Vercel.";
          aiSummary = "AI summary unavailable: API key missing.";
          summaryLastUpdated = "N/A";
      } else {
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => {
            console.warn(`API Route (market-data): Gemini API call timed out, aborting.`);
            controller.abort();
          }, FETCH_TIMEOUT_MS); // Apply timeout to Gemini API call as well

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal // Apply signal for timeout
          });
          clearTimeout(timeoutId); // Clear timeout if fetch completes in time

          const result = await response.json();
          console.log(`API Route (market-data): Gemini API Response Status: ${response.status}`);
          // console.log("API Route (market-data): Gemini API Full Response Body:", JSON.stringify(result, null, 2)); // Uncomment for verbose debugging

          if (response.ok && result.candidates && result.candidates.length > 0 &&
              result.candidates[0].content && result.candidates[0].content.parts &&
              result.candidates[0].content.parts.length > 0) {
            aiSummary = result.candidates[0].content.parts[0].text;
            summaryLastUpdated = new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });
            console.log("API Route (market-data): AI summary generated successfully.");
          } else {
            console.error("API Route (market-data): LLM did not return a valid summary structure or response was not OK.", JSON.stringify(result, null, 2));
            apiRouteError = apiRouteError ? `${apiRouteError} | AI summary generation failed.` : "AI summary generation failed due to invalid response from Gemini API.";
            aiSummary = "AI summary unavailable: Invalid response from API.";
            summaryLastUpdated = "N/A";
          }
      }
    } catch (llmError: unknown) {
      console.error("API Route (market-data): Error generating AI summary:", llmError);
      if (llmError instanceof Error && llmError.name === 'AbortError') {
        apiRouteError = apiRouteError ? `${apiRouteError} | AI summary API call timed out.` : "AI summary generation timed out.";
      } else if (llmError instanceof Error) {
          apiRouteError = apiRouteError ? `${apiRouteError} | AI summary error: ${llmError.message}` : `AI summary generation failed: ${llmError.message}`;
      } else {
          apiRouteError = apiRouteError ? `${apiRouteError} | Unknown AI summary error.` : "AI summary generation failed due to an unknown error.";
      }
      aiSummary = "AI summary unavailable: Internal error.";
      summaryLastUpdated = "N/A";
    }
  } else {
    // If no news was fetched, the AI summary cannot be generated
    aiSummary = "No news articles available to generate a summary.";
    summaryLastUpdated = "N/A";
  }

  // Send the consolidated response
  if (apiRouteError) {
    res.status(500).json({ news: allNews, aiSummary, summaryLastUpdated, error: apiRouteError });
  } else {
    res.status(200).json({ news: allNews, aiSummary, summaryLastUpdated });
  }
}
