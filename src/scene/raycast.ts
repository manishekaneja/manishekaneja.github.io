import {
  Raycaster,
  Vector2,
  Color,
  type PerspectiveCamera,
  type Scene,
  type Mesh,
  type MeshLambertMaterial,
} from 'three'
import type { RoomId } from './house'
import { DOOR_DEFAULT_EMISSIVE, DOOR_HOVER_EMISSIVE } from './house'

export type RoomSelectedHandler = (roomId: RoomId) => void

const _raycaster = new Raycaster()
const _pointer = new Vector2()
let _currentHover: Mesh | null = null

export function initRaycast(
  canvas: HTMLCanvasElement,
  scene: Scene,
  camera: PerspectiveCamera,
  onRoomSelected: RoomSelectedHandler
): void {
  function collectRoomMeshes(): Mesh[] {
    const meshes: Mesh[] = []
    scene.traverse((obj) => {
      if ((obj as Mesh).isMesh && (obj as Mesh).userData.isRoom) {
        meshes.push(obj as Mesh)
      }
    })
    return meshes
  }

  function updatePointer(e: MouseEvent | TouchEvent): void {
    const rect = canvas.getBoundingClientRect()
    let clientX: number, clientY: number
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    _pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
    _pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
  }

  function pick(): Mesh | null {
    _raycaster.setFromCamera(_pointer, camera)
    const hits = _raycaster.intersectObjects(collectRoomMeshes(), false)
    return hits.length > 0 ? (hits[0].object as Mesh) : null
  }

  function applyHover(mesh: Mesh | null): void {
    if (_currentHover && _currentHover !== mesh) {
      const mat = _currentHover.material as MeshLambertMaterial
      mat.emissive = DOOR_DEFAULT_EMISSIVE.clone()
      mat.needsUpdate = true
    }
    if (mesh) {
      const mat = mesh.material as MeshLambertMaterial
      mat.emissive = DOOR_HOVER_EMISSIVE.clone()
      mat.needsUpdate = true
      canvas.style.cursor = 'pointer'
    } else {
      canvas.style.cursor = 'default'
    }
    _currentHover = mesh
  }

  canvas.addEventListener('pointermove', (e: MouseEvent) => {
    updatePointer(e)
    const hit = pick()
    applyHover(hit)
  })

  canvas.addEventListener('click', (e: MouseEvent) => {
    updatePointer(e)
    const hit = pick()
    if (hit) {
      const roomId = hit.userData.room as RoomId
      console.log('[raycast] room clicked:', roomId)
      onRoomSelected(roomId)
    }
  })

  canvas.addEventListener('touchend', (e: TouchEvent) => {
    if (e.changedTouches.length === 0) return
    const touch = e.changedTouches[0]
    const rect = canvas.getBoundingClientRect()
    _pointer.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
    _pointer.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1
    const hit = pick()
    if (hit) {
      const roomId = hit.userData.room as RoomId
      onRoomSelected(roomId)
    }
  })
}

// Expose current hover for external use
export function getCurrentHover(): Mesh | null {
  return _currentHover
}
