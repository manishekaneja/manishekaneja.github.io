// Day/night theme toggle — affects CSS vars + 3D scene

type DayNightFn = (day: boolean) => void
let _setDayNight: DayNightFn | null = null
let _isDay = true
let _btn: HTMLButtonElement | null = null
let _knob: HTMLElement | null = null

export function initThemeToggle(setDayNight: DayNightFn): void {
  _setDayNight = setDayNight

  // Sliding sun/moon pill toggle
  _btn = document.createElement('button')
  _btn.id = 'theme-toggle'
  _btn.setAttribute('role', 'switch')
  _btn.setAttribute('aria-label', 'Toggle day/night theme')
  _btn.setAttribute('title', 'Toggle day / night')
  _btn.style.cssText = `
    position: fixed;
    top: 18px; right: 18px;
    z-index: 300;
    width: 66px; height: 34px;
    padding: 0;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    background: linear-gradient(135deg, #ffd36b 0%, #ffb13c 100%);
    box-shadow: var(--shadow, 0 8px 22px rgba(60,40,30,0.18)),
                inset 0 0 0 1px rgba(0,0,0,0.06);
    transition: background 0.35s ease;
  `

  // Track icons (sun left, moon right)
  const icons = document.createElement('span')
  icons.style.cssText = `
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 8px;
    font-size: 0.95rem; line-height: 1;
    pointer-events: none; user-select: none;
  `
  icons.innerHTML = '<span aria-hidden="true">☀️</span><span aria-hidden="true">🌙</span>'
  _btn.appendChild(icons)

  // Sliding knob
  _knob = document.createElement('span')
  _knob.style.cssText = `
    position: absolute; top: 3px; left: 3px;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  `
  _btn.appendChild(_knob)

  _btn.addEventListener('click', toggleTheme)
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
    root.style.setProperty('--color-bg', '#fff7ec')
    root.style.setProperty('--color-surface', '#ffffff')
    root.style.setProperty('--color-text', '#2b2018')
    root.style.setProperty('--color-text-muted', '#7a6a5d')
    root.style.setProperty('--color-accent', '#ff6b4a')
    root.style.setProperty('--color-accent-muted', '#ffb13c')
    root.style.setProperty('--color-accent-2', '#4d8cff')
    root.style.setProperty('--color-border', '#f0e3d4')
    if (_btn) {
      _btn.style.background = 'linear-gradient(135deg, #ffd36b 0%, #ffb13c 100%)'
      _btn.setAttribute('aria-checked', 'false')
    }
    if (_knob) _knob.style.transform = 'translateX(0)'
    root.setAttribute('data-theme', 'day')
  } else {
    root.style.setProperty('--color-bg', '#1c1b38')
    root.style.setProperty('--color-surface', '#262450')
    root.style.setProperty('--color-text', '#f3f0ff')
    root.style.setProperty('--color-text-muted', '#a9a4c8')
    root.style.setProperty('--color-accent', '#ff7a5c')
    root.style.setProperty('--color-accent-muted', '#ffc24a')
    root.style.setProperty('--color-accent-2', '#6ea8ff')
    root.style.setProperty('--color-border', '#36345e')
    if (_btn) {
      _btn.style.background = 'linear-gradient(135deg, #4d5bcf 0%, #6a4bd0 100%)'
      _btn.setAttribute('aria-checked', 'true')
    }
    if (_knob) _knob.style.transform = 'translateX(32px)'
    root.setAttribute('data-theme', 'night')
  }

  _setDayNight?.(day)
}
