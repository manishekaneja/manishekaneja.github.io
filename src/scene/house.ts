import {
  Group,
  Mesh,
  BoxGeometry,
  ConeGeometry,
  SphereGeometry,
  MeshLambertMaterial,
  Color,
  type Scene,
} from 'three'

export type RoomId = 'about' | 'experience' | 'skills' | 'projects'
export const ROOM_IDS: RoomId[] = ['about', 'experience', 'skills', 'projects']

export interface HouseSetup {
  group: Group
  roomMeshes: Map<RoomId, Mesh>
}

// Vibrant, playful storybook-cottage palette
const COLORS = {
  wall: new Color(0xfff1d6),       // warm sunny cream
  trim: new Color(0xffe3ad),       // floor divider / string course
  roof: new Color(0xef5b4c),       // bright red-orange
  chimney: new Color(0xc8553d),    // brick
  frame: new Color(0xfffaf0),      // white door / window frame
  glass: new Color(0x9fd8f0),      // window glass
  knob: new Color(0xffd23f),       // brass-ish door knob
}

// Each room door gets its own bright colour — playful + obvious
const DOOR_COLORS: Record<RoomId, number> = {
  about:      0xff6b6b, // coral
  experience: 0xffc93c, // amber
  skills:     0x49c5b6, // teal
  projects:   0x4d8cff, // blue
}

// Door x positions across the (wider) front face, evenly spread
const DOOR_X: Record<RoomId, number> = {
  about:      -2.55,
  experience: -0.85,
  skills:      0.85,
  projects:    2.55,
}

// Default emissive for hover feedback (warm glow lift)
export const DOOR_DEFAULT_EMISSIVE = new Color(0x000000)
export const DOOR_HOVER_EMISSIVE = new Color(0x554400)

function makeMat(color: Color): MeshLambertMaterial {
  return new MeshLambertMaterial({ color })
}

const FRONT_Z = 2.0 // body depth is 4 → front face sits at z = 2

export function createHouse(scene: Scene): HouseSetup {
  const group = new Group()
  const roomMeshes = new Map<RoomId, Mesh>()

  const wallMat = makeMat(COLORS.wall)
  const frameMat = makeMat(COLORS.frame)
  const glassMat = makeMat(COLORS.glass)
  const knobMat = makeMat(COLORS.knob)

  // --- Main body (two storeys tall) ---
  const body = new Mesh(new BoxGeometry(7.2, 3.2, 4), wallMat)
  body.position.set(0, 1.6, 0)
  group.add(body)

  // --- Floor divider (string course between the storeys) ---
  const divider = new Mesh(new BoxGeometry(7.3, 0.16, 4.05), makeMat(COLORS.trim))
  divider.position.set(0, 1.75, 0)
  group.add(divider)

  // --- Roof (pitched) ---
  const roof = new Mesh(new ConeGeometry(5.3, 2.0, 4), makeMat(COLORS.roof))
  roof.position.set(0, 4.2, 0)
  roof.rotation.y = Math.PI / 4
  group.add(roof)

  // --- Chimney ---
  const chimney = new Mesh(new BoxGeometry(0.45, 1.1, 0.45), makeMat(COLORS.chimney))
  chimney.position.set(2.1, 4.7, -0.8)
  group.add(chimney)

  // --- Ground-floor doors (one per room) + upper-floor windows above each ---
  for (const roomId of ROOM_IDS) {
    const dx = DOOR_X[roomId]

    // White door frame
    const frame = new Mesh(new BoxGeometry(1.16, 1.92, 0.06), frameMat)
    frame.position.set(dx, 0.9, FRONT_Z - 0.02)
    group.add(frame)

    // Coloured door
    const door = new Mesh(new BoxGeometry(0.92, 1.7, 0.12), new MeshLambertMaterial({
      color: new Color(DOOR_COLORS[roomId]),
      emissive: DOOR_DEFAULT_EMISSIVE.clone(),
    }))
    door.position.set(dx, 0.85, FRONT_Z + 0.02)
    door.userData.room = roomId
    door.userData.isRoom = true
    group.add(door)

    // Door knob
    const knob = new Mesh(new SphereGeometry(0.06, 8, 8), knobMat)
    knob.position.set(dx + 0.3, 0.85, FRONT_Z + 0.1)
    group.add(knob)

    // Upper-floor window above the door
    const winFrame = new Mesh(new BoxGeometry(0.95, 0.95, 0.06), frameMat)
    winFrame.position.set(dx, 2.5, FRONT_Z - 0.02)
    group.add(winFrame)
    const glass = new Mesh(new BoxGeometry(0.72, 0.72, 0.08), glassMat)
    glass.position.set(dx, 2.5, FRONT_Z + 0.01)
    group.add(glass)
    // Mullion bars (cross)
    const barV = new Mesh(new BoxGeometry(0.06, 0.74, 0.1), frameMat)
    barV.position.set(dx, 2.5, FRONT_Z + 0.02)
    group.add(barV)
    const barH = new Mesh(new BoxGeometry(0.74, 0.06, 0.1), frameMat)
    barH.position.set(dx, 2.5, FRONT_Z + 0.02)
    group.add(barH)

    roomMeshes.set(roomId, door)
  }

  scene.add(group)

  if (roomMeshes.size !== ROOM_IDS.length) {
    throw new Error(`Expected ${ROOM_IDS.length} room meshes, got ${roomMeshes.size}`)
  }

  return { group, roomMeshes }
}

// Room camera targets — x tracks each door; camera.ts frames the door head-on
export const ROOM_TARGETS: Record<RoomId, { x: number; y: number; z: number }> = {
  about:      { x: DOOR_X.about,      y: 1.5, z: 5.5 },
  experience: { x: DOOR_X.experience, y: 1.5, z: 5.5 },
  skills:     { x: DOOR_X.skills,     y: 1.5, z: 5.5 },
  projects:   { x: DOOR_X.projects,   y: 1.5, z: 5.5 },
}

export const OVERVIEW_POSITION = { x: 0, y: 4, z: 13 }
export const OVERVIEW_TARGET   = { x: 0, y: 1.4, z: 0 }
