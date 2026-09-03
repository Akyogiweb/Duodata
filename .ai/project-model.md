# Duodata — Project Model

**Last updated:** 2026-09-03  
**Knowledge state:** Initial discovery (evidence-based, partially runtime-verified)

## What this product is

Duodata is a **marketing + interactive demo site** for a B2B data-governance product positioned as a **metric ontology / semantic context layer** for enterprise data platforms and AI. It is inspired by Qatalog-style positioning: governed business meaning for metrics, projected into Snowflake, Databricks, dbt/MetricFlow, BI tools, and AI agents.

The repo is **not** the full Duodata product backend. It is a **full-stack prototype** built on the Emergent.sh platform (FastAPI + React + MongoDB + shadcn/ui).

## Who it serves (inferred ICP)

| Segment | Evidence | Confidence |
|---------|----------|------------|
| Private markets / PE data teams | Default slice seed data (Fund, Deal Stage, ILPA, ASC 820), case study copy | HIGH |
| Enterprise data platform leaders (CDO, Head of Data) | Hero questions, feature blocks, demo form roles | HIGH |
| Analytics engineering / semantic layer teams | dbt, MetricFlow, Snowflake references throughout | HIGH |

## Repository topology

```
/workspace
├── frontend/          CRA + Craco + React 19 + Tailwind + shadcn/ui
├── backend/           FastAPI + Motor (MongoDB async)
├── backend_test.py    Integration tests (hits remote preview URL)
├── test_result.md     Agent testing protocol + status history
└── .emergent/         Emergent platform metadata (base image, cron)
```

## Routes (frontend)

| Path | Purpose |
|------|---------|
| `/` | Marketing landing (hero, lineage, features, connectors, testimonials) |
| `/explore` | Live "Metrics Explorer" — CRUD on slices via API |
| `/case-studies` | Case study index (mock data) |
| `/case-studies/:slug` | Case study detail (mock data) |

## Critical user journeys

1. **Acquisition → Demo request:** Landing CTA → Book Demo modal → `POST /api/demo-requests`
2. **Product exploration:** Nav → `/explore` → search/filter/edit metric slices
3. **Content marketing:** Case studies (static mock, PDF CTA → demo modal)

## Health snapshot

| Dimension | Status | Notes |
|-----------|--------|-------|
| Frontend build | ✅ CONFIRMED | `yarn build` succeeds locally |
| Backend local run | ❌ BLOCKED | No MongoDB; `emergentintegrations` not on PyPI |
| Remote preview | ⚠️ UNCERTAIN | `duodata-metrics.preview.emergentagent.com` returned 404 at discovery |
| Backend API (historical) | ✅ LIKELY | `test_result.md` + `backend_test.py` show prior passing tests |
| Hero animation sync | ❌ CONFIRMED BUG | Card/label desync during enter phase (test_result.md) |
| Auth | N/A | No login; demo/slices APIs are open |
| SEO | ⚠️ WEAK | Title still "Emergent \| Fullstack App" |

## Git evolution (high signal)

1. `040e2aa` — Qatalog-inspired landing clone (frontend)
2. `6d7732f` — Four features shipped
3. `f0d74f1` — Refined hero, bulk import, metric detail drawer
4. `8cb5744` / `00bb411` — Brand refresh, official Duodata logo
5. `a21f172` — Auto-generated changes (latest)
