export interface Capabilities {
  webgl: boolean
  reducedMotion: boolean
  touch: boolean
}

export function detectCapabilities(): Capabilities {
  const webgl = detectWebGL()
  const reducedMotion = detectReducedMotion()
  const touch = detectTouch()
  return { webgl, reducedMotion, touch }
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const ctx =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')
    return ctx !== null
  } catch {
    return false
  }
}

function detectReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function detectTouch(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as { msMaxTouchPoints?: number }).msMaxTouchPoints !== undefined
  )
}
