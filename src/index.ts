import { engine, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { SCENE_MIDDLE } from './config'
import { setupLinks } from './links'
import { setUpMusic } from './music'
import { setUpScene } from './scene'
import { setUpSkyBox } from './skyBox'
import { hideLabel, setUpUI, showLabel } from './ui'
import { Vase } from './vase'
import { Wand } from './wand'

export function main() {
  const root = engine.addEntity()
  Transform.create(root, { position: Vector3.create(SCENE_MIDDLE, 0, SCENE_MIDDLE) })

  setUpScene(root)
  setupLinks(root)
  setUpSkyBox(root)
  setUpMusic()
  setUpUI()

  let currentWand: Wand | null = null
  const onWandClick = (wand: Wand) => {
    if (currentWand) return
    currentWand = wand
    wand.pickUp()
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

  // Check for event when button E is pressed (try out wand)
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
      if (!currentWand) return
      if (currentWand === wand1) vase.explode()
      if (currentWand === wand2) wand2.lightUp()
    }
  })

  // Check for event when button F is pressed (put down wand)
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN) && currentWand) {
      currentWand.putDown()
      vase.reset()
      hideLabel()
      currentWand = null
    }
  })
}
