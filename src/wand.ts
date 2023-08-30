import {
  Animator,
  Entity,
  GltfContainer,
  InputAction,
  Transform,
  TransformType,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { updateTransform } from './utils'

export class Wand {
  private readonly animationName = 'WandLight'
  private readonly transformRelativeToPlayer = {
    position: Vector3.create(0.4, 0.4, 0.5),
    rotation: Quaternion.fromEulerDegrees(45, 180, 0),
    parent: engine.PlayerEntity
  }

  private transform: Partial<TransformType>
  private entity: Entity

  constructor(transform: Partial<TransformType>, onClick: (wand: Wand) => void) {
    const wand = engine.addEntity()
    GltfContainer.create(wand, { src: 'models/wand.glb' })
    Transform.create(wand, { ...transform })

    this.entity = wand
    this.transform = { ...transform }

    // Set up animation
    Animator.create(wand, {
      states: [
        {
          name: this.animationName,
          clip: this.animationName,
          playing: false,
          loop: false
        }
      ]
    })

    // Add interaction to wand
    pointerEventsSystem.onPointerDown(
      {
        entity: wand,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Pick up!'
        }
      },
      () => {
        onClick(this)
      }
    )
  }

  attachToAvatar = () => updateTransform(this.entity, this.transformRelativeToPlayer)

  detachFromAvatar = () => updateTransform(this.entity, this.transform)

  playAnimation = () => Animator.playSingleAnimation(this.entity, this.animationName)

  stopAnimation = () => Animator.stopAllAnimations(this.entity)
}
