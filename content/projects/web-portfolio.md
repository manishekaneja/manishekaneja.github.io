---
slug: web-portfolio
title: Web Portfolio
order: 1
featured: true
draft: false

thumbnail:
  src: /projects/web-portfolio/thumbnail.svg
  alt: Web Portfolio site thumbnail — split-toned navy and amber gradient
hero:
  src: /projects/web-portfolio/hero.svg
  alt: Web Portfolio hero — full-width banner showing the three-panel layout on a dark background
gallery:
  - src: /projects/web-portfolio/gallery-1.svg
    alt: Portfolio impact stats section with animated counters
  - src: /projects/web-portfolio/gallery-2.svg
    alt: Portfolio work-history timeline with company cards

techStack:
  - Next.js 15
  - TypeScript
  - React 19
  - CSS custom properties

blurb: A statically-exported personal portfolio built with Next.js App Router, designed around a "house-with-doors" metaphor — each section is a room you walk into.

lead: A statically-exported personal portfolio that doubles as a design system playground, built with **Next.js 15** and zero runtime dependencies.

metaDescription: Personal portfolio site built with Next.js 15 static export, TypeScript, and React 19 — fast, accessible, and fully offline-capable.

highlights:
  - "**100 / 100** Lighthouse score across performance, accessibility, and SEO"
  - "Static export — zero server, zero cold starts, deploys to GitHub Pages"
  - "**CSS custom properties** design system with automatic dark-mode via prefers-color-scheme"
  - "Projects CMS layer driven by **gray-matter** markdown files"

role: Solo engineer & designer
year: "2024"

liveUrl: https://manishekaneja.github.io
repoUrl: https://github.com/manishekaneja/manishekaneja.github.io
---

This portfolio started as a humble static page and evolved into a full Next.js App Router site with a typed content layer, a component-driven layout, and a hand-rolled dark-mode design system. The guiding metaphor is a "house with doors": the hero is the front door, each subsequent section is a room you can walk into — Work, Stack, Projects, About, Contact.

## Technical highlights

The content is decoupled from the presentation. Home-page copy lives in a `content.json` file validated by a typed loader (`data/content.ts`) that throws on any missing field at build time, not at runtime. The same rigour extends to the Projects layer: each project is a Markdown file with a strongly-validated frontmatter schema. Both loaders run once at build time and produce zero runtime overhead.

Images are served as static SVG or WebP assets under `public/`, kept small with a strict sizing contract (thumbnail 16:10, hero 16:9, gallery 4:3). The `next/image` `unoptimized` flag is intentional — the site targets GitHub Pages, which serves files verbatim; a CDN-based image pipeline would be over-engineering for a personal site.

CSS is hand-written using custom properties throughout, with a single `globals.css` that sets the full token palette. No Tailwind, no CSS-in-JS — the design system fits in one file and the specificity graph is flat.
