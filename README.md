# parksandmore-tv-website

Parks & More public web application.

## Current implementation branch

This package represents the first `PAM-WEB-WAITS-01` Next.js migration checkpoint. Production remains the legacy GitHub Pages site on `main` until a preview is validated and a separate cutover is approved.

## Local development

```powershell
cd "C:\Users\d4des\Documents\github clones\parksandmore-tv-website"
Copy-Item .env.example .env.local
npm install
npm run dev
```

The local Backend default is `http://127.0.0.1:8000`.

## Validation

```powershell
cd "C:\Users\d4des\Documents\github clones\parksandmore-tv-website"
npm run typecheck
npm run lint
npm run build
```

## Data boundary

The Web application consumes only the public wait family:

- `/api/v1/public/waits/destinations`
- `/api/v1/public/waits/homepage`
- `/api/v1/public/waits/destinations/{destinationId}`
- `/api/v1/public/waits/parks/{parkId}`

No direct provider integrations belong in this repository.

## Legacy production baseline

The original static GitHub Pages files are preserved under `legacy-github-pages/` for comparison and rollback reference. They remain production on the real repository `main` branch until separately approved for cutover.
