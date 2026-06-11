import {
  Group,
  Mesh,
  SphereGeometry,
  ShaderMaterial,
  MeshBasicMaterial,
  BackSide,
  Color,
  type Scene,
} from 'three'

export interface SkySetup {
  update: (elapsedMs: number) => void
  setDayNight: (day: boolean) => void
}

// Gradient endpoints for the sky dome
const DAY = { top: new Color(0x2f93dc), bottom: new Color(0xbfe8ff) }
const NIGHT = { top: new Color(0x0c0f2e), bottom: new Color(0x2b2a59) }

/**
 * A real sky: a large gradient dome (vertical blend, fog-immune) plus a few
 * low-poly white clouds that slowly drift. Replaces the flat background colour.
 */
export function createSky(scene: Scene, reducedMotion: boolean): SkySetup {
  // --- Gradient dome ---
  const uniforms = {
    top: { value: DAY.top.clone() },
    bottom: { value: DAY.bottom.clone() },
  }
  const domeMat = new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    fog: false,
    uniforms,
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vPos;
      uniform vec3 top;
      uniform vec3 bottom;
      void main() {
        float h = clamp(normalize(vPos).y, 0.0, 1.0);
        gl_FragColor = vec4(mix(bottom, top, smoothstep(0.0, 0.6, h)), 1.0);
      }`,
  })
  const dome = new Mesh(new SphereGeometry(140, 32, 16), domeMat)
  scene.add(dome)

  // --- Clouds (low-poly white puff clusters, fog-immune so they stay crisp) ---
  const cloudMat = new MeshBasicMaterial({
    color: 0xffffff,
    fog: false,
    transparent: true,
    opacity: 0.95,
  })
  const clouds: Group[] = []
  const placements: Array<[number, number, number, number]> = [
    // x, y, z, scale
    [-20, 17, -34, 1.5],
    [14, 21, -44, 1.9],
    [32, 15, -28, 1.2],
    [-30, 24, -50, 2.1],
    [5, 19, -60, 1.7],
  ]
  const puffs: Array<[number, number, number, number]> = [
    [0, 0, 0, 1],
    [1.2, -0.2, 0, 0.8],
    [-1.2, -0.1, 0.2, 0.75],
    [0.55, 0.35, -0.2, 0.7],
  ]
  for (const [x, y, z, s] of placements) {
    const cloud = new Group()
    for (const [px, py, pz, pr] of puffs) {
      const puff = new Mesh(new SphereGeometry(1.2 * pr, 10, 8), cloudMat)
      puff.position.set(px, py, pz)
      cloud.add(puff)
    }
    cloud.position.set(x, y, z)
    cloud.scale.setScalar(s)
    scene.add(cloud)
    clouds.push(cloud)
  }

  function update(_elapsedMs: number): void {
    if (reducedMotion) return
    for (let i = 0; i < clouds.length; i++) {
      const c = clouds[i]
      c.position.x += 0.004 * (1 + (i % 3) * 0.3)
      if (c.position.x > 65) c.position.x = -65
    }
  }

  function setDayNight(day: boolean): void {
    const pal = day ? DAY : NIGHT
    uniforms.top.value.copy(pal.top)
    uniforms.bottom.value.copy(pal.bottom)
    cloudMat.opacity = day ? 0.95 : 0.45
  }

  return { update, setDayNight }
}
