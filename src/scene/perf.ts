// Performance utilities: pause loop when hidden or panel open, material reuse

import { pauseRenderLoop, resumeRenderLoop } from './renderer'
import { isPanelOpen } from '../ui/panels'

let _panelPauseTimer: ReturnType<typeof setTimeout> | null = null
const PANEL_PAUSE_DELAY_MS = 600 // pause render after panel is fully open

/**
 * Call from your render tick to automatically pause when a static panel is open.
 */
export function tickPerfGuard(): void {
  if (isPanelOpen()) {
    // Schedule a pause after the slide-in transition completes
    if (!_panelPauseTimer) {
      _panelPauseTimer = setTimeout(() => {
        pauseRenderLoop()
        _panelPauseTimer = null
      }, PANEL_PAUSE_DELAY_MS)
    }
  } else {
    if (_panelPauseTimer) {
      clearTimeout(_panelPauseTimer)
      _panelPauseTimer = null
    }
    resumeRenderLoop()
  }
}
