import { Entity, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { SCENE_SIZE } from './config'

export const setUpScene = (parent: Entity) => {
  const store = engine.addEntity()
  Transform.create(store, { parent })
  GltfContainer.create(store, { src: 'models/store.glb' })

  const border = engine.addEntity()
  Transform.create(border, { parent })
  GltfContainer.create(border, { src: 'models/border.glb' })

  const starModelSize = 8
  const starModelMiddle = starModelSize / 2
  const starModelCount = SCENE_SIZE / starModelSize
  const rotations = [0, 90, 180, 270]

  for (let i = 0; i < starModelCount; i++) {
    for (let j = 0; j < starModelCount; j++) {
      const randomYRotation = rotations[Math.floor(Math.random() * rotations.length)]
      const stars = engine.addEntity()
      Transform.create(stars, {
        position: Vector3.create(starModelSize * i + starModelMiddle, 0, starModelSize * j + starModelMiddle),
        rotation: Quaternion.fromEulerDegrees(0, randomYRotation, 0)
      })
      GltfContainer.create(stars, { src: 'models/stars.glb' })
    }
  }
}
