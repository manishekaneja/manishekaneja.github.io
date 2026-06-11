import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
  Fog,
  CylinderGeometry,
  ConeGeometry,
  Group,
  DoubleSide,
} from 'three'

// Vibrant, playful palette
const PALETTE = {
  sky: new Color(0x7ec8f0),     // bright sky blue
  ground: new Color(0x86c54a),  // fresh grass green
  fogColor: new Color(0xaee0f5),
  trunkColor: new Color(0x9c5a36),
  leafColor: new Color(0x57c24f),
  leafDark: new Color(0x36a13e),
}

export interface SceneSetup {
  scene: Scene
  isDayMode: boolean
  setDayNight: (day: boolean) => void
}

export function createScene(): SceneSetup {
  const scene = new Scene()
  scene.background = PALETTE.sky.clone()
  scene.fog = new Fog(PALETTE.fogColor, 35, 95)

  // Ambient light — bright, neutral fill so colors stay saturated
  const ambientLight = new AmbientLight(0xffffff, 0.9)
  scene.add(ambientLight)

  // Key light (bright sun from upper-right)
  const keyLight = new DirectionalLight(0xffffff, 1.35)
  keyLight.position.set(8, 12, 6)
  keyLight.castShadow = false
  scene.add(keyLight)

  // Fill light (soft blue-grey from opposite side)
  const fillLight = new DirectionalLight(0xe8eeff, 0.4)
  fillLight.position.set(-6, 6, -4)
  scene.add(fillLight)

  // Ground plane
  const groundGeo = new PlaneGeometry(200, 200)
  // DoubleSide so the ground never backface-culls if the camera dips toward the horizon
  const groundMat = new MeshLambertMaterial({ color: PALETTE.ground, side: DoubleSide })
  const ground = new Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0
  ground.receiveShadow = false
  scene.add(ground)

  // Walkway in front of the house — the mascot strolls along this
  const pathMat = new MeshLambertMaterial({ color: new Color(0xd9cdab) })
  const path = new Mesh(new BoxGeometry(13, 0.06, 1.4), pathMat)
  path.position.set(0, 0.04, 4.5)
  scene.add(path)
  // Lighter stone border strips along the path edges
  const edgeMat = new MeshLambertMaterial({ color: new Color(0xeee3c6) })
  for (const dz of [-0.78, 0.78]) {
    const edge = new Mesh(new BoxGeometry(13, 0.07, 0.16), edgeMat)
    edge.position.set(0, 0.045, 4.5 + dz)
    scene.add(edge)
  }

  // Trees (nod to original site) — denser scatter around the yard
  const trees = createTrees()
  scene.add(trees)

  let isDayMode = true

  function setDayNight(day: boolean): void {
    isDayMode = day
    if (day) {
      scene.background = PALETTE.sky.clone()
      scene.fog = new Fog(PALETTE.fogColor, 35, 95)
      ambientLight.color.set(0xffffff)
      ambientLight.intensity = 0.9
      keyLight.color.set(0xffffff)
      keyLight.intensity = 1.35
    } else {
      scene.background = new Color(0x21204a)
      scene.fog = new Fog(0x21204a, 25, 80)
      ambientLight.color.set(0x5560cc)
      ambientLight.intensity = 0.6
      keyLight.color.set(0xbfc8ff)
      keyLight.intensity = 0.8
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
  // x, z, scale — kept clear of the house footprint and the front walkway corridor
  const placements: Array<[number, number, number]> = [
    // left side / back-left
    [-5, -3, 0.85], [-6, -1.5, 1.0], [-6.5, 0.5, 0.9], [-5.5, 2, 0.75],
    [-7, -3.5, 1.05], [-7.5, 1.5, 0.95],
    // right side / back-right
    [5, -3, 0.85], [6, -1.5, 1.0], [6.5, 0.5, 0.9], [5.5, 2, 0.75],
    [7, -3.5, 1.05], [7.5, 1.5, 0.95],
    // back row
    [-2.5, -5, 0.9], [0, -5.5, 1.0], [2.5, -5, 0.9], [-4.5, -6, 0.8], [4.5, -6, 0.8],
    // flanking the walkway ends + far front corners
    [-8, 4.5, 0.95], [8, 4.5, 0.95], [-6, 6.5, 0.85], [6, 6.5, 0.85],
  ]
  for (const [x, z, s] of placements) {
    group.add(createTree(x, z, s))
  }
  return group
}
