# AquaProfit

Manufacturing intelligence and managed raw-material sourcing for packaged drinking water producers.

## Deploy with Cloudflare Pages

1. Log in to Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
2. Authorize the GitHub account `shivyawaters` and select repository `shivyawaters/aquaprofit`.
3. Choose the `main` branch and deploy as a static site. No build command is required. Set output directory to `/` (repository root) if asked.
4. Cloudflare will show the assigned `*.pages.dev` URL after successful deployment.

## Important MVP limitations

This version is a browser-only prototype. Enquiries are saved in the user's localStorage and **are not sent to the business**. There is no login, backend, live supplier quotation system, admin access, or payment processing. No material prices are represented as live or verified.

## Next production milestone

Add Supabase authentication and database, role-based admin dashboard, server-side RFQ submission and status tracking, notifications, and secure supplier quotation management. Configure access controls before collecting real buyer information.
