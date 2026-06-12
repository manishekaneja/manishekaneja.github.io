import type { MetadataRoute } from 'next'
import { getPublishedSlugs } from '@/data/projects'

// Absolute base for the deployed GitHub Pages user site. Paths carry a trailing
// slash to match the emitted index.html routes (next.config trailingSlash: true).
const BASE = 'https://manishekaneja.github.io'

// Required so the sitemap route is emitted as a static file under output: 'export'.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/projects/`, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = getPublishedSlugs().map((slug) => ({
    url: `${BASE}/projects/${slug}/`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
