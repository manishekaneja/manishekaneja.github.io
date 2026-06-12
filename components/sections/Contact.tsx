// Contact section — content from data/content.ts
import Link from 'next/link'
import { MailIcon } from '@/lib/icons'
import { content } from '@/data/content'
import { PROJECTS_ENABLED } from '@/data/flags'

const { contact } = content

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact">
        <div className="eyebrow" style={{ marginBottom: '14px' }}>{contact.eyebrow}</div>
        <h2>{contact.heading}</h2>
        <p>{contact.paragraph}</p>
        <div className="cta-row">
          <a className="cta primary" href={contact.primaryCta.href}>
            <MailIcon width={17} height={17} />
            {contact.primaryCta.label}
          </a>
          {contact.ghostCtas.map((cta, i) => (
            <a
              key={i}
              className="cta ghost"
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta.label}
            </a>
          ))}
          {/* Internal link to the projects exhibition (designed CTA) */}
          {PROJECTS_ENABLED && (
            <Link className="cta ghost" href="/projects">
              Projects ↗
            </Link>
          )}
        </div>
      </div>
      <div className="colophon">
        {contact.colophon.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
    </section>
  )
}
