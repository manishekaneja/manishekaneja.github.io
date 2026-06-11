// TODO: WebGL renderer - implement in scene-renderer task
import type { WebGLRenderer } from 'three'

export interface RendererSetup {
  renderer: WebGLRenderer
  canvas: HTMLCanvasElement
}

export function createRenderer(_canvas: HTMLCanvasElement): RendererSetup {
  throw new Error('TODO: implement in scene-renderer task')
}

export function startRenderLoop(_setup: RendererSetup, _tick: () => void): void {
  // TODO: implement
}
