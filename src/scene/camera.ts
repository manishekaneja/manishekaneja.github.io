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

  // Clamped polar and azimuth angles
  controls.minPolarAngle = Math.PI * 0.05
  controls.maxPolarAngle = Math.PI * 0.55
  controls.minAzimuthAngle = -Math.PI * 0.45
  controls.maxAzimuthAngle = Math.PI * 0.45
  controls.minDistance = 5
  controls.maxDistance = 25
  controls.enableDamping = true
  controls.dampingFactor = 0.08

  // Handle window resize
  window.addEventListener('resize', () => {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  })

  // Idle auto-orbit
  let idleOrbitActive = !reducedMotion
  let idleAngle = 0

  function update(): void {
    if (idleOrbitActive && !_tweening) {
      idleAngle += 0.002
      const r = 12
      camera.position.x = Math.sin(idleAngle) * r
      camera.position.z = Math.cos(idleAngle) * r
      camera.position.y = OVERVIEW_POSITION.y
      camera.lookAt(OVERVIEW_TARGET.x, OVERVIEW_TARGET.y, OVERVIEW_TARGET.z)
      controls.target.set(OVERVIEW_TARGET.x, OVERVIEW_TARGET.y, OVERVIEW_TARGET.z)
    }
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

    const target = ROOM_TARGETS[roomId]
    const toPos: Vec3 = { x: target.x, y: target.y + 1.5, z: target.z }
    const toTarget: Vec3 = { x: target.x, y: target.y - 0.5, z: target.z - 2 }

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
