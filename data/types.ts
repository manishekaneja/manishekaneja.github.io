/**
 * TypeScript interfaces for the portfolio content data layer.
 *
 * Bold markup convention: strings that contain <b> in the rendered output
 * use **...** markers (GitHub-Markdown-style) to delimit bold runs.
 * The richText() helper in content.ts parses these into ReactNode arrays.
 * Strings WITHOUT ** markers render as plain text.
 */

export interface StatusPillRow {
  text: string
  /** CSS custom-property reference, e.g. "var(--ink)" */
  color: string
  fontWeight?: number
}

export interface Social {
  label: string
  href: string
}

export interface ResumeCta {
  label: string
  /** mailto: or /resume.pdf once a PDF is available */
  href: string
}

export interface Identity {
  name: string[]  // ["Manish", "Aneja"] — rendered as two lines in h1
  /** Plain role text before the accent part */
  role: string
  /** Accent text (the "· Blinkit" part) — rendered with .at class */
  roleAccent: string
  meta: {
    location: string
    email: string
    phone: string
  }
  statusPill: StatusPillRow[]
  socials: {
    github: Social
    linkedin: Social
  }
  resume: ResumeCta
}

export interface Intro {
  /** May contain **bold** markers */
  lead: string
  leadSub: string
}

export interface Stat {
  /** Numeric display string, e.g. "4", "99.98", "−12" */
  number: string
  unit: string
  /** Optional prefix rendered with .plus class, e.g. "+" */
  plus?: string
  label: string
}

export interface Job {
  tag?: string
  company: string
  /** Each entry is a .yr line in the .when column */
  meta: string[]
  title: string
  titleline: string
  /** May contain **bold** markers */
  bullets: string[]
}

export interface SkillGroupData {
  label: string
  chips: string[]
}

export interface Education {
  degree: string
  school: string
  detail: string
}

export interface GhostCta {
  label: string
  href: string
}

export interface Contact {
  eyebrow: string
  heading: string
  paragraph: string
  primaryCta: {
    label: string
    href: string
  }
  ghostCtas: GhostCta[]
  colophon: string[]
}

export interface PortfolioContent {
  identity: Identity
  intro: Intro
  impact: {
    stats: Stat[]
  }
  work: {
    jobs: Job[]
  }
  stack: {
    groups: SkillGroupData[]
  }
  about: {
    /** Plain text paragraphs (no bold markers) */
    paragraphs: string[]
    education: Education
  }
  contact: Contact
}
