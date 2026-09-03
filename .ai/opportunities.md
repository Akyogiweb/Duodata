# Opportunities (Impact × Confidence ÷ Effort)

## High leverage

| Opportunity | Impact | Effort | Notes |
|-------------|--------|--------|-------|
| Fix hero card/label sync | UX polish on primary landing | LOW | Align CSS transition durations in `Hero.jsx` |
| Add `.env.example` + docker-compose for Mongo | Unblocks local dev | LOW | environment.md gaps |
| Update SEO metadata (title, OG, description) | Acquisition / credibility | LOW | index.html still Emergent-branded |
| Secure admin endpoints | Security before launch | MEDIUM | Auth on GET demo-requests, write ops |
| Custom PostHog events on demo submit + explore actions | Measurement | LOW | No product events in React today |

## Medium leverage

| Opportunity | Impact | Effort | Notes |
|-------------|--------|--------|-------|
| Extract Explore subcomponents | Maintainability | MEDIUM | ExplorePage.jsx is large |
| README with real bootstrap docs | DX | LOW | Root README is empty |
| CI: frontend build + backend pytest | Quality gate | MEDIUM | pytest.ini exists but no tests in backend/ |
| `prefers-reduced-motion` on hero | A11y | LOW | Only DataSources marquee handles it |

## Lower priority

| Opportunity | Impact | Effort | Notes |
|-------------|--------|--------|-------|
| CMS for case studies | Content ops | HIGH | Mock data works for now |
| Replace mock testimonials with real | Trust | MEDIUM | Marketing content task |
