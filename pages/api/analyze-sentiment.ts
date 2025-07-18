// pages/api/analyze-sentiment.ts
// This API route analyzes the sentiment of provided news articles for a specific stock ticker
// using the Gemini 2.0 Flash model.
// Updated: Improved news article filtering to include company names and more precise matching.

import type { NextApiRequest, NextApiResponse } from 'next';

// Define the structure for a news article
interface NewsArticle {
  title?: string;
  description?: string;
  sourceName?: string;
}

interface SentimentApiResponse {
  sentiment: string; // e.g., "Positive", "Neutral", "Negative"
  explanation: string;
  error?: string;
}

// Map common tickers to their full company names for better news matching
const tickerToCompanyName: { [key: string]: string } = {
  'AAPL': 'Apple',
  'MSFT': 'Microsoft',
  'AMZN': 'Amazon',
  'GOOGL': 'Alphabet', // or Google
  'GOOG': 'Alphabet', // or Google
  'TSLA': 'Tesla',
  'NVDA': 'NVIDIA',
  'META': 'Meta Platforms',
  'JPM': 'JPMorgan Chase',
  'V': 'Visa',
  'UNH': 'UnitedHealth Group',
  'JNJ': 'Johnson & Johnson',
  'WMT': 'Walmart',
  'MA': 'Mastercard',
  'HD': 'Home Depot',
  'PG': 'Procter & Gamble',
  'BAC': 'Bank of America',
  'XOM': 'Exxon Mobil',
  'CVX': 'Chevron',
  'KO': 'Coca-Cola',
  'PEP': 'PepsiCo',
  'ADBE': 'Adobe',
  'NFLX': 'Netflix',
  'CRM': 'Salesforce',
  'INTC': 'Intel',
  // Add more as needed based on your primary stocks of interest
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SentimentApiResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. This API route only accepts POST requests.' });
  }

  const { stockTicker, newsArticles } = req.body;

  if (!stockTicker || typeof stockTicker !== 'string' || !newsArticles || !Array.isArray(newsArticles)) {
    return res.status(400).json({ error: 'Missing or invalid stockTicker or newsArticles in request body.' });
  }

  const cleanedTicker = stockTicker.toUpperCase().trim();
  const companyName = tickerToCompanyName[cleanedTicker];

  // Create search terms: ticker itself and company name (if available)
  const searchTerms = [cleanedTicker];
  if (companyName) {
    searchTerms.push(companyName);
  }

  // Build a regex to search for any of the terms with word boundaries
  // Example: \bTSLA\b|\bTesla\b
  const searchRegex = new RegExp(`\\b(${searchTerms.join('|')})\\b`, 'i'); // 'i' for case-insensitive

  // Filter news articles relevant to the stock ticker or company name
  const relevantNews = newsArticles.filter((article: NewsArticle) => {
    const content = `${article.title || ''} ${article.description || ''}`.toLowerCase();
    return searchRegex.test(content);
  });

  if (relevantNews.length === 0) {
    return res.status(200).json({
      sentiment: 'Neutral', // Or 'No Data' if you prefer
      explanation: `No recent news articles found directly mentioning "${cleanedTicker}"${companyName ? ` or "${companyName}"` : ''} in the fetched news feeds.`,
    });
  }

  // Prepare news content for the LLM
  // Limit to top 5-10 relevant articles to keep prompt size manageable
  const articlesForLLM = relevantNews.slice(0, 7); // Limit to 7 articles for prompt efficiency
  const newsContentForLLM = articlesForLLM.map((article: NewsArticle, index) =>
    `Article ${index + 1} (Source: ${article.sourceName || 'Unknown'}):\nTitle: ${article.title || 'No Title'}\nDescription: ${article.description || 'No description available.'}`
  ).join('\n\n');

  const prompt = `Based on the following news articles, analyze the overall sentiment regarding the stock ticker "${cleanedTicker}" (Company: ${companyName || 'N/A'}).
  Provide a single word sentiment (Positive, Neutral, or Negative) and a brief 1-2 sentence explanation for your assessment.
  If the articles are mixed or provide no clear directional information, output "Neutral".

  News Articles for "${cleanedTicker}" (Company: ${companyName || 'N/A'}):
  ${newsContentForLLM}

  Format your response strictly as follows:
  Sentiment: [Positive/Neutral/Negative]
  Explanation: [Your 1-2 sentence explanation based ONLY on the provided articles]`;

  try {
    const chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = process.env.MY_GEMINI_API_KEY || ''; // Use the renamed API key

    if (!apiKey) {
      console.error("API Route (analyze-sentiment): MY_GEMINI_API_KEY environment variable is not set!");
      return res.status(500).json({ error: "MY_GEMINI_API_KEY environment variable is not set on the server. Please configure it in Vercel." });
    }

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
      const llmText = result.candidates[0].content.parts[0].text;
      const sentimentMatch = llmText.match(/Sentiment:\s*(Positive|Neutral|Negative)/i);
      const explanationMatch = llmText.match(/Explanation:\s*(.*)/i);

      const sentiment = sentimentMatch ? sentimentMatch[1].trim() : 'Unknown';
      const explanation = explanationMatch ? explanationMatch[1].trim() : 'Could not generate a clear explanation based on the provided articles.';

      res.status(200).json({ sentiment, explanation });
    } else {
      console.error("API Route (analyze-sentiment): LLM did not return a valid sentiment structure or response was not OK.", JSON.stringify(result, null, 2));
      res.status(500).json({ error: "Could not analyze sentiment from AI. Invalid response from Gemini API." });
    }

  } catch (llmError: unknown) {
    console.error("API Route (analyze-sentiment): Error analyzing sentiment:", llmError);
    if (llmError instanceof Error) {
      res.status(500).json({ error: `Failed to analyze sentiment: ${llmError.message}` });
    } else {
      res.status(500).json({ error: "Failed to analyze sentiment due to an unknown error." });
    }
  }
}
