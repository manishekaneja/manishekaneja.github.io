import {
  Group,
  Mesh,
  SphereGeometry,
  CylinderGeometry,
  BoxGeometry,
  MeshLambertMaterial,
  Color,
  type Scene,
} from 'three'

// Android-green homage mascot (a friendly bugdroid-style robot, not the trademarked logo)
const ANDROID_GREEN = new Color(0x3ddc84)
const EYE_WHITE = new Color(0xffffff)

export interface MascotSetup {
  group: Group
  update: (elapsedMs: number) => void
}

/**
 * A low-poly green robot standing in the yard. Built from primitives:
 * dome head, two antennae, boxy body, arms and legs. Gently bobs unless
 * reduced-motion is requested.
 */
export function createMascot(scene: Scene, reducedMotion: boolean): MascotSetup {
  const group = new Group()
  const green = new MeshLambertMaterial({ color: ANDROID_GREEN })
  const white = new MeshLambertMaterial({ color: EYE_WHITE })

  // --- Legs ---
  for (const dx of [-0.18, 0.18]) {
    const leg = new Mesh(new CylinderGeometry(0.12, 0.12, 0.35, 8), green)
    leg.position.set(dx, 0.175, 0)
    group.add(leg)
  }

  // --- Body ---
  const body = new Mesh(new BoxGeometry(0.8, 0.7, 0.5), green)
  body.position.set(0, 0.7, 0)
  group.add(body)

  // --- Arms ---
  for (const dx of [-0.52, 0.52]) {
    const arm = new Mesh(new CylinderGeometry(0.1, 0.1, 0.5, 8), green)
    arm.position.set(dx, 0.7, 0)
    group.add(arm)
  }

  // --- Head (dome) ---
  const head = new Mesh(
    new SphereGeometry(0.45, 18, 9, 0, Math.PI * 2, 0, Math.PI * 0.5),
    green
  )
  head.position.set(0, 1.05, 0)
  group.add(head)

  // --- Eyes ---
  for (const dx of [-0.16, 0.16]) {
    const eye = new Mesh(new SphereGeometry(0.07, 10, 10), white)
    eye.position.set(dx, 1.2, 0.36)
    group.add(eye)
  }

  // --- Antennae ---
  for (const [dx, tilt] of [[-0.2, 0.4], [0.2, -0.4]] as Array<[number, number]>) {
    const antenna = new Mesh(new CylinderGeometry(0.02, 0.02, 0.32, 6), green)
    antenna.position.set(dx, 1.5, 0)
    antenna.rotation.z = tilt
    group.add(antenna)
    const tip = new Mesh(new SphereGeometry(0.05, 8, 8), green)
    tip.position.set(dx + Math.sin(tilt) * 0.18, 1.66, 0)
    group.add(tip)
  }

  // Stand in the grass, front-left of the house, facing the visitor
  group.position.set(-4.6, 0, 4.6)
  group.rotation.y = 0.35
  scene.add(group)

  const baseY = group.position.y

  function update(elapsedMs: number): void {
    if (reducedMotion) return
    // Gentle bob + a tiny sway
    group.position.y = baseY + Math.sin(elapsedMs * 0.0022) * 0.08
    group.rotation.y = 0.35 + Math.sin(elapsedMs * 0.0012) * 0.06
  }

  return { group, update }
}
