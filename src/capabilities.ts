// TODO: capabilities detection - implement in capabilities-detection task
export interface Capabilities {
  webgl: boolean
  reducedMotion: boolean
  touch: boolean
}

export function detectCapabilities(): Capabilities {
  // TODO: implement
  return { webgl: false, reducedMotion: false, touch: false }
}
