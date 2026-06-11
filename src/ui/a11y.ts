// Accessibility: keyboard room proxies, focus rings, aria-live, SEO meta
import type { RoomId } from '../scene/house'
import { ROOM_IDS } from '../scene/house'

type RoomSelectHandler = (id: RoomId) => void

const ROOM_LABELS: Record<RoomId, string> = {
  about:      'Open About section',
  experience: 'Open Experience section',
  skills:     'Open Skills section',
  projects:   'Open Projects section',
  contact:    'Open Contact section',
}

let _proxyContainer: HTMLElement | null = null
let _liveRegion: HTMLElement | null = null

/**
 * Inject keyboard-focusable room proxies (skip-to-room buttons) and an aria-live region.
 * These are visually hidden but become visible on focus (see responsive.css .room-proxy).
 */
export function initA11y(onRoomSelected: RoomSelectHandler): void {
  _proxyContainer = document.createElement('div')
  _proxyContainer.id = 'room-proxies'
  _proxyContainer.setAttribute('role', 'navigation')
  _proxyContainer.setAttribute('aria-label', 'Jump to room')
  _proxyContainer.style.cssText = 'position:fixed;top:0;left:0;z-index:200'

  for (const roomId of ROOM_IDS) {
    const btn = document.createElement('button')
    btn.className = 'room-proxy'
    btn.textContent = ROOM_LABELS[roomId]
    btn.setAttribute('data-room', roomId)
    btn.setAttribute('aria-label', ROOM_LABELS[roomId])
    btn.addEventListener('click', () => onRoomSelected(roomId))
    btn.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onRoomSelected(roomId)
      }
    })
    _proxyContainer.appendChild(btn)
  }

  document.body.insertBefore(_proxyContainer, document.body.firstChild)

  // aria-live region for panel open announcements
  _liveRegion = document.createElement('div')
  _liveRegion.id = 'aria-live'
  _liveRegion.setAttribute('role', 'status')
  _liveRegion.setAttribute('aria-live', 'polite')
  _liveRegion.setAttribute('aria-atomic', 'true')
  _liveRegion.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap'
  document.body.appendChild(_liveRegion)
}

export function announcePanel(title: string): void {
  if (!_liveRegion) return
  _liveRegion.textContent = ''
  requestAnimationFrame(() => {
    if (_liveRegion) _liveRegion.textContent = `${title} panel opened`
  })
}

export function announceClose(): void {
  if (!_liveRegion) return
  _liveRegion.textContent = ''
  requestAnimationFrame(() => {
    if (_liveRegion) _liveRegion.textContent = 'Panel closed. Returned to overview.'
  })
}
