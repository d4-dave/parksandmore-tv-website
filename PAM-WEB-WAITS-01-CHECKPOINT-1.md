# PAM-WEB-WAITS-01 — Checkpoint 1

Status: IMPLEMENTED PACKAGE — AWAITING DAVE LOCAL VALIDATION

## Scope

- Next.js + TypeScript + App Router application baseline.
- Existing Parks & More night-sky/cyan-purple identity preserved as reusable CSS.
- Approved portal routes implemented.
- Server-side integration with the approved public wait endpoint family.
- Destination-neutral WDW/UOR wait rendering.
- Backend ordering preserved by rendering arrays as returned.
- Backend stale/missing/wait-availability semantics preserved.
- Partial park/destination failures render locally rather than collapsing unrelated content when Backend returns partial data.
- Existing Music playlist content migrated.

## Production safety

The supplied static production baseline is preserved under `legacy-github-pages/`. This implementation is intended for a feature branch and Vercel Preview only. No DNS cutover is included.

## Known limitation

The approved homepage Resort Status Bar requires park-hours/open-closed data. The current public waits contract does not expose park hours, so the component intentionally renders nothing rather than infer park status from attraction data. This needs a separately approved public-safe Backend status/hours contract before activation.

## Preview dependency

Vercel must be given `PAM_BACKEND_BASE_URL` pointing to a network-accessible approved Backend instance. `127.0.0.1` works only for local development and is not reachable from Vercel.
