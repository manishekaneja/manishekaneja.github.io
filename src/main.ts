import './styles/base.css'
import './styles/responsive.css'
import { detectCapabilities } from './capabilities'
import { mountFallback2D } from './fallback/fallback2d'
import { createRenderer, startRenderLoop } from './scene/renderer'
import { createScene } from './scene/sceneGraph'
import { createHouse } from './scene/house'
import { createMascot } from './scene/mascot'
import { createCamera, setCameraSetup } from './scene/camera'
import { initRaycast } from './scene/raycast'
import { mountHero } from './ui/hero'
import { initRouter, navigateTo } from './router'
import type { RoomId } from './scene/house'
import { tickPerfGuard } from './scene/perf'
import { initA11y } from './ui/a11y'
import { initThemeToggle } from './ui/theme'

async function main(): Promise<void> {
  const capabilities = detectCapabilities()

  if (!capabilities.webgl) {
    mountFallback2D()
    return
  }

  // Loading screen
  const loading = document.createElement('div')
  loading.id = 'loading'
  loading.style.cssText = `
    position:fixed;inset:0;
    background:var(--color-bg,#f5f0eb);
    display:flex;align-items:center;justify-content:center;
    z-index:999;
    transition:opacity 0.4s ease;
    font-family:var(--font-display,Georgia,serif);
    font-size:1.1rem;color:var(--color-text-muted,#6b5c56);
  `
  loading.textContent = 'Loading…'
  document.body.appendChild(loading)

  const app = document.getElementById('app')!

  // Canvas container
  const canvasContainer = document.createElement('div')
  canvasContainer.id = 'canvas-container'
  app.appendChild(canvasContainer)

  // Init renderer
  const rendererSetup = createRenderer(canvasContainer)
  const { renderer } = rendererSetup

  // Init scene + environment
  const sceneSetup = createScene()
  const { scene } = sceneSetup

  // Init house with 5 rooms
  createHouse(scene)

  // Android-green mascot standing in the yard
  const mascot = createMascot(scene, capabilities.reducedMotion)

  // Init camera
  const cameraSetup = createCamera(renderer, capabilities.reducedMotion)
  setCameraSetup(cameraSetup)
  const { camera, update: updateCamera } = cameraSetup

  // Init raycast picking
  initRaycast(renderer.domElement, scene, camera, (roomId: RoomId) => {
    navigateTo(roomId)
  })

  // Mount hero overlay
  mountHero()

  // A11y: keyboard room proxies
  initA11y((roomId: RoomId) => navigateTo(roomId))

  // Theme toggle (day/night)
  initThemeToggle(sceneSetup.setDayNight)

  // Init router (after scene is ready)
  initRouter()

  // Expose day/night toggle on window for theme-polish task
  ;(window as unknown as Record<string, unknown>).__setDayNight = sceneSetup.setDayNight

  // Start render loop (with perf guard tick)
  startRenderLoop(rendererSetup, scene, camera, () => {
    updateCamera()
    mascot.update(performance.now())
    tickPerfGuard()
  })

  // Remove loading screen
  requestAnimationFrame(() => {
    loading.style.opacity = '0'
    setTimeout(() => loading.remove(), 400)
  })
}

main().catch((err) => {
  console.error('App init failed:', err)
  // Fallback if 3D init errors
  mountFallback2D()
})
