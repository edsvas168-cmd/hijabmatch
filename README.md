# HijabMatch — full UI refresh

Files:
- `index.html`: responsive landing page, profile form, color suggestions, save palette, material selector, Pro lookbook concept and journal.
- `api/scarf.js`: server-side YouCam task-polling scaffold. It keeps the API key out of the browser. POST intentionally returns a clear setup message until secure image upload is implemented.

## Deploy to Vercel
1. Replace the repository root `index.html` with this one.
2. Add a root-level folder named `api`, and place `scarf.js` inside it.
3. Keep `YOUCAM_API_KEY` in Vercel Environment Variables. Never paste it into HTML or commit it to GitHub.
4. Commit changes. Vercel should deploy automatically.

## Honest functionality
- Photo preview stays in the browser until AI try-on is explicitly started.
- Color recommendations are curated style guidance, not scientific skin-tone analysis.
- Material selection updates the chosen preference; it does not simulate fabric yet.
- AI try-on is not yet enabled: YouCam Scarf requires a user photo plus a suitable scarf reference image and task polling. The POST endpoint deliberately does not fake success or spend API units.
