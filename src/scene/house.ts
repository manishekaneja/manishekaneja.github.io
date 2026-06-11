import {
  Group,
  Mesh,
  BoxGeometry,
  ConeGeometry,
  MeshLambertMaterial,
  Color,
  type Scene,
} from 'three'

export type RoomId = 'about' | 'experience' | 'skills' | 'projects' | 'contact'
export const ROOM_IDS: RoomId[] = ['about', 'experience', 'skills', 'projects', 'contact']

export interface HouseSetup {
  group: Group
  roomMeshes: Map<RoomId, Mesh>
}

// Warm clay palette for house (spec §3)
const COLORS = {
  wall: new Color(0xe8d5c0),
  wallDark: new Color(0xd4b896),
  roof: new Color(0xc4673a),
  roofDark: new Color(0xa85530),
  door: new Color(0x8b5e3c),
  doorHover: new Color(0xc47a50),
  chimney: new Color(0xbca08c),
  trim: new Color(0xf5ede0),
}

// Default emissive for hover feedback
export const DOOR_DEFAULT_EMISSIVE = new Color(0x000000)
export const DOOR_HOVER_EMISSIVE = new Color(0x5a2800)

function makeMat(color: Color): MeshLambertMaterial {
  return new MeshLambertMaterial({ color })
}

export function createHouse(scene: Scene): HouseSetup {
  const group = new Group()
  const roomMeshes = new Map<RoomId, Mesh>()

  // --- Main body ---
  const bodyGeo = new BoxGeometry(6, 2.4, 4)
  const bodyMesh = new Mesh(bodyGeo, makeMat(COLORS.wall))
  bodyMesh.position.set(0, 1.2, 0)
  group.add(bodyMesh)

  // --- Roof (pitched) ---
  const roofGeo = new ConeGeometry(4.5, 1.8, 4)
  const roofMesh = new Mesh(roofGeo, makeMat(COLORS.roof))
  roofMesh.position.set(0, 3.3, 0)
  roofMesh.rotation.y = Math.PI / 4
  group.add(roofMesh)

  // --- Chimney ---
  const chimneyGeo = new BoxGeometry(0.4, 1.0, 0.4)
  const chimneyMesh = new Mesh(chimneyGeo, makeMat(COLORS.chimney))
  chimneyMesh.position.set(1.5, 3.9, -0.8)
  group.add(chimneyMesh)

  // --- 5 room door meshes ---
  // Arrange them across the front face in a row, spread along X
  // Rooms: about, experience, skills, projects, contact
  const doorPositions: Array<[RoomId, number, number, number]> = [
    ['about',      -2.4,  0.5,  2.01],
    ['experience', -1.2,  0.5,  2.01],
    ['skills',      0.0,  0.5,  2.01],
    ['projects',    1.2,  0.5,  2.01],
    ['contact',     2.4,  0.5,  2.01],
  ]

  for (const [roomId, dx, dy, dz] of doorPositions) {
    const doorGeo = new BoxGeometry(0.8, 1.2, 0.08)
    const doorMat = new MeshLambertMaterial({
      color: COLORS.door,
      emissive: DOOR_DEFAULT_EMISSIVE.clone(),
    })
    const door = new Mesh(doorGeo, doorMat)
    door.position.set(dx, dy, dz)
    door.userData.room = roomId
    door.userData.isRoom = true
    group.add(door)
    roomMeshes.set(roomId, door)
  }

  scene.add(group)

  // Verify exactly 5 named meshes
  if (roomMeshes.size !== 5) {
    throw new Error(`Expected 5 room meshes, got ${roomMeshes.size}`)
  }

  return { group, roomMeshes }
}

// Room camera targets (approximate positions to fly to)
export const ROOM_TARGETS: Record<RoomId, { x: number; y: number; z: number }> = {
  about:      { x: -2.4, y: 1.5, z:  5.5 },
  experience: { x: -1.2, y: 1.5, z:  5.5 },
  skills:     { x:  0.0, y: 1.5, z:  5.5 },
  projects:   { x:  1.2, y: 1.5, z:  5.5 },
  contact:    { x:  2.4, y: 1.5, z:  5.5 },
}

export const OVERVIEW_POSITION = { x: 0, y: 4, z: 12 }
export const OVERVIEW_TARGET   = { x: 0, y: 1, z: 0  }
