# Parks & More GitHub Pages Placeholder — Temporary Transition Notes

This branch is a short-lived enhancement of the GitHub Pages placeholder while the production Next.js/Vercel site and hosted Parks & More Backend are prepared.

## Dave-approved temporary exception

The homepage may make anonymous direct browser calls to ThemeParks.wiki **only** for the existing 6 WDW + 5 UOR Top Attraction cards.

- No credentials, tokens, cookies, sessions, or authenticated provider data.
- No private Parks & More Backend/Admin endpoints.
- No full waits pages or broader provider integration.
- Browser code projects the public response only into wait/status card presentation.
- Polling is limited to once every 5 minutes.
- This exception MUST NOT be migrated into the Next.js production application.
- Delete `assets/waits.js` and the direct-provider homepage integration when the GitHub Pages placeholder is retired.

## Temporary routes

- `/`
- `/news/`
- `/music/`
- `/resort-tv/`

News articles may be added as `/news/<slug>/index.html` with appropriate Open Graph and canonical metadata.
