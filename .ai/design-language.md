# Design Language

**Maturity:** PARTIAL / EMERGENT — shadcn token base + custom Duodata marketing styles in `App.css`

## Brand palette (CONFIRMED — repeated usage)

| Token | Value | Usage |
|-------|-------|-------|
| Brand blue | `#1E5FEE` | Accent text, active states, status-implemented tint |
| Ink | `#0a0a0a` | Headlines, primary buttons, body on light |
| Canvas | `#ffffff` | Landing background |
| Explore dark | `#141416` | Explore page dialogs/dropdowns |
| Pastel animation | `#A9C7E8`, `#7FD1E8`, `#B9B4E8`, `#A9D8CF` | Hero line/card accents |

## Typography

| Role | Spec | Evidence |
|------|------|----------|
| Primary font | Inter (600 loaded; 800 used via class) | `index.html`, `.hero-headline` |
| Hero headline | 64–128px, weight 800, letter-spacing -0.06em, line-height 0.95 | `Hero.jsx`, `App.css` |
| Eyebrow / label | 11px, tracking 0.28em, uppercase | Nav sections, case studies |
| Body | 14–15px, slate-600 | Feature blocks, case studies |

## Layout

- **Max content width:** 1440px (hero), 1200px (case studies)
- **Nav:** Fixed floating pill, `top-4`, rounded-full, white/95 + blur
- **Section rhythm:** `py-24 md:py-36` for major sections

## Components (custom, non-shadcn)

| Class | Purpose |
|-------|---------|
| `.pill-btn-dark` | Primary CTA — black pill, white text |
| `.pill-btn-ghost` | Nav links |
| `.hero-headline` | Display typography |
| `.status-pill` + `.status-*` | Slice status badges (Explore) |
| `.browser-frame` | Product screenshot mock |
| `.ds-table-marquee` | Vertical scrolling data table bg (40s loop) |
| `.nav-pill-shadow` | Floating nav elevation |

## Motion

| Element | Behavior | Reduced motion |
|---------|----------|----------------|
| Hero cycle | 6 states, ~5.1s/cycle, enter/draw/hold/exit/gap phases | Not handled |
| Lineage diagram | Scroll-progress reveal (0→1) | Not handled |
| DataSources table | CSS `translateY(-50%)` infinite | `prefers-reduced-motion: reduce` disables |

## shadcn/ui

- Style: **new-york**, base color **neutral**, CSS variables in `index.css`
- Full component library present under `components/ui/` — used heavily on Explore + modals

## Known visual defect (CONFIRMED)

Hero `QuestionCard` and `SourceNode` label transitions are **not synchronized** during `enter` phase (650ms vs 700ms exit mismatch). Gap phase (450ms) works but card reaches opacity 1 before label.
