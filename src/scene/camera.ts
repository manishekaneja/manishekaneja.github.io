import {
  PerspectiveCamera,
  Vector3,
  type WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { RoomId } from './house'
import { ROOM_TARGETS, OVERVIEW_POSITION, OVERVIEW_TARGET } from './house'

export interface CameraSetup {
  camera: PerspectiveCamera
  controls: OrbitControls
  update: () => void
}

let _reducedMotion = false
// Whether the gentle continuous auto-rotate is allowed (off under reduced-motion)
let _autoRotateAllowed = false

export function createCamera(renderer: WebGLRenderer, reducedMotion: boolean): CameraSetup {
  _reducedMotion = reducedMotion

  const camera = new PerspectiveCamera(
    50,
    renderer.domElement.clientWidth / renderer.domElement.clientHeight,
    0.1,
    200
  )

  // Start at overview position
  camera.position.set(OVERVIEW_POSITION.x, OVERVIEW_POSITION.y, OVERVIEW_POSITION.z)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(OVERVIEW_TARGET.x, OVERVIEW_TARGET.y, OVERVIEW_TARGET.z)

  // Clamped polar and azimuth angles.
  // maxPolarAngle stays ABOVE the horizon (< 0.5π) so the camera can never drop
  // below the ground plane (y=0) — otherwise the one-sided ground would cull away.
  controls.minPolarAngle = Math.PI * 0.05
  controls.maxPolarAngle = Math.PI * 0.48
  // No azimuth clamp — allow full continuous 360° rotation for the auto-orbit
  controls.minDistance = 5
  controls.maxDistance = 25
  controls.enableDamping = true
  controls.dampingFactor = 0.08

  // Gentle continuous auto-rotate, driven by OrbitControls itself (no manual fight)
  _autoRotateAllowed = !reducedMotion
  controls.autoRotate = !reducedMotion
  controls.autoRotateSpeed = 0.8

  // Any manual interaction stops the auto-rotate so it never fights the user's drag
  controls.addEventListener('start', () => { controls.autoRotate = false })

  // Handle window resize
  window.addEventListener('resize', () => {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  })

  function update(): void {
    // OrbitControls.update() drives both damping and the continuous auto-rotate
    controls.update()
  }

  return {
    camera,
    controls,
    update,
  }
}

// ---- Fly-to tween rig ----

let _tweening = false
let _cameraSetup: CameraSetup | null = null

export function setCameraSetup(setup: CameraSetup): void {
  _cameraSetup = setup
}

type Vec3 = { x: number; y: number; z: number }

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    z: a.z + (b.z - a.z) * t,
  }
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function flyToRoom(roomId: RoomId): Promise<void> {
  return new Promise((resolve) => {
    if (!_cameraSetup) { resolve(); return }
    const { camera, controls } = _cameraSetup

    // Focus a room: stop the auto-rotate so it can't yank the camera back out
    controls.autoRotate = false

    const target = ROOM_TARGETS[roomId]
    // Frame the door head-on: stand back + slightly above, look AT the door (z≈2.0)
    const toPos: Vec3 = { x: target.x, y: 2.1, z: target.z + 0.8 }
    const toTarget: Vec3 = { x: target.x, y: 0.95, z: 2.0 }

    if (_reducedMotion) {
      camera.position.set(toPos.x, toPos.y, toPos.z)
      controls.target.set(toTarget.x, toTarget.y, toTarget.z)
      controls.update()
      resolve()
      return
    }

    _tweening = true
    controls.enabled = false

    const fromPos: Vec3 = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const fromTarget: Vec3 = {
      x: controls.target.x,
      y: controls.target.y,
      z: controls.target.z,
    }

    const DURATION = 800 // ms
    const start = performance.now()

    function step(now: number): void {
      const elapsed = now - start
      const raw = Math.min(elapsed / DURATION, 1)
      const t = easeInOut(raw)

      const p = lerpVec3(fromPos, toPos, t)
      const tgt = lerpVec3(fromTarget, toTarget, t)

      camera.position.set(p.x, p.y, p.z)
      controls.target.set(tgt.x, tgt.y, tgt.z)
      camera.lookAt(new Vector3(tgt.x, tgt.y, tgt.z))

      if (raw < 1) {
        requestAnimationFrame(step)
      } else {
        _tweening = false
        controls.enabled = true
        resolve()
      }
    }

    requestAnimationFrame(step)
  })
}

export function returnToOverview(): Promise<void> {
  return new Promise((resolve) => {
    if (!_cameraSetup) { resolve(); return }
    const { camera, controls } = _cameraSetup

    // Returning to overview: re-arm the gentle auto-rotate once we're back.
    controls.autoRotate = _autoRotateAllowed

    const toPos: Vec3 = OVERVIEW_POSITION
    const toTarget: Vec3 = OVERVIEW_TARGET

    if (_reducedMotion) {
      camera.position.set(toPos.x, toPos.y, toPos.z)
      controls.target.set(toTarget.x, toTarget.y, toTarget.z)
      controls.update()
      resolve()
      return
    }

    _tweening = true
    controls.enabled = false

    const fromPos: Vec3 = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const fromTarget: Vec3 = {
      x: controls.target.x,
      y: controls.target.y,
      z: controls.target.z,
    }

    const DURATION = 700
    const start = performance.now()

    function step(now: number): void {
      const elapsed = now - start
      const raw = Math.min(elapsed / DURATION, 1)
      const t = easeInOut(raw)

      const p = lerpVec3(fromPos, toPos, t)
      const tgt = lerpVec3(fromTarget, toTarget, t)

      camera.position.set(p.x, p.y, p.z)
      controls.target.set(tgt.x, tgt.y, tgt.z)

      if (raw < 1) {
        requestAnimationFrame(step)
      } else {
        _tweening = false
        controls.enabled = true
        resolve()
      }
    }

    requestAnimationFrame(step)
  })
}
