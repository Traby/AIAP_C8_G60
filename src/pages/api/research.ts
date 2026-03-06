import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";
import FirecrawlApp from "@mendable/firecrawl-js";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Query is required" });

  try {
    // ── STEP 1: Search for relevant URLs via Firecrawl ──────────────────────
    console.log("Step 1: Searching for URLs...");
    const searchResponse = await firecrawl.search(query, {
      limit: 6,
      scrapeOptions: { formats: ["markdown"] },
    });

    if (!searchResponse.success || !searchResponse.data?.length) {
      return res.status(500).json({ error: "No search results found. Try a different query." });
    }

    // ── STEP 2: Extract content from each result ────────────────────────────
    console.log("Step 2: Extracting content from sources...");
    const sources = searchResponse.data.map((item: any) => ({
      url: item.url,
      title: item.title || item.url,
      content: item.markdown || item.description || "",
    }));

    // Build a combined content blob for Claude (cap at ~6000 chars per source)
    const combinedContent = sources
      .map((src: any, i: number) =>
        `\n\n--- SOURCE ${i + 1}: ${src.title} ---\nURL: ${src.url}\n\n${src.content.slice(0, 6000)}`
      )
      .join("");

    // ── STEP 3: Claude synthesizes the briefing ─────────────────────────────
    console.log("Step 3: Claude synthesizing briefing...");
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `You are an expert research analyst. Based on the scraped content from multiple websites below, write a concise, professional 1-page research briefing that answers the following question:

**Research Question:** ${query}

**Instructions:**
- Start with an Executive Summary (2–3 sentences, the key answer)
- Then Key Findings (4–6 bullet points, the most important insights)
- Then Implications (2–3 sentences on what this means practically)
- Use clear, plain language — no fluff
- Be specific and cite which sources support which claims where natural
- Format using markdown headers (## for sections)
- Total length: ~400–600 words

**Scraped Source Content:**
${combinedContent}

Write the briefing now:`,
        },
      ],
    });

    const briefing = message.content[0].type === "text" ? message.content[0].text : "";

    // ── RESPOND ─────────────────────────────────────────────────────────────
    return res.status(200).json({
      briefing,
      sources: sources.map((s: any) => ({ url: s.url, title: s.title })),
      query,
    });
  } catch (error: any) {
    console.error("Research error:", error);
    return res.status(500).json({
      error: error?.message || "Research failed. Please check your API keys and try again.",
    });
  }
}
