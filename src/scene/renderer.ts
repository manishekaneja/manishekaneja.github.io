import {
  WebGLRenderer,
  type Scene,
  type Camera,
} from 'three'

export interface RendererSetup {
  renderer: WebGLRenderer
  canvas: HTMLCanvasElement
}

let _animFrameId: number | null = null
let _paused = false

export function createRenderer(container: HTMLElement): RendererSetup {
  const canvas = document.createElement('canvas')
  container.appendChild(canvas)

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })

  // Cap pixel ratio to 2 for performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight, false)

  // Resize handling
  const resizeObserver = new ResizeObserver(() => {
    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h, false)
  })
  resizeObserver.observe(container)

  // Pause render loop when tab is hidden
  document.addEventListener('visibilitychange', () => {
    _paused = document.hidden
  })

  return { renderer, canvas }
}

export function startRenderLoop(
  setup: RendererSetup,
  scene: Scene,
  camera: Camera,
  onTick?: () => void
): void {
  const { renderer } = setup

  function loop(): void {
    _animFrameId = requestAnimationFrame(loop)
    // Always run onTick — it drives the perf guard, which is what resumes the loop
    // after a panel closes. Gating onTick on _paused self-deadlocks (loop never resumes).
    onTick?.()
    if (_paused) return
    renderer.render(scene, camera)
  }

  _animFrameId = requestAnimationFrame(loop)
}

export function stopRenderLoop(): void {
  if (_animFrameId !== null) {
    cancelAnimationFrame(_animFrameId)
    _animFrameId = null
  }
}

export function pauseRenderLoop(): void {
  _paused = true
}

export function resumeRenderLoop(): void {
  _paused = false
}
