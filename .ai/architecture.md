# Architecture

## Stack (CONFIRMED)

| Layer | Technology | Evidence |
|-------|------------|----------|
| Frontend | React 19, CRA 5, Craco 7, React Router 7 | `frontend/package.json` |
| UI system | shadcn/ui (new-york), Radix, Tailwind 3, Lucide | `components.json`, `tailwind.config.js` |
| State / data | axios, local React state, DemoModalContext | Source imports |
| Backend | FastAPI 0.110, Uvicorn, Pydantic v2 | `backend/server.py`, `requirements.txt` |
| Database | MongoDB via Motor async driver | `server.py` — collections: `status_checks`, `demo_requests`, `slices` |
| Platform | Emergent.sh | `.emergent/emergent.yml`, PostHog in `index.html`, visual-edits Craco plugin |

## Request flow

```
Browser (React SPA)
    │  REACT_APP_BACKEND_URL/api/*
    ▼
FastAPI (server.py)
    │  Motor → MongoDB
    ▼
Collections: slices | demo_requests | status_checks
```

## API surface (CONFIRMED from `server.py`)

| Method | Path | Behavior |
|--------|------|----------|
| GET | `/api/` | Health/hello |
| GET/POST | `/api/status` | Legacy status check CRUD |
| GET/POST | `/api/demo-requests` | Lead capture |
| GET/POST/PATCH/DELETE | `/api/slices` | Metric ontology slices |
| POST | `/api/slices/bulk` | Bulk import with skip logic |

## Slice domain model

- **Statuses:** `Implemented`, `Approved`, `Proposed`
- **Fields:** name, status, tag, owner, source, updated_at, history[]
- **Seed:** 16 PE/alt-investment slices auto-inserted on first `GET /api/slices` if empty
- **History:** append-only audit on create/update

## Frontend architecture patterns

- **Path alias:** `@/` → `src/` (Craco webpack + jsconfig)
- **Global modal:** `DemoModalProvider` wraps routes; `BookDemoModal` mounted once
- **Explore page:** monolithic page component with inline subcomponents (StatusPill, SidebarItem, dialogs)
- **Marketing data:** mostly static in `mock.js`, `mockCaseStudies.js` — not API-driven

## External dependencies (runtime)

- Google Fonts (Inter wght 600)
- `assets.emergent.sh` scripts (emergent-main.js)
- PostHog via `ap.emergent.sh` (session recording enabled)

## Not present in repo

- Authentication / authorization
- CI/CD pipelines (no `.github/`)
- Docker compose / infra-as-code
- Real product API beyond slices + demo requests
- Email/CRM integration (demo requests only persisted to Mongo)
