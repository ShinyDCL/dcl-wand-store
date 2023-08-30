import { Animator, engine, GltfContainer, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { SCENE_MIDDLE } from './config'
import { Wand } from './wand'
import { hideLabel, setupUI, showLabel } from './ui'
import { setupLinks } from './links'

export function main() {
  const scene = engine.addEntity()
  Transform.create(scene, { position: Vector3.create(SCENE_MIDDLE, 0, SCENE_MIDDLE) })
  GltfContainer.create(scene, { src: 'models/wandStore.glb' })

  Animator.create(scene, {
    states: [
      {
        name: 'Animation',
        clip: 'Animation',
        playing: false,
        loop: false
      }
    ]
  })

  let currentWand: Wand | null = null

  const onWandClick = (wand: Wand) => {
    if (currentWand) return
    currentWand = wand
    wand.attachToAvatar()
    showLabel()
  }

  // Wands
  const wand1 = new Wand(
    {
      position: Vector3.create(1.8, 1.27, -1.9),
      rotation: Quaternion.fromEulerDegrees(0, 340, 0),
      parent: scene
    },
    onWandClick
  )

  const wand2 = new Wand(
    {
      position: Vector3.create(1.6, 1.27, -2),
      rotation: Quaternion.fromEulerDegrees(0, 190, 0),
      parent: scene
    },
    onWandClick
  )

  // Check for event when button E is pressed
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
      if (!currentWand) return
      if (currentWand === wand1) Animator.playSingleAnimation(scene, 'Animation')
      if (currentWand === wand2) wand2.playAnimation()
    }
  })

  // Check for event when button F is pressed
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
      if (!currentWand) return
      if (currentWand === wand1) {
        Animator.stopAllAnimations(scene)
        wand1.detachFromAvatar()
      }
      if (currentWand === wand2) {
        wand2.stopAnimation()
        wand2.detachFromAvatar()
      }

      hideLabel()
      currentWand = null
    }
  })

  setupUI()
  setupLinks(scene)
}
