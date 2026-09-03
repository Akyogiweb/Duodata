# Evidence Register

Facts with source and confidence.

## CONFIRMED

| Fact | Source |
|------|--------|
| React 19 + CRA + Craco frontend | `package.json`, successful `yarn build` |
| FastAPI backend with MongoDB | `server.py`, `requirements.txt` |
| 4 frontend routes | `App.js` |
| 16 default slices seed on empty DB | `server.py` DEFAULT_SLICES, `_seed_slices_if_empty` |
| shadcn/ui new-york + Tailwind | `components.json` |
| PostHog analytics in index.html | `public/index.html` |
| No authentication in codebase | grep auth/login — only test ID stubs |
| Hero animation timing bug documented | `test_result.md` testing agent polls |
| Frontend compiles to 164KB gzip JS | local build output |

## LIKELY

| Fact | Source | Could invalidate |
|------|--------|------------------|
| Production hosted on Emergent preview | `backend_test.py` BASE_URL, test_result.md | Preview 404 now |
| Target market is PE/alt investments | Seed slice names, case study copy | Could be demo filler only |
| Andreas is sales contact | BookDemoModal copy | Marketing placeholder |

## CONTRADICTED

| Claim | Evidence against |
|-------|------------------|
| README documents project | Root README is placeholder: "Here are your Instructions" |
| index.html describes Duodata | Title says "Emergent \| Fullstack App" |
| Preview API is live | curl returned 404 (2026-09-03) |

## UNKNOWN

| Item | Why unknown |
|------|-------------|
| Production deployment topology | Not in repo |
| CRM/email for demo requests | No integration code |
| Real Duodata product vs this demo | Only marketing + slice CRUD present |
| MongoDB hosting in production | No infra config |
