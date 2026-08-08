# PAM-WEB-WAITS-01 — Implementation Checkpoint 2

Status: IMPLEMENTED PACKAGE — AWAITING DAVE LOCAL VALIDATION
Backend candidate: `731f785beb621121355beb1c5488c00781fd6bbc`

## Implemented

- Adopted corrected Backend closed-park semantics. Flat attraction fields remain authoritative current state.
- Added public contract support for `availabilityReason` and `lastObservation`; Web does not reconstruct current state from `lastObservation`.
- Added authoritative park `areas` grouping and attraction area metadata.
- Destination wait pages render Backend hierarchy: Destination → Park → Land / Area → Attraction.
- Area membership/order comes from Backend `areas[].attractionIds`; Web does not maintain local land mappings or sort operational membership itself.
- Existing flat attraction arrays remain compatibility input only.
- Homepage remains driven by Backend `HOMEPAGE_TOP` arrays in returned order.
- Destination pages remain driven by Backend `DESTINATION_WAITS` population.
- Guest-facing freshness model is `Live` → `Cached` → `Unavailable`; technical `STALE` wording is not exposed.
- No historical-wait messaging from `lastObservation` was introduced.
- Closed/current unavailable wait labels use authoritative current fields, including `PARK_CLOSED`.
- Partial park/destination unavailable states remain localized.
- Added land/area heading hierarchy and responsive styling.
- Added `*.tsbuildinfo` to `.gitignore`.

## Required local validation

```powershell
cd "C:\Users\d4des\Documents\github clones\parksandmore-tv-website"
npm run typecheck
npm run lint
npm run build
npm run dev -- -p 3001
```

With Backend candidate running at `http://127.0.0.1:8000`, validate:

1. Homepage WDW and UOR Top Attractions render from `HOMEPAGE_TOP` only.
2. `/wait-times/walt-disney-world` renders Park → Land / Area → Attraction.
3. `/wait-times/universal-orlando` renders the same destination-neutral hierarchy.
4. Closed parks show current `CLOSED`, no standby wait, and do not revive values from `lastObservation`.
5. Cached items say `Cached`, never `STALE`.
6. Missing data says `Unavailable` and does not fabricate a wait/status.
7. A park-level unavailable/error state does not suppress unrelated parks returned by Backend.
8. Desktop, tablet, and mobile layouts remain readable.
9. Keyboard Tab/Shift+Tab navigation reaches links with visible focus and Enter activates them.
10. `/wait-times/not-a-place` still returns the application 404.

## Deployment gate

`PAM-WEB-SEC-01` remains a hosted-preview/public-deployment gate only. It does not block this local checkpoint.

## Remaining Dave-review items

- Temporary `HOMEPAGE_TOP` membership is approved for integration/testing but still awaits later final guest-facing curation review/Admin tooling.
- No additional guest-facing decision is required for this checkpoint unless runtime testing exposes a concrete wording/readability issue.
