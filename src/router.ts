import type { RoomId } from './scene/house'
import { ROOM_IDS } from './scene/house'
import { flyToRoom, returnToOverview } from './scene/camera'
import { openPanel, closePanel } from './ui/panels'
import { renderSection, getSectionTitle } from './ui/sectionRenderer'
import { hideHero, showHero } from './ui/hero'

export type { RoomId }

type NavigateCallback = (id: RoomId | null) => void
const _listeners: NavigateCallback[] = []
let _current: RoomId | null = null

function parseHash(hash: string): RoomId | null {
  const id = hash.replace('#', '').toLowerCase()
  return (ROOM_IDS as string[]).includes(id) ? (id as RoomId) : null
}

export function initRouter(): void {
  // Handle initial hash on load
  const initial = parseHash(window.location.hash)
  if (initial) {
    setTimeout(() => navigateTo(initial), 100)
  }

  window.addEventListener('hashchange', () => {
    const id = parseHash(window.location.hash)
    if (id !== _current) {
      _applyNavigation(id)
    }
  })
}

async function _applyNavigation(id: RoomId | null): Promise<void> {
  _current = id

  if (id) {
    hideHero()
    await flyToRoom(id)
    openPanel(getSectionTitle(id), renderSection(id), () => {
      navigateTo(null)
    })
    _listeners.forEach((cb) => cb(id))
  } else {
    closePanel()
    await returnToOverview()
    showHero()
    _listeners.forEach((cb) => cb(null))
  }
}

export function navigateTo(id: RoomId | null): void {
  const hash = id ? `#${id}` : ''
  if (window.location.hash !== hash) {
    history.pushState(null, '', hash || location.pathname)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    _applyNavigation(id)
  }
}

export function onNavigate(cb: NavigateCallback): void {
  _listeners.push(cb)
}

export function currentRoom(): RoomId | null {
  return _current
}
