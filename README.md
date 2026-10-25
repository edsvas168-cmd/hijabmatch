# HijabMatch — frontend MVP v2

## What is included
- Responsive landing page and navigation
- Photo preview that stays in the browser
- Preference-based color suggestions (rule-based, not AI diagnosis)
- Searchable color catalog with warm/cool/deep/neutral filters
- Saved colors and saved lookbook ideas persisted in this browser via localStorage
- Fabric preference selector and curated lookbook cards
- Honest AI try-on placeholder: no API request is made and no YouCam credits are spent

## Deploy to Vercel
1. Download and unzip the project.
2. Replace the root `index.html` in your existing GitHub repository with this `index.html`.
3. Keep your existing `api/check.js` and Vercel environment variable untouched. This frontend version does not call the API yet.
4. Commit and push the change; Vercel should redeploy automatically.

## Important limits in this stage
- Color suggestions use the user's selected preferences; they are not face/skin analysis.
- The material selector updates a preference and copy; it does not simulate fabric on a photo.
- Lookbook cards are styling concepts, not AI-generated try-on images.
- Uploaded photos are previewed locally. The AI button displays a placeholder message and does not upload the photo.
- Favorites are saved in the current browser only; they do not sync across devices.

Next stage: connect the documented YouCam scarf virtual try-on flow securely after the product flow and reference images are ready. Keep `YOUCAM_API_KEY` on the server only.

## Shop your shade (no API usage)
The Shop section lets visitors choose one of the curated palette colors and opens an AliExpress search for matching scarf terms. These are retailer search links, not verified individual product listings or affiliate links. Replace with approved affiliate URLs only after joining a program and confirming its rules. No YouCam API calls are made by this section.
