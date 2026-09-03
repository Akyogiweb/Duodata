# Unknowns

| Unknown | Why | Best next verification |
|---------|-----|------------------------|
| Is preview URL still valid? | Returned 404 locally | Check Emergent dashboard / redeploy |
| Where do demo requests go after Mongo? | No webhook/email in code | Inspect production Mongo + ops runbook |
| Intended SEO/canonical domain | index.html is Emergent placeholder | Check DNS / production deploy config |
| Mobile IA differences | Only desktop testing documented | Responsive audit at 375px |
| Auth roadmap | testIds/auth.js exists but no auth UI | Ask product owner or search other branches |
| Real design source of truth | No Figma links in repo | Check external design tools |
| Performance budget | No Lighthouse CI | Run Lighthouse on production build |
| Data retention policy for leads | Not documented | Legal/compliance review |
