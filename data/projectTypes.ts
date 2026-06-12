/**
 * TypeScript interfaces for the projects content layer.
 *
 * Bold markup convention: `highlights` strings may contain **...** markers.
 * The richText() helper in content.ts parses these at render time.
 * The loader returns raw strings; no parsing happens here.
 */

/** A reference to a single image asset. */
export interface ImageRef {
  /** Path relative to the public/ directory, e.g. "/projects/foo/hero.svg" */
  src: string
  /** Meaningful alt text for accessibility and SEO. */
  alt: string
}

/**
 * A fully-validated, normalised project entry.
 * All optional frontmatter fields have been resolved to their defaults before
 * this interface is populated — consumers can treat every field as present.
 */
export interface Project {
  // --- identification ---
  /** Kebab-case slug, e.g. "web-portfolio". Stored explicitly in frontmatter. */
  slug: string
  /** Display title. */
  title: string

  // --- listing control ---
  /** 1-based listing order; also drives the "01" badge. */
  order: number
  /**
   * Exactly one project in the collection must have featured=true, and it
   * must also have the lowest order value.
   */
  featured: boolean
  /**
   * Draft projects are excluded from getAllProjects() / getPublishedSlugs().
   * Not present on normalised entries returned by the loader (filtered out).
   */
  draft: boolean

  // --- images ---
  /** 16:10 card thumbnail. */
  thumbnail: ImageRef
  /** 16:9 detail-page hero. */
  hero: ImageRef
  /**
   * Zero or exactly two gallery images (4:3 each).
   * Length 1 is invalid and rejected at load time.
   */
  gallery: ImageRef[]

  // --- copy ---
  /** Short card text. Doubles as the `lead` / `metaDescription` default. */
  blurb: string
  /** Detail page hero subheading. Defaults to `blurb` when not set. */
  lead: string
  /** Per-project <meta name="description"> / OG description. Defaults to `blurb`. */
  metaDescription: string
  /**
   * Bullet-point highlights for the detail page sidebar.
   * Each entry may contain **bold** markers; rendered by richText() at call-site.
   */
  highlights: string[]

  // --- metadata ---
  /** Tech stack chips, e.g. ["Next.js", "TypeScript", "Tailwind"]. */
  techStack: string[]
  /** Role label, e.g. "Solo engineer" or "Lead front-end". */
  role: string
  /** Year or year range string, e.g. "2024" or "2023–24". */
  year: string

  // --- links (optional — undefined means not provided) ---
  /** Must start with https:// when present. */
  liveUrl?: string
  /** Must start with https:// when present. */
  repoUrl?: string

  // --- body ---
  /**
   * Raw GFM markdown body (everything after the frontmatter block).
   * Phase 2 renders this with react-markdown + remark-gfm.
   */
  body: string
}
