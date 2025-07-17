// pages/api/generate-ai-summary.ts
// This API route handles generating an AI summary using Gemini, based on news data sent from the client.
// It is called client-side to improve initial page load performance.
// IMPORTANT: Added a temporary console.log for debugging GEMINI_API_KEY.

import type { NextApiRequest, NextApiResponse } from 'next';

interface NewsArticleForLLM {
  title?: string;
  description?: string;
}

interface ApiResponse {
  aiSummary: string;
  summaryLastUpdated: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. This API route only accepts POST requests.' });
  }

  let aiSummary: string = '';
  let summaryLastUpdated: string = '';
  const { news: clientNews } = req.body; // Expecting news array in the request body

  if (!clientNews || !Array.isArray(clientNews) || clientNews.length === 0) {
    return res.status(400).json({ error: "No news articles provided in the request body for summary generation." });
  }

  try {
    const newsContentForLLM = clientNews.map((article: NewsArticleForLLM) =>
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
        console.error("API Route (generate-ai-summary): GEMINI_API_KEY environment variable is not set!");
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not set on the server. Please configure it in Vercel." });
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
          console.error("API Route (generate-ai-summary): LLM did not return a valid summary structure or response was not OK.", JSON.stringify(result, null, 2));
          return res.status(500).json({ error: "Could not generate today's market summary from AI. Invalid response from Gemini API." });
        }
    }
  } catch (llmError: unknown) {
    console.error("API Route (generate-ai-summary): Error generating AI summary:", llmError);
    if (llmError instanceof Error) {
        console.error("API Route (generate-ai-summary): AI Summary Error Message:", llmError.message);
    } else if (typeof llmError === 'object' && llmError !== null && 'message' in llmError) {
        console.error("API Route (generate-ai-summary): AI Summary Error Message:", (llmError as { message: string }).message);
    }
    return res.status(500).json({ error: "Failed to generate market summary due to an internal AI processing error." });
  }

  res.status(200).json({ aiSummary, summaryLastUpdated });
}
