# FashionVault — Connected by Design

Redesign of the supplied FashionVault app using the clothing-station circuit-board logo, olive/black/yellow palette, and a new AI-generated editorial campaign image.

## Run / Railway
Run `npm start` with Node.js. The server uses PORT or 3000 and serves the included assets. Existing Railway and Nixpacks files are retained. No build or npm dependencies are required. React and the fonts are loaded from their existing CDN / Google Fonts.

## Included
- Studio home, branded navigation, editorial hero and collection cards.
- Brand search, category filtering, brand details and revenue comparison.
- Three-step onboarding with validation; brand records persist in localStorage on this device.
- VAULTAI integration retained. Enter your own Anthropic API key; it is kept in sessionStorage, not saved permanently. Actual API calls require a valid paid key and were not live-tested.
- Brand roster view. The original client-side hard-coded password was not real authentication and has been replaced by a clearly local roster view. This app has no server authentication or database.
- Responsive layouts, keyboard focus styling and reduced-motion support.

The four original brands and all original financial figures are sample data. No real outreach, placement booking or campaign launch occurs. New brands save to this browser only; data is not synced across devices. A secure multi-user production service would need server authentication, a database and server-side AI credentials.

## Files
index.html contains React components; styles.css contains the responsive brand theme; assets contains the transparent logo, visual brand board and campaign image. dist is the static hosted copy. To change the standalone app, edit root files; update dist when deploying to static hosting.

## Validation
JavaScript syntax checked; browser verified rendering, filters, brand detail modal, and connection entry. No live AI request was made.

## Circuit identity update
Includes the complete olive circuit identity, BRAND_GUIDE.md, an animated campaign scene, an interactive station filter, four product artwork quadrants, and a motion switch. Existing local brand data remains under the same localStorage key. Graphics are illustrative; the brand board contains mockup variations, not exported vector files.
