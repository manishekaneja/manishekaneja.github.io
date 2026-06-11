// TODO: procedural house geometry - implement in house-geometry task
import type { Group } from 'three'

export type RoomId = 'about' | 'experience' | 'skills' | 'projects' | 'contact'

export interface HouseSetup {
  group: Group
  roomMeshes: Map<RoomId, import('three').Mesh>
}

export function createHouse(): HouseSetup {
  throw new Error('TODO: implement in house-geometry task')
}
