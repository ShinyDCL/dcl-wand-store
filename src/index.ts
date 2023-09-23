import { engine, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { SCENE_MIDDLE } from './config'
import { Wand } from './wand'
import { hideLabel, setupUI, showLabel } from './ui'
import { setupLinks } from './links'
import { setUpSkyBox } from './skyBox'
import { setUpScene } from './scene'
import { Vase } from './vase'

export function main() {
  const root = engine.addEntity()
  Transform.create(root, { position: Vector3.create(SCENE_MIDDLE, 0, SCENE_MIDDLE) })

  setUpScene(root)
  setupLinks(root)
  setUpSkyBox(root)
  setupUI()

  let currentWand: Wand | null = null
  const onWandClick = (wand: Wand) => {
    if (currentWand) return
    currentWand = wand
    wand.stopAnimations()
    wand.attachToAvatar()
    showLabel()
  }

  // Wands
  const wand1 = new Wand(
    {
      position: Vector3.create(1.8, 1.27, -1.9),
      rotation: Quaternion.fromEulerDegrees(0, 340, 0),
      parent: root
    },
    onWandClick
  )

  const wand2 = new Wand(
    {
      position: Vector3.create(1.6, 1.27, -2),
      rotation: Quaternion.fromEulerDegrees(0, 190, 0),
      parent: root
    },
    onWandClick
  )

  // Vase
  const vase = new Vase({ parent: root })

  // Check for event when button E is pressed
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
      if (!currentWand) return
      if (currentWand === wand1) vase.playExplosionAnimation()
      if (currentWand === wand2) wand2.playLightAnimation()
    }
  })

  // Check for event when button F is pressed
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
      if (!currentWand) return
      if (currentWand === wand1) {
        vase.stopAnimations()
        wand1.detachFromAvatar()
      }
      if (currentWand === wand2) {
        wand2.stopAnimations()
        wand2.detachFromAvatar()
      }

      currentWand.playOutlineAnimation()
      hideLabel()
      currentWand = null
    }
  })
}
