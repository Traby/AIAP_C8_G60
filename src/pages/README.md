# InsightForge 🔍

> Turn 20 browser tabs into one sharp 1-page briefing — powered by Firecrawl + Claude

## What It Does

1. You type a research question
2. Firecrawl searches the web and scrapes 6 relevant websites  
3. Claude synthesizes everything into a clean 1-page briefing
4. You get sources, key findings, and an executive summary — in under 30 seconds

---

## Setup (5 minutes, no experience needed)

### Option A — Run on Bolt.new (Recommended for hackathon)

1. Go to **https://bolt.new**
2. Click **"Import from GitHub"** or paste this code directly
3. Add your environment variables in Bolt's settings panel:
   - `FIRECRAWL_API_KEY` = your Firecrawl key
   - `ANTHROPIC_API_KEY` = your Anthropic key
4. Click Run — done!

### Option B — Run Locally

**Step 1:** Make sure you have Node.js installed (https://nodejs.org)

**Step 2:** Open a terminal in this folder and run:
```bash
npm install
```

**Step 3:** Create your environment file:
```bash
cp .env.example .env.local
```
Then open `.env.local` and replace the placeholder values with your real API keys.

**Step 4:** Start the app:
```bash
npm run dev
```

**Step 5:** Open http://localhost:3000 in your browser

---

## Getting Your API Keys

### Firecrawl API Key
1. Go to https://firecrawl.dev
2. Sign up (free tier available)
3. Copy your API key from the dashboard

### Anthropic API Key  
1. Go to https://console.anthropic.com
2. Sign up and go to API Keys
3. Create a new key and copy it

---

## Project Structure

```
insightforge/
├── pages/
│   ├── index.tsx          ← Main UI (the page users see)
│   └── api/
│       └── research.ts    ← Backend: Firecrawl + Claude logic
├── .env.example           ← Template for your API keys
├── package.json           ← Dependencies
└── README.md              ← This file
```

---

## How It Works (Technical)

1. **User submits query** → `pages/index.tsx` calls `/api/research`
2. **Firecrawl Search** → finds 6 relevant URLs for the query
3. **Firecrawl Scrape** → extracts clean markdown content from each URL
4. **Claude** → synthesizes all content into a structured briefing
5. **Response** → briefing text + source list returned to UI

---

## Hackathon Notes

- The demo flow matches the MVP spec: query → scrape → briefing in <30 seconds
- Firecrawl free tier handles ~100 scrapes, enough for many demos
- Anthropic free tier or low credits are fine for the demo

Built for AIAP Cohort 8 Group 60 — InsightForge Hackathon Demo
