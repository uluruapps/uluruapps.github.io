# Dachwerk website

Static marketing site: `public/` is served as-is by GitHub Pages at https://uluruapps.github.io/, with no build step and no framework.
Every page works with JavaScript off. AI crawlers mostly do not run JS, so all copy, the FAQ and
the structured data are in the HTML itself.

| File | What it is for |
|---|---|
| `public/index.html`, `public/de/index.html` | The page in English and German, linked via `hreflang` |
| JSON-LD in each page | `MobileApplication` + `FAQPage` + `Organization` for search engines and assistants |
| `public/llms.txt` | Short, factual summary for LLMs ([llmstxt.org](https://llmstxt.org)) |
| `public/llms-full.txt` | Every feature, the pricing rules and the FAQ in plain text |
| `public/robots.txt` | Explicitly allows the search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, Google-Extended, PerplexityBot, …) |
| `public/sitemap.xml` | Both languages plus the llms files |
| `.github/workflows/pages.yml` | Replaces `__SITE_URL__` / `__LASTMOD__` with the real address and date, then publishes `public/` |

Keep the facts in step with the Play listing (`fastlane/metadata/android/*/full_description.txt`).
When something about the app changes, update the page, its JSON-LD and `llms*.txt` together.

## Preview locally

    python3 -m http.server 8765 --directory website/public

The `__SITE_URL__` placeholders only show up in canonical/OG/sitemap URLs, so the preview still works.

## Deploy

The site lives in this repo; GitHub gets only the `website/` folder, as the root of
`uluruapps/uluruapps.github.io` (a user site, so it is served from the domain root, where
`robots.txt` and `llms.txt` have to be). The privacy policy stays at `/dachwerk-privacy/`.

    git subtree push --prefix website git@github.com:uluruapps/uluruapps.github.io.git main

The push runs the Pages workflow. With a custom domain (e.g. `dachwerk.app`), add it under
Settings → Pages and set the repository variable `SITE_URL=https://dachwerk.app`.

## After going live

- Register the site in Google Search Console and in Bing Webmaster Tools (ChatGPT search and
  Copilot draw on Bing's index) and submit `sitemap.xml` to both.
- Add the website URL to the Play Console store listing (Store-Eintrag → Kontaktdaten → Website).
