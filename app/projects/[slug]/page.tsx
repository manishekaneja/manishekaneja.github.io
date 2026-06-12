import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ReactNode } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { ArrowUpRightIcon } from '@/lib/icons'
import { getAllProjects, getProjectBySlug, getPublishedSlugs } from '@/data/projects'

export const dynamicParams = false

export async function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const title = `${project.title} — Project — Manish Aneja`
  const description = project.metaDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [{ url: project.hero.src, alt: project.hero.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.hero.src],
    },
  }
}

/**
 * Parses "**bold** normal **bold**" into ReactNode[] with <strong> for bold segments.
 * Odd-indexed segments (between ** pairs) become <strong>. Even-indexed are plain text.
 */
function richTextStrong(s: string): ReactNode[] {
  const parts = s.split('**')
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const all = getAllProjects()
  const currentIndex = all.findIndex((p) => p.slug === slug)
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null

  const badge = `Project · ${String(project.order).padStart(2, '0')}`

  return (
    <div className="project-detail">
      <header className="wrap proj-top">
        <Link href="/" className="proj-brandmark">
          <span className="m">MA</span>
          Manish Aneja
        </Link>
        <div className="proj-top-right">
          <Link href="/projects" className="pilllink">← All projects</Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="wrap det-hero">
        <div className="ph-index">{badge}</div>
        <h1>{project.title}</h1>
        <p className="ph-lead">{richTextStrong(project.lead)}</p>
        <div className="det-stack">
          {project.techStack.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="hero-links">
          {project.liveUrl && (
            <a className="btn primary" href={project.liveUrl} target="_blank" rel="noopener">
              Live demo <ArrowUpRightIcon width={15} height={15} />
            </a>
          )}
          {project.repoUrl && (
            <a className="btn ghost" href={project.repoUrl} target="_blank" rel="noopener">
              View code
            </a>
          )}
        </div>
      </section>

      <div className="wrap">
        <div className="shot-hero">
          <img src={project.hero.src} alt={project.hero.alt} />
        </div>
      </div>

      <main className="wrap pd-layout">
        <article>
          {/* Section 01: Overview — react-markdown renders body GFM */}
          <section className="overview">
            <div className="det-sec-head">
              <span className="num">01</span>
              <h2>Overview</h2>
              <span className="line" />
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.body}
            </ReactMarkdown>
          </section>

          {/* Section 02: Highlights */}
          <section className="det-block">
            <div className="det-sec-head">
              <span className="num">02</span>
              <h2>Highlights</h2>
              <span className="line" />
            </div>
            <ul className="highlights">
              {project.highlights.map((h, i) => (
                <li key={i}>{richTextStrong(h)}</li>
              ))}
            </ul>
          </section>

          {/* Section 03: Gallery — only when exactly 2 images */}
          {project.gallery.length === 2 && (
            <section className="det-block">
              <div className="det-sec-head">
                <span className="num">03</span>
                <h2>More views</h2>
                <span className="line" />
              </div>
              <div className="shots-2">
                {project.gallery.map((img) => (
                  <div key={img.src} className="frame">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Meta sidebar */}
        <aside className="pd-meta">
          <div className="row">
            <div className="k">Role</div>
            <div className="v">{project.role}</div>
          </div>
          <div className="row">
            <div className="k">Year</div>
            <div className="v muted">{project.year}</div>
          </div>
          <div className="row">
            <div className="k">Stack</div>
            <div className="v muted">{project.techStack.join(' · ')}</div>
          </div>
          {(project.liveUrl || project.repoUrl) && (
            <div className="row">
              <div className="k">Links</div>
              <div className="mlinks">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener">
                    Live demo ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener">
                    Source code ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </aside>
      </main>

      {/* Pager */}
      <nav className="wrap pager">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="prev">
            <span className="lbl">← Back</span>
            <span className="nm">{prev.title}</span>
          </Link>
        ) : (
          <Link href="/projects" className="prev">
            <span className="lbl">← Back</span>
            <span className="nm">All projects</span>
          </Link>
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="next">
            <span className="lbl">Next →</span>
            <span className="nm">{next.title}</span>
          </Link>
        )}
      </nav>

      <footer className="wrap det-colophon">
        <span>© 2026 Manish Aneja</span>
        <span>Gurgaon, IN · manishekaneja@gmail.com</span>
      </footer>
    </div>
  )
}
