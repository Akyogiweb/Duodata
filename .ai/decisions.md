# Architectural & Product Decisions (inferred from code)

| Decision | Evidence | Rationale (inferred) |
|----------|----------|----------------------|
| CRA + Craco over Next.js | `package.json`, Emergent template | Platform default; SPA sufficient for marketing |
| MongoDB for persistence | Motor in server.py | Flexible schema for slices + leads; Emergent stack default |
| Open API (no auth) | No middleware, no JWT usage despite deps | Demo/prototype speed; **not production-safe** |
| Slices as "metric ontology" demo | Domain naming, Explore UI | Product-led storytelling |
| Mock case studies | `mockCaseStudies.js`, no API | Content marketing without CMS |
| PostHog via Emergent | Hardcoded in index.html | Platform analytics default |
| Client-side routing | BrowserRouter | Standard SPA |
| History array on slices | server.py PATCH logic | Audit trail UX for governance story |
| Gap phase in hero (450ms) | Hero.jsx TIMING.gap | Attempt to fix label overlap — partial fix |

## Decisions NOT to make without verification

- Removing PostHog (may be required by Emergent hosting)
- Adding auth without business requirement
- Replacing Mongo with SQL (would break Emergent base image assumptions)
