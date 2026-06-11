// TODO: camera + OrbitControls + fly-to tween - implement in camera-orbit and camera-flyto tasks
import type { PerspectiveCamera, WebGLRenderer } from 'three'

export interface CameraSetup {
  camera: PerspectiveCamera
}

export function createCamera(_renderer: WebGLRenderer): CameraSetup {
  throw new Error('TODO: implement in camera-orbit task')
}

export function flyToRoom(_roomId: string): void {
  // TODO: implement in camera-flyto task
}

export function returnToOverview(): void {
  // TODO: implement in camera-flyto task
}
