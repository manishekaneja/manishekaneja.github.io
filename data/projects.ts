/**
 * Build-time project content loader.
 *
 * Reads every `content/projects/*.md` file, validates the full collection,
 * applies defaults, and exports a typed API consumed by Phase 2 routes.
 *
 * Validation philosophy (mirrors content.ts):
 *   - assertField()  throws a clear [projects] error on any missing required value.
 *   - Collection-level constraints (unique slugs, exactly-one-featured = lowest-order)
 *     are checked after all individual files pass.
 *   - draft:true projects are filtered OUT before the public API surface returns them.
 *
 * NOTE: This module uses `fs` and `path` which are Node-only. It is safe to
 * import in Next.js Server Components and generateStaticParams() (both run at
 * build time in a static-export site). Do NOT import in Client Components.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project, ImageRef } from './projectTypes'

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects')

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function assertField(value: unknown, path: string): void {
  if (value === undefined || value === null) {
    throw new Error(`[projects] Missing required field: ${path}`)
  }
}

function assertString(value: unknown, path: string): string {
  assertField(value, path)
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`[projects] Field must be a non-empty string: ${path}`)
  }
  return value as string
}

function assertBoolean(value: unknown, path: string): boolean {
  assertField(value, path)
  if (typeof value !== 'boolean') {
    throw new Error(`[projects] Field must be a boolean: ${path}`)
  }
  return value as boolean
}

function assertInt(value: unknown, path: string): number {
  assertField(value, path)
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    throw new Error(`[projects] Field must be an integer: ${path}`)
  }
  return value as number
}

function assertImageRef(value: unknown, path: string): ImageRef {
  assertField(value, path)
  const obj = value as Record<string, unknown>
  const src = assertString(obj.src, `${path}.src`)
  const alt = assertString(obj.alt, `${path}.alt`)
  return { src, alt }
}

function assertImageRefArray(value: unknown, path: string): ImageRef[] {
  assertField(value, path)
  if (!Array.isArray(value)) {
    throw new Error(`[projects] Field must be an array: ${path}`)
  }
  return (value as unknown[]).map((item, i) => assertImageRef(item, `${path}[${i}]`))
}

function assertStringArray(value: unknown, path: string): string[] {
  assertField(value, path)
  if (!Array.isArray(value)) {
    throw new Error(`[projects] Field must be an array: ${path}`)
  }
  return (value as unknown[]).map((item, i) => {
    if (typeof item !== 'string' || item.trim() === '') {
      throw new Error(`[projects] Each element must be a non-empty string: ${path}[${i}]`)
    }
    return item as string
  })
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/

function assertSlug(value: unknown, filePath: string): string {
  const slug = assertString(value, `${filePath}#slug`)
  if (!SLUG_RE.test(slug)) {
    throw new Error(
      `[projects] slug "${slug}" in ${filePath} must match ^[a-z0-9]+(-[a-z0-9]+)*$ (kebab-case)`
    )
  }
  return slug
}

function assertUrl(value: string, path: string): void {
  if (!value.startsWith('https://')) {
    throw new Error(`[projects] URL field ${path} must start with "https://", got: ${value}`)
  }
}

// ---------------------------------------------------------------------------
// Single-file parse + validate
// ---------------------------------------------------------------------------

function parseProjectFile(filePath: string): Project & { draft: boolean } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: fm, content: body } = matter(raw)
  const fileName = path.basename(filePath)

  const slug = assertSlug(fm.slug, fileName)
  const title = assertString(fm.title, `${fileName}#title`)
  const order = assertInt(fm.order, `${fileName}#order`)
  const featured = assertBoolean(fm.featured, `${fileName}#featured`)
  const draft = assertBoolean(fm.draft, `${fileName}#draft`)
  const thumbnail = assertImageRef(fm.thumbnail, `${fileName}#thumbnail`)
  const hero = assertImageRef(fm.hero, `${fileName}#hero`)
  const gallery = assertImageRefArray(fm.gallery, `${fileName}#gallery`)

  if (gallery.length !== 0 && gallery.length !== 2) {
    throw new Error(
      `[projects] ${fileName}#gallery must have exactly 0 or 2 entries, got ${gallery.length}`
    )
  }

  const techStack = assertStringArray(fm.techStack, `${fileName}#techStack`)
  const blurb = assertString(fm.blurb, `${fileName}#blurb`)
  const highlights = assertStringArray(fm.highlights, `${fileName}#highlights`)
  const role = assertString(fm.role, `${fileName}#role`)
  const year = assertString(fm.year, `${fileName}#year`)

  // Optional fields — use blurb as default when absent
  const lead: string =
    fm.lead !== undefined && fm.lead !== null ? assertString(fm.lead, `${fileName}#lead`) : blurb
  const metaDescription: string =
    fm.metaDescription !== undefined && fm.metaDescription !== null
      ? assertString(fm.metaDescription, `${fileName}#metaDescription`)
      : blurb

  // Optional URL fields
  let liveUrl: string | undefined
  let repoUrl: string | undefined

  if (fm.liveUrl !== undefined && fm.liveUrl !== null) {
    liveUrl = assertString(fm.liveUrl, `${fileName}#liveUrl`)
    assertUrl(liveUrl, `${fileName}#liveUrl`)
  }
  if (fm.repoUrl !== undefined && fm.repoUrl !== null) {
    repoUrl = assertString(fm.repoUrl, `${fileName}#repoUrl`)
    assertUrl(repoUrl, `${fileName}#repoUrl`)
  }

  return {
    slug,
    title,
    order,
    featured,
    draft,
    thumbnail,
    hero,
    gallery,
    techStack,
    blurb,
    lead,
    metaDescription,
    highlights,
    role,
    year,
    liveUrl,
    repoUrl,
    body: body.trim(),
  }
}

// ---------------------------------------------------------------------------
// Collection-level validation
// ---------------------------------------------------------------------------

function validateCollection(projects: (Project & { draft: boolean })[]): void {
  // 1. Unique slugs across the whole collection (including drafts)
  const slugsSeen = new Set<string>()
  for (const p of projects) {
    if (slugsSeen.has(p.slug)) {
      throw new Error(`[projects] Duplicate slug "${p.slug}" found in collection`)
    }
    slugsSeen.add(p.slug)
  }

  // 2. Unique order values
  const ordersSeen = new Set<number>()
  for (const p of projects) {
    if (ordersSeen.has(p.order)) {
      throw new Error(
        `[projects] Duplicate order value ${p.order} — each project must have a unique order`
      )
    }
    ordersSeen.add(p.order)
  }

  // 3. Exactly one featured project across the whole collection
  const featuredProjects = projects.filter((p) => p.featured)
  if (featuredProjects.length !== 1) {
    throw new Error(
      `[projects] Exactly one project must have featured:true, found ${featuredProjects.length}`
    )
  }

  // 4. The featured project must have the lowest order value
  const lowestOrder = Math.min(...projects.map((p) => p.order))
  if (featuredProjects[0].order !== lowestOrder) {
    throw new Error(
      `[projects] The featured project must have the lowest order value. ` +
        `Featured project "${featuredProjects[0].slug}" has order ${featuredProjects[0].order}, ` +
        `but lowest order is ${lowestOrder}`
    )
  }
}

// ---------------------------------------------------------------------------
// Module-level load (runs once at build time / import time)
// ---------------------------------------------------------------------------

let _cache: Project[] | null = null

function loadAllProjects(): Project[] {
  if (_cache !== null) return _cache

  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`[projects] Content directory not found: ${CONTENT_DIR}`)
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort() // deterministic order before sort-by-order below

  if (files.length === 0) {
    throw new Error(`[projects] No .md files found in ${CONTENT_DIR}`)
  }

  // Parse + per-file validate
  const all: (Project & { draft: boolean })[] = files.map((f) =>
    parseProjectFile(path.join(CONTENT_DIR, f))
  )

  // Collection-level validate
  validateCollection(all)

  // Filter drafts and sort by order ascending
  const published = all.filter((p) => !p.draft).sort((a, b) => a.order - b.order)

  _cache = published
  return _cache
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns all non-draft projects sorted by `order` ascending.
 *
 * Validates the entire collection on first call (throws on any violation).
 * Subsequent calls return from cache.
 */
export function getAllProjects(): Project[] {
  return loadAllProjects()
}

/**
 * Returns the slugs of all published (non-draft) projects.
 * Intended for use in Next.js `generateStaticParams()`.
 *
 * @example
 *   export async function generateStaticParams() {
 *     return getPublishedSlugs().map((slug) => ({ slug }))
 *   }
 */
export function getPublishedSlugs(): string[] {
  return loadAllProjects().map((p) => p.slug)
}

/**
 * Returns the project matching the given slug, or `undefined` if not found
 * (or if the slug belongs to a draft project).
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return loadAllProjects().find((p) => p.slug === slug)
}
