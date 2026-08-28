# Duo Data Website — Product Requirements

## Original Problem Statement
Build a comprehensive, multi-page website for Duo Data, the semantic layer connecting business meaning to technical reality. The experience includes a 14-section narrative homepage, scroll-triggered animations, industry deep pages, metric detail pages, product demos, mega-menu navigation, interactive architecture diagrams, and a working Book a Demo flow.

## Product Goals
- Explain how Duo Data connects governed business definitions to data platforms and AI.
- Make complex semantic architecture understandable through precise, interactive visuals.
- Give buyers multiple paths to explore product demos, use cases, metrics, and industries.
- Convert qualified visitors through the Book a Demo flow.

## Primary Experiences
- Homepage narrative with semantic architecture sections and visual banners.
- Dynamic industry pages at `/industries/:slug`.
- Dynamic metric pages at `/metrics/:slug`.
- Product demo page at `/product-demo`.
- Video library at `/videos`.
- Case studies and ontology explorer.

## Architecture
- Frontend: React 19, React Router, Tailwind CSS, Framer Motion.
- Backend: FastAPI.
- Database: MongoDB using `MONGO_URL` and `DB_NAME` environment variables.
- Public media: privacy-enhanced YouTube embeds loaded only after user activation.
- API: `POST /api/demo-requests`.

## Implemented

### 2026-08-28 — Real Problem messaging update
- Updated the section heading to “From business definition to technical implementation with an integrated semantic foundation.”
- Updated the supporting copy to describe metrics, definitions, formulas, slices, reports, sources, ownership, lineage, and implementations as one governed system.
- Preserved the existing visualization and verified responsive text wrapping.

### 2026-08-28 — Cohesive visualization redesign
- Rebuilt Lemniscate, Atomic Ontology, and Icosahedron banners with one dark Swiss/technical visual language.
- Bound moving dots directly to SVG paths through `animateMotion` and `mpath` for exact alignment.
- Replaced the approximate icosahedron with a mathematically generated 12-vertex, 30-edge projection.
- Rebuilt TwoSides as an interactive semantic mapping and MegaDiagram as a responsive SVG with a mobile fallback.

### 2026-08-28 — Video showcase and library
- Added seven supplied Duo Data YouTube videos in an auto-advancing expanding-card rail.
- Added hover/focus reveal, autoplay pause, accessible keyboard interaction, high-resolution thumbnails with fallback, and full-frame `object-contain` rendering.
- Added a privacy-enhanced click-to-play modal using `youtube-nocookie.com` and source start times.
- Added `/videos`, a homepage showcase, and a Video Library navigation entry.
- Fixed 320px page-level overflow while preserving the animated connector marquee.

### Earlier completed scope
- Built the 14-section homepage narrative and scroll-triggered reveal system.
- Added industry deep pages, metric detail page, product demo page, mega-menu navigation, table-background KPI hero, testimonials, CTA, and footer.
- Added the working Book a Demo request endpoint and modal flow.

## Verification
- Frontend production build passes.
- Testing Agent iteration 2 validated video interactions, all three SVG visual systems, TwoSides, MegaDiagram desktop/mobile behavior, and the `/videos` route.
- The only reported issue, 320px horizontal overflow, was fixed and self-tested successfully.
- No mocked APIs or integrations are used.

## Prioritized Roadmap

### P0 — User verification
- Review the redesigned visual banners and video showcase in the live preview.
- Confirm final homepage ordering for the video showcase.

### P1 — Upcoming
- Add Command-K navigation search across metrics, industries, videos, and homepage sections.
- Connect Book a Demo submissions to an email or Slack notification service.
- Expand the dedicated video library with categories and filtering if the collection grows.

### P2 — Future
- Add polished EBITDA and NRR metric stories with complete lineage visuals.
- Add video completion analytics and conversion attribution after consent requirements are defined.

## Constraints
- Preserve protected `.env` variables and use environment-supplied service URLs only.
- Do not reintroduce the removed page-wide vertical grid backdrop.
- Keep all moving visualization dots mathematically constrained to their SVG paths.
- Every interactive and critical user-facing element must have a unique `data-testid`.