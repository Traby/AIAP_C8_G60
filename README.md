AIAP_C8_G60
experimenting with pull request - so this was added by Markus 
I will ask the owner to pull this change into repo main - we'll see how it goes

Claude helped me integrate a firecrawl research demo project
then I did this to my fork
no Idea how this can be combined

How to get this running (3 steps)
Step 1 — Upload to GitHub

Go to github.com/Traby/AIAP_C8_G60, switch to the Markus branch
Navigate into src/pages/
Click "Add file" → "Upload files"
Unzip the download and drag the files in:

pages/index.tsx → into src/pages/
pages/api/research.ts → into src/pages/api/
package.json, README.md, etc. → into the root folder


### I did not do yet - I have a firecrrawl API-key !!!
Step 2 — Open in Bolt.new

Go to bolt.new
Click "Import from GitHub" and paste your repo URL
In Bolt's environment/settings panel, add two variables:

FIRECRAWL_API_KEY = your Firecrawl key
ANTHROPIC_API_KEY = your Anthropic key (from console.anthropic.com)



Step 3 — Run it
Click Run in Bolt — your demo is live!

The app does exactly what your PDF spec describes: user types a question → Firecrawl scrapes 6 real websites → Claude writes a 1-page briefing with sources — all in under 30 seconds. Tell me if you hit any snags!
