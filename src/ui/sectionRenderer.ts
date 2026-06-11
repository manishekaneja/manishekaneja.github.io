import { content } from '../data/content'
import type { Role, SkillGroup, Project, ContactLink } from '../data/types'
import type { RoomId } from '../scene/house'

// Section titles
const SECTION_TITLES: Record<RoomId, string> = {
  about:      'About',
  experience: 'Experience',
  skills:     'Skills',
  projects:   'Projects',
  contact:    'Contact',
}

export function getSectionTitle(id: RoomId): string {
  return SECTION_TITLES[id]
}

export function renderSection(sectionId: RoomId): HTMLElement {
  const el = document.createElement('div')
  el.className = `section section-${sectionId}`

  switch (sectionId) {
    case 'about':
      el.appendChild(renderAbout())
      break
    case 'experience':
      el.appendChild(renderExperience())
      break
    case 'skills':
      el.appendChild(renderSkills())
      break
    case 'projects':
      el.appendChild(renderProjects())
      break
    case 'contact':
      el.appendChild(renderContact())
      break
  }

  return el
}

function h(tag: string, cls?: string, text?: string): HTMLElement {
  const el = document.createElement(tag)
  if (cls) el.className = cls
  if (text) el.textContent = text
  return el
}

function renderAbout(): HTMLElement {
  const wrap = document.createElement('div')

  const name = h('h1', 'section-name', content.profile.name)
  name.style.cssText = 'font-family:var(--font-display,Georgia,serif);font-size:1.6rem;margin-bottom:4px'
  wrap.appendChild(name)

  const title = h('p', 'section-title', content.profile.title)
  title.style.cssText = 'font-size:1rem;color:var(--color-accent,#c4673a);font-weight:600;margin-bottom:16px'
  wrap.appendChild(title)

  const summary = h('p', 'section-summary', content.profile.summary)
  summary.style.cssText = 'line-height:1.7;color:var(--color-text,#2c2420);margin-bottom:20px'
  wrap.appendChild(summary)

  if (content.awards && content.awards.length > 0) {
    const awardsTitle = h('h3', '', 'Recognition')
    awardsTitle.style.cssText = 'font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted,#6b5c56);margin-bottom:8px'
    wrap.appendChild(awardsTitle)

    const list = document.createElement('ul')
    list.style.cssText = 'list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:8px'
    for (const award of content.awards) {
      const li = document.createElement('li')
      li.textContent = `${award.name} (${award.year})`
      li.style.cssText = 'font-size:0.85rem;background:var(--color-border,#e0d8d2);padding:4px 10px;border-radius:20px'
      list.appendChild(li)
    }
    wrap.appendChild(list)
  }

  if (content.education && content.education.length > 0) {
    const eduTitle = h('h3', '', 'Education')
    eduTitle.style.cssText = 'font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted,#6b5c56);margin-top:20px;margin-bottom:8px'
    wrap.appendChild(eduTitle)
    const edu = content.education[0]
    const eduEl = h('p', '', `${edu.degree} — ${edu.institution} (${edu.start}–${edu.end})${edu.gpa ? ` · CGPA ${edu.gpa}` : ''}`)
    eduEl.style.cssText = 'font-size:0.9rem;color:var(--color-text,#2c2420)'
    wrap.appendChild(eduEl)
  }

  return wrap
}

function renderExperience(): HTMLElement {
  const wrap = document.createElement('div')
  const timeline = document.createElement('div')
  timeline.className = 'timeline'
  timeline.style.cssText = 'display:flex;flex-direction:column;gap:24px'

  for (const role of content.experience) {
    timeline.appendChild(renderRole(role))
  }

  wrap.appendChild(timeline)
  return wrap
}

function renderRole(role: Role): HTMLElement {
  const card = document.createElement('article')
  card.style.cssText = `
    border-left:3px solid var(--color-accent,#c4673a);
    padding-left:16px;
  `

  const header = document.createElement('div')
  header.style.cssText = 'margin-bottom:4px'

  const title = h('h3', '', role.title)
  title.style.cssText = 'font-size:1rem;font-weight:600;color:var(--color-text,#2c2420)'
  header.appendChild(title)

  const company = h('span', '', role.company)
  company.style.cssText = 'font-size:0.9rem;color:var(--color-accent,#c4673a);font-weight:500'
  header.appendChild(company)

  const dates = h('span', '', ` · ${role.start} – ${role.end ?? 'Present'}`)
  dates.style.cssText = 'font-size:0.85rem;color:var(--color-text-muted,#6b5c56)'
  header.appendChild(dates)

  card.appendChild(header)

  if (role.bullets && role.bullets.length > 0) {
    const list = document.createElement('ul')
    list.style.cssText = 'margin-top:8px;padding-left:18px;display:flex;flex-direction:column;gap:4px'
    for (const b of role.bullets) {
      const li = h('li', '', b)
      li.style.cssText = 'font-size:0.875rem;line-height:1.6;color:var(--color-text,#2c2420)'
      list.appendChild(li)
    }
    card.appendChild(list)
  }

  return card
}

function renderSkills(): HTMLElement {
  const wrap = document.createElement('div')
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:20px'

  for (const group of content.skills) {
    wrap.appendChild(renderSkillGroup(group))
  }

  return wrap
}

function renderSkillGroup(group: SkillGroup): HTMLElement {
  const section = document.createElement('section')

  const title = h('h3', '', group.name)
  title.style.cssText = 'font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-text-muted,#6b5c56);margin-bottom:10px'
  section.appendChild(title)

  const chips = document.createElement('div')
  chips.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px'

  for (const skill of group.skills) {
    const chip = h('span', '', skill)
    chip.style.cssText = `
      font-size:0.8rem;font-weight:500;
      background:var(--color-border,#e0d8d2);
      color:var(--color-text,#2c2420);
      padding:4px 12px;border-radius:20px;
    `
    chips.appendChild(chip)
  }

  section.appendChild(chips)
  return section
}

function renderProjects(): HTMLElement {
  const wrap = document.createElement('div')
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:20px'

  for (const project of content.projects) {
    wrap.appendChild(renderProject(project))
  }

  return wrap
}

function renderProject(project: Project): HTMLElement {
  const card = document.createElement('article')
  card.style.cssText = `
    background:var(--color-bg,#f5f0eb);
    border:1px solid var(--color-border,#e0d8d2);
    border-radius:10px;padding:18px;
  `

  const header = document.createElement('div')
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:8px'

  const name = h('h3', '', project.name)
  name.style.cssText = 'font-size:1rem;font-weight:600;color:var(--color-text,#2c2420)'
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

  const desc = h('p', '', project.description)
  desc.style.cssText = 'font-size:0.875rem;line-height:1.6;color:var(--color-text,#2c2420);margin-bottom:12px'
  card.appendChild(desc)

  const tags = document.createElement('div')
  tags.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px'
  for (const tag of project.tags) {
    const chip = h('span', '', tag)
    chip.style.cssText = 'font-size:0.75rem;background:var(--color-accent,#c4673a);color:#fff;padding:2px 10px;border-radius:12px'
    tags.appendChild(chip)
  }
  card.appendChild(tags)

  return card
}

function renderContact(): HTMLElement {
  const wrap = document.createElement('div')
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:16px'

  const intro = h('p', '', "Let's connect — I'm always open to interesting conversations.")
  intro.style.cssText = 'font-size:0.95rem;line-height:1.6;color:var(--color-text,#2c2420);margin-bottom:8px'
  wrap.appendChild(intro)

  for (const link of content.contact) {
    wrap.appendChild(renderContactLink(link))
  }

  return wrap
}

function renderContactLink(link: ContactLink): HTMLElement {
  const a = document.createElement('a')
  a.href = link.url
  if (!link.url.startsWith('mailto:')) {
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  }
  a.style.cssText = `
    display:flex;align-items:center;gap:12px;
    padding:14px 18px;
    background:var(--color-bg,#f5f0eb);
    border:1px solid var(--color-border,#e0d8d2);
    border-radius:10px;
    color:var(--color-text,#2c2420);
    text-decoration:none;
    font-size:0.95rem;font-weight:500;
    transition:background 0.15s;
  `
  a.textContent = link.label
  return a
}
