import ThemeToggle from './ThemeToggle'
import ScrollSpyNav from './ScrollSpyNav'
import { GitHubIcon, LinkedInIcon, DocIcon } from '@/lib/icons'
import { content } from '@/data/content'

const { identity } = content

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* ---- top: avatar + theme toggle ---- */}
      <div className="sb-top">
        <div className="mono-avatar">MA</div>
        <ThemeToggle />
      </div>

      {/* ---- name block ---- */}
      <div className="name-block">
        <h1>{identity.name[0]}<br />{identity.name[1]}</h1>
        <div className="role">
          {identity.role}{' '}
          <span className="at">{identity.roleAccent}</span>
        </div>
      </div>

      {/* ---- meta ---- */}
      <div className="meta">
        <span><i className="dot"></i> {identity.meta.location}</span>
        <a href={`mailto:${identity.meta.email}`}><i className="dot"></i> {identity.meta.email}</a>
        <a href={`tel:${identity.meta.phone.replace(/\s/g, '')}`}><i className="dot"></i> {identity.meta.phone}</a>
      </div>

      {/* ---- status pill ---- */}
      <div className="status">
        <span className="pulse"></span>
        <div className="status-lines">
          {identity.statusPill.map((row, i) => (
            <span key={i} style={{ color: row.color, fontWeight: row.fontWeight }}>{row.text}</span>
          ))}
        </div>
      </div>

      {/* ---- scroll-spy nav ---- */}
      <ScrollSpyNav />

      {/* ---- footer: socials + résumé ---- */}
      <div className="sb-foot">
        <div className="socials">
          <a
            href={identity.socials.github.href}
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon />
            {identity.socials.github.label}
          </a>
          <a
            href={identity.socials.linkedin.href}
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
            {identity.socials.linkedin.label}
          </a>
        </div>
        {/* TODO: switch href to /resume.pdf once the file is dropped at public/resume.pdf (§10) */}
        <a className="resume-btn" href={identity.resume.href}>
          <DocIcon />
          {identity.resume.label}
        </a>
      </div>
    </aside>
  )
}
