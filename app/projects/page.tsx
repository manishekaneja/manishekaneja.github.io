import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import RevealOnScroll from '@/components/RevealOnScroll'
import { GitHubIcon, LinkedInIcon, HashnodeIcon, ArrowUpRightIcon } from '@/lib/icons'
import { getAllProjects } from '@/data/projects'
import { projectsPage } from '@/data/projectsPage'

export const metadata: Metadata = {
  title: 'Projects — Manish Aneja',
  description: projectsPage.hero.sub,
  openGraph: {
    title: 'Projects — Manish Aneja',
    description: projectsPage.hero.sub,
    type: 'website',
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const count = projects.length
  const copy = projectsPage

  return (
    <div className="projects-listing">
      <RevealOnScroll />

      <header className="wrap proj-top">
        <Link href="/" className="proj-brandmark">
          <span className="m">MA</span>
          Manish Aneja
        </Link>
        <div className="proj-top-right">
          <Link href="/" className="pilllink">← Portfolio</Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="wrap expo-hero">
        <div className="eyebrow">{copy.hero.eyebrow}</div>
        <h1>
          {copy.hero.h1}{' '}
          <span className="grn">{copy.hero.h1Accent}</span>
        </h1>
        <p className="sub">{copy.hero.sub}</p>
        <div className="metarow">
          <span className="pip">
            <span className="dot" />
            {count} {count === 1 ? 'project' : 'projects'}
          </span>
          <span className="techline">{copy.hero.techLine}</span>
        </div>
      </section>

      <main className="wrap">
        <div className="expo-grid">
          {projects.map((p) => {
            const isFeat = p.featured
            const badge = String(p.order).padStart(2, '0')
            const imgSrc = isFeat ? p.hero.src : p.thumbnail.src
            const imgAlt = isFeat ? p.hero.alt : p.thumbnail.alt

            return (
              <article key={p.slug} className={`pcard${isFeat ? ' feat' : ''} reveal`}>
                <div className="shot">
                  <span className="idx">{badge}</span>
                  <img src={imgSrc} alt={imgAlt} />
                </div>
                <div className="pbody">
                  {isFeat && <div className="ribbon">Featured</div>}
                  <h3>{p.title}</h3>
                  <div className="pstack">
                    {p.techStack.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                  <p className="desc">{p.blurb}</p>
                  <div className="plinks">
                    {p.liveUrl && (
                      <a
                        className="plink view"
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener"
                        aria-label={`View ${p.title} live demo`}
                      >
                        View project <ArrowUpRightIcon />
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        className="plink code"
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener"
                        aria-label={`View ${p.title} source code`}
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
                {/* Stretched-link: whole card navigates to detail page */}
                <Link
                  href={`/projects/${p.slug}`}
                  className="card-cover"
                  aria-label={p.title}
                />
              </article>
            )
          })}
        </div>
      </main>

      <footer className="wrap">
        <div className="expo-foot">
          <div>
            <div className="ftitle">{copy.footer.ftitle}</div>
            <p className="fsub">
              {copy.footer.fsub}{' '}
              <Link href={copy.footer.fsubLinkHref}>{copy.footer.fsubLinkLabel}</Link>
            </p>
          </div>
          <div className="expo-socials">
            {copy.footer.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener">
                {s.icon === 'github'   && <GitHubIcon />}
                {s.icon === 'linkedin' && <LinkedInIcon />}
                {s.icon === 'hashnode' && <HashnodeIcon />}
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="expo-colophon">
          <span>{copy.footer.colophon.copy}</span>
          <span>{copy.footer.colophon.location}</span>
        </div>
      </footer>
    </div>
  )
}
