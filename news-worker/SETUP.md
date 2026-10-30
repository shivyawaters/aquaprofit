# AquaProfit Industry Pulse backend (Cloudflare Worker + D1)

This is a **separate Worker** so that the main static AquaProfit website remains operational. It fetches public RSS headlines every 3 hours and stores article metadata in Cloudflare D1. Images are used only when the feed supplies a valid image URL. Do not imply an article image is verified when it is missing. No scraping of copyrighted article bodies or unauthorized copying of images.

## Setup (Cloudflare)

1. Create a D1 database named `aquaprofit-news` in Workers & Pages > D1.
2. In the Worker settings, bind it as `NEWS_DB` (D1 database binding).
3. Create a Worker named `aquaprofit-news` using `news-worker/worker.js` (copy/upload source or deploy with Wrangler). Set cron trigger `0 */3 * * *`.
4. Run the SQL in `news-worker/schema.sql` against the D1 database.
5. Create a secret `REFRESH_TOKEN` and call `POST /admin/refresh` with `Authorization: Bearer <token>` once to seed initial stories. (GET works too with same auth; never expose token in frontend.)
6. Configure a same-origin route or reverse proxy for `https://aquaprofit.shivyawaters.workers.dev/api/news` to point to the news Worker, **or** set the frontend news API URL to the Worker public URL in `index.html`.
7. Verify `/api/news` returns `items` before disabling the legacy browser feed fallback.

The RSS publisher may not include article thumbnails; these remain missing until a publisher-supplied URL is available. Cloudflare free tier limits and publisher usage terms apply. No guaranteed monthly cost.

## GitHub build connection

The dedicated Worker uses `npx wrangler deploy --config news-worker/wrangler.jsonc` from the repository root. This is separate from the main AquaProfit static website. The existing `NEWS_DB` D1 binding must be checked after first deploy; if Wrangler-managed configuration does not retain it, add the database ID to the D1 binding in `wrangler.jsonc` before the next deployment. Do not claim a live news feed until the Worker and `/api/news` have been tested.
