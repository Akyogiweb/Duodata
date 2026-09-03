# Product Model

## Observed product behavior vs intended positioning

**Observed:** Marketing site + interactive slice explorer demonstrating metric governance UX.  
**Intended (from copy):** Central ontology for business metrics with lineage, owners, lifecycle, and projection to data stack + AI.

## Core objects

| Object | In UI | In API | Notes |
|--------|-------|--------|-------|
| Slice (metric dimension) | `/explore` table/cards | `slices` collection | Real CRUD |
| Demo request (lead) | Book Demo modal | `demo_requests` collection | Real persistence |
| Case study | `/case-studies` | None | Mock only |
| Metric (ontology node) | Lineage diagram | None | Illustrative |
| Connector | DataSources, Hero | None | Static list |

## Roles & permissions

- **No auth model** — all API endpoints are publicly callable
- **Implied personas:** CDO, Head of Data, Analytics Eng, metric owners (named in seed data)

## Workflows

### Slice lifecycle (IMPLEMENTED)
```
Proposed → Approved → Implemented
         (editable via dropdown on /explore)
```
History tracked on create and field updates.

### Lead capture (IMPLEMENTED)
```
CTA → Modal form → POST /api/demo-requests → toast success
```
Copy promises Andreas + Reclaim scheduling within 1 business day.

### Bulk import (IMPLEMENTED)
CSV-style paste in `BulkImportDialog` → `POST /api/slices/bulk`

## Conversion goals (evidence-ranked)

1. **Book a demo** — primary CTA in nav, hero, case studies, footer sections
2. **Explore product** — `/explore` secondary product-led path
3. **Case study engagement** — content trust, PDF pack CTA → demo

## Funnel (evidence-based)

```
Visitor → Landing (PostHog pageview)
       → Intent (Explore OR scroll engagement)
       → Conversion (demo request form)
       → [UNKNOWN] sales follow-up / CRM
       → [UNKNOWN] product activation
```

PostHog is wired; no custom product events found in React source.
