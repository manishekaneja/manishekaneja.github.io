// TODO: section content renderer - implement in section-renderer task
import type { RoomId } from '../scene/house'

export function renderSection(_sectionId: RoomId): HTMLElement {
  // TODO: implement in section-renderer task
  const el = document.createElement('div')
  el.textContent = `TODO: ${_sectionId}`
  return el
}
