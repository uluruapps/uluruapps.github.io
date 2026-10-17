# Dachwerk website

Static marketing site: `public/` is served as-is by GitLab Pages, with no build step and no framework.
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
| `.gitlab-ci.yml` | Replaces `__SITE_URL__` / `__LASTMOD__` with the real address and date, then publishes `public/` |

Keep the facts in step with the Play listing (`fastlane/metadata/android/*/full_description.txt`).
When something about the app changes, update the page, its JSON-LD and `llms*.txt` together.

## Preview locally

    python3 -m http.server 8765 --directory website/public

The `__SITE_URL__` placeholders only show up in canonical/OG/sitemap URLs, so the preview still works.

## Deploy to GitLab Pages

The site lives in this repo; GitLab gets only the `website/` folder, as the root of its own project:

    git remote add gitlab git@gitlab.com:<you>/dachwerk-website.git   # once
    git subtree push --prefix website gitlab main

In GitLab, under Deploy → Pages, keep "Use unique domain" on, so the site is served from a domain
root. `robots.txt` and `llms.txt` only count at the root of a domain.

With a custom domain (recommended, e.g. `dachwerk.app`), add it under Deploy → Pages → Domains and
set the CI/CD variable `SITE_URL=https://dachwerk.app`.

## Before going live

- Fill in the address in `public/impressum/index.html` (Austrian § 5 ECG / § 25 MedienG).
- Register the site in Google Search Console and in Bing Webmaster Tools (ChatGPT search and
  Copilot draw on Bing's index) and submit `sitemap.xml` to both.
- Add the website URL to the Play Console store listing (Store-Eintrag → Kontaktdaten → Website).
