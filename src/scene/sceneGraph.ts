import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
  Fog,
  CylinderGeometry,
  ConeGeometry,
  Group,
} from 'three'

// Warm cream/clay palette from spec §3
const PALETTE = {
  sky: new Color(0xfdf6ed),
  ground: new Color(0xd4b896),
  fogColor: new Color(0xfdf6ed),
  trunkColor: new Color(0x8b6040),
  leafColor: new Color(0x7a9e5c),
  leafDark: new Color(0x5c7a42),
}

export interface SceneSetup {
  scene: Scene
  isDayMode: boolean
  setDayNight: (day: boolean) => void
}

export function createScene(): SceneSetup {
  const scene = new Scene()
  scene.background = PALETTE.sky.clone()
  scene.fog = new Fog(PALETTE.fogColor, 20, 60)

  // Ambient light — warm fill
  const ambientLight = new AmbientLight(0xfff3e0, 0.7)
  scene.add(ambientLight)

  // Key light (sun from upper-right)
  const keyLight = new DirectionalLight(0xfff8e7, 1.2)
  keyLight.position.set(8, 12, 6)
  keyLight.castShadow = false
  scene.add(keyLight)

  // Fill light (soft blue-grey from opposite side)
  const fillLight = new DirectionalLight(0xe8eeff, 0.4)
  fillLight.position.set(-6, 6, -4)
  scene.add(fillLight)

  // Ground plane
  const groundGeo = new PlaneGeometry(80, 80)
  const groundMat = new MeshLambertMaterial({ color: PALETTE.ground })
  const ground = new Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0
  ground.receiveShadow = false
  scene.add(ground)

  // Trees (nod to original site)
  const trees = createTrees()
  scene.add(trees)

  let isDayMode = true

  function setDayNight(day: boolean): void {
    isDayMode = day
    if (day) {
      scene.background = PALETTE.sky.clone()
      scene.fog = new Fog(0xfdf6ed, 20, 60)
      ambientLight.color.set(0xfff3e0)
      ambientLight.intensity = 0.7
      keyLight.color.set(0xfff8e7)
      keyLight.intensity = 1.2
    } else {
      scene.background = new Color(0x1a1a2e)
      scene.fog = new Fog(0x1a1a2e, 15, 50)
      ambientLight.color.set(0x3344aa)
      ambientLight.intensity = 0.4
      keyLight.color.set(0xaabbff)
      keyLight.intensity = 0.6
    }
  }

  return { scene, isDayMode, setDayNight }
}

function createTree(x: number, z: number, scale: number): Group {
  const tree = new Group()

  // Trunk
  const trunkGeo = new CylinderGeometry(0.08 * scale, 0.1 * scale, 0.6 * scale, 5)
  const trunkMat = new MeshLambertMaterial({ color: PALETTE.trunkColor })
  const trunk = new Mesh(trunkGeo, trunkMat)
  trunk.position.y = 0.3 * scale
  tree.add(trunk)

  // Foliage — stacked cones for low-poly look
  const foliageColors = [PALETTE.leafColor, PALETTE.leafDark]
  const layers = 2
  for (let i = 0; i < layers; i++) {
    const r = (0.4 - i * 0.1) * scale
    const h = (0.5 + i * 0.1) * scale
    const geo = new ConeGeometry(r, h, 5)
    const mat = new MeshLambertMaterial({ color: foliageColors[i % 2] })
    const cone = new Mesh(geo, mat)
    cone.position.y = (0.6 + i * 0.3) * scale
    tree.add(cone)
  }

  tree.position.set(x, 0, z)
  return tree
}

function createTrees(): Group {
  const group = new Group()
  const placements: Array<[number, number, number]> = [
    [-4, -3, 0.8],
    [-5, -1, 0.9],
    [-4.5, 1.5, 0.7],
    [5.5, -3.5, 0.85],
    [6, -1, 1.0],
    [5, 2, 0.75],
    [-3.5, 4, 0.8],
    [4, 4.5, 0.9],
  ]
  for (const [x, z, s] of placements) {
    group.add(createTree(x, z, s))
  }
  return group
}
