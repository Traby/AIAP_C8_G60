import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ResearchRequest {
  query: string;
}

interface Source {
  url: string;
  title: string;
  content?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { query }: ResearchRequest = await req.json();

    if (!query?.trim()) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");

    if (!firecrawlApiKey || !anthropicApiKey) {
      return new Response(
        JSON.stringify({ error: "API keys not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Step 1: Searching for URLs...");
    const searchResponse = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${firecrawlApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        limit: 6,
        scrapeOptions: {
          formats: ["markdown"],
        },
      }),
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error("Firecrawl search error:", errorText);
      return new Response(
        JSON.stringify({ error: "Search failed. Please try again." }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.success || !searchData.data?.length) {
      return new Response(
        JSON.stringify({ error: "No search results found. Try a different query." }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Step 2: Extracting content from sources...");
    const sources: Source[] = searchData.data.map((item: any) => ({
      url: item.url,
      title: item.title || item.url,
      content: item.markdown || item.description || "",
    }));

    const combinedContent = sources
      .map((src, i) =>
        `\n\n--- SOURCE ${i + 1}: ${src.title} ---\nURL: ${src.url}\n\n${src.content?.slice(0, 6000) || ""}`
      )
      .join("");

    console.log("Step 3: Claude synthesizing briefing...");
    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": anthropicApiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
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
      }),
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error("Claude API error:", errorText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const claudeData = await claudeResponse.json();
    const briefing = claudeData.content?.[0]?.type === "text"
      ? claudeData.content[0].text
      : "";

    return new Response(
      JSON.stringify({
        briefing,
        sources: sources.map((s) => ({ url: s.url, title: s.title })),
        query,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Research error:", error);
    return new Response(
      JSON.stringify({
        error: error?.message || "Research failed. Please check your API keys and try again.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
