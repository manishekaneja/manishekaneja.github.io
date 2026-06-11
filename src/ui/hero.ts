import { content } from '../data/content'

let _heroEl: HTMLElement | null = null

export function mountHero(): void {
  if (_heroEl) return

  const hero = document.createElement('div')
  hero.id = 'hero-overlay'
  hero.setAttribute('aria-label', 'Portfolio overview')
  hero.style.cssText = `
    position: fixed;
    bottom: 0; left: 0; right: 0;
    padding: 32px 40px;
    background: linear-gradient(to top, rgba(245,240,235,0.97) 70%, transparent);
    pointer-events: auto;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    transition: opacity 0.3s ease;
  `

  const name = document.createElement('h1')
  name.textContent = content.profile.name
  name.style.cssText = `
    font-family: var(--font-display, Georgia, serif);
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: var(--color-text, #2c2420);
    margin: 0;
    line-height: 1.1;
  `
  hero.appendChild(name)

  const title = document.createElement('p')
  title.textContent = content.profile.title
  title.style.cssText = `
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    color: var(--color-accent, #c4673a);
    font-weight: 600;
    margin: 0 0 12px 0;
    letter-spacing: 0.02em;
  `
  hero.appendChild(title)

  const hint = document.createElement('p')
  hint.textContent = 'Click a door to explore'
  hint.style.cssText = `
    font-size: 0.8rem;
    color: var(--color-text-muted, #6b5c56);
    margin: 0 0 16px 0;
  `
  hero.appendChild(hint)

  const ctas = document.createElement('div')
  ctas.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px'

  // CTA links from content.contact
  for (const link of content.contact) {
    const btn = document.createElement('a')
    btn.href = link.url
    if (!link.url.startsWith('mailto:')) {
      btn.target = '_blank'
      btn.rel = 'noopener noreferrer'
    }
    btn.textContent = link.label
    btn.style.cssText = `
      display: inline-flex;
      align-items: center;
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s;
      background: var(--color-accent, #c4673a);
      color: #fff;
      border: 2px solid var(--color-accent, #c4673a);
    `
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'var(--color-accent-muted, #d4895e)'
      btn.style.borderColor = 'var(--color-accent-muted, #d4895e)'
    })
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'var(--color-accent, #c4673a)'
      btn.style.borderColor = 'var(--color-accent, #c4673a)'
    })
    ctas.appendChild(btn)
  }

  hero.appendChild(ctas)
  document.body.appendChild(hero)
  _heroEl = hero
}

export function hideHero(): void {
  if (!_heroEl) return
  _heroEl.style.opacity = '0'
  _heroEl.style.pointerEvents = 'none'
}

export function showHero(): void {
  if (!_heroEl) return
  _heroEl.style.opacity = '1'
  _heroEl.style.pointerEvents = 'auto'
}
