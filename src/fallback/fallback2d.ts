// 2D fallback portfolio — same content.ts, clean scrollable layout
import { content } from '../data/content'

export function mountFallback2D(): void {
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'

  const app = document.getElementById('app') ?? document.body
  app.innerHTML = ''
  app.style.cssText = 'width:100%;min-height:100vh;overflow:visible'

  const container = document.createElement('div')
  container.id = 'fallback-container'
  container.setAttribute('role', 'main')
  container.style.cssText = `
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    color: var(--color-text, #2c2420);
  `

  // Hero header
  container.appendChild(buildHero())

  // Nav (skip links to sections)
  container.appendChild(buildNav())

  // All 5 sections
  container.appendChild(buildAbout())
  container.appendChild(buildExperience())
  container.appendChild(buildSkills())
  container.appendChild(buildProjects())
  container.appendChild(buildContact())

  app.appendChild(container)
}

function sep(): HTMLElement {
  const hr = document.createElement('hr')
  hr.style.cssText = 'border:none;border-top:1px solid var(--color-border,#e0d8d2);margin:40px 0'
  return hr
}

function sectionHeading(text: string, id: string): HTMLElement {
  const h2 = document.createElement('h2')
  h2.id = id
  h2.textContent = text
  h2.style.cssText = `
    font-family: var(--font-display, Georgia, serif);
    font-size: 1.5rem;font-weight: 700;
    color: var(--color-text, #2c2420);
    margin: 0 0 24px 0;
  `
  return h2
}

function buildHero(): HTMLElement {
  const header = document.createElement('header')
  header.style.cssText = 'margin-bottom:48px'

  const name = document.createElement('h1')
  name.textContent = content.profile.name
  name.style.cssText = `
    font-family: var(--font-display, Georgia, serif);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--color-text, #2c2420);
    margin: 0 0 8px 0;
  `
  header.appendChild(name)

  const title = document.createElement('p')
  title.textContent = content.profile.title
  title.style.cssText = 'font-size:1.1rem;color:var(--color-accent,#c4673a);font-weight:600;margin:0 0 16px 0'
  header.appendChild(title)

  if (content.profile.location) {
    const loc = document.createElement('p')
    loc.textContent = content.profile.location
    loc.style.cssText = 'font-size:0.9rem;color:var(--color-text-muted,#6b5c56);margin:0 0 24px 0'
    header.appendChild(loc)
  }

  const ctaRow = document.createElement('div')
  ctaRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px'
  for (const link of content.contact) {
    const a = document.createElement('a')
    a.href = link.url
    if (!link.url.startsWith('mailto:')) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    }
    a.textContent = link.label
    a.style.cssText = `
      display:inline-flex;align-items:center;
      padding:8px 20px;border-radius:8px;
      font-size:0.875rem;font-weight:600;
      text-decoration:none;
      background:var(--color-accent,#c4673a);color:#fff;
      border:2px solid var(--color-accent,#c4673a);
    `
    ctaRow.appendChild(a)
  }
  header.appendChild(ctaRow)
  return header
}

function buildNav(): HTMLElement {
  const nav = document.createElement('nav')
  nav.setAttribute('aria-label', 'Skip to section')
  nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px'

  const sections: Array<[string, string]> = [
    ['About', 'section-about'],
    ['Experience', 'section-experience'],
    ['Skills', 'section-skills'],
    ['Projects', 'section-projects'],
    ['Contact', 'section-contact'],
  ]

  for (const [label, id] of sections) {
    const a = document.createElement('a')
    a.href = `#${id}`
    a.textContent = label
    a.style.cssText = `
      padding:6px 16px;border-radius:20px;
      font-size:0.85rem;font-weight:500;
      text-decoration:none;
      border:1px solid var(--color-border,#e0d8d2);
      color:var(--color-text,#2c2420);
    `
    nav.appendChild(a)
  }
  return nav
}

function buildAbout(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'section-about'
  section.appendChild(sectionHeading('About', 'heading-about'))

  const summary = document.createElement('p')
  summary.textContent = content.profile.summary
  summary.style.cssText = 'line-height:1.7;margin-bottom:24px'
  section.appendChild(summary)

  if (content.awards?.length) {
    const title = document.createElement('h3')
    title.textContent = 'Recognition'
    title.style.cssText = 'font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted,#6b5c56);margin-bottom:10px'
    section.appendChild(title)
    const list = document.createElement('ul')
    list.style.cssText = 'list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px'
    for (const award of content.awards) {
      const li = document.createElement('li')
      li.textContent = `${award.name} (${award.year})`
      li.style.cssText = 'font-size:0.85rem;background:var(--color-border,#e0d8d2);padding:4px 12px;border-radius:20px'
      list.appendChild(li)
    }
    section.appendChild(list)
  }

  if (content.education?.length) {
    const title = document.createElement('h3')
    title.textContent = 'Education'
    title.style.cssText = 'font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted,#6b5c56);margin-bottom:10px'
    section.appendChild(title)
    const edu = content.education[0]
    const p = document.createElement('p')
    p.textContent = `${edu.degree} — ${edu.institution} (${edu.start}–${edu.end})${edu.gpa ? ` · CGPA ${edu.gpa}` : ''}`
    p.style.cssText = 'font-size:0.9rem'
    section.appendChild(p)
  }

  section.appendChild(sep())
  return section
}

function buildExperience(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'section-experience'
  section.appendChild(sectionHeading('Experience', 'heading-experience'))

  for (const role of content.experience) {
    const card = document.createElement('article')
    card.style.cssText = 'border-left:3px solid var(--color-accent,#c4673a);padding-left:16px;margin-bottom:24px'

    const h3 = document.createElement('h3')
    h3.textContent = role.title
    h3.style.cssText = 'font-size:1rem;font-weight:600;margin:0 0 2px 0'
    card.appendChild(h3)

    const meta = document.createElement('p')
    meta.textContent = `${role.company} · ${role.start} – ${role.end ?? 'Present'}`
    meta.style.cssText = 'font-size:0.875rem;color:var(--color-accent,#c4673a);margin:0 0 8px 0'
    card.appendChild(meta)

    if (role.bullets.length) {
      const ul = document.createElement('ul')
      ul.style.cssText = 'padding-left:18px;margin:0;display:flex;flex-direction:column;gap:4px'
      for (const b of role.bullets) {
        const li = document.createElement('li')
        li.textContent = b
        li.style.cssText = 'font-size:0.875rem;line-height:1.6'
        ul.appendChild(li)
      }
      card.appendChild(ul)
    }
    section.appendChild(card)
  }

  section.appendChild(sep())
  return section
}

function buildSkills(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'section-skills'
  section.appendChild(sectionHeading('Skills', 'heading-skills'))

  for (const group of content.skills) {
    const wrap = document.createElement('div')
    wrap.style.cssText = 'margin-bottom:20px'

    const title = document.createElement('h3')
    title.textContent = group.name
    title.style.cssText = 'font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-text-muted,#6b5c56);margin-bottom:10px'
    wrap.appendChild(title)

    const chips = document.createElement('div')
    chips.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px'
    for (const skill of group.skills) {
      const chip = document.createElement('span')
      chip.textContent = skill
      chip.style.cssText = 'font-size:0.8rem;font-weight:500;background:var(--color-border,#e0d8d2);color:var(--color-text,#2c2420);padding:4px 12px;border-radius:20px'
      chips.appendChild(chip)
    }
    wrap.appendChild(chips)
    section.appendChild(wrap)
  }

  section.appendChild(sep())
  return section
}

function buildProjects(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'section-projects'
  section.appendChild(sectionHeading('Projects', 'heading-projects'))

  for (const project of content.projects) {
    const card = document.createElement('article')
    card.style.cssText = 'border:1px solid var(--color-border,#e0d8d2);border-radius:10px;padding:18px;margin-bottom:16px'

    const header = document.createElement('div')
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:8px'

    const name = document.createElement('h3')
    name.textContent = project.name
    name.style.cssText = 'font-size:1rem;font-weight:600;margin:0'
    header.appendChild(name)

    if (project.url) {
      const link = document.createElement('a')
      link.href = project.url
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.textContent = 'GitHub →'
      link.style.cssText = 'font-size:0.8rem;color:var(--color-accent,#c4673a);text-decoration:none;font-weight:500'
      header.appendChild(link)
    }
    card.appendChild(header)

    const desc = document.createElement('p')
    desc.textContent = project.description
    desc.style.cssText = 'font-size:0.875rem;line-height:1.6;margin-bottom:12px'
    card.appendChild(desc)

    const tags = document.createElement('div')
    tags.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px'
    for (const tag of project.tags) {
      const chip = document.createElement('span')
      chip.textContent = tag
      chip.style.cssText = 'font-size:0.75rem;background:var(--color-accent,#c4673a);color:#fff;padding:2px 10px;border-radius:12px'
      tags.appendChild(chip)
    }
    card.appendChild(tags)
    section.appendChild(card)
  }

  section.appendChild(sep())
  return section
}

function buildContact(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'section-contact'
  section.appendChild(sectionHeading('Contact', 'heading-contact'))

  for (const link of content.contact) {
    const a = document.createElement('a')
    a.href = link.url
    if (!link.url.startsWith('mailto:')) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    }
    a.textContent = link.label
    a.style.cssText = `
      display:flex;align-items:center;gap:12px;
      padding:14px 18px;
      background:var(--color-bg,#f5f0eb);
      border:1px solid var(--color-border,#e0d8d2);
      border-radius:10px;
      color:var(--color-text,#2c2420);
      text-decoration:none;
      font-size:0.95rem;font-weight:500;
      margin-bottom:12px;
    `
    section.appendChild(a)
  }

  return section
}
