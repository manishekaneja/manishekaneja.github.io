import './styles/base.css'
import { detectCapabilities } from './capabilities'
import { mountFallback2D } from './fallback/fallback2d'

async function main(): Promise<void> {
  const capabilities = detectCapabilities()

  if (!capabilities.webgl) {
    mountFallback2D()
    return
  }

  // TODO: wire 3D scene once renderer, sceneGraph, house, camera, raycast tasks are done
  console.log('3D scene init - TODO: implement in later tasks')
}

main().catch(console.error)
