# AquaProfit

Free break-even calculator and material sourcing enquiries for Indian packaged water manufacturers.

## Production
Cloudflare Worker `aquaprofit`, configured in `wrangler.jsonc`, serves the static repository assets. `src/worker.js` owns the persistent visit counter. Keep its binding, migration and object name unchanged. Production domain: https://www.aquaprofit.store/.

## Calculator
No monthly production forecast is required. Contribution is ex-GST revenue less entered variable costs. Operating break-even is fixed monthly expenses / contribution, rounded up to whole cases; cash break-even adds EMI. Cases must be sold. Multi-SKU allocation, depreciation, financing interest and tax require separate treatment. Additional material allowance is additive consumption, not a rejection/yield calculation. Saved packs remain browser-local and can be exported.

## Enquiries
The form reviews information before sending to the existing Formspree endpoint. Calculator context updates with material selection; sharing current purchase price is optional. A submission is shown as successful only after an OK provider response. In uncertain network failure, users retain their details and are asked to check delivery before retrying. Provider delivery, retention, anti-spam and inbox settings require account-side verification.

## Content and assets
Information pages use `assets/refinement.css`. `og-website-brand.svg` is the source for the PNG social preview. The existing GitHub workflow renders it after SVG changes. Actual device testing, email delivery, Search Console and supplier service commitments require operational verification. No fabricated supplier endorsements or delivery promises are published.
