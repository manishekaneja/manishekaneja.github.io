/**
 * Typed portfolio content loader.
 *
 * Imports content.json, validates required fields at module load,
 * and exports the typed content + the richText() helper for rendering
 * **bold** markers as <b> spans in JSX.
 *
 * Bold markup convention: strings with **...** markers are parsed by
 * richText() into ReactNode arrays where each ** pair becomes <b>.
 * Strings without ** render as plain text nodes.
 */

import { ReactNode, createElement, Fragment } from 'react'
import raw from './content.json'
import type { PortfolioContent } from './types'

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function assertField(value: unknown, path: string): void {
  if (value === undefined || value === null) {
    throw new Error(`[content] Missing required field: ${path}`)
  }
}

function validateContent(c: unknown): PortfolioContent {
  const d = c as PortfolioContent

  assertField(d.identity, 'identity')
  assertField(d.identity.name, 'identity.name')
  if (!Array.isArray(d.identity.name) || d.identity.name.length < 2) {
    throw new Error('[content] identity.name must be an array with at least 2 entries')
  }
  assertField(d.identity.role, 'identity.role')
  assertField(d.identity.roleAccent, 'identity.roleAccent')
  assertField(d.identity.meta?.location, 'identity.meta.location')
  assertField(d.identity.meta?.email, 'identity.meta.email')
  assertField(d.identity.meta?.phone, 'identity.meta.phone')
  assertField(d.identity.statusPill, 'identity.statusPill')
  if (!Array.isArray(d.identity.statusPill) || d.identity.statusPill.length < 2) {
    throw new Error('[content] identity.statusPill must have at least 2 rows')
  }
  assertField(d.identity.socials?.github?.href, 'identity.socials.github.href')
  assertField(d.identity.socials?.linkedin?.href, 'identity.socials.linkedin.href')
  assertField(d.identity.resume?.label, 'identity.resume.label')
  assertField(d.identity.resume?.href, 'identity.resume.href')

  assertField(d.intro?.lead, 'intro.lead')
  assertField(d.intro?.leadSub, 'intro.leadSub')

  assertField(d.impact?.stats, 'impact.stats')
  if (!Array.isArray(d.impact.stats) || d.impact.stats.length !== 6) {
    throw new Error('[content] impact.stats must have exactly 6 entries')
  }

  assertField(d.work?.jobs, 'work.jobs')
  if (!Array.isArray(d.work.jobs) || d.work.jobs.length !== 4) {
    throw new Error('[content] work.jobs must have exactly 4 entries')
  }

  assertField(d.stack?.groups, 'stack.groups')
  if (!Array.isArray(d.stack.groups) || d.stack.groups.length !== 6) {
    throw new Error('[content] stack.groups must have exactly 6 entries')
  }

  assertField(d.about?.paragraphs, 'about.paragraphs')
  if (!Array.isArray(d.about.paragraphs) || d.about.paragraphs.length !== 3) {
    throw new Error('[content] about.paragraphs must have exactly 3 entries')
  }
  assertField(d.about?.education?.degree, 'about.education.degree')
  assertField(d.about?.education?.school, 'about.education.school')
  assertField(d.about?.education?.detail, 'about.education.detail')

  assertField(d.contact?.eyebrow, 'contact.eyebrow')
  assertField(d.contact?.heading, 'contact.heading')
  assertField(d.contact?.paragraph, 'contact.paragraph')
  assertField(d.contact?.primaryCta?.label, 'contact.primaryCta.label')
  assertField(d.contact?.primaryCta?.href, 'contact.primaryCta.href')
  assertField(d.contact?.ghostCtas, 'contact.ghostCtas')
  if (!Array.isArray(d.contact.ghostCtas) || d.contact.ghostCtas.length < 1) {
    throw new Error('[content] contact.ghostCtas must have at least 1 entry')
  }
  assertField(d.contact?.colophon, 'contact.colophon')
  if (!Array.isArray(d.contact.colophon) || d.contact.colophon.length !== 3) {
    throw new Error('[content] contact.colophon must have exactly 3 entries')
  }

  return d
}

export const content: PortfolioContent = validateContent(raw)

// ---------------------------------------------------------------------------
// richText() — parse **bold** markers into ReactNode[]
// ---------------------------------------------------------------------------
// Splits a string on ** boundaries and wraps every odd segment (bold run)
// with <b>. Adjacent text segments are plain strings; the result is a
// ReactNode[] suitable for rendering inside JSX.
//
// Example:
//   richText("foo **bar** baz")
//   → ["foo ", <b>bar</b>, " baz"]
//
// Segments without ** pass through as a single-element string array.
// ---------------------------------------------------------------------------

export function richText(text: string): ReactNode[] {
  const parts = text.split('**')
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      // Odd index = between ** pairs = bold
      return createElement('b', { key: i }, part)
    }
    return part
  })
}

// Convenience: richText wrapped in a Fragment (for single-expression use)
export function rich(text: string): ReactNode {
  return createElement(Fragment, null, ...richText(text))
}
