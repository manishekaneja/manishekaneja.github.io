# Manish Aneja — Portfolio

Editorial single-page portfolio for Manish Aneja, Senior Android Engineer at Blinkit.
Live at **https://manishekaneja.github.io/**.

---

## Tech stack

- **Next.js 15 (App Router)** — static export (`output: 'export'`); `next build` emits the site into `out/`
- **TypeScript** — strict mode throughout
- **Fonts via `next/font/google`** — Space Grotesk (display), Hanken Grotesk (body), JetBrains Mono (mono); self-hosted at build, no runtime Google Fonts requests
- **Plain CSS** — single `app/globals.css` holds all design tokens and component rules; no Tailwind, no CSS Modules
- **GitHub Pages** — deployed from the `out/` artifact via GitHub Actions on push to `master`

---

## Features

- Sticky sidebar + scrollable content sections: Intro, Impact, Selected Work, Stack, About, Contact
- Light / dark theme with `localStorage` persistence, `prefers-color-scheme` default, and an anti-FOUC inline head script
- Theme switch animation: curtain reveal via the View Transitions API (800 ms), with a reduced-motion fallback
- Scroll-spy navigation — active sidebar link tracks the section in viewport via `IntersectionObserver`
- Responsive breakpoints: single-column layout at ≤ 920 px, collapsing sub-grids at ≤ 680 px and ≤ 560 px
- Reduced-motion and accessibility: `:focus-visible` outline, `aria-label` on interactive elements, `prefers-reduced-motion` disables animations and smooth-scroll

---

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run typecheck  # tsc --noEmit
```

---

## Deployment

GitHub Actions builds `out/` on every push to `master` (or `main`) and deploys it to GitHub Pages.
See `.github/workflows/deploy.yml`. This is the root user-pages site — no `basePath`, no `CNAME`.

---

## Project structure

```
app/
├── layout.tsx        # root layout: fonts, anti-FOUC script, metadata
├── page.tsx          # single route "/"; composes <Sidebar> + six sections
└── globals.css       # all design tokens + component CSS

components/
├── Sidebar.tsx       # sticky sidebar (avatar, name, role, meta, status, nav, footer)
├── ThemeToggle.tsx   # light/dark toggle with curtain view-transition
├── ScrollSpyNav.tsx  # IntersectionObserver-based active nav links
├── StatGrid.tsx      # six impact stats
├── Job.tsx           # one work-history row
├── SkillGroup.tsx    # one skill group (label + chips)
├── EducationCard.tsx # education card
└── sections/
    ├── Intro.tsx
    ├── Impact.tsx
    ├── SelectedWork.tsx
    ├── Stack.tsx
    ├── About.tsx
    └── Contact.tsx

data/                 # content layer
├── content.json      # all portfolio copy, stats, jobs, chips — single source of truth
├── types.ts          # TypeScript interfaces (PortfolioContent + sub-types)
└── content.ts        # typed loader: validates content.json at module load,
                      # exports `content` + the richText() bold-marker parser

lib/
└── icons.tsx         # inline SVG components (Sun, Moon, GitHub, LinkedIn, Mail, Doc)

public/
└── .nojekyll         # prevents GitHub Pages from running Jekyll on the output
```

---

## Previous version

The prior 3D explorable house (Vite + three.js) is archived at:
- Git tag: `v1-3d-house`
- Branch: `archive/3d-house`

---

© 2026 Manish Aneja — personal project.
