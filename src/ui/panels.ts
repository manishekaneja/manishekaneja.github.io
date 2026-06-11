// HTML overlay panel system — Claude-styled card, focus trap, Esc/✕/click-away close

let _overlay: HTMLElement | null = null
let _panel: HTMLElement | null = null
let _isOpen = false
let _onClose: (() => void) | null = null

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function createOverlayAndPanel(): void {
  if (_overlay) return

  _overlay = document.createElement('div')
  _overlay.id = 'panel-overlay'
  _overlay.setAttribute('aria-hidden', 'true')
  _overlay.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(44,36,32,0.35);
    backdrop-filter: blur(2px);
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 100;
  `
  _overlay.addEventListener('click', (e) => {
    if (e.target === _overlay) closePanel()
  })

  _panel = document.createElement('div')
  _panel.id = 'content-panel'
  _panel.setAttribute('role', 'dialog')
  _panel.setAttribute('aria-modal', 'true')
  _panel.setAttribute('aria-label', 'Section content')
  _panel.style.cssText = `
    position: fixed; right: 0; top: 0; bottom: 0;
    width: min(480px, 100vw);
    background: var(--color-surface, #faf7f3);
    border-left: 1px solid var(--color-border, #e0d8d2);
    box-shadow: var(--shadow, 0 4px 24px rgba(44,36,32,0.12));
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    overflow-y: auto;
    z-index: 101;
    display: flex; flex-direction: column;
  `

  const header = document.createElement('div')
  header.style.cssText = `
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px 16px;
    border-bottom: 1px solid var(--color-border, #e0d8d2);
    position: sticky; top: 0;
    background: var(--color-surface, #faf7f3);
    z-index: 1;
  `

  const titleEl = document.createElement('h2')
  titleEl.id = 'panel-title'
  titleEl.style.cssText = `
    font-family: var(--font-display, Georgia, serif);
    font-size: 1.4rem; font-weight: 600;
    color: var(--color-text, #2c2420);
    margin: 0;
  `
  _panel.setAttribute('aria-labelledby', 'panel-title')

  const closeBtn = document.createElement('button')
  closeBtn.innerHTML = '&#x2715;'
  closeBtn.setAttribute('aria-label', 'Close panel')
  closeBtn.style.cssText = `
    background: none; border: none; cursor: pointer;
    font-size: 1.2rem; color: var(--color-text-muted, #6b5c56);
    padding: 4px 8px; border-radius: 6px;
    transition: background 0.15s;
  `
  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = 'var(--color-border, #e0d8d2)'
  })
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'none'
  })
  closeBtn.addEventListener('click', closePanel)

  header.appendChild(titleEl)
  header.appendChild(closeBtn)

  const body = document.createElement('div')
  body.id = 'panel-body'
  body.style.cssText = 'padding: 24px; flex: 1;'

  _panel.appendChild(header)
  _panel.appendChild(body)
  _overlay.appendChild(_panel)
  document.body.appendChild(_overlay)
}

function trapFocus(e: KeyboardEvent): void {
  if (!_panel || !_isOpen) return
  const focusable = Array.from(_panel.querySelectorAll<HTMLElement>(FOCUSABLE))
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
  if (e.key === 'Escape') {
    closePanel()
  }
}

export function openPanel(
  title: string,
  contentEl: HTMLElement,
  onClose?: () => void
): void {
  createOverlayAndPanel()
  const overlay = _overlay!
  const panel = _panel!

  const titleEl = panel.querySelector<HTMLElement>('#panel-title')!
  const body = panel.querySelector<HTMLElement>('#panel-body')!

  titleEl.textContent = title
  body.innerHTML = ''
  body.appendChild(contentEl)

  _isOpen = true
  _onClose = onClose ?? null

  overlay.setAttribute('aria-hidden', 'false')
  overlay.style.opacity = '1'
  overlay.style.pointerEvents = 'auto'
  panel.style.transform = 'translateX(0)'

  // focus first focusable element
  requestAnimationFrame(() => {
    const first = panel.querySelector<HTMLElement>(FOCUSABLE)
    if (first) first.focus()
    else panel.focus()
  })

  document.addEventListener('keydown', trapFocus)
}

export function closePanel(): void {
  if (!_overlay || !_panel || !_isOpen) return
  _isOpen = false
  _overlay.style.opacity = '0'
  _overlay.style.pointerEvents = 'none'
  _panel.style.transform = 'translateX(100%)'
  _overlay.setAttribute('aria-hidden', 'true')
  document.removeEventListener('keydown', trapFocus)
  _onClose?.()
  _onClose = null
}

export function isPanelOpen(): boolean {
  return _isOpen
}
