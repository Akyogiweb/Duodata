# Risks

| Risk | Severity | Evidence | Mitigation |
|------|----------|----------|------------|
| Open API — anyone can CRUD slices, list leads | HIGH | No auth on `/api/slices`, `/api/demo-requests` GET | Add auth before public production |
| PII in demo_requests exposed via GET | HIGH | `list_demo_requests` unauthenticated | Restrict admin routes |
| Preview/deployment drift | MEDIUM | Preview 404; tests point to old URL | Update BASE_URL, redeploy |
| `emergentintegrations` blocks pip install | MEDIUM | requirements.txt | Make optional or document private index |
| Hero animation quality | LOW (UX) | test_result.md failures | Sync transition timings |
| SEO placeholder metadata | MEDIUM | Emergent title in index.html | Update meta tags |
| No CI/CD | MEDIUM | No `.github/workflows` | Add build/test pipeline |
| Dependency on Emergent scripts | LOW | emergent-main.js, visual-edits | Document platform coupling |
| MongoDB single point | MEDIUM | All state in one DB | Backup/HA for production |
