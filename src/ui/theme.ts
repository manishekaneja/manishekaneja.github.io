// Day/night theme toggle — affects CSS vars + 3D scene

type DayNightFn = (day: boolean) => void
let _setDayNight: DayNightFn | null = null
let _isDay = true
let _btn: HTMLElement | null = null

export function initThemeToggle(setDayNight: DayNightFn): void {
  _setDayNight = setDayNight

  _btn = document.createElement('button')
  _btn.id = 'theme-toggle'
  _btn.setAttribute('aria-label', 'Toggle day/night theme')
  _btn.setAttribute('title', 'Toggle day/night')
  _btn.textContent = '🌙'
  _btn.style.cssText = `
    position: fixed;
    top: 16px; right: 16px;
    z-index: 300;
    background: var(--color-surface, #faf7f3);
    border: 1px solid var(--color-border, #e0d8d2);
    border-radius: 50%;
    width: 40px; height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow, 0 4px 24px rgba(44,36,32,0.12));
    transition: background 0.2s, transform 0.15s;
  `
  _btn.addEventListener('click', toggleTheme)
  _btn.addEventListener('mouseenter', () => {
    if (_btn) _btn.style.transform = 'scale(1.1)'
  })
  _btn.addEventListener('mouseleave', () => {
    if (_btn) _btn.style.transform = 'scale(1)'
  })
  _btn.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme() }
  })

  document.body.appendChild(_btn)
  applyTheme(true)
}

function toggleTheme(): void {
  applyTheme(!_isDay)
}

function applyTheme(day: boolean): void {
  _isDay = day

  const root = document.documentElement

  if (day) {
    root.style.setProperty('--color-bg', '#f5f0eb')
    root.style.setProperty('--color-surface', '#faf7f3')
    root.style.setProperty('--color-text', '#2c2420')
    root.style.setProperty('--color-text-muted', '#6b5c56')
    root.style.setProperty('--color-accent', '#c4673a')
    root.style.setProperty('--color-accent-muted', '#d4895e')
    root.style.setProperty('--color-border', '#e0d8d2')
    if (_btn) _btn.textContent = '🌙'
    root.setAttribute('data-theme', 'day')
  } else {
    root.style.setProperty('--color-bg', '#1a1a2e')
    root.style.setProperty('--color-surface', '#16213e')
    root.style.setProperty('--color-text', '#f0ede8')
    root.style.setProperty('--color-text-muted', '#9994a8')
    root.style.setProperty('--color-accent', '#e8895a')
    root.style.setProperty('--color-accent-muted', '#f0a880')
    root.style.setProperty('--color-border', '#2a2840')
    if (_btn) _btn.textContent = '☀️'
    root.setAttribute('data-theme', 'night')
  }

  _setDayNight?.(day)
}
