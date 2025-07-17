// pages/api/generate-summary.ts
// This API route handles fetching RSS news and generating an AI summary using Gemini.
// It is called client-side to improve initial page load performance.

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
  aiSummary: string;
  summaryLastUpdated: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let allNews: RssArticle[] = [];
  let aiSummary: string = '';
  let summaryLastUpdated: string = '';

  const rssFeeds = [
    { url: 'https://www.nasdaq.com/feed/rssoutbound?category=Stocks', sourceName: 'Nasdaq.com' },
    { url: 'https://www.investing.com/rss/news_25.rss', sourceName: 'Investing.com' },
  ];

  try {
    const fetchPromises = rssFeeds.map(async (feed) => {
      try {
        const response = await fetch(feed.url);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Route: Failed to fetch RSS feed from ${feed.sourceName}: ${response.status} - ${response.statusText}. Response: ${errorText.substring(0, 200)}`);
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
          console.warn(`API Route: RSS feed structure unexpected or no items found for ${feed.sourceName}:`, result);
          return [];
        }
      } catch (error) {
        console.error(`API Route: Error fetching or parsing RSS feed from ${feed.sourceName}:`, error);
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

    if (allNews.length > 0) {
      const topArticles = allNews.slice(0, 10);
      const newsContentForLLM = topArticles.map(article =>
        `Title: ${article.title}\nDescription: ${article.description}`
      ).join('\n\n');

      const prompt = `Summarize the following stock market news articles into a concise, 2-3 paragraph daily market overview. Focus on key events, major company news and overall market sentiment. Do not include a title for the summary.

      News Articles:
      ${newsContentForLLM}
      `;

      try {
        const chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = process.env.GEMINI_API_KEY || ''; // Read from .env.local

        if (!apiKey) {
            console.error("API Route: GEMINI_API_KEY environment variable is not set!");
            aiSummary = "API key missing. Please set GEMINI_API_KEY in your Vercel project's environment variables.";
        } else {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            const result = await response.json();

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
            } else {
              console.error("API Route: LLM did not return a valid summary structure or response was not OK.", JSON.stringify(result, null, 2));
              aiSummary = "Could not generate today's market summary. Please check back later.";
            }
        }
      } catch (llmError: unknown) {
        console.error("API Route: Error generating AI summary:", llmError);
        if (llmError instanceof Error) {
            console.error("API Route: AI Summary Error Message:", llmError.message);
        } else if (typeof llmError === 'object' && llmError !== null && 'message' in llmError) {
            console.error("API Route: AI Summary Error Message:", (llmError as { message: string }).message);
        }
        aiSummary = "Failed to generate market summary due to an internal error.";
      }
    } else {
      aiSummary = "No news articles available to generate a summary.";
    }

  } catch (error) {
    console.error("API Route: Error fetching multiple RSS feeds or generating AI summary:", error);
    aiSummary = "Failed to retrieve market data for summary generation.";
  }

  res.status(200).json({ aiSummary, summaryLastUpdated });
}
